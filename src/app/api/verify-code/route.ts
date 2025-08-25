import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    // Get stored verification data from Firestore
    const verificationRef = doc(db, 'verification_codes', email);
    const verificationDoc = await getDoc(verificationRef);
    
    if (!verificationDoc.exists()) {
      return NextResponse.json(
        { error: 'No verification code found for this email' },
        { status: 404 }
      );
    }

    const storedData = verificationDoc.data();
    
    if (!storedData) {
      return NextResponse.json(
        { error: 'No verification code found for this email' },
        { status: 400 }
      );
    }

    // Check if code has expired
    if (Date.now() > storedData.expiry) {
      await deleteDoc(verificationRef);
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new code.' },
        { status: 400 }
      );
    }

    // Validate code
    if (storedData.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code. Please check and try again.' },
        { status: 400 }
      );
    }

    // Code is valid - remove it from Firestore
    await deleteDoc(verificationRef);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Verify API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to store verification codes in Firestore (used by send-verification endpoint)
export async function storeVerificationCode(email: string, code: string, expiryMinutes: number = 10) {
  const expiry = Date.now() + (expiryMinutes * 60 * 1000);
  const verificationRef = doc(db, 'verification_codes', email);
  await setDoc(verificationRef, { code, expiry });
}
