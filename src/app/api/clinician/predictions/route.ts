import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface OutbreakData {
  region: string;
  currentCases: number;
  trend: number;
  temperature: number;
  population: number;
}

// Generate current outbreak data
function generateOutbreakData(): OutbreakData[] {
  return [
    { region: 'Mumbai', currentCases: 156, trend: 1.15, temperature: 32, population: 20411000 },
    { region: 'Delhi', currentCases: 89, trend: 1.08, temperature: 28, population: 16787941 },
    { region: 'Bangalore', currentCases: 45, trend: 0.95, temperature: 27, population: 8436675 },
    { region: 'Hyderabad', currentCases: 67, trend: 1.12, temperature: 31, population: 6809970 },
    { region: 'Chennai', currentCases: 34, trend: 0.98, temperature: 33, population: 4646732 },
  ];
}

// Generate 7-day forecast based on trend
function generateForecast(currentCases: number, trend: number): number[] {
  const forecast: number[] = [];
  let cases = currentCases;
  
  for (let i = 0; i < 7; i++) {
    cases = Math.floor(cases * trend);
    forecast.push(cases);
  }
  
  return forecast;
}

export async function GET() {
  try {
    const outbreakData = generateOutbreakData();
    
    // Prepare data for Gemini predictions
    const outbreakSummary = outbreakData
      .map(o => `${o.region}: ${o.currentCases} cases, trend=${o.trend.toFixed(2)}, temp=${o.temperature}°C`)
      .join('\n');
    
    const prompt = `Based on this outbreak data, provide predictive analysis:

Current Outbreak Status:
${outbreakSummary}

Please provide:
1. 7-day forecast for each region (comma-separated numbers)
2. Identified hotspots (highest risk regions)
3. Risk level assessment (1-10)
4. Confidence level (0-1)
5. Predicted peak day (1-7)
6. Recommended interventions

Format as JSON with fields: forecast7day, hotspots, riskLevel, confidence, peakDay, interventions`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse response
    let predictions = {
      forecast7day: outbreakData.map(o => generateForecast(o.currentCases, o.trend)),
      hotspots: outbreakData
        .sort((a, b) => (b.trend * b.currentCases) - (a.trend * a.currentCases))
        .slice(0, 3)
        .map(o => o.region),
      riskLevel: 7,
      confidence: 0.85,
      peakDay: 5,
      interventions: [] as string[],
    };
    
    try {
      // Try to extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        predictions = { ...predictions, ...parsed };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
    }
    
    // Build regional forecasts
    const regionalForecasts = outbreakData.map((o, idx) => ({
      region: o.region,
      currentCases: o.currentCases,
      forecast: generateForecast(o.currentCases, o.trend),
    }));
    
    return NextResponse.json({
      predictions: {
        ...predictions,
        regionalForecasts,
        dataPoints: outbreakData.length,
        forecastPeriod: '7_days',
      },
      modelInfo: {
        model: 'gemini-2.5-flash',
        generatedAt: new Date().toISOString(),
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Error generating predictions:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate predictions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
