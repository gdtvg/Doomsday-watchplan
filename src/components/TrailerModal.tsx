import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Crown, 
  Sparkles, 
  Film, 
  Calendar, 
  Clock, 
  Star, 
  ExternalLink, 
  Check, 
  Volume2, 
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Tv,
  Eye,
  EyeOff,
  Share2
} from 'lucide-react';
import { MarvelTitle } from '../types';
import { MARVEL_TITLES } from '../data/movies';
import { getMovieBackdrop, getMoviePoster } from '../utils/imageHelper';

interface TrailerModalProps {
  movie: MarvelTitle | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleWatched?: (id: string) => void;
  onSelectMovie?: (movie: MarvelTitle) => void;
  isWatched?: boolean;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  movie,
  isOpen,
  onClose,
  onToggleWatched,
  onSelectMovie,
  isWatched = false
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MarvelTitle | null>(movie);
  const [showSpoiler, setShowSpoiler] = useState(false);

  const [activeClipIndex, setActiveClipIndex] = useState<number>(0);

  React.useEffect(() => {
    if (movie) {
      setSelectedMovie(movie);
      setShowSpoiler(false);
      setActiveClipIndex(0);
    }
  }, [movie]);

  if (!isOpen || !selectedMovie) return null;

  const currentMovie = selectedMovie;
  const hasHintClips = Boolean(currentMovie.hintClips && currentMovie.hintClips.length > 0);
  const currentClip = hasHintClips && currentMovie.hintClips ? currentMovie.hintClips[activeClipIndex] : null;
  const youtubeId = currentClip ? currentClip.youtubeId : (currentMovie.trailerYoutubeId || 'qEVUtrk8_B4');

  // Get related trailers in same universe or priority
  const relatedMovies = MARVEL_TITLES.filter(
    (m) => m.id !== currentMovie.id && (m.universe === currentMovie.universe || m.priority === 'ESSENTIAL')
  ).slice(0, 6);

  return (
    <div
      id="trailer-theater-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-auto bg-[#070B14] border border-slate-700/80 rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] ring-1 ring-slate-500/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Backlight Glow (Disney+ / Theater Mode) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-purple-500/20 blur-xl opacity-50 -z-10" />

        {/* Video Player Frame with 16:9 ratio */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            key={youtubeId}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&mute=${isMuted ? '1' : '0'}&controls=1`}
            title={currentClip ? currentClip.title : currentMovie.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Top Actions: Audio Toggle, YouTube Direct Link & Close */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-black/80 hover:bg-red-600/90 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 shadow-lg hover:scale-105"
              title="Auf YouTube ansehen"
            >
              <ExternalLink className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
              <span className="hidden sm:inline">Auf YouTube</span>
            </a>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-slate-800 text-white border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
              title={isMuted ? 'Ton aktivieren' : 'Stummschalten'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-emerald-500 text-white hover:text-black border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
              title="Schließen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hint Clips Selector Tabs (if available) */}
        {hasHintClips && currentMovie.hintClips && (
          <div className="bg-[#05080F] px-4 py-3 border-b border-slate-800/80">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Offizielle Hint-Trailer, Teaser & Reveal-Clips
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                {currentMovie.hintClips.length} Clips verfügbar
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {currentMovie.hintClips.map((clip, idx) => (
                <button
                  key={clip.youtubeId + idx}
                  onClick={() => setActiveClipIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    activeClipIndex === idx
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{clip.tag || clip.title}</span>
                </button>
              ))}
            </div>
            {currentClip && (
              <p className="text-[11px] text-slate-300 mt-2 font-normal">
                <strong className="text-white">{currentClip.title}:</strong> {currentClip.description}
              </p>
            )}
          </div>
        )}

        {/* Streaming Info & Details Bar */}
        <div className="p-4 sm:p-6 space-y-5 bg-gradient-to-b from-[#070B14] via-[#05080E] to-[#030509]">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                {currentMovie.isUpcoming && (
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-600 animate-pulse">
                    NOCH NICHT VERÖFFENTLICHT • KINO
                  </span>
                )}
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  {currentMovie.universe}
                </span>
                <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                  {currentMovie.year}
                </span>
                <span className="text-[10px] font-black text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-600/60">
                  4K ULTRA HD
                </span>
                <span className="text-[10px] font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
                  IMAX ENHANCED
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase">
                {currentMovie.title}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {currentMovie.phase} • {currentMovie.runtimeMinutes} min • {currentMovie.streamingPlatform || 'Disney+'}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {onToggleWatched && (
                <button
                  onClick={() => onToggleWatched(currentMovie.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isWatched
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {isWatched ? '✓ Watched' : 'Mark as Watched'}
                </button>
              )}

              {onSelectMovie && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectMovie(currentMovie);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all cursor-pointer"
                >
                  Full Movie Lore
                </button>
              )}
            </div>
          </div>

          {/* Doomsday Intel & Synopsis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0B121E] p-4 rounded-xl border border-slate-800/90 space-y-1.5">
              <span className="text-[11px] font-black uppercase text-emerald-400 flex items-center gap-1.5 tracking-wider">
                <Crown className="w-4 h-4 text-emerald-400" />
                Why it matters for Avengers: Doomsday
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {currentMovie.whyItMatters}
              </p>
            </div>

            <div className="bg-[#0B121E] p-4 rounded-xl border border-slate-800/90 space-y-1.5">
              <span className="text-[11px] font-black uppercase text-sky-400 flex items-center gap-1.5 tracking-wider">
                <Sparkles className="w-4 h-4 text-sky-400" />
                Incursion & Battleworld Connection
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {currentMovie.doomsdayConnection}
              </p>
            </div>
          </div>

          {/* Post Credits Lore Box (with spoiler shielding) */}
          {currentMovie.postCredit.hasScene && (
            <div className="bg-[#0A101C] p-3.5 sm:p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  Post-Credits Scene: <span className="text-amber-300 font-semibold">{currentMovie.postCredit.summary}</span>
                </span>
                <button
                  onClick={() => setShowSpoiler(!showSpoiler)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {showSpoiler ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showSpoiler ? 'Hide Lore Details' : 'Reveal Lore Details'}
                </button>
              </div>
              {showSpoiler && currentMovie.postCredit.spoilerContent && (
                <div className="text-xs text-slate-300 p-2.5 rounded bg-black/40 border border-slate-700/60 font-mono animate-in fade-in">
                  {currentMovie.postCredit.spoilerContent}
                </div>
              )}
            </div>
          )}

          {/* Related Trailers Carousel in Theater */}
          <div className="space-y-2.5 pt-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              More Multiverse Trailers & Teasers
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {relatedMovies.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => {
                    setSelectedMovie(rel);
                    setShowSpoiler(false);
                  }}
                  className="group relative rounded-lg overflow-hidden border border-slate-800 hover:border-emerald-400 transition-all text-left bg-slate-950 aspect-[16/9] cursor-pointer hover:scale-105"
                >
                  <img referrerPolicy="no-referrer"
                    src={getMovieBackdrop(rel.backdropUrl, rel.posterUrl, rel.universe)}
                    alt={rel.title}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 rounded-full bg-emerald-500 text-black shadow-lg">
                      <Play className="w-3 h-3 fill-black ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 inset-x-1.5">
                    <span className="text-[10px] font-bold text-white line-clamp-1 group-hover:text-emerald-300">
                      {rel.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
