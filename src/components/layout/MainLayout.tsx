// Main Layout Component for MagicMeds Healthcare Platform
// Responsive layout with navigation, main content area, and PWA support

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import HealthBridgeNavigation from './Navigation';
import { Toaster } from 'react-hot-toast';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSignOut?: () => void;
  showNavigation?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  user,
  onSignOut,
  showNavigation = true,
}) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {showNavigation && (
        <HealthBridgeNavigation user={user} onSignOut={onSignOut} />
      )}
      
      {/* Main content */}
      <main
        className={cn(
          'transition-all duration-300 ease-in-out',
          showNavigation && 'lg:pl-64', // Account for sidebar width
          showNavigation && 'pt-16 lg:pt-0' // Account for mobile header
        )}
      >
        <div className={cn('min-h-screen', className)}>
          {children}
        </div>
      </main>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
          success: {
            style: {
              border: '1px solid #10b981',
              background: '#ecfdf5',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
              background: '#fef2f2',
            },
          },
          loading: {
            style: {
              border: '1px solid #3b82f6',
              background: '#eff6ff',
            },
          },
        }}
      />
    </div>
  );
};

// Specialized layout for authentication pages
export const AuthLayout: React.FC<{
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">MagicMeds</h1>
                  <p className="text-primary-100">Healthcare for Everyone</p>
                </div>
              </div>
            </div>
            
            <div className="max-w-md">
              <h2 className="text-4xl font-bold mb-6">
                Your Health, Our Priority
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Access quality healthcare in your language, anytime, anywhere. 
                AI-powered consultations, offline support, and culturally sensitive care.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary-500 rounded-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span className="text-primary-100">Multilingual AI Diagnosis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary-500 rounded-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span className="text-primary-100">Offline Healthcare Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary-500 rounded-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span className="text-primary-100">Voice-Enabled Consultations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary-500 rounded-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span className="text-primary-100">HIPAA Compliant & Secure</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute right-12 top-1/4 w-16 h-16 bg-secondary-500/30 rounded-full" />
          <div className="absolute -right-4 bottom-1/4 w-32 h-32 bg-white/5 rounded-full" />
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile branding */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">MagicMeds</h1>
                  <p className="text-sm text-neutral-500">Healthcare Platform</p>
                </div>
              </div>
            </div>

            {title && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-neutral-600">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

// Dashboard layout with metrics and quick actions
export const DashboardLayout: React.FC<{
  children: React.ReactNode;
  user?: any;
  onSignOut?: () => void;
}> = ({ children, user, onSignOut }) => {
  return (
    <MainLayout user={user} onSignOut={onSignOut}>
      <div className="p-6 lg:p-8">
        {/* Dashboard header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-neutral-600">
            Here's your health overview and recent activity.
          </p>
        </div>

        {children}
      </div>
    </MainLayout>
  );
};

// Empty state layout for pages with minimal content
export const EmptyStateLayout: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  user?: any;
  onSignOut?: () => void;
}> = ({ icon, title, description, action, user, onSignOut }) => {
  return (
    <MainLayout user={user} onSignOut={onSignOut}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full">
              {icon}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            {title}
          </h1>
          <p className="text-neutral-600 mb-8">
            {description}
          </p>
          {action}
        </div>
      </div>
    </MainLayout>
  );
};

export default MainLayout;