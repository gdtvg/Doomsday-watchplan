import React from 'react';
import { 
  Crown, 
  Search, 
  Film, 
  Route, 
  Clock, 
  Trophy, 
  Newspaper, 
  Info, 
  Layers, 
  Menu,
  X,
  User,
  Flame,
  Sparkles,
  Radio,
  Volume2,
  VolumeX,
  LayoutGrid,
  Cloud,
  CloudCheck,
  CloudOff,
  Loader2
} from 'lucide-react';
import { useDevice } from '../hooks/useDevice';
import { isSoundEnabled, setSoundEnabled, playClickSound, playDoomsdayAlarmSound } from '../utils/soundEffects';
import { useAuth } from '../context/AuthContext';
import { CloudSyncStatus } from '../hooks/useWatchlist';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  doomsdayMode: boolean;
  onToggleDoomsdayMode: () => void;
  completionPercentage: number;
  onOpenAbout: () => void;
  onOpenSearch: () => void;
  syncStatus: CloudSyncStatus;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  doomsdayMode,
  onToggleDoomsdayMode,
  completionPercentage,
  onOpenAbout,
  onOpenSearch,
  syncStatus,
  onOpenProfile,
}) => {
  const { user } = useAuth();
  const { isMobile } = useDevice();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME', icon: <Crown className="w-4 h-4" /> },
    { id: 'watchlist', label: 'WATCHLIST & FILME', icon: <Film className="w-4 h-4" /> },
    { id: 'order', label: 'TIMELINE', icon: <Route className="w-4 h-4" /> },
  ];

  const handleNavClick = (tabId: string) => {
    playClickSound();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) playClickSound();
  };

  return (
    <header 
      id="main-header" 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#040714]/95 backdrop-blur-xl border-b border-slate-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.85)]' 
          : 'bg-gradient-to-b from-[#040714]/95 via-[#040714]/80 to-transparent border-b border-slate-800/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Marvel Studios / Doctor Doom Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-slate-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 group-hover:border-slate-500 transition-all">
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs sm:text-sm font-black tracking-[0.1em] text-white uppercase font-sans">
                <span className="bg-[#E23636] text-white px-1.5 py-[1px] rounded-sm mr-1.5 inline-block text-[10px] sm:text-[11px]">MARVEL</span>
                <span className="text-white">DOOMSDAY</span>
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-slate-400 uppercase block mt-1">
              STREAMING & PREP HUB
            </span>
          </div>
        </div>

        {/* Center: Desktop Disney+ Style Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-2 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions, Search, Doomsday Protocol Switch, Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Global Search Button with Cmd+K hint */}
          <button
            id="navbar-search-btn"
            onClick={() => {
              playClickSound();
              onOpenSearch();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer shadow-sm hover:scale-105"
            title="Suche nach Filmen (Strg+K oder /)"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold hidden sm:inline">Suche</span>
            <kbd className="hidden md:inline-block px-1 py-0.5 bg-slate-800 text-[10px] font-mono text-slate-400 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Doomsday Mode Toggle */}
          <button
            id="navbar-doomsday-toggle"
            onClick={() => {
              onToggleDoomsdayMode();
            }}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer select-none ${
              doomsdayMode
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/60'
            }`}
            title="Doomsday Pflichtfilme filtern"
          >
            <Crown className={`w-3.5 h-3.5 ${doomsdayMode ? 'fill-black' : 'text-emerald-400'}`} />
            <span className="hidden sm:inline">{doomsdayMode ? 'DOOMSDAY PFLICHT' : 'DOOMSDAY'}</span>
            <span className="sm:hidden">DOOM</span>
          </button>

          {/* User Watchlist Progress Badge */}
          <button
            onClick={() => handleNavClick('watchlist')}
            className="flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 cursor-pointer transition-all hover:scale-105"
            title="Fortschritt deiner Watchlist"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center text-black font-black text-[9px] sm:text-[10px]">
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black stroke-[2.5]" />
            </div>
            <span className="text-xs font-black text-emerald-400">
              {completionPercentage}%
            </span>
          </button>

          {/* Firebase Cloud Profile & Sync Status */}
          <button
            id="navbar-profile-btn"
            onClick={() => {
              playClickSound();
              onOpenProfile();
            }}
            className="relative flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/90 cursor-pointer transition-all hover:scale-105 group"
            title={user ? `${user.displayName || 'Profil'} (Firebase Cloud aktiv)` : 'Firebase Cloud Sync aktivieren'}
          >
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="User" 
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-md object-cover border border-emerald-500/80" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-xs font-black ${
                user ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-300'
              }`}>
                {user ? (user.displayName?.charAt(0).toUpperCase() || 'U') : <Cloud className="w-3.5 h-3.5" />}
              </div>
            )}
            
            <span className="text-xs font-bold text-slate-200 hidden lg:inline max-w-[90px] truncate">
              {user ? (user.displayName?.split(' ')[0] || 'Konto') : 'Cloud Sync'}
            </span>

            {/* Live Sync Status Indicator Dot / Icon */}
            <span className="relative flex h-2 w-2">
              {syncStatus === 'syncing' ? (
                <Loader2 className="w-2 h-2 animate-spin text-emerald-400" />
              ) : syncStatus === 'synced' ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)]"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
              )}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070C14] border-b border-slate-800 px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
          {/* Quick Profile / Login Bar */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(false);
              onOpenProfile();
            }}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between text-xs font-bold text-slate-200 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-6 h-6 rounded-md object-cover border border-emerald-500" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-6 h-6 rounded-md bg-emerald-500 text-black flex items-center justify-center font-black text-xs">
                  {user ? (user.displayName?.charAt(0).toUpperCase() || 'U') : <User className="w-3.5 h-3.5" />}
                </div>
              )}
              <span>{user ? user.displayName || 'Mein Profil' : 'Anmelden / Registrieren'}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
              {user ? 'Online' : 'Login'}
            </span>
          </button>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full px-3.5 py-2 rounded-lg text-left text-xs font-black uppercase tracking-wider flex items-center justify-between cursor-pointer ${
                activeTab === item.id
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Mobile Bottom Fixed Streaming Dock Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#040714]/95 backdrop-blur-xl border-t border-slate-800/90 pt-1 pb-[max(env(safe-area-inset-bottom),0.5rem)] px-3 flex items-center justify-around shadow-[0_-8px_25px_rgba(0,0,0,0.95)]">
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] gap-0.5 text-[10px] font-black uppercase transition-all cursor-pointer ${
            activeTab === 'home' 
              ? 'text-emerald-400 scale-105' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-md ${activeTab === 'home' ? 'bg-emerald-950/80 border border-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : ''}`}>
            <Crown className="w-4 h-4" />
          </div>
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavClick('watchlist')}
          className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] gap-0.5 text-[10px] font-black uppercase transition-all cursor-pointer ${
            activeTab === 'watchlist' 
              ? 'text-emerald-400 scale-105' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-md ${activeTab === 'watchlist' ? 'bg-emerald-950/80 border border-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : ''}`}>
            <Film className="w-4 h-4" />
          </div>
          <span>Watchlist</span>
        </button>

        <button
          onClick={() => handleNavClick('order')}
          className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] gap-0.5 text-[10px] font-black uppercase transition-all cursor-pointer ${
            activeTab === 'order' 
              ? 'text-emerald-400 scale-105' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-md ${activeTab === 'order' ? 'bg-emerald-950/80 border border-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : ''}`}>
            <Route className="w-4 h-4" />
          </div>
          <span>Timeline</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            onOpenProfile();
          }}
          className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] gap-0.5 text-[10px] font-black uppercase transition-all cursor-pointer text-slate-400 hover:text-slate-200"
        >
          <div className="p-1 rounded-md bg-slate-900 border border-slate-800">
            <User className="w-4 h-4 text-emerald-400" />
          </div>
          <span>{user ? 'Konto' : 'Login'}</span>
        </button>
      </nav>
    </header>
  );
};
