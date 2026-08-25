import React from 'react';
import { MarvelTitle, UserTitleData, WatchStatus } from '../types';
import { getMoviePoster, FALLBACK_POSTERS } from '../utils/imageHelper';
import { 
  Check, 
  Film, 
  Tv, 
  Star, 
  Heart, 
  Play, 
  CheckCircle2, 
  Clock, 
  Info 
} from 'lucide-react';
import { playClickSound, playWatchedChime } from '../utils/soundEffects';

interface MovieCardProps {
  movie: MarvelTitle;
  userData?: UserTitleData;
  onToggleWatched: (id: string) => void;
  onTogglePostCredit?: (id: string) => void;
  onSetRating: (id: string, rating: number) => void;
  onToggleFavorite: (id: string) => void;
  onSelectMovie: (movie: MarvelTitle) => void;
  onOpenTrailer?: (movie: MarvelTitle) => void;
  rankNumber?: number;
  layout?: 'poster' | 'landscape';
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  userData,
  onToggleWatched,
  onSetRating,
  onToggleFavorite,
  onSelectMovie,
  onOpenTrailer,
  layout = 'poster',
}) => {
  const isWatched = !!userData?.watched;
  const userRating = userData?.userRating || 0;
  const isFavorite = !!userData?.isFavorite;
  const watchStatus: WatchStatus = userData?.watchStatus || (isWatched ? 'WATCHED' : 'UNWATCHED');

  const getProviderBadge = () => {
    if (movie.isUpcoming || movie.year >= 2026 || movie.id === 'avengers-doomsday') {
      return {
        label: 'KINO 2026',
        bg: 'badge-3d-doom text-emerald-300'
      };
    }
    if (movie.id === 'fantastic-four-first-steps') {
      return {
        label: 'KINO 2025',
        bg: 'badge-3d-metallic text-sky-300'
      };
    }
    const primary = movie.streaming?.stream?.[0] || movie.streamingPlatform || 'Disney+';
    if (primary.includes('Netflix')) {
      return {
        label: 'NETFLIX',
        bg: 'badge-3d-marvel text-white'
      };
    }
    if (primary.includes('Prime')) {
      return {
        label: 'PRIME',
        bg: 'badge-3d-metallic text-cyan-300'
      };
    }
    return {
      label: 'DISNEY+',
      bg: 'badge-3d-metallic text-blue-300'
    };
  };

  const posterSrc = getMoviePoster(movie.posterUrl, movie.universe, movie.id, movie.title);
  const isUpcoming = Boolean(movie.isUpcoming || (movie.releaseDate ? new Date(movie.releaseDate).getTime() > Date.now() : false));
  const provider = getProviderBadge();

  return (
    <div
      id={`movie-card-${movie.id}`}
      className={`group relative flex flex-col justify-between rounded-xl card-3d-titanium transition-all duration-300 overflow-hidden select-none ${
        isWatched 
          ? 'border-emerald-500/50 shadow-[0_0_16px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/30' 
          : 'border-slate-800/90 hover:border-emerald-500/50 hover:shadow-[0_12px_28px_rgba(0,0,0,0.95)] hover:-translate-y-1'
      }`}
    >
      {/* Cover Image Container (Poster Priority 1) */}
      <div 
        className={`relative w-full overflow-hidden bg-slate-950 cursor-pointer ${
          layout === 'landscape' ? 'aspect-[16/9]' : 'aspect-[2/3]'
        }`}
        onClick={() => {
          playClickSound();
          onSelectMovie(movie);
        }}
      >
        <img referrerPolicy="no-referrer"
          src={posterSrc}
          alt={movie.title}
          loading="lazy"
          className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 ${
            isWatched ? 'opacity-70 grayscale-[20%]' : 'opacity-95 group-hover:opacity-100'
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target && !target.dataset.fallback) {
              target.dataset.fallback = 'true';
              target.src = FALLBACK_POSTERS[movie.universe] || FALLBACK_POSTERS.DEFAULT;
            }
          }}
        />

        {/* Ambient Top & Bottom Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-transparent to-black/60 pointer-events-none" />

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/75 backdrop-blur-[3px]">
          {onOpenTrailer && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
                onOpenTrailer(movie);
              }}
              className="px-4 py-1.5 rounded-full bg-white text-black font-black text-xs uppercase tracking-wider shadow-[0_4px_12px_rgba(255,255,255,0.35)] hover:bg-slate-200 hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
              title={movie.hintClips ? "Clips & Teaser" : (isUpcoming ? "Teaser ansehen" : "Trailer abspielen")}
            >
              <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
              <span>{movie.hintClips ? 'Hints & Clips' : (isUpcoming ? 'Teaser' : 'Trailer')}</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              onSelectMovie(movie);
            }}
            className="px-3.5 py-1 rounded-full badge-3d-metallic text-slate-200 font-bold text-xs uppercase tracking-wider hover:text-white transition-all flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3 h-3 text-slate-200" />
            <span>Details</span>
          </button>
        </div>

        {/* Top Badges: Streaming Availability & Importance & Watch Status */}
        <div className="absolute top-2 inset-x-2 flex items-center justify-between gap-1 pointer-events-none z-10">
          {/* Left: Provider & Importance */}
          <div className="flex items-center gap-1 flex-shrink min-w-0">
            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded truncate ${provider.bg}`}>
              {provider.label}
            </span>
            {movie.priority === 'ESSENTIAL' && (
              <span className="text-[9px] font-black text-amber-200 badge-3d-metallic !border-amber-500/60 px-1.5 py-0.5 rounded uppercase shadow-md flex-shrink-0">
                PFLICHT
              </span>
            )}
          </div>

          {/* Right: Watch Status Badge */}
          <div className="flex-shrink-0">
            {isWatched ? (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded badge-3d-doom text-emerald-300 font-black text-[9px] tracking-wider uppercase">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>GESEHEN</span>
              </div>
            ) : watchStatus === 'IN_PROGRESS' ? (
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded badge-3d-metallic text-sky-300 font-black text-[9px] tracking-wider uppercase">
                <Clock className="w-3 h-3 text-sky-400" />
                <span>IN ARBEIT</span>
              </div>
            ) : isUpcoming ? (
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded badge-3d-metallic text-amber-400 font-black text-[9px] tracking-wider uppercase">
                2026
              </div>
            ) : null}
          </div>
        </div>

        {/* Bottom Metadata Info: Type, Year, Runtime, Phase */}
        <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-[10px] font-bold text-slate-300 pointer-events-none z-10">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 badge-3d-metallic px-1.5 py-0.5 rounded text-slate-300">
              {movie.type === 'SERIES' ? <Tv className="w-3 h-3 text-slate-300" /> : <Film className="w-3 h-3 text-emerald-400" />}
              {movie.year}
            </span>
            <span className="badge-3d-metallic px-1.5 py-0.5 rounded text-slate-300">
              {movie.runtimeMinutes}m
            </span>
          </div>

          <span className="badge-3d-metallic px-1.5 py-0.5 rounded text-slate-300">
            {movie.phase}
          </span>
        </div>
      </div>

      {/* Card Info & Actions */}
      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Title */}
          <h4 
            onClick={() => {
              playClickSound();
              onSelectMovie(movie);
            }}
            className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1 cursor-pointer tracking-tight drop-shadow-sm"
            title={movie.title}
          >
            {movie.title}
          </h4>

          {/* Context / Why it matters */}
          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {movie.whyItMatters}
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
          {/* Quick Mark Watched Toggle */}
          <button
            onClick={() => {
              if (!isWatched) playWatchedChime();
              else playClickSound();
              onToggleWatched(movie.id);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
              isWatched
                ? 'badge-3d-doom text-emerald-300'
                : 'badge-3d-metallic hover:text-white text-slate-200'
            }`}
          >
            {isWatched ? <Check className="w-3 h-3 stroke-[3] text-emerald-400" /> : null}
            <span>{isWatched ? 'Gesehen' : 'Als gesehen'}</span>
          </button>

          {/* Quick Rating & Favorite */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                playClickSound();
                onSetRating(movie.id, userRating === 5 ? 0 : 5);
              }}
              className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
              title={`Bewertung: ${userRating}/5`}
            >
              <Star className={`w-3.5 h-3.5 ${userRating > 0 ? 'text-amber-400 fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={() => {
                playClickSound();
                onToggleFavorite(movie.id);
              }}
              className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
              title="Favorit"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



