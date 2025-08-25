import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderEmailTemplate, generateVerificationCode } from '@/lib/emailTemplates';
import { storeVerificationCode } from '../verify-code/route';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate 6-digit verification code
    const verificationCode = generateVerificationCode();

    // Store verification code for later verification
    await storeVerificationCode(email, verificationCode, 10); // 10 minutes expiry
    
    console.log(`🔵 Verification code for ${email}: ${verificationCode}`);

    // Check if we have a valid Resend API key
    const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
    
    console.log('🔍 API Key check:', apiKey ? `${apiKey.substring(0, 8)}...` : 'undefined');
    
    if (apiKey && apiKey !== 're_your_resend_api_key_here' && apiKey.length > 10) {
      try {
        // Render styled email template
        const { html, text } = renderEmailTemplate('email-verification', {
          VERIFICATION_CODE: verificationCode,
          USER_EMAIL: email
        });

        // Send email using simplified Resend structure
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'Verify your email - Kyozo',
          html: html,
        });

        console.log('📧 Email sent successfully via Resend');
        
      } catch (error) {
        console.error('Email service error:', error);
        console.log('📧 Falling back to development mode - check console for code');
      }
    } else {
      console.log('📧 Development mode: No valid Resend API key found');
      console.log('📧 Add a valid Resend API key to .env.local to send real emails');
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code generated successfully',
      // Show code in development for testing
      verificationCode: process.env.NODE_ENV === 'development' ? verificationCode : undefined
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
