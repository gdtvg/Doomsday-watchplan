import { useState, useEffect, useMemo, useCallback } from 'react';
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
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  doc, 
  setDoc, 
  collection, 
  onSnapshot, 
  serverTimestamp, 
  writeBatch 
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

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

export type CloudSyncStatus = 'synced' | 'syncing' | 'offline' | 'local';

export function useWatchlist() {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [syncStatus, setSyncStatus] = useState<CloudSyncStatus>('local');

  // Helper to get user-specific storage key
  const getStorageKey = (user: User | null) => {
    return user ? `marvel_watchlist_user_${user.uid}` : 'marvel_watchlist_guest';
  };

  // --- Persistent User Data ---
  const [userData, setUserData] = useState<Record<string, UserTitleData>>(() => {
    try {
      const key = auth.currentUser ? `marvel_watchlist_user_${auth.currentUser.uid}` : 'marvel_watchlist_guest';
      const stored = localStorage.getItem(key) || localStorage.getItem(APP_CONFIG.storageKey);
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

  // Auth State Listener - Cleanly switch data sets per user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        setSyncStatus('local');
        // When logged out, load guest data
        try {
          const guestStored = localStorage.getItem('marvel_watchlist_guest');
          setUserData(guestStored ? JSON.parse(guestStored) : {});
        } catch (e) {
          setUserData({});
        }
      } else {
        // When switched to an authenticated user, load their local cache first
        try {
          const userStored = localStorage.getItem(`marvel_watchlist_user_${user.uid}`);
          if (userStored) {
            setUserData(JSON.parse(userStored));
          } else {
            // Fresh user without local cache -> start clean, let Firestore populate
            setUserData({});
          }
        } catch (e) {
          setUserData({});
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Save changes to localStorage as offline mirror for CURRENT user
  useEffect(() => {
    try {
      const key = getStorageKey(currentUser);
      localStorage.setItem(key, JSON.stringify(userData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [userData, currentUser]);

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

  // Firestore Real-Time Listener when User is Authenticated
  useEffect(() => {
    if (!currentUser) return;

    setSyncStatus('syncing');
    const watchlistPath = `users/${currentUser.uid}/watchlist`;
    const watchlistCollection = collection(db, 'users', currentUser.uid, 'watchlist');

    const unsubscribeWatchlist = onSnapshot(
      watchlistCollection,
      (snapshot) => {
        const cloudData: Record<string, UserTitleData> = {};
        snapshot.forEach((docSnap) => {
          const item = docSnap.data();
          cloudData[docSnap.id] = {
            watched: !!item.watched,
            watchStatus: item.watchStatus || (item.watched ? 'WATCHED' : 'UNWATCHED'),
            watchedAt: item.watchedAt,
            watchedPostCredit: item.watchedPostCredit,
            userRating: item.userRating,
            isFavorite: item.isFavorite,
            notes: item.notes,
            progressMinutes: item.progressMinutes,
          };
        });

        // Set authoritative cloud data for this authenticated user
        setUserData(cloudData);
        try {
          localStorage.setItem(`marvel_watchlist_user_${currentUser.uid}`, JSON.stringify(cloudData));
        } catch (e) {
          // ignore
        }
        setSyncStatus('synced');
      },
      (error) => {
        setSyncStatus('offline');
        handleFirestoreError(error, OperationType.LIST, watchlistPath);
      }
    );

    // Also listen to user preferences document
    const userDocPath = `users/${currentUser.uid}`;
    const userDocRef = doc(db, 'users', currentUser.uid);
    const unsubscribeUser = onSnapshot(
      userDocRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.doomsdayMode !== undefined) setDoomsdayMode(data.doomsdayMode);
          if (data.spoilerUnlocked !== undefined) setSpoilerUnlocked(data.spoilerUnlocked);
          if (data.plannerHoursPerWeek !== undefined) setPlannerHoursPerWeek(data.plannerHoursPerWeek);
          if (data.plannerTargetDate) setPlannerTargetDate(data.plannerTargetDate);
          if (data.watchOrderRoute) setWatchOrderRoute(data.watchOrderRoute);
          if (data.watchOrderSort) setWatchOrderSort(data.watchOrderSort);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, userDocPath);
      }
    );

    return () => {
      unsubscribeWatchlist();
      unsubscribeUser();
    };
  }, [currentUser]);

  // Cloud Write Helper
  const syncTitleToFirestore = useCallback(async (titleId: string, itemData: UserTitleData) => {
    if (!currentUser) return;

    const path = `users/${currentUser.uid}/watchlist/${titleId}`;
    try {
      setSyncStatus('syncing');
      const docRef = doc(db, 'users', currentUser.uid, 'watchlist', titleId);
      
      const payload: Record<string, any> = {
        userId: currentUser.uid,
        titleId,
        watched: !!itemData.watched,
        watchStatus: itemData.watchStatus || (itemData.watched ? 'WATCHED' : 'UNWATCHED'),
        updatedAt: serverTimestamp(),
      };

      if (itemData.watchedAt !== undefined) payload.watchedAt = itemData.watchedAt;
      if (itemData.watchedPostCredit !== undefined) payload.watchedPostCredit = itemData.watchedPostCredit;
      if (itemData.userRating !== undefined) payload.userRating = itemData.userRating;
      if (itemData.isFavorite !== undefined) payload.isFavorite = itemData.isFavorite;
      if (itemData.notes !== undefined) payload.notes = itemData.notes;
      if (itemData.progressMinutes !== undefined) payload.progressMinutes = itemData.progressMinutes;

      await setDoc(docRef, payload, { merge: true });
      setSyncStatus('synced');
    } catch (err) {
      setSyncStatus('offline');
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  }, [currentUser]);

  // Sync Preferences to Firestore
  const syncPreferencesToFirestore = useCallback(async (prefs: {
    doomsdayMode?: boolean;
    spoilerUnlocked?: boolean;
    plannerHoursPerWeek?: number;
    plannerTargetDate?: string;
    watchOrderRoute?: 'A_MCU' | 'B_DOOMSDAY' | 'C_MULTIVERSE';
    watchOrderSort?: 'story' | 'release' | 'doomsday';
  }) => {
    if (!currentUser) return;
    const path = `users/${currentUser.uid}`;
    try {
      setSyncStatus('syncing');
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        userId: currentUser.uid,
        ...prefs,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      setSyncStatus('synced');
    } catch (err) {
      setSyncStatus('offline');
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  }, [currentUser]);

  // --- Handlers ---
  const toggleWatched = (id: string) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      const nextWatched = !current.watched;
      const nextStatus: WatchStatus = nextWatched ? 'WATCHED' : 'UNWATCHED';
      const updatedItem: UserTitleData = {
        ...current,
        watched: nextWatched,
        watchStatus: nextStatus,
        watchedAt: nextWatched ? new Date().toISOString() : undefined,
        watchedPostCredit: nextWatched ? true : current.watchedPostCredit
      };
      
      syncTitleToFirestore(id, updatedItem);

      return {
        ...prev,
        [id]: updatedItem
      };
    });
  };

  const setWatchStatus = (id: string, status: WatchStatus, progressMinutes?: number) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      const isWatched = status === 'WATCHED' || status === 'REWATCH';
      const updatedItem: UserTitleData = {
        ...current,
        watched: isWatched,
        watchStatus: status,
        progressMinutes: progressMinutes !== undefined ? progressMinutes : current.progressMinutes,
        watchedAt: isWatched ? (current.watchedAt || new Date().toISOString()) : undefined,
        watchedPostCredit: isWatched ? (current.watchedPostCredit ?? true) : current.watchedPostCredit
      };

      syncTitleToFirestore(id, updatedItem);

      return {
        ...prev,
        [id]: updatedItem
      };
    });
  };

  const togglePostCredit = (id: string) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      const updatedItem: UserTitleData = {
        ...current,
        watchedPostCredit: !current.watchedPostCredit
      };

      syncTitleToFirestore(id, updatedItem);

      return {
        ...prev,
        [id]: updatedItem
      };
    });
  };

  const setRating = (id: string, rating: number) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      const updatedItem: UserTitleData = {
        ...current,
        userRating: rating
      };

      syncTitleToFirestore(id, updatedItem);

      return {
        ...prev,
        [id]: updatedItem
      };
    });
  };

  const toggleFavorite = (id: string) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      const updatedItem: UserTitleData = {
        ...current,
        isFavorite: !current.isFavorite
      };

      syncTitleToFirestore(id, updatedItem);

      return {
        ...prev,
        [id]: updatedItem
      };
    });
  };

  const setNotes = (id: string, notes: string) => {
    setUserData(prev => {
      const current = prev[id] || { watched: false };
      const updatedItem: UserTitleData = {
        ...current,
        notes
      };

      syncTitleToFirestore(id, updatedItem);

      return {
        ...prev,
        [id]: updatedItem
      };
    });
  };

  const markAllAsWatched = async (ids: string[]) => {
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

    if (currentUser) {
      const path = `users/${currentUser.uid}/watchlist`;
      try {
        setSyncStatus('syncing');
        const batch = writeBatch(db);
        ids.forEach(id => {
          const docRef = doc(db, 'users', currentUser.uid, 'watchlist', id);
          batch.set(docRef, {
            userId: currentUser.uid,
            titleId: id,
            watched: true,
            watchStatus: 'WATCHED',
            watchedPostCredit: true,
            watchedAt: new Date().toISOString(),
            updatedAt: serverTimestamp(),
          }, { merge: true });
        });
        await batch.commit();
        setSyncStatus('synced');
      } catch (err) {
        setSyncStatus('offline');
        handleFirestoreError(err, OperationType.WRITE, path);
      }
    }
  };

  const resetAllProgress = async () => {
    setUserData({});
    if (currentUser) {
      const path = `users/${currentUser.uid}/watchlist`;
      try {
        setSyncStatus('syncing');
        const batch = writeBatch(db);
        Object.keys(userData).forEach(id => {
          const docRef = doc(db, 'users', currentUser.uid, 'watchlist', id);
          batch.delete(docRef);
        });
        await batch.commit();
        setSyncStatus('synced');
      } catch (err) {
        setSyncStatus('offline');
        handleFirestoreError(err, OperationType.DELETE, path);
      }
    }
  };

  const handleSetDoomsdayMode = (val: boolean) => {
    setDoomsdayMode(val);
    syncPreferencesToFirestore({ doomsdayMode: val });
  };

  const handleSetSpoilerUnlocked = (val: boolean) => {
    setSpoilerUnlocked(val);
    syncPreferencesToFirestore({ spoilerUnlocked: val });
  };

  const handleSetPlannerHoursPerWeek = (val: number) => {
    setPlannerHoursPerWeek(val);
    syncPreferencesToFirestore({ plannerHoursPerWeek: val });
  };

  const handleSetPlannerTargetDate = (val: string) => {
    setPlannerTargetDate(val);
    syncPreferencesToFirestore({ plannerTargetDate: val });
  };

  const handleSetWatchOrderRoute = (val: 'A_MCU' | 'B_DOOMSDAY' | 'C_MULTIVERSE') => {
    setWatchOrderRoute(val);
    syncPreferencesToFirestore({ watchOrderRoute: val });
  };

  const handleSetWatchOrderSort = (val: 'story' | 'release' | 'doomsday') => {
    setWatchOrderSort(val);
    syncPreferencesToFirestore({ watchOrderSort: val });
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
        if (currentUser) {
          // Sync all imported items to Firestore
          const batch = writeBatch(db);
          Object.entries(parsed).forEach(([id, data]: [string, any]) => {
            const docRef = doc(db, 'users', currentUser.uid, 'watchlist', id);
            batch.set(docRef, {
              userId: currentUser.uid,
              titleId: id,
              watched: !!data.watched,
              watchStatus: data.watchStatus || (data.watched ? 'WATCHED' : 'UNWATCHED'),
              watchedAt: data.watchedAt || null,
              watchedPostCredit: !!data.watchedPostCredit,
              userRating: data.userRating || null,
              isFavorite: !!data.isFavorite,
              notes: data.notes || '',
              progressMinutes: data.progressMinutes || 0,
              updatedAt: serverTimestamp(),
            }, { merge: true });
          });
          batch.commit().catch(e => console.error('Cloud batch import error', e));
        }
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
    currentUser,
    syncStatus,
    userData,
    stats,
    filteredTitles,
    allTitles: MARVEL_TITLES,
    doomsdayMode,
    setDoomsdayMode: handleSetDoomsdayMode,
    spoilerUnlocked,
    setSpoilerUnlocked: handleSetSpoilerUnlocked,
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
    setWatchOrderRoute: handleSetWatchOrderRoute,
    watchOrderSort,
    setWatchOrderSort: handleSetWatchOrderSort,
    plannerHoursPerWeek,
    setPlannerHoursPerWeek: handleSetPlannerHoursPerWeek,
    plannerTargetDate,
    setPlannerTargetDate: handleSetPlannerTargetDate,
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
