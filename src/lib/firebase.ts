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

const isGoogleOAuthConfigured = () => {
  return !!import.meta.env.VITE_GOOGLE_CLIENT_ID;
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
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const isFirebaseReady = isFirebaseConfigured;
export const isGoogleOAuthReady = isGoogleOAuthConfigured;

const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const loadGoogleScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google OAuth script'));
    document.body.appendChild(script);
  });
};

export const signInWithGoogle = async () => {
  if (isGoogleOAuthConfigured()) {
    try {
      await loadGoogleScript();
      return new Promise((resolve, reject) => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/callback`;

        const oauth2Client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'openid email profile',
          redirect_uri: redirectUri,
          callback: (response: { error?: { error: string; error_description?: string }; access_token?: string }) => {
            if (response.error) {
              if (response.error.error === 'popup_closed_by_user') {
                reject(new Error('Sign-in was cancelled'));
                return;
              }
              reject(new Error(response.error.error_description || 'Failed to sign in with Google'));
              return;
            }

            const accessToken = response.access_token;
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` }
            })
              .then((res) => res.json())
              .then((userInfo) => {
                resolve({
                  name: userInfo.name || 'User',
                  email: userInfo.email,
                  photoURL: userInfo.picture || ''
                });
              })
              .catch(() => reject(new Error('Failed to get user info')));
          }
        });

        oauth2Client.requestAccessToken({ prompt: 'select_account' });
      });
    } catch (error: any) {
      console.error('Google OAuth error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  }

  if (!isFirebaseConfigured()) {
    throw new Error('Google sign-in is not configured');
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