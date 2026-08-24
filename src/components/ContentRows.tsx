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
                <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white text-black tracking-wider shadow-sm">
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
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
              title="Nach links"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
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
  const continueWatching = titles.filter(t => !userData[t.id]?.watched && (!t.releaseDate || new Date(t.releaseDate).getTime() < Date.now())).slice(0, 8);

  // Neu auf Disney+ & Aktuell (Phase 5)
  const phase5 = titles.filter(t => t.phase === 'Phase 5' && (!t.releaseDate || new Date(t.releaseDate).getTime() < Date.now())).sort((a,b) => (b.releaseOrderIndex || 0) - (a.releaseOrderIndex || 0));

  // Kommende Kinostarts
  const upcomingTitles = titles.filter(t => t.releaseDate && new Date(t.releaseDate).getTime() > Date.now());

  // Infinity Saga (Phase 1-3)
  const infinitySaga = titles.filter(t => ['Phase 1', 'Phase 2', 'Phase 3'].includes(t.phase)).sort((a,b) => (a.releaseOrderIndex || 0) - (b.releaseOrderIndex || 0));

  // MCU Phase 4
  const phase4 = titles.filter(t => t.phase === 'Phase 4').sort((a,b) => (a.releaseOrderIndex || 0) - (b.releaseOrderIndex || 0));

  // Spider-Verse & Sony
  const spiderTitles = titles.filter(t => t.universe === 'SPIDER-MAN' || t.tags.includes('Spider-Verse'));

  // X-Men Legacy
  const mutantTitles = titles.filter(t => t.universe === 'X-MEN' || t.tags.includes('Mutants') || t.tags.includes('Fox Universe'));

  // Fantastic Four
  const fantasticFourTitles = titles.filter(t => t.universe === 'FANTASTIC FOUR' || t.tags.includes('Reed Richards') || t.tags.includes('First Steps'));

  return (
    <div id="content-rows-container" className="space-y-4 sm:space-y-6 py-2 sm:py-4 bg-[#040714]">
      
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

      {/* Neu auf Disney+ / Phase 5 */}
      {phase5.length > 0 && (
        <HorizontalRow
          title="Marvel Cinematic Universe: Phase 5"
          subtitle="Die neuesten Filme und Serien des MCU"
          icon={<Sparkles className="w-5 h-5 text-purple-400" />}
          items={phase5}
          userData={userData}
          onToggleWatched={onToggleWatched}
          onTogglePostCredit={() => {}}
          onSetRating={onSetRating}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
          onOpenTrailer={onOpenTrailer}
        />
      )}

      {/* Infinity Saga */}
      {infinitySaga.length > 0 && (
        <HorizontalRow
          title="The Infinity Saga"
          subtitle="Phase 1-3: Die Avengers und Thanos"
          icon={<Crown className="w-5 h-5 text-amber-500" />}
          items={infinitySaga}
          userData={userData}
          onToggleWatched={onToggleWatched}
          onTogglePostCredit={() => {}}
          onSetRating={onSetRating}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
          onOpenTrailer={onOpenTrailer}
        />
      )}

      {/* Phase 4 */}
      {phase4.length > 0 && (
        <HorizontalRow
          title="Marvel Cinematic Universe: Phase 4"
          subtitle="Der Beginn der Multiverse Saga"
          icon={<Layers className="w-5 h-5 text-sky-400" />}
          items={phase4}
          userData={userData}
          onToggleWatched={onToggleWatched}
          onTogglePostCredit={() => {}}
          onSetRating={onSetRating}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
          onOpenTrailer={onOpenTrailer}
        />
      )}

      {/* Spider-Man Multiverse */}
      {spiderTitles.length > 0 && (
        <HorizontalRow
          title="Spider-Man & Spider-Verse"
          subtitle="Das Netz des Lebens und Sony's Spider-Man Universe"
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
      )}

      {/* Mutants & Fox X-Men */}
      {mutantTitles.length > 0 && (
        <HorizontalRow
          title="X-Men Legacy"
          subtitle="Fox-Universum und die Mutanten-Kollision"
          icon={<Zap className="w-5 h-5 text-yellow-400" />}
          items={mutantTitles}
          userData={userData}
          onToggleWatched={onToggleWatched}
          onTogglePostCredit={() => {}}
          onSetRating={onSetRating}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
          onOpenTrailer={onOpenTrailer}
        />
      )}

      {/* Fantastic Four & First Family */}
      {fantasticFourTitles.length > 0 && (
        <HorizontalRow
          title="Fantastic Four"
          subtitle="Marvel's First Family"
          icon={<Layers className="w-5 h-5 text-blue-400" />}
          items={fantasticFourTitles}
          userData={userData}
          onToggleWatched={onToggleWatched}
          onTogglePostCredit={() => {}}
          onSetRating={onSetRating}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
          onOpenTrailer={onOpenTrailer}
        />
      )}

      {/* Upcoming Slate */}
      {upcomingTitles.length > 0 && (
        <HorizontalRow
          title="Kommende Kinostarts"
          subtitle="Die nächsten Marvel Studios Großprojekte"
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
