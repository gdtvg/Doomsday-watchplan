import React from 'react';
import { UNIVERSES_DATA } from '../data/movies';
import { UniverseType } from '../types';
import { Layers, Crown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface UniversesViewProps {
  onSelectUniverseFilter: (u: UniverseType) => void;
}

export const UniversesView: React.FC<UniversesViewProps> = ({ onSelectUniverseFilter }) => {
  return (
    <section id="universes-explore-section" className="w-full bg-[#040714] py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight">
              Multiverse Continuities & Dimensions
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl font-normal">
            Avengers: Doomsday will bring colliding realities across 25+ years of cinema. Explore how each universe intertwines in the upcoming multiversal war.
          </p>
        </div>

        {/* Universe Lore Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {UNIVERSES_DATA.map((u) => (
            <div
              key={u.id}
              className="bg-[#1A1D29] border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-slate-500/60 transition-all group shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded border"
                    style={{ borderColor: u.accentColor, color: u.accentColor, backgroundColor: `${u.accentColor}15` }}
                  >
                    {u.displayName}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {u.totalTitles} Titles
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors uppercase">
                  {u.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {u.description}
                </p>

                {/* Doomsday Lore Box */}
                <div className="bg-[#070B12] p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-black uppercase text-emerald-400 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-emerald-400" />
                    Doomsday Incursion Fate:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {u.doomsdayLore}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectUniverseFilter(u.id as UniverseType)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 group-hover:text-emerald-300 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Filter Titles by {u.displayName}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
