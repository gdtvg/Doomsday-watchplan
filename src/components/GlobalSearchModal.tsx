import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Film, 
  Tv, 
  Play, 
  Check, 
  Star, 
  Crown, 
  Sparkles, 
  Clock, 
  Calendar,
  ExternalLink,
  Filter
} from 'lucide-react';
import { MarvelTitle, UserTitleData, UniverseType } from '../types';
import { MARVEL_TITLES } from '../data/movies';
import { getMoviePoster, getMovieBackdrop } from '../utils/imageHelper';
import { playClickSound, playWatchedChime } from '../utils/soundEffects';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: Record<string, UserTitleData>;
  onToggleWatched: (id: string) => void;
  onSelectMovie: (movie: MarvelTitle) => void;
  onOpenTrailer: (movie: MarvelTitle) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  userData,
  onToggleWatched,
  onSelectMovie,
  onOpenTrailer,
}) => {
  const [query, setQuery] = useState('');
  const [selectedUniverse, setSelectedUniverse] = useState<UniverseType | 'ALL'>('ALL');
  const [onlyUnwatched, setOnlyUnwatched] = useState(false);
  const [onlyDoomsday, setOnlyDoomsday] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filtered = MARVEL_TITLES.filter((title) => {
    // Search text match
    const matchesQuery = 
      !normalizedQuery ||
      title.title.toLowerCase().includes(normalizedQuery) ||
      title.whyItMatters.toLowerCase().includes(normalizedQuery) ||
      title.doomsdayConnection.toLowerCase().includes(normalizedQuery) ||
      title.keyCharacters.some(c => c.toLowerCase().includes(normalizedQuery)) ||
      title.tags.some(t => t.toLowerCase().includes(normalizedQuery)) ||
      title.year.toString().includes(normalizedQuery) ||
      title.phase.toLowerCase().includes(normalizedQuery);

    // Universe filter
    const matchesUniverse = selectedUniverse === 'ALL' || title.universe === selectedUniverse;

    // Unwatched filter
    const matchesUnwatched = !onlyUnwatched || !userData[title.id]?.watched;

    // Doomsday filter
    const matchesDoomsday = !onlyDoomsday || title.priority === 'ESSENTIAL';

    return matchesQuery && matchesUniverse && matchesUnwatched && matchesDoomsday;
  });

  return (
    <div 
      id="global-search-overlay"
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-[#090E18] border border-slate-700/80 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[85vh] ring-1 ring-emerald-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3 bg-[#060A12]">
          <Search className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search characters (e.g. Doctor Doom, Wolverine), movies, incursions, years..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white bg-slate-800"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700 ml-2"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="px-4 py-2.5 border-b border-slate-800/80 bg-[#070B14] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>

          {(['ALL', 'MCU', 'X-MEN', 'SPIDER-MAN', 'FANTASTIC FOUR', 'MULTIVERSE'] as const).map((uni) => (
            <button
              key={uni}
              onClick={() => {
                playClickSound();
                setSelectedUniverse(uni);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                selectedUniverse === uni
                  ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {uni}
            </button>
          ))}

          <div className="h-4 w-px bg-slate-800 mx-1 flex-shrink-0" />

          <button
            onClick={() => {
              playClickSound();
              setOnlyDoomsday(!onlyDoomsday);
            }}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              onlyDoomsday
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Crown className="w-3 h-3" />
            Doomsday Essential
          </button>

          <button
            onClick={() => {
              playClickSound();
              setOnlyUnwatched(!onlyUnwatched);
            }}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              onlyUnwatched
                ? 'bg-amber-950 text-amber-300 border border-amber-500'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Clock className="w-3 h-3" />
            Unwatched
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 sm:p-4 space-y-2 flex-1 max-h-[60vh]">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Film className="w-10 h-10 mx-auto text-slate-600 opacity-60" />
              <p className="text-sm font-semibold">No Marvel titles found matching your search</p>
              <p className="text-xs text-slate-600">Try searching for "Loki", "Doom", "Wolverine", "Incursion", or clear filters.</p>
            </div>
          ) : (
            filtered.map((movie) => {
              const isWatched = !!userData[movie.id]?.watched;
              return (
                <div
                  key={movie.id}
                  className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl bg-[#0B1220]/80 hover:bg-[#0E1729] border border-slate-800/90 hover:border-emerald-500/60 transition-all group cursor-pointer"
                  onClick={() => {
                    playClickSound();
                    onClose();
                    onSelectMovie(movie);
                  }}
                >
                  {/* Left: Thumbnail & Info */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 sm:w-16 h-16 sm:h-20 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-700 relative">
                      <img
                        src={getMoviePoster(movie.posterUrl, movie.universe)}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                      {isWatched && (
                        <div className="absolute inset-0 bg-emerald-950/80 flex items-center justify-center">
                          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                          {movie.universe}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {movie.year} • {movie.phase}
                        </span>
                        {movie.priority === 'ESSENTIAL' && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">
                            DOOMSDAY ESSENTIAL
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-emerald-300 transition-colors truncate">
                        {movie.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {movie.whyItMatters}
                      </p>

                      {/* Characters */}
                      <div className="flex items-center gap-1 flex-wrap pt-0.5">
                        {movie.keyCharacters.slice(0, 3).map((char, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        playClickSound();
                        onClose();
                        onOpenTrailer(movie);
                      }}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white text-slate-300 hover:text-black border border-white/20 transition-all cursor-pointer"
                      title="Play Trailer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (!isWatched) playWatchedChime();
                        else playClickSound();
                        onToggleWatched(movie.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer select-none ${
                        isWatched
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-400'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span className="hidden sm:inline">{isWatched ? 'Watched' : 'Watch'}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        <div className="p-3 bg-[#060A12] border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Found {filtered.length} titles matching</span>
          <span>Tip: Press <kbd className="px-1 py-0.5 bg-slate-800 text-slate-300 rounded font-mono text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
