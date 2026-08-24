import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Crown, 
  Flame, 
  Layers, 
  Radio, 
  Check, 
  Play, 
  ExternalLink,
  ChevronRight,
  Info,
  AlertTriangle,
  Zap,
  Globe
} from 'lucide-react';
import { MarvelTitle, UserTitleData } from '../types';
import { MARVEL_TITLES } from '../data/movies';
import { playClickSound, playWatchedChime } from '../utils/soundEffects';

interface MultiverseIncursionRadarProps {
  userData: Record<string, UserTitleData>;
  onToggleWatched: (id: string) => void;
  onSelectMovie: (movie: MarvelTitle) => void;
  onOpenTrailer: (movie: MarvelTitle) => void;
}

interface IncursionDimension {
  id: string;
  name: string;
  designation: string;
  threatLevel: 'CATASTROPHIC' | 'CRITICAL' | 'HIGH' | 'MODERATE';
  status: string;
  anchorBeing: string;
  keyThreat: string;
  doomRole: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
  keyTitleIds: string[];
}

const INCURSION_DIMENSIONS: IncursionDimension[] = [
  {
    id: 'earth-616',
    name: 'Sacred Timeline / Main MCU',
    designation: 'Earth-616 (Main MCU)',
    threatLevel: 'CATASTROPHIC',
    status: 'Direct Incursion Collision Imminent',
    anchorBeing: 'Stephen Strange / Reed Richards (Targeted)',
    keyThreat: 'Fracturing Multiversal barrier and multiversal incursions triggered in Doctor Strange 2 and No Way Home.',
    doomRole: 'Doctor Doom seeks to conquer and merge Earth-616 into the central core of Battleworld to prevent total annihilation.',
    colorScheme: {
      bg: 'bg-rose-950/40',
      border: 'border-rose-600/80',
      text: 'text-rose-400',
      glow: 'shadow-[0_0_25px_rgba(225,29,72,0.3)]'
    },
    keyTitleIds: ['avengers-doomsday', 'doctor-strange-2', 'spider-man-no-way-home', 'avengers-endgame', 'avengers-infinity-war']
  },
  {
    id: 'earth-10005',
    name: 'Fox X-Men Saga',
    designation: 'Earth-10005 (Fox Marvel)',
    threatLevel: 'CRITICAL',
    status: 'Anchor Being Destabilized — Saved by Logan Variant',
    anchorBeing: 'Logan / Wolverine (Earth-10005)',
    keyThreat: 'Decayed after the death of original Logan; now entangled with Earth-616 through the Void and TVA.',
    doomRole: 'X-Men mutants and Wolverine variants will be pulled into Battleworld’s warzones against Doom’s Latverian sentinels.',
    colorScheme: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-600/80',
      text: 'text-amber-400',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.3)]'
    },
    keyTitleIds: ['deadpool-and-wolverine', 'logan', 'xmen-days-of-future-past', 'xmen-first-class', 'xmen-2']
  },
  {
    id: 'yggdrasil-void',
    name: 'The Void & Multiversal Yggdrasil',
    designation: 'End of Time & Citadel',
    threatLevel: 'CATASTROPHIC',
    status: 'Sustained by God Loki at the Center of All Timelines',
    anchorBeing: 'Loki (God of Stories)',
    keyThreat: 'Loki physically holds infinite branching timelines in glowing emerald strands. If Doom severs this tree, the Multiverse dies.',
    doomRole: 'Victor von Doom’s supreme master plan requires usurping Loki’s divine temporal throne to rule Battleworld as God Emperor Doom.',
    colorScheme: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500/90',
      text: 'text-emerald-300',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.4)]'
    },
    keyTitleIds: ['loki-s2', 'loki-s1', 'deadpool-and-wolverine', 'what-if-s1']
  },
  {
    id: 'retro-1960s',
    name: '1960s Retro-Futuristic Earth',
    designation: 'Earth-FF (Fantastic Four Universe)',
    threatLevel: 'HIGH',
    status: 'Cosmic Threat: Galactus & Silver Surfer Arrival',
    anchorBeing: 'Reed Richards (Mister Fantastic)',
    keyThreat: 'Galactus devours their home reality, forcing the First Family to flee through multiversal rifts into Earth-616.',
    doomRole: 'Doctor Doom’s eternal intellectual rivalry with Reed Richards begins when their respective universes collide.',
    colorScheme: {
      bg: 'bg-sky-950/40',
      border: 'border-sky-500/80',
      text: 'text-sky-300',
      glow: 'shadow-[0_0_25px_rgba(14,165,233,0.3)]'
    },
    keyTitleIds: ['fantastic-four-first-steps', 'fantastic-four-2005', 'doctor-strange-2']
  },
  {
    id: 'earth-838',
    name: 'Illuminati High-Tech Universe',
    designation: 'Earth-838',
    threatLevel: 'HIGH',
    status: 'Illuminati Council Decimated by Scarlet Witch',
    anchorBeing: 'Superior Iron Man / Reed Richards 838',
    keyThreat: 'First discovered Incursion science and multiversal memory orbs; seeks revenge against Earth-616.',
    doomRole: 'Advanced Ultron sentry drone technology and Illuminati multiversal maps will be appropriated by Doom.',
    colorScheme: {
      bg: 'bg-purple-950/40',
      border: 'border-purple-600/80',
      text: 'text-purple-300',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.3)]'
    },
    keyTitleIds: ['doctor-strange-2', 'what-if-s2']
  }
];

export const MultiverseIncursionRadar: React.FC<MultiverseIncursionRadarProps> = ({
  userData,
  onToggleWatched,
  onSelectMovie,
  onOpenTrailer,
}) => {
  const [selectedDimension, setSelectedDimension] = useState<IncursionDimension>(INCURSION_DIMENSIONS[0]);

  const dimensionTitles = MARVEL_TITLES.filter(t => selectedDimension.keyTitleIds.includes(t.id));
  const watchedCount = dimensionTitles.filter(t => userData[t.id]?.watched).length;
  const progressPercent = dimensionTitles.length > 0 ? Math.round((watchedCount / dimensionTitles.length) * 100) : 0;

  return (
    <div id="incursion-threat-radar" className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
              TVA EARLY WARNING RADAR
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight">
            MULTIVERSE INCURSION THREAT MAP
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-normal">
            Track colliding realities, targeted Anchor Beings, and the multiversal fragments that Victor von Doom will forge into Battleworld.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Crown className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-black uppercase text-emerald-300">
            ROAD TO DOOMSDAY 2026
          </span>
        </div>
      </div>

      {/* Grid: Dimension Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {INCURSION_DIMENSIONS.map((dim) => {
          const isSelected = selectedDimension.id === dim.id;
          const dimTitles = MARVEL_TITLES.filter(t => dim.keyTitleIds.includes(t.id));
          const dimWatched = dimTitles.filter(t => userData[t.id]?.watched).length;

          return (
            <button
              key={dim.id}
              onClick={() => {
                playClickSound();
                setSelectedDimension(dim);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                isSelected 
                  ? `${dim.colorScheme.bg} ${dim.colorScheme.border} ${dim.colorScheme.glow} ring-1 ring-emerald-400/50 scale-[1.02]` 
                  : 'bg-[#090E18] border-slate-800 hover:border-slate-700 hover:bg-[#0C1322]'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded bg-black/60 border border-slate-700 ${dim.colorScheme.text}`}>
                  {dim.designation.split(' ')[0]}
                </span>
                <span className="text-[9px] font-extrabold text-slate-400">
                  {dimWatched}/{dimTitles.length}
                </span>
              </div>

              <h4 className="text-xs font-black text-white leading-tight line-clamp-1 mb-1">
                {dim.name}
              </h4>

              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <ShieldAlert className="w-3 h-3 text-rose-400 flex-shrink-0" />
                <span className="truncate font-medium">{dim.threatLevel}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${dimTitles.length ? (dimWatched / dimTitles.length) * 100 : 0}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dimension Intel Panel & Key Preparation Titles */}
      <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl border ${selectedDimension.colorScheme.border} ${selectedDimension.colorScheme.bg} backdrop-blur-md space-y-6 shadow-2xl`}>
        
        {/* Top Dimension Status Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-black uppercase px-3 py-1 rounded bg-black/70 border border-slate-700 ${selectedDimension.colorScheme.text}`}>
                {selectedDimension.designation}
              </span>
              <span className="text-xs font-black text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded border border-rose-700 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {selectedDimension.threatLevel} INVASION RISK
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-700">
                {progressPercent}% Marathon Complete
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
              {selectedDimension.name}
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              Status: <span className="text-slate-100 font-semibold">{selectedDimension.status}</span>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-xs space-y-1 max-w-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              ANCHOR BEING DETECTED:
            </span>
            <p className="text-xs font-black text-amber-300">
              {selectedDimension.anchorBeing}
            </p>
          </div>
        </div>

        {/* Tactical Intel Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              Incursion Crisis & Collision Threat
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {selectedDimension.keyThreat}
            </p>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-black uppercase text-emerald-400 flex items-center gap-1.5">
              <Crown className="w-4 h-4" />
              Doctor Doom’s Strategic Master Plan
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {selectedDimension.doomRole}
            </p>
          </div>
        </div>

        {/* Essential Titles to Prepare for this Dimension */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Required Watchlist for this Incursion Reality ({dimensionTitles.length} Titles)
            </h4>
            <span className="text-xs text-slate-400 font-bold">
              {watchedCount} of {dimensionTitles.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dimensionTitles.map((movie) => {
              const isWatched = !!userData[movie.id]?.watched;
              return (
                <div
                  key={movie.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/60 hover:bg-black/80 border border-slate-800 hover:border-emerald-500/70 transition-all cursor-pointer group"
                  onClick={() => {
                    playClickSound();
                    onSelectMovie(movie);
                  }}
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {movie.year}
                      </span>
                      {movie.priority === 'ESSENTIAL' && (
                        <span className="text-[9px] font-black text-emerald-400">
                          ESSENTIAL
                        </span>
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {movie.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 line-clamp-1">
                      {movie.whyItMatters}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        playClickSound();
                        onOpenTrailer(movie);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-white text-slate-300 hover:text-black transition-colors"
                      title="Trailer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (!isWatched) playWatchedChime();
                        else playClickSound();
                        onToggleWatched(movie.id);
                      }}
                      className={`p-1.5 rounded-lg transition-all ${
                        isWatched
                          ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                      }`}
                      title={isWatched ? 'Watched' : 'Mark Watched'}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
