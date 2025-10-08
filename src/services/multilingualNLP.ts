// Multilingual Health NLP Service for MagicMeds
// Supports regional Indian languages with offline capabilities

import { pipeline } from '@xenova/transformers';

export interface LanguageDetectionResult {
  language: string;
  confidence: number;
  isSupported: boolean;
}

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
}

export interface SymptomExtractionResult {
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  bodyParts: string[];
  duration: string | null;
  confidence: number;
  medicalTerms: string[];
}

class MultilingualHealthNLP {
  private translator: unknown;
  private languageDetector: unknown;
  private medicalNER: unknown;
  private initialized: boolean = false;

  // Supported languages with their medical terminology
  private readonly supportedLanguages = {
    'en': { name: 'English', medicalTerms: true },
    'hi': { name: 'हिंदी', medicalTerms: true },
    'bn': { name: 'বাংলা', medicalTerms: true },
    'ta': { name: 'தமிழ்', medicalTerms: true },
    'te': { name: 'తెలుగు', medicalTerms: true },
    'gu': { name: 'ગુજરાતી', medicalTerms: true },
    'mr': { name: 'मराठी', medicalTerms: true },
    'kn': { name: 'ಕನ್ನಡ', medicalTerms: true },
  };

  // Common medical terms mapping for regional languages
  private readonly medicalTermsMapping = {
    // Hindi
    'hi': {
      'बुखार': 'fever',
      'सिरदर्द': 'headache',
      'खांसी': 'cough',
      'दर्द': 'pain',
      'चक्कर': 'dizziness',
      'मतली': 'nausea',
      'सांस लेने में तकलीफ': 'difficulty breathing',
      'पेट दर्द': 'stomach pain',
      'गले में खराश': 'sore throat',
      'उल्टी': 'vomiting',
    },
    // Bengali
    'bn': {
      'জ্বর': 'fever',
      'মাথাব্যথা': 'headache',
      'কাশি': 'cough',
      'ব্যথা': 'pain',
      'মাথা ঘোরা': 'dizziness',
      'বমি বমি ভাব': 'nausea',
      'শ্বাসকষ্ট': 'difficulty breathing',
      'পেট ব্যথা': 'stomach pain',
      'গলা ব্যথা': 'sore throat',
      'বমি': 'vomiting',
    },
    // Tamil
    'ta': {
      'காய்ச்சல்': 'fever',
      'தலைவலி': 'headache',
      'இருமல்': 'cough',
      'வலி': 'pain',
      'தலைசுற்றல்': 'dizziness',
      'குமட்டல்': 'nausea',
      'மூச்சுத் திணறல்': 'difficulty breathing',
      'வயிற்று வலி': 'stomach pain',
      'தொண்டை வலி': 'sore throat',
      'வாந்தி': 'vomiting',
    },
    // Telugu
    'te': {
      'జ్వరం': 'fever',
      'తలనొప్పి': 'headache',
      'దగ్గు': 'cough',
      'నొప్పి': 'pain',
      'తలతిరుగుట': 'dizziness',
      'వాంతులు': 'vomiting',
      'ఊపిరి ఆడకపోవడం': 'difficulty breathing',
      'కడుపు నొప్పి': 'stomach pain',
      'గొంతు నొప్పి': 'sore throat',
    },
  };

  // Body parts mapping
  private readonly bodyPartsMapping = {
    'hi': {
      'सिर': 'head',
      'छाती': 'chest',
      'पेट': 'stomach',
      'पीठ': 'back',
      'हाथ': 'arm',
      'पैर': 'leg',
      'गला': 'throat',
      'आंख': 'eye',
    },
    'bn': {
      'মাথা': 'head',
      'বুক': 'chest',
      'পেট': 'stomach',
      'পিঠ': 'back',
      'হাত': 'arm',
      'পা': 'leg',
      'গলা': 'throat',
      'চোখ': 'eye',
    },
    'ta': {
      'தலை': 'head',
      'மார்பு': 'chest',
      'வயிறு': 'stomach',
      'முதுகு': 'back',
      'கை': 'arm',
      'கால்': 'leg',
      'தொண்டை': 'throat',
      'கண்': 'eye',
    },
    'te': {
      'తల': 'head',
      'ఛాతి': 'chest',
      'కడుపు': 'stomach',
      'వెనుక': 'back',
      'చేయి': 'arm',
      'కాలు': 'leg',
      'గొంతు': 'throat',
      'కన్ను': 'eye',
    },
  };

  constructor() {
    this.initializeModels();
  }

  private async initializeModels(): Promise<void> {
    try {
      // Initialize language detection model
      this.languageDetector = await pipeline(
        'text-classification',
        'Xenova/lang-detect-200'
      );

      // Initialize translation model for multilingual support
      this.translator = await pipeline(
        'translation',
        'Xenova/nllb-200-distilled-600M'
      );

      // Initialize medical NER model
      this.medicalNER = await pipeline(
        'token-classification',
        'Xenova/bert-base-multilingual-cased'
      );

      this.initialized = true;
      console.log('Multilingual Health NLP models initialized successfully');
    } catch (error) {
      console.error('Failed to initialize NLP models:', error);
      throw new Error('NLP service initialization failed');
    }
  }

  async detectLanguage(text: string): Promise<LanguageDetectionResult> {
    if (!this.initialized) {
      await this.initializeModels();
    }

    try {
      const result = await (this.languageDetector as (text: string) => Promise<any>)(text);
      const topResult = result[0];
      
      const detectedLang = topResult.label.toLowerCase();
      const confidence = topResult.score;
      
      // Map detected language to our supported languages
      const mappedLang = this.mapDetectedLanguage(detectedLang);
      const isSupported = mappedLang in this.supportedLanguages;

      return {
        language: mappedLang,
        confidence,
        isSupported,
      };
    } catch (error) {
      console.error('Language detection failed:', error);
      return {
        language: 'en',
        confidence: 0,
        isSupported: true,
      };
    }
  }

  private mapDetectedLanguage(detectedLang: string): string {
    // Map various language codes to our supported format
    const languageMap: Record<string, string> = {
      'hin': 'hi',
      'ben': 'bn',
      'tam': 'ta',
      'tel': 'te',
      'guj': 'gu',
      'mar': 'mr',
      'kan': 'kn',
      'eng': 'en',
      'english': 'en',
      'hindi': 'hi',
      'bengali': 'bn',
      'tamil': 'ta',
      'telugu': 'te',
      'gujarati': 'gu',
      'marathi': 'mr',
      'kannada': 'kn',
    };

    return languageMap[detectedLang] || detectedLang;
  }

  async translateToEnglish(text: string, sourceLang: string): Promise<TranslationResult> {
    if (!this.initialized) {
      await this.initializeModels();
    }

    // If already in English, return as is
    if (sourceLang === 'en') {
      return {
        translatedText: text,
        sourceLanguage: sourceLang,
        targetLanguage: 'en',
        confidence: 1.0,
      };
    }

    try {
      // Use local medical terms mapping first for better accuracy
      let translatedText = this.translateMedicalTerms(text, sourceLang);
      
      // If significant translation occurred through medical terms, use it
      if (translatedText !== text) {
        return {
          translatedText,
          sourceLanguage: sourceLang,
          targetLanguage: 'en',
          confidence: 0.9, 
        };
      }

      const result = await (this.translator as (text: string, options: any) => Promise<any>)(text, {
        src_lang: this.getTranslationCode(sourceLang),
        tgt_lang: 'eng_Latn',
      });

      return {
        translatedText: result[0].translation_text,
        sourceLanguage: sourceLang,
        targetLanguage: 'en',
        confidence: 0.8,
      };
    } catch (error) {
      console.error('Translation failed:', error);
      return {
        translatedText: text, // Return original if translation fails
        sourceLanguage: sourceLang,
        targetLanguage: 'en',
        confidence: 0.1,
      };
    }
  }

  private translateMedicalTerms(text: string, sourceLang: string): string {
    if (!this.medicalTermsMapping[sourceLang as keyof typeof this.medicalTermsMapping]) {
      return text;
    }

          let translatedText = text;
    const termsMap = this.medicalTermsMapping[sourceLang as keyof typeof this.medicalTermsMapping];

    // Replace medical terms
    Object.entries(termsMap).forEach(([originalTerm, englishTerm]) => {
      const regex = new RegExp(originalTerm, 'gi');
      translatedText = translatedText.replace(regex, englishTerm);
    });

    // Replace body parts
    const bodyPartsMap = this.bodyPartsMapping[sourceLang as keyof typeof this.bodyPartsMapping];
    if (bodyPartsMap) {
      Object.entries(bodyPartsMap).forEach(([originalPart, englishPart]) => {
        const regex = new RegExp(originalPart, 'gi');
        translatedText = translatedText.replace(regex, englishPart);
      });
    }

    return translatedText;
  }

  private getTranslationCode(langCode: string): string {
    const translationCodes: Record<string, string> = {
      'hi': 'hin_Deva',
      'bn': 'ben_Beng',
      'ta': 'tam_Taml',
      'te': 'tel_Telu',
      'gu': 'guj_Gujr',
      'mr': 'mar_Deva',
      'kn': 'kan_Knda',
      'en': 'eng_Latn',
    };

    return translationCodes[langCode] || 'eng_Latn';
  }

  async extractSymptoms(text: string, language: string): Promise<SymptomExtractionResult> {
    if (!this.initialized) {
      await this.initializeModels();
    }

    try {
      // First translate to English if needed
      let englishText = text;
      if (language !== 'en') {
        const translation = await this.translateToEnglish(text, language);
        englishText = translation.translatedText;
      }

      // Extract medical entities
      const entities = await (this.medicalNER as (text: string) => Promise<any>)(englishText);
      
      // Process and categorize entities
      const symptoms: string[] = [];
      const bodyParts: string[] = [];
      const medicalTerms: string[] = [];

      // Medical symptom keywords
      const symptomKeywords = [
        'pain', 'ache', 'fever', 'cough', 'headache', 'nausea', 'vomiting', 
        'dizziness', 'fatigue', 'weakness', 'swelling', 'rash', 'itching',
        'difficulty breathing', 'shortness of breath', 'chest pain', 'abdominal pain',
        'back pain', 'joint pain', 'muscle pain', 'sore throat', 'runny nose',
        'congestion', 'diarrhea', 'constipation', 'bloating', 'indigestion'
      ];

      const bodyPartKeywords = [
        'head', 'chest', 'stomach', 'back', 'arm', 'leg', 'throat', 'eye',
        'ear', 'nose', 'mouth', 'neck', 'shoulder', 'hand', 'foot', 'knee'
      ];

      // Simple keyword extraction (can be enhanced with more sophisticated NER)
      const words = englishText.toLowerCase().split(/\s+/);
      
      for (const word of words) {
        if (symptomKeywords.some(symptom => symptom.includes(word) || word.includes(symptom))) {
          const matchedSymptom = symptomKeywords.find(symptom => 
            symptom.includes(word) || word.includes(symptom)
          );
          if (matchedSymptom && !symptoms.includes(matchedSymptom)) {
            symptoms.push(matchedSymptom);
          }
        }
        
        if (bodyPartKeywords.includes(word) && !bodyParts.includes(word)) {
          bodyParts.push(word);
        }
      }

      // Determine severity based on keywords
      const severity = this.determineSeverity(englishText);
      
      // Extract duration if mentioned
      const duration = this.extractDuration(englishText);

      return {
        symptoms,
        severity,
        bodyParts,
        duration,
        confidence: 0.8,
        medicalTerms: [...symptoms, ...bodyParts],
      };
    } catch (error) {
      console.error('Symptom extraction failed:', error);
      return {
        symptoms: [],
        severity: 'mild',
        bodyParts: [],
        duration: null,
        confidence: 0.1,
        medicalTerms: [],
      };
    }
  }

  private determineSeverity(text: string): 'mild' | 'moderate' | 'severe' | 'critical' {
    const criticalKeywords = ['severe', 'intense', 'unbearable', 'emergency', 'urgent', 'critical'];
    const severeKeywords = ['bad', 'terrible', 'awful', 'horrible', 'excruciating'];
    const moderateKeywords = ['moderate', 'noticeable', 'uncomfortable', 'bothersome'];
    
    const lowerText = text.toLowerCase();
    
    if (criticalKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'critical';
    }
    if (severeKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'severe';
    }
    if (moderateKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'moderate';
    }
    
    return 'mild';
  }

  private extractDuration(text: string): string | null {
    const durationPatterns = [
      /(\d+)\s*(days?|weeks?|months?|years?)/gi,
      /(since|for)\s*(\d+)\s*(days?|weeks?|months?|years?)/gi,
      /(yesterday|today|this morning|last night)/gi,
    ];

    for (const pattern of durationPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }

    return null;
  }

  async analyzeSymptoms(symptoms: string, language: string) {
    // Detect language if not provided
    if (!language) {
      const detection = await this.detectLanguage(symptoms);
      language = detection.language;
    }

    // Extract structured symptom information
    const extraction = await this.extractSymptoms(symptoms, language);
    
    // Translate to English for processing
    const translation = await this.translateToEnglish(symptoms, language);

    return {
      originalText: symptoms,
      detectedLanguage: language,
      translation: translation.translatedText,
      extractedSymptoms: extraction.symptoms,
      severity: extraction.severity,
      bodyParts: extraction.bodyParts,
      duration: extraction.duration,
      confidence: extraction.confidence,
      medicalTerms: extraction.medicalTerms,
    };
  }

  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  isLanguageSupported(langCode: string): boolean {
    return langCode in this.supportedLanguages;
  }
}

// Create singleton instance
const multilingualNLP = new MultilingualHealthNLP();

// Export named functions
export const detectLanguage = (text: string) => {
  return multilingualNLP.detectLanguage(text);
};

export const translateText = async (text: string, targetLanguage: string, sourceLanguage?: string) => {
  const sourceLang = sourceLanguage || (await multilingualNLP.detectLanguage(text)).language || 'en';
  return multilingualNLP.translateToEnglish(text, sourceLang);
};

export const extractSymptoms = (text: string, language: string = 'en') => {
  return multilingualNLP.extractSymptoms(text, language);
};

export const translateToEnglish = (text: string, sourceLanguage: string = 'en') => {
  return multilingualNLP.translateToEnglish(text, sourceLanguage);
};

export const analyzeSymptoms = (symptoms: string, language: string = 'en') => {
  return multilingualNLP.analyzeSymptoms(symptoms, language);
};

export const getSupportedLanguages = () => {
  return multilingualNLP.getSupportedLanguages();
};

export const isLanguageSupported = (langCode: string) => {
  return multilingualNLP.isLanguageSupported(langCode);
};

export default MultilingualHealthNLP;