const https = require('https');
const fs = require('fs');

const movies = [
  { id: 'loki-s1', title: 'Loki season 1 poster' },
  { id: 'loki-s2', title: 'Loki season 2 poster' },
  { id: 'doctor-strange-multiverse-madness', title: 'Doctor Strange in the Multiverse of Madness poster' },
  { id: 'deadpool-and-wolverine', title: 'Deadpool & Wolverine poster' },
  { id: 'spider-man-no-way-home', title: 'Spider-Man: No Way Home poster' },
  { id: 'avengers-infinity-war', title: 'Avengers: Infinity War poster' },
  { id: 'avengers-endgame', title: 'Avengers: Endgame poster' },
  { id: 'fantastic-four-first-steps', title: 'The Fantastic Four: First Steps poster' },
  { id: 'wandavision', title: 'WandaVision poster' },
  { id: 'what-if-s1', title: 'What If...? season 1 poster' },
  { id: 'the-marvels', title: 'The Marvels poster' },
  { id: 'ant-man-quantumania', title: 'Ant-Man and the Wasp: Quantumania poster' },
  { id: 'thunderbolts-asterisk', title: 'Thunderbolts* poster' },
  { id: 'captain-america-brave-new-world', title: 'Captain America: Brave New World poster' },
  { id: 'xmen-days-of-future-past', title: 'X-Men: Days of Future Past poster' },
  { id: 'logan', title: 'Logan (film) poster' },
  { id: 'xmen-first-class', title: 'X-Men: First Class poster' },
  { id: 'xmen-2000', title: 'X-Men (film) poster' },
  { id: 'x2-united', title: 'X2 (film) poster' },
  { id: 'spider-man-2-raimi', title: 'Spider-Man 2 poster' },
  { id: 'amazing-spider-man', title: 'The Amazing Spider-Man (2012 film) poster' },
  { id: 'spider-man-into-the-spider-verse', title: 'Spider-Man: Into the Spider-Verse poster' },
  { id: 'spider-man-across-the-spider-verse', title: 'Spider-Man: Across the Spider-Verse poster' },
  { id: 'fantastic-four-2005', title: 'Fantastic Four (2005 film) poster' },
  { id: 'fantastic-four-rise-silver-surfer', title: 'Fantastic Four: Rise of the Silver Surfer poster' },
  { id: 'iron-man-2008', title: 'Iron Man (2008 film) poster' },
  { id: 'the-avengers-2012', title: 'The Avengers (2012 film) poster' },
  { id: 'captain-america-civil-war', title: 'Captain America: Civil War poster' },
  { id: 'doctor-strange-2016', title: 'Doctor Strange (2016 film) poster' },
  { id: 'shang-chi', title: 'Shang-Chi and the Legend of the Ten Rings poster' },
  { id: 'agatha-all-along', title: 'Agatha All Along poster' },
  { id: 'avengers-doomsday', title: 'Avengers: Doomsday' },
  { id: 'avengers-secret-wars', title: 'Avengers: Secret Wars' },
];

async function getWikiImage(title) {
  // Try to find the exact article first, then get its main image
  return new Promise(resolve => {
    // simplified search using Wikipedia API
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title.replace(' poster', ''))}`;
    
    https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId !== '-1' && pages[pageId].original) {
            resolve(pages[pageId].original.source);
          } else {
            resolve(null);
          }
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const dict = {};
  for(let m of movies) {
    let url = await getWikiImage(m.title);
    if(url) {
      console.log(`  '${m.id}': '${url}',`);
      dict[m.id] = url;
    }
  }
}

run();
