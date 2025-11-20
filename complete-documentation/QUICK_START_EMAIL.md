# 🚀 Quick Start Guide - Email Setup

## 3-Minute Setup

### ⏱️ Step 1: Enable 2-Step Verification (2 min)
```
1. Go to: https://myaccount.google.com/security
2. Click: 2-Step Verification
3. Follow: Phone verification process
```

### ⏱️ Step 2: Get App Password (1 min)
```
1. Go to: https://myaccount.google.com/apppasswords
2. Select: Mail > Windows Computer
3. Copy: 16-character password (no spaces)
```

### ⏱️ Step 3: Add to .env.local (10 sec)
```
Open: c:\Users\anndy\MagicMeds\.env.local

Change this line:
  EMAIL_PASSWORD=your_app_password_here

To this:
  EMAIL_PASSWORD=xxxxxxxxxxxx (your 16-char password)

Save file
```

### ✅ Done!
Contact form is now active. Test at: http://localhost:3000/contact

---

## Email Flow

```
User submits form
        ↓
API validates data
        ↓
Sends 2 emails simultaneously:
  ├─→ User confirmation email
  └─→ Admin notification (shingloo93@gmail.com)
        ↓
Returns success message
```

## Testing

```bash
# 1. Contact form is here:
http://localhost:3000/contact

# 2. Fill and submit
# 3. Check email inbox
# 4. Should see 2 emails:
#    - Confirmation (to you)
#    - Admin notification (to shingloo93@gmail.com)
```

## Common Issues

| Issue | Solution |
|-------|----------|
| "Login failed" | 2-Step Verification not enabled |
| "Invalid credentials" | Wrong app password or has spaces |
| No email received | Check spam folder, verify email address |
| Form not submitting | Check browser console for errors |

## Files

- `EMAIL_SETUP.md` - Detailed guide
- `EMAIL_SETUP_COMPLETE.md` - Full status report
- `EMAIL_VERIFICATION_REPORT.md` - Technical verification
- `.env.local.example` - Configuration template

## Support

If email not working after 5 minutes, check:
1. Is 2-Step Verification enabled?
2. Is App Password correct (16 chars, no spaces)?
3. Browser console for error messages?
4. Terminal logs for server errors?

---

**Status**: ✅ Ready to Activate
**Contact Form**: http://localhost:3000/contact
**Admin Email**: shingloo93@gmail.com
