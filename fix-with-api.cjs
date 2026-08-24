const https = require('https');
const fs = require('fs');

const movies = [
  { id: 'loki-s1', type: 'tv', query: 'loki', year: 2021 },
  { id: 'loki-s2', type: 'tv', query: 'loki', year: 2021 },
  { id: 'doctor-strange-multiverse-madness', type: 'movie', query: 'doctor strange in the multiverse of madness', year: 2022 },
  { id: 'deadpool-and-wolverine', type: 'movie', query: 'deadpool wolverine', year: 2024 },
  { id: 'spider-man-no-way-home', type: 'movie', query: 'spider-man no way home', year: 2021 },
  { id: 'avengers-infinity-war', type: 'movie', query: 'avengers infinity war', year: 2018 },
  { id: 'avengers-endgame', type: 'movie', query: 'avengers endgame', year: 2019 },
  { id: 'fantastic-four-first-steps', type: 'movie', query: 'fantastic four first steps', year: 2025 },
  { id: 'wandavision', type: 'tv', query: 'wandavision', year: 2021 },
  { id: 'what-if-s1', type: 'tv', query: 'what if', year: 2021 },
  { id: 'the-marvels', type: 'movie', query: 'the marvels', year: 2023 },
  { id: 'ant-man-quantumania', type: 'movie', query: 'ant-man and the wasp quantumania', year: 2023 },
  { id: 'thunderbolts-asterisk', type: 'movie', query: 'thunderbolts', year: 2025 },
  { id: 'captain-america-brave-new-world', type: 'movie', query: 'captain america brave new world', year: 2025 },
  { id: 'xmen-days-of-future-past', type: 'movie', query: 'days of future past', year: 2014 },
  { id: 'logan', type: 'movie', query: 'logan', year: 2017 },
  { id: 'xmen-first-class', type: 'movie', query: 'x-men first class', year: 2011 },
  { id: 'xmen-2000', type: 'movie', query: 'x-men', year: 2000 },
  { id: 'x2-united', type: 'movie', query: 'x2', year: 2003 },
  { id: 'spider-man-2-raimi', type: 'movie', query: 'spider-man 2', year: 2004 },
  { id: 'amazing-spider-man', type: 'movie', query: 'the amazing spider-man', year: 2012 },
  { id: 'spider-man-into-the-spider-verse', type: 'movie', query: 'into the spider-verse', year: 2018 },
  { id: 'spider-man-across-the-spider-verse', type: 'movie', query: 'across the spider-verse', year: 2023 },
  { id: 'fantastic-four-2005', type: 'movie', query: 'fantastic four', year: 2005 },
  { id: 'fantastic-four-rise-silver-surfer', type: 'movie', query: 'rise of the silver surfer', year: 2007 },
  { id: 'iron-man-2008', type: 'movie', query: 'iron man', year: 2008 },
  { id: 'the-avengers-2012', type: 'movie', query: 'the avengers', year: 2012 },
  { id: 'captain-america-civil-war', type: 'movie', query: 'captain america civil war', year: 2016 },
  { id: 'doctor-strange-2016', type: 'movie', query: 'doctor strange', year: 2016 },
  { id: 'shang-chi', type: 'movie', query: 'shang-chi', year: 2021 },
  { id: 'agatha-all-along', type: 'tv', query: 'agatha all along', year: 2024 },
  { id: 'avengers-doomsday', type: 'movie', query: 'avengers doomsday', year: 2026 },
  { id: 'avengers-secret-wars', type: 'movie', query: 'avengers secret wars', year: 2027 }
];

const API_KEY = '15d2ea6d0dc1d476efbca3eba2b9bbfb';

function fetchPoster(m) {
  return new Promise((resolve) => {
    let yearQuery = '';
    if (m.type === 'movie') yearQuery = `&year=${m.year}`;
    if (m.type === 'tv') yearQuery = `&first_air_date_year=${m.year}`;
    
    https.get(`https://api.themoviedb.org/3/search/${m.type}?api_key=${API_KEY}&query=${encodeURIComponent(m.query)}${yearQuery}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0 && json.results[0].poster_path) {
            resolve(`https://image.tmdb.org/t/p/w780${json.results[0].poster_path}`);
          } else {
            resolve(null);
          }
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log('export const VERIFIED_POSTERS: Record<string, string> = {');
  for (const m of movies) {
    const url = await fetchPoster(m);
    if (url) {
      console.log(`  '${m.id}': '${url}',`);
    }
    await sleep(50);
  }
  console.log('};');
}
run();
