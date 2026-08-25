import React, { useMemo } from 'react';
import { MarvelTitle, UserTitleData } from '../types';
import { getMoviePoster, FALLBACK_POSTERS } from '../utils/imageHelper';
import { 
  Crown, 
  Layers, 
  Film, 
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { playClickSound, playWatchedChime } from '../utils/soundEffects';

interface WatchOrderViewProps {
  titles: MarvelTitle[];
  userData: Record<string, UserTitleData>;
  watchOrderRoute: 'A_MCU' | 'B_DOOMSDAY' | 'C_MULTIVERSE';
  setWatchOrderRoute: (r: 'A_MCU' | 'B_DOOMSDAY' | 'C_MULTIVERSE') => void;
  watchOrderSort: 'story' | 'release' | 'doomsday';
  setWatchOrderSort: (s: 'story' | 'release' | 'doomsday') => void;
  onToggleWatched: (id: string) => void;
  onSelectMovie: (movie: MarvelTitle) => void;
}

export const WatchOrderView: React.FC<WatchOrderViewProps> = ({
  titles,
  userData,
  watchOrderRoute,
  setWatchOrderRoute,
  watchOrderSort,
  setWatchOrderSort,
  onToggleWatched,
  onSelectMovie,
}) => {
  // Filter by Route
  const routeTitles = useMemo(() => {
    let list = [...titles];

    if (watchOrderRoute === 'A_MCU') {
      list = list.filter(t => t.universe === 'MCU');
    } else if (watchOrderRoute === 'B_DOOMSDAY') {
      list = list.filter(t => t.priority === 'ESSENTIAL' || t.priority === 'HIGHLY_RELEVANT');
    } else if (watchOrderRoute === 'C_MULTIVERSE') {
      // Full Multiverse contains everything
    }

    // Sort according to selection
    if (watchOrderSort === 'story') {
      list.sort((a, b) => a.storyOrderIndex - b.storyOrderIndex);
    } else if (watchOrderSort === 'release') {
      list.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
    } else {
      // Doomsday curated index
      list.sort((a, b) => a.doomsdayOrderIndex - b.doomsdayOrderIndex);
    }

    return list;
  }, [titles, watchOrderRoute, watchOrderSort]);

  const watchedInRouteCount = routeTitles.filter(t => userData[t.id]?.watched).length;
  const totalMinutesInRoute = routeTitles.reduce((acc, t) => acc + t.runtimeMinutes, 0);
  const routeProgressPercent = routeTitles.length > 0 ? Math.round((watchedInRouteCount / routeTitles.length) * 100) : 0;

  return (
    <section id="watch-order-page" className="w-full bg-[#040714] py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              Watch-Reihenfolgen & Zeitstrahlen
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl font-normal">
            Wähle deine bevorzugte Route: Den kompakten Doctor Doom Express-Pfad, die offizielle MCU-Chronologie oder das gesamte Multiversum inklusive X-Men und Fantastic Four.
          </p>
        </div>

        {/* 3 Big Route Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Route B: Doctor Doom Express-Pfad */}
          <div
            onClick={() => {
              playClickSound();
              setWatchOrderRoute('B_DOOMSDAY');
            }}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              watchOrderRoute === 'B_DOOMSDAY'
                ? 'bg-[#0A1A12] border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-slate-500'
                : 'bg-[#1A1D29] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-500 text-black shadow-sm">
                  ★ EMPFEHLUNG
                </span>
                <Crown className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                Pfad 1: Doomsday Express-Route
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Fokussiert auf die wichtigsten Inkursionen, Loki (TVA), Deadpool & Wolverine, Doctor Strange und First Steps.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-400">
              Essenzielle Titel • ~35 Stunden
            </div>
          </div>

          {/* Route A: Marvel Studios (MCU) */}
          <div
            onClick={() => {
              playClickSound();
              setWatchOrderRoute('A_MCU');
            }}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              watchOrderRoute === 'A_MCU'
                ? 'bg-[#161017] border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.3)] ring-1 ring-rose-500'
                : 'bg-[#1A1D29] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  HAUPTZEITSTRAHL
                </span>
                <Film className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                Pfad 2: Marvel Studios (Earth-616)
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Alle MCU Filme und Disney+ Serien von Iron Man (2008) über Endgame bis Phase 5 & 6.
              </p>
            </div>
            <div className="text-xs font-bold text-rose-400">
              Vollständiges MCU • ~110 Stunden
            </div>
          </div>

          {/* Route C: Grand Multiverse Saga */}
          <div
            onClick={() => {
              playClickSound();
              setWatchOrderRoute('C_MULTIVERSE');
            }}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              watchOrderRoute === 'C_MULTIVERSE'
                ? 'bg-[#121422] border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] ring-1 ring-indigo-500'
                : 'bg-[#1A1D29] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  ALLE DIMENSIONEN
                </span>
                <Layers className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                Pfad 3: Das Große Multiversum
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Das ultimative Erlebnis: MCU + Fox X-Men Universum + Spider-Man Varianten + Fantastic Four.
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-400">
              Vollständiges Multiversum • ~160 Stunden
            </div>
          </div>
        </div>

        {/* Sorting Toggles & Status Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1A1D29] p-3 sm:p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sortierung:</span>
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => {
                  playClickSound();
                  setWatchOrderSort('doomsday');
                }}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  watchOrderSort === 'doomsday' ? 'bg-emerald-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Doomsday Relevanz
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setWatchOrderSort('story');
                }}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  watchOrderSort === 'story' ? 'bg-emerald-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Story-Chronologie
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setWatchOrderSort('release');
                }}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  watchOrderSort === 'release' ? 'bg-emerald-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kinostart Datum
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
            <span className="text-emerald-400 font-black">
              {watchedInRouteCount} von {routeTitles.length} gesehen ({routeProgressPercent}%)
            </span>
            <span className="text-slate-500">•</span>
            <span>{Math.round(totalMinutesInRoute / 60)} Std. Gesamtlaufzeit</span>
          </div>
        </div>

        {/* Timeline Stream Listing */}
        <div className="space-y-3">
          {routeTitles.map((movie, index) => {
            const isWatched = !!userData[movie.id]?.watched;
            const posterSrc = getMoviePoster(movie.posterUrl, movie.universe, movie.id, movie.title);

            return (
              <div
                key={movie.id}
                onClick={() => {
                  playClickSound();
                  onSelectMovie(movie);
                }}
                className={`group flex items-center justify-between p-3 sm:p-4 rounded-xl bg-[#1A1D29] border transition-all cursor-pointer ${
                  isWatched ? 'border-slate-600/50 bg-[#1A1D29]' : 'border-slate-800 hover:border-slate-500/60'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="text-xs sm:text-sm font-black text-slate-500 group-hover:text-emerald-400 w-6 text-center">
                    #{index + 1}
                  </span>

                  <div className="w-14 sm:w-16 aspect-[2/3] rounded-lg overflow-hidden bg-slate-950 flex-shrink-0">
                    <img referrerPolicy="no-referrer"
                      src={posterSrc}
                      alt={movie.title}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target && !target.dataset.fallback) {
                          target.dataset.fallback = 'true';
                          target.src = FALLBACK_POSTERS[movie.universe] || FALLBACK_POSTERS.DEFAULT;
                        }
                      }}
                    />
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {movie.universe}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        {movie.year} • {movie.runtimeMinutes}m • {movie.phase}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-base font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                      {movie.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 line-clamp-1 hidden sm:block font-normal">
                      {movie.whyItMatters}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isWatched) playWatchedChime();
                      else playClickSound();
                      onToggleWatched(movie.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isWatched
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : 'bg-emerald-500 text-black hover:bg-emerald-400'
                    }`}
                  >
                    {isWatched ? '✓ Gesehen' : 'Gesehen'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
