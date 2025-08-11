# Firebase Authentication & Email Setup

This project uses Firebase Authentication with custom email verification using Nodemailer + SendGrid (same setup as helpaproduct project).

## Required Environment Variables

Add these to your `.env.local` file:

### Firebase Configuration
```bash
# Get these from Firebase Console > Project Settings > General > Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### SendGrid Email Configuration (same as helpaproduct)
```bash
# SendGrid SMTP settings
SENDGRID_SMTP=smtp.sendgrid.net
SENDGRID_PORT=587
SENDGRID_USER=your_sendgrid_username
SENDGRID_PASSWORD=your_sendgrid_password
```

## Firebase Setup Steps

1. **Create/Configure Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project or use existing
   - Enable Authentication and Firestore

2. **Enable Sign-in Methods**:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google (configure OAuth consent screen)

3. **Deploy Firestore Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

4. **Test the Setup**:
   - Visit `/test-firebase` to check Firebase connection
   - Try signing up at `/welcome?step=2`

## How It Works

1. **Sign Up Flow**:
   - User signs up with email/password or Google
   - Firebase Auth creates the user account
   - System generates 6-digit verification code
   - Code is stored in Firestore with 15-minute expiration
   - Beautiful email is sent using Nodemailer + SendGrid

2. **Verification Flow**:
   - User enters 6-digit code
   - System verifies code against Firestore
   - On success, user proceeds to next step

## Email Template

The verification email includes:
- Beautiful HTML design matching your brand
- Large, easy-to-read 6-digit code
- 15-minute expiration notice
- Professional styling and layout

## Development vs Production

- **Development**: Emails are logged to console for testing
- **Production**: Emails are sent via SendGrid SMTP

## Files Structure

- `src/lib/firebase.ts` - Firebase configuration
- `src/lib/email.ts` - Email service (Nodemailer + SendGrid)
- `src/app/api/send-verification/route.ts` - API to send verification codes
- `src/app/api/verify-code/route.ts` - API to verify codes
- `src/app/welcome/SignupStep.tsx` - Updated signup component
- `src/app/test-firebase/page.tsx` - Test page for Firebase setup
