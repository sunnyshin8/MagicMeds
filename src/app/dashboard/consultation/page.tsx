'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Metadata } from 'next';

// This is a client component, so metadata should be handled by layout
// The error is coming from service initialization during build
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Send,
  Mic,
  MicOff,
  Loader,
  Bot,
  User,
  Globe,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  FileText,
  Camera,
  Paperclip,
} from 'lucide-react';
import { analyzeSymptoms } from '@/services/healthAssessment';
import { detectLanguage, extractSymptoms } from '@/services/multilingualNLP';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
  symptomsExtracted?: string[];
  confidence?: number;
}

interface VoiceState {
  isListening: boolean;
  isSupported: boolean;
  language: string;
}

interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

export default function ConsultationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'नमस्ते! मैं MagicMeds AI डॉक्टर हूँ। आप अपनी भाषा में अपनी समस्या बता सकते हैं। मैं 8 भारतीय भाषाओं में आपकी मदद कर सकता हूँ।\n\nHello! I\'m your MagicMeds AI Doctor. You can describe your symptoms in any of 8 Indian languages, and I\'ll provide personalized healthcare guidance.',
      timestamp: new Date(),
      language: 'mixed'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSupported: false,
    language: 'en-IN'
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const messageIdCounter = useRef(1000);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
      setVoiceState(prev => ({
        ...prev,
        isSupported: 'webkitSpeechRecognition' in window
      }));
    }
  }, []);

  const initializeVoiceRecognition = () => {
    if (voiceState.isSupported && !recognitionRef.current) {
      const SpeechRecognition = (window as Window & { webkitSpeechRecognition: any }).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = voiceState.language;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setVoiceState(prev => ({ ...prev, isListening: false }));
      };

      recognition.onerror = () => {
        setVoiceState(prev => ({ ...prev, isListening: false }));
      };

      recognition.onend = () => {
        setVoiceState(prev => ({ ...prev, isListening: false }));
      };
      
      recognitionRef.current = recognition;
    }
  };

  const startListening = () => {
    initializeVoiceRecognition();
    if (recognitionRef.current) {
      setVoiceState(prev => ({ ...prev, isListening: true }));
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && voiceState.isListening) {
      recognitionRef.current.stop();
      setVoiceState(prev => ({ ...prev, isListening: false }));
    }
  };

  const speakMessage = (text: string, language: string = 'en') => {
    if (speechSynthesisRef.current && !isSpeaking) {
      // Stop any ongoing speech
      speechSynthesisRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language for speech synthesis
      const speechLangMap: { [key: string]: string } = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'bn': 'bn-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'gu': 'gu-IN',
        'mr': 'mr-IN',
        'kn': 'kn-IN',
      };
      
      utterance.lang = speechLangMap[language] || 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthesisRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const generateAIResponse = async (userMessage: string, detectedLanguage: string): Promise<string> => {
    try {
      // Extract symptoms from user message
      const symptomsResult = await extractSymptoms(userMessage, detectedLanguage);
      const symptoms = symptomsResult.symptoms;
      
      if (symptoms.length > 0) {
        // Analyze symptoms using health assessment service
        const analysis = await analyzeSymptoms(symptoms, {
          age: 28,
          gender: 'female',
          medicalHistory: [],
          currentMedications: [],
          region: 'India'
        });

        let response = '';
        
        // Generate response based on detected language
        if (detectedLanguage === 'hi') {
          response = `मैंने आपके लक्षणों का विश्लेषण किया है। आपके मुख्य लक्षण हैं: ${symptoms.join(', ')}।\n\n`;
          
          const urgency = analysis.emergencyLevel || analysis.urgencyLevel;
          if (urgency === 'high' || urgency === 'emergency') {
            response += '⚠️ यह गंभीर स्थिति हो सकती है। कृपया तुरंत डॉक्टर से संपर्क करें।';
          } else if (urgency === 'medium' || urgency === 'urgent') {
            response += '⚡ सलाह दी जाती है कि आप जल्दी डॉक्टर से मिलें।';
          } else {
            response += '✅ यह सामान्य समस्या लगती है।';
          }
          
          response += `\n\nसंभावित कारण:\n${analysis.possibleConditions.map(c => `• ${c.condition} (${Math.round(c.confidence * 100)}% संभावना)`).join('\n')}`;
          
          const recommendations = analysis.recommendations || analysis.nextSteps || [];
          if (recommendations.length > 0) {
            response += `\n\nसुझाव:\n${recommendations.map(r => `• ${r}`).join('\n')}`;
          }
        } else {
          response = `I've analyzed your symptoms. Your main symptoms are: ${symptoms.join(', ')}.\n\n`;
          
          const urgency = analysis.emergencyLevel || analysis.urgencyLevel;
          if (urgency === 'high' || urgency === 'emergency') {
            response += '⚠️ This could be a serious condition. Please seek immediate medical attention.';
          } else if (urgency === 'medium' || urgency === 'urgent') {
            response += '⚡ I recommend you see a doctor soon.';
          } else {
            response += '✅ This appears to be a common condition.';
          }
          
          response += `\n\nPossible conditions:\n${analysis.possibleConditions.map(c => `• ${c.condition} (${Math.round(c.confidence * 100)}% likelihood)`).join('\n')}`;
          
          const recommendations = analysis.recommendations || analysis.nextSteps || [];
          if (recommendations.length > 0) {
            response += `\n\nRecommendations:\n${recommendations.map(r => `• ${r}`).join('\n')}`;
          }
        }
        
        response += `\n\n💡 Remember: This is AI-powered guidance. For accurate diagnosis, please consult with a qualified healthcare provider.`;
        
        return response;
      } else {
        // General health conversation
        const generalResponses = {
          hi: 'मैं आपकी मदद करने के लिए यहाँ हूँ। कृपया अपने लक्षण या स्वास्थ्य संबंधी चिंता के बारे में विस्तार से बताएं।',
          en: 'I\'m here to help you with your health concerns. Please describe your symptoms or health questions in detail.',
          bn: 'আমি আপনার স্বাস্থ্য সংক্রান্ত সমস্যায় সাহায্য করতে এখানে আছি। অনুগ্রহ করে আপনার লক্ষণগুলি বিস্তারিত বলুন।',
          ta: 'உங்கள் உடல்நலப் பிரச்சினைகளுக்கு உதவ நான் இங்கே இருக்கிறேன். உங்கள் அறிகுறிகளை விரிவாகக் கூறுங்கள்।'
        };
        
        return generalResponses[detectedLanguage as keyof typeof generalResponses] || generalResponses.en;
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      return detectedLanguage === 'hi' 
        ? 'क्षमा करें, कुछ तकनीकी समस्या हुई है। कृपया दोबारा कोशिश करें।'
        : 'Sorry, I encountered a technical issue. Please try again.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${messageIdCounter.current++}`,
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Detect language of user input
      const detectedLanguageResult = await detectLanguage(userMessage.content);
      const detectedLanguage = detectedLanguageResult.language;
      
      // Generate AI response
      const aiResponse = await generateAIResponse(userMessage.content, detectedLanguage);
      
      const assistantMessage: Message = {
        id: `msg-${messageIdCounter.current++}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        language: detectedLanguage,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Auto-speak response if enabled
      setTimeout(() => {
        speakMessage(aiResponse, detectedLanguage);
      }, 500);

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: `msg-${messageIdCounter.current++}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Bot className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">AI Health Consultation</CardTitle>
                <CardDescription className="text-primary-100">
                  Multilingual AI-powered healthcare guidance
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 rounded-lg p-2">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">24/7 Available</p>
                <p className="text-xs text-primary-200">8 Indian Languages</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Language Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-neutral-600" />
              <span className="font-medium">Select Language:</span>
            </div>
            <div className="flex items-center space-x-2">
              {supportedLanguages.slice(0, 4).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedLanguage === lang.code
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
              <button className="px-2 py-1 text-sm text-neutral-500 hover:text-neutral-700">
                +4 more
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-96">
        <CardContent className="p-0 h-full">
          {/* Messages */}
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                    message.role === 'user' ? 'order-2' : 'order-1'
                  }`}>
                    <div className={`flex items-start space-x-3 ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-secondary-600 text-white'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      
                      <div className={`flex-1 p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-900'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-xs ${
                            message.role === 'user' ? 'text-primary-100' : 'text-neutral-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </span>
                          
                          {message.role === 'assistant' && (
                            <button
                              onClick={() => speakMessage(message.content, message.language)}
                              className="text-neutral-500 hover:text-neutral-700 ml-2"
                            >
                              <Volume2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-neutral-100 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Loader className="h-4 w-4 animate-spin text-secondary-600" />
                        <span className="text-neutral-600">AI is analyzing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-neutral-200 p-4">
              <div className="flex items-center space-x-3">
                {/* Attachments */}
                <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg">
                  <Paperclip className="h-5 w-5" />
                </button>
                
                {/* Voice Input */}
                {voiceState.isSupported && (
                  <button
                    onClick={voiceState.isListening ? stopListening : startListening}
                    className={`p-2 rounded-lg transition-colors ${
                      voiceState.isListening
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {voiceState.isListening ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </button>
                )}

                {/* Message Input */}
                <div className="flex-1">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      selectedLanguage === 'hi' 
                        ? 'अपने लक्षण या सवाल यहाँ लिखें...'
                        : 'Describe your symptoms or ask a health question...'
                    }
                    disabled={isLoading}
                    className="border-0 focus:ring-0 bg-neutral-50"
                  />
                </div>

                {/* Send Button */}
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  variant="primary"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>

                {/* Stop Speaking */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg"
                  >
                    <VolumeX className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Emergency Help</h3>
            <p className="text-sm text-neutral-600">Immediate medical assistance</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">View Reports</h3>
            <p className="text-sm text-neutral-600">Access your health records</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Camera className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Scan Symptoms</h3>
            <p className="text-sm text-neutral-600">AI-powered visual diagnosis</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}