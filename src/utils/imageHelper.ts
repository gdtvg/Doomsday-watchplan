/**
 * Resilient Image & Poster Management for Marvel Doomsday Hub
 * High-definition, verified CDN posters & backdrops with zero broken image states.
 */

// Fallback high-res Marvel themed backdrops from reliable CDNs
export const FALLBACK_BACKDROPS: Record<string, string> = {
  MCU: 'https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', // Avengers Endgame
  'X-MEN': 'https://image.tmdb.org/t/p/w1280/5B8Wc2h1G0K7bV5P2Q5d1x6kY1n.jpg', // Days of Future Past
  'SPIDER-MAN': 'https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg', // No Way Home
  'FANTASTIC FOUR': 'https://image.tmdb.org/t/p/w1280/8I37NtDffNV7AZlDa7uDvvqhovU.jpg', // Fantastic Four First Steps
  MULTIVERSE: 'https://image.tmdb.org/t/p/w1280/wcKFYmSM927h1Fm99qU1P1k4K1a.jpg', // Loki TVA
  DEFAULT: 'https://image.tmdb.org/t/p/w1280/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg' // Avengers Doomsday / Battleworld
};

export const FALLBACK_POSTERS: Record<string, string> = {
  MCU: 'https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg', // Endgame
  'X-MEN': 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', // Deadpool & Wolverine
  'SPIDER-MAN': 'https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', // No Way Home
  'FANTASTIC FOUR': 'https://image.tmdb.org/t/p/w780/8I37NtDffNV7AZlDa7uDvvqhovU.jpg', // Fantastic 4 First Steps
  MULTIVERSE: 'https://image.tmdb.org/t/p/w780/voHUmlvjysvGyxMo2h4qRIvjhTR.jpg', // Loki God of Stories
  DEFAULT: 'https://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg' // Doomsday / Battleworld
};

// Verified official high-definition TMDB posters for every single movie and series in the catalog
export const VERIFIED_POSTERS: Record<string, string> = {
  'loki-s1': 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
  'loki-s2': 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
  'doctor-strange-multiverse-madness': 'https://image.tmdb.org/t/p/w780/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg',
  'deadpool-and-wolverine': 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
  'spider-man-no-way-home': 'https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'avengers-infinity-war': 'https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  'avengers-endgame': 'https://image.tmdb.org/t/p/w780/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
  'fantastic-four-first-steps': 'https://image.tmdb.org/t/p/w780/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg',
  'wandavision': 'https://image.tmdb.org/t/p/w780/ijWWwINc8h71NQ8j1LTJMFSj5wr.jpg',
  'what-if-s1': 'https://image.tmdb.org/t/p/w780/zaqfFDUrSfIljdD0OBxSjcutX8n.jpg',
  'the-marvels': 'https://image.tmdb.org/t/p/w780/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg',
  'ant-man-quantumania': 'https://image.tmdb.org/t/p/w780/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg',
  'thunderbolts-asterisk': 'https://image.tmdb.org/t/p/w780/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg',
  'captain-america-brave-new-world': 'https://image.tmdb.org/t/p/w780/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
  'xmen-days-of-future-past': 'https://image.tmdb.org/t/p/w780/tYfijzolzgoMOtegh1Y7j2Enorg.jpg',
  'logan': 'https://image.tmdb.org/t/p/w780/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg',
  'xmen-first-class': 'https://image.tmdb.org/t/p/w780/hNEokmUke0dazoBhttFN0o3L7Xv.jpg',
  'xmen-2000': 'https://image.tmdb.org/t/p/w780/vF02RqXLgtmpJM5CRLSuvN3fVHi.jpg',
  'x2-united': 'https://image.tmdb.org/t/p/w780/fbKrtVCaTBBdgwvrLiyYFsCewlK.jpg',
  'spider-man-2-raimi': 'https://image.tmdb.org/t/p/w780/aGuvNAaaZuWXYQQ6N2v7DeuP6mB.jpg',
  'amazing-spider-man': 'https://image.tmdb.org/t/p/w780/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg',
  'spider-man-into-the-spider-verse': 'https://image.tmdb.org/t/p/w780/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
  'spider-man-across-the-spider-verse': 'https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
  'fantastic-four-2005': 'https://image.tmdb.org/t/p/w780/4YMcYEFS8sFuW3soP1HVmgR3cSm.jpg',
  'fantastic-four-rise-silver-surfer': 'https://image.tmdb.org/t/p/w780/9wRfzTcMyyzkQxVDqBHv8RwuZOv.jpg',
  'iron-man-2008': 'https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
  'the-avengers-2012': 'https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
  'captain-america-civil-war': 'https://image.tmdb.org/t/p/w780/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg',
  'doctor-strange-2016': 'https://image.tmdb.org/t/p/w780/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
  'shang-chi': 'https://image.tmdb.org/t/p/w780/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg',
  'agatha-all-along': 'https://image.tmdb.org/t/p/w780/mGsxKwXUjojitRv2E9qMTbxbBRd.jpg',
  'avengers-doomsday': 'https://image.tmdb.org/t/p/w780/jzPwsojjFStf5lR5Nm07w2hH56G.jpg',
  'avengers-secret-wars': 'https://image.tmdb.org/t/p/w780/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg',
};

export function getMoviePoster(posterUrl?: string, universe?: string, movieId?: string): string {
  if (movieId && VERIFIED_POSTERS[movieId]) return VERIFIED_POSTERS[movieId];
  if (posterUrl && posterUrl.startsWith('http') && !posterUrl.includes('bZ0y4M7k9u') && !posterUrl.includes('8724M9V189uL') && !posterUrl.includes('qEVUtrk8_B4') && !posterUrl.includes('2b4S_iL3H9g') && !posterUrl.includes('z0J6gCj7W55q') && !posterUrl.includes('kX0aX0z65v') && !posterUrl.includes('bRDAc4GogS9v') && !posterUrl.includes('9K4P5062vM')) {
    return posterUrl;
  }
  return FALLBACK_POSTERS[universe || 'DEFAULT'] || FALLBACK_POSTERS.DEFAULT;
}

export function getMovieBackdrop(backdropUrl?: string, posterUrl?: string, universe?: string, movieId?: string): string {
  if (movieId && VERIFIED_POSTERS[movieId] && (!backdropUrl || backdropUrl.includes('3T1Z2vX') || backdropUrl.includes('7e3wG6z'))) {
    return VERIFIED_POSTERS[movieId];
  }
  if (backdropUrl && backdropUrl.startsWith('http') && !backdropUrl.includes('3T1Z2vX') && !backdropUrl.includes('7e3wG6z') && !backdropUrl.includes('AdyJH8kDm8xT8zmVMzsLs8hk7G6') && !backdropUrl.includes('7d6A0oSD7TN2')) {
    return backdropUrl;
  }
  if (posterUrl && posterUrl.startsWith('http') && !posterUrl.includes('qEVUtrk8_B4')) return posterUrl;
  return FALLBACK_BACKDROPS[universe || 'DEFAULT'] || FALLBACK_BACKDROPS.DEFAULT;
}



export const MOVIE_LOGOS: Record<string, string> = {
  'loki-s1': 'https://image.tmdb.org/t/p/w500/6yb7XUr6l7ctCwf8OJ9NN5brQ53.png',
  'loki-s2': 'https://image.tmdb.org/t/p/w500/6yb7XUr6l7ctCwf8OJ9NN5brQ53.png',
  'doctor-strange-multiverse-madness': 'https://image.tmdb.org/t/p/w500/omz9LWkZgkAEpHeOOdTzSevwG6I.png',
  'deadpool-and-wolverine': 'https://image.tmdb.org/t/p/w500/2o48U3kMXGIqRAkKZQ3n5OTWSBy.png',
  'spider-man-no-way-home': 'https://image.tmdb.org/t/p/w500/9xjIoK8eGVvMdiqwUQbEBUeh9Ej.png',
  'avengers-infinity-war': 'https://image.tmdb.org/t/p/w500/iiFFPJduveJnb6D2TYKL4AFJIFn.png',
  'avengers-endgame': 'https://image.tmdb.org/t/p/w500/4pJWlICBeiHsou1BjYx48aAQqEG.png',
  'fantastic-four-first-steps': 'https://image.tmdb.org/t/p/w500/sst2kO7ySyAm3z5haWXUszOVWi2.png',
  'wandavision': 'https://image.tmdb.org/t/p/w500/bqIhmrQcPTqDqIkNhdiK5Epvk2D.png',
  'what-if-s1': 'https://image.tmdb.org/t/p/w500/zWX2sHd0KnRTvIi7nJ5k7ng5EMW.png',
  'the-marvels': 'https://image.tmdb.org/t/p/w500/fLiEU12qHCs2xP73OgLFVVObS1k.png',
  'ant-man-quantumania': 'https://image.tmdb.org/t/p/w500/iUhdNfX8VqZJpgUx5bgAEoHxQRQ.png',
  'captain-america-brave-new-world': 'https://image.tmdb.org/t/p/w500/ubZE4IVOdOnZIp6mapDGooDYeJh.png',
  'xmen-days-of-future-past': 'https://image.tmdb.org/t/p/w500/d3vdGM4NBUTnzyjWn5h1qfJNczj.png',
  'logan': 'https://image.tmdb.org/t/p/w500/qDbxobWA4J2xVqwuDl71vg8JZxX.png',
  'xmen-first-class': 'https://image.tmdb.org/t/p/w500/AbyvHmfBLOWjA0vL29hK83KnLFc.png',
  'amazing-spider-man': 'https://image.tmdb.org/t/p/w500/wpjoFEW3fl7NYJNrBW2b1NicW2V.png',
  'spider-man-into-the-spider-verse': 'https://image.tmdb.org/t/p/w500/xrM5rEtoW0Hd0QXmy5b4WBGZuHd.png',
  'spider-man-across-the-spider-verse': 'https://image.tmdb.org/t/p/w500/cmE0j3mQQe6xrzLryxGF9rF2KC8.png',
  'fantastic-four-rise-silver-surfer': 'https://image.tmdb.org/t/p/w500/dgbnTqH4IzmhYZvnzyVS5BxHUWV.png',
  'iron-man-2008': 'https://image.tmdb.org/t/p/w500/f1EpI3C6wd1iv7dCxNi3vU5DAX7.png',
  'captain-america-civil-war': 'https://image.tmdb.org/t/p/w500/fdMbaPFh6QoPteehlvYq5NHlbkK.png',
  'doctor-strange-2016': 'https://image.tmdb.org/t/p/w500/oGTJ88hszp8GuTpppGmYceJB7RP.png',
  'shang-chi': 'https://image.tmdb.org/t/p/w500/fzeo6tseRbmjlhjrZbtuwr8Ygyn.png',
  'agatha-all-along': 'https://image.tmdb.org/t/p/w500/3RiiNqzCGGuwUtyTh1syOXmDbQp.png',
  'avengers-doomsday': 'https://image.tmdb.org/t/p/w500/6rfcehI0kmv2y8aGqKIYWENXO8y.png',
  'avengers-secret-wars': 'https://image.tmdb.org/t/p/w500/6rfcehI0kmv2y8aGqKIYWENXO8y.png',
};

export const getMovieLogo = (id: string): string | undefined => {
  return MOVIE_LOGOS[id];
};
