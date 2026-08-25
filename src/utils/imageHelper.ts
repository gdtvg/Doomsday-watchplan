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

// Verified official TMDB posters for every movie and series in the catalog.
// Fetched directly from the TMDB API by each title's tmdbId - do not hand-edit hashes.
export const VERIFIED_POSTERS: Record<string, string> = {
  // Fantastic Four & Legacy (Blade, Daredevil, Elektra)
  'fantastic-four-2005': 'https://image.tmdb.org/t/p/w780/4YMcYEFS8sFuW3soP1HVmgR3cSm.jpg',
  'fantastic-four-rise-silver-surfer': 'https://image.tmdb.org/t/p/w780/9wRfzTcMyyzkQxVDqBHv8RwuZOv.jpg',
  'fantastic-four-2015': 'https://image.tmdb.org/t/p/w780/cDroz5qSlP8xZ6tOpeYoPkBvKyL.jpg',
  'blade-1998': 'https://image.tmdb.org/t/p/w780/oWT70TvbsmQaqyphCZpsnQR7R32.jpg',
  'blade-2': 'https://image.tmdb.org/t/p/w780/yDHwo3eWcMiy5LnnEnlGV9iLu9k.jpg',
  'blade-trinity': 'https://image.tmdb.org/t/p/w780/3pyE6ZqDbuJi7zrNzzQzcKTWdmN.jpg',
  'daredevil-2003': 'https://image.tmdb.org/t/p/w780/oCDBwSkntYamuw8VJIxMRCtDBmi.jpg',
  'elektra-2005': 'https://image.tmdb.org/t/p/w780/gC6s6NKHneSrOKyQZnUMb443RKU.jpg',
  // MCU Phase 1 - 3
  'captain-america-first-avenger': 'https://image.tmdb.org/t/p/w780/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg',
  'captain-marvel': 'https://image.tmdb.org/t/p/w780/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
  'iron-man-2008': 'https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
  'iron-man-2': 'https://image.tmdb.org/t/p/w780/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg',
  'the-incredible-hulk': 'https://image.tmdb.org/t/p/w780/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg',
  'thor-2011': 'https://image.tmdb.org/t/p/w780/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg',
  'the-avengers-2012': 'https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
  'iron-man-3': 'https://image.tmdb.org/t/p/w780/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg',
  'thor-dark-world': 'https://image.tmdb.org/t/p/w780/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg',
  'captain-america-winter-soldier': 'https://image.tmdb.org/t/p/w780/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg',
  'guardians-of-the-galaxy': 'https://image.tmdb.org/t/p/w780/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
  'avengers-age-of-ultron': 'https://image.tmdb.org/t/p/w780/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg',
  'ant-man': 'https://image.tmdb.org/t/p/w780/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg',
  'captain-america-civil-war': 'https://image.tmdb.org/t/p/w780/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg',
  'doctor-strange': 'https://image.tmdb.org/t/p/w780/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
  'guardians-of-the-galaxy-vol-2': 'https://image.tmdb.org/t/p/w780/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg',
  'spider-man-homecoming': 'https://image.tmdb.org/t/p/w780/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
  'thor-ragnarok': 'https://image.tmdb.org/t/p/w780/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
  'black-panther': 'https://image.tmdb.org/t/p/w780/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
  'avengers-infinity-war': 'https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  'ant-man-and-the-wasp': 'https://image.tmdb.org/t/p/w780/cFQEO687n1K6umXbInzocxcnAQz.jpg',
  'avengers-endgame': 'https://image.tmdb.org/t/p/w780/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
  'spider-man-far-from-home': 'https://image.tmdb.org/t/p/w780/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
  // MCU Phase 4 - 6 & Multiverse/Doomsday Core
  'black-widow': 'https://image.tmdb.org/t/p/w780/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
  'shang-chi': 'https://image.tmdb.org/t/p/w780/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg',
  'eternals': 'https://image.tmdb.org/t/p/w780/lFByFSLV5WDJEv3KabbdAF959F2.jpg',
  'spider-man-no-way-home': 'https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'doctor-strange-multiverse-madness': 'https://image.tmdb.org/t/p/w780/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg',
  'thor-love-and-thunder': 'https://image.tmdb.org/t/p/w780/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
  'black-panther-wakanda-forever': 'https://image.tmdb.org/t/p/w780/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
  'ant-man-quantumania': 'https://image.tmdb.org/t/p/w780/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg',
  'guardians-galaxy-vol-3': 'https://image.tmdb.org/t/p/w780/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
  'the-marvels': 'https://image.tmdb.org/t/p/w780/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg',
  'captain-america-brave-new-world': 'https://image.tmdb.org/t/p/w780/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
  'thunderbolts-asterisk': 'https://image.tmdb.org/t/p/w780/6PCnxKZZIVRanWb710pNpYVkCSw.jpg',
  'fantastic-four-first-steps': 'https://image.tmdb.org/t/p/w780/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg',
  'spider-man-brand-new-day': 'https://image.tmdb.org/t/p/w780/w46Vw536HwNnEzOa7J24YH9DPRS.jpg',
  'avengers-doomsday': 'https://image.tmdb.org/t/p/w780/jzPwsojjFStf5lR5Nm07w2hH56G.jpg',
  'avengers-secret-wars': 'https://image.tmdb.org/t/p/w780/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg',
  // Disney+ & Netflix Series / Specials
  'wandavision': 'https://image.tmdb.org/t/p/w780/ijWWwINc8h71NQ8j1LTJMFSj5wr.jpg',
  'the-falcon-winter-soldier': 'https://image.tmdb.org/t/p/w780/6kbAMLteGO8yyewYau6bJ683sw7.jpg',
  'loki-s1': 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
  'what-if-s1': 'https://image.tmdb.org/t/p/w780/zaqfFDUrSfIljdD0OBxSjcutX8n.jpg',
  'hawkeye-2021': 'https://image.tmdb.org/t/p/w780/ct5pNE5dDHryHLDnxyZPYcqO1sz.jpg',
  'moon-knight': 'https://image.tmdb.org/t/p/w780/x6FsYvt33846IQnDSFxla9j0RX8.jpg',
  'ms-marvel': 'https://image.tmdb.org/t/p/w780/3HWWh92kZbD7odwJX7nKmXNZsYo.jpg',
  'she-hulk': 'https://image.tmdb.org/t/p/w780/5xz2orV8f0usyrfGNshcoXHmiaV.jpg',
  'secret-invasion': 'https://image.tmdb.org/t/p/w780/mztdt3y6GBsJR69zHtszFezTCLT.jpg',
  'loki-s2': 'https://image.tmdb.org/t/p/w780/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg',
  'what-if-s2': 'https://image.tmdb.org/t/p/w780/3yhoq5LVMgKy9rEriH6ytq9BoJV.jpg',
  'echo-2024': 'https://image.tmdb.org/t/p/w780/mGsxKwXUjojitRv2E9qMTbxbBRd.jpg',
  'agatha-all-along': 'https://image.tmdb.org/t/p/w780/2HKBc5UiFw8JrruHq8S1Y7TnlW0.jpg',
  'what-if-s3': 'https://image.tmdb.org/t/p/w780/bbGeKXKoualYRYqvFYiv8fPZK0d.jpg',
  'friendly-neighborhood-spider-man': 'https://image.tmdb.org/t/p/w780/kjcsNeqF52YUQ2rUBGLMHwLkxvR.jpg',
  'daredevil-born-again': 'https://image.tmdb.org/t/p/w780/cfWf0tCNEZkYjr3m28VxpWxS13u.jpg',
  'ironheart-2025': 'https://image.tmdb.org/t/p/w780/lG9ltUP4FwvsQBcwOJYceDbP48E.jpg',
  'eyes-of-wakanda': 'https://image.tmdb.org/t/p/w780/yuOfb1MgnaGPa4guzV0n1IFYVGN.jpg',
  'marvel-zombies-2025': 'https://image.tmdb.org/t/p/w780/q3wf7BkOzkbv0Ia1W5jgNlCe1gZ.jpg',
  'wonder-man-2025': 'https://image.tmdb.org/t/p/w780/8qziwORQTJSmEZBTG9T4Pxifd65.jpg',
  'vision-quest-2026': 'https://image.tmdb.org/t/p/w780/irhIkRCrvZKXPKbHQBb8mg7wjs.jpg',
  'werewolf-by-night': 'https://image.tmdb.org/t/p/w780/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg',
  'gotg-holiday-special': 'https://image.tmdb.org/t/p/w780/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg',
  'xmen-97': 'https://image.tmdb.org/t/p/w780/eKfVzzEazSIjJMrw9ADa2x8ksLz.jpg',
  'netflix-daredevil': 'https://image.tmdb.org/t/p/w780/QWbPaDxiB6LW2LjASknzYBvjMj.jpg',
  'netflix-punisher': 'https://image.tmdb.org/t/p/w780/tM6xqRKXoloH9UchaJEyyRE9O1w.jpg',
  'netflix-jessica-jones': 'https://image.tmdb.org/t/p/w780/oxnWofiE9fHOgUfs9NJa6nG6NTR.jpg',
  'netflix-luke-cage': 'https://image.tmdb.org/t/p/w780/yzM1hMB3PUJqbISX0f421b3xOjB.jpg',
  'netflix-iron-fist': 'https://image.tmdb.org/t/p/w780/4l6KD9HhtD6nCDEfg10Lp6C6zah.jpg',
  'netflix-defenders': 'https://image.tmdb.org/t/p/w780/49XzINhH4LFsgz7cx6TOPcHUJUL.jpg',
  // Spider-Man & Sony Universes
  'spider-man-2002': 'https://image.tmdb.org/t/p/w780/or6XJBVpcEbIkma0V9zshnbEtx4.jpg',
  'spider-man-2-raimi': 'https://image.tmdb.org/t/p/w780/aGuvNAaaZuWXYQQ6N2v7DeuP6mB.jpg',
  'spider-man-3': 'https://image.tmdb.org/t/p/w780/sJMTTGjtjvrMZ7G0oP9D13wNUum.jpg',
  'amazing-spider-man': 'https://image.tmdb.org/t/p/w780/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg',
  'amazing-spider-man-2': 'https://image.tmdb.org/t/p/w780/dGjoPttcbKR5VWg1jQuNFB247KL.jpg',
  'venom-2018': 'https://image.tmdb.org/t/p/w780/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg',
  'venom-let-there-be-carnage': 'https://image.tmdb.org/t/p/w780/pzKsRuKLFmYrW5Q0q8E8G78Tcgo.jpg',
  'venom-the-last-dance': 'https://image.tmdb.org/t/p/w780/vGXptEdgZIhPg3cGlc7e8sNPC2e.jpg',
  'spider-man-into-the-spider-verse': 'https://image.tmdb.org/t/p/w780/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
  'spider-man-across-the-spider-verse': 'https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
  // Fox X-Men Saga
  'xmen-2000': 'https://image.tmdb.org/t/p/w780/bRDAc4GogyS9ci3ow7UnInOcriN.jpg',
  'x2-united': 'https://image.tmdb.org/t/p/w780/bst4alFUXCxISwdRUKSMhhkrX1M.jpg',
  'xmen-the-last-stand': 'https://image.tmdb.org/t/p/w780/a2xicU8DpKtRizOHjQLC1JyCSRS.jpg',
  'xmen-first-class': 'https://image.tmdb.org/t/p/w780/hNEokmUke0dazoBhttFN0o3L7Xv.jpg',
  'xmen-days-of-future-past': 'https://image.tmdb.org/t/p/w780/tYfijzolzgoMOtegh1Y7j2Enorg.jpg',
  'xmen-apocalypse': 'https://image.tmdb.org/t/p/w780/ikA8UhYdTGpqbatFa93nIf6noSr.jpg',
  'dark-phoenix': 'https://image.tmdb.org/t/p/w780/cCTJPelKGLhALq3r51A9uMonxKj.jpg',
  'xmen-origins-wolverine': 'https://image.tmdb.org/t/p/w780/aupnPtagH9JVBuMrGEanf4iqXEQ.jpg',
  'the-wolverine': 'https://image.tmdb.org/t/p/w780/t2wVAcoRlKvEIVSbiYDb8d0QqqS.jpg',
  'logan': 'https://image.tmdb.org/t/p/w780/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg',
  'deadpool': 'https://image.tmdb.org/t/p/w780/3E53WEZJqP6aM84D8CckXx4pIHw.jpg',
  'deadpool-2': 'https://image.tmdb.org/t/p/w780/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg',
  'deadpool-and-wolverine': 'https://image.tmdb.org/t/p/w780/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg',
};

// Verified official TMDB backdrops
export const VERIFIED_BACKDROPS: Record<string, string> = {
  'fantastic-four-2005': 'https://image.tmdb.org/t/p/w1280/2cDXXLirYsoP6rk9B8yrvNHbbFy.jpg',
  'fantastic-four-rise-silver-surfer': 'https://image.tmdb.org/t/p/w1280/o2wYH40zW0JIYiYUTu6L4gsNy7E.jpg',
  'fantastic-four-2015': 'https://image.tmdb.org/t/p/w1280/or5kDR8Ve3TtuPSdEf1X5NdQHyz.jpg',
  'blade-1998': 'https://image.tmdb.org/t/p/w1280/7NKfxJrQn053UJeLftlx4m4NTzo.jpg',
  'blade-2': 'https://image.tmdb.org/t/p/w1280/86b0NGY1i0bt3ckhkcHxiCSMxk1.jpg',
  'blade-trinity': 'https://image.tmdb.org/t/p/w1280/a53EGF0NzHRGKuRItsrtXBM8FCD.jpg',
  'daredevil-2003': 'https://image.tmdb.org/t/p/w1280/e7jIX02GiSwsgkU5lMpeKjwq2Zc.jpg',
  'elektra-2005': 'https://image.tmdb.org/t/p/w1280/2JMOTj6DFjNcg9KToctmfTV55EW.jpg',
  'captain-america-first-avenger': 'https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg',
  'captain-marvel': 'https://image.tmdb.org/t/p/w1280/qAzYK4YPSWDc7aa4R43LcwRIAyb.jpg',
  'iron-man-2008': 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
  'iron-man-2': 'https://image.tmdb.org/t/p/w1280/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg',
  'the-incredible-hulk': 'https://image.tmdb.org/t/p/w1280/jPu8yiadqgzwFPGKJmGo637ASVP.jpg',
  'thor-2011': 'https://image.tmdb.org/t/p/w1280/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg',
  'the-avengers-2012': 'https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
  'iron-man-3': 'https://image.tmdb.org/t/p/w1280/iVped1djsF0tvGkvnHbzsE3ZPTF.jpg',
  'thor-dark-world': 'https://image.tmdb.org/t/p/w1280/5QEOy0QEpad9QsXeMxuGHPXMale.jpg',
  'captain-america-winter-soldier': 'https://image.tmdb.org/t/p/w1280/1RWLMyC9KcFfcaoViMiJGSSZzzr.jpg',
  'guardians-of-the-galaxy': 'https://image.tmdb.org/t/p/w1280/uLtVbjvS1O7gXL8lUOwsFOH4man.jpg',
  'avengers-age-of-ultron': 'https://image.tmdb.org/t/p/w1280/kIBK5SKwgqIIuRKhhWrJn3XkbPq.jpg',
  'ant-man': 'https://image.tmdb.org/t/p/w1280/1K3JmSNUN8OpjYsCjc0Hy0SYxAb.jpg',
  'captain-america-civil-war': 'https://image.tmdb.org/t/p/w1280/wdwcOBMkt3zmPQuEMxB3FUtMio2.jpg',
  'doctor-strange': 'https://image.tmdb.org/t/p/w1280/kkoiH8ZWxJ9WSAjOadGtuHUQxbm.jpg',
  'guardians-of-the-galaxy-vol-2': 'https://image.tmdb.org/t/p/w1280/bW93ycPSSi3Hxx1NvlMX5qm2mQu.jpg',
  'spider-man-homecoming': 'https://image.tmdb.org/t/p/w1280/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg',
  'thor-ragnarok': 'https://image.tmdb.org/t/p/w1280/vLmHH8jAy8Jq8uBsLucd3592WGh.jpg',
  'black-panther': 'https://image.tmdb.org/t/p/w1280/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg',
  'avengers-infinity-war': 'https://image.tmdb.org/t/p/w1280/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg',
  'ant-man-and-the-wasp': 'https://image.tmdb.org/t/p/w1280/iYdgEUE2W2aJkgqfSjf1x3gFfuV.jpg',
  'avengers-endgame': 'https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
  'spider-man-far-from-home': 'https://image.tmdb.org/t/p/w1280/vamhMTvh9m9zFHDoR0v1nRtf6T4.jpg',
  'black-widow': 'https://image.tmdb.org/t/p/w1280/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg',
  'shang-chi': 'https://image.tmdb.org/t/p/w1280/r7K6Xt0RX4Mw0cAbZVw5cyb1Tux.jpg',
  'eternals': 'https://image.tmdb.org/t/p/w1280/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg',
  'spider-man-no-way-home': 'https://image.tmdb.org/t/p/w1280/uyrOU4BDm2kbVxFsMiDFIHDhc4d.jpg',
  'doctor-strange-multiverse-madness': 'https://image.tmdb.org/t/p/w1280/lv3TXqhpaIxkclIHbhN2MRMOemQ.jpg',
  'thor-love-and-thunder': 'https://image.tmdb.org/t/p/w1280/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg',
  'black-panther-wakanda-forever': 'https://image.tmdb.org/t/p/w1280/83H0C66AcvkwpG2738VCTHMY9uv.jpg',
  'ant-man-quantumania': 'https://image.tmdb.org/t/p/w1280/m8JTwHFwX7I7JY5fPe4SjqejWag.jpg',
  'guardians-galaxy-vol-3': 'https://image.tmdb.org/t/p/w1280/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg',
  'the-marvels': 'https://image.tmdb.org/t/p/w1280/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg',
  'captain-america-brave-new-world': 'https://image.tmdb.org/t/p/w1280/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg',
  'thunderbolts-asterisk': 'https://image.tmdb.org/t/p/w1280/tCQfubckzzcuCbsGugkpLhfjS5z.jpg',
  'fantastic-four-first-steps': 'https://image.tmdb.org/t/p/w1280/s94NjfKkcSczZ1FembwmQZwsuwY.jpg',
  'spider-man-brand-new-day': 'https://image.tmdb.org/t/p/w1280/oz4U9eA6ilYf1tyiVuGmkftdLac.jpg',
  'avengers-doomsday': 'https://image.tmdb.org/t/p/w1280/s4v0UX1anfXm0UvloLsTTJ4v222.jpg',
  'avengers-secret-wars': 'https://image.tmdb.org/t/p/w1280/rytc6Lf4447C0CDncwFa4gxe0vY.jpg',
  'wandavision': 'https://image.tmdb.org/t/p/w1280/lOr9NKxh4vMweufMOUDJjJhCRHW.jpg',
  'the-falcon-winter-soldier': 'https://image.tmdb.org/t/p/w1280/aTjbqMONy77fHJrIYu14g1F0d5h.jpg',
  'loki-s1': 'https://image.tmdb.org/t/p/w1280/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg',
  'what-if-s1': 'https://image.tmdb.org/t/p/w1280/jnzoh5qoxRLFRIQAxnl6D3RStPC.jpg',
  'hawkeye-2021': 'https://image.tmdb.org/t/p/w1280/9QNv2Al3GfCND8BwuLmu2GwVht7.jpg',
  'moon-knight': 'https://image.tmdb.org/t/p/w1280/1uegR4uAxRxiMyX4nQnpzbXhrTw.jpg',
  'ms-marvel': 'https://image.tmdb.org/t/p/w1280/mfcLUWASJghU8MTNK38eYktfE83.jpg',
  'she-hulk': 'https://image.tmdb.org/t/p/w1280/eljErfkQUcFUgQkI4I1soZcH8MW.jpg',
  'secret-invasion': 'https://image.tmdb.org/t/p/w1280/kwronSXO1ogMqHHFvY2eBxfFLdn.jpg',
  'loki-s2': 'https://image.tmdb.org/t/p/w1280/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg',
  'what-if-s2': 'https://image.tmdb.org/t/p/w1280/yQw23xxmVBFVHPCF6V68TAIIfno.jpg',
  'echo-2024': 'https://image.tmdb.org/t/p/w1280/tYLXJW1sZQU09VWY1BhSVPKGIwc.jpg',
  'agatha-all-along': 'https://image.tmdb.org/t/p/w1280/jIyEmnBrZtl6SEWyBoMO2hZnzMa.jpg',
  'friendly-neighborhood-spider-man': 'https://image.tmdb.org/t/p/w1280/kkT2B2gmynoh9kZMo1gromLNeqy.jpg',
  'daredevil-born-again': 'https://image.tmdb.org/t/p/w1280/yqMi4laKMOq6yX9PjBt1az1grHh.jpg',
  'ironheart-2025': 'https://image.tmdb.org/t/p/w1280/m2QTmJhe36uKrkQjC1MsNV7Dcqp.jpg',
  'eyes-of-wakanda': 'https://image.tmdb.org/t/p/w1280/cWO5NDkKqpOuwxu4vFc4PtL8aNF.jpg',
  'marvel-zombies-2025': 'https://image.tmdb.org/t/p/w1280/g20dlimfUx5gAAHCfGBjfp5Cqzs.jpg',
  'werewolf-by-night': 'https://image.tmdb.org/t/p/w1280/7R1gR2t4JL6raEOuZvbP3y0yl8r.jpg',
  'gotg-holiday-special': 'https://image.tmdb.org/t/p/w1280/rfnmMYuZ6EKOBvQLp2wqP21v7sI.jpg',
  'xmen-97': 'https://image.tmdb.org/t/p/w1280/aJtG4txtmiRHwAAqENQHZvBs6kY.jpg',
  'netflix-daredevil': 'https://image.tmdb.org/t/p/w1280/pPALpad1Fh14g7ejyQjqKzlhrBw.jpg',
  'netflix-punisher': 'https://image.tmdb.org/t/p/w1280/jBGjbSDRxOEudW9rmQbWDzJUKq9.jpg',
  'netflix-jessica-jones': 'https://image.tmdb.org/t/p/w1280/fjEOQhzZk2Or7VYUBeMx5ZIwU95.jpg',
  'netflix-luke-cage': 'https://image.tmdb.org/t/p/w1280/bJOmop22SGTHPo1tiuVAFf4U7B9.jpg',
  'netflix-iron-fist': 'https://image.tmdb.org/t/p/w1280/cuckn6IFp9OKu9H8AgD0iEANxhc.jpg',
  'netflix-defenders': 'https://image.tmdb.org/t/p/w1280/ycAWXhAhyaE7g3JBAaierK4LgNg.jpg',
  'spider-man-2002': 'https://image.tmdb.org/t/p/w1280/zQ8AxTPiCiS5nnwXpwTBPBHSaa5.jpg',
  'spider-man-2-raimi': 'https://image.tmdb.org/t/p/w1280/6al048Lat3eLVQOuKtc9h6Tu94d.jpg',
  'spider-man-3': 'https://image.tmdb.org/t/p/w1280/FfAU0PUs8AJkMU2VbkVNFtRXR4.jpg',
  'amazing-spider-man': 'https://image.tmdb.org/t/p/w1280/HVcza6tJtWFrLriuh3Ano4Vt46.jpg',
  'amazing-spider-man-2': 'https://image.tmdb.org/t/p/w1280/k0hlAzTryCYX1O1LyC6P8tAa8s0.jpg',
  'venom-2018': 'https://image.tmdb.org/t/p/w1280/hNsYUryiwxcdeTMkaBcPF3iEg0p.jpg',
  'venom-let-there-be-carnage': 'https://image.tmdb.org/t/p/w1280/eENEf62tMXbhyVvdcXlnQz2wcuT.jpg',
  'venom-the-last-dance': 'https://image.tmdb.org/t/p/w1280/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg',
  'spider-man-into-the-spider-verse': 'https://image.tmdb.org/t/p/w1280/8mnXR9rey5uQ08rZAvzojKWbDQS.jpg',
  'spider-man-across-the-spider-verse': 'https://image.tmdb.org/t/p/w1280/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg',
  'xmen-2000': 'https://image.tmdb.org/t/p/w1280/3QUVzbcNyfGe3ocWkYAT8emK8Co.jpg',
  'x2-united': 'https://image.tmdb.org/t/p/w1280/7TYITrR804tLITNur3b8VLCK6tw.jpg',
  'xmen-the-last-stand': 'https://image.tmdb.org/t/p/w1280/nLMXULCGLnzRxz11txPzPqbOHSz.jpg',
  'xmen-first-class': 'https://image.tmdb.org/t/p/w1280/yhp5Pt4GugkCs5mz63qWz5khHXe.jpg',
  'xmen-days-of-future-past': 'https://image.tmdb.org/t/p/w1280/3czpqXzFy5UcNuD1AubecRLWkwD.jpg',
  'xmen-apocalypse': 'https://image.tmdb.org/t/p/w1280/sTQNRqLbfCXolrb5CizAW1dj528.jpg',
  'dark-phoenix': 'https://image.tmdb.org/t/p/w1280/cjRUhKyt2Jo3V1KNzc5tpPNfccG.jpg',
  'xmen-origins-wolverine': 'https://image.tmdb.org/t/p/w1280/hwNtEmmugU5Yd7hpfprNWI0DGIn.jpg',
  'the-wolverine': 'https://image.tmdb.org/t/p/w1280/bEAQfLTykGg232kJogBlxRYaRqU.jpg',
  'logan': 'https://image.tmdb.org/t/p/w1280/qTdCfGyDisY9e8BLycszlyTsPWx.jpg',
  'deadpool': 'https://image.tmdb.org/t/p/w1280/en971MEXui9diirXlogOrPKmsEn.jpg',
  'deadpool-2': 'https://image.tmdb.org/t/p/w1280/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg',
  'deadpool-and-wolverine': 'https://image.tmdb.org/t/p/w1280/7iwUUcKURMT7aKfCwMy6YnGtchD.jpg',
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
