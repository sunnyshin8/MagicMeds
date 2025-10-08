// Medical Records Page - View and manage patient medical history
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  DocumentTextIcon,
  CalendarDaysIcon,
  UserIcon,
  HeartIcon,
  BeakerIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

interface MedicalRecord {
  id: string;
  type: 'consultation' | 'lab-report' | 'prescription' | 'imaging' | 'vaccination';
  title: string;
  date: string;
  doctor: string;
  hospital?: string;
  summary: string;
  attachments?: string[];
  status: 'completed' | 'pending' | 'cancelled';
}

const medicalRecords: MedicalRecord[] = [
  {
    id: '1',
    type: 'consultation',
    title: 'General Health Check-up',
    date: '2025-09-25',
    doctor: 'Dr. Priya Sharma',
    hospital: 'MagicMeds Clinic, Delhi',
    summary: 'Routine health examination. Blood pressure: 120/80 mmHg. Heart rate: 72 bpm. Overall health status: Good.',
    status: 'completed',
    attachments: ['health-report-sep-2025.pdf'],
  },
  {
    id: '2',
    type: 'lab-report',
    title: 'Complete Blood Count (CBC)',
    date: '2025-09-20',
    doctor: 'Dr. Raj Kumar',
    hospital: 'PathLab Diagnostics',
    summary: 'Hemoglobin: 14.2 g/dL (Normal). WBC Count: 6,800/μL (Normal). Platelet Count: 280,000/μL (Normal).',
    status: 'completed',
    attachments: ['cbc-report-sep-2025.pdf'],
  },
  {
    id: '3',
    type: 'prescription',
    title: 'Hypertension Medication',
    date: '2025-09-15',
    doctor: 'Dr. Anita Verma',
    summary: 'Prescribed Amlodipine 5mg once daily for blood pressure management. Follow-up in 4 weeks.',
    status: 'completed',
    attachments: ['prescription-sep-2025.pdf'],
  },
  {
    id: '4',
    type: 'imaging',
    title: 'Chest X-Ray',
    date: '2025-08-10',
    doctor: 'Dr. Suresh Patel',
    hospital: 'Metro Imaging Center',
    summary: 'Chest X-ray shows clear lung fields. No signs of infection or abnormalities detected.',
    status: 'completed',
    attachments: ['chest-xray-aug-2025.jpg', 'radiology-report-aug-2025.pdf'],
  },
  {
    id: '5',
    type: 'vaccination',
    title: 'Annual Flu Vaccination',
    date: '2025-10-01',
    doctor: 'Dr. Priya Sharma',
    hospital: 'MagicMeds Clinic, Delhi',
    summary: 'Received seasonal influenza vaccine. No adverse reactions observed. Next dose due: October 2026.',
    status: 'completed',
  },
];

const getRecordIcon = (type: string) => {
  switch (type) {
    case 'consultation': return <UserIcon className="w-5 h-5" />;
    case 'lab-report': return <BeakerIcon className="w-5 h-5" />;
    case 'prescription': return <DocumentTextIcon className="w-5 h-5" />;
    case 'imaging': return <EyeIcon className="w-5 h-5" />;
    case 'vaccination': return <HeartIcon className="w-5 h-5" />;
    default: return <DocumentTextIcon className="w-5 h-5" />;
  }
};

const getRecordColor = (type: string) => {
  switch (type) {
    case 'consultation': return 'bg-blue-100 text-blue-600';
    case 'lab-report': return 'bg-green-100 text-green-600';
    case 'prescription': return 'bg-purple-100 text-purple-600';
    case 'imaging': return 'bg-orange-100 text-orange-600';
    case 'vaccination': return 'bg-pink-100 text-pink-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-100';
    case 'pending': return 'text-yellow-600 bg-yellow-100';
    case 'cancelled': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || record.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Medical Records</h1>
          <p className="text-lg text-gray-600">Access and manage your complete health history</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search records, doctors, or conditions..."
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Records</option>
              <option value="consultation">Consultations</option>
              <option value="lab-report">Lab Reports</option>
              <option value="prescription">Prescriptions</option>
              <option value="imaging">Imaging</option>
              <option value="vaccination">Vaccinations</option>
            </select>
            
            <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Records List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredRecords.length === 0 ? (
              <Card className="p-8 text-center">
                <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Records Found</h3>
                <p className="text-gray-600">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'Your medical records will appear here.'}
                </p>
              </Card>
            ) : (
              filteredRecords.map((record) => (
                <Card 
                  key={record.id} 
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedRecord?.id === record.id ? 'ring-2 ring-teal-500 bg-teal-50' : ''
                  }`}
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg ${getRecordColor(record.type)}`}>
                          {getRecordIcon(record.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                          <p className="text-sm text-gray-600">{record.doctor}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <CalendarDaysIcon className="w-4 h-4" />
                          <span>{new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        {record.hospital && (
                          <span>{record.hospital}</span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 text-sm line-clamp-2">{record.summary}</p>
                      
                      {record.attachments && record.attachments.length > 0 && (
                        <div className="flex items-center space-x-2 mt-3">
                          <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {record.attachments.length} attachment{record.attachments.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Record Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {selectedRecord ? (
                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg ${getRecordColor(selectedRecord.type)}`}>
                      {getRecordIcon(selectedRecord.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedRecord.title}</h3>
                      <p className="text-sm text-gray-600 capitalize">{selectedRecord.type.replace('-', ' ')}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Doctor</label>
                      <p className="text-gray-900">{selectedRecord.doctor}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Date</label>
                      <p className="text-gray-900">{new Date(selectedRecord.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    </div>
                    
                    {selectedRecord.hospital && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Hospital/Clinic</label>
                        <p className="text-gray-900">{selectedRecord.hospital}</p>
                      </div>
                    )}
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                      </span>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Summary</label>
                      <p className="text-gray-900 text-sm leading-relaxed">{selectedRecord.summary}</p>
                    </div>
                    
                    {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Attachments</label>
                        <div className="space-y-2">
                          {selectedRecord.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                <DocumentTextIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-700">{attachment}</span>
                              </div>
                              <Button size="sm" variant="outline">
                                <ArrowDownTrayIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 mt-6">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
                      size="sm"
                    >
                      <EyeIcon className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 text-center">
                  <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Record</h3>
                  <p className="text-sm text-gray-600">Click on any record to view detailed information</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}