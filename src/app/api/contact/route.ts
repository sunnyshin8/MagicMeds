import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shingloo93@gmail.com',
      subject: `New Contact Form Submission: ${body.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">New Message from MagicMeds Contact Form</h2>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${body.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #059669;">
              ${body.message}
            </p>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from the MagicMeds contact form at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: body.email,
      subject: 'We received your message - MagicMeds',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669;">MagicMeds</h1>
          </div>
          <h2 style="color: #059669;">Thank you for reaching out!</h2>
          <p>Hi ${body.name},</p>
          <p>We have received your message and will get back to you as soon as possible. We typically respond within 24 business hours.</p>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669;">Your Message Details</h3>
            <p><strong>Subject:</strong> ${body.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #059669;">
              ${body.message}
            </p>
          </div>
          <p>If you have any urgent matters, please reach out to us directly at <strong>+1 (555) 123-4567</strong></p>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Best regards,<br/>
            The MagicMeds Team
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2025 MagicMeds. All rights reserved.
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    // Log the submission (optional - for tracking)
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      subject: body.subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Provide helpful error messages for common issues
    let userFriendlyMessage = 'Failed to send message. Please try again later.';
    
    if (error instanceof Error) {
      if (error.message.includes('EAUTH') || error.message.includes('535')) {
        userFriendlyMessage = 'Email service authentication failed. Please check that Gmail App Password is correctly configured in environment variables.';
      } else if (error.message.includes('ENOTFOUND')) {
        userFriendlyMessage = 'Email service unavailable. Please check your internet connection.';
      } else if (error.message.includes('timeout')) {
        userFriendlyMessage = 'Email service timeout. Please try again in a moment.';
      } else if (error.message.includes('ValidationError')) {
        userFriendlyMessage = 'Invalid email configuration. Please contact administrator.';
      }
    }
    
    return NextResponse.json(
      {
        error: userFriendlyMessage,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact form API endpoint' },
    { status: 200 }
  );
}
