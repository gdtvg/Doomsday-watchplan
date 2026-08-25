import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Cloud, 
  CheckCircle2, 
  CloudOff, 
  Loader2, 
  LogOut, 
  LogIn, 
  ShieldCheck, 
  Database,
  Sparkles,
  KeyRound,
  ArrowLeft,
  AlertCircle,
  Edit2,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CloudSyncStatus } from '../hooks/useWatchlist';
import { playClickSound } from '../utils/soundEffects';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncStatus: CloudSyncStatus;
  watchedCount: number;
  totalCount: number;
}

type AuthMode = 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD';

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  syncStatus,
  watchedCount,
  totalCount,
}) => {
  const { 
    user, 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    sendPasswordReset, 
    updateUserProfile,
    logout, 
    loading, 
    error, 
    clearError 
  } = useAuth();

  const [authMode, setAuthMode] = useState<AuthMode>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit profile state
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');

  if (!isOpen) return null;

  const handleSwitchMode = (mode: AuthMode) => {
    playClickSound();
    setAuthMode(mode);
    setLocalError(null);
    setLocalSuccess(null);
    clearError();
  };

  const handleGoogleSignIn = async () => {
    playClickSound();
    setIsSubmitting(true);
    setLocalError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setLocalError(null);
    setLocalSuccess(null);
    clearError();

    if (authMode === 'FORGOT_PASSWORD') {
      if (!email.trim()) {
        setLocalError('Bitte gib deine E-Mail-Adresse ein.');
        return;
      }
      setIsSubmitting(true);
      try {
        await sendPasswordReset(email);
        setLocalSuccess('Passwort-Reset-Link wurde per E-Mail gesendet.');
      } catch (err: any) {
        // Handled in context
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (authMode === 'REGISTER') {
      if (!email.trim()) {
        setLocalError('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
      }
      if (!password || password.length < 6) {
        setLocalError('Das Passwort muss mindestens 6 Zeichen lang sein.');
        return;
      }
      if (password !== passwordConfirm) {
        setLocalError('Die Passwörter stimmen nicht überein.');
        return;
      }
      setIsSubmitting(true);
      try {
        await signUpWithEmail(email, password, displayName);
        setLocalSuccess('Konto erfolgreich erstellt!');
      } catch (err: any) {
        // Handled in context
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (authMode === 'LOGIN') {
      if (!email.trim() || !password) {
        setLocalError('Bitte gib E-Mail und Passwort ein.');
        return;
      }
      setIsSubmitting(true);
      try {
        await signInWithEmail(email, password);
      } catch (err: any) {
        // Handled in context
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSaveDisplayName = async () => {
    if (!newDisplayName.trim()) return;
    setIsSubmitting(true);
    try {
      await updateUserProfile(newDisplayName);
      setIsEditingName(false);
      setLocalSuccess('Name erfolgreich aktualisiert.');
    } catch (e) {
      // Handled
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeError = localError || error;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="user-profile-modal"
        className="relative w-full max-w-md bg-[#0A0F18] border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden"
      >
        {/* Glowing Background Accents */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="close-profile-modal"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-all cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-black text-white tracking-wide uppercase font-sans flex items-center gap-2">
              {user ? 'Multiversum Profil' : 'Marvel Doomsday Account'}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {user ? 'Cloud-Synchronisierung & Watchlist-Status' : 'Registrieren oder Anmelden für Cloud-Speicher'}
            </p>
          </div>
        </div>

        {/* LOGGED IN VIEW */}
        {user ? (
          <div className="space-y-5">
            {/* User Info Card */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-4">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'Avatar'} 
                  className="w-12 h-12 rounded-full border-2 border-emerald-500 shadow-md object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center text-black font-black text-lg shadow-inner">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'M'}
                </div>
              )}

              <div className="flex-1 min-w-0">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <input
                      type="text"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                      placeholder="Dein Helden-Name"
                      className="px-2 py-1 text-xs rounded bg-slate-950 border border-emerald-500/60 text-white focus:outline-none w-full"
                    />
                    <button
                      onClick={handleSaveDisplayName}
                      disabled={isSubmitting}
                      className="p-1 rounded bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <h3 className="text-sm font-bold text-white truncate">
                        {user.displayName || 'Marvel Fan'}
                      </h3>
                      <button
                        onClick={() => {
                          setNewDisplayName(user.displayName || '');
                          setIsEditingName(true);
                        }}
                        className="text-slate-500 hover:text-emerald-400 transition-colors p-0.5"
                        title="Name bearbeiten"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1 border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" /> Aktiv
                    </span>
                  </div>
                )}
                
                <p className="text-xs text-slate-400 truncate mt-0.5 font-mono">
                  {user.email || 'Keine E-Mail'}
                </p>
              </div>
            </div>

            {/* Cloud Status Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Cloud className="w-4 h-4 text-emerald-400" /> Firestore Cloud Status:
                </span>
                <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                  {syncStatus === 'syncing' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      Synchronisiere...
                    </>
                  ) : syncStatus === 'synced' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Live synchronisiert
                    </>
                  ) : (
                    <>
                      <CloudOff className="w-3.5 h-3.5 text-amber-400" />
                      Offline / Lokal
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-medium">Gesehene Titel in der Cloud:</span>
                <span className="font-mono font-bold text-white">
                  {watchedCount} / {totalCount}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              id="logout-btn"
              onClick={async () => {
                playClickSound();
                setIsSubmitting(true);
                await logout();
                setIsSubmitting(false);
              }}
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-600/50 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              Abmelden
            </button>
          </div>
        ) : (
          /* AUTHENTICATION VIEW (LOGIN / REGISTER / FORGOT) */
          <div className="space-y-4">
            {/* Mode Switch Tabs (Login vs Register) */}
            {authMode !== 'FORGOT_PASSWORD' && (
              <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  type="button"
                  id="tab-login"
                  onClick={() => handleSwitchMode('LOGIN')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMode === 'LOGIN'
                      ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Anmelden
                </button>
                <button
                  type="button"
                  id="tab-register"
                  onClick={() => handleSwitchMode('REGISTER')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMode === 'REGISTER'
                      ? 'bg-emerald-950/80 text-emerald-300 shadow-md border border-emerald-500/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Registrieren
                </button>
              </div>
            )}

            {/* Forgot Password Header */}
            {authMode === 'FORGOT_PASSWORD' && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSwitchMode('LOGIN')}
                  className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Passwort zurücksetzen
                </span>
              </div>
            )}

            {/* Error Banner */}
            {activeError && (
              <div className="p-3 rounded-lg bg-red-950/70 border border-red-800/80 text-red-300 text-xs font-medium flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{activeError}</span>
              </div>
            )}

            {/* Success Banner */}
            {localSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 text-xs font-medium flex items-start gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{localSuccess}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Display Name (Only in Register mode) */}
              {authMode === 'REGISTER' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3 h-3 text-emerald-400" /> Benutzername / Alias
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="z. B. Victor von Doom, Peter Parker"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500/80 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <Mail className="w-3 h-3 text-emerald-400" /> E-Mail-Adresse
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="held@marvel-doomsday.de"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500/80 transition-colors"
                  />
                </div>
              </div>

              {/* Password Field (Login & Register) */}
              {authMode !== 'FORGOT_PASSWORD' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400" /> Passwort
                    </label>
                    {authMode === 'LOGIN' && (
                      <button
                        type="button"
                        onClick={() => handleSwitchMode('FORGOT_PASSWORD')}
                        className="text-[10px] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        Passwort vergessen?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={authMode === 'REGISTER' ? 'Mindestens 6 Zeichen' : 'Dein Passwort'}
                      className="w-full px-3 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500/80 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Password Confirm Field (Register only) */}
              {authMode === 'REGISTER' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <KeyRound className="w-3 h-3 text-emerald-400" /> Passwort bestätigen
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      placeholder="Passwort wiederholen"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500/80 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                id="auth-submit-btn"
                disabled={isSubmitting || loading}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                ) : authMode === 'LOGIN' ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    Anmelden
                  </>
                ) : authMode === 'REGISTER' ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Konto erstellen
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Reset-Link anfordern
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            {authMode !== 'FORGOT_PASSWORD' && (
              <>
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                    <span className="bg-[#0A0F18] px-2 text-slate-500">oder mit Google</span>
                  </div>
                </div>

                {/* Google Sign-In Button */}
                <button
                  type="button"
                  id="google-signin-btn"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting || loading}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-slate-700 hover:border-slate-600 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Mit Google fortfahren</span>
                </button>
              </>
            )}

            {/* Bottom info */}
            <p className="text-[10px] text-slate-500 text-center pt-2">
              Deine Watchlist-Daten werden automatisch in der sicheren Firebase-Cloud synchronisiert.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
