import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface PatientData {
  patientId: string;
  age: number;
  gender: string;
  temperature: number;
  healthIssues: string[];
  currentMedicines: string[];
  allergies: string[];
  previousAdverseReactions: string[];
  recentCheckups: Array<{
    date: string;
    temperature: number;
    condition: string;
  }>;
}

interface PrescriptionRecommendation {
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  cost: number;
  effectiveness: number; // 0-100
  sideEffectRisk: number; // 0-100
  reasoning: string;
}

async function generateSmartPrescription(patientData: PatientData) {
  const temperatureTrend = patientData.recentCheckups.length > 0
    ? patientData.recentCheckups[patientData.recentCheckups.length - 1].temperature - patientData.recentCheckups[0].temperature
    : 0;

  const prompt = `You are an AI pharmacist providing cost-effective prescription recommendations for a patient.

PATIENT DATA:
- Age: ${patientData.age} years
- Gender: ${patientData.gender}
- Current Temperature: ${patientData.temperature}°C
- Health Issues: ${patientData.healthIssues.join(', ')}
- Temperature Trend: ${temperatureTrend > 0 ? 'Increasing' : temperatureTrend < 0 ? 'Decreasing' : 'Stable'} (${temperatureTrend.toFixed(1)}°C)
- Known Allergies: ${patientData.allergies.join(', ') || 'None'}
- Previous Adverse Reactions: ${patientData.previousAdverseReactions.join(', ') || 'None'}

CURRENT MEDICINES: ${patientData.currentMedicines.join(', ') || 'None'}

RECOMMENDATION CRITERIA:
1. Avoid medicines causing adverse reactions
2. Prefer generic alternatives (cost-effective)
3. Avoid ICU admission if possible (home treatment)
4. Consider age and comorbidities
5. Recommend affordable options available in India

Please provide prescription recommendations in JSON format:
{
  "recommendations": [
    {
      "medicine": "medicine name",
      "dosage": "dosage amount",
      "frequency": "frequency (e.g., twice daily)",
      "duration": "duration (e.g., 5 days)",
      "cost": cost_in_rupees,
      "effectiveness": effectiveness_percentage_0_to_100,
      "sideEffectRisk": risk_percentage_0_to_100,
      "reasoning": "why this medicine",
      "alternatives": ["alt1", "alt2"]
    }
  ],
  "homeCarePlan": ["care tip 1", "care tip 2"],
  "monitoringSchedule": "when to check vitals",
  "costSavings": amount_saved_vs_icu,
  "redFlagSymptoms": ["symptom 1", "symptom 2"],
  "followUpAfter": "days until follow-up"
}`;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent(prompt);

  let recommendations = {
    recommendations: [] as PrescriptionRecommendation[],
    homeCarePlan: [] as string[],
    monitoringSchedule: '',
    costSavings: 0,
    redFlagSymptoms: [] as string[],
    followUpAfter: '3 days',
  };

  try {
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      recommendations = JSON.parse(jsonMatch[0]);
    } else {
      // Fallback recommendations
      recommendations = {
        recommendations: [
          {
            medicine: 'Azithromycin (Generic)',
            dosage: '500mg',
            frequency: 'Once daily',
            duration: '3 days',
            cost: 120,
            effectiveness: 95,
            sideEffectRisk: 5,
            reasoning: 'Broad spectrum antibiotic with minimal side effects',
          },
          {
            medicine: 'Ibuprofen (Generic)',
            dosage: '400mg',
            frequency: 'Every 6 hours as needed',
            duration: '3 days',
            cost: 40,
            effectiveness: 90,
            sideEffectRisk: 10,
            reasoning: 'Fever and pain relief with good tolerability',
          },
        ],
        homeCarePlan: [
          'Tepid sponging every 4 hours',
          'Plenty of fluids - minimum 3 liters daily',
          'Rest in cool, well-ventilated room',
          'Light, nutritious meals',
          'Elevate head of bed to 45 degrees',
        ],
        monitoringSchedule: 'Check temperature every 6 hours',
        costSavings: 200000,
        redFlagSymptoms: [
          'Temperature > 40.5°C',
          'Difficulty breathing',
          'Persistent chest pain',
          'Confusion or dizziness',
          'Bleeding from any site',
        ],
        followUpAfter: '3 days',
      };
    }
  } catch (error) {
    console.error('AI recommendation error:', error);
  }

  return recommendations;
}

export async function POST(request: Request) {
  try {
    const patientData: PatientData = await request.json();

    const recommendations = await generateSmartPrescription(patientData);

    // Calculate total cost and savings
    const totalMedicineCost = recommendations.recommendations.reduce((sum, rec) => sum + rec.cost, 0);
    const consultationCost = 500; // Single digital consultation
    const totalCost = totalMedicineCost + consultationCost;
    const icuAverageCost = 250000; // Per day in ICU
    const homeCareCost = 5000;
    const totalHomeCareCost = totalCost + homeCareCost;
    const potentialSavings = icuAverageCost - totalHomeCareCost;

    return NextResponse.json({
      patient: {
        patientId: patientData.patientId,
        age: patientData.age,
        temperature: patientData.temperature,
      },
      prescriptionRecommendations: recommendations.recommendations,
      homeCarePlan: recommendations.homeCarePlan,
      monitoringSchedule: recommendations.monitoringSchedule,
      redFlagSymptoms: recommendations.redFlagSymptoms,
      costAnalysis: {
        medicineCost: totalMedicineCost,
        consultationCost,
        homeCareCost,
        totalCost,
        icuCostPerDay: icuAverageCost,
        potentialSavings,
        percentageSavings: ((potentialSavings / icuAverageCost) * 100).toFixed(1),
      },
      followUp: {
        nextCheckIn: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        afterDays: parseInt(recommendations.followUpAfter),
      },
      efficacyScore: (
        recommendations.recommendations.reduce((sum, rec) => sum + rec.effectiveness, 0) /
        recommendations.recommendations.length
      ).toFixed(1),
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error generating prescriptions:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate prescription recommendations',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for demo
export async function GET() {
  try {
    const demoPatient: PatientData = {
      patientId: 'PAT-' + Math.random().toString().slice(2, 8),
      age: 42,
      gender: 'Male',
      temperature: 38.9,
      healthIssues: ['High Fever', 'Cough', 'Body Pain'],
      currentMedicines: [],
      allergies: ['Penicillin'],
      previousAdverseReactions: ['Ciprofloxacin - severe nausea'],
      recentCheckups: [
        { date: '2025-11-14', temperature: 40.2, condition: 'Severe' },
        { date: '2025-11-15', temperature: 39.5, condition: 'Improving' },
      ],
    };

    const recommendations = await generateSmartPrescription(demoPatient);

    return NextResponse.json({
      demo: true,
      patient: demoPatient,
      recommendations,
      message: 'POST with patientData for actual recommendations',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate demo' },
      { status: 500 }
    );
  }
}
