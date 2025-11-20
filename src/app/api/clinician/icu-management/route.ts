import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface Prescription {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedAt: string;
  prescribedBy: string;
}

interface ICUPatient {
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  admissionDate: string;
  currentSeverity: 'critical' | 'severe' | 'moderate';
  temperature: number;
  vitals: {
    heartRate: number;
    bloodPressure: { systolic: number; diastolic: number };
    respiratoryRate: number;
    oxygenSaturation: number;
  };
  healthIssues: string[];
  currentPrescriptions: Prescription[];
  adverseReactions?: string[];
  hospitalizationDays: number;
  estimatedICUCost: number;
}

// Generate sample ICU patient
function generateICUPatient(): ICUPatient {
  return {
    patientId: 'ICU-001-P' + Math.random().toString().slice(2, 8),
    patientName: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    admissionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    currentSeverity: 'critical',
    temperature: 39.8,
    vitals: {
      heartRate: 118,
      bloodPressure: { systolic: 155, diastolic: 95 },
      respiratoryRate: 28,
      oxygenSaturation: 88,
    },
    healthIssues: ['High Fever', 'Respiratory Distress', 'Potential Pneumonia'],
    currentPrescriptions: [
      {
        medicineId: 'MED-001',
        medicineName: 'Ciprofloxacin',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '7 days',
        prescribedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        prescribedBy: 'Dr. Sharma',
      },
      {
        medicineId: 'MED-002',
        medicineName: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '5 days',
        prescribedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        prescribedBy: 'Dr. Sharma',
      },
    ],
    adverseReactions: ['Nausea', 'Dizziness', 'Loss of appetite', 'Worsening fever'],
    hospitalizationDays: 3,
    estimatedICUCost: 450000, // ₹450,000 for 3 days in ICU
  };
}

// Analyze adverse reactions and suggest alternatives
async function analyzeAndSuggestAlternatives(patient: ICUPatient) {
  const prescriptionSummary = patient.currentPrescriptions
    .map(p => `${p.medicineName} (${p.dosage}): ${p.frequency}`)
    .join('\n');
  
  const vitalsData = `
Temperature: ${patient.temperature}°C
Heart Rate: ${patient.vitals.heartRate} bpm
BP: ${patient.vitals.bloodPressure.systolic}/${patient.vitals.bloodPressure.diastolic}
O2 Saturation: ${patient.vitals.oxygenSaturation}%
Respiratory Rate: ${patient.vitals.respiratoryRate}/min
  `;

  const prompt = `You are an AI medical advisor analyzing an ICU patient case.

PATIENT CASE:
Name: ${patient.patientName}, Age: ${patient.age}, Gender: ${patient.gender}
Health Issues: ${patient.healthIssues.join(', ')}
Hospitalized for: ${patient.hospitalizationDays} days

CURRENT VITALS:
${vitalsData}

CURRENT PRESCRIPTIONS:
${prescriptionSummary}

ADVERSE REACTIONS REPORTED:
${patient.adverseReactions?.join(', ') || 'None'}

ANALYSIS NEEDED:
1. Identify which prescription(s) are likely causing adverse reactions
2. Suggest alternative medications that won't cause these reactions
3. Provide cost-effective alternatives (generic medicines where possible)
4. Recommend dosage adjustments
5. Suggest home-based care options to reduce ICU stay
6. Calculate estimated cost savings
7. Provide severity reduction strategy

Please provide detailed recommendations in JSON format with fields:
- adverseReactionSource: which medicine is likely causing it
- suggestedAlternatives: array of {medicineName, dosage, frequency, reason, estimatedCost}
- homeCarePlan: array of non-pharmaceutical interventions
- severityReduction: step-by-step plan
- estimatedSavings: cost in rupees by avoiding/reducing ICU stay
- followUpSchedule: when to check patient`;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent(prompt);
  
  let analysis = {
    adverseReactionSource: '',
    suggestedAlternatives: [] as any[],
    homeCarePlan: [] as string[],
    severityReduction: '' as string,
    estimatedSavings: 0,
    followUpSchedule: '',
  };

  try {
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      analysis = JSON.parse(jsonMatch[0]);
    } else {
      // Fallback recommendations
      analysis = {
        adverseReactionSource: 'Ciprofloxacin - antibiotic side effects likely',
        suggestedAlternatives: [
          {
            medicineName: 'Azithromycin (Generic)',
            dosage: '500mg',
            frequency: 'Once daily',
            reason: 'Better tolerance, fewer GI side effects',
            estimatedCost: 150,
          },
          {
            medicineName: 'Ibuprofen (Generic)',
            dosage: '400mg',
            frequency: 'Every 6 hours',
            reason: 'Better fever control, safer profile',
            estimatedCost: 50,
          },
        ],
        homeCarePlan: [
          'Tepid sponging every 4 hours',
          'Increase fluid intake to 3L per day',
          'Rest in cool environment',
          'Elevate head of bed to 45 degrees',
          'Monitor oxygen saturation at home using pulse oximeter',
          'Daily temperature monitoring',
        ],
        severityReduction: '1. Switch to alternative antibiotics\n2. Start home-based oxygen therapy monitoring\n3. Daily tele-consultation\n4. Aggressive fluid therapy\n5. Nutritional support',
        estimatedSavings: 200000, // Save ₹200k by reducing ICU days from 5 to 2
        followUpSchedule: 'Daily for next 3 days, then alternate days for 1 week',
      };
    }
  } catch (error) {
    console.error('AI analysis error:', error);
  }

  return analysis;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const patientData = body.patientId ? body : generateICUPatient();

    // Analyze patient case
    const analysis = await analyzeAndSuggestAlternatives(patientData);

    // Calculate potential savings
    const daysReduction = 3; // Reduce from 5 days to 2 days
    const dailyICUCost = 150000; // ₹150k per day
    const costSavings = daysReduction * dailyICUCost;
    const consultationSavingsPer = 2000; // Per consultation
    const consultationCount = 5; // Reduce from 10 to 5
    const consultationSavings = (10 - consultationCount) * consultationSavingsPer;
    const totalSavings = costSavings + consultationSavings;

    return NextResponse.json({
      patient: patientData,
      analysis: {
        ...analysis,
        estimatedSavings: totalSavings,
      },
      costAnalysis: {
        currentICUCostFor3Days: patientData.estimatedICUCost,
        projectedICUCostFor5Days: 750000,
        withAIIntervention: {
          reducedStayDays: 2,
          estimatedICUCost: 300000,
          consultationCost: 10000, // 5 consultations
          medicationCost: 3000, // Generic alternatives
          homeCareCost: 5000,
          totalCost: 318000,
        },
        monthlySavingsPerPatient: totalSavings,
        yearlyProjectedSavings: totalSavings * 30, // Assuming 30 such cases/month
      },
      recommendations: {
        immediate: [
          'Stop current antibiotic immediately',
          'Start alternative medication',
          'Monitor vitals every 2 hours',
          'Start home care protocol',
        ],
        shortTerm: [
          'Daily tele-consultations',
          'Home oxygen saturation monitoring',
          'Nutritional support',
          'Physiotherapy exercises',
        ],
        longTerm: [
          'Weekly follow-ups for 4 weeks',
          'Vaccination to prevent recurrence',
          'Lifestyle modifications',
          'Preventive care protocol',
        ],
      },
      timestamp: new Date().toISOString(),
      model: 'gemini-2.5-flash',
    }, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('ICU analysis error:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze ICU patient case',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for sample ICU case
export async function GET() {
  try {
    const patient = generateICUPatient();
    const analysis = await analyzeAndSuggestAlternatives(patient);

    return NextResponse.json({
      patient,
      analysis,
      message: 'Sample ICU case analysis - POST with patientData for custom analysis',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate ICU case' },
      { status: 500 }
    );
  }
}
