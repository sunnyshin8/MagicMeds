// Appointments Page - Schedule and manage medical appointments
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  VideoCameraIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  notes?: string;
}

const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Priya Sharma',
    specialty: 'General Medicine',
    date: '2025-10-15',
    time: '10:00 AM',
    type: 'video',
    status: 'scheduled',
    notes: 'Follow-up consultation for health assessment',
  },
  {
    id: '2',
    doctorName: 'Dr. Raj Kumar',
    specialty: 'Cardiology',
    date: '2025-10-18',
    time: '2:30 PM',
    type: 'in-person',
    status: 'scheduled',
    location: 'MagicMeds Clinic, Delhi',
    notes: 'Routine cardiac check-up',
  },
];

const pastAppointments: Appointment[] = [
  {
    id: '3',
    doctorName: 'Dr. Anita Verma',
    specialty: 'Dermatology',
    date: '2025-09-25',
    time: '11:00 AM',
    type: 'video',
    status: 'completed',
    notes: 'Skin condition consultation - resolved',
  },
];

const availableSlots = [
  { date: '2025-10-12', time: '9:00 AM', doctor: 'Dr. Priya Sharma', specialty: 'General Medicine' },
  { date: '2025-10-12', time: '11:00 AM', doctor: 'Dr. Raj Kumar', specialty: 'Cardiology' },
  { date: '2025-10-13', time: '10:30 AM', doctor: 'Dr. Anita Verma', specialty: 'Dermatology' },
  { date: '2025-10-13', time: '3:00 PM', doctor: 'Dr. Priya Sharma', specialty: 'General Medicine' },
  { date: '2025-10-14', time: '2:00 PM', doctor: 'Dr. Raj Kumar', specialty: 'Cardiology' },
];

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'book'>('upcoming');
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [appointmentType, setAppointmentType] = useState<'video' | 'phone' | 'in-person'>('video');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const handleBookAppointment = async () => {
    if (!selectedSlot) return;
    
    setIsBooking(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setSelectedSlot(null);
    setBookingNotes('');
    setActiveTab('upcoming');
    setIsBooking(false);
    
    // Show success message (you can implement toast notification)
    alert('Appointment booked successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <VideoCameraIcon className="w-5 h-5" />;
      case 'phone': return <PhoneIcon className="w-5 h-5" />;
      case 'in-person': return <MapPinIcon className="w-5 h-5" />;
      default: return <CalendarDaysIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Appointments</h1>
          <p className="text-lg text-gray-600">Manage your healthcare appointments with ease</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'book'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Book New
            </button>
          </div>
        </div>

        {/* Upcoming Appointments */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <Card className="p-8 text-center">
                <CalendarDaysIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Appointments</h3>
                <p className="text-gray-600 mb-4">You don&apos;t have any scheduled appointments.</p>
                <Button 
                  onClick={() => setActiveTab('book')}
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </Card>
            ) : (
              upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(appointment.type)}
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.doctorName}
                          </h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{appointment.specialty}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <CalendarDaysIcon className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        {appointment.location && (
                          <div className="flex items-center space-x-1">
                            <MapPinIcon className="w-4 h-4" />
                            <span>{appointment.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {appointment.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {appointment.type === 'video' && (
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Join Call
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Past Appointments */}
        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-6 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(appointment.type)}
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.doctorName}
                        </h3>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{appointment.specialty}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {appointment.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      View Summary
                    </Button>
                    <Button variant="outline" size="sm">
                      Book Again
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Book New Appointment */}
        {activeTab === 'book' && (
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book New Appointment</h2>
              
              {/* Appointment Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Appointment Type
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { type: 'video', label: 'Video Call', icon: VideoCameraIcon, desc: 'Online consultation' },
                    { type: 'phone', label: 'Phone Call', icon: PhoneIcon, desc: 'Voice consultation' },
                    { type: 'in-person', label: 'In-Person', icon: MapPinIcon, desc: 'Visit clinic' },
                  ].map(({ type, label, icon: Icon, desc }) => (
                    <button
                      key={type}
                      onClick={() => setAppointmentType(type as any)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        appointmentType === type
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-medium">{label}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Slots */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Available Slots
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedSlot === slot
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{slot.doctor}</div>
                      <div className="text-sm text-gray-600">{slot.specialty}</div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{new Date(slot.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        <span>{slot.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="Describe your symptoms or reason for consultation..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Book Button */}
              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedSlot(null);
                    setBookingNotes('');
                  }}
                >
                  Clear
                </Button>
                <Button
                  onClick={handleBookAppointment}
                  disabled={!selectedSlot || isBooking}
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
                >
                  {isBooking ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Booking...
                    </>
                  ) : (
                    'Book Appointment'
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}