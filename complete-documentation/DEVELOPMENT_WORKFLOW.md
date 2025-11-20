# 🔄 MagicMeds Development Workflow & Process Guide

**Version**: 1.0  
**Date**: November 13, 2025

---

## Table of Contents

1. [Project Setup Workflow](#project-setup-workflow)
2. [Feature Development Workflow](#feature-development-workflow)
3. [API Development Workflow](#api-development-workflow)
4. [Component Development Workflow](#component-development-workflow)
5. [Testing & QA Workflow](#testing--qa-workflow)
6. [Deployment Workflow](#deployment-workflow)
7. [Troubleshooting Guide](#troubleshooting-guide)
8. [Git Workflow](#git-workflow)

---

## Project Setup Workflow

### Step 1: Initial Repository Setup

```
STEP 1.1: Clone Repository
├─ Command: git clone <repository-url> c:\Users\anndy\MagicMeds
├─ Verify: .git folder exists
└─ Output: Repository cloned locally

STEP 1.2: Install Dependencies
├─ Command: npm install
├─ Time: ~5-10 minutes
├─ Produces: node_modules/ folder, package-lock.json
└─ Verify: No ERROR messages in output

STEP 1.3: Environment Configuration
├─ Create: .env.local file (root directory)
├─ Add: GOOGLE_AI_STUDIO_API_KEY=<your-api-key>
├─ Verify: File not committed to git
└─ Note: .gitignore should include .env.local
```

### Step 2: Verify Installation

```
STEP 2.1: TypeScript Check
├─ Run: npx tsc --noEmit
├─ Expected: No errors
└─ If failed: Check tsconfig.json configuration

STEP 2.2: Linting Check
├─ Run: npm run lint
├─ Expected: No critical errors
└─ If failed: Run eslint fixes if possible

STEP 2.3: Development Server
├─ Run: npm run dev
├─ Expected: Server starts at http://localhost:3000
├─ Port: 3000 (or next available)
└─ Stop: Press Ctrl+C
```

### Step 3: Project Structure Verification

```
Verify these key directories exist:
├─ src/app/              ✓ Page routes
├─ src/components/       ✓ Reusable components
├─ src/services/         ✓ Business logic
├─ src/utils/            ✓ Utility functions
├─ src/types/            ✓ TypeScript definitions
├─ public/               ✓ Static files
└─ node_modules/         ✓ Dependencies
```

---

## Feature Development Workflow

### Workflow Pattern: From Concept to Production

```
┌─────────────────────────────────────────────────────────────┐
│                  FEATURE DEVELOPMENT CYCLE                  │
└─────────────────────────────────────────────────────────────┘

PHASE 1: PLANNING
├─ Define feature requirements
├─ Identify affected components
├─ Determine API endpoints needed
├─ Plan data models (if new)
└─ Create design mockups/wireframes

         ↓

PHASE 2: BRANCH CREATION
├─ Create feature branch
│  └─ git checkout -b feature/feature-name
├─ Naming convention: feature/*, bugfix/*, refactor/*
└─ Branch created from main

         ↓

PHASE 3: IMPLEMENTATION
├─ Create/modify components
├─ Implement business logic
├─ Add API endpoints
├─ Write validation schemas (Zod)
├─ Add TypeScript types
└─ Ensure type safety

         ↓

PHASE 4: STYLING & UI
├─ Apply Material-UI theming
├─ Use Tailwind utilities if needed
├─ Ensure responsive design
├─ Test on mobile/tablet/desktop
└─ Verify accessibility

         ↓

PHASE 5: INTEGRATION
├─ Connect to existing services
├─ Integrate API endpoints
├─ Connect to database (if needed)
├─ Handle error states
└─ Add loading states

         ↓

PHASE 6: TESTING
├─ Manual testing in browser
├─ Test all code paths
├─ Test error scenarios
├─ Cross-browser testing
└─ Performance testing

         ↓

PHASE 7: DOCUMENTATION
├─ Add code comments
├─ Update API documentation
├─ Update README if needed
├─ Document new types
└─ Add usage examples

         ↓

PHASE 8: CODE REVIEW
├─ Push to remote branch
├─ Create Pull Request
├─ Request team review
├─ Address review comments
├─ Squash/rebase if needed
└─ Merge to main

         ↓

PHASE 9: DEPLOYMENT
├─ Verify build: npm run build
├─ Deploy to staging
├─ Smoke test in staging
├─ Deploy to production
└─ Monitor logs
```

### Example: Adding a New Feature

**Feature**: Add "Medication Reminder" functionality

```
1. PLANNING (30 min)
   ├─ Requirements:
   │  ├─ User can set medication reminders
   │  ├─ Reminders sent at specified times
   │  └─ Can manage/delete reminders
   ├─ Components needed:
   │  ├─ ReminderForm.tsx
   │  ├─ ReminderList.tsx
   │  └─ ReminderItem.tsx
   └─ API endpoints needed:
      ├─ POST /api/reminders
      ├─ GET /api/reminders
      ├─ PUT /api/reminders/:id
      └─ DELETE /api/reminders/:id

2. BRANCH CREATION (2 min)
   $ git checkout -b feature/medication-reminders
   $ git push origin feature/medication-reminders

3. IMPLEMENTATION (2 hours)
   
   a) Create types: src/types/reminder.ts
      ```typescript
      export interface Reminder {
        id: string;
        medicationName: string;
        dosage: string;
        time: string; // HH:MM format
        daysOfWeek: number[]; // 0-6
        isActive: boolean;
        createdAt: Date;
      }
      ```
   
   b) Create components:
      src/components/ReminderForm.tsx
      src/components/ReminderList.tsx
      src/components/ReminderItem.tsx
   
   c) Create API: src/app/api/reminders/route.ts
   
   d) Add validation: Zod schema in route.ts
   
   e) Create service: src/services/reminderService.ts

4. STYLING (30 min)
   ├─ Use Material-UI Button, TextField, Select
   ├─ Use Tailwind for layout
   └─ Ensure responsive design

5. INTEGRATION (1 hour)
   ├─ Connect to user profile
   ├─ Hook into notification service
   └─ Add to dashboard

6. TESTING (1 hour)
   ├─ Test form submission
   ├─ Test API responses
   ├─ Test reminder display
   └─ Test delete/edit functions

7. DOCUMENTATION
   ├─ Add JSDoc comments
   ├─ Document API endpoints
   └─ Update component stories

8. CODE REVIEW
   $ git push origin feature/medication-reminders
   → Create PR on GitHub
   → Request review
   → Address comments
   → Merge to main

9. DEPLOYMENT
   $ npm run build  ✓
   → Deploy to production
   → Monitor error logs
```

---

## API Development Workflow

### Creating a New API Endpoint

#### Step-by-Step Guide: POST /api/reminders

```
1. CREATE ROUTE FILE
   Path: src/app/api/reminders/route.ts
   
   File Structure:
   ├─ Imports (Next.js, services, types, validation)
   ├─ Request validation schema (Zod)
   ├─ POST handler function
   ├─ GET handler function (if applicable)
   ├─ Error handling
   └─ Response formatting

2. EXAMPLE IMPLEMENTATION
```

```typescript
// src/app/api/reminders/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

// 1. Define validation schema
const reminderSchema = z.object({
  medicationName: z.string().min(1).max(100),
  dosage: z.string().min(1).max(50),
  time: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
  daysOfWeek: z.array(z.number().min(0).max(6)),
  isActive: z.boolean().default(true)
});

// 2. POST endpoint - Create reminder
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = reminderSchema.parse(body);

    // TODO: Save to database
    const reminder = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date()
    };

    return NextResponse.json(
      { 
        success: true, 
        reminder 
      },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      );
    }

    console.error('Error creating reminder:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 3. GET endpoint - Fetch reminders
export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch from database
    const reminders = [];

    return NextResponse.json(
      { 
        success: true, 
        reminders 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching reminders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

```
3. TESTING THE ENDPOINT
   
   Using curl:
   $ curl -X POST http://localhost:3000/api/reminders \
     -H "Content-Type: application/json" \
     -d '{
       "medicationName": "Aspirin",
       "dosage": "500mg",
       "time": "09:00",
       "daysOfWeek": [1,3,5],
       "isActive": true
     }'
   
   Expected Response:
   {
     "success": true,
     "reminder": {
       "id": "1234567890",
       "medicationName": "Aspirin",
       "dosage": "500mg",
       "time": "09:00",
       "daysOfWeek": [1,3,5],
       "isActive": true,
       "createdAt": "2025-11-13T..."
     }
   }

4. HANDLE DIFFERENT HTTP METHODS
   
   For PUT (update):
   $ export async function PUT(request: NextRequest) { ... }
   
   For DELETE (delete):
   $ export async function DELETE(request: NextRequest) { ... }

5. ADD ERROR HANDLING
   
   Common errors to handle:
   ├─ 400: Bad request (validation failed)
   ├─ 401: Unauthorized (user not authenticated)
   ├─ 403: Forbidden (user not allowed)
   ├─ 404: Not found (resource doesn't exist)
   ├─ 500: Internal server error
   └─ 503: Service unavailable

6. INTEGRATE WITH FRONTEND
   
   In component:
   ```typescript
   const response = await fetch('/api/reminders', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   const data = await response.json();
   ```
```

---

## Component Development Workflow

### Creating a New Component

#### Example: Building a ReminderForm Component

```
1. IDENTIFY COMPONENT PURPOSE
   Purpose: Allow users to create medication reminders
   Props: onSubmit(reminder), isLoading, initialData?
   State: form fields, validation errors, loading state
   
2. CREATE COMPONENT FILE
   Path: src/components/ReminderForm.tsx
   
3. STRUCTURE
   ```typescript
   'use client'; // If using hooks/state
   
   import { useState } from 'react';
   import { Box, Button, TextField, Select } from '@mui/material';
   import { z } from 'zod';
   
   // Component definition
   export default function ReminderForm({ onSubmit, isLoading }) {
     // State
     const [formData, setFormData] = useState({...});
     const [errors, setErrors] = useState({});
     
     // Validation
     const handleValidate = () => {...};
     
     // Handlers
     const handleChange = (e) => {...};
     const handleSubmit = async (e) => {...};
     
     // Render
     return (
       <Box component="form" onSubmit={handleSubmit}>
         {/* Form fields */}
       </Box>
     );
   }
   ```

4. ADD STYLING
   - Use Material-UI components
   - Use Tailwind for layout
   - Ensure responsive design
   
   ```typescript
   <Box 
     sx={{
       display: 'flex',
       flexDirection: 'column',
       gap: 2,
       p: 2
     }}
   >
     {/* Form content */}
   </Box>
   ```

5. ADD VALIDATION
   ```typescript
   const validationSchema = z.object({
     medicationName: z.string().min(1),
     time: z.string().regex(/^\d{2}:\d{2}$/),
     // ... other fields
   });
   ```

6. INTEGRATE WITH API
   ```typescript
   const handleSubmit = async (e) => {
     e.preventDefault();
     
     try {
       const response = await fetch('/api/reminders', {
         method: 'POST',
         body: JSON.stringify(formData)
       });
       
       if (response.ok) {
         onSubmit(await response.json());
       }
     } catch (error) {
       setErrors({ submit: error.message });
     }
   };
   ```

7. USE IN PARENT COMPONENT
   ```typescript
   import ReminderForm from '@/components/ReminderForm';
   
   export default function RemindersPage() {
     const handleReminderSubmit = (reminder) => {
       // Handle new reminder
     };
     
     return <ReminderForm onSubmit={handleReminderSubmit} />;
   }
   ```
```

---

## Testing & QA Workflow

### Manual Testing Checklist

```
BEFORE COMMITTING CODE:

1. LOCAL TESTING
   ├─ Start dev server: npm run dev
   ├─ Navigate to affected pages
   ├─ Test all user flows
   ├─ Check console for errors
   └─ Verify no warnings

2. BROWSER TESTING
   ├─ Chrome (latest)
   ├─ Firefox (latest)
   ├─ Safari (if available)
   └─ Edge (if available)

3. RESPONSIVE TESTING
   ├─ Mobile (320px - 480px)
   ├─ Tablet (480px - 768px)
   ├─ Desktop (768px - 1920px)
   └─ Ultra-wide (1920px+)

4. ACCESSIBILITY TESTING
   ├─ Tab navigation works
   ├─ Keyboard-only usage
   ├─ Screen reader compatibility
   └─ Color contrast sufficient

5. PERFORMANCE TESTING
   ├─ Check Lighthouse scores
   ├─ Monitor API response times
   ├─ Check bundle size
   └─ Verify no memory leaks

6. ERROR HANDLING
   ├─ Test network failures
   ├─ Test invalid input
   ├─ Test API errors
   └─ Check error messages

7. BUILD VERIFICATION
   ├─ Run: npm run build
   ├─ Check for warnings
   ├─ Verify build succeeds
   └─ Test production build locally
```

### Automated Testing Setup

```
JEST CONFIGURATION (To be implemented)

1. Create test file: components/__tests__/ChatInterface.test.tsx

2. Example test structure:
   ```typescript
   import { render, screen, fireEvent } from '@testing-library/react';
   import ChatInterface from '../ChatInterface';
   
   describe('ChatInterface', () => {
     it('renders chat messages', () => {
       render(<ChatInterface />);
       expect(screen.getByText('How can I help')).toBeInTheDocument();
     });
     
     it('sends messages on submit', async () => {
       render(<ChatInterface />);
       const input = screen.getByPlaceholderText('Type your message');
       fireEvent.change(input, { target: { value: 'Test message' } });
       fireEvent.submit(input);
       // Assert message appears
     });
   });
   ```

3. Run tests: npm test
```

---

## Deployment Workflow

### Production Deployment Checklist

```
STEP 1: PRE-DEPLOYMENT
├─ Merge all features to main branch
├─ Run npm run lint (fix errors)
├─ Run npm run build (verify success)
├─ Review all changes: git log
├─ Tag release: git tag v0.2.0
└─ Push tags: git push origin --tags

STEP 2: BUILD OPTIMIZATION
├─ Verify production environment
├─ Set production env variables
├─ Confirm API keys are correct
├─ Enable security headers
└─ Configure CORS if needed

STEP 3: STAGING DEPLOYMENT
├─ Deploy to staging environment
├─ Run smoke tests
├─ Verify all APIs work
├─ Check email notifications
├─ Monitor error logs
└─ Performance testing

STEP 4: PRODUCTION DEPLOYMENT
├─ Choose deployment time
├─ Notify team/users
├─ Deploy with zero-downtime
├─ Monitor error logs
├─ Test critical paths
└─ Have rollback plan ready

STEP 5: POST-DEPLOYMENT
├─ Monitor server health
├─ Check error rates
├─ Monitor API performance
├─ Verify user reports
├─ Document any issues
└─ Send deployment notification
```

### Environment-Specific Deployment

```bash
# DEVELOPMENT
npm run dev
# Local testing, hot reload

# STAGING
npm run build
npm start
# Test production build locally

# PRODUCTION
# Via Vercel:
vercel deploy --prod

# Via custom server:
npm run build
pm2 restart magicmeds
pm2 logs magicmeds
```

---

## Troubleshooting Guide

### Common Issues & Solutions

#### Issue 1: "GOOGLE_AI_STUDIO_API_KEY is not set"

```
ERROR: Error: GOOGLE_AI_STUDIO_API_KEY is not set in environment variables

SOLUTION:
1. Create .env.local in project root
2. Add: GOOGLE_AI_STUDIO_API_KEY=your_key_here
3. Restart dev server: npm run dev
4. Verify in process.env.GOOGLE_AI_STUDIO_API_KEY

NOTE: Never commit .env.local to git
```

#### Issue 2: TypeScript Compilation Errors

```
ERROR: Type 'X' is not assignable to type 'Y'

SOLUTION:
1. Check type definitions: src/types/
2. Verify imports: import { Type } from './path'
3. Use correct Generic syntax: Array<Type>, Record<K, V>
4. Run: npx tsc --noEmit
5. Check tsconfig.json strict mode settings

TIP: Hover over error in VS Code for detailed info
```

#### Issue 3: Module Not Found

```
ERROR: Cannot find module '@/services/googleAIStudio'

SOLUTION:
1. Verify file exists: src/services/googleAIStudio.ts
2. Check path aliases in tsconfig.json
3. Verify export: export const functionName = ...
4. Case-sensitive: check Linux vs Windows
5. Clear cache: Delete .next folder
6. Restart dev server
```

#### Issue 4: Chat API Returns 400

```
ERROR: POST /api/chat 400 Bad Request

SOLUTION:
1. Check request body format
2. Verify required fields present
3. Check Zod validation schema
4. Log request: console.log(body)
5. Verify Content-Type header
6. Check message length < 1000 chars

DEBUG:
- Open DevTools (F12)
- Network tab
- Click failed request
- Check Request/Response headers and body
```

#### Issue 5: Build Fails

```
ERROR: npm run build
Failure during build

SOLUTION:
1. Check for TypeScript errors: npx tsc --noEmit
2. Check for ESLint errors: npm run lint
3. Verify all imports are correct
4. Check for circular dependencies
5. Clear cache: rm -r .next node_modules
6. Reinstall: npm install
7. Try build again

WINDOWS:
rmdir /s /q .next
rmdir /s /q node_modules
npm install
npm run build
```

#### Issue 6: Port 3000 Already in Use

```
ERROR: Error: listen EADDRINUSE: address already in use :::3000

SOLUTION (Windows):
1. Find process: netstat -ano | findstr :3000
2. Kill process: taskkill /PID <PID> /F
3. Restart dev server: npm run dev

OR use different port:
npm run dev -- -p 3001
```

---

## Git Workflow

### Standard Git Workflow for MagicMeds

```
INITIAL SETUP:
$ git config user.name "Your Name"
$ git config user.email "your.email@example.com"

CREATING FEATURE BRANCH:
$ git checkout main
$ git pull origin main
$ git checkout -b feature/feature-name

MAKING CHANGES:
$ git add src/components/NewComponent.tsx
$ git add src/services/newService.ts
$ git status  # Verify staged files

COMMITTING CHANGES:
$ git commit -m "feat: add new feature description"

Commit message format:
feat:   new feature
fix:    bug fix
refactor: code refactoring
docs:   documentation
style:  formatting, missing semicolons
test:   adding tests
chore:  build process, dependencies

PUSHING CHANGES:
$ git push origin feature/feature-name

CREATING PULL REQUEST:
1. Go to GitHub
2. Click "Compare & pull request"
3. Add title and description
4. Request reviewers
5. Submit PR

CODE REVIEW FEEDBACK:
$ git add .
$ git commit -m "refactor: address review comments"
$ git push origin feature/feature-name
(Automatically updates PR)

MERGING TO MAIN:
1. Wait for approval
2. Squash commits if needed
3. Click "Squash and merge" or "Merge"
4. Delete branch

PULLING UPDATES:
$ git checkout main
$ git pull origin main
$ npm install  # If dependencies changed
```

### Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline -10

# See changes in current branch
git diff main

# Stash uncommitted changes
git stash

# Apply stashed changes
git stash pop

# Undo last commit (keep changes)
git reset --soft HEAD~1

# View all branches
git branch -a

# Delete local branch
git branch -d feature/old-feature

# Delete remote branch
git push origin --delete feature/old-feature

# Fetch latest from remote
git fetch origin

# Rebase current branch
git rebase main
```

---

## Quick Reference: Development Commands

```bash
# Starting fresh
npm install                    # Install dependencies
npm run dev                    # Start dev server

# Building & Testing
npm run build                  # Production build
npm start                      # Start production server
npm run lint                   # Run linter
npx tsc --noEmit             # Type check

# Git operations
git status                     # Check status
git add .                      # Stage changes
git commit -m "message"        # Commit
git push origin branch-name    # Push to remote
git pull origin main           # Fetch updates

# Debugging
npm run dev                    # See console logs
DevTools (F12)                 # Browser debugging
Postman/curl                   # API testing

# Cleaning cache
rm -r .next                    # Clear Next.js cache
rm -r node_modules            # Reinstall packages
rm package-lock.json          # Reset lock file
```

---

## Team Collaboration Best Practices

```
1. COMMUNICATION
   ├─ Discuss features before implementation
   ├─ Share design decisions
   ├─ Use PR descriptions for context
   └─ Comment complex code sections

2. CODE REVIEWS
   ├─ Review PRs within 24 hours
   ├─ Provide constructive feedback
   ├─ Suggest improvements with examples
   └─ Approve when satisfied

3. BRANCH MANAGEMENT
   ├─ Keep branches up-to-date with main
   ├─ Delete merged branches
   ├─ Use meaningful branch names
   └─ One feature per branch

4. COMMIT PRACTICES
   ├─ Commit frequently and logically
   ├─ Write descriptive messages
   ├─ Keep commits atomic (one change per commit)
   └─ Avoid committing debug code

5. TESTING
   ├─ Test your changes before pushing
   ├─ Run full build locally
   ├─ Verify no regressions
   └─ Test edge cases

6. DOCUMENTATION
   ├─ Update README for major changes
   ├─ Comment complex logic
   ├─ Document API endpoints
   └─ Keep types clear and named
```

---

**End of Workflow Guide**

For questions or updates to this workflow, contact the development team.
