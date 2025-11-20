# 🚫 DO NOT UPLOAD - Local Development Only

This folder contains local documentation, notes, and sensitive information that should **NOT** be pushed to GitHub.

## 📁 What's Inside

- **Documentation**: Development guides, implementation notes, architecture decisions
- **API Keys**: Gmail credentials, environment configuration examples
- **Debugging Notes**: Issue analysis, troubleshooting steps, local testing notes
- **Development Workflow**: Personal notes and workflows specific to this environment

## 🔐 Why It's Ignored

✅ Contains sensitive information (API keys, credentials)  
✅ Environment-specific documentation  
✅ Local development notes  
✅ Not needed for production deployment  
✅ Reduces repository bloat  

## 📝 How to Use Locally

All files in this folder are available for local reference:
- Setup guides and quick-start files
- Troubleshooting documentation
- Architecture and implementation details
- Email configuration guides

## ⚙️ Environment Variables

For production, use `.env.local` (which is also in .gitignore):
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NEXT_PUBLIC_GEMINI_API_KEY=your-api-key
```

Never commit these to the repository!

## 🔄 Before Pushing to GitHub

Ensure:
- ✅ All sensitive files are in this folder
- ✅ `.gitignore` includes `/do-not-upload/`
- ✅ `.env.local` is in `.gitignore`
- ✅ `.env` is NOT committed
- ✅ `node_modules/` is NOT committed

## 📚 File Structure

```
do-not-upload/
├── .gitkeep                              # Keeps folder in git
├── README.md                             # This file
├── 00_START_HERE.md                      # Getting started guide
├── START_HERE_FIX_NOW.md                 # Quick fixes
├── EMAIL_SETUP.md                        # Email configuration
├── TROUBLESHOOTING_ISSUES.md             # Debug guides
├── IMPLEMENTATION_GUIDE_*.md             # Feature guides
└── [other documentation files]           # Reference materials
```

## 🚀 For New Team Members

Copy relevant files from `do-not-upload/` to your local machine but **DO NOT PUSH THEM**.

Start with:
1. `00_START_HERE.md`
2. `START_HERE_FIX_NOW.md`
3. `EMAIL_SETUP.md`

Then refer to other docs as needed.

---

**Last Updated**: November 20, 2025  
**Status**: ✅ Git ignored properly
