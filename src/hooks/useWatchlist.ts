import { useState, useEffect, useMemo } from 'react';
import { MARVEL_TITLES } from '../data/movies';
import { APP_CONFIG, DOOMSDAY_RELEASE_DATE } from '../data/config';
import { 
  MarvelTitle, 
  UserTitleData, 
  UniverseType, 
  PriorityLevel, 
  MediaType,
  WatchStatus,
  StreamingProviderName
} from '../types';

export interface WatchlistStats {
  totalTitles: number;
  watchedTitles: number;
  inProgressTitles: number;
  remainingTitles: number;
  totalHours: number;
  watchedHours: number;
  remainingHours: number;
  totalEssential: number;
  watchedEssential: number;
  remainingEssential: number;
  completionPercentage: number;
  essentialCompletionPercentage: number;
  moviesWatchedCount: number;
  seriesWatchedCount: number;
  averageRating: number;
  favoriteTitles: MarvelTitle[];
  inProgressList: MarvelTitle[];
  universeStats: Record<string, { total: number; watched: number; hours: number; watchedHours: number; percentage: number }>;
}

export function useWatchlist() {
  // --- Persistent User Data ---
  const [userData, setUserData] = useState<Record<string, UserTitleData>>(() => {
    try {
      const stored = localStorage.getItem(APP_CONFIG.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading watchlist from localStorage', e);
    }
    return {};
  });

  // --- UI & Filter Preferences ---
  const [doomsdayMode, setDoomsdayMode] = useState<boolean>(() => {
    return localStorage.getItem('marvel_doomsday_mode') === 'true';
  });

  const [spoilerUnlocked, setSpoilerUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('marvel_spoiler_unlocked') === 'true';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeUniverse, setActiveUniverse] = useState<UniverseType | 'ALL'>('ALL');
  const [activePriority, setActivePriority] = useState<PriorityLevel | 'ALL'>('ALL');
  const [activeFormat, setActiveFormat] = useState<MediaType | 'ALL'>('ALL');
  const [activeWatchStatus, setActiveWatchStatus] = useState<'ALL' | 'UNWATCHED' | 'IN_PROGRESS' | 'WATCHED' | 'REWATCH'>('ALL');
  const [activeProviderFilter, setActiveProviderFilter] = useState<StreamingProviderName | 'ALL'>('ALL');

  // Watch Order View state
  const [watchOrderRoute, setWatchOrderRoute] = useState<'A_MCU' | 'B_DOOMSDAY' | 'C_MULTIVERSE'>('B_DOOMSDAY');
  const [watchOrderSort, setWatchOrderSort] = useState<'story' | 'release' | 'doomsday'>('doomsday');

  // Planner Settings
  const [plannerHoursPerWeek, setPlannerHoursPerWeek] = useState<number>(() => {
    const saved = localStorage.getItem('marvel_planner_hours');
    return saved ? Number(saved) : APP_CONFIG.defaultWeeklyHours;
  });

  const [plannerTargetDate, setPlannerTargetDate] = useState<string>(() => {
    const saved = localStorage.getItem('marvel_planner_target');
    return saved || DOOMSDAY_RELEASE_DATE.split('T')[0];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(userData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('marvel_doomsday_mode', String(doomsdayMode));
  }, [doomsdayMode]);

  useEffect(() => {
    localStorage.setItem('marvel_spoiler_unlocked', String(spoilerUnlocked));
  }, [spoilerUnlocked]);

  useEffect(() => {
    localStorage.setItem('marvel_planner_hours', String(plannerHoursPerWeek));
  }, [plannerHoursPerWeek]);

  useEffect(() => {
    localStorage.setItem('marvel_planner_target', plannerTargetDate);
  }, [plannerTargetDate]);

  // --- Handlers ---
  const toggleWatched = (id: string) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      const nextWatched = !current.watched;
      const nextStatus: WatchStatus = nextWatched ? 'WATCHED' : 'UNWATCHED';
      return {
        ...prev,
        [id]: {
          ...current,
          watched: nextWatched,
          watchStatus: nextStatus,
          watchedAt: nextWatched ? new Date().toISOString() : undefined,
          watchedPostCredit: nextWatched ? true : current.watchedPostCredit
        }
      };
    });
  };

  const setWatchStatus = (id: string, status: WatchStatus, progressMinutes?: number) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      const isWatched = status === 'WATCHED' || status === 'REWATCH';
      return {
        ...prev,
        [id]: {
          ...current,
          watched: isWatched,
          watchStatus: status,
          progressMinutes: progressMinutes !== undefined ? progressMinutes : current.progressMinutes,
          watchedAt: isWatched ? (current.watchedAt || new Date().toISOString()) : undefined,
          watchedPostCredit: isWatched ? (current.watchedPostCredit ?? true) : current.watchedPostCredit
        }
      };
    });
  };

  const togglePostCredit = (id: string) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      return {
        ...prev,
        [id]: {
          ...current,
          watchedPostCredit: !current.watchedPostCredit
        }
      };
    });
  };

  const setRating = (id: string, rating: number) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      return {
        ...prev,
        [id]: {
          ...current,
          userRating: rating
        }
      };
    });
  };

  const toggleFavorite = (id: string) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      return {
        ...prev,
        [id]: {
          ...current,
          isFavorite: !current.isFavorite
        }
      };
    });
  };

  const setNotes = (id: string, notes: string) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      return {
        ...prev,
        [id]: {
          ...current,
          notes
        }
      };
    });
  };

  const markAllAsWatched = (ids: string[]) => {
    setUserData(prev => {
      const updated = { ...prev };
      ids.forEach(id => {
        updated[id] = {
          ...(updated[id] || {}),
          watched: true,
          watchStatus: 'WATCHED',
          watchedPostCredit: true,
          watchedAt: new Date().toISOString()
        };
      });
      return updated;
    });
  };

  const resetAllProgress = () => {
    setUserData({});
  };

  const exportDataJSON = () => {
    const dataStr = JSON.stringify(userData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `doomsday-watchlist-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        setUserData(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Invalid JSON import', e);
      return false;
    }
  };

  // --- Filtered Titles List ---
  const filteredTitles = useMemo(() => {
    return MARVEL_TITLES.filter(item => {
      const uData = userData[item.id];
      const isWatched = !!uData?.watched;
      const status: WatchStatus = uData?.watchStatus || (isWatched ? 'WATCHED' : 'UNWATCHED');

      // Doomsday mode filter: show only ESSENTIAL & HIGHLY_RELEVANT
      if (doomsdayMode) {
        if (item.priority !== 'ESSENTIAL' && item.priority !== 'HIGHLY_RELEVANT') {
          return false;
        }
      }

      // Universe Filter
      if (activeUniverse !== 'ALL' && item.universe !== activeUniverse) {
        return false;
      }

      // Priority Filter
      if (activePriority !== 'ALL' && item.priority !== activePriority) {
        return false;
      }

      // Format Filter (Film / Series)
      if (activeFormat !== 'ALL' && item.type !== activeFormat) {
        return false;
      }

      // Streaming Provider Filter
      if (activeProviderFilter !== 'ALL') {
        const hasProvider = (item.streaming?.stream && item.streaming.stream.includes(activeProviderFilter)) ||
          item.streamingPlatform === activeProviderFilter;
        if (!hasProvider) return false;
      }

      // Watch Status Filter
      if (activeWatchStatus === 'WATCHED' && status !== 'WATCHED') return false;
      if (activeWatchStatus === 'UNWATCHED' && status !== 'UNWATCHED') return false;
      if (activeWatchStatus === 'IN_PROGRESS' && status !== 'IN_PROGRESS') return false;
      if (activeWatchStatus === 'REWATCH' && status !== 'REWATCH') return false;

      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesYear = String(item.year).includes(q);
        const matchesPhase = item.phase.toLowerCase().includes(q);
        const matchesUniverse = item.universe.toLowerCase().includes(q);
        const matchesWhy = item.whyItMatters.toLowerCase().includes(q);
        const matchesDoomConn = item.doomsdayConnection.toLowerCase().includes(q);
        const matchesCharacters = item.keyCharacters.some(c => c.toLowerCase().includes(q));
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        const matchesPriority = item.priority.toLowerCase().includes(q);

        if (!matchesTitle && !matchesYear && !matchesPhase && !matchesUniverse && !matchesWhy && !matchesDoomConn && !matchesCharacters && !matchesTags && !matchesPriority) {
          return false;
        }
      }

      return true;
    });
  }, [
    doomsdayMode,
    activeUniverse,
    activePriority,
    activeFormat,
    activeWatchStatus,
    activeProviderFilter,
    searchQuery,
    userData
  ]);

  // --- Deep Statistics ---
  const stats: WatchlistStats = useMemo(() => {
    let watchedCount = 0;
    let inProgressCount = 0;
    let totalMinutes = 0;
    let watchedMinutes = 0;
    let essentialCount = 0;
    let essentialWatchedCount = 0;
    let moviesWatched = 0;
    let seriesWatched = 0;
    let totalRatingSum = 0;
    let ratingCount = 0;
    const favorites: MarvelTitle[] = [];
    const inProgressList: MarvelTitle[] = [];

    const universeMap: Record<string, { total: number; watched: number; minutes: number; watchedMinutes: number }> = {
      MCU: { total: 0, watched: 0, minutes: 0, watchedMinutes: 0 },
      'X-MEN': { total: 0, watched: 0, minutes: 0, watchedMinutes: 0 },
      'SPIDER-MAN': { total: 0, watched: 0, minutes: 0, watchedMinutes: 0 },
      'FANTASTIC FOUR': { total: 0, watched: 0, minutes: 0, watchedMinutes: 0 },
      MULTIVERSE: { total: 0, watched: 0, minutes: 0, watchedMinutes: 0 },
      SERIES: { total: 0, watched: 0, minutes: 0, watchedMinutes: 0 },
    };

    MARVEL_TITLES.forEach(title => {
      const uData = userData[title.id];
      const isWatched = !!uData?.watched;
      const status: WatchStatus = uData?.watchStatus || (isWatched ? 'WATCHED' : 'UNWATCHED');

      totalMinutes += title.runtimeMinutes;
      if (isWatched) {
        watchedCount++;
        watchedMinutes += title.runtimeMinutes;
        if (title.type === 'FILM') moviesWatched++;
        if (title.type === 'SERIES') seriesWatched++;
      } else if (status === 'IN_PROGRESS') {
        inProgressCount++;
        inProgressList.push(title);
        // credit fractional minutes if recorded
        if (uData?.progressMinutes) {
          watchedMinutes += Math.min(title.runtimeMinutes, uData.progressMinutes);
        }
      }

      if (title.priority === 'ESSENTIAL') {
        essentialCount++;
        if (isWatched) essentialWatchedCount++;
      }

      if (uData?.userRating) {
        totalRatingSum += uData.userRating;
        ratingCount++;
      }

      if (uData?.isFavorite) {
        favorites.push(title);
      }

      // Universe grouping
      const uKey = title.universe in universeMap ? title.universe : 'MCU';
      if (universeMap[uKey]) {
        universeMap[uKey].total++;
        universeMap[uKey].minutes += title.runtimeMinutes;
        if (isWatched) {
          universeMap[uKey].watched++;
          universeMap[uKey].watchedMinutes += title.runtimeMinutes;
        }
      }

      // Series grouping
      if (title.type === 'SERIES') {
        universeMap.SERIES.total++;
        universeMap.SERIES.minutes += title.runtimeMinutes;
        if (isWatched) {
          universeMap.SERIES.watched++;
          universeMap.SERIES.watchedMinutes += title.runtimeMinutes;
        }
      }
    });

    const universeStats: Record<string, { total: number; watched: number; hours: number; watchedHours: number; percentage: number }> = {};
    Object.entries(universeMap).forEach(([key, val]) => {
      universeStats[key] = {
        total: val.total,
        watched: val.watched,
        hours: Math.round(val.minutes / 60),
        watchedHours: Math.round(val.watchedMinutes / 60),
        percentage: val.total > 0 ? Math.round((val.watched / val.total) * 100) : 0,
      };
    });

    const totalTitles = MARVEL_TITLES.length;
    const remainingTitles = Math.max(0, totalTitles - watchedCount);
    const totalHours = Math.round(totalMinutes / 60);
    const watchedHours = Math.round(watchedMinutes / 60);
    const remainingHours = Math.max(0, totalHours - watchedHours);
    const remainingEssential = Math.max(0, essentialCount - essentialWatchedCount);

    const completionPercentage = totalTitles > 0 ? Math.round((watchedCount / totalTitles) * 100) : 0;
    const essentialCompletionPercentage = essentialCount > 0 ? Math.round((essentialWatchedCount / essentialCount) * 100) : 0;
    const averageRating = ratingCount > 0 ? Number((totalRatingSum / ratingCount).toFixed(1)) : 0;

    return {
      totalTitles,
      watchedTitles: watchedCount,
      inProgressTitles: inProgressCount,
      remainingTitles,
      totalHours,
      watchedHours,
      remainingHours,
      totalEssential: essentialCount,
      watchedEssential: essentialWatchedCount,
      remainingEssential,
      completionPercentage,
      essentialCompletionPercentage,
      moviesWatchedCount: moviesWatched,
      seriesWatchedCount: seriesWatched,
      averageRating,
      favoriteTitles: favorites,
      inProgressList,
      universeStats,
    };
  }, [userData]);

  return {
    userData,
    stats,
    filteredTitles,
    allTitles: MARVEL_TITLES,
    doomsdayMode,
    setDoomsdayMode,
    spoilerUnlocked,
    setSpoilerUnlocked,
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
    activeProviderFilter,
    setActiveProviderFilter,
    watchOrderRoute,
    setWatchOrderRoute,
    watchOrderSort,
    setWatchOrderSort,
    plannerHoursPerWeek,
    setPlannerHoursPerWeek,
    plannerTargetDate,
    setPlannerTargetDate,
    toggleWatched,
    setWatchStatus,
    togglePostCredit,
    setRating,
    toggleFavorite,
    setNotes,
    markAllAsWatched,
    resetAllProgress,
    exportDataJSON,
    importDataJSON
  };
}
