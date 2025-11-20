import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

interface ClinicalOutcome {
  date: string;
  recovered: number;
  hospitalized: number;
  pending: number;
  discharged: number;
  mortality: number;
  recoveryRate: number;
  avgHospitalStay: number;
}

interface TriageQueueItem {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  temperature: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  arrivalTime: string;
  estimatedWaitTime: number;
  symptoms: string[];
  vitals: {
    heartRate: number;
    bloodPressure: string;
    respiratoryRate: number;
  };
}

interface RealTimeData {
  timestamp: string;
  clinicalOutcomes: ClinicalOutcome[];
  triageQueue: TriageQueueItem[];
  activeAlerts: Array<{
    id: string;
    severity: 'info' | 'warning' | 'error' | 'critical';
    message: string;
    timestamp: string;
  }>;
  performanceMetrics: {
    avgResponseTime: number;
    bedOccupancy: number;
    staffEfficiency: number;
    patientSatisfaction: number;
  };
}

function loadPatients() {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'patients.json');
    if (!fs.existsSync(dataPath)) return [];
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading patients:', error);
    return [];
  }
}

function generateClinicalOutcomes(): ClinicalOutcome[] {
  const outcomes = [];
  const now = new Date();

  for (let i = 89; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const recovered = Math.floor(Math.random() * 200 + 150);
    const hospitalized = Math.floor(Math.random() * 80 + 50);
    const pending = Math.floor(Math.random() * 60 + 30);
    const discharged = Math.floor(Math.random() * 100 + 80);
    const mortality = Math.floor(Math.random() * 5 + 2);

    outcomes.push({
      date: date.toISOString().split('T')[0],
      recovered,
      hospitalized,
      pending,
      discharged,
      mortality,
      recoveryRate: Math.round((recovered / (recovered + hospitalized + pending + mortality)) * 100),
      avgHospitalStay: Math.floor(Math.random() * 4 + 3),
    });
  }

  return outcomes;
}

function generateTriageQueue(patients: any[]): TriageQueueItem[] {
  const severities: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];
  const queue: TriageQueueItem[] = [];

  for (let i = 0; i < Math.min(8, patients.length); i++) {
    const patient = patients[i];
    const severity = patient.temperature > 39.5 ? 'critical' : patient.temperature > 39 ? 'high' : patient.temperature > 38 ? 'medium' : 'low';

    queue.push({
      id: `TQ-${Date.now()}-${i}`,
      patientId: patient.patientId,
      patientName: patient.fullName,
      age: patient.age,
      temperature: patient.temperature,
      severity,
      arrivalTime: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      estimatedWaitTime: Math.floor(Math.random() * 30 + 5),
      symptoms: patient.healthIssues.slice(0, 2),
      vitals: {
        heartRate: patient.vitals.heartRate,
        bloodPressure: `${patient.vitals.bloodPressure.systolic}/${patient.vitals.bloodPressure.diastolic}`,
        respiratoryRate: Math.floor(Math.random() * 8 + 14),
      },
    });
  }

  return queue.sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
}

function generateActiveAlerts(patients: any[]) {
  const alerts = [];

  // Critical temperature alert
  const criticalCount = patients.filter((p) => p.temperature > 40).length;
  if (criticalCount > 0) {
    alerts.push({
      id: `ALERT-${Date.now()}-1`,
      severity: 'critical' as const,
      message: `${criticalCount} patients with critical fever (>40°C)`,
      timestamp: new Date().toISOString(),
    });
  }

  // High occupancy alert
  const occupancyRate = 0.75 + Math.random() * 0.25;
  if (occupancyRate > 0.85) {
    alerts.push({
      id: `ALERT-${Date.now()}-2`,
      severity: 'warning' as const,
      message: `High bed occupancy: ${Math.round(occupancyRate * 100)}%`,
      timestamp: new Date().toISOString(),
    });
  }

  // Outbreak alert
  const outbreakRisk = Math.random();
  if (outbreakRisk > 0.6) {
    alerts.push({
      id: `ALERT-${Date.now()}-3`,
      severity: 'warning' as const,
      message: 'Potential dengue outbreak detected in Mumbai region',
      timestamp: new Date().toISOString(),
    });
  }

  return alerts;
}

export async function GET(request: Request) {
  try {
    const patients = loadPatients();

    if (patients.length === 0) {
      return NextResponse.json(
        { error: 'No patient data available' },
        { status: 503 }
      );
    }

    const realTimeData: RealTimeData = {
      timestamp: new Date().toISOString(),
      clinicalOutcomes: generateClinicalOutcomes(),
      triageQueue: generateTriageQueue(patients.filter((p: any) => p.temperature > 37.5).slice(0, 10)),
      activeAlerts: generateActiveAlerts(patients),
      performanceMetrics: {
        avgResponseTime: Math.floor(Math.random() * 8 + 5),
        bedOccupancy: Math.floor(Math.random() * 20 + 65),
        staffEfficiency: Math.floor(Math.random() * 15 + 80),
        patientSatisfaction: Math.floor(Math.random() * 10 + 85),
      },
    };

    // Set cache headers
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=5, stale-while-revalidate=15');
    headers.set('Content-Type', 'application/json');

    return NextResponse.json(realTimeData, { headers });
  } catch (error) {
    console.error('Error in real-time data endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
