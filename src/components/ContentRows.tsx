import React, { useRef } from 'react';
import { MarvelTitle, UserTitleData } from '../types';
import { MovieCard } from './MovieCard';
import { 
  Crown, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Clock, 
  Film, 
  Flame, 
  Zap 
} from 'lucide-react';
import { useDevice } from '../hooks/useDevice';

interface ContentRowsProps {
  titles: MarvelTitle[];
  userData: Record<string, UserTitleData>;
  onToggleWatched: (id: string) => void;
  onTogglePostCredit: (id: string) => void;
  onSetRating: (id: string, rating: number) => void;
  onToggleFavorite: (id: string) => void;
  onSelectMovie: (movie: MarvelTitle) => void;
  onOpenTrailer?: (movie: MarvelTitle) => void;
}

interface HorizontalRowProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: MarvelTitle[];
  userData: Record<string, UserTitleData>;
  onToggleWatched: (id: string) => void;
  onTogglePostCredit: (id: string) => void;
  onSetRating: (id: string, rating: number) => void;
  onToggleFavorite: (id: string) => void;
  onSelectMovie: (movie: MarvelTitle) => void;
  onOpenTrailer?: (movie: MarvelTitle) => void;
  isTop10?: boolean;
}

const HorizontalRow: React.FC<HorizontalRowProps> = ({
  title,
  subtitle,
  icon,
  items,
  userData,
  onToggleWatched,
  onSetRating,
  onToggleFavorite,
  onSelectMovie,
  onOpenTrailer,
  isTop10 = false,
}) => {
  const { isMobile } = useDevice();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2.5 py-3 sm:py-4">
      {/* Row Header */}
      <div className="flex items-end justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="text-sm sm:text-base lg:text-lg font-black text-slate-100 tracking-tight flex items-center gap-2">
              <span>{title}</span>
              {isTop10 && (
                <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500 text-black tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  TOP 10
                </span>
              )}
            </h3>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              {items.length}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 font-normal">
            {subtitle}
          </p>
        </div>

        {/* Desktop Carousel Controls */}
        {!isMobile && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
              title="Nach links"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
              title="Nach rechts"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Rail */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 no-scrollbar snap-x snap-mandatory py-2 scroll-smooth"
      >
        {items.map((movie, index) => {
          if (isTop10) {
            const rank = index + 1;
            return (
              <div
                key={movie.id}
                className="relative flex items-center min-w-[210px] sm:min-w-[230px] max-w-[250px] flex-shrink-0 snap-start group/top10 pl-8 sm:pl-10"
              >
                {/* Large Netflix Style Rank Number */}
                <span className="absolute left-0 bottom-6 text-6xl sm:text-7xl font-black text-transparent stroke-number select-none pointer-events-none z-0">
                  {rank}
                </span>

                {/* Movie Card */}
                <div className="w-full relative z-10">
                  <MovieCard
                    movie={movie}
                    userData={userData[movie.id]}
                    onToggleWatched={onToggleWatched}
                    onTogglePostCredit={() => {}}
                    onSetRating={onSetRating}
                    onToggleFavorite={onToggleFavorite}
                    onSelectMovie={onSelectMovie}
                    onOpenTrailer={onOpenTrailer}
                    rankNumber={rank}
                    layout="poster"
                  />
                </div>
              </div>
            );
          }

          return (
            <div
              key={movie.id}
              className="min-w-[165px] sm:min-w-[190px] max-w-[210px] flex-shrink-0 snap-start"
            >
              <MovieCard
                movie={movie}
                userData={userData[movie.id]}
                onToggleWatched={onToggleWatched}
                onTogglePostCredit={() => {}}
                onSetRating={onSetRating}
                onToggleFavorite={onToggleFavorite}
                onSelectMovie={onSelectMovie}
                onOpenTrailer={onOpenTrailer}
                layout="poster"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ContentRows: React.FC<ContentRowsProps> = ({
  titles,
  userData,
  onToggleWatched,
  onSetRating,
  onToggleFavorite,
  onSelectMovie,
  onOpenTrailer,
}) => {
  // Top 10 in Multiverse Today (Essential Doomsday Titles ranked)
  const top10Doomsday = titles
    .filter(t => t.priority === 'ESSENTIAL' || t.priority === 'HIGHLY_RELEVANT')
    .slice(0, 10);

  // Continue Watching / Next Up
  const continueWatching = titles.filter(t => !userData[t.id]?.watched && !t.isUpcoming).slice(0, 8);

  // Doctor Doom Essentials
  const doomsdayEssentials = titles.filter(t => t.priority === 'ESSENTIAL');

  // TVA, Multiverse & Incursions
  const multiverseAndIncursions = titles.filter(t => 
    t.tags.includes('Incursions') || 
    t.tags.includes('Multiverse') || 
    t.tags.includes('TVA') || 
    t.tags.includes('Anchor Being')
  );

  // Fantastic Four & First Family
  const fantasticFourTitles = titles.filter(t => 
    t.universe === 'FANTASTIC FOUR' || 
    t.tags.includes('Reed Richards') || 
    t.tags.includes('First Steps')
  );

  // Fox X-Men Universe
  const mutantTitles = titles.filter(t => 
    t.universe === 'X-MEN' || 
    t.tags.includes('Mutants') || 
    t.tags.includes('Fox Universe')
  );

  // Spider-Man & Multiversal Variants
  const spiderTitles = titles.filter(t => 
    t.universe === 'SPIDER-MAN' || 
    t.tags.includes('Spider-Verse')
  );

  // Upcoming Phase 6 Releases
  const upcomingTitles = titles.filter(t => t.isUpcoming);

  return (
    <div id="content-rows-container" className="space-y-4 sm:space-y-6 py-2 sm:py-4 bg-[#05080C]">
      
      {/* Top 10 Row */}
      <HorizontalRow
        title="Top 10 Multiversum Empfehlungen"
        subtitle="Die wichtigsten Filme & Serien auf dem Weg zu Avengers: Doomsday"
        icon={<Crown className="w-5 h-5 text-emerald-400" />}
        items={top10Doomsday}
        userData={userData}
        onToggleWatched={onToggleWatched}
        onTogglePostCredit={() => {}}
        onSetRating={onSetRating}
        onToggleFavorite={onToggleFavorite}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
        isTop10={true}
      />

      {/* Weiterschauen */}
      {continueWatching.length > 0 && (
        <HorizontalRow
          title="Deine Watchlist: Als Nächstes"
          subtitle="Setze deinen Marvel-Marathon nahtlos fort"
          icon={<Clock className="w-5 h-5 text-amber-400" />}
          items={continueWatching}
          userData={userData}
          onToggleWatched={onToggleWatched}
          onTogglePostCredit={() => {}}
          onSetRating={onSetRating}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
          onOpenTrailer={onOpenTrailer}
        />
      )}

      {/* Doomsday Pflicht */}
      <HorizontalRow
        title="Doctor Doom Pflichtprogramm"
        subtitle="Unerlässliche Grundlagen für Incursions und Doctor Dooms Aufstieg"
        icon={<Flame className="w-5 h-5 text-emerald-400" />}
        items={doomsdayEssentials}
        userData={userData}
        onToggleWatched={onToggleWatched}
        onTogglePostCredit={() => {}}
        onSetRating={onSetRating}
        onToggleFavorite={onToggleFavorite}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
      />

      {/* TVA & Incursions */}
      <HorizontalRow
        title="TVA, Die Leere & Multiversum"
        subtitle="Loki, Yggdrasil, Ankerwesen und kollidierende Zeitstrahlen"
        icon={<Sparkles className="w-5 h-5 text-purple-400" />}
        items={multiverseAndIncursions}
        userData={userData}
        onToggleWatched={onToggleWatched}
        onTogglePostCredit={() => {}}
        onSetRating={onSetRating}
        onToggleFavorite={onToggleFavorite}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
      />

      {/* Fantastic Four & First Family */}
      <HorizontalRow
        title="Fantastic Four & Council of Reeds"
        subtitle="Reed Richards, Galactus und die Rivalität mit Doctor Doom"
        icon={<Layers className="w-5 h-5 text-sky-400" />}
        items={fantasticFourTitles}
        userData={userData}
        onToggleWatched={onToggleWatched}
        onTogglePostCredit={() => {}}
        onSetRating={onSetRating}
        onToggleFavorite={onToggleFavorite}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
      />

      {/* Mutants & Fox X-Men */}
      <HorizontalRow
        title="Fox X-Men & Mutanten Legacy"
        subtitle="Earth-10005, Logan, Deadpool, Weapon X und die Mutanten-Kollision"
        icon={<Zap className="w-5 h-5 text-amber-400" />}
        items={mutantTitles}
        userData={userData}
        onToggleWatched={onToggleWatched}
        onTogglePostCredit={() => {}}
        onSetRating={onSetRating}
        onToggleFavorite={onToggleFavorite}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
      />

      {/* Spider-Man Multiverse */}
      <HorizontalRow
        title="Spider-Man & Spider-Verse"
        subtitle="Das Netz des Lebens, Dimensionssprünge und vertraute Schurken"
        icon={<Film className="w-5 h-5 text-indigo-400" />}
        items={spiderTitles}
        userData={userData}
        onToggleWatched={onToggleWatched}
        onTogglePostCredit={() => {}}
        onSetRating={onSetRating}
        onToggleFavorite={onToggleFavorite}
        onSelectMovie={onSelectMovie}
        onOpenTrailer={onOpenTrailer}
      />

      {/* Upcoming Slate */}
      {upcomingTitles.length > 0 && (
        <HorizontalRow
          title="Kommende Kinostarts: Phase 6"
          subtitle="Die nächsten Marvel Studios Großprojekte vor Avengers: Doomsday"
          icon={<Flame className="w-5 h-5 text-rose-400" />}
          items={upcomingTitles}
          userData={userData}
          onToggleWatched={onToggleWatched}
          onTogglePostCredit={() => {}}
          onSetRating={onSetRating}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
          onOpenTrailer={onOpenTrailer}
        />
      )}
    </div>
  );
};
