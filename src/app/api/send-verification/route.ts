import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { sendEmail, generateVerificationEmailHTML } from '@/lib/email';

// Generate a 6-digit verification code
function generateVerificationCode(): string {
  // For testing, use hardcoded code 365808
  if (process.env.NODE_ENV === 'development') {
    return '365808';
  }
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email, uid } = await request.json();

    if (!email || !uid) {
      return NextResponse.json(
        { error: 'Email and UID are required' },
        { status: 400 }
      );
    }

    // Generate verification code
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // Store verification code in Firestore
    await setDoc(doc(db, 'verificationCodes', uid), {
      code,
      email,
      createdAt: new Date(),
      expiresAt,
      verified: false
    });

    // Send verification email
    try {
      await sendEmail({
        to: email,
        subject: 'Verify your email address',
        html: generateVerificationEmailHTML(code)
      });
      console.log(`Verification code sent to ${email}: ${code}`);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // In development, we'll continue even if email fails
      // In production, you might want to throw an error here
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Failed to send verification email');
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Verification code sent',
      // Remove this in production - only for testing
      code: process.env.NODE_ENV === 'development' ? code : undefined
    });

  } catch (error: any) {
    console.error('Error sending verification code:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
