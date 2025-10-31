# MagicMeds - Healthcare Management Platform

## Overview

MagicMeds is a comprehensive healthcare management platform built with Next.js 13+ and Material-UI, designed to streamline the healthcare experience for both patients and healthcare providers. The platform offers a modern, user-friendly interface for managing medical appointments, accessing healthcare information, and facilitating communication between patients and healthcare providers.

## Features

### 1. User Authentication
- Secure login and registration system
- Multi-step signup process for collecting patient information
- Password security with visibility toggle
- Form validation and error handling

### 2. Appointment Management
- Schedule new appointments with preferred doctors
- View upcoming, past, and cancelled appointments
- Detailed appointment cards showing:
  - Doctor information and department
  - Date and time
  - Location details
  - Appointment notes
  - Status indicators (upcoming, completed, cancelled, in-progress)
- Follow-up appointment reminders
- Responsive design for mobile and desktop views

### 3. Medical Services
- Browse available medical services
- Detailed information about treatments and procedures
- Department-wise categorization
- Service provider information

### 4. Articles and Resources
- Access to medical articles and health information
- Health tips and preventive care guidance
- Latest healthcare news and updates
- Educational resources

### 5. Chat Interface
- Real-time communication with healthcare providers
- AI-powered chat assistance for basic queries
- HIPAA-compliant messaging system
- File sharing capabilities

## Technical Stack

### Frontend
- **Framework**: Next.js 13+ with App Router
- **UI Library**: Material-UI (MUI)
- **Styling**: Emotion & Styled Components
- **Language**: TypeScript
- **State Management**: React Hooks

### Features
- Server-Side Rendering (SSR)
- Client-Side Navigation
- Responsive Design
- Progressive Web App (PWA) capabilities
- Type-Safe Development
- Modern UI/UX Design

### Security
- HIPAA Compliance Implementation
- Secure Authentication
- Data Encryption
- Privacy Protection

## Project Structure

```
magicmeds/
├── src/
│   ├── app/                 # Next.js App Router Pages
│   │   ├── layout.tsx      # Root Layout
│   │   ├── page.tsx        # Home Page
│   │   ├── login/         # Authentication
│   │   ├── signup/        # User Registration
│   │   ├── appointments/  # Appointment Management
│   │   ├── services/     # Medical Services
│   │   └── articles/     # Health Resources
│   ├── components/        # Reusable Components
│   ├── services/         # API Services
│   ├── utils/            # Utility Functions
│   └── types/            # TypeScript Definitions
├── public/               # Static Assets
└── package.json          # Dependencies
```

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sunnyshin8/MagicMeds.git
   cd magicmeds
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_GOOGLE_AI_KEY=your_google_ai_key
```

## Key Components

### 1. Layout and Theme
- Custom Material-UI theme implementation
- Responsive navigation bar
- Dark/Light mode support
- Consistent styling across pages

### 2. Authentication System
- JWT-based authentication
- Protected routes
- User session management
- Password reset functionality

### 3. Appointment System
- Interactive calendar interface
- Real-time availability checking
- Automated reminders
- Status tracking

### 4. Chat System
- Real-time messaging
- File attachments
- Message history
- Typing indicators

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use functional components
   - Implement proper error handling
   - Write meaningful comments

2. **Component Structure**
   - Keep components modular
   - Use proper prop typing
   - Implement error boundaries
   - Follow React best practices

3. **State Management**
   - Use React hooks efficiently
   - Implement context where needed
   - Keep state logic organized
   - Handle side effects properly

4. **Testing**
   - Write unit tests for components
   - Implement integration tests
   - Test error scenarios
   - Maintain good test coverage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js Team for the amazing framework
- Material-UI Team for the comprehensive component library
- All contributors and supporters of the project

## Contact

Sunny Shin - [GitHub Profile](https://github.com/sunnyshin8)

Project Link: [https://github.com/sunnyshin8/MagicMeds](https://github.com/sunnyshin8/MagicMeds)

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/getting-started/overview/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
