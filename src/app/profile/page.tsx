'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  UserIcon,
  HeartIcon,
  CogIcon,
  PencilIcon,
  CameraIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalInfo: {
    bloodType: string;
    allergies: string[];
    medications: string[];
    conditions: string[];
  };
  preferences: {
    language: string;
    notifications: {
      appointments: boolean;
      medications: boolean;
      healthTips: boolean;
      emergencyAlerts: boolean;
    };
    privacy: {
      shareDataForResearch: boolean;
      allowLocationTracking: boolean;
    };
  };
}

const initialProfile: UserProfile = {
  id: '1',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@email.com',
  phone: '+91-9876543210',
  dateOfBirth: '1985-06-15',
  gender: 'male',
  address: 'A-123, Sector 15, Noida, Uttar Pradesh 201301',
  emergencyContact: {
    name: 'Priya Kumar',
    phone: '+91-9876543211',
    relationship: 'Spouse',
  },
  medicalInfo: {
    bloodType: 'B+',
    allergies: ['Penicillin', 'Shellfish'],
    medications: ['Metformin 500mg'],
    conditions: ['Type 2 Diabetes', 'Hypertension'],
  },
  preferences: {
    language: 'English',
    notifications: {
      appointments: true,
      medications: true,
      healthTips: false,
      emergencyAlerts: true,
    },
    privacy: {
      shareDataForResearch: false,
      allowLocationTracking: true,
    },
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'medical' | 'preferences'>('personal');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setIsEditing(false);
  };

  const updateProfile = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedProfile = (section: string, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof UserProfile] as any,
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your personal information and health settings</p>
        </div>

        {/* Profile Header */}
        <Card className="p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border">
                <CameraIcon className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>{profile.phone}</span>
                <span>•</span>
                <span>{profile.medicalInfo.bloodType}</span>
                <span>•</span>
                <span>Age 39</span>
              </div>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <XMarkIcon className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'personal'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserIcon className="w-4 h-4 inline mr-2" />
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'medical'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <HeartIcon className="w-4 h-4 inline mr-2" />
              Medical Info
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'preferences'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CogIcon className="w-4 h-4 inline mr-2" />
              Preferences
            </button>
          </div>
        </div>

        {/* Personal Information */}
        {activeTab === 'personal' && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  value={profile.email}
                  onChange={(e) => updateProfile('email', e.target.value)}
                  disabled={!isEditing}
                  type="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input
                  value={profile.phone}
                  onChange={(e) => updateProfile('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <Input
                  value={profile.dateOfBirth}
                  onChange={(e) => updateProfile('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                  type="date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => updateProfile('gender', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <Input
                  value={profile.address}
                  onChange={(e) => updateProfile('address', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Emergency Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input
                  value={profile.emergencyContact.name}
                  onChange={(e) => updateNestedProfile('emergencyContact', 'name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input
                  value={profile.emergencyContact.phone}
                  onChange={(e) => updateNestedProfile('emergencyContact', 'phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <Input
                  value={profile.emergencyContact.relationship}
                  onChange={(e) => updateNestedProfile('emergencyContact', 'relationship', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Medical Information */}
        {activeTab === 'medical' && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Medical Information</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
              <select
                value={profile.medicalInfo.bloodType}
                onChange={(e) => updateNestedProfile('medicalInfo', 'bloodType', e.target.value)}
                disabled={!isEditing}
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Allergies */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Allergies</h4>
                <div className="space-y-2">
                  {profile.medicalInfo.allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center justify-between px-3 py-2 bg-red-100 text-red-800 rounded-lg text-sm">
                      <span>{allergy}</span>
                      {isEditing && (
                        <button className="text-red-600 hover:text-red-800">
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Medications</h4>
                <div className="space-y-2">
                  {profile.medicalInfo.medications.map((medication, index) => (
                    <div key={index} className="flex items-center justify-between px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm">
                      <span>{medication}</span>
                      {isEditing && (
                        <button className="text-blue-600 hover:text-blue-800">
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditions */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Conditions</h4>
                <div className="space-y-2">
                  {profile.medicalInfo.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center justify-between px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                      <span>{condition}</span>
                      {isEditing && (
                        <button className="text-yellow-600 hover:text-yellow-800">
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Preferences */}
        {activeTab === 'preferences' && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={profile.preferences.language}
                  onChange={(e) => updateNestedProfile('preferences', 'language', e.target.value)}
                  disabled={!isEditing}
                  className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिंदी</option>
                  <option value="Tamil">தமிழ்</option>
                  <option value="Bengali">বাংলা</option>
                </select>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.preferences.notifications.appointments}
                      onChange={(e) => updateNestedProfile('preferences', 'notifications', {
                        ...profile.preferences.notifications,
                        appointments: e.target.checked
                      })}
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Appointment reminders</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.preferences.notifications.medications}
                      onChange={(e) => updateNestedProfile('preferences', 'notifications', {
                        ...profile.preferences.notifications,
                        medications: e.target.checked
                      })}
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Medication reminders</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.preferences.notifications.healthTips}
                      onChange={(e) => updateNestedProfile('preferences', 'notifications', {
                        ...profile.preferences.notifications,
                        healthTips: e.target.checked
                      })}
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Health tips and articles</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.preferences.notifications.emergencyAlerts}
                      onChange={(e) => updateNestedProfile('preferences', 'notifications', {
                        ...profile.preferences.notifications,
                        emergencyAlerts: e.target.checked
                      })}
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Emergency alerts</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.preferences.privacy.shareDataForResearch}
                      onChange={(e) => updateNestedProfile('preferences', 'privacy', {
                        ...profile.preferences.privacy,
                        shareDataForResearch: e.target.checked
                      })}
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Share data for medical research</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.preferences.privacy.allowLocationTracking}
                      onChange={(e) => updateNestedProfile('preferences', 'privacy', {
                        ...profile.preferences.privacy,
                        allowLocationTracking: e.target.checked
                      })}
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow location tracking for emergency services</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}