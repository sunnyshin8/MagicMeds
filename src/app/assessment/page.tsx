// Health Assessment Page - Comprehensive symptom checker and health evaluation
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  HeartIcon,
  UserIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface AssessmentStep {
  id: string;
  title: string;
  description: string;
  questions: Array<{
    id: string;
    question: string;
    type: 'text' | 'select' | 'multiselect' | 'scale';
    options?: string[];
    required: boolean;
  }>;
}

const assessmentSteps: AssessmentStep[] = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Help us understand your basic health profile',
    questions: [
      {
        id: 'age',
        question: 'What is your age?',
        type: 'text',
        required: true,
      },
      {
        id: 'gender',
        question: 'What is your gender?',
        type: 'select',
        options: ['Male', 'Female', 'Other', 'Prefer not to say'],
        required: true,
      },
      {
        id: 'location',
        question: 'What is your location (city, state)?',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    id: 'symptoms',
    title: 'Current Symptoms',
    description: 'Tell us about any symptoms you\'re experiencing',
    questions: [
      {
        id: 'primary-symptom',
        question: 'What is your main concern or symptom?',
        type: 'text',
        required: true,
      },
      {
        id: 'symptom-duration',
        question: 'How long have you been experiencing this?',
        type: 'select',
        options: ['Less than 1 day', '1-3 days', '1 week', '2-4 weeks', 'More than 1 month'],
        required: true,
      },
      {
        id: 'pain-scale',
        question: 'On a scale of 1-10, how would you rate your discomfort?',
        type: 'scale',
        required: false,
      },
    ],
  },
  {
    id: 'medical-history',
    title: 'Medical History',
    description: 'Information about your past medical conditions',
    questions: [
      {
        id: 'conditions',
        question: 'Do you have any existing medical conditions?',
        type: 'multiselect',
        options: ['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 'None'],
        required: false,
      },
      {
        id: 'medications',
        question: 'Are you currently taking any medications?',
        type: 'text',
        required: false,
      },
    ],
  },
];

export default function HealthAssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isAssessing, setIsAssessing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    setIsAssessing(true);
    // Simulate AI assessment
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setResults({
      riskLevel: 'moderate',
      recommendations: [
        'Consider scheduling an appointment with a general practitioner',
        'Monitor symptoms for any changes',
        'Stay hydrated and get adequate rest',
      ],
      urgency: 'non-urgent',
      nextSteps: 'Schedule a consultation within 1-2 weeks',
    });
    setIsAssessing(false);
  };

  const currentStepData = assessmentSteps[currentStep];
  const progress = ((currentStep + 1) / assessmentSteps.length) * 100;

  if (results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessment Results</h1>
            <p className="text-lg text-gray-600">Based on your responses, here&apos;s our recommendation</p>
          </div>

          <Card className="p-8">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                results.riskLevel === 'low' ? 'bg-green-100 text-green-600' :
                results.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {results.riskLevel === 'low' ? <CheckCircleIcon className="w-8 h-8" /> :
                 results.riskLevel === 'moderate' ? <InformationCircleIcon className="w-8 h-8" /> :
                 <ExclamationTriangleIcon className="w-8 h-8" />}
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${
                results.riskLevel === 'low' ? 'text-green-600' :
                results.riskLevel === 'moderate' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {results.riskLevel === 'low' ? 'Low Risk' :
                 results.riskLevel === 'moderate' ? 'Moderate Concern' :
                 'High Priority'}
              </h2>
              <p className="text-gray-600">{results.nextSteps}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircleIcon className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={() => window.location.href = '/dashboard/consultation'}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
                >
                  Start AI Consultation
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers({});
                    setResults(null);
                  }}
                  className="flex-1"
                >
                  Take New Assessment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Health Assessment</h1>
          <p className="text-lg text-gray-600">Get personalized health insights powered by AI</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {assessmentSteps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-600 to-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Card className="p-8">
          {isAssessing ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Health Data</h3>
              <p className="text-gray-600">Our AI is processing your information to provide personalized recommendations...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h2>
                <p className="text-gray-600">{currentStepData.description}</p>
              </div>

              <div className="space-y-6">
                {currentStepData.questions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {question.type === 'text' && (
                      <Input
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder="Enter your answer..."
                        className="w-full"
                      />
                    )}
                    
                    {question.type === 'select' && (
                      <select
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="">Select an option...</option>
                        {question.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {question.type === 'scale' && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">1</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={answers[question.id] || 5}
                          onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm text-gray-500">10</span>
                        <span className="text-sm font-medium text-teal-600 ml-2">
                          {answers[question.id] || 5}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="px-6"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="px-6 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
                >
                  {currentStep === assessmentSteps.length - 1 ? 'Complete Assessment' : 'Next'}
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}