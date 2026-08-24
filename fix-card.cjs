const fs = require('fs');

let content = fs.readFileSync('src/components/MovieCard.tsx', 'utf8');

// Add isUpcoming definition
content = content.replace(
  /const posterSrc = getMoviePoster\(movie\.posterUrl, movie\.universe, movie\.id\);/,
  `const posterSrc = getMoviePoster(movie.posterUrl, movie.universe, movie.id);
  
  // Custom logic to identify unreleased movies like Doomsday
  const isUpcoming = movie.id === 'avengers-doomsday' || movie.id === 'avengers-secret-wars' || movie.id === 'fantastic-four-first-steps' || movie.id === 'spider-man-4' || (movie.releaseDate ? new Date(movie.releaseDate).getTime() > Date.now() : false);`
);

// Modify Card classes
content = content.replace(
  /className={\`group relative flex flex-col justify-between rounded-xl bg-\\[#1A1D29\\] border transition-all duration-300 overflow-hidden shadow-lg select-none \${/,
  `className={\`group relative flex flex-col justify-between rounded-xl bg-[#1A1D29] border transition-all duration-300 overflow-hidden shadow-lg select-none \${
        isUpcoming ? 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/20' : ''
      } \${`
);

// Modify Trailer text
content = content.replace(
  /<span>Trailer<\/span>/g,
  `<span>{isUpcoming ? 'Teaser / Leak' : 'Trailer'}</span>`
);
content = content.replace(
  /title="Trailer abspielen"/g,
  `title={isUpcoming ? "Teaser/Leak ansehen" : "Trailer abspielen"}`
);

// Add IN PRODUKTION badge next to Watched Stamp Badge
content = content.replace(
  /{\/\* Watched Stamp Badge \*\/}/,
  `{/* Upcoming Badge */}
        {isUpcoming && !isWatched && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-purple-900/90 border border-purple-500 text-purple-100 font-black text-[9px] tracking-wider uppercase shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-md">
            IN PRODUKTION
          </div>
        )}
        
        {/* Watched Stamp Badge */}`
);

fs.writeFileSync('src/components/MovieCard.tsx', content);

let modalContent = fs.readFileSync('src/components/MovieDetailModal.tsx', 'utf8');
modalContent = modalContent.replace(
  /const scoreDisplay = movie\.ratingScore \|\| \(movie\.priority === 'ESSENTIAL' \? 8\.4 : 7\.8\);/,
  `const scoreDisplay = movie.ratingScore || (movie.priority === 'ESSENTIAL' ? 8.4 : 7.8);
  
  const isUpcoming = movie.id === 'avengers-doomsday' || movie.id === 'avengers-secret-wars' || movie.id === 'fantastic-four-first-steps' || movie.id === 'spider-man-4' || (movie.releaseDate ? new Date(movie.releaseDate).getTime() > Date.now() : false);`
);

modalContent = modalContent.replace(
  /className="px-6 py-2\.5 rounded-lg bg-white text-black font-black uppercase tracking-wider text-xs sm:text-sm shadow-\\[0_0_20px_rgba\\(255,255,255,0\.8\\)\\] hover:scale-105 transition-all flex items-center gap-2"/,
  `className={\`px-6 py-2.5 rounded-lg font-black uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center gap-2 \${isUpcoming ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] hover:scale-105' : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:scale-105'}\`}`
);
modalContent = modalContent.replace(
  /<span>Offizieller Trailer<\/span>/,
  `<span>{isUpcoming ? 'Leaked / Concept Trailer' : 'Offizieller Trailer'}</span>`
);

fs.writeFileSync('src/components/MovieDetailModal.tsx', modalContent);

