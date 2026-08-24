import React from 'react';
import { APP_CONFIG, DOOMSDAY_RELEASE_DISPLAY } from '../data/config';
import { Crown, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAbout }) => {
  return (
    <footer id="main-footer" className="w-full bg-[#030609] border-t border-slate-800/80 py-10 px-4 sm:px-6 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        {/* Brand & Tagline */}
        <div className="space-y-2 max-w-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-sm font-black tracking-widest text-emerald-400 uppercase">
              AVENGERS: DOOMSDAY
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-bold border border-slate-800">
              ULTIMATE WATCHLIST
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Unofficial fan companion and preparation dashboard for Marvel Studios’ Avengers: Doomsday (May 2026) and Avengers: Secret Wars (May 2027).
          </p>
          <p className="text-[11px] text-slate-500">
            Not affiliated with Marvel Studios, Disney or Marvel Entertainment.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap gap-4 sm:gap-6 text-xs font-bold text-slate-400">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('watchlist')} 
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Watchlist
          </button>
          <button 
            onClick={() => onNavigate('order')} 
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Watch Order
          </button>
          <button 
            onClick={() => onNavigate('planner')} 
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Viewing Planner
          </button>
          <button 
            onClick={() => onNavigate('universes')} 
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Universes
          </button>
          <button 
            onClick={() => onNavigate('progress')} 
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Progress & Stats
          </button>
          <button 
            onClick={() => onNavigate('news')} 
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            News & Intel
          </button>
          <button 
            onClick={onOpenAbout} 
            className="hover:text-emerald-300 transition-colors cursor-pointer text-slate-300"
          >
            About & Lore
          </button>
        </div>
      </div>
    </footer>
  );
};
