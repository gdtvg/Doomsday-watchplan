/**
 * CENTRAL CONFIGURATION FOR AVENGERS: DOOMSDAY WATCHLIST
 * Styled in Doctor Doom (Latverian Emerald & Forged Titanium) + Disney+ & Netflix Streaming UI
 */

export const DOOMSDAY_RELEASE_DATE = '2026-05-01T00:00:00';
export const DOOMSDAY_RELEASE_DISPLAY = '1. Mai 2026';
export const SECRET_WARS_RELEASE_DATE = '2027-05-07T00:00:00';
export const SECRET_WARS_RELEASE_DISPLAY = '7. Mai 2027';

export const APP_CONFIG = {
  appName: 'AVENGERS: DOOMSDAY',
  subtitle: 'STREAMING & MULTIVERSE HUB',
  tagline: 'The Road to Doomsday — Prepare for Doctor Doom and the Battleworld Collision',
  version: '3.0.0',
  storageKey: 'marvel_doomsday_watchlist_v3',
  defaultWeeklyHours: 6,
  targetCompletionDate: '2026-05-01',
};

export const COLOR_PALETTE = {
  // Streaming Canvas (Disney+ Deep Obsidian)
  bgPrimary: '#05080C',
  bgSecondary: '#090E17',
  bgCard: '#0F1622',
  borderDark: '#1E293B',
  
  // Text
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  // Doctor Doom (Latverian Emerald & Mask Titanium)
  doomEmerald: '#10B981',
  doomEmeraldDark: '#064E3B',
  doomEmeraldGlow: 'rgba(16, 185, 129, 0.45)',
  doomTitanium: '#94A3B8',
  doomTitaniumDark: '#1E293B',

  // Incursions & Battleworld Accents
  incursionRed: '#E11D48',
  incursionRedGlow: 'rgba(225, 29, 72, 0.45)',
  doomGold: '#F59E0B',
  doomGoldGlow: 'rgba(245, 158, 11, 0.45)',
};

export const PRIORITY_CONFIG = {
  ESSENTIAL: {
    label: 'DOOMSDAY ESSENTIAL',
    stars: 5,
    description: 'Mandatory for understanding Doctor Doom, Anchor Beings, Incursions, and Battleworld.',
    badgeClass: 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.35)]',
    color: '#10B981',
  },
  HIGHLY_RELEVANT: {
    label: 'KEY MULTIVERSE LORE',
    stars: 4,
    description: 'Major Multiverse Saga events, Council of Reeds, Loki Yggdrasil, and key variants.',
    badgeClass: 'bg-emerald-950/60 text-emerald-400 border border-emerald-700/50',
    color: '#059669',
  },
  RELEVANT: {
    label: 'HERO ORIGIN & SAGA',
    stars: 3,
    description: 'Important character arcs and team setups before the multiversal convergence.',
    badgeClass: 'bg-sky-950/60 text-sky-300 border border-sky-800/40',
    color: '#0284C7',
  },
  OPTIONAL: {
    label: 'WORLD EXPANSION',
    stars: 2,
    description: 'Supplemental stories, street-level adventures, and side storylines.',
    badgeClass: 'bg-slate-900/80 text-slate-300 border border-slate-700/50',
    color: '#64748B',
  },
  LEGACY: {
    label: 'LEGACY UNIVERSE',
    stars: 1,
    description: 'Pre-MCU legacy roots across Fox, Sony, and classic adaptations.',
    badgeClass: 'bg-slate-950/90 text-slate-400 border border-slate-800/60',
    color: '#475569',
  },
};

export const FACT_STATUS_CONFIG = {
  OFFICIAL: {
    label: 'OFFICIAL CANON',
    badgeClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/60',
    tooltip: 'Directly canonized in official Marvel Studios productions.',
  },
  CONFIRMED: {
    label: 'CONFIRMED SLATE',
    badgeClass: 'bg-sky-950/80 text-sky-300 border border-sky-600/60',
    tooltip: 'Confirmed by directors, Marvel Studios trades or verified announcements.',
  },
  STRONGLY_RELEVANT: {
    label: 'MULTIVERSE LINK',
    badgeClass: 'bg-purple-950/80 text-purple-300 border border-purple-600/60',
    tooltip: 'Key legacy continuity directly acknowledged in recent multiverse storylines.',
  },
  SPECULATION: {
    label: 'DOOM THEORY',
    badgeClass: 'bg-amber-950/80 text-amber-300 border border-amber-600/60',
    tooltip: 'Logical comic-inspired deduction regarding Victor von Doom and Battleworld.',
  },
  UNCONFIRMED: {
    label: 'UNCONFIRMED',
    badgeClass: 'bg-slate-900 text-slate-400 border border-slate-700',
    tooltip: 'Rumored or tentative scheduling detail.',
  },
};
