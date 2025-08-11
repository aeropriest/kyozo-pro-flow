// Email service for sending verification codes using SendGrid Web API
// Supports both Web API (recommended) and SMTP fallback

import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions): Promise<any> {
  console.log('📧 Sending email to:', to);
  console.log('📧 Subject:', subject);
  
  // For development, we'll skip email sending and just log
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 HTML Content:', html);
    console.log('🧪 DEVELOPMENT MODE: Email not sent, using hardcoded verification code 365808');
    return { messageId: 'dev-test-' + Date.now(), status: 'development-mode' };
  }

  const fromEmail = from || 'Kyozo Support <noreply@kyozo.com>';

  // Try SendGrid Web API first (recommended)
  if (process.env.SENDGRID_API_KEY) {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const msg = {
        to: to,
        from: fromEmail,
        subject: subject,
        html: html,
      };

      const response = await sgMail.send(msg);
      console.log('✅ Email sent successfully via SendGrid API:', response[0].statusCode);
      return response;
      
    } catch (error) {
      console.error('❌ SendGrid API failed:', error);
      // Fall through to SMTP if API fails
    }
  }

  // Fallback to SMTP (for helpaproduct compatibility)
  if (process.env.SENDGRID_USER && process.env.SENDGRID_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SENDGRID_SMTP || 'smtp.sendgrid.net',
        port: parseInt(process.env.SENDGRID_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });

      const emailResponse = await transporter.sendMail({
        from: fromEmail,
        to: to,
        subject: subject,
        html: html,
      });

      console.log('✅ Email sent successfully via SMTP:', emailResponse.messageId);
      return emailResponse;
      
    } catch (error) {
      console.error('❌ SMTP failed:', error);
      throw new Error(`Failed to send email via SMTP: ${error}`);
    }
  }

  // No credentials configured
  throw new Error('No SendGrid credentials configured. Please set SENDGRID_API_KEY or SENDGRID_USER/SENDGRID_PASSWORD');
}

export function generateVerificationEmailHTML(code: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #2563eb;
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .content {
          text-align: center;
        }
        .verification-code {
          font-size: 48px;
          font-weight: bold;
          letter-spacing: 8px;
          color: #2563eb;
          background: #f0f4ff;
          padding: 20px;
          border-radius: 8px;
          margin: 30px 0;
          border: 2px solid #e0e7ff;
        }
        .instructions {
          font-size: 16px;
          color: #666;
          margin: 20px 0;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 14px;
          color: #999;
          text-align: center;
        }
        .brand {
          color: #2563eb;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Verify Your Email</h1>
        </div>
        
        <div class="content">
          <p class="instructions">
            Please enter the following verification code to complete your account setup:
          </p>
          
          <div class="verification-code">
            ${code}
          </div>
          
          <p class="instructions">
            This code will expire in <strong>15 minutes</strong>.
          </p>
          
          <p style="color: #666; font-size: 14px;">
            If you didn't request this verification code, you can safely ignore this email.
          </p>
        </div>
        
        <div class="footer">
          <p>
            This email was sent by <span class="brand">Kyozo</span><br>
            If you need help, please contact our support team.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
