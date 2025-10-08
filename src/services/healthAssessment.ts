// AI-Powered Symptom Analysis Engine for MagicMeds
// Provides preliminary health assessment with confidence scores and emergency detection

import { OpenAI } from 'openai';
import type { 
  SymptomAnalysis, 
  HealthProfile, 
  VitalSigns,
  HealthRiskAssessment,
  FamilyHistory,
  LifestyleFactors
} from '@/types/healthcare';

interface SymptomInput {
  symptoms: string[];
  patientAge: number;
  gender: 'male' | 'female' | 'other';
  location: string;
  vitalSigns?: VitalSigns;
  medicalHistory?: string[];
  currentMedications?: string[];
  duration?: string;
  severity?: 'mild' | 'moderate' | 'severe' | 'critical';
}

interface ConditionPrediction {
  condition: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  description: string;
  recommendations: string[];
  riskFactors: string[];
  typicalDuration: string;
  whenToSeekHelp: string;
}

interface EmergencyAssessment {
  isEmergency: boolean;
  urgencyLevel: 'routine' | 'urgent' | 'emergency';
  redFlags: string[];
  immediateActions: string[];
  timeToSeekCare: string;
}

class HealthAssessmentEngine {
  private openai: OpenAI;
  
  // Medical knowledge base for regional health patterns in India
  private readonly regionalHealthPatterns = {
    'north': {
      commonConditions: ['respiratory infections', 'seasonal allergies', 'joint pain'],
      seasonalFactors: ['winter air pollution', 'monsoon infections'],
      culturalFactors: ['wheat-based diet', 'dairy consumption'],
    },
    'south': {
      commonConditions: ['diabetes', 'hypertension', 'tropical infections'],
      seasonalFactors: ['heat-related illnesses', 'monsoon diseases'],
      culturalFactors: ['rice-based diet', 'coconut oil usage'],
    },
    'east': {
      commonConditions: ['waterborne diseases', 'malnutrition', 'anemia'],
      seasonalFactors: ['monsoon flooding', 'cyclone aftermath'],
      culturalFactors: ['fish consumption', 'rice-based diet'],
    },
    'west': {
      commonConditions: ['lifestyle diseases', 'stress-related disorders', 'pollution-related issues'],
      seasonalFactors: ['urban heat island', 'air pollution'],
      culturalFactors: ['diverse diet', 'urban lifestyle'],
    },
  };

  // Emergency red flags that require immediate medical attention
  private readonly emergencyRedFlags = [
    'chest pain with difficulty breathing',
    'severe abdominal pain',
    'high fever with confusion',
    'severe headache with vision changes',
    'difficulty breathing or shortness of breath',
    'severe bleeding',
    'loss of consciousness',
    'severe allergic reaction',
    'signs of stroke (FAST)',
    'severe dehydration',
    'persistent vomiting with blood',
    'severe burns',
    'suspected poisoning',
    'severe trauma or injury',
  ];

  // Common conditions database with symptoms mapping
  private readonly medicalKnowledgeBase = {
    'common_cold': {
      symptoms: ['runny nose', 'sneezing', 'mild cough', 'mild fever', 'sore throat'],
      severity: 'low',
      duration: '7-10 days',
      treatment: ['rest', 'fluids', 'symptomatic relief'],
      redFlags: ['high fever', 'difficulty breathing', 'severe headache'],
    },
    'fever': {
      symptoms: ['elevated temperature', 'chills', 'sweating', 'body aches'],
      severity: 'medium',
      duration: '2-5 days',
      treatment: ['rest', 'fluids', 'fever reducers', 'monitor temperature'],
      redFlags: ['temperature >103°F', 'difficulty breathing', 'confusion'],
    },
    'gastroenteritis': {
      symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal pain', 'fever'],
      severity: 'medium',
      duration: '3-7 days',
      treatment: ['hydration', 'BRAT diet', 'rest', 'probiotics'],
      redFlags: ['severe dehydration', 'blood in stool', 'high fever'],
    },
    'hypertension': {
      symptoms: ['headache', 'dizziness', 'shortness of breath', 'chest pain'],
      severity: 'high',
      duration: 'chronic',
      treatment: ['medication', 'lifestyle changes', 'diet modification', 'exercise'],
      redFlags: ['severe headache', 'chest pain', 'vision changes', 'confusion'],
    },
    'diabetes': {
      symptoms: ['excessive thirst', 'frequent urination', 'fatigue', 'blurred vision'],
      severity: 'high',
      duration: 'chronic',
      treatment: ['medication', 'diet control', 'exercise', 'blood sugar monitoring'],
      redFlags: ['very high blood sugar', 'difficulty breathing', 'confusion'],
    },
  };

  constructor() {
    // Initialize OpenAI client with proper error handling for build time
    if (typeof window !== 'undefined' || process.env.NODE_ENV === 'development') {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || 'sk-mock-key-for-development',
        dangerouslyAllowBrowser: true,
      });
    } else {
      // Mock client for build time
      this.openai = {
        chat: {
          completions: {
            create: async () => ({
              choices: [{ message: { content: 'Mock response for build' } }]
            })
          }
        }
      } as any;
    }
  }

  async analyzeSymptoms(input: SymptomInput): Promise<SymptomAnalysis> {
    try {
      // Perform emergency assessment first
      const emergencyAssessment = this.assessEmergency(input.symptoms);
      
      // Get AI-powered analysis
      const aiAnalysis = await this.getAIAnalysis(input);
      
      // Combine with knowledge base analysis
      const knowledgeBaseAnalysis = this.analyzeWithKnowledgeBase(input);
      
      // Generate final analysis
      const analysis: SymptomAnalysis = {
        symptoms: input.symptoms,
        possibleConditions: this.mergeConditionPredictions(
          aiAnalysis.conditions,
          knowledgeBaseAnalysis.conditions
        ),
        redFlags: [...emergencyAssessment.redFlags, ...aiAnalysis.redFlags],
        nextSteps: this.generateNextSteps(input, emergencyAssessment),
        consultationRecommended: this.shouldRecommendConsultation(input, emergencyAssessment),
        urgencyLevel: emergencyAssessment.urgencyLevel,
        emergencyLevel: emergencyAssessment.urgencyLevel === 'emergency' ? 'high' : 
                      emergencyAssessment.urgencyLevel === 'urgent' ? 'medium' : 'low',
        recommendations: this.mergeConditionPredictions(
          aiAnalysis.conditions,
          knowledgeBaseAnalysis.conditions
        ).flatMap(c => c.recommendations).slice(0, 5),
      };

      // Add regional health considerations
      this.addRegionalConsiderations(analysis, input.location);
      
      return analysis;
    } catch (error) {
      console.error('Symptom analysis failed:', error);
      
      // Return safe fallback analysis
      return {
        symptoms: input.symptoms,
        possibleConditions: [{
          condition: 'Unable to analyze - please consult healthcare provider',
          confidence: 0,
          severity: 'medium',
          description: 'Analysis service temporarily unavailable',
          recommendations: ['Consult with a healthcare professional', 'Monitor symptoms closely'],
        }],
        redFlags: this.checkForRedFlags(input.symptoms),
        nextSteps: ['Consult healthcare provider', 'Monitor symptoms', 'Seek medical attention if symptoms worsen'],
        consultationRecommended: true,
        urgencyLevel: 'urgent',
        emergencyLevel: 'medium',
        recommendations: ['Consult with a healthcare professional', 'Monitor symptoms closely'],
      };
    }
  }

  private assessEmergency(symptoms: string[]): EmergencyAssessment {
    const foundRedFlags: string[] = [];
    let urgencyLevel: 'routine' | 'urgent' | 'emergency' = 'routine';
    
    // Check for emergency red flags
    symptoms.forEach(symptom => {
      this.emergencyRedFlags.forEach(redFlag => {
        if (symptom.toLowerCase().includes(redFlag.toLowerCase()) || 
            redFlag.toLowerCase().includes(symptom.toLowerCase())) {
          foundRedFlags.push(redFlag);
          urgencyLevel = 'emergency';
        }
      });
    });

    // Check for urgent symptoms
    const urgentSymptoms = [
      'high fever', 'severe pain', 'persistent vomiting', 
      'severe headache', 'rapid heart rate', 'severe fatigue'
    ];
    
    if (urgencyLevel === 'routine') {
      symptoms.forEach(symptom => {
        urgentSymptoms.forEach(urgentSymptom => {
          if (symptom.toLowerCase().includes(urgentSymptom.toLowerCase())) {
            urgencyLevel = 'urgent';
          }
        });
      });
    }

    const finalUrgencyLevel = urgencyLevel as 'routine' | 'urgent' | 'emergency';
    
    return {
      isEmergency: finalUrgencyLevel === 'emergency',
      urgencyLevel: finalUrgencyLevel,
      redFlags: foundRedFlags,
      immediateActions: this.getImmediateActions(finalUrgencyLevel, foundRedFlags),
      timeToSeekCare: this.getTimeToSeekCare(finalUrgencyLevel),
    };
  }

  private async getAIAnalysis(input: SymptomInput): Promise<{
    conditions: ConditionPrediction[];
    redFlags: string[];
  }> {
    const prompt = this.buildAnalysisPrompt(input);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a medical AI assistant specialized in symptom analysis for patients in India. 
            Provide preliminary health assessments while emphasizing the need for professional medical consultation.
            Consider regional health patterns, cultural factors, and common conditions in India.
            Always prioritize patient safety and recommend seeking professional medical care when appropriate.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const analysisText = response.choices[0]?.message?.content || '';
      return this.parseAIResponse(analysisText);
    } catch (error) {
      console.error('OpenAI analysis failed:', error);
      return {
        conditions: [],
        redFlags: [],
      };
    }
  }

  private buildAnalysisPrompt(input: SymptomInput): string {
    return `
Analyze the following symptoms for a ${input.patientAge}-year-old ${input.gender} patient in ${input.location}, India:

Symptoms: ${input.symptoms.join(', ')}
${input.duration ? `Duration: ${input.duration}` : ''}
${input.severity ? `Severity: ${input.severity}` : ''}
${input.medicalHistory?.length ? `Medical History: ${input.medicalHistory.join(', ')}` : ''}
${input.currentMedications?.length ? `Current Medications: ${input.currentMedications.join(', ')}` : ''}

Please provide:
1. Top 3 possible conditions with confidence scores (0-100%)
2. Severity assessment (low/medium/high/emergency)
3. Red flags that require immediate attention
4. General recommendations
5. When to seek medical care

Format your response as JSON with the following structure:
{
  "conditions": [
    {
      "condition": "condition name",
      "confidence": 85,
      "severity": "medium",
      "description": "brief description",
      "recommendations": ["recommendation 1", "recommendation 2"]
    }
  ],
  "redFlags": ["red flag 1", "red flag 2"],
  "seekCareIf": "when to seek immediate care"
}

Remember: This is for preliminary assessment only. Always recommend consulting healthcare professionals.
`;
  }

  private parseAIResponse(response: string): {
    conditions: ConditionPrediction[];
    redFlags: string[];
  } {
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      const conditions: ConditionPrediction[] = parsed.conditions?.map((c: any) => ({
        condition: c.condition || 'Unknown condition',
        confidence: Math.min(Math.max(c.confidence || 0, 0), 100),
        severity: c.severity || 'medium',
        description: c.description || '',
        recommendations: c.recommendations || [],
        riskFactors: c.riskFactors || [],
        typicalDuration: c.typicalDuration || 'Variable',
        whenToSeekHelp: c.whenToSeekHelp || 'If symptoms worsen',
      })) || [];

      return {
        conditions,
        redFlags: parsed.redFlags || [],
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return {
        conditions: [],
        redFlags: [],
      };
    }
  }

  private analyzeWithKnowledgeBase(input: SymptomInput): {
    conditions: ConditionPrediction[];
  } {
    const conditions: ConditionPrediction[] = [];
    
    // Match symptoms against knowledge base
    Object.entries(this.medicalKnowledgeBase).forEach(([conditionKey, conditionData]) => {
      const matchScore = this.calculateSymptomMatch(input.symptoms, conditionData.symptoms);
      
      if (matchScore > 0.3) { // 30% match threshold
        conditions.push({
          condition: conditionKey.replace('_', ' '),
          confidence: Math.round(matchScore * 100),
          severity: conditionData.severity as any,
          description: `Based on symptom pattern matching`,
          recommendations: conditionData.treatment,
          riskFactors: [],
          typicalDuration: conditionData.duration,
          whenToSeekHelp: 'If symptoms persist or worsen',
        });
      }
    });

    return { conditions };
  }

  private calculateSymptomMatch(inputSymptoms: string[], conditionSymptoms: string[]): number {
    let matches = 0;
    
    inputSymptoms.forEach(inputSymptom => {
      conditionSymptoms.forEach(conditionSymptom => {
        if (inputSymptom.toLowerCase().includes(conditionSymptom.toLowerCase()) ||
            conditionSymptom.toLowerCase().includes(inputSymptom.toLowerCase())) {
          matches++;
        }
      });
    });

    return matches / Math.max(inputSymptoms.length, conditionSymptoms.length);
  }

  private mergeConditionPredictions(
    aiConditions: ConditionPrediction[],
    kbConditions: ConditionPrediction[]
  ): ConditionPrediction[] {
    const merged = [...aiConditions];
    
    kbConditions.forEach(kbCondition => {
      const existing = merged.find(condition => 
        condition.condition.toLowerCase() === kbCondition.condition.toLowerCase()
      );
      
      if (existing) {
        // Boost confidence if both AI and KB agree
        existing.confidence = Math.min(existing.confidence + 15, 100);
      } else {
        merged.push(kbCondition);
      }
    });

    // Sort by confidence and return top 5
    return merged
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);
  }

  private generateNextSteps(
    input: SymptomInput, 
    emergencyAssessment: EmergencyAssessment
  ): string[] {
    const steps: string[] = [];
    
    if (emergencyAssessment.isEmergency) {
      steps.push('Seek immediate emergency medical care');
      steps.push('Call emergency services (108) if severe');
      steps.push('Go to nearest hospital emergency room');
    } else if (emergencyAssessment.urgencyLevel === 'urgent') {
      steps.push('Schedule appointment with healthcare provider within 24-48 hours');
      steps.push('Monitor symptoms closely');
      steps.push('Seek immediate care if symptoms worsen');
    } else {
      steps.push('Monitor symptoms for 2-3 days');
      steps.push('Schedule routine appointment if symptoms persist');
      steps.push('Maintain symptom diary');
    }

    // Add general care steps
    steps.push('Stay hydrated and get adequate rest');
    steps.push('Follow up on any prescribed medications');
    steps.push('Consider lifestyle modifications as appropriate');

    return steps;
  }

  private shouldRecommendConsultation(
    input: SymptomInput,
    emergencyAssessment: EmergencyAssessment
  ): boolean {
    // Always recommend consultation for:
    // 1. Emergency or urgent cases
    // 2. Chronic conditions
    // 3. Patients with multiple symptoms
    // 4. Vulnerable populations (very young, elderly, pregnant)
    
    return Boolean(
      emergencyAssessment.urgencyLevel !== 'routine' ||
      input.symptoms.length > 3 ||
      input.patientAge < 2 ||
      input.patientAge > 65 ||
      input.medicalHistory?.length || 0 > 0
    );
  }

  private addRegionalConsiderations(analysis: SymptomAnalysis, location: string): void {
    const region = this.getRegionFromLocation(location);
    const regionalData = this.regionalHealthPatterns[region];
    
    if (regionalData) {
      // Add regional context to recommendations
      analysis.nextSteps.push(`Consider regional health factors: ${regionalData.seasonalFactors.join(', ')}`);
      
      // Check if symptoms match common regional conditions
      regionalData.commonConditions.forEach(condition => {
        const matches = analysis.symptoms.some(symptom => 
          symptom.toLowerCase().includes(condition.toLowerCase())
        );
        
        if (matches) {
          analysis.nextSteps.push(`Common in ${region} region - consider preventive measures`);
        }
      });
    }
  }

  private getRegionFromLocation(location: string): keyof typeof this.regionalHealthPatterns {
    const northStates = ['punjab', 'haryana', 'delhi', 'uttar pradesh', 'uttarakhand', 'himachal pradesh'];
    const southStates = ['tamil nadu', 'karnataka', 'kerala', 'andhra pradesh', 'telangana'];
    const eastStates = ['west bengal', 'odisha', 'jharkhand', 'bihar', 'assam'];
    const westStates = ['maharashtra', 'gujarat', 'rajasthan', 'goa'];
    
    const locationLower = location.toLowerCase();
    
    if (northStates.some(state => locationLower.includes(state))) return 'north';
    if (southStates.some(state => locationLower.includes(state))) return 'south';
    if (eastStates.some(state => locationLower.includes(state))) return 'east';
    if (westStates.some(state => locationLower.includes(state))) return 'west';
    
    return 'north'; // Default
  }

  private checkForRedFlags(symptoms: string[]): string[] {
    const redFlags: string[] = [];
    
    symptoms.forEach(symptom => {
      this.emergencyRedFlags.forEach(flag => {
        if (symptom.toLowerCase().includes(flag.toLowerCase()) ||
            flag.toLowerCase().includes(symptom.toLowerCase())) {
          redFlags.push(flag);
        }
      });
    });
    
    return [...new Set(redFlags)]; // Remove duplicates
  }

  private getImmediateActions(
    urgencyLevel: 'routine' | 'urgent' | 'emergency',
    redFlags: string[]
  ): string[] {
    if (urgencyLevel === 'emergency') {
      return [
        'Call emergency services (108) immediately',
        'Go to nearest hospital emergency room',
        'If possible, have someone accompany you',
        'Bring list of current medications',
        'Stay calm and follow emergency operator instructions',
      ];
    } else if (urgencyLevel === 'urgent') {
      return [
        'Contact healthcare provider within 24 hours',
        'Monitor symptoms closely',
        'Seek immediate care if symptoms worsen',
        'Keep emergency contacts readily available',
        'Document symptom progression',
      ];
    } else {
      return [
        'Monitor symptoms for changes',
        'Rest and stay hydrated',
        'Maintain symptom diary',
        'Schedule routine checkup if needed',
        'Follow general health guidelines',
      ];
    }
  }

  private getTimeToSeekCare(urgencyLevel: 'routine' | 'urgent' | 'emergency'): string {
    switch (urgencyLevel) {
      case 'emergency':
        return 'Immediately - within minutes';
      case 'urgent':
        return 'Within 24-48 hours';
      case 'routine':
        return 'Within 1-2 weeks if symptoms persist';
      default:
        return 'As needed';
    }
  }

  // Risk assessment for predictive health analytics
  async assessHealthRisks(
    healthProfile: HealthProfile,
    vitalHistory: VitalSigns[],
    familyHistory: FamilyHistory,
    lifestyle: LifestyleFactors
  ): Promise<HealthRiskAssessment> {
    // Implementation for predictive health analytics
    // This would include ML models for risk prediction
    
    return {
      diabetesRisk: this.calculateDiabetesRisk(healthProfile, vitalHistory, familyHistory, lifestyle),
      hypertensionRisk: this.calculateHypertensionRisk(healthProfile, vitalHistory, familyHistory, lifestyle),
      cardiovascularRisk: this.calculateCardiovascularRisk(healthProfile, vitalHistory, familyHistory, lifestyle),
      assessmentDate: new Date(),
      riskFactors: this.identifyRiskFactors(healthProfile, familyHistory, lifestyle),
      recommendations: this.generatePreventiveRecommendations(),
    };
  }

  private calculateDiabetesRisk(
    healthProfile: HealthProfile,
    vitalHistory: VitalSigns[],
    familyHistory: any,
    lifestyle: any
  ): number {
    let risk = 0;
    
    // Age factor
    if (healthProfile.age > 45) risk += 20;
    else if (healthProfile.age > 35) risk += 10;
    
    // BMI factor
    if (healthProfile.height && healthProfile.weight) {
      const bmi = healthProfile.weight / Math.pow(healthProfile.height / 100, 2);
      if (bmi > 30) risk += 25;
      else if (bmi > 25) risk += 15;
    }
    
    // Family history
    if (familyHistory?.diabetes) risk += 20;
    
    // Lifestyle factors
    if (lifestyle?.exerciseFrequency === 'none') risk += 15;
    if (lifestyle?.dietType === 'high_sugar') risk += 10;
    
    // Recent blood sugar readings
    const recentBloodSugar = vitalHistory
      .filter(v => v.bloodSugar)
      .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime())
      .slice(0, 3);
    
    if (recentBloodSugar.length > 0) {
      const avgBloodSugar = recentBloodSugar.reduce((sum, v) => sum + (v.bloodSugar || 0), 0) / recentBloodSugar.length;
      if (avgBloodSugar > 126) risk += 30;
      else if (avgBloodSugar > 100) risk += 15;
    }
    
    return Math.min(risk, 100);
  }

  private calculateHypertensionRisk(
    healthProfile: HealthProfile,
    vitalHistory: VitalSigns[],
    familyHistory: any,
    lifestyle: any
  ): number {
    let risk = 0;
    
    // Age and gender factors
    if (healthProfile.gender === 'male' && healthProfile.age > 45) risk += 15;
    if (healthProfile.gender === 'female' && healthProfile.age > 55) risk += 15;
    
    // Family history
    if (familyHistory?.hypertension) risk += 25;
    
    // Recent BP readings
    const recentBP = vitalHistory
      .filter(v => v.bloodPressure && v.bloodPressure.systolic && v.bloodPressure.diastolic)
      .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime())
      .slice(0, 5);
    
    if (recentBP.length > 0) {
      const avgSystolic = recentBP.reduce((sum, v) => sum + (v.bloodPressure?.systolic || 0), 0) / recentBP.length;
      const avgDiastolic = recentBP.reduce((sum, v) => sum + (v.bloodPressure?.diastolic || 0), 0) / recentBP.length;
      
      if (avgSystolic > 140 || avgDiastolic > 90) risk += 30;
      else if (avgSystolic > 130 || avgDiastolic > 80) risk += 20;
      else if (avgSystolic > 120 || avgDiastolic > 80) risk += 10;
    }
    
    // Lifestyle factors
    if (lifestyle?.smokingStatus === 'current') risk += 20;
    if (lifestyle?.alcoholConsumption === 'heavy') risk += 15;
    if (lifestyle?.exerciseFrequency === 'none') risk += 10;
    if (lifestyle?.stressLevel > 3) risk += 10;
    
    return Math.min(risk, 100);
  }

  private calculateCardiovascularRisk(
    healthProfile: HealthProfile,
    vitalHistory: VitalSigns[],
    familyHistory: any,
    lifestyle: any
  ): number {
    // Simplified cardiovascular risk calculation
    let risk = 0;
    
    // Age factor
    if (healthProfile.age > 65) risk += 25;
    else if (healthProfile.age > 55) risk += 15;
    else if (healthProfile.age > 45) risk += 10;
    
    // Gender factor
    if (healthProfile.gender === 'male') risk += 10;
    
    // Family history
    if (familyHistory?.heartDisease) risk += 20;
    
    // Existing conditions
    if (healthProfile.chronicConditions?.includes('diabetes')) risk += 15;
    if (healthProfile.chronicConditions?.includes('hypertension')) risk += 15;
    
    // Lifestyle factors
    if (lifestyle?.smokingStatus === 'current') risk += 25;
    if (lifestyle?.exerciseFrequency === 'none') risk += 15;
    if (lifestyle?.dietType === 'high_fat') risk += 10;
    
    return Math.min(risk, 100);
  }

  private identifyRiskFactors(
    healthProfile: HealthProfile,
    familyHistory: any,
    lifestyle: any
  ): string[] {
    const riskFactors: string[] = [];
    
    if (healthProfile.age > 65) riskFactors.push('Advanced age');
    if (familyHistory?.diabetes) riskFactors.push('Family history of diabetes');
    if (familyHistory?.hypertension) riskFactors.push('Family history of hypertension');
    if (familyHistory?.heartDisease) riskFactors.push('Family history of heart disease');
    if (lifestyle?.smokingStatus === 'current') riskFactors.push('Current smoking');
    if (lifestyle?.exerciseFrequency === 'none') riskFactors.push('Sedentary lifestyle');
    if (lifestyle?.alcoholConsumption === 'heavy') riskFactors.push('Heavy alcohol consumption');
    if (lifestyle?.stressLevel > 3) riskFactors.push('High stress levels');
    
    return riskFactors;
  }

  private generatePreventiveRecommendations(): string[] {
    const recommendations: string[] = [];
    
    recommendations.push('Maintain regular health checkups');
    recommendations.push('Follow a balanced, nutritious diet');
    recommendations.push('Engage in regular physical activity');
    recommendations.push('Maintain healthy weight');
    recommendations.push('Manage stress through relaxation techniques');
    recommendations.push('Limit alcohol consumption');
    recommendations.push('Avoid smoking and tobacco use');
    recommendations.push('Get adequate sleep (7-8 hours daily)');
    recommendations.push('Monitor blood pressure and blood sugar regularly');
    recommendations.push('Stay hydrated and maintain good hygiene');
    
    return recommendations;
  }
}

// Create singleton instance
const healthAssessmentEngine = new HealthAssessmentEngine();

// Export named functions
export const analyzeSymptoms = (
  symptoms: string[],
  patientInfo: {
    age: number;
    gender: 'male' | 'female' | 'other';
    medicalHistory?: string[];
    currentMedications?: string[];
    region?: string;
  }
) => {
  return healthAssessmentEngine.analyzeSymptoms({
    symptoms,
    patientAge: patientInfo.age,
    gender: patientInfo.gender,
    location: patientInfo.region || 'India',
    medicalHistory: patientInfo.medicalHistory,
    currentMedications: patientInfo.currentMedications,
  });
};

export const assessHealthRisks = (
  healthProfile: HealthProfile,
  vitalHistory: VitalSigns[],
  familyHistory: any,
  lifestyle: any
) => {
  return healthAssessmentEngine.assessHealthRisks(healthProfile, vitalHistory, familyHistory, lifestyle);
};

export default HealthAssessmentEngine;