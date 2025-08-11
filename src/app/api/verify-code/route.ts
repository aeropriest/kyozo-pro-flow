import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { uid, code } = await request.json();

    if (!uid || !code) {
      return NextResponse.json(
        { error: 'UID and code are required' },
        { status: 400 }
      );
    }

    // Get verification code from Firestore
    const verificationDoc = await getDoc(doc(db, 'verificationCodes', uid));

    if (!verificationDoc.exists()) {
      return NextResponse.json(
        { error: 'Verification code not found' },
        { status: 404 }
      );
    }

    const verificationData = verificationDoc.data();
    const now = new Date();

    // Check if code has expired
    if (verificationData.expiresAt.toDate() < now) {
      // Clean up expired code
      await deleteDoc(doc(db, 'verificationCodes', uid));
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Check if code matches
    if (verificationData.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Check if already verified
    if (verificationData.verified) {
      return NextResponse.json(
        { error: 'Code has already been used' },
        { status: 400 }
      );
    }

    // Mark as verified
    await updateDoc(doc(db, 'verificationCodes', uid), {
      verified: true,
      verifiedAt: new Date()
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email verified successfully' 
    });

  } catch (error: any) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
