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
    <div id="doomsday-mode-active-banner" className="w-full bg-[#06120D] border-y border-emerald-500/60 py-3.5 px-4 sm:px-6 shadow-[0_0_35px_rgba(16,185,129,0.35)] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl badge-3d-doom flex items-center justify-center text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.7)] flex-shrink-0">
            <Crown className="w-5 h-5 fill-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black tracking-widest text-emerald-300 uppercase drop-shadow-md">
                ⚡ DOOMSDAY PROTOKOLL AKTIV
              </span>
              <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded badge-3d-doom text-emerald-300 font-black uppercase">
                {activeCount} PFLICHT-TITEL
              </span>
              <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded badge-3d-metallic text-slate-300 font-bold">
                {totalHours} STUNDEN
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-normal leading-relaxed">
              Exklusive Vorbereitung auf Robert Downey Jr. als Victor von Doom, Ankerwesen & Multiversum-Inkursorionen.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            id="mark-all-visible-btn"
            onClick={onMarkAllVisibleWatched}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl badge-3d-metallic text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            title="Alle aktuell sichtbaren Titel als gesehen markieren"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Alle als gesehen</span>
          </button>
          <button
            id="deactivate-doomsday-mode-btn"
            onClick={onDeactivate}
            className="px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl badge-3d-doom text-emerald-300 hover:scale-105 transition-all flex items-center gap-1 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          >
            <X className="w-3.5 h-3.5" />
            <span>Beenden</span>
          </button>
        </div>
      </div>
    </div>
  );
};
