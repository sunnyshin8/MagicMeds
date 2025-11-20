export const REVIEW_GUIDELINES = {
  DO: [
    "Share your experience with medications and treatments",
    "Discuss effectiveness and side effects in general terms",
    "Mention your age range (not exact age)",
    "Use condition names and symptoms",
    "Share how long you've been using the service",
  ],
  DONT: [
    "Include any personal identifying information",
    "Share specific dates of treatments or visits",
    "Mention healthcare providers' names",
    "Include insurance information",
    "Share exact location information",
    "Mention other patients or family members",
    "Include any contact information",
  ],
};

export const HIPAA_SENSITIVE_INFO = [
  "Names",
  "Geographic locations smaller than a state",
  "Dates (except year)",
  "Phone numbers",
  "Email addresses",
  "Social Security numbers",
  "Medical record numbers",
  "Health insurance numbers",
  "Account numbers",
  "License numbers",
  "Vehicle identifiers",
  "Device identifiers",
  "URLs",
  "IP addresses",
  "Biometric identifiers",
  "Full-face photographs",
  "Any other unique identifying number, characteristic, or code"
];

export const AGE_RANGES = [
  "0-12",
  "13-17",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65+"
] as const;