import React from 'react';
import { MarvelTitle, UserTitleData } from '../types';
import { getMoviePoster, getMovieLogo, FALLBACK_POSTERS } from '../utils/imageHelper';
import { 
  Check, 
  Film, 
  Tv, 
  Star, 
  Heart, 
  Play,
  CheckCircle2,
  Info
} from 'lucide-react';
import { playClickSound, playWatchedChime } from '../utils/soundEffects';

interface MovieCardProps {
  movie: MarvelTitle;
  userData?: UserTitleData;
  onToggleWatched: (id: string) => void;
  onTogglePostCredit: (id: string) => void;
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

  const getUniverseBadge = (universe: string) => {
    switch (universe) {
      case 'MCU': return 'bg-rose-950/90 text-rose-300 border-rose-700/80';
      case 'X-MEN': return 'bg-amber-950/90 text-amber-300 border-amber-600/80';
      case 'SPIDER-MAN': return 'bg-indigo-950/90 text-indigo-300 border-indigo-600/80';
      case 'FANTASTIC FOUR': return 'bg-sky-950/90 text-sky-300 border-sky-600/80';
      case 'MULTIVERSE': return 'bg-purple-950/90 text-purple-300 border-purple-600/80';
      default: return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  const posterSrc = getMoviePoster(movie.posterUrl, movie.universe, movie.id);
  
  // Custom logic to identify unreleased movies like Doomsday
  const isUpcoming = movie.id === 'captain-america-brave-new-world' || movie.id === 'thunderbolts-asterisk' || movie.id === 'fantastic-four-first-steps' || movie.id === 'avengers-doomsday' || movie.id === 'avengers-secret-wars' || movie.id === 'blade' || movie.id === 'spider-man-4' || (movie.releaseDate ? new Date(movie.releaseDate).getTime() > Date.now() : false);

  return (
    <div
      id={`movie-card-${movie.id}`}
      className={`group relative flex flex-col justify-between rounded-xl bg-[#1A1D29] border transition-all duration-300 overflow-hidden shadow-lg select-none ${
        isWatched 
          ? 'border-slate-700/70 shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-slate-500/30' 
          : 'border-transparent hover:border-slate-400 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1'
      }`}
    >
      {/* Cover Image Container */}
      <div 
        className={`relative w-full overflow-hidden bg-black cursor-pointer ${
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
            isWatched ? 'opacity-50 grayscale-[25%] sepia-[0.3]' : 'opacity-95 group-hover:opacity-100'
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-transparent to-black/60 pointer-events-none" />

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 backdrop-blur-[2px]">
          {onOpenTrailer && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
                onOpenTrailer(movie);
              }}
              className="px-3.5 py-1.5 rounded-full bg-white text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:scale-105 transition-transform cursor-pointer flex items-center gap-1.5"
              title={isUpcoming ? "Teaser/Leak ansehen" : "Trailer abspielen"}
            >
              <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
              <span>{isUpcoming ? 'Teaser / Leak' : 'Trailer'}</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              onSelectMovie(movie);
            }}
            className="px-3 py-1 rounded-full bg-slate-900/90 text-slate-200 border border-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3 h-3 text-slate-200" />
            <span>Details</span>
          </button>
        </div>

        {/* Upcoming Badge */}
        {isUpcoming && !isWatched && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 border border-slate-700 text-amber-500 font-black text-[9px] tracking-wider uppercase backdrop-blur-md shadow-lg">
            IN PRODUKTION
          </div>
        )}
        
        {/* Watched Stamp Badge */}
        {isWatched && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 border border-slate-500 text-slate-100 font-black text-[9px] tracking-wider uppercase shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <CheckCircle2 className="w-3 h-3 text-slate-200" />
            GESEHEN
          </div>
        )}

        {/* Badges Top Left */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap pointer-events-none z-10">
          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border backdrop-blur-md ${getUniverseBadge(movie.universe)}`}>
            {movie.universe}
          </span>
          {movie.priority === 'ESSENTIAL' && (
            <span className="text-[9px] font-black text-slate-100 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-500 uppercase shadow-sm">
              PFLICHT
            </span>
          )}
        </div>

        {/* Bottom Specs Info */}
        <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-[10px] font-bold text-slate-300 pointer-events-none z-10">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 bg-black/85 px-1.5 py-0.5 rounded border border-slate-700 backdrop-blur-md">
              {movie.type === 'SERIES' ? <Tv className="w-3 h-3 text-slate-200" /> : <Film className="w-3 h-3 text-rose-400" />}
              {movie.year}
            </span>
            <span className="bg-black/85 px-1.5 py-0.5 rounded border border-slate-700 backdrop-blur-md">
              {movie.runtimeMinutes}m
            </span>
          </div>

          <span className="bg-black/85 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400 backdrop-blur-md">
            {movie.phase}
          </span>
        </div>
      </div>

      {/* Card Info & Actions */}
      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {getMovieLogo(movie.id) ? (
            <img
              src={getMovieLogo(movie.id)}
              alt={movie.title}
              className="h-8 sm:h-10 object-contain object-left mb-1.5 cursor-pointer drop-shadow-md filter transition-all hover:scale-105 origin-left"
              onClick={() => {
                playClickSound();
                onSelectMovie(movie);
              }}
              title={movie.title}
              referrerPolicy="no-referrer"
            />
          ) : (
            <h4 
              onClick={() => {
                playClickSound();
                onSelectMovie(movie);
              }}
              className="text-xs sm:text-sm font-bold text-white group-hover:text-slate-200 transition-colors line-clamp-1 cursor-pointer"
              title={movie.title}
            >
              {movie.title}
            </h4>
          )}

          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-normal mt-1">
            {movie.whyItMatters}
          </p>
        </div>

        {/* Bottom Action Controls */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
          {/* Quick Mark Watched Toggle */}
          <button
            onClick={() => {
              if (!isWatched) playWatchedChime();
              else playClickSound();
              onToggleWatched(movie.id);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
              isWatched
                ? 'bg-slate-800 text-white border border-slate-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-slate-800 hover:bg-slate-600 hover:text-black border border-slate-800/80 text-slate-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'
            }`}
          >
            {isWatched ? <Check className="w-3 h-3 stroke-[3]" /> : null}
            <span>{isWatched ? 'Gesehen' : 'Als gesehen'}</span>
          </button>

          {/* Quick Rating & Favorite */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                playClickSound();
                onSetRating(movie.id, userRating === 5 ? 0 : 5);
              }}
              className="p-1 rounded hover:bg-slate-700/50 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
              title={`Bewertung: ${userRating}/5`}
            >
              <Star className={`w-3.5 h-3.5 ${userRating > 0 ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]' : ''}`} />
            </button>

            <button
              onClick={() => {
                playClickSound();
                onToggleFavorite(movie.id);
              }}
              className="p-1 rounded hover:bg-slate-700/50 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
              title="Favorit"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_5px_rgba(244,63,94,0.6)]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

