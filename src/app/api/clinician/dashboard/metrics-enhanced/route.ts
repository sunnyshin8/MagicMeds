import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import {
  analyzeFeverPatterns,
  predictOutbreakTrends,
  generateClinicalRecommendations,
  detectAnomalies,
} from '@/utils/geminiAI';

interface Patient {
  patientId: string;
  fullName: string;
  age: number;
  gender: string;
  temperature: number;
  healthIssues: string[];
  feverStatus: { hasActiveFever: boolean; feverType: string | null };
  status: string;
  appointments: Array<{ date: string; time: string; type: string; status: string }>;
  address: { city: string; state: string };
  vitals: {
    temperature: number;
    heartRate: number;
    bloodPressure: { systolic: number; diastolic: number };
  };
}

interface EnhancedMetrics {
  totalPatients: number;
  activePatients: number;
  criticalCases: number;
  avgResponseTime: number;
  feverTypeDistribution: Array<{ name: string; value: number }>;
  triageQueue: Array<{ id: string; patient: string; severity: string; waitTime: number }>;
  outcomeMetrics: Array<{ date: string; recovered: number; hospitalized: number; pending: number }>;
  operationalMetrics: {
    avgResponseTime: number;
    patientThroughput: number;
    bedOccupancy: number;
    staffEfficiency: number;
  };
  patients: Patient[];
  aiAnalysis?: {
    feverAnalysis: any;
    outbreakPredictions: any;
    clinicalRecommendations: any;
    anomalyDetection: any;
  };
}

function loadPatients(): Patient[] {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'patients.json');
    if (!fs.existsSync(dataPath)) {
      console.warn('Patient data file not found');
      return [];
    }
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading patients:', error);
    return [];
  }
}

function generateOutcomeMetrics() {
  const metrics = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    metrics.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      recovered: Math.floor(Math.random() * 150 + 200),
      hospitalized: Math.floor(Math.random() * 50 + 30),
      pending: Math.floor(Math.random() * 40 + 20),
    });
  }

  return metrics;
}

function generateTriageQueue(patients: Patient[]) {
  const severities = ['Critical', 'High', 'Medium', 'Low'];
  const queue = [];

  for (let i = 0; i < 5; i++) {
    const patient = patients[Math.floor(Math.random() * patients.length)];
    queue.push({
      id: `TQ-${i + 1}`,
      patient: patient.fullName,
      severity: severities[i % severities.length],
      waitTime: Math.floor(Math.random() * 30 + 5),
    });
  }

  return queue;
}

function generateOperationalMetrics(patients: Patient[]) {
  const criticalCount = patients.filter((p) => p.temperature > 39).length;
  const avgTemp = patients.reduce((sum, p) => sum + p.temperature, 0) / patients.length;

  return {
    avgResponseTime: Math.floor(Math.random() * 15 + 8),
    patientThroughput: Math.floor(patients.length * 0.85),
    bedOccupancy: Math.floor(Math.random() * 30 + 65),
    staffEfficiency: Math.floor(Math.random() * 20 + 75),
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAI = searchParams.get('includeAI') !== 'false';

    // Load patients
    const patients = loadPatients();
    if (patients.length === 0) {
      return NextResponse.json(
        { error: 'No patient data available' },
        { status: 503 }
      );
    }

    // Calculate metrics
    const activePatients = patients.filter((p) => p.status === 'Active').length;
    const criticalCases = patients.filter((p) => p.temperature > 39).length;

    // Generate fever type distribution
    const feverDistribution: { [key: string]: number } = {};
    patients.forEach((p) => {
      if (p.feverStatus?.feverType) {
        feverDistribution[p.feverStatus.feverType] =
          (feverDistribution[p.feverStatus.feverType] || 0) + 1;
      }
    });

    const feverTypeDistribution = Object.entries(feverDistribution).map(([name, value]) => ({
      name,
      value,
    }));

    // Base metrics
    const baseMetrics: EnhancedMetrics = {
      totalPatients: patients.length,
      activePatients,
      criticalCases,
      avgResponseTime: Math.floor(Math.random() * 15 + 8),
      feverTypeDistribution,
      triageQueue: generateTriageQueue(patients),
      outcomeMetrics: generateOutcomeMetrics(),
      operationalMetrics: generateOperationalMetrics(patients),
      patients: patients.slice(0, 50),
    };

    // Add AI analysis if requested
    if (includeAI) {
      try {
        // Prepare data for AI analysis
        const feverData = feverTypeDistribution.map((f) => ({
          type: f.name,
          count: f.value,
          region: 'Overall',
          temperature: patients
            .filter((p) => p.feverStatus?.feverType === f.name)
            .map((p) => p.temperature),
        }));

        const regionData = Array.from(
          new Set(patients.map((p) => p.address.city))
        ).map((city) => {
          const cityPatients = patients.filter((p) => p.address.city === city);
          return {
            region: city,
            feverType: cityPatients[0]?.feverStatus?.feverType || 'Unknown',
            currentCases: cityPatients.filter((p) => p.feverStatus?.hasActiveFever).length,
            past7Days: Array(7)
              .fill(0)
              .map(() => Math.floor(Math.random() * 50 + 20)),
          };
        });

        // Call AI functions in parallel
        const [feverAnalysis, outbreakPredictions, clinicalRecommendations, anomalyDetection] =
          await Promise.all([
            analyzeFeverPatterns(feverData),
            predictOutbreakTrends(regionData),
            generateClinicalRecommendations({
              totalPatients: baseMetrics.totalPatients,
              criticalCases: baseMetrics.criticalCases,
              avgTemperature: patients.reduce((sum, p) => sum + p.temperature, 0) / patients.length,
              commonDiseases: feverTypeDistribution.map((f) => ({
                disease: f.name,
                count: f.value,
              })),
            }),
            detectAnomalies({
              avgTemperature: patients.reduce((sum, p) => sum + p.temperature, 0) / patients.length,
              historicalAvg: 37.2,
              criticalCaseRate: criticalCases / patients.length,
              historicalCriticalRate: 0.05,
              responseTime: baseMetrics.avgResponseTime,
              historicalResponseTime: 12,
            }),
          ]);

        baseMetrics.aiAnalysis = {
          feverAnalysis,
          outbreakPredictions,
          clinicalRecommendations,
          anomalyDetection,
        };
      } catch (aiError) {
        console.error('Error fetching AI analysis:', aiError);
        // Continue without AI analysis
      }
    }

    // Set cache headers
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=10, stale-while-revalidate=30');
    headers.set('Content-Type', 'application/json');

    return NextResponse.json(baseMetrics, { headers });
  } catch (error) {
    console.error('Error in dashboard metrics endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
