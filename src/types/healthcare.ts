// Healthcare-specific TypeScript interfaces for MagicMeds platform
// Comprehensive type definitions for multilingual telemedicine application

export interface User {
  id: string;
  email: string;
  phone?: string;
  preferredLanguage: string;
  locationState?: string;
  locationDistrict?: string;
  createdAt: Date;
  updatedAt: Date;
  isOfflineEnabled: boolean;
  healthProfile?: HealthProfile;
}

export interface HealthProfile {
  id: string;
  userId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height?: number; // in cm
  weight?: number; // in kg
  bloodType?: string;
  allergies: string[];
  medications: Medication[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  familyHistory: FamilyHistory;
  lifestyle: LifestyleFactors;
  vitalSigns: VitalSigns[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  prescribedBy: string;
}

export interface FamilyHistory {
  diabetes: boolean;
  hypertension: boolean;
  heartDisease: boolean;
  cancer: boolean;
  mentalHealth: boolean;
  other: string[];
}

export interface LifestyleFactors {
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'none' | 'occasional' | 'moderate' | 'heavy';
  exerciseFrequency: 'none' | 'light' | 'moderate' | 'intense';
  dietType: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'other';
  sleepHours: number;
  stressLevel: 1 | 2 | 3 | 4 | 5; // 1-5 scale
}

export interface VitalSigns {
  id: string;
  userId: string;
  recordedAt: Date;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: number; // in Celsius
  oxygenSaturation?: number;
  bloodSugar?: number;
  weight?: number;
}

export interface SymptomAnalysis {
  symptoms: string[];
  possibleConditions: {
    condition: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high' | 'emergency';
    description: string;
    recommendations: string[];
  }[];
  redFlags: string[]; // Emergency symptoms requiring immediate attention
  nextSteps: string[];
  consultationRecommended: boolean;
  urgencyLevel: 'routine' | 'urgent' | 'emergency';
  emergencyLevel: 'low' | 'medium' | 'high' | 'routine' | 'urgent' | 'emergency'; // For backward compatibility
  recommendations: string[]; // Top-level recommendations
}

export interface HealthRiskAssessment {
  diabetesRisk: number; // 0-100 risk score
  hypertensionRisk: number;
  cardiovascularRisk: number;
  pregnancyComplications?: number; // For pregnant users
  childMalnutritionRisk?: number; // For child profiles
  assessmentDate: Date;
  riskFactors: string[];
  recommendations: string[];
}

export interface Consultation {
  id: string;
  patientId: string;
  providerId?: string;
  type: 'ai' | 'human' | 'video' | 'voice';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduledAt: Date;
  completedAt?: Date;
  symptoms: string[];
  diagnosis?: string;
  treatment?: string;
  prescriptions: Medication[];
  followUpRequired: boolean;
  followUpDate?: Date;
  notes: string;
  language: string;
  isOffline: boolean;
}

export interface EducationModule {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: EducationTopic[];
  estimatedDuration: number; // in minutes
  gamificationElements: {
    badges: Badge[];
    progressPoints: number;
    challenges: Challenge[];
  };
  isOfflineAvailable: boolean;
}

export interface EducationTopic {
  id: string;
  title: string;
  content: string;
  mediaUrls: string[];
  interactiveElements: InteractiveElement[];
  quiz?: Quiz;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  criteria: string;
  points: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  progress: number;
  reward: number; // points
}

export interface InteractiveElement {
  type: 'video' | 'animation' | 'simulation' | 'quiz';
  content: string;
  duration?: number;
}

export interface Quiz {
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface VoiceSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  transcription: string;
  detectedLanguage: string;
  confidence: number;
  extractedSymptoms: string[];
  audioUrl?: string;
  processingStatus: 'pending' | 'completed' | 'failed';
}

export interface HealthRecord {
  id: string;
  userId: string;
  type: 'consultation' | 'vitals' | 'medication' | 'symptom' | 'education';
  data: any;
  createdAt: Date;
  syncStatus: 'synced' | 'pending' | 'conflict';
  isEncrypted: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: Date;
}

// Navigation and UI Types
export interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType;
  requiresAuth?: boolean;
  children?: NavigationItem[];
}

// Theme and Design System Types
export interface HealthcareTheme {
  colors: {
    primary: string; // Medical blue #1e40af
    secondary: string; // Healing green #059669
    accent: string; // Warm orange #ea580c
    neutral: string; // High contrast grays
    error: string; // Medical red #dc2626
    success: string; // Healthy green #16a34a
    warning: string; // Caution yellow #ca8a04
    info: string; // Information blue #0284c7
  };
  spacing: Record<string, string>;
  typography: Record<string, string>;
  breakpoints: Record<string, string>;
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Multilingual Support Types
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
  isSupported: boolean;
}

export interface Translation {
  key: string;
  language: string;
  value: string;
  context?: string;
}

// Security and Compliance Types
export interface SecurityConfig {
  encryptionKey: string;
  auditLogging: boolean;
  dataRetentionDays: number;
  accessLogging: boolean;
  mfaRequired: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  dataType: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  details?: any;
}

export interface DataShareRequest {
  fromUserId: string;
  toUserId: string;
  dataType: string;
  permissions: string[];
  expiresAt?: Date;
  purpose: string;
}

// Offline and PWA Types
export interface OfflineData {
  id: string;
  type: string;
  data: any;
  lastModified: Date;
  syncPriority: 'high' | 'medium' | 'low';
}

export interface SyncStatus {
  lastSync: Date;
  pendingItems: number;
  conflictItems: number;
  isOnline: boolean;
}