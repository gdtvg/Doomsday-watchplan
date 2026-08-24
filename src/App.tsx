import React, { useState, useEffect } from 'react';
import { useWatchlist } from './hooks/useWatchlist';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandHubs } from './components/BrandHubs';
import { CountdownTimer } from './components/CountdownTimer';
import { StatusDashboard } from './components/StatusDashboard';
import { DoomsdayModeBanner } from './components/DoomsdayModeBanner';
import { ContentRows } from './components/ContentRows';
import { WatchlistView } from './components/WatchlistView';
import { WatchOrderView } from './components/WatchOrderView';
import { ViewingPlanner } from './components/ViewingPlanner';
import { UniversesView } from './components/UniversesView';
import { ProgressJourneyView } from './components/ProgressJourneyView';
import { MarvelNewsView } from './components/MarvelNewsView';
import { MovieDetailModal } from './components/MovieDetailModal';
import { TrailerModal } from './components/TrailerModal';
import { AboutModal } from './components/AboutModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DoomsdayTierListView } from './components/DoomsdayTierListView';
import { MultiverseIncursionRadar } from './components/MultiverseIncursionRadar';
import { Footer } from './components/Footer';
import { MarvelTitle, UniverseType } from './types';
import { playClickSound, playWatchedChime } from './utils/soundEffects';
import { findMovieByInfoQuery } from './data/movies';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedMovie, setSelectedMovie] = useState<MarvelTitle | null>(null);
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState<MarvelTitle | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const {
    userData,
    stats,
    filteredTitles,
    allTitles,
    doomsdayMode,
    setDoomsdayMode,
    spoilerUnlocked,
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
    watchOrderRoute,
    setWatchOrderRoute,
    watchOrderSort,
    setWatchOrderSort,
    plannerHoursPerWeek,
    setPlannerHoursPerWeek,
    plannerTargetDate,
    setPlannerTargetDate,
    toggleWatched,
    togglePostCredit,
    setRating,
    toggleFavorite,
    setNotes,
    markAllAsWatched,
    resetAllProgress,
    exportDataJSON,
    importDataJSON
  } = useWatchlist();

  // Dulo-style URL parameter reader on mount and on popstate (?info=movie:969681 or ?movie=id)
  useEffect(() => {
    const handleUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const infoParam = params.get('info') || params.get('movie') || params.get('id');
      if (infoParam) {
        const found = findMovieByInfoQuery(infoParam);
        if (found) {
          setSelectedMovie(found);
        }
      }
    };

    handleUrlParams();
    window.addEventListener('popstate', handleUrlParams);
    return () => window.removeEventListener('popstate', handleUrlParams);
  }, []);

  // Sync selected movie to browser URL (?info=movie:969681) like dulo.cx
  const handleSelectMovie = (movie: MarvelTitle | null) => {
    setSelectedMovie(movie);
    if (movie) {
      const paramVal = movie.tmdbId ? `movie:${movie.tmdbId}` : `movie:${movie.id}`;
      const newUrl = `${window.location.pathname}?info=${paramVal}`;
      window.history.replaceState(null, '', newUrl);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K / '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation and Action Handlers
  const handleStartWatchlist = () => {
    playClickSound();
    setActiveTab('watchlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleActivateDoomsdayEssentials = () => {
    playClickSound();
    setDoomsdayMode(true);
    setActiveTab('watchlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUniverseSelect = (universe: UniverseType | 'ALL') => {
    playClickSound();
    setActiveUniverse(universe);
    setActiveTab('watchlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#05080C] text-[#F5F5F5] flex flex-col font-sans selection:bg-emerald-600 selection:text-white pb-24 xl:pb-0">
      {/* Top Navbar (Disney+ / Netflix Translucent Glass Bar) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        doomsdayMode={doomsdayMode}
        onToggleDoomsdayMode={() => setDoomsdayMode(!doomsdayMode)}
        completionPercentage={stats.completionPercentage}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Doomsday Mode Active Banner */}
      {doomsdayMode && (
        <DoomsdayModeBanner
          activeCount={filteredTitles.length}
          totalHours={stats.totalHours}
          onDeactivate={() => setDoomsdayMode(false)}
          onMarkAllVisibleWatched={() => markAllAsWatched(filteredTitles.map(t => t.id))}
        />
      )}

      {/* Main Content Sections based on Active Tab */}
      <main className="flex-1">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-2">
            {/* Cinematic Hero Billboard */}
            <Hero
              onStartWatchlist={handleStartWatchlist}
              onActivateDoomsdayEssentials={handleActivateDoomsdayEssentials}
              doomsdayMode={doomsdayMode}
              onOpenTrailer={(movie) => setSelectedTrailerMovie(movie)}
              onSelectMovie={(movie) => setSelectedMovie(movie)}
            />

            {/* Release Countdown to Avengers: Doomsday */}
            <CountdownTimer />

            {/* Clean Category / Universe Filter Chips */}
            <BrandHubs
              onSelectUniverse={handleUniverseSelect}
              activeUniverse={activeUniverse}
              onSelectDoomsdayFocus={() => {
                setDoomsdayMode(true);
                setActiveTab('watchlist');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              doomsdayMode={doomsdayMode}
            />

            {/* Streaming Horizontal Movie Rows */}
            <ContentRows
              titles={allTitles}
              userData={userData}
              onToggleWatched={toggleWatched}
              onTogglePostCredit={togglePostCredit}
              onSetRating={setRating}
              onToggleFavorite={toggleFavorite}
              onSelectMovie={(movie) => handleSelectMovie(movie)}
              onOpenTrailer={(movie) => setSelectedTrailerMovie(movie)}
            />
          </div>
        )}

        {/* TAB 2: WATCHLIST & LIBRARY */}
        {activeTab === 'watchlist' && (
          <div className="space-y-0">
            <WatchlistView
              titles={filteredTitles}
              userData={userData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeUniverse={activeUniverse}
              setActiveUniverse={setActiveUniverse}
              activePriority={activePriority}
              setActivePriority={setActivePriority}
              activeFormat={activeFormat}
              setActiveFormat={setActiveFormat}
              activeWatchStatus={activeWatchStatus}
              setActiveWatchStatus={setActiveWatchStatus}
              doomsdayMode={doomsdayMode}
              onToggleDoomsdayMode={() => setDoomsdayMode(!doomsdayMode)}
              onToggleWatched={toggleWatched}
              onTogglePostCredit={togglePostCredit}
              onSetRating={setRating}
              onToggleFavorite={toggleFavorite}
              onSelectMovie={(movie) => handleSelectMovie(movie)}
              onOpenTrailer={(movie) => setSelectedTrailerMovie(movie)}
              onMarkAllVisibleWatched={markAllAsWatched}
            />
          </div>
        )}

        {/* TAB 3: DOOMSDAY TIER LIST */}
        {activeTab === 'tierlist' && (
          <div className="space-y-0">
            <DoomsdayTierListView
              userData={userData}
              onToggleWatched={toggleWatched}
              onToggleFavorite={toggleFavorite}
              onSetRating={setRating}
              onSelectMovie={(movie) => handleSelectMovie(movie)}
              onOpenTrailer={(movie) => setSelectedTrailerMovie(movie)}
            />
          </div>
        )}

        {/* TAB 4: INCURSION RADAR MAP */}
        {activeTab === 'radar' && (
          <div className="space-y-0">
            <MultiverseIncursionRadar
              userData={userData}
              onToggleWatched={toggleWatched}
              onSelectMovie={(movie) => handleSelectMovie(movie)}
              onOpenTrailer={(movie) => setSelectedTrailerMovie(movie)}
            />
          </div>
        )}

        {/* TAB 5: WATCH ORDER */}
        {activeTab === 'order' && (
          <div className="space-y-0">
            <WatchOrderView
              titles={allTitles}
              userData={userData}
              watchOrderRoute={watchOrderRoute}
              setWatchOrderRoute={setWatchOrderRoute}
              watchOrderSort={watchOrderSort}
              setWatchOrderSort={setWatchOrderSort}
              onToggleWatched={toggleWatched}
              onSelectMovie={(movie) => handleSelectMovie(movie)}
            />
          </div>
        )}

        {/* TAB 6: MULTIVERSE MARATHON PLANNER */}
        {activeTab === 'planner' && (
          <div className="space-y-0">
            <ViewingPlanner
              stats={stats}
              plannerHoursPerWeek={plannerHoursPerWeek}
              setPlannerHoursPerWeek={setPlannerHoursPerWeek}
              plannerTargetDate={plannerTargetDate}
              setPlannerTargetDate={setPlannerTargetDate}
              onNavigateToWatchlist={() => {
                setActiveTab('watchlist');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* TAB 7: UNIVERSES BREAKDOWN */}
        {activeTab === 'universes' && (
          <div className="space-y-0">
            <UniversesView
              onSelectUniverseFilter={handleUniverseSelect}
            />
          </div>
        )}

        {/* TAB 8: PROGRESS & ACHIEVEMENTS */}
        {activeTab === 'progress' && (
          <div className="space-y-0">
            <ProgressJourneyView
              stats={stats}
              onExportJSON={exportDataJSON}
              onImportJSON={importDataJSON}
              onResetAllProgress={resetAllProgress}
            />
          </div>
        )}

        {/* TAB 9: INTEL & NEWS */}
        {activeTab === 'news' && (
          <div className="space-y-0">
            <MarvelNewsView />
          </div>
        )}
      </main>

      {/* Global Search Modal Overlay (Cmd+K / Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        userData={userData}
        onToggleWatched={toggleWatched}
        onSelectMovie={(movie) => handleSelectMovie(movie)}
        onOpenTrailer={(movie) => setSelectedTrailerMovie(movie)}
      />

      {/* Trailer Video Player Modal */}
      <TrailerModal
        movie={selectedTrailerMovie}
        isOpen={!!selectedTrailerMovie}
        onClose={() => setSelectedTrailerMovie(null)}
        onToggleWatched={toggleWatched}
        onSelectMovie={(movie) => handleSelectMovie(movie)}
        isWatched={selectedTrailerMovie ? !!userData[selectedTrailerMovie.id]?.watched : false}
      />

      {/* Global Lore & Movie Details Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        userData={selectedMovie ? userData[selectedMovie.id] : undefined}
        globalSpoilerUnlocked={spoilerUnlocked}
        onClose={() => handleSelectMovie(null)}
        onToggleWatched={toggleWatched}
        onTogglePostCredit={togglePostCredit}
        onSetRating={setRating}
        onToggleFavorite={toggleFavorite}
        onSaveNotes={setNotes}
        onOpenTrailer={(movie) => setSelectedTrailerMovie(movie)}
        onSelectMovie={(movie) => handleSelectMovie(movie)}
      />

      {/* Architecture & About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
      />
    </div>
  );
}
