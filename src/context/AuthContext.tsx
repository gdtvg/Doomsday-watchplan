import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName?: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getGermanErrorMessage(errorCode: string, defaultMsg: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Ungültige E-Mail-Adresse.';
    case 'auth/user-disabled':
      return 'Dieses Benutzerkonto wurde deaktiviert.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'E-Mail oder Passwort ist falsch.';
    case 'auth/email-already-in-use':
      return 'Diese E-Mail-Adresse wird bereits für ein anderes Konto verwendet.';
    case 'auth/weak-password':
      return 'Das Passwort ist zu schwach (mindestens 6 Zeichen erforderlich).';
    case 'auth/too-many-requests':
      return 'Zu viele fehlgeschlagene Versuche. Bitte warte einen Moment und versuche es erneut.';
    case 'auth/network-request-failed':
      return 'Netzwerkfehler. Bitte überprüfe deine Internetverbindung.';
    case 'auth/popup-closed-by-user':
      return '';
    default:
      return defaultMsg || 'Ein Authentifizierungsfehler ist aufgetreten.';
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Ensure user profile document exists or is updated in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const userSnap = await getDoc(userDocRef);
          if (!userSnap.exists()) {
            await setDoc(userDocRef, {
              userId: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Marvel Fan',
              photoURL: currentUser.photoURL || '',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          } else {
            await setDoc(userDocRef, {
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Marvel Fan',
              photoURL: currentUser.photoURL || '',
              updatedAt: serverTimestamp(),
            }, { merge: true });
          }
        } catch (err) {
          console.warn('Failed to sync user profile doc', err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      const msg = getGermanErrorMessage(err?.code, err?.message);
      if (msg) setError(msg);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (err: any) {
      console.error('Email sign-in failed:', err);
      const msg = getGermanErrorMessage(err?.code, err?.message);
      setError(msg);
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, displayName?: string) => {
    setError(null);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      const finalName = displayName?.trim() || 'Marvel Fan';
      if (userCred.user) {
        await updateProfile(userCred.user, {
          displayName: finalName,
        });
        const userDocRef = doc(db, 'users', userCred.user.uid);
        await setDoc(userDocRef, {
          userId: userCred.user.uid,
          email: userCred.user.email || '',
          displayName: finalName,
          photoURL: userCred.user.photoURL || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (err: any) {
      console.error('Email sign-up failed:', err);
      const msg = getGermanErrorMessage(err?.code, err?.message);
      setError(msg);
      throw err;
    }
  };

  const sendPasswordReset = async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      console.error('Password reset failed:', err);
      const msg = getGermanErrorMessage(err?.code, err?.message);
      setError(msg);
      throw err;
    }
  };

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    setError(null);
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
        photoURL: photoURL || auth.currentUser.photoURL,
      });
      setUser({ ...auth.currentUser });
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, {
        displayName: displayName.trim(),
        photoURL: photoURL || auth.currentUser.photoURL || '',
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (err: any) {
      console.error('Update profile failed:', err);
      setError(err?.message || 'Profilaktualisierung fehlgeschlagen.');
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Sign-out failed:', err);
      setError(err.message || 'Abmeldung fehlgeschlagen');
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        updateUserProfile,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
