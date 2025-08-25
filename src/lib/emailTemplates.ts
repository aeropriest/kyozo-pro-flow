export interface EmailTemplateData {
  VERIFICATION_CODE: string;
  USER_EMAIL: string;
}

export const renderEmailTemplate = (templateName: string, data: EmailTemplateData): { html: string; text: string } => {
  // For now, use inline templates to avoid file system issues in API routes
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kyozo Email Verification</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f8fafc;
                margin: 0;
                padding: 20px;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 30px;
                text-align: center;
            }
            .logo {
                font-size: 32px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 8px;
                letter-spacing: -0.5px;
            }
            .tagline {
                color: rgba(255, 255, 255, 0.9);
                font-size: 14px;
                font-weight: 400;
            }
            .content {
                padding: 40px 30px;
            }
            .greeting {
                font-size: 24px;
                font-weight: 600;
                color: #1a202c;
                margin-bottom: 16px;
            }
            .message {
                font-size: 16px;
                color: #4a5568;
                margin-bottom: 32px;
                line-height: 1.7;
            }
            .verification-code-container {
                background-color: #f7fafc;
                border: 2px dashed #e2e8f0;
                border-radius: 8px;
                padding: 24px;
                text-align: center;
                margin-bottom: 32px;
            }
            .verification-code-label {
                font-size: 14px;
                color: #718096;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-weight: 500;
            }
            .verification-code {
                font-size: 36px;
                font-weight: 700;
                color: #667eea;
                letter-spacing: 8px;
                font-family: 'Courier New', monospace;
                margin-bottom: 8px;
            }
            .code-expiry {
                font-size: 12px;
                color: #a0aec0;
            }
            .footer {
                background-color: #f7fafc;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e2e8f0;
            }
            .footer-text {
                font-size: 14px;
                color: #718096;
                margin-bottom: 16px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <div class="logo">Kyozo</div>
                <div class="tagline">Community Management Platform</div>
            </div>
            
            <div class="content">
                <h1 class="greeting">Verify Your Email</h1>
                
                <p class="message">
                    Welcome to Kyozo! To complete your account setup and ensure the security of your account, 
                    please verify your email address using the verification code below.
                </p>
                
                <div class="verification-code-container">
                    <div class="verification-code-label">Your Verification Code</div>
                    <div class="verification-code">{{VERIFICATION_CODE}}</div>
                    <div class="code-expiry">This code expires in 10 minutes</div>
                </div>
                
                <p class="message">
                    Having trouble? If you're unable to verify your email, please contact our support team 
                    and we'll be happy to help you get started with Kyozo.
                </p>
            </div>
            
            <div class="footer">
                <p class="footer-text">
                    This email was sent to {{USER_EMAIL}} because you requested email verification for Kyozo.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;

  const textTemplate = `
KYOZO - Email Verification
==========================

Welcome to Kyozo!

To complete your account setup and ensure the security of your account, please verify your email address using the verification code below.

Your Verification Code: {{VERIFICATION_CODE}}

This code expires in 10 minutes.

Having trouble? If you're unable to verify your email, please contact our support team and we'll be happy to help you get started with Kyozo.

---
This email was sent to {{USER_EMAIL}} because you requested email verification for Kyozo.

Kyozo - Community Management Platform
  `;

  // Replace placeholders in both templates
  let html = htmlTemplate;
  let text = textTemplate;
  
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    html = html.replace(new RegExp(placeholder, 'g'), value);
    text = text.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return { html, text };
};

export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
