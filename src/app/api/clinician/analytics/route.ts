import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface FeverData {
  type: string;
  cases: number;
  region: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Simulate fever distribution data
function generateFeverData(): FeverData[] {
  return [
    { type: 'Dengue', cases: 156, region: 'Mumbai', trend: 'increasing' },
    { type: 'Typhoid', cases: 89, region: 'Delhi', trend: 'stable' },
    { type: 'Malaria', cases: 45, region: 'Bangalore', trend: 'decreasing' },
    { type: 'COVID-19', cases: 23, region: 'All', trend: 'decreasing' },
    { type: 'Chickenpox', cases: 34, region: 'Hyderabad', trend: 'stable' },
  ];
}

export async function GET() {
  try {
    const feverData = generateFeverData();
    
    // Prepare data for Gemini analysis
    const feverSummary = feverData
      .map(f => `${f.type}: ${f.cases} cases in ${f.region} (${f.trend})`)
      .join('\n');
    
    const prompt = `Analyze this fever outbreak data and provide health insights:

${feverSummary}

Please provide:
1. Brief analysis of each fever type
2. Risk factors identified
3. Key recommendations for clinicians
4. Outbreak risk assessment (0-1)
5. Suggested preventive measures

Format as JSON with fields: analysis, riskFactors, recommendations, outbreakRisk, preventiveMeasures`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse response
    let analysis = {
      analysis: 'Unable to generate analysis',
      riskFactors: [] as string[],
      recommendations: [] as string[],
      outbreakRisk: 0.5,
      preventiveMeasures: [] as string[],
    };
    
    try {
      // Try to extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: parse response text into fields
        analysis.analysis = responseText;
        analysis.riskFactors = ['Monitor fever trends', 'Track regional cases'];
        analysis.recommendations = ['Increase surveillance', 'Enhance healthcare capacity'];
        analysis.outbreakRisk = 0.65;
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      analysis.analysis = responseText;
    }
    
    return NextResponse.json({
      feverData,
      aiAnalysis: analysis,
      generatedAt: new Date().toISOString(),
      model: 'gemini-2.5-flash',
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Error in analytics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate analytics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
