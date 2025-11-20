/**
 * Gemini 2.5-Flash AI Integration
 * For real-time dashboard analytics and predictive features
 */

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyAAUDiEATiv8gbO7i6kP7kiJnNtYBsmHzo';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

interface GeminiAnalysis {
  analysis: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
}

interface OutbreakPrediction {
  region: string;
  feverType: string;
  predictedCases: number;
  confidence: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  recommendations: string[];
}

/**
 * Analyze fever patterns and generate clinical insights
 */
export async function analyzeFeverPatterns(
  feverData: Array<{ type: string; count: number; region: string; temperature: number[] }>
): Promise<GeminiAnalysis> {
  try {
    const prompt = `
    Analyze the following fever outbreak data and provide clinical insights:
    
    ${JSON.stringify(feverData, null, 2)}
    
    Provide:
    1. Brief analysis of patterns
    2. Top 3 recommendations for clinicians
    3. Severity assessment (low/medium/high/critical)
    4. Confidence score (0-1)
    
    Format as JSON with keys: analysis, recommendations (array), severity, confidence
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No content in Gemini response');
    }

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Gemini response');
    }

    return JSON.parse(jsonMatch[0]) as GeminiAnalysis;
  } catch (error) {
    console.error('Error analyzing fever patterns:', error);
    return {
      analysis: 'Unable to analyze patterns at this time',
      recommendations: [
        'Monitor fever cases closely',
        'Ensure adequate hospital capacity',
        'Maintain preventive measures',
      ],
      severity: 'medium',
      confidence: 0.5,
    };
  }
}

/**
 * Predict outbreak patterns for specific regions
 */
export async function predictOutbreakTrends(
  regionData: Array<{ region: string; feverType: string; currentCases: number; past7Days: number[] }>
): Promise<OutbreakPrediction[]> {
  try {
    const prompt = `
    Based on the following regional fever data, predict outbreak trends:
    
    ${JSON.stringify(regionData, null, 2)}
    
    For each region, provide:
    1. Predicted cases for next 7 days (average)
    2. Trend (increasing/stable/decreasing)
    3. Confidence level (0-1)
    4. Top 2 preventive recommendations
    
    Format as JSON array with objects having keys: region, feverType, predictedCases, confidence, trend, recommendations
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.6,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No content in Gemini response');
    }

    // Parse JSON array from response
    const jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Gemini response');
    }

    return JSON.parse(jsonMatch[0]) as OutbreakPrediction[];
  } catch (error) {
    console.error('Error predicting outbreak trends:', error);
    return [];
  }
}

/**
 * Generate clinical recommendations based on patient data
 */
export async function generateClinicalRecommendations(
  patientData: {
    totalPatients: number;
    criticalCases: number;
    avgTemperature: number;
    commonDiseases: Array<{ disease: string; count: number }>;
  }
): Promise<{ recommendations: string[]; priority: string }> {
  try {
    const prompt = `
    Based on the current patient dashboard data, provide clinical recommendations:
    
    ${JSON.stringify(patientData, null, 2)}
    
    Provide:
    1. Top 5 actionable recommendations for clinicians
    2. Priority level (routine/urgent/critical)
    
    Format as JSON with keys: recommendations (array), priority
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 600,
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No content in Gemini response');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Gemini response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error generating clinical recommendations:', error);
    return {
      recommendations: [
        'Continue regular patient monitoring',
        'Maintain infection prevention protocols',
        'Ensure adequate staffing levels',
        'Monitor medication supplies',
        'Review patient outcomes regularly',
      ],
      priority: 'routine',
    };
  }
}

/**
 * Detect anomalies in patient data
 */
export async function detectAnomalies(
  metrics: {
    avgTemperature: number;
    historicalAvg: number;
    criticalCaseRate: number;
    historicalCriticalRate: number;
    responseTime: number;
    historicalResponseTime: number;
  }
): Promise<{ anomalies: string[]; alertLevel: 'green' | 'yellow' | 'orange' | 'red' }> {
  try {
    const prompt = `
    Analyze the following metrics for anomalies compared to historical averages:
    
    Current vs Historical:
    - Temperature: ${metrics.avgTemperature}°C vs ${metrics.historicalAvg}°C avg
    - Critical Rate: ${(metrics.criticalCaseRate * 100).toFixed(1)}% vs ${(metrics.historicalCriticalRate * 100).toFixed(1)}%
    - Response Time: ${metrics.responseTime}min vs ${metrics.historicalResponseTime}min avg
    
    Identify any significant anomalies and alert level needed:
    - green: Normal operations
    - yellow: Minor deviations
    - orange: Significant deviation
    - red: Critical anomaly
    
    Format as JSON with keys: anomalies (array of strings), alertLevel
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.5,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 400,
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No content in Gemini response');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Gemini response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error detecting anomalies:', error);
    return {
      anomalies: [],
      alertLevel: 'green',
    };
  }
}
