# Email Configuration Guide for MagicMeds

## Overview
The contact form on MagicMeds uses Nodemailer with Gmail SMTP to send emails. This guide explains how to set up email functionality for the contact form.

## Prerequisites
- A Gmail account
- Access to Google Account Security settings
- The MagicMeds project set up locally

## Step-by-Step Setup

### 1. Enable 2-Step Verification
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. In the "How you sign in to Google" section, find "2-Step Verification"
3. Click on it and follow the prompts to enable 2-Step Verification
4. Verify your phone number or choose an alternative verification method

### 2. Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - You may need to sign in again
   - The page will only show if 2-Step Verification is enabled
2. Select "Mail" as the app and "Windows Computer" as the device
3. Click "Generate"
4. Google will show you a 16-character password with spaces (e.g., `xxxx xxxx xxxx xxxx`)

### 3. Configure Environment Variables
1. Open `.env.local` in the root of the MagicMeds project
2. Update the email configuration:
   ```
   EMAIL_USER=shingloo93@gmail.com
   EMAIL_PASSWORD=xxxxxxxxxxxx  (the 16-char password from Step 2, without spaces)
   EMAIL_FROM=noreply@magicmeds.com
   EMAIL_TO=shingloo93@gmail.com
   ```

### 4. Save and Restart Dev Server
1. Save the `.env.local` file
2. Restart the Next.js dev server:
   ```bash
   npm run dev
   ```
3. The contact form should now be able to send emails

## Testing the Contact Form

### Local Testing
1. Navigate to `http://localhost:3000/contact`
2. Fill out the contact form with:
   - Name: Test User
   - Email: your-email@gmail.com (any valid email)
   - Phone: (optional)
   - Subject: Test Message
   - Message: This is a test message
3. Click "Send Message"
4. You should receive:
   - A confirmation email at the provided email address
   - An admin notification at shingloo93@gmail.com

### Troubleshooting

#### Email Not Sending
- **Check 1**: Verify 2-Step Verification is enabled
- **Check 2**: Confirm you're using an App Password (not your regular password)
- **Check 3**: Remove spaces from the app password in `.env.local`
- **Check 4**: Check browser console for error messages
- **Check 5**: Check terminal logs for server-side errors

#### Common Errors
- `Login failed`: Usually means wrong password or 2-Step Verification not enabled
- `ENOTFOUND`: Email service unreachable (check internet connection)
- `ValidationError`: Missing required fields in the form

## Email Templates

### Admin Notification Email
Sent to: `shingloo93@gmail.com`
- Contains: User name, email, phone, subject, and message
- Includes: Timestamp of submission

### User Confirmation Email
Sent to: User's provided email address
- Contains: Confirmation of message receipt
- Includes: Estimated response time (24 hours)
- Provides: Alternative contact method (phone number)

## Production Deployment

For production deployment (e.g., Vercel, AWS):

1. Add environment variables to your hosting platform's environment configuration:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `EMAIL_FROM` (optional, defaults to EMAIL_USER)
   - `EMAIL_TO` (optional, defaults to shingloo93@gmail.com)

2. Keep `.env.local` out of version control (it's in `.gitignore`)

3. Do NOT commit `.env.local` to Git

4. For Gmail specifically:
   - Consider using [Gmail API](https://developers.google.com/gmail/api) for better security
   - Or use a dedicated email service (SendGrid, Mailgun, etc.)

## Security Considerations

- Never commit `.env.local` to version control
- Rotate app passwords periodically
- Consider using a dedicated email service for production
- Implement rate limiting on contact form endpoint
- Add CSRF protection for the contact form

## Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Google Account Security](https://myaccount.google.com/security)
- [SMTP Configuration](https://nodemailer.com/smtp/)
