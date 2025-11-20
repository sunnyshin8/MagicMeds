# 🏗️ MagicMeds Architecture & Implementation Roadmap

**Version**: 1.0  
**Date**: November 13, 2025

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Component Dependency Graph](#component-dependency-graph)
3. [Data Models & Database Schema](#data-models--database-schema)
4. [API Endpoint Reference](#api-endpoint-reference)
5. [Implementation Roadmap](#implementation-roadmap)
6. [Feature Dependencies](#feature-dependencies)
7. [Technology Integration Points](#technology-integration-points)

---

## System Architecture

### High-Level System Design

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (Browser)                          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────┐    │
│  │   NavBar    │  │  ChatUI      │  │  Dashboard   │  │ Service │    │
│  │             │  │  Interface   │  │  Analytics   │  │ Pages   │    │
│  └─────────────┘  └──────────────┘  └──────────────┘  └─────────┘    │
│         ↓                ↓                 ↓                ↓           │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │           React 19 + Next.js App Router (Client)            │     │
│  │           Material-UI + Tailwind CSS Components             │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
                              ↓
           ┌─────────────────────────────────────┐
           │      HTTP/REST API Layer            │
           │   (Next.js API Routes)              │
           └─────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────────┐
│                    SERVER LAYER (Node.js Runtime)                      │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │ Chat Route   │  │ Appointments │  │ Telehealth   │                │
│  │ /api/chat    │  │ /api/appt    │  │ /api/video   │                │
│  └──────────────┘  └──────────────┘  └──────────────┘                │
│         ↓                 ↓                 ↓                          │
│  ┌────────────────────────────────────────────────┐                  │
│  │         Request Validation & Processing        │                  │
│  │  (Zod Schemas, Error Handling)                 │                  │
│  └────────────────────────────────────────────────┘                  │
│         ↓                 ↓                 ↓                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │ googleAI     │  │ medicineDB   │  │ hipaa        │                │
│  │ Studio       │  │ Service      │  │ Compliance   │                │
│  │ Service      │  │              │  │ Utils        │                │
│  └──────────────┘  └──────────────┘  └──────────────┘                │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES & DATA LAYER                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │ Google       │  │ Database     │  │ Jitsi Meet   │                │
│  │ Gemini AI    │  │ (Future)     │  │ (Telehealth) │                │
│  │ API          │  │ PostgreSQL   │  │              │                │
│  └──────────────┘  └──────────────┘  └──────────────┘                │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐                                  │
│  │ Email        │  │ SMS/Push     │                                  │
│  │ Service      │  │ Notifications│                                  │
│  │ (Future)     │  │ (Future)     │                                  │
│  └──────────────┘  └──────────────┘                                  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘

Legend:
─────  Data flow
→     API call/integration
↓     Dependency
```

### Detailed Component Interaction Flow

```
USER INTERACTION → REQUEST → VALIDATION → PROCESSING → RESPONSE → RENDER

1. USER INTERACTION
   User types message in ChatInput component
        ↓
2. REQUEST
   ChatInterface sends POST to /api/chat
        ↓
3. VALIDATION (route.ts)
   Zod validates request schema:
   ├─ message: string (1-1000 chars)
   ├─ userInfo?: { ageGroup, gender, weight, allergies, conditions }
   └─ context?: string
        ↓
4. PROCESSING
   ├─ Load medicine database (singleton)
   ├─ Extract symptoms from message
   ├─ Filter medicines by user profile
   ├─ Build context for AI
   └─ Call Google Gemini API
        ↓
5. RESPONSE
   Gemini returns formatted medical advice
   Route returns: { response: string }
        ↓
6. RENDER
   ChatInterface displays message in chat
   User sees response immediately
```

---

## Component Dependency Graph

### Current Component Dependencies

```
Root Layout (layout.tsx)
├── NavBar
│   └── Next Link + usePathname
├── ThemeRegistry
│   └── Material-UI ThemeProvider
└── Main children (all pages)

Chat Feature:
├── pages/[chat-pages]/page.tsx
├── ChatInterface.tsx
│   ├── ChatMessage.tsx
│   │   └── Material-UI components
│   ├── ChatInput.tsx
│   │   └── Material-UI TextField/Button
│   └── Services:
│       ├── /api/chat/route.ts
│       ├── googleAIStudio.ts
│       └── medicineDatabase.ts

Auth Features:
├── /login/page.tsx
├── /signup/page.tsx
└── Uses: hipaaCompliance.ts

Dashboard:
├── /dashboard/page.tsx
└── Future: Analytics visualizations

Services:
├── /services/page.tsx
├── Service cards display
└── Future: Service detail pages

Appointments:
├── /appointments/page.tsx
└── Future: AppointmentForm, AppointmentList

Telehealth:
├── /telehealth/page.tsx
└── Future: Jitsi Meet integration
```

### Import Dependency Tree

```
src/app/layout.tsx
├── imports: NavBar, ThemeRegistry, globals.css
│
src/app/page.tsx
├── imports: Box, Container, Typography, Button (MUI)
├── imports: Various icons (MUI Icons)
└── imports: Link (Next)

src/components/ChatInterface.tsx
├── imports: useState (React)
├── imports: ChatMessage, ChatInput
├── imports: fetch API
└── calls: /api/chat

src/app/api/chat/route.ts
├── imports: NextResponse, z (Zod)
├── imports: getHealthAssistantResponse (googleAIStudio)
├── imports: MedicineDatabase (medicineDatabase)
└── calls: Gemini API

src/services/googleAIStudio.ts
├── imports: GoogleGenerativeAI
├── requires: process.env.GOOGLE_AI_STUDIO_API_KEY
└── calls: Gemini 2.5 Flash model

src/services/medicineDatabase.ts
├── imports: xlsx library
├── implements: Singleton pattern
└── caches: 5 minutes
```

---

## Data Models & Database Schema

### Current Data Models (In Memory)

#### 1. Chat Message Model

```typescript
interface Message {
  id: string;              // Unique identifier
  text: string;            // Message content
  sender: 'user' | 'assistant';
  timestamp: Date;
}
```

#### 2. User Profile Model

```typescript
interface UserProfile {
  id: string;
  name: string;
  ageGroup: 'child' | 'teen' | 'adult' | 'senior';
  gender: 'male' | 'female' | 'other';
  weight: number;          // kg
  allergies: string[];
  conditions: string[];
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 3. Medicine Detail Model

```typescript
interface MedicineDetail {
  name: string;
  description: string;
  symptoms: string[];       // What it treats
  sideEffects: string[];
  contraindications: string[]; // Incompatibilities
  dosageForm: string;       // tablet, liquid, etc.
}

interface AgeReference {
  medicine: string;
  ageGroup: string;         // child, teen, adult, senior
  dosage: string;
  frequency: string;
  specialInstructions?: string;
}
```

#### 4. Appointment Model (Future)

```typescript
interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: Date;
  duration: number;         // minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes: string;
  telehealth: boolean;
  meetingLink?: string;
}
```

#### 5. Review Model (HIPAA Compliant)

```typescript
interface PatientReview {
  reviewId: string;
  patientInitials: string;  // "J.W." format only
  age: string;              // "45-54" or "65+" format
  condition: string;
  rating: number;           // 1-5
  review: string;           // Sanitized content
  verifiedPurchase: boolean;
  date: string;             // YYYY-MM-DD
  helpfulCount: number;
}
```

### Future Database Schema (PostgreSQL Example)

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  age_group VARCHAR(20),
  gender VARCHAR(20),
  weight DECIMAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Allergies Table
CREATE TABLE user_allergies (
  user_id UUID REFERENCES users(id),
  allergy VARCHAR(100),
  PRIMARY KEY (user_id, allergy)
);

-- Medical Conditions Table
CREATE TABLE user_conditions (
  user_id UUID REFERENCES users(id),
  condition VARCHAR(100),
  PRIMARY KEY (user_id, condition)
);

-- Chat Messages Table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE appointments (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES users(id),
  doctor_id UUID REFERENCES doctors(id),
  scheduled_time TIMESTAMP NOT NULL,
  duration_minutes INTEGER,
  status VARCHAR(50),
  telehealth BOOLEAN DEFAULT FALSE,
  meeting_link VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table (HIPAA Compliant)
CREATE TABLE patient_reviews (
  id UUID PRIMARY KEY,
  patient_initials VARCHAR(10) NOT NULL,
  age_range VARCHAR(20) NOT NULL,
  condition VARCHAR(100),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  verified_purchase BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoint Reference

### Current Endpoints

#### 1. Chat Endpoint

```
POST /api/chat
├─ Purpose: Get AI-powered health guidance
├─ Authentication: Not implemented (future)
├─ Rate Limiting: Not implemented (future)
│
├─ Request Body:
│  {
│    "message": "I have a headache",
│    "userInfo": {
│      "ageGroup": "adult",
│      "gender": "male",
│      "weight": 75,
│      "allergies": ["penicillin"],
│      "conditions": ["diabetes"]
│    },
│    "context": "medical_consultation" // optional
│  }
│
├─ Response (200 OK):
│  {
│    "response": "Based on your symptoms...",
│    "suggestedMedicines": [...],
│    "warnings": ["See a doctor if..."]
│  }
│
├─ Error Responses:
│  400: Validation failed
│  500: AI generation error
│
└─ Implementation: src/app/api/chat/route.ts
```

### Future Endpoints

#### Appointments

```
POST /api/appointments
  └─ Create new appointment

GET /api/appointments
  └─ Fetch user appointments

GET /api/appointments/:id
  └─ Get appointment details

PUT /api/appointments/:id
  └─ Update appointment

DELETE /api/appointments/:id
  └─ Cancel appointment
```

#### User Profile

```
POST /api/auth/register
  └─ Create new user account

POST /api/auth/login
  └─ Authenticate user

GET /api/user/profile
  └─ Get user details

PUT /api/user/profile
  └─ Update user profile

POST /api/user/allergies
  └─ Add allergy
```

#### Telehealth

```
POST /api/telehealth/rooms
  └─ Create meeting room

GET /api/telehealth/rooms/:id
  └─ Get room details

POST /api/telehealth/rooms/:id/join
  └─ Join video call
```

---

## Implementation Roadmap

### Phase 1: Foundation (Current - Week 1-2)

**Status**: ✅ In Progress

```
├─ ✅ Project setup and configuration
├─ ✅ Next.js + React environment
├─ ✅ Material-UI theming
├─ ✅ Gemini AI integration
├─ ✅ Medicine database (in-memory)
├─ ✅ Chat UI components
├─ ✅ HIPAA compliance utilities
│
Current Issues:
├─ No persistent database
├─ Authentication not functional
├─ No payment processing
└─ No notification system
```

### Phase 2: Core Features (Week 3-6)

**Status**: 🔧 Planned

```
Priority 1 - Authentication & User Management:
├─ Implement user registration
├─ Email verification
├─ Password reset flow
├─ Session management
├─ Profile management
│  Time: 2 weeks
│  Tools: NextAuth.js or JWT
│  Database: PostgreSQL

Priority 2 - Database Integration:
├─ Set up PostgreSQL
├─ Create database schema
├─ Implement ORM (Prisma)
├─ Data migration utilities
├─ Connection pooling
│  Time: 1 week
│  Tools: Prisma ORM

Priority 3 - Appointment System:
├─ Doctor scheduling
├─ Appointment booking
├─ Appointment management
├─ Calendar integration
│  Time: 2 weeks
│  Components: AppointmentForm, AppointmentList
│  API: /api/appointments
```

### Phase 3: Advanced Features (Week 7-10)

**Status**: 📋 Planned

```
Priority 1 - Telehealth Integration:
├─ Jitsi Meet setup
├─ Video call initiation
├─ Recording capability
├─ Screen sharing
│  Time: 2 weeks
│  Integration: Jitsi REST API

Priority 2 - Notification System:
├─ Email notifications
├─ SMS alerts (optional)
├─ Push notifications
├─ Notification preferences
│  Time: 1.5 weeks
│  Tools: SendGrid, Twilio

Priority 3 - Analytics Dashboard:
├─ Health metrics display
├─ Appointment analytics
├─ Usage statistics
├─ Data visualization
│  Time: 1.5 weeks
│  Tools: Chart.js or Recharts
```

### Phase 4: AI Enhancements (Week 11-14)

**Status**: 🎯 Planned

```
Priority 1 - Outbreak Prediction (Coming Soon):
├─ ML model integration
├─ Geographical data mapping
├─ Pattern recognition
├─ Early warning system
│  Time: 3 weeks
│  Tools: TensorFlow.js or Python backend

Priority 2 - Multilingual Support (Coming Soon):
├─ Translation API
├─ UI internationalization
├─ Content localization
├─ RTL support (Hindi, Bengali)
│  Time: 2 weeks
│  Tools: next-intl library

Priority 3 - Fever Helpline:
├─ Specialized AI model
├─ Fever-specific recommendations
├─ Emergency routing
└─ Caregiver support
   Time: 2 weeks
```

### Phase 5: Deployment & Optimization (Week 15-16)

**Status**: 📌 Planned

```
├─ Performance optimization
├─ SEO optimization
├─ Security audit
├─ Load testing
├─ Deployment to production
├─ Monitoring setup
├─ Documentation completion
└─ Team training
```

### Implementation Timeline Gantt Chart

```
Phase 1: Foundation         [████████] Complete
Phase 2: Core Features      [░░░░░░░░░░░░░░░░░░░░] 0%
Phase 3: Advanced Features  [░░░░░░░░░░░░░░░░░░░░] 0%
Phase 4: AI Enhancements    [░░░░░░░░░░░░░░░░░░░░] 0%
Phase 5: Production Ready   [░░░░░░░░░░░░░░░░░░░░] 0%

Current Sprint: Phase 2 Week 1
├─ Database schema design
├─ Authentication setup
└─ User model implementation
```

---

## Feature Dependencies

### Dependency Chain

```
Feature: Appointment Management
├─ Depends On:
│  ├─ Authentication System (must have)
│  ├─ User Database (must have)
│  ├─ Doctor Database (must have)
│  └─ Email Notifications (nice to have)
├─ Enables:
│  ├─ Telehealth Consultations
│  ├─ Appointment Reminders
│  └─ Dashboard Analytics
└─ Implementation Order: 2 (after auth)

Feature: Telehealth Consultations
├─ Depends On:
│  ├─ Appointment System (must have)
│  ├─ Jitsi Meet Integration (must have)
│  └─ Video Call UI (must have)
├─ Enables:
│  ├─ Remote Doctor Consultations
│  └─ Recording & Playback
└─ Implementation Order: 3 (after appointments)

Feature: Outbreak Prediction
├─ Depends On:
│  ├─ ML Model/Algorithm (must have)
│  ├─ Geographical Data (must have)
│  ├─ Chat Message History (should have)
│  └─ Analytics Dashboard (nice to have)
├─ Enables:
│  ├─ Disease Forecasting
│  └─ Public Health Alerts
└─ Implementation Order: 4 (after dashboard)

Feature: Multilingual Support
├─ Depends On:
│  ├─ Translation Service (must have)
│  ├─ UI Framework Updates (must have)
│  └─ Gemini AI (already have)
├─ Enables:
│  ├─ Support for Indian Languages
│  └─ Regional User Access
└─ Implementation Order: 4 (parallel with ML)
```

### Critical Path Analysis

```
Must Complete First:
1. Authentication → All features need user identification
2. Database Setup → Required for data persistence
3. API Layer → Needed for client-server communication

Then Can Proceed (Parallel):
├─ Appointment System
├─ Chat Enhancements
└─ Dashboard Development

Finally (Dependent):
├─ Telehealth (needs appointments)
├─ Outbreak Prediction (needs historical data)
└─ Analytics (needs all data)
```

---

## Technology Integration Points

### Current Integrations

#### 1. Google Gemini AI

```
Integration Point: src/services/googleAIStudio.ts
├─ API Key: GOOGLE_AI_STUDIO_API_KEY (environment)
├─ Model: gemini-2.5-flash
├─ Rate Limits: 60 requests/min (free tier)
├─ Costs: $0.0375 per 1M input tokens
├─ Usage: Health queries, symptom analysis
│
Setup Required:
├─ Create Google Cloud project
├─ Enable Generative AI API
├─ Generate API key
├─ Add to .env.local
│
Error Handling:
├─ Catch API errors
├─ Log to console (future: logging service)
└─ Return user-friendly errors
```

#### 2. Next.js Framework

```
Integration Points:
├─ App Router: src/app/
├─ API Routes: src/app/api/
├─ Server Components: layout.tsx, theme.ts
└─ Client Components: 'use client' directive

Configuration: next.config.ts
├─ Image optimization
├─ Font optimization
└─ API route configuration
```

#### 3. Material-UI (MUI)

```
Integration Points:
├─ Components: Box, Button, TextField, Select
├─ Icons: MUI Icons library
├─ Theme: src/app/theme.ts
├─ Provider: src/app/ThemeRegistry.tsx
│
Theme Configuration:
├─ Primary: Emerald green
├─ Secondary: Teal/Blue
├─ Gradients: Custom CSS
└─ Typography: Geist fonts
```

### Planned Integrations

#### 1. Authentication Service

```
Options:
├─ NextAuth.js (Recommended)
│  ├─ OAuth providers (Google, GitHub)
│  ├─ Email/password auth
│  └─ Session management
├─ Auth0 (Enterprise option)
│  ├─ SSO support
│  ├─ HIPAA compliant
│  └─ Higher cost
└─ JWT (Custom implementation)
   ├─ More control
   ├─ Higher complexity
   └─ Security concerns

Integration Steps:
1. Install: npm install next-auth
2. Create: pages/api/auth/[...nextauth].ts
3. Configure: Providers, callbacks, JWT
4. Wrap: <SessionProvider> in layout
5. Use: useSession() hook in components
```

#### 2. PostgreSQL Database

```
Connection:
├─ Driver: node-postgres or Prisma
├─ Connection String: DATABASE_URL
├─ Pool Size: 20 connections
├─ Timeout: 30 seconds
│
ORM: Prisma
├─ Schema: prisma/schema.prisma
├─ Migrations: prisma migrate
├─ Client: @prisma/client
│
Setup:
1. Create PostgreSQL instance
2. Install Prisma: npm install @prisma/client
3. npx prisma init
4. Configure DATABASE_URL
5. Create schema
6. Run migrations: npx prisma migrate dev
```

#### 3. Jitsi Meet Integration

```
URL-based Integration (Simple):
├─ Create meeting: https://meet.jitsi/room_name
├─ Embed: <iframe src="...">
└─ Display: Full-screen or embedded

API Integration (Advanced):
├─ Create rooms programmatically
├─ Control participants
├─ Record sessions
├─ Custom branding
│
Implementation:
1. Add Jitsi URL to telehealth page
2. Create meeting link in appointments
3. Pass meeting link to video page
4. Handle recording
```

#### 4. Email Service

```
Options:
├─ SendGrid (Recommended)
│  ├─ 100 emails/day free
│  ├─ High deliverability
│  └─ Templates support
├─ Mailgun
│  ├─ Developer friendly
│  ├─ Pay-per-email
│  └─ Good support
└─ AWS SES
   ├─ Cheapest at scale
   ├─ Complex setup
   └─ Good for high volume

Usage:
├─ Welcome emails
├─ Password reset
├─ Appointment reminders
├─ Consultation follow-ups
└─ Health tips
```

---

## Performance Optimization Strategy

### Current Performance Metrics

```
Target Metrics:
├─ Lighthouse Score: 90+
├─ First Contentful Paint: < 1.5s
├─ Time to Interactive: < 3.5s
├─ Cumulative Layout Shift: < 0.1
└─ API Response Time: < 500ms
```

### Optimization Opportunities

```
Frontend:
├─ Code splitting: Lazy load routes
├─ Image optimization: Next.js Image
├─ Bundle analysis: webpack-bundle-analyzer
├─ Caching: Service workers
└─ Compression: Gzip/Brotli

Backend:
├─ Query optimization: Database indexes
├─ Caching: Redis cache layer
├─ Connection pooling: Database optimization
├─ Rate limiting: Prevent abuse
└─ CDN: Static asset delivery

AI/API:
├─ Prompt caching: Reduce API calls
├─ Response streaming: Faster delivery
├─ Batching: Combine requests
└─ Model selection: Use appropriate model size
```

---

**End of Architecture & Roadmap Document**

This document should be updated as implementation progresses through different phases.
