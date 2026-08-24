import React from 'react';
import { X, Crown, Code2, Calendar, Database, Sparkles, Layers } from 'lucide-react';
import { APP_CONFIG, DOOMSDAY_RELEASE_DISPLAY, DOOMSDAY_RELEASE_DATE } from '../data/config';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      id="about-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#080D14] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto ring-1 ring-emerald-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/90 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">{APP_CONFIG.appName}</h3>
              <p className="text-xs text-slate-400">{APP_CONFIG.subtitle} · v{APP_CONFIG.version}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          <p>
            <strong className="text-white font-bold">Avengers: Doomsday Ultimate Watchlist</strong> is a collector-grade, dark-themed entertainment companion and preparation system for the climax of Marvel Studios’ Multiverse Saga.
          </p>

          <div className="bg-[#0C121D] p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-400">
              <Code2 className="w-4 h-4" />
              Developer & Customization Guide
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <span>
                  <strong>Change Release Date:</strong> Open <code className="bg-slate-950 px-1.5 py-0.5 rounded text-emerald-300 border border-slate-800">src/data/config.ts</code> and edit <code className="bg-slate-950 px-1.5 py-0.5 rounded text-emerald-300 border border-slate-800">DOOMSDAY_RELEASE_DATE</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span>
                  <strong>Edit / Add Movie Lore:</strong> Open <code className="bg-slate-950 px-1.5 py-0.5 rounded text-emerald-300 border border-slate-800">src/data/movies.ts</code> where all titles, priorities, and runtimes are centralized.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span>
                  <strong>Data Persistence:</strong> Progress is instantly synchronized with browser <code className="bg-slate-950 px-1.5 py-0.5 rounded text-emerald-300 border border-slate-800">localStorage</code> and can be exported as JSON in the Progress tab.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
            <span className="font-bold text-slate-300 block mb-1">Disclaimer & Credits:</span>
            Unofficial fan project designed for cinematic preparation. Not affiliated with, endorsed by, or sponsored by Marvel Studios, The Walt Disney Company, or Sony Pictures Entertainment.
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black transition-colors cursor-pointer shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
