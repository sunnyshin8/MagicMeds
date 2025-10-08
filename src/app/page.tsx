'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import MainLayout from '@/components/layout/MainLayout';
import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const features = [
    {
      name: 'AI-Powered Consultations',
      description: 'Get instant medical advice from our advanced AI system trained on Indian healthcare patterns.',
      icon: ChatBubbleLeftRightIcon,
      gradient: 'from-cyan-500 to-teal-500',
      href: '/dashboard/consultation',
    },
    {
      name: 'Multilingual Support',
      description: 'Available in 8+ Indian languages including Hindi, Tamil, Bengali, and more.',
      icon: GlobeAltIcon,
      gradient: 'from-teal-500 to-emerald-500',
      href: '/assessment',
    },
    {
      name: '24/7 Emergency Care',
      description: 'Round-the-clock emergency support with instant connection to local hospitals.',
      icon: ShieldCheckIcon,
      gradient: 'from-emerald-500 to-green-500',
      href: '/emergency',
    },
    {
      name: 'Health Assessment',
      description: 'Comprehensive symptom checker with personalized health insights.',
      icon: HeartIcon,
      gradient: 'from-green-500 to-teal-500',
      href: '/assessment',
    },
    {
      name: 'Medical Records',
      description: 'Secure digital health records accessible anytime, anywhere.',
      icon: DevicePhoneMobileIcon,
      gradient: 'from-teal-500 to-cyan-500',
      href: '/records',
    },
    {
      name: 'Telemedicine',
      description: 'Connect with certified doctors via video, voice, or chat consultations.',
      icon: UserGroupIcon,
      gradient: 'from-cyan-500 to-blue-500',
      href: '/appointments',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Jaipur, Rajasthan',
      text: 'MagicMeds helped me get medical advice when no doctor was available in our village. The Hindi support made it so easy to use.',
      rating: 5,
      condition: 'Diabetes Management',
    },
    {
      name: 'Raj Kumar',
      location: 'Patna, Bihar',
      text: 'The AI diagnosis was accurate and helped me understand my symptoms. Got connected to a nearby hospital quickly.',
      rating: 5,
      condition: 'Heart Health',
    },
    {
      name: 'Anita Verma',
      location: 'Kolkata, West Bengal',
      text: 'As a mother of two, having 24/7 health support in Bengali has been invaluable for my family\'s health.',
      rating: 5,
      condition: 'Family Healthcare',
    },
  ];

  const stats = [
    { label: 'Rural Villages Served', value: '25,000+', description: 'Across India' },
    { label: 'AI Consultations', value: '500,000+', description: 'Completed successfully' },
    { label: 'Languages Supported', value: '8+', description: 'Regional languages' },
    { label: 'Patient Satisfaction', value: '98%', description: 'Rating average' },
  ];

  return (
    <MainLayout showNavigation={true}>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600"></div>
        
        {/* Animated Background Elements - NO BLACK OVERLAY */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-6 py-3 bg-white bg-opacity-25 rounded-full text-white text-sm font-medium mb-8 backdrop-blur-sm border border-white/20 shadow-lg">
                <HeartIcon className="w-5 h-5 mr-3 text-pink-300" />
                <span className="font-bold text-lg mr-2">MagicMeds</span>
                <span className="text-cyan-200">•</span>
                <span className="ml-2">AI-Powered Healthcare Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                <span className="block mb-2">Healthcare for</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
                  Every Indian
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-cyan-100 mb-8 leading-relaxed">
                Revolutionary telemedicine platform bringing world-class healthcare to rural India with AI-powered consultations in local languages
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/dashboard/consultation">
                  <Button 
                    size="lg" 
                    className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                    Start AI Consultation
                  </Button>
                </Link>
                <Link href="/assessment">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                  >
                    <HeartIcon className="w-5 h-5 mr-2" />
                    Health Assessment
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center text-cyan-100">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-white bg-opacity-20 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-sm">Trusted by 500,000+ users across India</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">AI Diagnosis Complete</div>
                      <div className="text-cyan-200 text-sm">Confidence: 95%</div>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-white text-sm mb-2">Symptoms analyzed in हिंदी</div>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-cyan-500 text-white rounded text-xs">Fever</span>
                      <span className="px-2 py-1 bg-teal-500 text-white rounded text-xs">Headache</span>
                      <span className="px-2 py-1 bg-emerald-500 text-white rounded text-xs">Body ache</span>
                    </div>
                  </div>
                  <div className="text-cyan-100 text-sm">
                    ✓ Connected to nearby hospital<br />
                    ✓ Prescription ready for pickup<br />
                    ✓ Follow-up scheduled
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-teal-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Impact Across India</h2>
            <p className="text-lg text-gray-600">Transforming healthcare accessibility one village at a time</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Complete Healthcare Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered diagnostics to emergency care, everything you need for better health outcomes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-cyan-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn more</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How MagicMeds Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and effective healthcare in 3 easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-cyan-300 to-teal-300 transform -translate-y-1/2"></div>
            
            {[
              {
                step: '1',
                title: 'Describe Symptoms',
                description: 'Tell us about your health concerns in your preferred language using voice, text, or video.',
                color: 'from-cyan-500 to-blue-500',
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Our advanced AI analyzes symptoms against medical databases and provides instant insights.',
                color: 'from-teal-500 to-cyan-500',
              },
              {
                step: '3',
                title: 'Get Care',
                description: 'Receive personalized recommendations, prescriptions, and connect with local healthcare providers.',
                color: 'from-emerald-500 to-teal-500',
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative z-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.color} text-white rounded-full text-2xl font-bold mb-6 shadow-lg`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Trusted by Communities Nationwide
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from people whose lives we&apos;ve improved
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full transform translate-x-16 -translate-y-16"></div>
                
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 italic mb-4 leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>
                  
                  <div className="text-xs text-teal-600 font-medium bg-teal-50 px-3 py-1 rounded-full inline-block">
                    {testimonial.condition}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full opacity-30"></div>
          <div className="absolute top-32 right-20 w-3 h-3 bg-white rounded-full opacity-20"></div>
          <div className="absolute bottom-20 left-32 w-2 h-2 bg-white rounded-full opacity-40"></div>
          <div className="absolute bottom-40 right-10 w-5 h-5 bg-white rounded-full opacity-25"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your Health Journey Starts Here
          </h2>
          <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
            Join over 500,000 Indians who trust MagicMeds for accessible, reliable healthcare
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/register">
              <Button 
                size="lg" 
                className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <UserGroupIcon className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/emergency">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              >
                <ShieldCheckIcon className="w-5 h-5 mr-2" />
                Emergency Help
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-cyan-100 text-sm">
            <div className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              Available 24/7
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              HIPAA compliant
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-800 via-teal-800 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <HeartIcon className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">MagicMeds</h2>
                  <p className="text-cyan-200">Healthcare for Everyone</p>
                </div>
              </div>
              <p className="text-cyan-100 mb-6 max-w-md">
                Transforming healthcare accessibility across India with AI-powered telemedicine, 
                multilingual support, and culturally sensitive care for rural and urban communities.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Download App
                </Button>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="text-cyan-200 hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/assessment" className="text-cyan-200 hover:text-white transition-colors">Health Assessment</Link></li>
                <li><Link href="/appointments" className="text-cyan-200 hover:text-white transition-colors">Appointments</Link></li>
                <li><Link href="/records" className="text-cyan-200 hover:text-white transition-colors">Medical Records</Link></li>
                <li><Link href="/emergency" className="text-cyan-200 hover:text-white transition-colors">Emergency</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-cyan-200 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="text-cyan-200 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="text-cyan-200 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-cyan-200 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-cyan-200 text-sm">
              © 2025 MagicMeds. All rights reserved. Empowering healthcare for every Indian.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-cyan-200 text-sm">Available in 8+ Indian languages</span>
              <div className="flex items-center space-x-1">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm">HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </MainLayout>
  );
}
