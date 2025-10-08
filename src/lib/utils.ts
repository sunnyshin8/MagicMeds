// Utility functions for MagicMeds healthcare platform
// Class name utilities and common helpers

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind CSS conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format phone number for display (Indian format)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Validate Indian phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 && /^[6-9]/.test(cleaned);
}

/**
 * Format date for healthcare contexts
 */
export function formatHealthDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format time for healthcare contexts
 */
export function formatHealthTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: Date | string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Calculate BMI (Body Mass Index)
 */
export function calculateBMI(weight: number, height: number): number {
  // weight in kg, height in cm
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number): {
  category: string;
  color: 'success' | 'warning' | 'error';
} {
  if (bmi < 18.5) {
    return { category: 'Underweight', color: 'warning' };
  } else if (bmi < 25) {
    return { category: 'Normal', color: 'success' };
  } else if (bmi < 30) {
    return { category: 'Overweight', color: 'warning' };
  } else {
    return { category: 'Obese', color: 'error' };
  }
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Debounce function for search and input handling
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sleep/delay utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if device supports offline features
 */
export function supportsOffline(): boolean {
  return 'serviceWorker' in navigator && 'indexedDB' in window;
}

/**
 * Check if device is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Get device type for responsive behavior
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Sanitize HTML content for security
 */
export function sanitizeHTML(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Generate unique ID for healthcare records
 */
export function generateHealthId(): string {
  return `HLT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get severity color for medical conditions
 */
export function getSeverityColor(severity: 'low' | 'medium' | 'high' | 'emergency'): string {
  const colors = {
    low: 'text-success-600 bg-success-50',
    medium: 'text-warning-600 bg-warning-50',
    high: 'text-error-600 bg-error-50',
    emergency: 'text-error-700 bg-error-100 animate-pulse',
  };
  return colors[severity];
}

/**
 * Format medical values with units
 */
export function formatMedicalValue(value: number, unit: string, decimals = 1): string {
  return `${value.toFixed(decimals)} ${unit}`;
}

/**
 * Convert temperature between Celsius and Fahrenheit
 */
export function convertTemperature(temp: number, from: 'C' | 'F', to: 'C' | 'F'): number {
  if (from === to) return temp;
  if (from === 'C' && to === 'F') {
    return (temp * 9/5) + 32;
  }
  if (from === 'F' && to === 'C') {
    return (temp - 32) * 5/9;
  }
  return temp;
}

/**
 * Check if blood pressure is in healthy range
 */
export function classifyBloodPressure(systolic: number, diastolic: number): {
  category: string;
  color: 'success' | 'warning' | 'error';
  advice: string;
} {
  if (systolic < 120 && diastolic < 80) {
    return {
      category: 'Normal',
      color: 'success',
      advice: 'Maintain healthy lifestyle',
    };
  } else if (systolic < 130 && diastolic < 80) {
    return {
      category: 'Elevated',
      color: 'warning',
      advice: 'Monitor regularly and consult doctor',
    };
  } else if (systolic < 140 || diastolic < 90) {
    return {
      category: 'Stage 1 Hypertension',
      color: 'warning',
      advice: 'Consult healthcare provider',
    };
  } else {
    return {
      category: 'Stage 2 Hypertension',
      color: 'error',
      advice: 'Seek immediate medical attention',
    };
  }
}

/**
 * Generate color based on string (for avatars, etc.)
 */
export function getColorFromString(str: string): string {
  const colors = [
    'bg-primary-500',
    'bg-secondary-500',
    'bg-accent-500',
    'bg-info-500',
    'bg-warning-500',
    'bg-medical-medication',
    'bg-medical-vitals',
  ];
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}