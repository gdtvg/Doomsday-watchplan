import React, { useState, useEffect } from 'react';
import { MarvelTitle, UserTitleData } from '../types';
import { PRIORITY_CONFIG, FACT_STATUS_CONFIG } from '../data/config';
import { getMovieBackdrop, getMoviePoster, getMovieLogo, FALLBACK_BACKDROPS, FALLBACK_POSTERS } from '../utils/imageHelper';
import { MARVEL_TITLES } from '../data/movies';
import { 
  X, 
  Check, 
  Clock, 
  Calendar, 
  Star, 
  Heart, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Crown, 
  Tv, 
  Film,
  AlertTriangle,
  Play,
  Share2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Users,
  Film as FilmIcon,
  Layers,
  ChevronRight,
  Shield,
  Zap,
  Info
} from 'lucide-react';
import { playClickSound, playWatchedChime } from '../utils/soundEffects';

interface MovieDetailModalProps {
  movie: MarvelTitle | null;
  userData?: UserTitleData;
  globalSpoilerUnlocked: boolean;
  onClose: () => void;
  onToggleWatched: (id: string) => void;
  onTogglePostCredit: (id: string) => void;
  onSetRating: (id: string, rating: number) => void;
  onToggleFavorite: (id: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
  onOpenTrailer?: (movie: MarvelTitle) => void;
  onSelectMovie?: (movie: MarvelTitle) => void;
}

type TabType = 'overview' | 'cast' | 'incursions' | 'postcredit' | 'similar';

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  userData,
  globalSpoilerUnlocked,
  onClose,
  onToggleWatched,
  onTogglePostCredit,
  onSetRating,
  onToggleFavorite,
  onSaveNotes,
  onOpenTrailer,
  onSelectMovie
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showLocalSpoiler, setShowLocalSpoiler] = useState(globalSpoilerUnlocked);
  const [copyToast, setCopyToast] = useState(false);

  // Sync tab back to overview when movie changes
  useEffect(() => {
    setActiveTab('overview');
    setShowLocalSpoiler(globalSpoilerUnlocked);
  }, [movie?.id, globalSpoilerUnlocked]);

  if (!movie) return null;

  const isWatched = !!userData?.watched;
  const isPostCreditWatched = !!userData?.watchedPostCredit;
  const userRating = userData?.userRating || 0;
  const isFavorite = !!userData?.isFavorite;

  const priorityMeta = PRIORITY_CONFIG[movie.priority] || PRIORITY_CONFIG.RELEVANT;
  const factMeta = FACT_STATUS_CONFIG[movie.factStatus] || FACT_STATUS_CONFIG.CONFIRMED;

  // Format runtime
  const hours = Math.floor(movie.runtimeMinutes / 60);
  const mins = movie.runtimeMinutes % 60;
  const runtimeFormatted = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  // Get similar / connected movies for Dulo recommendations tab
  const similarMovies = MARVEL_TITLES.filter(
    (m) => m.id !== movie.id && (m.universe === movie.universe || m.priority === 'ESSENTIAL')
  ).slice(0, 6);

  const handleShareClick = () => {
    playClickSound();
    const shareParam = movie.tmdbId ? `movie:${movie.tmdbId}` : `movie:${movie.id}`;
    const shareUrl = `${window.location.origin}${window.location.pathname}?info=${shareParam}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 3000);
    }
  };

  const scoreDisplay = movie.ratingScore || (movie.priority === 'ESSENTIAL' ? 8.4 : 7.8);
  
  const isUpcoming = Boolean(movie.isUpcoming || (movie.releaseDate ? new Date(movie.releaseDate).getTime() > Date.now() : false));

  return (
    <div 
      id="movie-detail-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id={`movie-detail-${movie.id}`}
        className="relative w-full max-w-5xl bg-[#080C14] border border-slate-700/80 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.98)] overflow-hidden my-auto max-h-[94vh] flex flex-col ring-1 ring-slate-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Toast for Link Copying */}
        {copyToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-emerald-500 text-black font-black text-xs uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(16,185,129,0.9)] flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4 stroke-[3]" />
            Dulo Link Copied to Clipboard (?info=movie:{movie.tmdbId || movie.id})
          </div>
        )}

        {/* 1. Backdrop Hero Banner (Dulo / Streaming High-Res Banner) */}
        <div className="relative h-48 sm:h-64 md:h-72 w-full overflow-hidden bg-slate-950 flex-shrink-0">
          <img referrerPolicy="no-referrer"
            src={getMovieBackdrop(movie.backdropUrl, movie.posterUrl, movie.universe)}
            alt={movie.title}
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target && !target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = FALLBACK_BACKDROPS[movie.universe] || FALLBACK_BACKDROPS.DEFAULT;
              }
            }}
          />

          {/* Dulo Cinematic Smooth Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/90 via-transparent to-[#080C14]/90" />

          {/* Top Control Bar: Close Button, Share Button */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 flex items-center gap-2">
            <button
              onClick={handleShareClick}
              className="p-2 sm:p-2.5 rounded-full bg-black/75 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer shadow-lg hover:scale-105 flex items-center gap-1.5 text-xs font-bold"
              title="Share Title Link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-black/75 hover:bg-emerald-500 text-slate-300 hover:text-black border border-slate-700/80 transition-all cursor-pointer shadow-lg hover:scale-105"
              title="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Quick Universe Watermark */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-slate-700 text-emerald-400 font-black text-[10px] sm:text-xs uppercase tracking-wider">
              {movie.universe}
            </span>
            <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-slate-700 text-slate-300 font-bold text-[10px] sm:text-xs">
              {movie.phase}
            </span>
          </div>
        </div>

        {/* 2. Main Body Grid: Left Poster Column + Right Dulo Info/Tabs */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 -mt-20 sm:-mt-28 relative z-20">
            
            {/* Left Column: 2:3 Vertical Poster Card & Action Hub */}
            <div className="w-40 sm:w-48 md:w-56 flex-shrink-0 mx-auto md:mx-0 space-y-3">
              <div className="aspect-[2/3] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-[0_12px_40px_rgba(0,0,0,0.9)] relative group">
                <img referrerPolicy="no-referrer"
                  src={getMoviePoster(movie.posterUrl, movie.universe, movie.id)}
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

                {/* Watched Stamp Overlay */}
                {isWatched && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/95 border border-emerald-400 text-emerald-300 font-black text-[9px] uppercase tracking-wider shadow-lg">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    WATCHED
                  </div>
                )}
              </div>

              {/* Primary Trailer Button */}
              {onOpenTrailer && (
                <button
                  id="modal-play-trailer-btn"
                  onClick={() => {
                    playClickSound();
                    onClose();
                    onOpenTrailer(movie);
                  }}
                  className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider text-black bg-white hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.7)] hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black ml-0.5" />
                  <span>{movie.hintClips ? 'Hint-Trailer & Teaser' : (isUpcoming ? 'Teaser & Reveal ansehen' : 'Trailer ansehen')}</span>
                </button>
              )}

              {/* Watchlist & Watched Toggle Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    if (!isWatched) playWatchedChime();
                    else playClickSound();
                    onToggleWatched(movie.id);
                  }}
                  className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    isWatched
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-[#0E1524] hover:bg-emerald-500 hover:text-black text-slate-200 border-slate-700'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${isWatched ? 'stroke-[3]' : ''}`} />
                  <span>{isWatched ? 'Watched' : 'Mark Seen'}</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    onToggleFavorite(movie.id);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    isFavorite 
                      ? 'bg-rose-950/90 text-rose-300 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
                      : 'bg-[#0E1524] hover:bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>Favorite</span>
                </button>
              </div>

              {/* 5-Star Rating Clicker */}
              <div className="p-2.5 rounded-xl bg-[#0C121E] border border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Rating:</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        playClickSound();
                        onSetRating(movie.id, userRating === star ? 0 : star);
                      }}
                      className="p-0.5 text-slate-600 hover:text-amber-400 transition-colors cursor-pointer"
                      title={`Rate ${star} Stars`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          userRating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Title Info, Metadata Badges & Dulo Content Tabs */}
            <div className="flex-1 min-w-0 space-y-4">
              
              {/* Header Title & Tagline */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[11px] font-black tracking-wider flex items-center gap-1">
                    <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                    ★ {scoreDisplay}/10 TMDB
                  </span>

                  <span className="text-xs font-bold text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                    {movie.year}
                  </span>

                  <span className="text-xs font-bold text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {runtimeFormatted}
                  </span>

                  <span className="text-xs font-black uppercase text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/60">
                    {movie.priority === 'ESSENTIAL' ? 'DOOMSDAY ESSENTIAL' : movie.priority.replace('_', ' ')}
                  </span>
                </div>

                {getMovieLogo(movie.id) ? (
                  <img 
                    src={getMovieLogo(movie.id)}
                    alt={movie.title}
                    className="h-16 sm:h-20 lg:h-24 object-contain object-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter pt-2 pb-1"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-sans leading-tight pt-1">
                    {movie.title}
                  </h1>
                )}

                {movie.tagline && (
                  <p className="text-xs sm:text-sm font-semibold italic text-slate-400">
                    "{movie.tagline}"
                  </p>
                )}
              </div>

              {/* Format & Quality Badges (Dulo Streaming Style) */}
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  4K ULTRA HD
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  DOLBY ATMOS
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  IMAX ENHANCED
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">
                  {movie.streamingPlatform || 'Disney+'}
                </span>
              </div>

              {/* Dulo Sleek Tab Navigation Bar */}
              <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-800/90 pt-2 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTab('overview');
                  }}
                  className={`px-3 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'text-emerald-400 border-emerald-500 bg-emerald-950/20'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  Overview
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTab('cast');
                  }}
                  className={`px-3 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'cast'
                      ? 'text-emerald-400 border-emerald-500 bg-emerald-950/20'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Cast & Characters
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTab('incursions');
                  }}
                  className={`px-3 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'incursions'
                      ? 'text-emerald-400 border-emerald-500 bg-emerald-950/20'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  Doomsday & Incursion Lore
                </button>

                {movie.postCredit.hasScene && (
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveTab('postcredit');
                    }}
                    className={`px-3 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                      activeTab === 'postcredit'
                        ? 'text-emerald-400 border-emerald-500 bg-emerald-950/20'
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    <FilmIcon className="w-3.5 h-3.5" />
                    Post-Credits
                  </button>
                )}

                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTab('similar');
                  }}
                  className={`px-3 sm:px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'similar'
                      ? 'text-emerald-400 border-emerald-500 bg-emerald-950/20'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Similar & Next
                </button>
              </div>

              {/* Tab Contents */}
              <div className="pt-2">
                
                {/* TAB 1: OVERVIEW */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Storyline & Incursion Context
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {movie.whyItMatters}
                      </p>
                    </div>

                    {/* Quick Metadata Box */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0B111D] border border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Release Date</span>
                        <span className="text-white font-medium">{movie.releaseDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Type</span>
                        <span className="text-white font-medium">{movie.type === 'SERIES' ? 'Disney+ Original Series' : 'Feature Film'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Timeline Status</span>
                        <span className="text-emerald-400 font-bold">{movie.factStatus}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                        Lore Keywords
                      </h4>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {movie.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#0C1422] text-slate-300 border border-slate-800 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: CAST & CHARACTERS */}
                {activeTab === 'cast' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Key Characters & Variants
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {movie.castMembers && movie.castMembers.length > 0 ? (
                        movie.castMembers.map((member, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B111D] border border-slate-800"
                          >
                            <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center font-black text-emerald-400 text-xs flex-shrink-0">
                              {member.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold text-white truncate">{member.character}</h5>
                              <p className="text-[11px] text-slate-400 truncate">{member.name}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        movie.keyCharacters.map((char, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#0B111D] border border-slate-800 text-xs font-medium text-slate-200"
                          >
                            <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                              ★
                            </div>
                            <span>{char}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 3: INCURSIONS & DOOMSDAY LORE */}
                {activeTab === 'incursions' && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#0B111D] to-emerald-950/30 border border-emerald-700/60 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Crown className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-black uppercase tracking-wider">
                          Doctor Doom & Battleworld Connection
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {movie.doomsdayConnection}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0B111D] border border-sky-900/60 space-y-2">
                      <div className="flex items-center gap-2 text-sky-400">
                        <Sparkles className="w-4 h-4 text-sky-400" />
                        <h4 className="text-xs font-black uppercase tracking-wider">
                          Multiverse Incursion Status
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        This title contains critical structural points in the Multiverse Saga where branching timelines or universe collisions occur.
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 4: POST-CREDITS SCENE */}
                {activeTab === 'postcredit' && movie.postCredit.hasScene && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="p-4 rounded-xl bg-[#0B111D] border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FilmIcon className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs font-black uppercase tracking-wider text-white">
                            Post-Credits Scene Summary
                          </h4>
                        </div>
                        <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isPostCreditWatched}
                            onChange={() => onTogglePostCredit(movie.id)}
                            className="rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span>{isPostCreditWatched ? '✓ Scene Seen' : 'Mark Seen'}</span>
                        </label>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {movie.postCredit.summary}
                      </p>

                      {movie.postCredit.spoilerContent && (
                        <div className="pt-2 border-t border-slate-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Detailed Lore Spoiler:
                            </span>
                            <button
                              onClick={() => setShowLocalSpoiler(!showLocalSpoiler)}
                              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                            >
                              {showLocalSpoiler ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              {showLocalSpoiler ? 'Hide Detailed Spoiler' : 'Reveal Spoiler'}
                            </button>
                          </div>

                          {showLocalSpoiler ? (
                            <div className="p-3 rounded-lg bg-black/60 border border-amber-900/60 text-xs text-slate-200 font-mono leading-relaxed">
                              {movie.postCredit.spoilerContent}
                            </div>
                          ) : (
                            <div 
                              onClick={() => setShowLocalSpoiler(true)}
                              className="p-3 rounded-lg bg-black/40 border border-slate-800 text-xs text-slate-500 italic cursor-pointer hover:border-slate-700 transition-colors"
                            >
                              [Spoiler Shield Active. Click to reveal the full post-credit spoiler.]
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 5: SIMILAR & NEXT */}
                {activeTab === 'similar' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Connected Titles & Next in Timeline
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {similarMovies.map((sim) => (
                        <div
                          key={sim.id}
                          onClick={() => {
                            playClickSound();
                            if (onSelectMovie) onSelectMovie(sim);
                          }}
                          className="group rounded-xl overflow-hidden bg-[#0C121E] border border-slate-800 hover:border-emerald-500/80 transition-all cursor-pointer shadow-md"
                        >
                          <div className="aspect-[16/9] w-full overflow-hidden bg-slate-950 relative">
                            <img referrerPolicy="no-referrer"
                              src={getMovieBackdrop(sim.backdropUrl, sim.posterUrl, sim.universe)}
                              alt={sim.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <span className="absolute bottom-1 left-2 text-[9px] font-black text-emerald-400 uppercase">
                              {sim.universe}
                            </span>
                          </div>
                          <div className="p-2">
                            <h5 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                              {sim.title}
                            </h5>
                            <span className="text-[10px] text-slate-400">{sim.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
