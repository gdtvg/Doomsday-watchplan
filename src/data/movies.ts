import { MarvelTitle } from '../types';
import { MCU_PHASE_1_TO_3_TITLES } from './movies/mcuPhase1to3';
import { MCU_PHASE_4_TO_6_TITLES } from './movies/mcuPhase4to6';
import { XMEN_LEGACY_TITLES } from './movies/xmenLegacy';
import { SPIDER_MAN_LEGACY_TITLES } from './movies/spiderManLegacy';
import { F4_AND_LEGACY_TITLES } from './movies/f4AndLegacy';
import { SERIES_AND_SPECIALS_TITLES } from './movies/seriesAndSpecials';

// Deduplication map ensuring unique IDs
const rawCombined: MarvelTitle[] = [
  ...MCU_PHASE_1_TO_3_TITLES,
  ...MCU_PHASE_4_TO_6_TITLES,
  ...XMEN_LEGACY_TITLES,
  ...SPIDER_MAN_LEGACY_TITLES,
  ...F4_AND_LEGACY_TITLES,
  ...SERIES_AND_SPECIALS_TITLES
];

const seenIds = new Set<string>();
const RAW_MARVEL_TITLES: MarvelTitle[] = [];

for (const item of rawCombined) {
  if (!seenIds.has(item.id)) {
    seenIds.add(item.id);
    RAW_MARVEL_TITLES.push(item);
  }
}

export const UNIVERSES_DATA = [
  {
    id: 'MCU',
    name: 'Marvel Cinematic Universe (Earth-616)',
    displayName: 'MCU (Earth-616)',
    description: 'Der Heilige Zeitstrahl und das Zentrum der Infinity- und Multiverse-Saga mit den Avengers und Doctor Strange.',
    accentColor: '#B51F2E',
    borderGlow: 'rgba(181, 31, 46, 0.4)',
    doomsdayLore: 'Epizentrum der kommenden Inkursionen. Zielort von Doctor Doom und Treffpunkt aller kollidierenden Zeitlinien.',
    totalTitles: 60
  },
  {
    id: 'MULTIVERSE',
    name: 'Das Multiversum & Die Leere (The Void)',
    displayName: 'Multiversum & Leere',
    description: 'Das unendliche Gewebe verzweigter Zeitlinien, die TVA, die Leere am Ende der Zeit und kosmische Wächter.',
    accentColor: '#536F91',
    borderGlow: 'rgba(83, 111, 145, 0.4)',
    doomsdayLore: 'Zusammengehalten von Lokis Weltenbaum (Yggdrasil). Schauplatz des bevorstehenden Zusammenbruchs zu Battleworld.',
    totalTitles: 12
  },
  {
    id: 'FANTASTIC FOUR',
    name: 'Fantastic Four Realität',
    displayName: 'Fantastic Four',
    description: 'Das retro-futuristische 1960er-Jahre-Universum von First Steps und die Fox-Ära der 2000er.',
    accentColor: '#3B82F6',
    borderGlow: 'rgba(59, 130, 246, 0.4)',
    doomsdayLore: 'Heimat von Reed Richards (Mister Fantastic), Galactus und der persönlichen Feindschaft mit Victor von Doom.',
    totalTitles: 4
  },
  {
    id: 'X-MEN',
    name: 'Mutanten & Fox-Universum (Earth-10005)',
    displayName: 'Fox X-Men Saga',
    description: 'Das 24-jährige Vermächtnis von Wolverine, Charles Xavier, Magneto und dem Kampf der Mutanten.',
    accentColor: '#C8943E',
    borderGlow: 'rgba(200, 148, 62, 0.4)',
    doomsdayLore: 'Der Zerfall von Earth-10005 wurde in Deadpool & Wolverine abgewendet; Mutanten kreuzen nun direkt den Weg des MCU.',
    totalTitles: 14
  },
  {
    id: 'SPIDER-MAN',
    name: 'Spider-Verse & Sony-Multiversum',
    displayName: 'Spider-Man Universen',
    description: 'Tobey Maguire, Andrew Garfield, Tom Holland und die animierte Spider-Society verbunden durch das Web of Life.',
    accentColor: '#EF4444',
    borderGlow: 'rgba(239, 68, 68, 0.4)',
    doomsdayLore: 'Spider-Man-Varianten erlebten als Erste die interdimensionalen Raum-Zeit-Brüche am eigenen Leib.',
    totalTitles: 12
  },
  {
    id: 'LEGACY',
    name: 'Marvel Legacy Classics',
    displayName: 'Legacy Klassiker',
    description: 'Kultfilme wie Blade und Daredevil (2003), deren Helden im Leere-Widerstand (The Void) wiederauferstanden sind.',
    accentColor: '#8B5CF6',
    borderGlow: 'rgba(139, 92, 246, 0.4)',
    doomsdayLore: 'Die vergessenen Recken der 90er und 2000er, die vor dem Nichts gerettet wurden.',
    totalTitles: 5
  }
];

// Streaming Provider Enrichment Function
function enrichWithStreaming(title: MarvelTitle): MarvelTitle {
  if (title.streaming) return title;

  // Upcoming Phase 6 / In production titles
  if (title.isUpcoming || title.year >= 2026 || title.id === 'avengers-doomsday' || title.id === 'avengers-secret-wars') {
    return {
      ...title,
      streamingPlatform: 'Kino / In Produktion',
      streaming: {
        stream: ['Disney+'],
        buyRent: ['Apple TV+', 'Prime Video', 'YouTube'],
        subscriptionRequired: true,
        statusLabel: title.year >= 2026 ? 'IN PRODUKTION' : 'KINO',
        directLink: title.trailerYoutubeId ? `https://www.youtube.com/watch?v=${title.trailerYoutubeId}` : undefined
      }
    };
  }

  // Sony & Spider-Man Universes (Netflix, Disney+, Prime Video)
  if (
    title.universe === 'SPIDER-MAN' || 
    title.universe === 'SONY' || 
    title.universe === 'VENOM' || 
    title.id.includes('spider-man') ||
    title.id.includes('amazing') ||
    title.id.includes('spider-verse') ||
    title.id.includes('venom')
  ) {
    return {
      ...title,
      streamingPlatform: 'Disney+ · Netflix',
      streaming: {
        stream: ['Disney+', 'Netflix', 'Prime Video'],
        buyRent: ['Apple TV+', 'Prime Video', 'YouTube'],
        subscriptionRequired: true,
        statusLabel: 'STREAMING',
        directLink: 'https://www.disneyplus.com'
      }
    };
  }

  // Standard MCU & Fox X-Men (Disney+ Marvel Hub)
  return {
    ...title,
    streamingPlatform: 'Disney+',
    streaming: {
      stream: ['Disney+'],
      buyRent: ['Apple TV+', 'Prime Video', 'YouTube'],
      subscriptionRequired: true,
      statusLabel: 'STREAMING',
      directLink: 'https://www.disneyplus.com'
    }
  };
}

export const MARVEL_TITLES: MarvelTitle[] = RAW_MARVEL_TITLES.map(enrichWithStreaming);

// TMDB ID Map for deep-linking like ?info=movie:969681
export const TMDB_ID_MAP: Record<string, string> = {
  '969681': 'deadpool-and-wolverine',
  '299534': 'avengers-endgame',
  '299536': 'avengers-infinity-war',
  '634649': 'spider-man-no-way-home',
  '453395': 'doctor-strange-multiverse-madness',
  '1003596': 'fantastic-four-first-steps',
  '1003598': 'avengers-doomsday',
  '1003599': 'avengers-secret-wars',
  '1010581': 'spider-man-brand-new-day',
  '84958': 'loki-s1',
  '207559': 'loki-s2',
  '85271': 'wandavision',
  '88396': 'the-falcon-winter-soldier',
  '609681': 'the-marvels',
  '640146': 'ant-man-quantumania',
  '774752': 'guardians-galaxy-vol-3',
  '970347': 'thunderbolts-asterisk',
  '822119': 'captain-america-brave-new-world',
  '246655': 'xmen-days-of-future-past',
  '263115': 'logan',
  '49538': 'xmen-first-class',
  '36657': 'xmen-2000',
  '36658': 'x2-united',
  '36668': 'xmen-the-last-stand',
  '136315': 'xmen-97',
  '557': 'spider-man-2002',
  '558': 'spider-man-2-raimi',
  '559': 'spider-man-3',
  '1930': 'amazing-spider-man',
  '102382': 'amazing-spider-man-2',
  '335983': 'venom-2018',
  '580489': 'venom-let-there-be-carnage',
  '912649': 'venom-the-last-dance',
  '324857': 'spider-man-into-the-spider-verse',
  '569094': 'spider-man-across-the-spider-verse',
  '1726': 'iron-man-2008',
  '24428': 'the-avengers-2012',
  '271110': 'captain-america-civil-war',
  '138502': 'agatha-all-along',
  '9738': 'fantastic-four-2005',
  '1979': 'fantastic-four-rise-silver-surfer',
  '166424': 'fantastic-four-2015',
  '36647': 'blade-1998',
  '36586': 'blade-2',
  '36685': 'blade-trinity',
  '9480': 'daredevil-2003',
  '9947': 'elektra-2005',
  '202720': 'daredevil-born-again',
  '61889': 'netflix-daredevil',
  '67178': 'netflix-punisher',
  '38472': 'netflix-jessica-jones',
  '62126': 'netflix-luke-cage',
  '62127': 'netflix-iron-fist',
  '62285': 'netflix-defenders',
  '91363': 'what-if-s1',
  '219760': 'what-if-s2',
  '247854': 'what-if-s3',
  '88329': 'hawkeye-2021',
  '92749': 'moon-knight',
  '92782': 'ms-marvel',
  '92783': 'she-hulk',
  '114479': 'secret-invasion',
  '138501': 'echo-2024',
  '114478': 'ironheart-2025',
  '242095': 'eyes-of-wakanda',
  '138504': 'marvel-zombies-2025',
  '204368': 'wonder-man-2025',
  '213796': 'vision-quest-2026',
  '1024535': 'werewolf-by-night',
  '774751': 'gotg-holiday-special'
};

export function findMovieByInfoQuery(query: string): MarvelTitle | undefined {
  if (!query) return undefined;
  const clean = query.trim().replace(/^movie:/i, '').replace(/^tv:/i, '').toLowerCase();
  
  // 1. Check TMDB mapping
  if (TMDB_ID_MAP[clean]) {
    const found = MARVEL_TITLES.find(m => m.id === TMDB_ID_MAP[clean]);
    if (found) return found;
  }

  // 2. Check exact ID match
  const byId = MARVEL_TITLES.find(m => m.id.toLowerCase() === clean);
  if (byId) return byId;

  // 3. Check TMDB ID property if set
  const byTmdbId = MARVEL_TITLES.find(m => String(m.tmdbId) === clean);
  if (byTmdbId) return byTmdbId;

  // 4. Fuzzy title match
  const byTitle = MARVEL_TITLES.find(m => 
    m.title.toLowerCase().replace(/[^a-z0-9]/g, '') === clean.replace(/[^a-z0-9]/g, '') ||
    m.title.toLowerCase().includes(clean)
  );
  return byTitle;
}
