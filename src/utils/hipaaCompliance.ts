import { z } from 'zod';

// HIPAA-compliant review schema
export const reviewSchema = z.object({
  reviewId: z.string(),
  patientInitials: z.string()
    .min(2)
    .max(4)
    .regex(/^[A-Z](\.[A-Z])?\.$/), // Ensures format like "J.W."
  age: z.string()
    .regex(/^\d{2}\+$|^\d{2}-\d{2}$/), // Ensures age ranges like "65+" or "45-54"
  condition: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string()
    .min(10)
    .max(500)
    .transform(text => 
      // Remove any potential PHI from review text
      text.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]') // Remove phone numbers
          .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, '[EMAIL]') // Remove emails
          .replace(/\b\d{3}[-]?\d{2}[-]?\d{4}\b/g, '[SSN]') // Remove SSNs
    ),
  verifiedPurchase: z.boolean(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  helpfulCount: z.number().min(0)
});

export type PatientReview = z.infer<typeof reviewSchema>;

// Function to sanitize patient data for reviews
export function sanitizePatientData(patientData: any): Partial<PatientReview> {
  // Get initials from name
  const initials = patientData.name
    .split(' ')
    .map((n: string) => `${n[0].toUpperCase()}.`)
    .join('');

  // Calculate age range from DOB
  const age = calculateAgeRange(patientData.dob);

  return {
    patientInitials: initials,
    age,
    // Don't include any other identifiable information
  };
}

// Helper function to calculate age range
function calculateAgeRange(dob: string): string {
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  if (age >= 65) return '65+';
  const lowerBound = Math.floor(age / 10) * 10;
  return `${lowerBound}-${lowerBound + 9}`;
}

// HIPAA compliance validation function
export function isHIPAACompliant(review: any): boolean {
  try {
    // Validate against schema
    reviewSchema.parse(review);
    
    // Additional HIPAA compliance checks
    const sensitivePatterns = [
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // Phone numbers
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, // Email addresses
      /\b\d{3}[-]?\d{2}[-]?\d{4}\b/, // SSN
      /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},\s+\d{4}\b/i, // Dates
      /\b(?:\d{1,3},)?\d{3}\s+[A-Za-z]+\s+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Circle|Cir|Trail|Tr|Court|Ct|Parkway|Pkwy|Way)\b/i, // Addresses
    ];

    return !sensitivePatterns.some(pattern => pattern.test(review.review));
  } catch {
    return false;
  }
}