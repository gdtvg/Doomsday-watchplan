export type UniverseType = 
  | 'MCU' 
  | 'X-MEN' 
  | 'SPIDER-MAN' 
  | 'FANTASTIC FOUR' 
  | 'SONY' 
  | 'VENOM' 
  | 'LEGACY' 
  | 'MULTIVERSE';

export type PriorityLevel = 
  | 'ESSENTIAL'        // ★★★★★ Must watch for Doomsday (Doom, Incursions, Multiverse, Major Anchors)
  | 'HIGHLY_RELEVANT'  // ★★★★☆ Strongly tied to Multiverse saga & key characters
  | 'RELEVANT'         // ★★★☆☆ Contextual lore, characters or major events
  | 'OPTIONAL'         // ★★☆☆☆ Good background but not strictly required
  | 'LEGACY';          // ★☆☆☆☆ Early precursor/classic timeline

export type MediaType = 'FILM' | 'SERIES' | 'SPECIAL';

export type WatchStatus = 'UNWATCHED' | 'IN_PROGRESS' | 'WATCHED' | 'REWATCH';

export type StreamingProviderName = 
  | 'Disney+' 
  | 'Netflix' 
  | 'Prime Video' 
  | 'Apple TV+' 
  | 'Paramount+' 
  | 'Max' 
  | 'YouTube';

export interface StreamingInfo {
  stream?: StreamingProviderName[];
  buyRent?: string[];
  subscriptionRequired?: boolean;
  statusLabel?: 'STREAMING' | 'KAUFEN / LEIHEN' | 'KINO' | 'IN PRODUKTION' | 'NICHT VERFÜGBAR';
  directLink?: string;
}

export type PhaseType = 
  | 'Phase 1' 
  | 'Phase 2' 
  | 'Phase 3' 
  | 'Phase 4' 
  | 'Phase 5' 
  | 'Phase 6' 
  | 'Fox X-Men Saga' 
  | 'Raimi Trilogy' 
  | 'Webb Duology' 
  | 'Spider-Verse Animated' 
  | 'Sony SSU' 
  | 'Fox F4 Era' 
  | 'Marvel Television';

export type FactStatus = 
  | 'OFFICIAL' 
  | 'CONFIRMED' 
  | 'STRONGLY_RELEVANT' 
  | 'SPECULATION' 
  | 'UNCONFIRMED';

export interface PostCreditScene {
  hasScene: boolean;
  isImportant: boolean;
  summary: string;
  spoilerContent?: string;
}

export interface CastMember {
  name: string;
  character: string;
  avatarUrl?: string;
}

export interface MarvelTitle {
  id: string;
  tmdbId?: string | number;
  title: string;
  originalTitle?: string;
  tagline?: string;
  year: number;
  releaseDate: string; // ISO date string (YYYY-MM-DD)
  type: MediaType;
  runtimeMinutes: number; // For series: total runtime or avg duration
  episodesCount?: number;
  universe: UniverseType;
  phase: PhaseType;
  priority: PriorityLevel;
  genres?: string[];
  ratingScore?: number; // e.g. 7.9 or 8.4
  director?: string;
  castMembers?: CastMember[];
  whyItMatters: string;
  doomsdayConnection: string; // Specific lore hook (e.g. Incursions, Robert Downey Jr. Doom, Reed Richards, TVA)
  factStatus: FactStatus;
  keyCharacters: string[];
  tags: string[];
  posterUrl: string;
  backdropUrl?: string;
  trailerYoutubeId?: string;
  hintClips?: {
    title: string;
    youtubeId: string;
    description: string;
    tag: string;
  }[];
  postCredit: PostCreditScene;
  storyOrderIndex: number;      // Chronological MCU / Multiverse order
  releaseOrderIndex: number;    // Theatrical / Broadcast release order
  doomsdayOrderIndex: number;   // Fast-track Doomsday curation order
  isUpcoming?: boolean;
  streamingPlatform?: string;
  streaming?: StreamingInfo;
}

export interface UserTitleData {
  watched: boolean;
  watchStatus?: WatchStatus;
  watchedPostCredit?: boolean;
  userRating?: number; // 1 to 5 stars
  isFavorite?: boolean;
  notes?: string;
  watchedAt?: string;
  progressMinutes?: number;
}

export interface UserWatchlistState {
  items: Record<string, UserTitleData>;
  doomsdayMode: boolean;
  spoilerUnlocked: boolean;
  activeUniverseFilter: UniverseType | 'ALL';
  activePriorityFilter: PriorityLevel | 'ALL';
  activeFormatFilter: MediaType | 'ALL';
  activeWatchStatusFilter: 'ALL' | 'UNWATCHED' | 'IN_PROGRESS' | 'WATCHED' | 'REWATCH';
  activeProviderFilter?: StreamingProviderName | 'ALL';
  searchQuery: string;
  watchOrderRoute: 'A_MCU' | 'B_DOOMSDAY' | 'C_MULTIVERSE';
  watchOrderSort: 'story' | 'release' | 'doomsday';
  plannerHoursPerWeek: number;
  plannerTargetDate: string;
  bookmarkedList: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  source: string;
  category: 'OFFICIAL' | 'TRADE CONFIRMED' | 'SPECULATION' | 'PRODUCTION';
  summary: string;
  link?: string;
}

export interface UniverseInfo {
  id: UniverseType;
  name: string;
  displayName: string;
  description: string;
  accentColor: string;
  borderGlow: string;
  doomsdayLore: string;
  totalTitles: number;
}
