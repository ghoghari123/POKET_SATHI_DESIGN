import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, Auth } from 'firebase/auth';

const getFirebaseConfig = () => {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };
};

const isFirebaseConfigured = () => {
  const config = getFirebaseConfig();
  return config.apiKey && config.authDomain && config.projectId;
};

let app: ReturnType<typeof initializeApp> | null = null;
let auth: Auth | null = null;

const getFirebaseApp = () => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please add your Firebase config to .env file.');
  }
  
  if (!app) {
    app = initializeApp(getFirebaseConfig());
  }
  return app;
};

const getFirebaseAuth = () => {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
};

const googleProvider = new GoogleAuthProvider();

export const isFirebaseReady = isFirebaseConfigured;

export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase not configured');
  }
  
  try {
    const auth = getFirebaseAuth();
    const result = await signInWithPopup(auth, googleProvider);
    return {
      name: result.user.displayName || 'User',
      email: result.user.email || '',
      photoURL: result.user.photoURL || ''
    };
  } catch (error: any) {
    if (error.message === 'Firebase not configured') {
      throw error;
    }
    console.error('Google sign-in error:', error);
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in was cancelled');
    }
    throw new Error('Failed to sign in with Google');
  }
};