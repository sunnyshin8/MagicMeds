import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to load patient data
function loadPatientData() {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'patients.json');
    if (!fs.existsSync(dataPath)) {
      console.warn('Patient data file not found. Using mock data.');
      return generateMockPatients(100);
    }
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading patient data:', error);
    return generateMockPatients(100);
  }
}

// Fallback mock data generator if file not available
function generateMockPatients(count: number) {
  const patients = [];
  for (let i = 0; i < count; i++) {
    patients.push({
      patientId: `P-${String(i + 1).padStart(5, '0')}`,
      fullName: `Patient ${i + 1}`,
      age: Math.floor(Math.random() * 80) + 5,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      healthIssues: ['Fever', 'Cold'],
      feverStatus: {
        hasActiveFever: Math.random() > 0.9,
        feverType: Math.random() > 0.9 ? 'Dengue' : null,
      },
      address: { city: 'Mumbai', state: 'Maharashtra' },
      vitals: {
        temperature: 35 + Math.random() * 5,
        heartRate: 60 + Math.floor(Math.random() * 40),
        bloodPressure: { systolic: 90 + Math.floor(Math.random() * 50), diastolic: 60 + Math.floor(Math.random() * 30) },
      },
    });
  }
  return patients;
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // const session = await getSession(request);
    // if (!session?.user?.role !== 'clinician') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const patients = loadPatientData();

    // Calculate metrics
    const activePatients = patients.filter((p: any) => p.status === 'Active').length;
    const criticalCases = patients.filter((p: any) => p.feverStatus?.hasActiveFever).length;
    const avgResponseTime = Math.floor(Math.random() * 20) + 5;

    // Fever type distribution
    const feverTypeMap = new Map<string, number>();
    patients.forEach((p: any) => {
      if (p.feverStatus?.feverType) {
        const count = feverTypeMap.get(p.feverStatus.feverType) || 0;
        feverTypeMap.set(p.feverStatus.feverType, count + 1);
      }
    });

    const feverTypeDistribution = Array.from(feverTypeMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));

    // Triage queue (mock)
    const triageQueue = patients.slice(0, 5).map((p: any, idx: number) => ({
      id: p.patientId,
      patient: p.fullName,
      severity: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)],
      waitTime: Math.floor(Math.random() * 60) + 5,
    }));

    // Clinical outcomes trend (mock 30-day data)
    const outcomeMetrics = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (30 - i) * 86400000).toISOString().split('T')[0],
      recovered: Math.floor(Math.random() * 50) + 30,
      hospitalized: Math.floor(Math.random() * 15) + 5,
      pending: Math.floor(Math.random() * 20) + 10,
    }));

    const metrics = {
      totalPatients: patients.length,
      activePatients,
      criticalCases,
      avgResponseTime,
      feverTypeDistribution,
      triageQueue,
      outcomeMetrics,
      patients: patients.slice(0, 50), // Return first 50 for UI
    };

    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
