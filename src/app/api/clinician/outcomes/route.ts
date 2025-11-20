import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface OutcomeData {
  date: string;
  recovered: number;
  hospitalized: number;
  pending: number;
  discharged: number;
  deaths: number;
}

// Generate 90-day outcome data
function generateOutcomeData(): OutcomeData[] {
  const outcomes: OutcomeData[] = [];
  const today = new Date();
  
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const baseRecovered = 1000 + Math.random() * 500;
    const baseHospitalized = 100 + Math.random() * 300;
    const basePending = 50 + Math.random() * 100;
    
    outcomes.push({
      date: date.toISOString().split('T')[0],
      recovered: Math.floor(baseRecovered * (1 + i / 90)),
      hospitalized: Math.floor(baseHospitalized * (1 - i / 180)),
      pending: Math.floor(basePending * (1 - i / 90)),
      discharged: Math.floor(baseRecovered * 0.8 * (1 + i / 90)),
      deaths: Math.floor(baseRecovered * 0.02 * (1 + i / 90)),
    });
  }
  
  return outcomes;
}

// Calculate statistics
function calculateStatistics(outcomes: OutcomeData[]) {
  const totalRecovered = outcomes.reduce((sum, o) => sum + o.recovered, 0);
  const totalHospitalized = outcomes.reduce((sum, o) => sum + o.hospitalized, 0);
  const totalPending = outcomes.reduce((sum, o) => sum + o.pending, 0);
  const totalDischarged = outcomes.reduce((sum, o) => sum + o.discharged, 0);
  const totalDeaths = outcomes.reduce((sum, o) => sum + o.deaths, 0);
  
  const avgLengthOfStay = 7.5; // Average days
  const recoveryRate = (totalRecovered / (totalRecovered + totalHospitalized + totalDeaths)) * 100;
  const mortalityRate = (totalDeaths / (totalRecovered + totalDeaths)) * 100;
  
  return {
    totalRecovered,
    totalHospitalized,
    totalPending,
    totalDischarged,
    totalDeaths,
    avgLengthOfStay,
    recoveryRate: parseFloat(recoveryRate.toFixed(2)),
    mortalityRate: parseFloat(mortalityRate.toFixed(2)),
  };
}

export async function GET() {
  try {
    const outcomes = generateOutcomeData();
    const statistics = calculateStatistics(outcomes);
    
    // Calculate trend (last 7 days vs previous 7 days)
    const last7 = outcomes.slice(-7);
    const prev7 = outcomes.slice(-14, -7);
    
    const last7Recovered = last7.reduce((sum, o) => sum + o.recovered, 0);
    const prev7Recovered = prev7.reduce((sum, o) => sum + o.recovered, 0);
    const recoveryTrend = ((last7Recovered - prev7Recovered) / prev7Recovered * 100).toFixed(2);
    
    return NextResponse.json({
      outcomes,
      statistics,
      trends: {
        recoveryTrend: parseFloat(recoveryTrend as string),
        period: 'last_7_days',
      },
      lastUpdated: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Error fetching outcomes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clinical outcomes data' },
      { status: 500 }
    );
  }
}
