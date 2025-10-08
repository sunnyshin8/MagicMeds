'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Heart,
  MessageSquare,
  Calendar,
  FileText,
  TrendingUp,
  Activity,
  Thermometer,
  Scale,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  ArrowRight,
  Zap,
  Shield,
  Star,
} from 'lucide-react';

interface VitalSign {
  type: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  lastUpdated: string;
  icon: React.ComponentType<any>;
}

interface Appointment {
  id: string;
  type: string;
  doctor: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface HealthAlert {
  id: string;
  type: 'medication' | 'appointment' | 'vital' | 'checkup';
  message: string;
  priority: 'low' | 'medium' | 'high';
  time: string;
}

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [user] = useState({
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    lastCheckup: '2024-01-15',
    memberSince: '2023-06-01',
  });

  // Mock data - would come from API
  const [vitalSigns] = useState<VitalSign[]>([
    {
      type: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      lastUpdated: '2 hours ago',
      icon: Heart,
    },
    {
      type: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      lastUpdated: '2 hours ago',
      icon: Activity,
    },
    {
      type: 'Temperature',
      value: '98.6',
      unit: '°F',
      status: 'normal',
      lastUpdated: '5 hours ago',
      icon: Thermometer,
    },
    {
      type: 'Weight',
      value: '65',
      unit: 'kg',
      status: 'normal',
      lastUpdated: '1 day ago',
      icon: Scale,
    },
  ]);

  const [upcomingAppointments] = useState<Appointment[]>([
    {
      id: '1',
      type: 'General Checkup',
      doctor: 'Dr. Rajesh Kumar',
      date: '2024-01-25',
      time: '10:00 AM',
      status: 'upcoming',
    },
    {
      id: '2',
      type: 'AI Consultation',
      doctor: 'MagicMeds AI',
      date: '2024-01-26',
      time: '2:00 PM',
      status: 'upcoming',
    },
  ]);

  const [healthAlerts] = useState<HealthAlert[]>([
    {
      id: '1',
      type: 'medication',
      message: 'Time to take your daily vitamins',
      priority: 'medium',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'checkup',
      message: 'Annual health checkup due next month',
      priority: 'low',
      time: '1 day ago',
    },
  ]);

  const [healthScore] = useState(85);
  const [consultationsThisMonth] = useState(3);
  const [recordsUploaded] = useState(12);

  interface LifestyleData {
    smokingStatus?: string;
    exerciseFrequency?: string;
    alcoholConsumption?: string;
    stressLevel?: number;
  }

  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date());
    // Update every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getVitalStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'danger':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-neutral-500 bg-neutral-50';
    }
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (time: Date) => {
    return time.toLocaleDateString('en-IN', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Good {currentTime ? (currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 17 ? 'Afternoon' : 'Evening') : 'Day'}, {user.name}!
            </h1>
            <p className="text-primary-100 mb-1">{currentTime ? formatDate(currentTime) : '--'}</p>
            <p className="text-primary-200 text-sm">Current time: {currentTime ? formatTime(currentTime) : '--'}</p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">Health Score</span>
              </div>
              <div className="text-2xl font-bold mt-1">{healthScore}/100</div>
            </div>
            <p className="text-primary-200 text-sm">Great progress!</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/consultation">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary-200 hover:border-primary-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">AI Consultation</h3>
                  <p className="text-sm text-neutral-600">Start chat with AI doctor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/appointments">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-secondary-200 hover:border-secondary-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Book Appointment</h3>
                  <p className="text-sm text-neutral-600">Schedule with doctors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/records">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-accent-200 hover:border-accent-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent-100 rounded-lg">
                  <FileText className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Health Records</h3>
                  <p className="text-sm text-neutral-600">View your history</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/emergency">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-red-200 hover:border-red-300 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-900">Emergency</h3>
                  <p className="text-sm text-red-600">Quick medical help</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vital Signs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Vital Signs</CardTitle>
                <CardDescription>Your latest health measurements</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Reading
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vitalSigns.map((vital, index) => {
                  const Icon = vital.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${getVitalStatusColor(vital.status)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{vital.type}</span>
                        </div>
                        <span className="text-xs">{vital.lastUpdated}</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {vital.value} <span className="text-sm font-normal">{vital.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Health Alerts</CardTitle>
            <CardDescription>Important reminders and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {healthAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.priority)}`}
                >
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-neutral-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                <ArrowRight className="h-4 w-4 mr-2" />
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled consultations</CardDescription>
            </div>
            <Link href="/dashboard/appointments">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.type}</p>
                      <p className="text-sm text-neutral-600">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-sm text-neutral-600">{appointment.time}</p>
                  </div>
                </div>
              ))}
              
              <Button className="w-full" variant="primary">
                <Plus className="h-4 w-4 mr-2" />
                Book New Appointment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Month's Activity</CardTitle>
            <CardDescription>Your healthcare engagement summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">AI Consultations</span>
                </div>
                <span className="text-xl font-bold text-primary-600">{consultationsThisMonth}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-secondary-600" />
                  <span className="font-medium">Records Updated</span>
                </div>
                <span className="text-xl font-bold text-secondary-600">{recordsUploaded}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-accent-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-accent-600" />
                  <span className="font-medium">Health Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-accent-600">{healthScore}</span>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.floor(healthScore / 20) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest healthcare interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-neutral-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Blood pressure reading recorded</p>
                <p className="text-sm text-neutral-600">120/80 mmHg - Normal range</p>
              </div>
              <span className="text-sm text-neutral-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-neutral-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">AI consultation completed</p>
                <p className="text-sm text-neutral-600">Discussed cold symptoms and received recommendations</p>
              </div>
              <span className="text-sm text-neutral-500">1 day ago</span>
            </div>
            
            <div className="flex items-center justify-center p-4">
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                View Full History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}