import React, { useState } from 'react';
import { 
  Crown, 
  Flame, 
  Sparkles, 
  Film, 
  Check, 
  Play, 
  Star, 
  Heart, 
  Layers, 
  Filter,
  CheckCircle2,
  Info
} from 'lucide-react';
import { MarvelTitle, UserTitleData } from '../types';
import { MARVEL_TITLES } from '../data/movies';
import { getMoviePoster } from '../utils/imageHelper';
import { playClickSound, playWatchedChime } from '../utils/soundEffects';

interface DoomsdayTierListViewProps {
  userData: Record<string, UserTitleData>;
  onToggleWatched: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onSetRating: (id: string, rating: number) => void;
  onSelectMovie: (movie: MarvelTitle) => void;
  onOpenTrailer: (movie: MarvelTitle) => void;
}

interface TierDefinition {
  tier: 'S' | 'A' | 'B' | 'C';
  label: string;
  badge: string;
  badgeBg: string;
  description: string;
  borderColor: string;
  headerBg: string;
  filterFn: (title: MarvelTitle) => boolean;
}

const TIERS: TierDefinition[] = [
  {
    tier: 'S',
    label: 'S-TIER: DOOMSDAY ESSENTIAL (MANDATORY)',
    badge: 'MUST WATCH',
    badgeBg: 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.7)]',
    description: 'Directly triggers the Multiverse collapse, Doctor Doom’s rise, Loki’s Yggdrasil tree, the Void, and Battleworld formation.',
    borderColor: 'border-emerald-500/80',
    headerBg: 'bg-emerald-950/80',
    filterFn: (t) => t.priority === 'ESSENTIAL'
  },
  {
    tier: 'A',
    label: 'A-TIER: MAJOR MULTIVERSE LORE (HIGH PRIORITY)',
    badge: 'KEY LORE',
    badgeBg: 'bg-sky-500 text-black shadow-[0_0_15px_rgba(14,165,233,0.6)]',
    description: 'Establishes Incursions, Anchor Beings, Kang/Doom variants, Earth-838 Illuminati, and the Fox X-Men multiverse integration.',
    borderColor: 'border-sky-500/70',
    headerBg: 'bg-sky-950/80',
    filterFn: (t) => t.priority === 'HIGHLY_RELEVANT'
  },
  {
    tier: 'B',
    label: 'B-TIER: CORE CHARACTER ROOTS & FOUNDATIONS',
    badge: 'RECOMMENDED',
    badgeBg: 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]',
    description: 'Essential character arcs for Tony Stark / Doctor Doom parallels, Scarlet Witch powers, the Infinity Saga climax, and Reed Richards.',
    borderColor: 'border-purple-500/60',
    headerBg: 'bg-purple-950/80',
    filterFn: (t) => t.priority === 'RELEVANT'
  },
  {
    tier: 'C',
    label: 'C-TIER: LEGACY NOSTALGIA & MULTIVERSE ARCHIVE',
    badge: 'EXPANDED',
    badgeBg: 'bg-slate-700 text-slate-200',
    description: 'Classic 2000s Fox X-Men, Sam Raimi Spider-Man, and early Fantastic Four lore for complete variant recognition in Battleworld.',
    borderColor: 'border-slate-700',
    headerBg: 'bg-slate-900',
    filterFn: (t) => t.priority === 'OPTIONAL' || t.priority === 'LEGACY'
  }
];

export const DoomsdayTierListView: React.FC<DoomsdayTierListViewProps> = ({
  userData,
  onToggleWatched,
  onToggleFavorite,
  onSetRating,
  onSelectMovie,
  onOpenTrailer,
}) => {
  const [selectedTierFilter, setSelectedTierFilter] = useState<'ALL' | 'S' | 'A' | 'B' | 'C'>('ALL');
  const [hideWatched, setHideWatched] = useState(false);

  return (
    <div id="doomsday-tier-list-view" className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
              TACTICAL BINGE PRIORITIZATION
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight">
            DOOMSDAY PREP TIER LIST
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-normal">
            Prioritize your streaming marathon by narrative importance. Clear S-Tier first to understand 100% of Avengers: Doomsday.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            {(['ALL', 'S', 'A', 'B', 'C'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => {
                  playClickSound();
                  setSelectedTierFilter(tier);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedTierFilter === tier
                    ? 'bg-emerald-500 text-black font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tier === 'ALL' ? 'ALL TIERS' : `${tier}-TIER`}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              playClickSound();
              setHideWatched(!hideWatched);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              hideWatched
                ? 'bg-amber-950 text-amber-300 border-amber-600'
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            {hideWatched ? '✓ Hiding Watched' : 'Hide Watched'}
          </button>
        </div>
      </div>

      {/* Tier Sections */}
      <div className="space-y-6 sm:space-y-8">
        {TIERS.filter(t => selectedTierFilter === 'ALL' || selectedTierFilter === t.tier).map((tierDef) => {
          let titlesInTier = MARVEL_TITLES.filter(tierDef.filterFn);
          if (hideWatched) {
            titlesInTier = titlesInTier.filter(t => !userData[t.id]?.watched);
          }
          const totalInTier = MARVEL_TITLES.filter(tierDef.filterFn).length;
          const watchedInTier = MARVEL_TITLES.filter(tierDef.filterFn).filter(t => userData[t.id]?.watched).length;
          const pct = totalInTier > 0 ? Math.round((watchedInTier / totalInTier) * 100) : 0;

          return (
            <div
              key={tierDef.tier}
              className={`rounded-2xl border ${tierDef.borderColor} bg-[#070B14] overflow-hidden shadow-xl`}
            >
              {/* Tier Header Bar */}
              <div className={`p-4 sm:p-5 ${tierDef.headerBg} border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-8 h-8 rounded-lg bg-black/80 text-white font-black text-base flex items-center justify-center border border-white/20">
                      {tierDef.tier}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                      {tierDef.label}
                    </h3>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${tierDef.badgeBg}`}>
                      {tierDef.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-normal max-w-3xl">
                    {tierDef.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-xs font-black text-white block">
                      {watchedInTier} / {totalInTier} Done
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      {pct}% Completed
                    </span>
                  </div>
                  <div className="w-16 h-2 bg-black/60 rounded-full overflow-hidden border border-slate-700">
                    <div className="h-full bg-emerald-400" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>

              {/* Tier Cards Grid */}
              <div className="p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {titlesInTier.length === 0 ? (
                  <div className="col-span-full py-8 text-center text-slate-500 text-xs">
                    All titles in this tier have been watched!
                  </div>
                ) : (
                  titlesInTier.map((movie) => {
                    const isWatched = !!userData[movie.id]?.watched;
                    const isFav = !!userData[movie.id]?.isFavorite;

                    return (
                      <div
                        key={movie.id}
                        className={`group relative flex flex-col rounded-xl overflow-hidden bg-[#090E18] border transition-all duration-200 ${
                          isWatched 
                            ? 'border-emerald-700/80 ring-1 ring-emerald-500/30' 
                            : 'border-slate-800 hover:border-emerald-500 hover:-translate-y-1'
                        }`}
                      >
                        {/* Poster Aspect Ratio */}
                        <div
                          className="relative aspect-[2/3] w-full bg-slate-950 cursor-pointer overflow-hidden"
                          onClick={() => {
                            playClickSound();
                            onSelectMovie(movie);
                          }}
                        >
                          <img
                            src={getMoviePoster(movie.posterUrl, movie.universe)}
                            alt={movie.title}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                              isWatched ? 'opacity-40 grayscale-[20%]' : 'opacity-95'
                            }`}
                          />

                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090E18] via-transparent to-black/60 pointer-events-none" />

                          {/* Watched Badge */}
                          {isWatched && (
                            <div className="absolute top-2 right-2 bg-emerald-950/95 border border-emerald-400 text-emerald-300 font-black text-[9px] px-2 py-0.5 rounded shadow-lg">
                              ✓ WATCHED
                            </div>
                          )}

                          {/* Universe Badge */}
                          <div className="absolute top-2 left-2 bg-black/80 text-[8px] font-black uppercase text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                            {movie.universe}
                          </div>

                          {/* Hover Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playClickSound();
                                onOpenTrailer(movie);
                              }}
                              className="p-2.5 rounded-full bg-white text-black hover:scale-110 shadow-lg cursor-pointer"
                              title="Play Trailer"
                            >
                              <Play className="w-4 h-4 fill-black ml-0.5" />
                            </button>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-2.5 flex-1 flex flex-col justify-between space-y-2">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400">
                              {movie.year} • {movie.phase}
                            </span>
                            <h4 
                              onClick={() => {
                                playClickSound();
                                onSelectMovie(movie);
                              }}
                              className="text-xs font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 cursor-pointer"
                            >
                              {movie.title}
                            </h4>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-800/80">
                            <button
                              onClick={() => {
                                playClickSound();
                                onToggleFavorite(movie.id);
                              }}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 cursor-pointer"
                              title="Favorite"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                            </button>

                            <button
                              onClick={() => {
                                if (!isWatched) playWatchedChime();
                                else playClickSound();
                                onToggleWatched(movie.id);
                              }}
                              className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                                isWatched
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-400'
                                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[2.5]" />
                              {isWatched ? 'Done' : 'Watch'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
