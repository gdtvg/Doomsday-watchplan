import React, { useState } from 'react';
import { MarvelTitle, UserTitleData, UniverseType, PriorityLevel, MediaType } from '../types';
import { MovieCard } from './MovieCard';
import { getMoviePoster, getMovieLogo, FALLBACK_POSTERS } from '../utils/imageHelper';
import { 
  Search, 
  Grid, 
  List, 
  LayoutGrid, 
  CheckCheck, 
  Film, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { playClickSound, playWatchedChime } from '../utils/soundEffects';

interface WatchlistViewProps {
  titles: MarvelTitle[];
  userData: Record<string, UserTitleData>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeUniverse: UniverseType | 'ALL';
  setActiveUniverse: (u: UniverseType | 'ALL') => void;
  activePriority: PriorityLevel | 'ALL';
  setActivePriority: (p: PriorityLevel | 'ALL') => void;
  activeFormat: MediaType | 'ALL';
  setActiveFormat: (f: MediaType | 'ALL') => void;
  activeWatchStatus: 'ALL' | 'WATCHED' | 'UNWATCHED' | 'FAVORITES';
  setActiveWatchStatus: (s: 'ALL' | 'WATCHED' | 'UNWATCHED' | 'FAVORITES') => void;
  doomsdayMode: boolean;
  onToggleDoomsdayMode: () => void;
  onToggleWatched: (id: string) => void;
  onTogglePostCredit: (id: string) => void;
  onSetRating: (id: string, rating: number) => void;
  onToggleFavorite: (id: string) => void;
  onSelectMovie: (movie: MarvelTitle) => void;
  onOpenTrailer?: (movie: MarvelTitle) => void;
  onMarkAllVisibleWatched: (ids: string[]) => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  titles,
  userData,
  searchQuery,
  setSearchQuery,
  activeUniverse,
  setActiveUniverse,
  activePriority,
  setActivePriority,
  activeFormat,
  setActiveFormat,
  activeWatchStatus,
  setActiveWatchStatus,
  onToggleWatched,
  onTogglePostCredit,
  onSetRating,
  onToggleFavorite,
  onSelectMovie,
  onOpenTrailer,
  onMarkAllVisibleWatched,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'list'>('grid');

  const resetFilters = () => {
    playClickSound();
    setSearchQuery('');
    setActiveUniverse('ALL');
    setActivePriority('ALL');
    setActiveFormat('ALL');
    setActiveWatchStatus('ALL');
  };

  const visibleUnwatchedIds = titles
    .filter(t => !userData[t.id]?.watched)
    .map(t => t.id);

  return (
    <div id="watchlist-view-container" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                Watchlist & Filme-Katalog
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
              {titles.length} Marvel Filme und Serien mit offiziellen Covern & Doomsday-Bezug.
            </p>
          </div>

          {/* Quick Bulk Actions & View Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {visibleUnwatchedIds.length > 0 && (
              <button
                id="watchlist-mark-all-btn"
                onClick={() => {
                  playWatchedChime();
                  onMarkAllVisibleWatched(visibleUnwatchedIds);
                }}
                className="px-3 py-2 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Alle Sichtbaren als gesehen ({visibleUnwatchedIds.length})</span>
              </button>
            )}

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => {
                  playClickSound();
                  setViewMode('grid');
                }}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-emerald-500 text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Poster Raster"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setViewMode('compact');
                }}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'compact' ? 'bg-emerald-500 text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Kompakt-Poster"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setViewMode('list');
                }}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-emerald-500 text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Listenansicht"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="watchlist-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Titel, Charakter, Inkursion oder Doctor Doom suchen..."
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#1A1D29] border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-slate-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded cursor-pointer"
            >
              Löschen
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Universes */}
          <select
            value={activeUniverse}
            onChange={(e) => {
              playClickSound();
              setActiveUniverse(e.target.value as UniverseType | 'ALL');
            }}
            className="px-3 py-1.5 bg-[#1A1D29] border border-slate-800 rounded-lg text-xs font-bold text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">Alle Universen</option>
            <option value="MCU">MCU (Earth-616)</option>
            <option value="MULTIVERSE">Multiversum & TVA</option>
            <option value="X-MEN">Fox X-Men Saga</option>
            <option value="SPIDER-MAN">Spider-Man & Sony</option>
            <option value="FANTASTIC FOUR">Fantastic Four</option>
          </select>

          {/* Priority */}
          <select
            value={activePriority}
            onChange={(e) => {
              playClickSound();
              setActivePriority(e.target.value as PriorityLevel | 'ALL');
            }}
            className="px-3 py-1.5 bg-[#1A1D29] border border-slate-800 rounded-lg text-xs font-bold text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">Alle Relevanz-Stufen</option>
            <option value="ESSENTIAL">Doomsday Pflicht (S-Tier)</option>
            <option value="HIGHLY_RELEVANT">Sehr relevant (A-Tier)</option>
            <option value="RELEVANT">Wichtige Grundlage (B-Tier)</option>
            <option value="OPTIONAL">Optionaler Kontext (C-Tier)</option>
            <option value="LEGACY">Klassiker (D-Tier)</option>
          </select>

          {/* Format */}
          <select
            value={activeFormat}
            onChange={(e) => {
              playClickSound();
              setActiveFormat(e.target.value as MediaType | 'ALL');
            }}
            className="px-3 py-1.5 bg-[#1A1D29] border border-slate-800 rounded-lg text-xs font-bold text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">Alle Formate</option>
            <option value="FILM">Spielfilme</option>
            <option value="SERIES">Serien</option>
          </select>

          {/* Watch Status */}
          <select
            value={activeWatchStatus}
            onChange={(e) => {
              playClickSound();
              setActiveWatchStatus(e.target.value as any);
            }}
            className="px-3 py-1.5 bg-[#1A1D29] border border-slate-800 rounded-lg text-xs font-bold text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">Alle Status</option>
            <option value="UNWATCHED">Noch nicht gesehen</option>
            <option value="WATCHED">Bereits gesehen</option>
            <option value="FAVORITES">Meine Favoriten ❤️</option>
          </select>


          {/* Reset Filters */}
          {(activeUniverse !== 'ALL' || activePriority !== 'ALL' || activeFormat !== 'ALL' || activeWatchStatus !== 'ALL' || searchQuery !== '') && (
            <button
              onClick={resetFilters}
              className="px-2.5 py-1.5 text-xs font-bold text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-lg hover:bg-rose-900/50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Filter zurücksetzen
            </button>
          )}
        </div>
      </div>

      {/* Grid Content Area */}
      {titles.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#1A1D29] border border-slate-800 space-y-3">
          <Film className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white uppercase">Keine passenden Titel gefunden</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Passe deine Suche oder Filter an, um Marvel-Titel anzuzeigen.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md"
          >
            Filter zurücksetzen
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* 2:3 Vertical Poster Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {titles.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              userData={userData[movie.id]}
              onToggleWatched={onToggleWatched}
              onTogglePostCredit={onTogglePostCredit}
              onSetRating={onSetRating}
              onToggleFavorite={onToggleFavorite}
              onSelectMovie={onSelectMovie}
              onOpenTrailer={onOpenTrailer}
              layout="poster"
            />
          ))}
        </div>
      ) : viewMode === 'compact' ? (
        /* Compact 2:3 Poster View */
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {titles.map((movie) => {
            const isWatched = !!userData[movie.id]?.watched;
            return (
              <div
                key={movie.id}
                onClick={() => {
                  playClickSound();
                  onSelectMovie(movie);
                }}
                className={`group relative rounded-xl overflow-hidden bg-[#1A1D29] border cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isWatched ? 'border-emerald-600/70 ring-1 ring-slate-500/30' : 'border-slate-800 hover:border-emerald-500/70'
                }`}
              >
                <div className="aspect-[2/3] w-full overflow-hidden bg-slate-950 relative">
                  <img referrerPolicy="no-referrer"
                    src={getMoviePoster(movie.posterUrl, movie.universe, movie.id)}
                    alt={movie.title}
                    loading="lazy"
                    className={`w-full h-full object-cover object-center ${isWatched ? 'opacity-50 grayscale-[30%]' : 'opacity-95 group-hover:opacity-100'}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target && !target.dataset.fallback) {
                        target.dataset.fallback = 'true';
                        target.src = FALLBACK_POSTERS[movie.universe] || FALLBACK_POSTERS.DEFAULT;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                  
                  {isWatched && (
                    <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-emerald-500 text-black shadow-md z-10">
                      <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  <div className="absolute bottom-2 inset-x-2 pointer-events-none">
                    <span className="text-[8px] font-black uppercase text-emerald-400 block tracking-wider">
                      {movie.universe}
                    </span>
                    {getMovieLogo(movie.id) ? (
                      <img 
                        src={getMovieLogo(movie.id)} 
                        alt={movie.title} 
                        className="h-4 sm:h-5 object-contain object-left mt-0.5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <h4 className="text-[11px] font-bold text-white line-clamp-1 leading-tight">
                        {movie.title}
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed List View */
        <div className="space-y-2">
          {titles.map((movie) => {
            const isWatched = !!userData[movie.id]?.watched;
            return (
              <div
                key={movie.id}
                onClick={() => {
                  playClickSound();
                  onSelectMovie(movie);
                }}
                className={`flex items-center justify-between p-3 rounded-xl bg-[#1A1D29] border transition-all cursor-pointer ${
                  isWatched ? 'border-slate-600/50 bg-[#1A1D29]' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-16 rounded-md overflow-hidden flex-shrink-0 bg-slate-950">
                    <img referrerPolicy="no-referrer"
                      src={getMoviePoster(movie.posterUrl, movie.universe, movie.id, movie.title)}
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
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {movie.universe}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {movie.year} • {movie.runtimeMinutes}m
                      </span>
                    </div>
                    {getMovieLogo(movie.id) ? (
                      <img 
                        src={getMovieLogo(movie.id)}
                        alt={movie.title}
                        className="h-6 sm:h-8 object-contain object-left drop-shadow-md my-1"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {movie.title}
                      </h4>
                    )}
                    <p className="text-[11px] text-slate-400 truncate max-w-lg">
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
                    className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isWatched
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
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
      )}
    </div>
  );
};
