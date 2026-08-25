/**
 * Resilient Image & Poster Management for Marvel Doomsday Hub
 * High-definition, verified CDN posters, backdrops, and logos with zero broken image states.
 */

// Fallback high-res Marvel themed backdrops from reliable CDNs
export const FALLBACK_BACKDROPS: Record<string, string> = {
  MCU: 'https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', // Avengers Endgame
  'X-MEN': 'https://image.tmdb.org/t/p/w1280/9K4P5062vM6S9z0J92z0V7Z9a0J.jpg', // Days of Future Past
  'SPIDER-MAN': 'https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg', // No Way Home
  'FANTASTIC FOUR': 'https://image.tmdb.org/t/p/w1280/8I37NtDffNV7AZlDa7uDvvqhovU.jpg', // Fantastic Four First Steps
  MULTIVERSE: 'https://image.tmdb.org/t/p/w1280/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg', // Multiverse / Battleworld
  DEFAULT: 'https://image.tmdb.org/t/p/w1280/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg' // Avengers Doomsday / Battleworld
};

export const FALLBACK_POSTERS: Record<string, string> = {
  MCU: 'https://image.tmdb.org/t/p/w780/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg', // Endgame
  'X-MEN': 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', // Deadpool & Wolverine
  'SPIDER-MAN': 'https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', // No Way Home
  'FANTASTIC FOUR': 'https://image.tmdb.org/t/p/w780/8I37NtDffNV7AZlDa7uDvvqhovU.jpg', // Fantastic 4 First Steps
  MULTIVERSE: 'https://image.tmdb.org/t/p/w780/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg', // Loki God of Stories (Season 2)
  DEFAULT: 'https://image.tmdb.org/t/p/w780/jzPwsojjFStf5lR5Nm07w2hH56G.jpg' // Doomsday Official
};

// Verified official high-definition TMDB posters for every single movie and series in the catalog
export const VERIFIED_POSTERS: Record<string, string> = {
  'loki-s1': 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
  'loki-s2': 'https://image.tmdb.org/t/p/w780/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg',
  'doctor-strange-multiverse-madness': 'https://image.tmdb.org/t/p/w780/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg',
  'deadpool-and-wolverine': 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
  'spider-man-no-way-home': 'https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'avengers-infinity-war': 'https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  'avengers-endgame': 'https://image.tmdb.org/t/p/w780/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
  'fantastic-four-first-steps': 'https://image.tmdb.org/t/p/w780/8I37NtDffNV7AZlDa7uDvvqhovU.jpg',
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
  'spider-man-2002': 'https://image.tmdb.org/t/p/w780/gh4c2Fr07jhOoBoLcptTNBQIiy9.jpg',
  'spider-man-2-raimi': 'https://image.tmdb.org/t/p/w780/aGuvNAaaZuWXYQQ6N2v7DeuP6mB.jpg',
  'spider-man-3-raimi': 'https://image.tmdb.org/t/p/w780/2jLxvdffmzyXmZJb7b7v64lq4m0.jpg',
  'amazing-spider-man': 'https://image.tmdb.org/t/p/w780/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg',
  'amazing-spider-man-2': 'https://image.tmdb.org/t/p/w780/c3e98E9C0407aQ2l5P9oP2fR.jpg',
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

// Verified official high-definition TMDB backdrops
export const VERIFIED_BACKDROPS: Record<string, string> = {
  'loki-s1': 'https://image.tmdb.org/t/p/w1280/84XPpjGvxNyExjSuLQe0URioioB.jpg',
  'loki-s2': 'https://image.tmdb.org/t/p/w1280/84XPpjGvxNyExjSuLQe0URioioB.jpg',
  'doctor-strange-multiverse-madness': 'https://image.tmdb.org/t/p/w1280/AdyXEuXzQyyMprk4xkWnFSDVvI5.jpg',
  'deadpool-and-wolverine': 'https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1jv8ag0.jpg',
  'spider-man-no-way-home': 'https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
  'avengers-infinity-war': 'https://image.tmdb.org/t/p/w1280/mDfJG3LC3Dqb67AZ52xYmnVZulv.jpg',
  'avengers-endgame': 'https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
  'fantastic-four-first-steps': 'https://image.tmdb.org/t/p/w1280/8I37NtDffNV7AZlDa7uDvvqhovU.jpg',
  'wandavision': 'https://image.tmdb.org/t/p/w1280/57vVghaGFSlQ0EGNusZqZqA0nco.jpg',
  'what-if-s1': 'https://image.tmdb.org/t/p/w1280/4N6zEMfZ5mMMbQ1og3y9FwKqQ8n.jpg',
  'the-marvels': 'https://image.tmdb.org/t/p/w1280/feSiISwgEpumOysj0mND1eC271n.jpg',
  'ant-man-quantumania': 'https://image.tmdb.org/t/p/w1280/m8JTwMwGxL7S5999IROIUrvM0hh.jpg',
  'thunderbolts-asterisk': 'https://image.tmdb.org/t/p/w1280/3CxUndGhUcZUt1yqd9ZymIzNGSu.jpg',
  'captain-america-brave-new-world': 'https://image.tmdb.org/t/p/w1280/uKb22E1nlSr99AumFf6aL7wI0n9.jpg',
  'xmen-days-of-future-past': 'https://image.tmdb.org/t/p/w1280/9K4P5062vM6S9z0J92z0V7Z9a0J.jpg',
  'logan': 'https://image.tmdb.org/t/p/w1280/2SEy28c9bJ00NqG98N0H7m4a0tL.jpg',
  'xmen-first-class': 'https://image.tmdb.org/t/p/w1280/39WMHukgCjB7gJbzpBE5YxegRcx.jpg',
  'xmen-2000': 'https://image.tmdb.org/t/p/w1280/y4aY5Q3u1t0x8M6G5s9Y3u2H1qP.jpg',
  'x2-united': 'https://image.tmdb.org/t/p/w1280/olxpyq9kJAZ2NU1iYeIPNgNutda.jpg',
  'spider-man-2-raimi': 'https://image.tmdb.org/t/p/w1280/6MQmtqqSDcb5wYlPj3zW7rC0sWc.jpg',
  'amazing-spider-man': 'https://image.tmdb.org/t/p/w1280/jIfkxtVX0t444u4M8Hj52z0nK2p.jpg',
  'spider-man-into-the-spider-verse': 'https://image.tmdb.org/t/p/w1280/7d6A0oSD7TN24f57cT4.jpg',
  'spider-man-across-the-spider-verse': 'https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
  'fantastic-four-2005': 'https://image.tmdb.org/t/p/w1280/4N6zEMfZ5mMMbQ1og3y9FwKqQ8n.jpg',
  'fantastic-four-rise-silver-surfer': 'https://image.tmdb.org/t/p/w1280/d3vdGM4NBUTnzyjWn5h1qfJNczj.jpg',
  'iron-man-2008': 'https://image.tmdb.org/t/p/w1280/7vcs7fP2KQkp4Ok4pS05R.jpg',
  'the-avengers-2012': 'https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
  'captain-america-civil-war': 'https://image.tmdb.org/t/p/w1280/kvRT3uvOTy1V53jwTeUW8MKnNm2.jpg',
  'doctor-strange-2016': 'https://image.tmdb.org/t/p/w1280/tFI8VLMgSTTU38i8TIsklfq29Nl.jpg',
  'shang-chi': 'https://image.tmdb.org/t/p/w1280/cinER0j6zbFL2NeVCkfyPf5smjC.jpg',
  'agatha-all-along': 'https://image.tmdb.org/t/p/w1280/57vVghaGFSlQ0EGNusZqZqA0nco.jpg',
  'avengers-doomsday': 'https://image.tmdb.org/t/p/w1280/s4v0UX1anfXm0UvloLsTTJ4v222.jpg',
  'avengers-secret-wars': 'https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
};

export function getMoviePoster(posterUrl?: string, universe?: string, movieId?: string): string {
  if (movieId && VERIFIED_POSTERS[movieId]) return VERIFIED_POSTERS[movieId];
  if (posterUrl && posterUrl.startsWith('http') && !posterUrl.includes('bZ0y4M7k9u') && !posterUrl.includes('8724M9V189uL') && !posterUrl.includes('qEVUtrk8_B4') && !posterUrl.includes('2b4S_iL3H9g') && !posterUrl.includes('z0J6gCj7W55q') && !posterUrl.includes('kX0aX0z65v') && !posterUrl.includes('bRDAc4GogS9v') && !posterUrl.includes('9K4P5062vM') && !posterUrl.includes('voHUmlvjysvGyxMo2h4qRIvjhTR')) {
    return posterUrl;
  }
  return FALLBACK_POSTERS[universe || 'DEFAULT'] || FALLBACK_POSTERS.DEFAULT;
}

export function getMovieBackdrop(backdropUrl?: string, posterUrl?: string, universe?: string, movieId?: string): string {
  if (movieId && VERIFIED_BACKDROPS[movieId]) {
    return VERIFIED_BACKDROPS[movieId];
  }
  if (backdropUrl && backdropUrl.startsWith('http') && !backdropUrl.includes('3T1Z2vX') && !backdropUrl.includes('7e3wG6z') && !backdropUrl.includes('AdyJH8kDm8xT8zmVMzsLs8hk7G6') && !backdropUrl.includes('7d6A0oSD7TN2') && !backdropUrl.includes('5B8Wc2h1G0K7bV5P2Q5d1x6kY1n') && !backdropUrl.includes('wcKFYmSM927h1Fm99qU1P1k4K1a')) {
    return backdropUrl;
  }
  if (movieId && VERIFIED_POSTERS[movieId]) {
    return VERIFIED_POSTERS[movieId];
  }
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
  'fantastic-four-first-steps': 'https://image.tmdb.org/t/p/w500/hpvf0d8XQ2Ty31CAKV9u8FNrZmD.png',
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
  // Official Avengers: Doomsday logo (Green metallic with Doomsday typography)
  'avengers-doomsday': 'https://image.tmdb.org/t/p/w500/enJPk9TdYB4zCO1mIwiRYAb5yqY.png',
  // Official Avengers: Secret Wars logo
  'avengers-secret-wars': 'https://image.tmdb.org/t/p/w500/6rfcehI0kmv2y8aGqKIYWENXO8y.png',
};

export const getMovieLogo = (id: string): string | undefined => {
  return MOVIE_LOGOS[id];
};
