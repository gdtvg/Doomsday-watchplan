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
  LayoutGrid
} from 'lucide-react';
import { useDevice } from '../hooks/useDevice';
import { isSoundEnabled, setSoundEnabled, playClickSound, playDoomsdayAlarmSound } from '../utils/soundEffects';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  doomsdayMode: boolean;
  onToggleDoomsdayMode: () => void;
  completionPercentage: number;
  onOpenAbout: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  doomsdayMode,
  onToggleDoomsdayMode,
  completionPercentage,
  onOpenAbout,
  onOpenSearch,
}) => {
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
          ? 'bg-[#05080C]/95 backdrop-blur-xl border-b border-slate-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.85)]' 
          : 'bg-gradient-to-b from-[#05080C]/95 via-[#05080C]/80 to-transparent border-b border-slate-800/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Marvel Studios / Doctor Doom Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-emerald-600 via-emerald-950 to-black border border-emerald-500/80 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs sm:text-sm font-black tracking-[0.18em] text-white uppercase font-sans">
                MARVEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">DOOMSDAY</span>
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-extrabold tracking-widest text-slate-400 uppercase block mt-0.5">
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
        <div className="md:hidden bg-[#070C14] border-b border-slate-800 px-4 py-3 space-y-1.5 animate-in slide-in-from-top-2">
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
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#05080C]/95 backdrop-blur-xl border-t border-slate-800/90 pt-1 pb-[max(env(safe-area-inset-bottom),0.5rem)] px-3 flex items-center justify-around shadow-[0_-8px_25px_rgba(0,0,0,0.95)]">
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
      </nav>
    </header>
  );
};
