const fs = require('fs');
const https = require('https');

const movies = [
  { id: 'loki-s1', query: 'loki' },
  { id: 'loki-s2', query: 'loki' },
  { id: 'doctor-strange-multiverse-madness', query: 'doctor strange in the multiverse of madness' },
  { id: 'deadpool-and-wolverine', query: 'deadpool and wolverine' },
  { id: 'spider-man-no-way-home', query: 'spider man no way home' },
  { id: 'avengers-infinity-war', query: 'avengers infinity war' },
  { id: 'avengers-endgame', query: 'avengers endgame' },
  { id: 'fantastic-four-first-steps', query: 'fantastic four first steps' },
  { id: 'wandavision', query: 'wandavision' },
  { id: 'what-if-s1', query: 'what if' },
  { id: 'the-marvels', query: 'the marvels' },
  { id: 'ant-man-quantumania', query: 'ant man and the wasp quantumania' },
  { id: 'thunderbolts-asterisk', query: 'thunderbolts' },
  { id: 'captain-america-brave-new-world', query: 'captain america brave new world' },
  { id: 'xmen-days-of-future-past', query: 'x men days of future past' },
  { id: 'logan', query: 'logan' },
  { id: 'xmen-first-class', query: 'x men first class' },
  { id: 'xmen-2000', query: 'x men' },
  { id: 'x2-united', query: 'x2' },
  { id: 'spider-man-2-raimi', query: 'spider man 2' },
  { id: 'amazing-spider-man', query: 'the amazing spider man' },
  { id: 'spider-man-into-the-spider-verse', query: 'spider man into the spider verse' },
  { id: 'spider-man-across-the-spider-verse', query: 'spider man across the spider verse' },
  { id: 'fantastic-four-2005', query: 'fantastic four 2005' },
  { id: 'fantastic-four-rise-silver-surfer', query: 'fantastic four rise of the silver surfer' },
  { id: 'iron-man-2008', query: 'iron man' },
  { id: 'the-avengers-2012', query: 'the avengers' },
  { id: 'captain-america-civil-war', query: 'captain america civil war' },
  { id: 'doctor-strange-2016', query: 'doctor strange' },
  { id: 'shang-chi', query: 'shang chi' },
  { id: 'agatha-all-along', query: 'agatha all along' },
  { id: 'avengers-doomsday', query: 'avengers doomsday' },
  { id: 'avengers-secret-wars', query: 'avengers secret wars' },
];

function fetchPoster(query) {
  return new Promise((resolve) => {
    https.get(`https://www.themoviedb.org/search?query=${encodeURIComponent(query)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/https:\/\/media\.themoviedb\.org\/t\/p\/w94_and_h141_face\/([a-zA-Z0-9_]+)\.jpg/);
        if (match) {
          resolve(`https://image.tmdb.org/t/p/w780/${match[1]}.jpg`);
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const results = {};
  for (const m of movies) {
    const url = await fetchPoster(m.query);
    if (url) {
      results[m.id] = url;
      console.log(`'${m.id}': '${url}',`);
    }
  }
}
run();
