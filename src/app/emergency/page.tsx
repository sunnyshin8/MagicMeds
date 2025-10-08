// Emergency Page - Quick access to emergency services and first aid
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  PhoneIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon,
  FireIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
  InformationCircleIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';

interface EmergencyContact {
  name: string;
  number: string;
  type: 'ambulance' | 'police' | 'fire' | 'hospital' | 'poison';
  available24x7: boolean;
}

interface FirstAidGuide {
  id: string;
  title: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
  steps: string[];
  warnings?: string[];
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: 'Emergency Ambulance',
    number: '108',
    type: 'ambulance',
    available24x7: true,
  },
  {
    name: 'Police Emergency',
    number: '100',
    type: 'police',
    available24x7: true,
  },
  {
    name: 'Fire Emergency',
    number: '101',
    type: 'fire',
    available24x7: true,
  },
  {
    name: 'MagicMeds Emergency',
    number: '+91-9876543210',
    type: 'hospital',
    available24x7: true,
  },
  {
    name: 'Poison Control Center',
    number: '1066',
    type: 'poison',
    available24x7: true,
  },
];

const firstAidGuides: FirstAidGuide[] = [
  {
    id: 'heart-attack',
    title: 'Heart Attack',
    description: 'Chest pain, shortness of breath, nausea',
    urgency: 'high',
    steps: [
      'Call emergency services immediately (108)',
      'Help the person sit down and rest',
      'Give aspirin if available and person is not allergic',
      'Loosen tight clothing around neck and chest',
      'Monitor breathing and pulse',
      'Begin CPR if person becomes unconscious',
    ],
    warnings: [
      'Do not leave the person alone',
      'Do not give food or water',
      'Do not drive to hospital yourself',
    ],
  },
  {
    id: 'choking',
    title: 'Choking',
    description: 'Unable to speak, cough, or breathe',
    urgency: 'high',
    steps: [
      'Ask \"Are you choking?\" If they cannot speak, act immediately',
      'Stand behind the person and wrap arms around waist',
      'Make a fist with one hand, place thumb side on abdomen above navel',
      'Grasp fist with other hand and give quick upward thrusts',
      'Repeat until object is expelled or person becomes unconscious',
      'If unconscious, begin CPR and call emergency services',
    ],
    warnings: [
      'Do not hit the back of a choking person',
      'Do not try to remove object with fingers unless visible',
    ],
  },
  {
    id: 'severe-bleeding',
    title: 'Severe Bleeding',
    description: 'Heavy bleeding from cuts or wounds',
    urgency: 'high',
    steps: [
      'Call emergency services if bleeding is severe',
      'Apply direct pressure to wound with clean cloth',
      'Elevate the injured area above heart level if possible',
      'Do not remove embedded objects',
      'Add more cloth if blood soaks through, do not remove original',
      'Apply pressure to pressure points if bleeding continues',
    ],
    warnings: [
      'Do not remove embedded foreign objects',
      'Do not use tourniquet unless trained',
    ],
  },
  {
    id: 'burns',
    title: 'Burns',
    description: 'First, second, or third-degree burns',
    urgency: 'medium',
    steps: [
      'Remove person from heat source safely',
      'Cool burn with cool (not cold) running water for 10-20 minutes',
      'Remove jewelry/clothing before swelling begins',
      'Cover burn with sterile, non-adherent bandage',
      'Do not break blisters',
      'Seek medical attention for serious burns',
    ],
    warnings: [
      'Do not use ice on burns',
      'Do not apply butter, oil, or home remedies',
      'Do not break blisters',
    ],
  },
  {
    id: 'fractures',
    title: 'Bone Fractures',
    description: 'Broken or suspected broken bones',
    urgency: 'medium',
    steps: [
      'Do not move the person unless in immediate danger',
      'Immobilize the injured area',
      'Apply ice wrapped in cloth to reduce swelling',
      'Check for circulation below the injury',
      'Call emergency services for severe fractures',
      'Treat for shock if necessary',
    ],
    warnings: [
      'Do not try to realign broken bones',
      'Do not move person with neck/back injuries',
    ],
  },
  {
    id: 'unconscious',
    title: 'Unconscious Person',
    description: 'Person is unresponsive but breathing',
    urgency: 'high',
    steps: [
      'Check responsiveness by tapping shoulders and shouting',
      'Call emergency services immediately',
      'Check for breathing and pulse',
      'If breathing, place in recovery position',
      'If not breathing, begin CPR immediately',
      'Stay with person until help arrives',
    ],
    warnings: [
      'Do not move person if spinal injury suspected',
      'Do not give food or water to unconscious person',
    ],
  },
];

const getContactIcon = (type: string) => {
  switch (type) {
    case 'ambulance': return <HeartIcon className="w-6 h-6" />;
    case 'police': return <ShieldExclamationIcon className="w-6 h-6" />;
    case 'fire': return <FireIcon className="w-6 h-6" />;
    case 'hospital': return <UserGroupIcon className="w-6 h-6" />;
    case 'poison': return <ExclamationTriangleIcon className="w-6 h-6" />;
    default: return <PhoneIcon className="w-6 h-6" />;
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'high': return 'bg-red-100 text-red-600 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-600 border-green-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

export default function EmergencyPage() {
  const [selectedGuide, setSelectedGuide] = useState<FirstAidGuide | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Location unavailable');
        }
      );
    } else {
      setCurrentLocation('Geolocation not supported');
    }
  };

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5" />
            <span className="font-medium">FOR LIFE-THREATENING EMERGENCIES, CALL 108 IMMEDIATELY</span>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Emergency Services</h1>
            <p className="text-lg text-gray-600">Quick access to emergency contacts and first aid guidance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Emergency Contacts */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <PhoneIcon className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
                </div>
                
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmergencyCall(contact.number)}
                      className="w-full p-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        {getContactIcon(contact.type)}
                        <div className="flex-1 text-left">
                          <div className="font-semibold">{contact.name}</div>
                          <div className="text-sm opacity-90">{contact.number}</div>
                        </div>
                        {contact.available24x7 && (
                          <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                            24x7
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Location Sharing */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPinIcon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Share Location</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Share your location with emergency services for faster response
                  </p>
                  <Button 
                    onClick={getCurrentLocation}
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    Get Current Location
                  </Button>
                  {currentLocation && (
                    <div className="mt-2 p-2 bg-white rounded text-xs">
                      <strong>Location:</strong> {currentLocation}
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* First Aid Guides */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <HeartIcon className="w-6 h-6 text-teal-600" />
                  <h2 className="text-xl font-bold text-gray-900">First Aid Guides</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {firstAidGuides.map((guide) => (
                    <Card
                      key={guide.id}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedGuide?.id === guide.id ? 'ring-2 ring-teal-500' : ''
                      }`}
                      onClick={() => setSelectedGuide(guide)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(guide.urgency)}`}>
                          {guide.urgency.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                      <div className="flex items-center space-x-2 text-teal-600">
                        <PlayIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">View Steps</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Selected Guide Details */}
              {selectedGuide && (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedGuide.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(selectedGuide.urgency)}`}>
                        {selectedGuide.urgency.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{selectedGuide.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Steps */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Steps to Follow</h4>
                      <ol className="space-y-3">
                        {selectedGuide.steps.map((step, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    {/* Warnings */}
                    {selectedGuide.warnings && selectedGuide.warnings.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-red-600 mb-3 flex items-center space-x-2">
                          <ExclamationTriangleIcon className="w-5 h-5" />
                          <span>Important Warnings</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedGuide.warnings.map((warning, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <ExclamationTriangleIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-red-700 text-sm">{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {selectedGuide.urgency === 'high' && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-800">Time Critical</span>
                      </div>
                      <p className="text-red-700 text-sm mt-1">
                        This is a life-threatening emergency. Call 108 immediately and follow these steps while waiting for help.
                      </p>
                    </div>
                  )}
                </Card>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <Card className="mt-8 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <InformationCircleIcon className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Important Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">When to Call Emergency Services</h4>
                <ul className="space-y-1">
                  <li>• Difficulty breathing or no breathing</li>
                  <li>• Chest pain or heart attack symptoms</li>
                  <li>• Severe bleeding</li>
                  <li>• Head or spinal injuries</li>
                  <li>• Loss of consciousness</li>
                  <li>• Severe allergic reactions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What to Tell Emergency Services</h4>
                <ul className="space-y-1">
                  <li>• Your exact location</li>
                  <li>• Nature of the emergency</li>
                  <li>• Number of people affected</li>
                  <li>• Current condition of the patient</li>
                  <li>• Any immediate dangers</li>
                  <li>• Your contact number</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">General Safety Tips</h4>
                <ul className="space-y-1">
                  <li>• Stay calm and think clearly</li>
                  <li>• Ensure scene safety first</li>
                  <li>• Do not move injured persons unless necessary</li>
                  <li>• Apply universal precautions</li>
                  <li>• Stay with the patient until help arrives</li>
                  <li>• Follow dispatcher instructions</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}