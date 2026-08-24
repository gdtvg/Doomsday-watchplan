const fs = require('fs');
const upcomingIds = [
  'captain-america-brave-new-world',
  'thunderbolts-asterisk',
  'fantastic-four-first-steps',
  'avengers-doomsday',
  'avengers-secret-wars',
  'blade',
  'spider-man-4'
].map(id => `movie.id === '${id}'`).join(' || ');

['src/components/MovieCard.tsx', 'src/components/MovieDetailModal.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /movie\.id === 'avengers-doomsday' \|\| movie\.id === 'avengers-secret-wars' \|\| movie\.id === 'fantastic-four-first-steps' \|\| movie\.id === 'spider-man-4'/g,
    upcomingIds
  );
  fs.writeFileSync(file, content);
});
