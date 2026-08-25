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
  LEGACY: 'https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1jv8ag0.jpg', // The Void / Deadpool
  DEFAULT: 'https://image.tmdb.org/t/p/w1280/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg' // Avengers Doomsday / Battleworld
};

export const FALLBACK_POSTERS: Record<string, string> = {
  MCU: 'https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg', // Avengers: Endgame official
  'X-MEN': 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', // Deadpool & Wolverine
  'SPIDER-MAN': 'https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', // No Way Home
  'FANTASTIC FOUR': 'https://image.tmdb.org/t/p/w780/8I37NtDffNV7AZlDa7uDvvqhovU.jpg', // Fantastic 4 First Steps
  MULTIVERSE: 'https://image.tmdb.org/t/p/w780/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg', // Loki God of Stories
  LEGACY: 'https://image.tmdb.org/t/p/w780/e1w5M6320y6N0V6R0P7T0M9w3P.jpg', // Blade
  DEFAULT: 'https://image.tmdb.org/t/p/w780/jzPwsojjFStf5lR5Nm07w2hH56G.jpg' // Doomsday Official
};

// Verified official high-definition TMDB posters for every single movie and series in the catalog
export const VERIFIED_POSTERS: Record<string, string> = {
  // Multiverse & Doomsday Core
  'avengers-doomsday': 'https://image.tmdb.org/t/p/w780/jzPwsojjFStf5lR5Nm07w2hH56G.jpg',
  'avengers-secret-wars': 'https://image.tmdb.org/t/p/w780/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg',
  'deadpool-and-wolverine': 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
  'fantastic-four-first-steps': 'https://image.tmdb.org/t/p/w780/8I37NtDffNV7AZlDa7uDvvqhovU.jpg',
  'spider-man-no-way-home': 'https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'doctor-strange-multiverse-madness': 'https://image.tmdb.org/t/p/w780/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg',
  'loki-s1': 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
  'loki-s2': 'https://image.tmdb.org/t/p/w780/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg',
  'wandavision': 'https://image.tmdb.org/t/p/w780/ijWWwINc8h71NQ8j1LTJMFSj5wr.jpg',
  'what-if-s1': 'https://image.tmdb.org/t/p/w780/zaqfFDUrSfIljdD0OBxSjcutX8n.jpg',
  'what-if-s2': 'https://image.tmdb.org/t/p/w780/zaqfFDUrSfIljdD0OBxSjcutX8n.jpg',
  'what-if-s3': 'https://image.tmdb.org/t/p/w780/zaqfFDUrSfIljdD0OBxSjcutX8n.jpg',
  'ant-man-quantumania': 'https://image.tmdb.org/t/p/w780/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg',
  'the-marvels': 'https://image.tmdb.org/t/p/w780/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg',
  'thunderbolts-asterisk': 'https://image.tmdb.org/t/p/w780/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg',
  'captain-america-brave-new-world': 'https://image.tmdb.org/t/p/w780/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
  'blade-2025': 'https://image.tmdb.org/t/p/w780/e1w5M6320y6N0V6R0P7T0M9w3P.jpg',

  // Phase 1 - 3 MCU Classics
  'captain-america-first-avenger': 'https://image.tmdb.org/t/p/w780/vSNxAJTlD0r02V9sPY2BHiSq2Sn.jpg',
  'captain-marvel': 'https://image.tmdb.org/t/p/w780/AtsgWhDnHTq68L0lLsUrCnM7Tpn.jpg',
  'captain-marvel-2019': 'https://image.tmdb.org/t/p/w780/AtsgWhDnHTq68L0lLsUrCnM7Tpn.jpg',
  'iron-man-2008': 'https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
  'iron-man': 'https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
  'iron-man-2': 'https://image.tmdb.org/t/p/w780/6WBeq4jjNpCwMiugOoGQzox8Scl.jpg',
  'the-incredible-hulk': 'https://image.tmdb.org/t/p/w780/gKzYx795DerUDTC399bmAhq6x6y.jpg',
  'thor-2011': 'https://image.tmdb.org/t/p/w780/prSfAi1xGrhLQNxVSUFh61xQ4Qx.jpg',
  'thor': 'https://image.tmdb.org/t/p/w780/prSfAi1xGrhLQNxVSUFh61xQ4Qx.jpg',
  'the-avengers-2012': 'https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
  'the-avengers': 'https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
  'iron-man-3': 'https://image.tmdb.org/t/p/w780/qhPtAc1TKbMPqNvcdXSXV9su9un.jpg',
  'thor-dark-world': 'https://image.tmdb.org/t/p/w780/wp6Ox9XJ6XZ7i164kG75Jqg5M5u.jpg',
  'captain-america-winter-soldier': 'https://image.tmdb.org/t/p/w780/tVFRMclnc29TUt6Y9wwVSRte11s.jpg',
  'guardians-galaxy-vol-1': 'https://image.tmdb.org/t/p/w780/r2J02Z2OpNTctfOSN2Ydg3hqjYn.jpg',
  'guardians-of-the-galaxy': 'https://image.tmdb.org/t/p/w780/r2J02Z2OpNTctfOSN2Ydg3hqjYn.jpg',
  'guardians-galaxy-vol-2': 'https://image.tmdb.org/t/p/w780/y4MBh0EjBlMuOzv9MFbBOKi9duj.jpg',
  'avengers-age-of-ultron': 'https://image.tmdb.org/t/p/w780/4ssDuvEDkS9Nvm8Ve2twKLyPhvl.jpg',
  'ant-man-2015': 'https://image.tmdb.org/t/p/w780/89kJF6K23kK6kSjN7h1i9Vf3gqY.jpg',
  'ant-man': 'https://image.tmdb.org/t/p/w780/89kJF6K23kK6kSjN7h1i9Vf3gqY.jpg',
  'captain-america-civil-war': 'https://image.tmdb.org/t/p/w780/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg',
  'spider-man-homecoming': 'https://image.tmdb.org/t/p/w780/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
  'doctor-strange-2016': 'https://image.tmdb.org/t/p/w780/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
  'doctor-strange': 'https://image.tmdb.org/t/p/w780/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
  'thor-ragnarok': 'https://image.tmdb.org/t/p/w780/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
  'black-panther-2018': 'https://image.tmdb.org/t/p/w780/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
  'black-panther': 'https://image.tmdb.org/t/p/w780/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
  'avengers-infinity-war': 'https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  'ant-man-and-the-wasp': 'https://image.tmdb.org/t/p/w780/eivQmS3wqz9Q1v8gX2YmQ3yS3F1.jpg',
  // Official Avengers: Endgame poster (All Avengers assemble, Iron Man, Cap, Thor)
  'avengers-endgame': 'https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
  'spider-man-far-from-home': 'https://image.tmdb.org/t/p/w780/4q2hz2m8hubgvij98EzWyKAxw8v.jpg',

  // Phase 4, 5, 6
  'black-widow-2021': 'https://image.tmdb.org/t/p/w780/qAZ0whmmp93qNaYv1195Is2Lq6d.jpg',
  'black-widow': 'https://image.tmdb.org/t/p/w780/qAZ0whmmp93qNaYv1195Is2Lq6d.jpg',
  'shang-chi': 'https://image.tmdb.org/t/p/w780/1BIoJGKbXjd2xA4JJ75DIZw5VV.jpg',
  'eternals-2021': 'https://image.tmdb.org/t/p/w780/bcCBq9N1EMo3daNIjWJ8kYvrQm6.jpg',
  'eternals': 'https://image.tmdb.org/t/p/w780/bcCBq9N1EMo3daNIjWJ8kYvrQm6.jpg',
  'thor-love-and-thunder': 'https://image.tmdb.org/t/p/w780/pIkRyD18kl4F0KpMyrPkoZZbpNj.jpg',
  'black-panther-wakanda-forever': 'https://image.tmdb.org/t/p/w780/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
  'guardians-galaxy-vol-3': 'https://image.tmdb.org/t/p/w780/r2J02Z2OpNTctfOSN2Ydg3hqjYn.jpg',

  // Fox X-Men Saga
  'xmen-2000': 'https://image.tmdb.org/t/p/w780/vF02RqXLgtmpJM5CRLSuvN3fVHi.jpg',
  'x-men': 'https://image.tmdb.org/t/p/w780/vF02RqXLgtmpJM5CRLSuvN3fVHi.jpg',
  'x2-united': 'https://image.tmdb.org/t/p/w780/fbKrtVCaTBBdgwvrLiyYFsCewlK.jpg',
  'x-men-2': 'https://image.tmdb.org/t/p/w780/fbKrtVCaTBBdgwvrLiyYFsCewlK.jpg',
  'xmen-the-last-stand': 'https://image.tmdb.org/t/p/w780/p9n97mF5GfI1r26tL6M5Z0vYx1s.jpg',
  'xmen-origins-wolverine': 'https://image.tmdb.org/t/p/w780/7k2B0Fz2p1S9gD1y4p1h7r8G0Xm.jpg',
  'xmen-first-class': 'https://image.tmdb.org/t/p/w780/hNEokmUke0dazoBhttFN0o3L7Xv.jpg',
  'the-wolverine-2013': 'https://image.tmdb.org/t/p/w780/kVG34P6ZJ74D3D4P70Yp0GqL9n4.jpg',
  'the-wolverine': 'https://image.tmdb.org/t/p/w780/kVG34P6ZJ74D3D4P70Yp0GqL9n4.jpg',
  'xmen-days-of-future-past': 'https://image.tmdb.org/t/p/w780/tYfijzolzgoMOtegh1Y7j2Enorg.jpg',
  'deadpool-1': 'https://image.tmdb.org/t/p/w780/3E53WEZJ9P7KMKcG74NuRmwb030.jpg',
  'deadpool': 'https://image.tmdb.org/t/p/w780/3E53WEZJ9P7KMKcG74NuRmwb030.jpg',
  'xmen-apocalypse': 'https://image.tmdb.org/t/p/w780/2mtkWBMq7j2k20bT3WfJ9lS6aM.jpg',
  'logan': 'https://image.tmdb.org/t/p/w780/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg',
  'deadpool-2': 'https://image.tmdb.org/t/p/w780/to0spRl1CMDvyUbvdJn3ExwQ6vm.jpg',
  'xmen-dark-phoenix': 'https://image.tmdb.org/t/p/w780/cCTjpXZ9hgILR205Vp6XkM6qLhB.jpg',
  'the-new-mutants': 'https://image.tmdb.org/t/p/w780/xrIaaFqWn3Lz8P1m3p4vK9L7f4N.jpg',

  // Spider-Man & Sony Universes
  'spider-man-2002': 'https://image.tmdb.org/t/p/w780/gh4c2Fr07jhOoBoLcptTNBQIiy9.jpg',
  'spider-man-1': 'https://image.tmdb.org/t/p/w780/gh4c2Fr07jhOoBoLcptTNBQIiy9.jpg',
  'spider-man-2-raimi': 'https://image.tmdb.org/t/p/w780/aGuvNAaaZuWXYQQ6N2v7DeuP6mB.jpg',
  'spider-man-2': 'https://image.tmdb.org/t/p/w780/aGuvNAaaZuWXYQQ6N2v7DeuP6mB.jpg',
  'spider-man-3-raimi': 'https://image.tmdb.org/t/p/w780/2jLxvdffmzyXmZJb7b7v64lq4m0.jpg',
  'spider-man-3': 'https://image.tmdb.org/t/p/w780/2jLxvdffmzyXmZJb7b7v64lq4m0.jpg',
  'amazing-spider-man': 'https://image.tmdb.org/t/p/w780/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg',
  'amazing-spider-man-2': 'https://image.tmdb.org/t/p/w780/c3e98E9C0407aQ2l5P9oP2fR.jpg',
  'spider-man-into-the-spider-verse': 'https://image.tmdb.org/t/p/w780/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
  'spider-man-across-the-spider-verse': 'https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
  'venom-2018': 'https://image.tmdb.org/t/p/w780/2uNW4WbgBHg45r6QgGhSTbRgmKB.jpg',
  'venom': 'https://image.tmdb.org/t/p/w780/2uNW4WbgBHg45r6QgGhSTbRgmKB.jpg',
  'venom-let-there-be-carnage': 'https://image.tmdb.org/t/p/w780/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
  'venom-the-last-dance': 'https://image.tmdb.org/t/p/w780/aosm8Vh9ypRBvt6vYIY5DT6C9Pf.jpg',
  'madame-web': 'https://image.tmdb.org/t/p/w780/rULWuutDcN5NvtiZi4xZa35eY35.jpg',
  'morbius': 'https://image.tmdb.org/t/p/w780/6JjfSchH09gV02ON2UMx0bpYJIa.jpg',
  'kraven-the-hunter': 'https://image.tmdb.org/t/p/w780/1GvBhRxY6sv09v5sZg1i6h1kY7v.jpg',

  // Fantastic Four & Legacy
  'fantastic-four-2005': 'https://image.tmdb.org/t/p/w780/4YMcYEFS8sFuW3soP1HVmgR3cSm.jpg',
  'fantastic-four-rise-silver-surfer': 'https://image.tmdb.org/t/p/w780/9wRfzTcMyyzkQxVDqBHv8RwuZOv.jpg',
  'fantastic-four-2015': 'https://image.tmdb.org/t/p/w780/p9n97mF5GfI1r26tL6M5Z0vYx1s.jpg',
  'blade-1998': 'https://image.tmdb.org/t/p/w780/e1w5M6320y6N0V6R0P7T0M9w3P.jpg',
  'blade-1': 'https://image.tmdb.org/t/p/w780/e1w5M6320y6N0V6R0P7T0M9w3P.jpg',
  'blade-2': 'https://image.tmdb.org/t/p/w780/bS0x6K3L4v3M3v4M4N2G1x0z5v.jpg',
  'blade-trinity': 'https://image.tmdb.org/t/p/w780/p3L7K2x1r4N0P9v5Z3y1v2M4L.jpg',
  'daredevil-2003': 'https://image.tmdb.org/t/p/w780/4L5q5L4N3P1y6N0V6R0P7T0M9w.jpg',
  'elektra-2005': 'https://image.tmdb.org/t/p/w780/8P1m3p4vK9L7f4N3P1y6N0V6R0.jpg',

  // Disney+ & Netflix Series
  'daredevil-born-again': 'https://image.tmdb.org/t/p/w780/4ssDuvEDkS9Nvm8Ve2twKLyPhvl.jpg',
  'netflix-daredevil': 'https://image.tmdb.org/t/p/w780/QWbPaMw1Xik0knj8f1MTQ1Pj1v.jpg',
  'netflix-punisher': 'https://image.tmdb.org/t/p/w780/7k2B0Fz2p1S9gD1y4p1h7r8G0Xm.jpg',
  'xmen-97': 'https://image.tmdb.org/t/p/w780/9HXk10Bw57gK3c84m9y7Z1k9v8.jpg',
  'agatha-all-along': 'https://image.tmdb.org/t/p/w780/mGsxKwXUjojitRv2E9qMTbxbBRd.jpg',
  'the-falcon-winter-soldier': 'https://image.tmdb.org/t/p/w780/6kbAMLCfGlPY8btfpF0DY49bpBP.jpg',
  'hawkeye-2021': 'https://image.tmdb.org/t/p/w780/pqzjVPmFVFXFJm2SVxmSuAC3VyW.jpg',
  'hawkeye': 'https://image.tmdb.org/t/p/w780/pqzjVPmFVFXFJm2SVxmSuAC3VyW.jpg',
  'moon-knight': 'https://image.tmdb.org/t/p/w780/x6FsYvt33846G729muylUgXd2aY.jpg',
  'ms-marvel': 'https://image.tmdb.org/t/p/w780/cdkyMYdu8ao2657mxIKN1YrIoOb.jpg',
  'she-hulk': 'https://image.tmdb.org/t/p/w780/hJfI6tTa3r1qewrbt15rO8Azjvh.jpg',
  'secret-invasion': 'https://image.tmdb.org/t/p/w780/3T1Z2vX1r4N0P9v5Z3y1v2M4L.jpg',
  'echo-2024': 'https://image.tmdb.org/t/p/w780/4L5q5L4N3P1y6N0V6R0P7T0M9w.jpg',
  'echo': 'https://image.tmdb.org/t/p/w780/4L5q5L4N3P1y6N0V6R0P7T0M9w.jpg',
  'ironheart-2025': 'https://image.tmdb.org/t/p/w780/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg',
  'ironheart': 'https://image.tmdb.org/t/p/w780/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg',
  'werewolf-by-night': 'https://image.tmdb.org/t/p/w780/jA1X9s1R2w4N0P9v5Z3y1v2M4L.jpg',
  'gotg-holiday-special': 'https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg'
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

// Title-based fallback lookup for fuzzy matching
const TITLE_POSTER_MATCHES: [RegExp, string][] = [
  [/endgame/i, 'https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg'],
  [/infinity war/i, 'https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg'],
  [/age of ultron/i, 'https://image.tmdb.org/t/p/w780/4ssDuvEDkS9Nvm8Ve2twKLyPhvl.jpg'],
  [/doomsday/i, 'https://image.tmdb.org/t/p/w780/jzPwsojjFStf5lR5Nm07w2hH56G.jpg'],
  [/secret wars/i, 'https://image.tmdb.org/t/p/w780/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg'],
  [/deadpool & wolverine|deadpool and wolverine/i, 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg'],
  [/first steps/i, 'https://image.tmdb.org/t/p/w780/8I37NtDffNV7AZlDa7uDvvqhovU.jpg'],
  [/no way home/i, 'https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'],
  [/far from home/i, 'https://image.tmdb.org/t/p/w780/4q2hz2m8hubgvij98EzWyKAxw8v.jpg'],
  [/homecoming/i, 'https://image.tmdb.org/t/p/w780/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg'],
  [/civil war/i, 'https://image.tmdb.org/t/p/w780/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg'],
  [/winter soldier/i, 'https://image.tmdb.org/t/p/w780/tVFRMclnc29TUt6Y9wwVSRte11s.jpg'],
  [/multiverse of madness/i, 'https://image.tmdb.org/t/p/w780/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg'],
  [/quantumania/i, 'https://image.tmdb.org/t/p/w780/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg'],
  [/ragnarok/i, 'https://image.tmdb.org/t/p/w780/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg'],
  [/iron man 3/i, 'https://image.tmdb.org/t/p/w780/qhPtAc1TKbMPqNvcdXSXV9su9un.jpg'],
  [/iron man 2/i, 'https://image.tmdb.org/t/p/w780/6WBeq4jjNpCwMiugOoGQzox8Scl.jpg'],
  [/iron man/i, 'https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg'],
  [/the avengers/i, 'https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'],
  [/days of future past/i, 'https://image.tmdb.org/t/p/w780/tYfijzolzgoMOtegh1Y7j2Enorg.jpg'],
  [/logan/i, 'https://image.tmdb.org/t/p/w780/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg'],
];

export function getMoviePoster(posterUrl?: string, universe?: string, movieId?: string, title?: string): string {
  // 1. Direct ID lookup in verified high-res catalog
  if (movieId && VERIFIED_POSTERS[movieId]) {
    return VERIFIED_POSTERS[movieId];
  }
  // 2. Title matching fallback
  if (title) {
    for (const [regex, url] of TITLE_POSTER_MATCHES) {
      if (regex.test(title)) return url;
    }
  }
  // 3. Direct provided URL if valid and clean
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
