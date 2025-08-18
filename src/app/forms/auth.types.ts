export interface SignInData {
    email: string;
    password: string;
  }
  
  export interface SignUpData {
    fullName: string;
    email: string;
    password: string;
    terms: boolean;
  }
  
  export type AuthMode = 'signin' | 'signup';
  