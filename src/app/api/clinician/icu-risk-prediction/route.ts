import { NextResponse } from 'next/server';

interface VitalsData {
  temperature: number;
  heartRate: number;
  respiratoryRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  spO2: number;
  ageYears: number;
  healthIssues: string[];
  diabetic?: boolean;
  hypertensive?: boolean;
  smokingStatus?: string;
}

interface RiskAssessment {
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  riskScore: number;
  factors: Array<{
    parameter: string;
    value: number | string;
    severity: 'NORMAL' | 'CAUTION' | 'WARNING' | 'CRITICAL';
    recommendation: string;
  }>;
  predictedOutcome: string;
  icuAdmissionProbability: number;
  mortalityRisk: number;
  recommendedCareLevel: string;
}

function calculateQSOFA(vitals: VitalsData): number {
  let score = 0;

  // Respiratory Rate > 22
  if (vitals.respiratoryRate > 22) score += 1;

  // Altered Mental Status (approximated by age + comorbidities)
  if (vitals.ageYears > 65 && (vitals.diabetic || vitals.hypertensive)) score += 1;

  // Systolic BP <= 100
  if (vitals.bloodPressure.systolic <= 100) score += 1;

  return score;
}

function calculateSOFA(vitals: VitalsData): number {
  let score = 0;

  // Respiration component (0-4 points)
  if (vitals.respiratoryRate > 22) score += 1;
  if (vitals.respiratoryRate > 30) score += 2;

  // Circulation component (0-4 points)
  if (vitals.bloodPressure.systolic <= 100) score += 1;
  if (vitals.bloodPressure.systolic <= 100) score += 2;

  // Blood oxygen (SpO2) component (0-4 points)
  if (vitals.spO2 < 95) score += 1;
  if (vitals.spO2 < 90) score += 2;
  if (vitals.spO2 < 85) score += 4;

  return Math.min(score, 4); // Max 4 for simplicity
}

function calculateSepsisRisk(vitals: VitalsData): number {
  let riskScore = 0;

  // Temperature abnormality (±1.5°C from 37°C)
  if (vitals.temperature > 38.5 || vitals.temperature < 35.5) {
    riskScore += 15;
  }

  // Heart rate > 90 (tachycardia)
  if (vitals.heartRate > 90) {
    riskScore += (vitals.heartRate - 90) * 0.5;
  }

  // Respiratory rate > 20 (tachypnea)
  if (vitals.respiratoryRate > 20) {
    riskScore += (vitals.respiratoryRate - 20) * 2;
  }

  // Blood pressure issues
  if (vitals.bloodPressure.systolic < 90 || vitals.bloodPressure.diastolic < 60) {
    riskScore += 25;
  }

  // SpO2 < 95%
  if (vitals.spO2 < 95) {
    riskScore += (95 - vitals.spO2) * 2;
  }

  // Age factor
  if (vitals.ageYears > 65) {
    riskScore += 10;
  }
  if (vitals.ageYears > 80) {
    riskScore += 15;
  }

  // Comorbidities
  if (vitals.diabetic) riskScore += 10;
  if (vitals.hypertensive) riskScore += 5;
  if (vitals.smokingStatus === 'Current') riskScore += 5;

  return Math.min(riskScore, 100);
}

function assessRiskLevel(sepsisRisk: number, qsofaScore: number, sofaScore: number, healthIssues: string[]): RiskAssessment {
  const hasSeriosusCondition = healthIssues.some(issue => 
    ['pneumonia', 'sepsis', 'cardiac', 'stroke', 'kidney', 'liver'].some(keyword => 
      issue.toLowerCase().includes(keyword)
    )
  );

  let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'LOW';
  let icuProbability = 0;
  let mortalityRisk = 0;

  if (sepsisRisk > 70 || qsofaScore >= 2 || sofaScore >= 2 || hasSeriosusCondition) {
    riskLevel = 'CRITICAL';
    icuProbability = 0.95;
    mortalityRisk = 0.35;
  } else if (sepsisRisk > 50 || qsofaScore === 1) {
    riskLevel = 'HIGH';
    icuProbability = 0.75;
    mortalityRisk = 0.15;
  } else if (sepsisRisk > 30) {
    riskLevel = 'MODERATE';
    icuProbability = 0.40;
    mortalityRisk = 0.05;
  } else {
    riskLevel = 'LOW';
    icuProbability = 0.10;
    mortalityRisk = 0.01;
  }

  return {
    riskLevel,
    riskScore: sepsisRisk,
    factors: [],
    predictedOutcome: '',
    icuAdmissionProbability: icuProbability,
    mortalityRisk: mortalityRisk,
    recommendedCareLevel: riskLevel === 'CRITICAL' ? 'ICU' : riskLevel === 'HIGH' ? 'Hospital Ward' : 'Home Care',
  };
}

export async function POST(request: Request) {
  try {
    const vitals: VitalsData = await request.json();

    // Calculate risk scores
    const qsofaScore = calculateQSOFA(vitals);
    const sofaScore = calculateSOFA(vitals);
    const sepsisRisk = calculateSepsisRisk(vitals);

    // Get risk assessment
    let riskAssessment = assessRiskLevel(sepsisRisk, qsofaScore, sofaScore, vitals.healthIssues);

    // Build factors array
    const factors: Array<{
      parameter: string;
      value: string | number;
      severity: 'NORMAL' | 'CAUTION' | 'WARNING' | 'CRITICAL';
      recommendation: string;
    }> = [];

    // Temperature
    if (vitals.temperature > 38.5 || vitals.temperature < 35.5) {
      factors.push({
        parameter: 'Temperature',
        value: `${vitals.temperature}°C`,
        severity: vitals.temperature > 40 ? 'CRITICAL' : 'CAUTION',
        recommendation: vitals.temperature > 40 ? 'Immediate hospital admission' : 'Aggressive temperature management',
      });
    } else {
      factors.push({
        parameter: 'Temperature',
        value: `${vitals.temperature}°C`,
        severity: 'NORMAL',
        recommendation: 'Continue monitoring',
      });
    }

    // Heart Rate
    if (vitals.heartRate > 100 || vitals.heartRate < 60) {
      factors.push({
        parameter: 'Heart Rate',
        value: `${vitals.heartRate} bpm`,
        severity: vitals.heartRate > 120 ? 'CRITICAL' : 'WARNING',
        recommendation: vitals.heartRate > 120 ? 'ECG and cardiology consult needed' : 'Monitor continuously',
      });
    } else {
      factors.push({
        parameter: 'Heart Rate',
        value: `${vitals.heartRate} bpm`,
        severity: 'NORMAL',
        recommendation: 'Within normal range',
      });
    }

    // Respiratory Rate
    if (vitals.respiratoryRate > 25 || vitals.respiratoryRate < 12) {
      factors.push({
        parameter: 'Respiratory Rate',
        value: `${vitals.respiratoryRate} breaths/min`,
        severity: vitals.respiratoryRate > 30 ? 'CRITICAL' : 'WARNING',
        recommendation: vitals.respiratoryRate > 30 ? 'Oxygen support consideration' : 'Monitor for deterioration',
      });
    } else {
      factors.push({
        parameter: 'Respiratory Rate',
        value: `${vitals.respiratoryRate} breaths/min`,
        severity: 'NORMAL',
        recommendation: 'Within normal range',
      });
    }

    // Blood Pressure
    if (vitals.bloodPressure.systolic < 90 || vitals.bloodPressure.systolic > 180) {
      factors.push({
        parameter: 'Blood Pressure',
        value: `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic} mmHg`,
        severity: vitals.bloodPressure.systolic < 90 ? 'CRITICAL' : 'WARNING',
        recommendation: vitals.bloodPressure.systolic < 90 ? 'Fluid resuscitation needed' : 'Antihypertensive management',
      });
    } else {
      factors.push({
        parameter: 'Blood Pressure',
        value: `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic} mmHg`,
        severity: 'NORMAL',
        recommendation: 'Within normal range',
      });
    }

    // SpO2
    if (vitals.spO2 < 95) {
      factors.push({
        parameter: 'Blood Oxygen (SpO2)',
        value: `${vitals.spO2}%`,
        severity: vitals.spO2 < 88 ? 'CRITICAL' : 'WARNING',
        recommendation: vitals.spO2 < 88 ? 'Oxygen therapy required' : 'Supplemental oxygen recommended',
      });
    } else {
      factors.push({
        parameter: 'Blood Oxygen (SpO2)',
        value: `${vitals.spO2}%`,
        severity: 'NORMAL',
        recommendation: 'Adequate oxygenation',
      });
    }

    // Predicted outcome
    let predictedOutcome = '';
    if (riskAssessment.riskLevel === 'CRITICAL') {
      predictedOutcome = 'High risk of sepsis/organ failure. Immediate ICU admission recommended.';
    } else if (riskAssessment.riskLevel === 'HIGH') {
      predictedOutcome = 'Moderate-high risk. Hospital admission for monitoring recommended.';
    } else if (riskAssessment.riskLevel === 'MODERATE') {
      predictedOutcome = 'Low-moderate risk. Close home monitoring with daily physician check-ins.';
    } else {
      predictedOutcome = 'Low risk. Home care with standard precautions.';
    }

    riskAssessment.factors = factors;
    riskAssessment.predictedOutcome = predictedOutcome;

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      patientVitals: vitals,
      riskAssessment,
      clinicalScores: {
        qSOFAScore: qsofaScore,
        SOFAScore: sofaScore,
        sepsisRiskScore: sepsisRisk.toFixed(1),
      },
      actionItems: {
        immediate: riskAssessment.riskLevel === 'CRITICAL' ? [
          'Call emergency services',
          'Initiate fluid resuscitation',
          'Begin broad-spectrum antibiotics',
          'Transfer to ICU',
        ] : [],
        today: riskAssessment.riskLevel === 'HIGH' ? [
          'Hospital admission',
          'Blood cultures and CBC',
          'Start targeted antibiotics',
          'Continuous monitoring',
        ] : riskAssessment.riskLevel === 'MODERATE' ? [
          'Telemedicine consultation',
          'Begin empirical treatment',
          'Hourly vital monitoring',
        ] : [],
        followUp: [
          `Next check-in: ${new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()}`,
          'Monitor for red flag symptoms',
          'Maintain temperature chart',
        ],
      },
      estimatedCost: {
        homecare: 2000,
        hospitalWard: 15000,
        icu: 150000,
        recommendedLevel: riskAssessment.recommendedCareLevel,
      },
    }, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error assessing ICU risk:', error);
    return NextResponse.json(
      {
        error: 'Failed to assess ICU admission risk',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for demo
export async function GET() {
  const demoVitals: VitalsData = {
    temperature: 39.8,
    heartRate: 115,
    respiratoryRate: 28,
    bloodPressure: { systolic: 95, diastolic: 65 },
    spO2: 92,
    ageYears: 58,
    healthIssues: ['Fever', 'Pneumonia suspect'],
    diabetic: true,
    hypertensive: true,
    smokingStatus: 'Former',
  };

  const qsofaScore = calculateQSOFA(demoVitals);
  const sofaScore = calculateSOFA(demoVitals);
  const sepsisRisk = calculateSepsisRisk(demoVitals);

  return NextResponse.json({
    demo: true,
    vitals: demoVitals,
    scores: {
      qSOFA: qsofaScore,
      SOFA: sofaScore,
      sepsisRisk: sepsisRisk.toFixed(1),
    },
    message: 'POST with vitalsData for actual risk assessment',
  });
}
