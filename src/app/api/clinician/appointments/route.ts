import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load patient data
function loadPatientData() {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'patients.json');
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading patient data:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'upcoming'; // 'upcoming' or 'past'
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const patients = loadPatientData();

    // Collect all appointments from all patients
    let appointments: any[] = [];

    patients.forEach((patient: any) => {
      if (patient.appointments && Array.isArray(patient.appointments)) {
        patient.appointments.forEach((apt: any) => {
          appointments.push({
            ...apt,
            patientId: patient.patientId,
            patientName: patient.fullName,
            patientAge: patient.age,
            patientGender: patient.gender,
            patientCity: patient.address?.city,
            feverStatus: patient.feverStatus,
          });
        });
      }
    });

    // Filter appointments
    const now = new Date().toISOString().split('T')[0];
    if (filter === 'upcoming') {
      appointments = appointments.filter((apt) => apt.date >= now && apt.status === 'Scheduled');
    } else if (filter === 'past') {
      appointments = appointments.filter((apt) => apt.date < now);
    }

    // Sort by date
    appointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Apply limit
    appointments = appointments.slice(0, limit);

    // Calculate statistics
    const stats = {
      total: appointments.length,
      byStatus: {
        Scheduled: appointments.filter((a) => a.status === 'Scheduled').length,
        Completed: appointments.filter((a) => a.status === 'Completed').length,
        Cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
        NoShow: appointments.filter((a) => a.status === 'No-show').length,
      },
      byType: {} as Record<string, number>,
    };

    appointments.forEach((apt) => {
      stats.byType[apt.type] = (stats.byType[apt.type] || 0) + 1;
    });

    return NextResponse.json(
      {
        appointments,
        stats,
        filter,
        retrievedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=15',
        },
      }
    );
  } catch (error) {
    console.error('Appointments API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
