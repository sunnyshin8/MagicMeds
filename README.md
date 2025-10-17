# 🏥 MagicMeds - AI-Powered Healthcare Platform

> Revolutionary telemedicine platform bringing world-class healthcare to rural India through AI-powered consultations and multilingual support.

![MagicMeds Healthcare Platform](https://img.shields.io/badge/Healthcare-AI%20Powered-cyan) ![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black) ![React](https://img.shields.io/badge/React-19.1.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-teal)

## ✨ Features

### 🎯 Core Healthcare Services
- **AI-Powered Consultations** - Intelligent health assessments with natural language processing
- **Multilingual Support** - Healthcare accessible in multiple Indian languages
- **Emergency Services** - Quick access to emergency medical assistance
- **Health Records Management** - Secure digital health record storage
- **Appointment Scheduling** - Easy booking system for medical consultations
- **Health Assessment Tools** - Comprehensive health screening questionnaires

### 🚀 Technical Highlights
- **Modern UI/UX** - Clean, responsive design with cyan-teal-emerald theme
- **Real-time Consultations** - Interactive chat interface with voice support
- **Progressive Web App** - Mobile-first approach with offline capabilities
- **Secure Authentication** - User registration and login system
- **Dashboard Analytics** - Health metrics and consultation history
- **Accessibility First** - Designed for users with varying tech literacy

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 with App Router
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Heroicons
- **Components**: Custom UI component library
- **Language**: TypeScript 5

### Backend & Database
- **Database**: Prisma ORM
- **Authentication**: Next.js built-in auth
- **API**: Next.js API Routes

### AI & NLP
- **Natural Language Processing**: Custom multilingual NLP service
- **Health Assessment**: Intelligent symptom analysis
- **Voice Support**: Browser-based speech recognition

## 📁 Project Structure

```
magicmeds/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── appointments/       # Appointment booking
│   │   ├── assessment/         # Health assessment tools
│   │   ├── auth/              # Authentication (login/register)
│   │   ├── dashboard/         # User dashboard & consultation
│   │   ├── emergency/         # Emergency services
│   │   ├── profile/           # User profile management
│   │   └── records/           # Health records
│   ├── components/            # Reusable UI components
│   │   ├── layout/           # Layout components (Navigation, etc.)
│   │   └── ui/               # Base UI components (Button, Card, Input)
│   ├── lib/                  # Utility functions
│   ├── services/             # API services & business logic
│   ├── styles/               # Global styles & theme
│   └── types/                # TypeScript type definitions
├── prisma/                   # Database schema
├── public/                   # Static assets
└── configuration files       # Next.js, Tailwind, TypeScript configs
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd magicmeds
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your environment variables:
   ```env
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Available Pages

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Homepage | Hero section, features overview, call-to-action |
| `/auth/login` | User Login | Authentication form |
| `/auth/register` | User Registration | Account creation |
| `/dashboard` | User Dashboard | Health metrics, quick actions |
| `/dashboard/consultation` | AI Consultation | Interactive health consultation |
| `/assessment` | Health Assessment | Comprehensive health screening |
| `/appointments` | Appointments | Book and manage appointments |
| `/records` | Health Records | View and manage health history |
| `/profile` | User Profile | Account settings and preferences |
| `/emergency` | Emergency Services | Quick access to emergency help |

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: Cyan-Teal-Emerald gradient theme
- **Secondary**: Clean whites and grays
- **Accent**: Warm yellows and oranges for highlights
- **Status**: Standard green/red for success/error states

### Design Principles
- **Mobile-First**: Responsive design for all device sizes
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Intuitive Navigation**: Clear user flows and consistent layouts
- **Visual Hierarchy**: Strategic use of typography and spacing

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Database
npx prisma studio    # Open Prisma database studio
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment with database
- **AWS/GCP/Azure**: Enterprise cloud deployment

## 🤝 Contributing

We welcome contributions to MagicMeds! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting with Prettier
- Add proper type definitions for new features
- Test your changes across different devices
- Update documentation for new features

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment tools
- **Tailwind CSS** for the utility-first CSS framework
- **Heroicons** for beautiful icons
- **Healthcare Community** for inspiration and feedback

## 📧 Contact & Support

- **Project Maintainer**: Hemal Shingloo
- **Email**: shingloo93@gmail.com
- **Issues**: [GitHub Issues](https://github.com/your-username/magicmeds/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/magicmeds/discussions)

---

<div align="center">
  <strong>Made with ❤️ for accessible healthcare in India</strong>
  <br>
  <em>Bringing world-class medical care to every corner of rural India through technology</em>
</div>
