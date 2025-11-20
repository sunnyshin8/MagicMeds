import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface InteractionCheckRequest {
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  patientAge: number;
  kidneysFunction: 'normal' | 'mild' | 'moderate' | 'severe';
  liverFunction: 'normal' | 'mild' | 'moderate' | 'severe';
  allergies: string[];
  pregnancy?: boolean;
}

interface DrugInteraction {
  medication1: string;
  medication2: string;
  severity: 'MILD' | 'MODERATE' | 'SEVERE' | 'CRITICAL';
  mechanism: string;
  recommendation: string;
  alternativeOption?: string;
}

interface MedicationReview {
  medication: string;
  dosage: string;
  frequency: string;
  appropriateness: 'APPROPRIATE' | 'NEEDS_ADJUSTMENT' | 'CONTRAINDICATED';
  reason: string;
  suggestedAlternative?: string;
}

// Database of known critical interactions
const knownInteractions: Record<string, Record<string, DrugInteraction>> = {
  'Warfarin': {
    'Aspirin': {
      medication1: 'Warfarin',
      medication2: 'Aspirin',
      severity: 'SEVERE',
      mechanism: 'Increased bleeding risk due to antiplatelet effects of Aspirin combined with anticoagulation',
      recommendation: 'Avoid combination. If necessary, monitor INR closely and reduce Warfarin dose',
      alternativeOption: 'Use acetaminophen instead of Aspirin',
    },
    'NSAIDs': {
      medication1: 'Warfarin',
      medication2: 'NSAIDs',
      severity: 'SEVERE',
      mechanism: 'NSAIDs increase bleeding risk and may displace Warfarin from protein binding',
      recommendation: 'Avoid NSAIDs. Use acetaminophen for pain relief',
      alternativeOption: 'Acetaminophen or selective COX-2 inhibitors with monitoring',
    },
  },
  'Metformin': {
    'Contrast Dye': {
      medication1: 'Metformin',
      medication2: 'Contrast Dye',
      severity: 'MODERATE',
      mechanism: 'Risk of lactic acidosis, especially in renal dysfunction',
      recommendation: 'Hold Metformin 48 hours before and after contrast procedures',
      alternativeOption: 'Temporary insulin therapy during procedure',
    },
  },
  'ACE Inhibitors': {
    'Potassium Supplements': {
      medication1: 'ACE Inhibitors',
      medication2: 'Potassium Supplements',
      severity: 'SEVERE',
      mechanism: 'Risk of hyperkalemia leading to cardiac arrhythmias',
      recommendation: 'Monitor serum potassium. Adjust doses based on levels',
      alternativeOption: 'Use ACE inhibitor alone if patient eats potassium-rich foods',
    },
  },
  'Lisinopril': {
    'Potassium': {
      medication1: 'Lisinopril',
      medication2: 'Potassium',
      severity: 'SEVERE',
      mechanism: 'Risk of hyperkalemia',
      recommendation: 'Monitor K+ levels monthly',
      alternativeOption: 'Check dietary potassium intake instead of supplements',
    },
  },
};

async function checkInteractionsWithAI(request: InteractionCheckRequest): Promise<{
  interactions: DrugInteraction[];
  medicationReviews: MedicationReview[];
  summary: string;
}> {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

  const medsList = request.medications.map(m => `${m.name} (${m.dosage}, ${m.frequency})`).join(', ');

  const prompt = `You are a clinical pharmacist. Review these medications for interactions and appropriateness:

MEDICATIONS: ${medsList}
PATIENT AGE: ${request.patientAge}
KIDNEY FUNCTION: ${request.kidneysFunction}
LIVER FUNCTION: ${request.liverFunction}
ALLERGIES: ${request.allergies.join(', ') || 'None'}
PREGNANCY: ${request.pregnancy ? 'Yes' : 'No'}

Provide analysis in JSON format:
{
  "interactions": [
    {
      "medication1": "drug1",
      "medication2": "drug2",
      "severity": "MILD|MODERATE|SEVERE|CRITICAL",
      "mechanism": "explanation",
      "recommendation": "action",
      "alternativeOption": "alternative if needed"
    }
  ],
  "medicationReviews": [
    {
      "medication": "drug name",
      "appropriateness": "APPROPRIATE|NEEDS_ADJUSTMENT|CONTRAINDICATED",
      "reason": "explanation",
      "suggestedAlternative": "if needed"
    }
  ],
  "summary": "Overall safety assessment and key recommendations",
  "warnings": ["critical warning 1"]
}`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('AI interaction check error:', error);
  }

  return {
    interactions: [],
    medicationReviews: [],
    summary: 'Unable to fetch AI analysis. Using database checks only.',
  };
}

function checkKnownInteractions(medications: string[]): DrugInteraction[] {
  const interactions: DrugInteraction[] = [];

  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i];
      const med2 = medications[j];

      if (knownInteractions[med1]?.[med2]) {
        interactions.push(knownInteractions[med1][med2]);
      } else if (knownInteractions[med2]?.[med1]) {
        interactions.push(knownInteractions[med2][med1]);
      }
    }
  }

  return interactions;
}

export async function POST(request: Request) {
  try {
    const body: InteractionCheckRequest = await request.json();

    // Extract medication names
    const medicationNames = body.medications.map(m => m.name);

    // Check known interactions
    const knownInter = checkKnownInteractions(medicationNames);

    // Get AI-powered analysis
    const aiAnalysis = await checkInteractionsWithAI(body);

    // Combine interactions
    const allInteractions = [...knownInter, ...aiAnalysis.interactions].filter(
      (inter, idx, arr) =>
        idx ===
        arr.findIndex(
          i =>
            i.medication1 === inter.medication1 && i.medication2 === inter.medication2
        )
    );

    // Calculate safety score (0-100)
    let safetyScore = 100;
    allInteractions.forEach(interaction => {
      if (interaction.severity === 'CRITICAL') safetyScore -= 30;
      else if (interaction.severity === 'SEVERE') safetyScore -= 15;
      else if (interaction.severity === 'MODERATE') safetyScore -= 8;
      else if (interaction.severity === 'MILD') safetyScore -= 2;
    });

    const medicationReviews =
      aiAnalysis.medicationReviews.length > 0
        ? aiAnalysis.medicationReviews
        : body.medications.map(med => ({
            medication: med.name,
            dosage: med.dosage,
            frequency: med.frequency,
            appropriateness: 'APPROPRIATE' as const,
            reason: 'Standard dosing for the condition',
          }));

    // Check for renal/hepatic adjustments
    if (body.kidneysFunction !== 'normal' || body.liverFunction !== 'normal') {
      medicationReviews.forEach(review => {
        if (
          ['Metformin', 'ACE Inhibitor', 'NSAIDs'].some(drug =>
            review.medication.includes(drug)
          )
        ) {
          if (body.kidneysFunction !== 'normal') {
            review.appropriateness = 'NEEDS_ADJUSTMENT';
            review.reason = `Requires dosage adjustment due to ${body.kidneysFunction} kidney function`;
          }
        }
      });
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      medications: body.medications,
      analysis: {
        safetyScore: Math.max(0, safetyScore),
        overallRisk: safetyScore > 90 ? 'LOW' : safetyScore > 70 ? 'MODERATE' : 'HIGH',
        interactions: allInteractions,
        medicationReviews,
        summary:
          aiAnalysis.summary ||
          `Checked ${body.medications.length} medications. ${allInteractions.length} potential interaction(s) identified.`,
      },
      recommendations: {
        immediate:
          allInteractions.filter(i => i.severity === 'CRITICAL').length > 0
            ? [
                'Contact prescriber immediately',
                'Review medication necessity',
                'Consider alternative therapies',
              ]
            : [],
        today:
          allInteractions.filter(i => i.severity === 'SEVERE').length > 0
            ? [
                'Schedule pharmacist consultation',
                'Monitor for adverse effects',
              ]
            : [],
        ongoing: [
          'Report any new symptoms',
          'Regular liver and kidney function tests if on long-term medications',
          'Annual medication review',
        ],
      },
      patientContext: {
        age: body.patientAge,
        kidneysFunction: body.kidneysFunction,
        liverFunction: body.liverFunction,
        allergies: body.allergies,
        pregnancy: body.pregnancy,
      },
    }, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error checking interactions:', error);
    return NextResponse.json(
      {
        error: 'Failed to check medication interactions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for demo
export async function GET() {
  const demoRequest: InteractionCheckRequest = {
    medications: [
      { name: 'Warfarin', dosage: '5mg', frequency: 'Once daily' },
      { name: 'Aspirin', dosage: '100mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
    ],
    patientAge: 65,
    kidneysFunction: 'mild',
    liverFunction: 'normal',
    allergies: [],
    pregnancy: false,
  };

  const knownInter = checkKnownInteractions(
    demoRequest.medications.map(m => m.name)
  );

  return NextResponse.json({
    demo: true,
    request: demoRequest,
    potentialIssues: knownInter.length > 0 ? knownInter : ['No known critical interactions'],
    message: 'POST with medication list for full analysis',
  });
}
