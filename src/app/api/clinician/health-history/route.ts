import { NextResponse } from 'next/server';

interface HealthCheckpoint {
  timestamp: string;
  date: string;
  time: string;
  temperature: number;
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  oxygenSaturation: number;
  status: 'improving' | 'stable' | 'declining';
  medication: string;
  notes: string;
  severityLevel: 'critical' | 'severe' | 'moderate' | 'mild' | 'recovered';
}

interface PatientHealthHistory {
  patientId: string;
  patientName: string;
  admissionDate: string;
  checkpoints: HealthCheckpoint[];
  trends: {
    temperatureTrend: 'decreasing' | 'stable' | 'increasing';
    temperatureChange: number; // Celsius change from first to last
    heartRateTrend: 'decreasing' | 'stable' | 'increasing';
    oxygenTrend: 'improving' | 'stable' | 'declining';
    overallTrend: 'improving' | 'stable' | 'critical';
  };
  prescriptionHistory: Array<{
    date: string;
    medicine: string;
    reason: string;
    effectiveness: 'excellent' | 'good' | 'fair' | 'poor';
    adverseEffects: string[];
  }>;
}

// Generate sample health history for a patient
function generateHealthHistory(): PatientHealthHistory {
  const patientId = 'PAT-' + Math.random().toString().slice(2, 8);
  const admissionDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  const checkpoints: HealthCheckpoint[] = [];
  let temp = 40.2;
  let hr = 125;
  let o2 = 85;

  // Generate 7 days of data with improving trend
  for (let day = 0; day < 7; day++) {
    const checkpoint_date = new Date(admissionDate);
    checkpoint_date.setDate(checkpoint_date.getDate() + day);
    
    // Gradual improvement
    temp = Math.max(36.5, temp - (0.4 + Math.random() * 0.3));
    hr = Math.max(72, hr - (3 + Math.random() * 2));
    o2 = Math.min(98, o2 + (1.5 + Math.random() * 1));

    for (let time = 0; time < 4; time++) {
      const timestamp = new Date(checkpoint_date);
      timestamp.setHours(6 + time * 6, 0, 0);

      checkpoints.push({
        timestamp: timestamp.toISOString(),
        date: timestamp.toISOString().split('T')[0],
        time: timestamp.toLocaleTimeString(),
        temperature: parseFloat((temp + Math.random() * 0.5).toFixed(1)),
        heartRate: Math.floor(hr + Math.random() * 5),
        bloodPressure: {
          systolic: Math.floor(130 + Math.random() * 15),
          diastolic: Math.floor(80 + Math.random() * 10),
        },
        oxygenSaturation: Math.floor(o2 + Math.random() * 2),
        status: day < 3 ? 'declining' : day < 5 ? 'stable' : 'improving',
        medication: day < 2 ? 'Ciprofloxacin 500mg' : 'Azithromycin 500mg',
        notes: day < 2 ? 'High fever, severe symptoms' : day < 4 ? 'Slight improvement' : 'Good recovery',
        severityLevel:
          day === 0 ? 'critical'
          : day === 1 ? 'severe'
          : day === 2 ? 'severe'
          : day === 3 ? 'moderate'
          : day === 4 ? 'moderate'
          : day === 5 ? 'mild'
          : 'recovered',
      });
    }
  }

  return {
    patientId,
    patientName: 'Rajesh Kumar',
    admissionDate: admissionDate.toISOString(),
    checkpoints,
    trends: {
      temperatureTrend: 'decreasing',
      temperatureChange: parseFloat((37.2 - 40.2).toFixed(1)),
      heartRateTrend: 'decreasing',
      oxygenTrend: 'improving',
      overallTrend: 'improving',
    },
    prescriptionHistory: [
      {
        date: '2025-11-09',
        medicine: 'Ciprofloxacin 500mg',
        reason: 'Initial severe infection',
        effectiveness: 'poor',
        adverseEffects: ['Nausea', 'Dizziness', 'Worsening fever'],
      },
      {
        date: '2025-11-11',
        medicine: 'Azithromycin 500mg',
        reason: 'Switched due to adverse reactions',
        effectiveness: 'excellent',
        adverseEffects: [],
      },
      {
        date: '2025-11-12',
        medicine: 'Paracetamol 500mg',
        reason: 'Fever management',
        effectiveness: 'good',
        adverseEffects: [],
      },
    ],
  };
}

// Calculate trend indicators
function analyzeTrends(checkpoints: HealthCheckpoint[]) {
  if (checkpoints.length < 2) {
    return { trend: 'stable', recommendation: 'Continue monitoring' };
  }

  const first = checkpoints[0];
  const last = checkpoints[checkpoints.length - 1];
  const tempChange = last.temperature - first.temperature;
  const hrChange = last.heartRate - first.heartRate;
  const o2Change = last.oxygenSaturation - first.oxygenSaturation;

  let recommendation = '';
  if (tempChange < -1.5 && hrChange < -10 && o2Change > 5) {
    recommendation = 'Excellent progress! Continue current treatment. Can consider discharge planning.';
  } else if (tempChange < 0 && hrChange < 0) {
    recommendation = 'Good improvement. Continue current medication. Daily monitoring.';
  } else if (Math.abs(tempChange) < 0.5) {
    recommendation = 'Status stable. Continue current protocol. Watch for changes.';
  } else if (tempChange > 0.5) {
    recommendation = 'Worsening condition. Review medication. Consider alternatives.';
  }

  return {
    trend: tempChange < -1.5 ? 'improving' : Math.abs(tempChange) < 0.5 ? 'stable' : 'declining',
    recommendation,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');

    const history = generateHealthHistory();
    const trendAnalysis = analyzeTrends(history.checkpoints);

    // Filter by date range if provided
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let filteredCheckpoints = history.checkpoints;
    if (startDate) {
      filteredCheckpoints = filteredCheckpoints.filter(cp => cp.date >= startDate);
    }
    if (endDate) {
      filteredCheckpoints = filteredCheckpoints.filter(cp => cp.date <= endDate);
    }

    return NextResponse.json({
      patient: {
        patientId: history.patientId,
        patientName: history.patientName,
        admissionDate: history.admissionDate,
      },
      healthHistory: {
        ...history,
        checkpoints: filteredCheckpoints,
      },
      analysis: {
        ...trendAnalysis,
        totalCheckpoints: filteredCheckpoints.length,
        daysSinceAdmission: Math.floor(
          (new Date().getTime() - new Date(history.admissionDate).getTime()) / (1000 * 60 * 60 * 24)
        ),
      },
      lastUpdated: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching health history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient health history' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      patientId,
      temperature,
      heartRate,
      bloodPressure,
      oxygenSaturation,
      medication,
      notes,
    } = body;

    // Store checkpoint (in real app, this would save to database)
    const checkpoint: HealthCheckpoint = {
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      temperature,
      heartRate,
      bloodPressure,
      oxygenSaturation,
      status: 'stable',
      medication,
      notes,
      severityLevel: temperature > 39 ? 'severe' : temperature > 37.5 ? 'moderate' : 'mild',
    };

    return NextResponse.json({
      success: true,
      checkpoint,
      message: 'Health checkpoint recorded',
      nextCheckIn: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // Next 6 hours
    });
  } catch (error) {
    console.error('Error recording health checkpoint:', error);
    return NextResponse.json(
      { error: 'Failed to record health checkpoint' },
      { status: 500 }
    );
  }
}
