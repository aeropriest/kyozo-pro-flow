import { NextResponse } from 'next/server';
import { sendEmail, generateVerificationEmailHTML } from '@/lib/email';

export async function GET(request: Request) {
  try {
    const testCode = '123456';
    const testEmail = 'test@example.com';
    
    console.log('🧪 Testing email service...');
    
    // Test email sending
    await sendEmail({
      to: testEmail,
      subject: 'Test Verification Code',
      html: generateVerificationEmailHTML(testCode),
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      testCode,
      testEmail
    });
    
  } catch (error: any) {
    console.error('❌ Test email failed:', error);
    return NextResponse.json(
      { 
        error: error.message,
        success: false 
      },
      { status: 500 }
    );
  }
}
