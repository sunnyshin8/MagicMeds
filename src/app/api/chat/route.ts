import { NextResponse } from 'next/server';
import { getHealthAssistantResponse } from '../../../services/googleAIStudio';
import { MedicineDatabase } from '../../../services/medicineDatabase';
import { z } from 'zod';

// Validation schemas
const userInfoSchema = z.object({
  ageGroup: z.enum(['child', 'teen', 'adult', 'senior']).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  weight: z.number().min(1).max(500).optional(),
  allergies: z.array(z.string()).optional(),
  conditions: z.array(z.string()).optional()
});

const requestSchema = z.object({
  message: z.string().min(1).max(1000),
  userInfo: userInfoSchema.optional()
});

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json();
    const validatedData = requestSchema.parse(body);
    const { message, userInfo } = validatedData;

    // Get the medicine database singleton instance
    const medicineDb = MedicineDatabase.getInstance();

    // Extract symptoms using a more robust method
    const allSymptoms = medicineDb.getAllSymptoms();
    const mentionedSymptoms = allSymptoms.reduce((acc: string[], symptom: string) => {
      const regex = new RegExp(`\\b${symptom}\\b`, 'i');
      if (regex.test(message)) {
        acc.push(symptom.toLowerCase());
      }
      return acc;
    }, []);

    // Get medicines considering user's conditions and allergies
    const relevantMedicines = mentionedSymptoms.length > 0 
      ? medicineDb.findMedicinesForSymptoms(mentionedSymptoms)
        .filter(med => {
          const userAllergies = userInfo?.allergies || [];
          const userConditions = userInfo?.conditions || [];
          return !med.contraindications.some(contra => 
            userAllergies.includes(contra) || userConditions.includes(contra)
          );
        })
      : [];

    // Enhance the prompt with structured data
    const enhancedMessage = {
      userMessage: message,
      userContext: {
        ...userInfo,
        timestamp: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      analysis: {
        detectedSymptoms: mentionedSymptoms,
        severityIndicators: mentionedSymptoms.some(s => 
          ['severe', 'extreme', 'intense', 'unbearable'].some(indicator => 
            message.toLowerCase().includes(indicator)
          )
        )
      },
      medicineOptions: relevantMedicines.map(med => ({
        name: med.name,
        description: med.description,
        sideEffects: med.sideEffects,
        dosageInfo: medicineDb.getDosageByAgeGroup(
          med.name, 
          userInfo?.ageGroup || 'adult'
        ),
        contraindications: med.contraindications
      }))
    };

    try {
      const response = await getHealthAssistantResponse(JSON.stringify(enhancedMessage));
      
      // Rate limiting headers (to be implemented with proper rate limiting)
      const headers = new Headers({
        'X-RateLimit-Limit': '60',
        'X-RateLimit-Remaining': '59',
        'X-RateLimit-Reset': new Date(Date.now() + 60000).toISOString()
      });

      return NextResponse.json(
        { 
          response,
          symptoms: mentionedSymptoms,
          hasSevereSymptoms: enhancedMessage.analysis.severityIndicators,
          timestamp: enhancedMessage.userContext.timestamp
        }, 
        { 
          status: 200,
          headers
        }
      );
    } catch (aiError) {
      console.error('AI Service Error:', aiError);
      return NextResponse.json(
        { error: 'AI service unavailable', details: 'Failed to generate response' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Request Processing Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          details: error.issues.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error', details: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}