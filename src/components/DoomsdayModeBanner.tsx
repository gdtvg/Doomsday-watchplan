import React from 'react';
import { Crown, CheckCheck, X, Sparkles } from 'lucide-react';
import { MarvelTitle } from '../types';

interface DoomsdayModeBannerProps {
  activeCount: number;
  totalHours: number;
  onDeactivate: () => void;
  onMarkAllVisibleWatched: () => void;
}

export const DoomsdayModeBanner: React.FC<DoomsdayModeBannerProps> = ({
  activeCount,
  totalHours,
  onDeactivate,
  onMarkAllVisibleWatched
}) => {
  return (
    <div id="doomsday-mode-active-banner" className="w-full bg-gradient-to-r from-emerald-950 via-[#0A1A12] to-[#050C08] border-y border-emerald-500/50 py-3.5 px-4 sm:px-6 shadow-[0_0_25px_rgba(16,185,129,0.3)] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(16,185,129,0.7)] animate-pulse flex-shrink-0">
            <Crown className="w-5 h-5 fill-black" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                ⚡ DOOMSDAY PROTOCOL ACTIVE
              </span>
              <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-600/50">
                {activeCount} ESSENTIAL TITLES
              </span>
              <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-bold border border-slate-700">
                {totalHours} HOURS
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-normal">
              Showing strictly essential titles for Robert Downey Jr. as Victor von Doom, Anchor Beings & Incursion collapses.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            id="mark-all-visible-btn"
            onClick={onMarkAllVisibleWatched}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Mark all current visible titles as watched"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            Mark Visible Watched
          </button>
          <button
            id="deactivate-doomsday-mode-btn"
            onClick={onDeactivate}
            className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-all flex items-center gap-1 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          >
            <X className="w-3.5 h-3.5" />
            Exit Mode
          </button>
        </div>
      </div>
    </div>
  );
};
