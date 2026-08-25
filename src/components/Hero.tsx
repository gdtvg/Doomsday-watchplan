import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Plus, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  Crown,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Film,
  Sparkles
} from 'lucide-react';
import { MarvelTitle } from '../types';
import { MARVEL_TITLES } from '../data/movies';
import { useDevice } from '../hooks/useDevice';
import { playClickSound, playDoomsdayAlarmSound } from '../utils/soundEffects';
import { getMovieBackdrop, getMoviePoster } from '../utils/imageHelper';

interface HeroProps {
  onStartWatchlist: () => void;
  onActivateDoomsdayEssentials: () => void;
  doomsdayMode: boolean;
  onOpenTrailer: (movie: MarvelTitle) => void;
  onSelectMovie: (movie: MarvelTitle) => void;
}

interface SpotlightItem {
  id: string;
  title: string;
  subtitle: string;
  logline: string;
  topBadge: string;
  matchScore: string;
  ageRating: string;
  formatBadges: string[];
  bannerImage: string;
  mobileImage: string;
  trailerYoutubeId: string;
  loreTag: string;
  logoUrl?: string;
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: 'avengers-doomsday',
    title: 'AVENGERS: DOOMSDAY',
    subtitle: 'ROBERT DOWNEY JR. IST VICTOR VON DOOM',
    logline: 'Doctor Doom erhebt sich bei der Kollision paralleler Zeitlinien. Earth-616, die Fantastic Four und die X-Men müssen sich vereinen, bevor Battleworld entsteht.',
    topBadge: '🔥 EXKLUSIVE VORSCHAU • KINO MAI 2026',
    matchScore: '99% Match',
    ageRating: '16+',
    formatBadges: ['Kino-Start: 1. Mai 2026', 'Noch nicht veröffentlicht', 'Phase 6 Event', 'Comic-Con Reveal'],
    bannerImage: 'https://image.tmdb.org/t/p/original/s4v0UX1anfXm0UvloLsTTJ4v222.jpg',
    mobileImage: 'https://image.tmdb.org/t/p/w780/jzPwsojjFStf5lR5Nm07w2hH56G.jpg',
    trailerYoutubeId: 'X1aFkAkFASk',
    loreTag: 'LATVERIA & BATTLEWORLD',
    logoUrl: 'https://image.tmdb.org/t/p/w500/enJPk9TdYB4zCO1mIwiRYAb5yqY.png'
  },
  {
    id: 'deadpool-and-wolverine',
    title: 'DEADPOOL & WOLVERINE',
    subtitle: 'ANCHOR BEINGS & THE VOID',
    logline: 'With his universe facing decay, Deadpool is recruited by the TVA and teams up with a reluctant Wolverine variant in The Void.',
    topBadge: 'DISNEY+ TOP STREAM',
    matchScore: '98% Match',
    ageRating: '16+',
    formatBadges: ['4K Ultra HD', 'Dolby Vision', '5.1 Audio'],
    bannerImage: 'https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1jv8ag0.jpg',
    mobileImage: 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    trailerYoutubeId: '73_1biulkYk',
    loreTag: 'FOX X-MEN SAGA',
    logoUrl: 'https://image.tmdb.org/t/p/w500/2o48U3kMXGIqRAkKZQ3n5OTWSBy.png'
  },
  {
    id: 'fantastic-four-first-steps',
    title: 'THE FANTASTIC FOUR: FIRST STEPS',
    subtitle: 'RETRO 1960s EARTH & GALACTUS',
    logline: 'Marvel’s First Family protects an alternate 1960s Earth from Galactus before cross-dimensional forces collide with Doctor Doom.',
    topBadge: 'PHASE 6 PRELUDE • KINO JULI 2025',
    matchScore: '97% Match',
    ageRating: '12+',
    formatBadges: ['4K Ultra HD', 'IMAX 2025', 'Doomsday Prelude'],
    bannerImage: 'https://image.tmdb.org/t/p/original/8I37NtDffNV7AZlDa7uDvvqhovU.jpg',
    mobileImage: 'https://image.tmdb.org/t/p/w780/8I37NtDffNV7AZlDa7uDvvqhovU.jpg',
    trailerYoutubeId: 'pAsmrKyMqaA',
    loreTag: 'COUNCIL OF REEDS',
    logoUrl: 'https://image.tmdb.org/t/p/w500/hpvf0d8XQ2Ty31CAKV9u8FNrZmD.png'
  },
  {
    id: 'loki-s2',
    title: 'LOKI (SEASON 2)',
    subtitle: 'GOD OF STORIES & YGGDRASIL',
    logline: 'Loki ascends the throne at the center of time, holding infinite branching timelines together as the living Multiverse Tree.',
    topBadge: 'ORIGINAL SERIES',
    matchScore: '99% Match',
    ageRating: '12+',
    formatBadges: ['4K Ultra HD', 'Dolby Atmos'],
    bannerImage: 'https://image.tmdb.org/t/p/original/84XPpjGvxNyExjSuLQe0URioioB.jpg',
    mobileImage: 'https://image.tmdb.org/t/p/w780/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg',
    trailerYoutubeId: 'dug56u8NN7g',
    loreTag: 'TEMPORAL LORE',
    logoUrl: 'https://image.tmdb.org/t/p/w500/6yb7XUr6l7ctCwf8OJ9NN5brQ53.png'
  },
  {
    id: 'doctor-strange-multiverse-madness',
    title: 'DOCTOR STRANGE IN THE MULTIVERSE OF MADNESS',
    subtitle: 'INCURSIONS & EARTH-838',
    logline: 'Doctor Strange traverses collapsing realities with America Chavez, discovering how universe collisions trigger catastrophic Incursions.',
    topBadge: 'INCURSION CORE',
    matchScore: '96% Match',
    ageRating: '12+',
    formatBadges: ['4K Ultra HD', 'IMAX Enhanced'],
    bannerImage: 'https://image.tmdb.org/t/p/original/AdyXEuXzQyyMprk4xkWnFSDVvI5.jpg',
    mobileImage: 'https://image.tmdb.org/t/p/w780/9Gtg2DzBhmYamXBS1oKAhiwbBKS.jpg',
    trailerYoutubeId: 'aWzlQ2N6qqg',
    loreTag: 'INCURSION CRISIS',
    logoUrl: 'https://image.tmdb.org/t/p/w500/omz9LWkZgkAEpHeOOdTzSevwG6I.png'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onStartWatchlist,
  onActivateDoomsdayEssentials,
  doomsdayMode,
  onOpenTrailer,
  onSelectMovie,
}) => {
  const { isMobile } = useDevice();
  const [shuffledItems, setShuffledItems] = useState<SpotlightItem[]>([]);

  useEffect(() => {
    // Keep Doomsday first, randomize the rest
    const first = SPOTLIGHT_ITEMS[0];
    const rest = [...SPOTLIGHT_ITEMS.slice(1)];
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    setShuffledItems([first, ...rest]);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play trailer configuration (only auto-start on desktop with smooth delay)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(!isMobile);
  const [autoPlayDelaySeconds, setAutoPlayDelaySeconds] = useState(2);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset video state when active slide changes
  useEffect(() => {
    setIsVideoPlaying(false);

    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    if (!autoPlayEnabled || isMobile) return;

    countdownTimerRef.current = setTimeout(() => {
      setIsVideoPlaying(true);
    }, autoPlayDelaySeconds * 1000);

    return () => {
      if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
    };
  }, [activeIndex, autoPlayEnabled, autoPlayDelaySeconds, isMobile]);

  // Rotate spotlight slides if not playing video and not paused
  useEffect(() => {
    if (isPaused || isVideoPlaying || shuffledItems.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % shuffledItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isVideoPlaying, shuffledItems.length]);

  if (shuffledItems.length === 0) return null;

  const current = shuffledItems[activeIndex];
  const matchedMovie = MARVEL_TITLES.find((m) => m.id === current.id) || MARVEL_TITLES[0];
  const youtubeTrailerId = current.trailerYoutubeId || matchedMovie?.trailerYoutubeId || 'nW948Va-l10';

  const handlePreviousSlide = () => {
    playClickSound();
    setActiveIndex((prev) => (prev - 1 + shuffledItems.length) % shuffledItems.length);
  };

  const handleNextSlide = () => {
    playClickSound();
    setActiveIndex((prev) => (prev + 1) % shuffledItems.length);
  };

  return (
    <section 
      id="streaming-billboard"
      className="relative w-full overflow-hidden bg-[#040714] text-white h-[75vh] sm:h-[82vh] lg:h-[86vh] min-h-[580px] max-h-[920px] flex items-end border-b border-slate-800/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Backdrop Images with Smooth Cross-Fade */}
      {shuffledItems.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img referrerPolicy="no-referrer"
            src={isMobile ? getMoviePoster(item.mobileImage, 'DEFAULT', item.id) : getMovieBackdrop(item.bannerImage, item.mobileImage, 'DEFAULT')}
            alt={item.title}
            className="w-full h-full object-cover object-center filter brightness-90"
          />
        </div>
      ))}

      {/* 2. Embedded Video Auto-Play Trailer (Cinematic Fullscreen Fill) */}
      {isVideoPlaying && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black animate-in fade-in duration-700">
          {/* YouTube Embed Container with full aspect fill */}
          <div className="relative w-full h-full pointer-events-none flex items-center justify-center">
            <iframe
              key={`${youtubeTrailerId}-${isAudioMuted ? 'muted' : 'unmuted'}`}
              src={`https://www.youtube-nocookie.com/embed/${youtubeTrailerId}?autoplay=1&mute=${isAudioMuted ? '1' : '0'}&controls=0&modestbranding=1&loop=1&playlist=${youtubeTrailerId}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
              title="Hero Background Trailer"
              className="w-[140vw] h-[140vh] min-w-[100%] min-h-[100%] pointer-events-none scale-125 transition-opacity duration-1000 object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      )}

      {/* Netflix / Disney+ Widescreen Vignettes (Subtle when video is playing to maximize trailer clarity) */}
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-10 ${
        isVideoPlaying 
          ? 'bg-gradient-to-t from-[#040714] via-[#040714]/50 to-transparent' 
          : 'bg-gradient-to-t from-[#040714] via-[#040714]/70 to-transparent'
      }`} />
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-10 ${
        isVideoPlaying
          ? 'bg-gradient-to-r from-[#040714]/80 via-transparent to-transparent w-full sm:w-2/3'
          : 'bg-gradient-to-r from-[#040714] via-[#040714]/80 to-transparent w-full md:w-3/4'
      }`} />

      {/* 3. Top-Right Discreet Audio & Pause Controls when Video is playing */}
      {isVideoPlaying && (
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-lg flex items-center gap-1.5 ${
              !isAudioMuted 
                ? 'bg-emerald-500 text-black border-emerald-400 font-bold text-xs' 
                : 'bg-black/80 hover:bg-black text-slate-300 border-slate-700 text-xs'
            }`}
            title={isAudioMuted ? "Ton anstellen" : "Stummschalten"}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-black" />}
            <span className="hidden sm:inline font-bold uppercase tracking-wider text-[10px]">
              {isAudioMuted ? 'Ton an' : 'Sound aktiv'}
            </span>
          </button>

          <button
            onClick={() => setIsVideoPlaying(false)}
            className="p-2 rounded-full bg-black/80 hover:bg-black border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
            title="Video stoppen & Bild anzeigen"
          >
            <Film className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4. Billboard Content Info Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 lg:pb-12 w-full flex flex-col justify-end">
        <div className="max-w-2xl lg:max-w-3xl space-y-2.5">
          
          {/* Subtle Tag */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#E23636] text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider">
              {current.topBadge}
            </span>
            <span className="text-slate-300 font-semibold text-xs">
              {current.ageRating}
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline font-bold">
              • {current.loreTag}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-0.5">
            {current.logoUrl ? (
              <img 
                src={current.logoUrl} 
                alt={current.title}
                className="h-20 sm:h-28 md:h-36 lg:h-44 object-contain object-left drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter transition-all"
                referrerPolicy="no-referrer"
              />
            ) : (
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-white drop-shadow-lg leading-tight">
                {current.title}
              </h1>
            )}
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-300 uppercase mt-2">
              {current.subtitle}
            </p>
          </div>

          {/* Concise Synopsis */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl leading-relaxed font-normal">
            {current.logline}
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              id="hero-play-trailer-btn"
              onClick={() => onOpenTrailer(matchedMovie)}
              className="px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-white hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Trailer ansehen</span>
            </button>

            <button
              onClick={() => onSelectMovie(matchedMovie)}
              className="px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Info className="w-4 h-4 text-white" />
              <span>Details</span>
            </button>

            <button
              id="hero-start-watchlist-btn"
              onClick={onStartWatchlist}
              className="px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Watchlist</span>
            </button>

            <button
              id="hero-doomsday-quick-toggle"
              onClick={() => {
                playDoomsdayAlarmSound();
                onActivateDoomsdayEssentials();
              }}
              className={`px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                doomsdayMode 
                  ? 'bg-emerald-500 text-black border-emerald-400 font-black shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                  : 'bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border-emerald-600/80'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>{doomsdayMode ? 'Doomsday: Aktiv' : 'Doomsday 32'}</span>
            </button>

            {/* Trailer Settings Modal Trigger */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Trailer Auto-Play Einstellungen"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Indicators & Arrows */}
        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {shuffledItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex 
                    ? 'w-8 bg-emerald-400' 
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={item.title}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePreviousSlide}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-slate-700 text-white transition-all cursor-pointer"
              title="Vorheriger"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-slate-700 text-white transition-all cursor-pointer"
              title="Nächster"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-Play Trailer Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1A1D29] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-400" />
                <h3 className="font-black uppercase tracking-wider text-base text-white">
                  Billboard Video Einstellungen
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              {/* Toggle AutoPlay */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Auto-Play Trailer</div>
                  <div className="text-xs text-slate-400">Automatische Trailer-Wiedergabe im Banner</div>
                </div>
                <button
                  onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    autoPlayEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    autoPlayEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Delay Slider */}
              {autoPlayEnabled && (
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Startverzögerung</span>
                    <span className="font-mono text-emerald-400 font-bold">{autoPlayDelaySeconds} Sekunden</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.5"
                    value={autoPlayDelaySeconds}
                    onChange={(e) => setAutoPlayDelaySeconds(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>1s (Sofort)</span>
                    <span>3s (Standard)</span>
                    <span>6s (Langsam)</span>
                  </div>
                </div>
              )}

              {/* Sound default */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div>
                  <div className="font-bold text-white">Standardmäßig Stumm</div>
                  <div className="text-xs text-slate-400">Audio startet ohne Ton (Browser-Vorgabe)</div>
                </div>
                <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/40">
                  AKTIV
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs tracking-wider cursor-pointer transition-all"
              >
                Fertig
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
