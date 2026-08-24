const fs = require('fs');

let content = fs.readFileSync('src/components/MovieDetailModal.tsx', 'utf8');

content = content.replace(
  /<div className="flex flex-wrap items-center gap-1\.5 sm:gap-2 mb-2 sm:mb-4">/,
  `<div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
              {isUpcoming && (
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-purple-900/90 border border-purple-500 text-purple-100 font-black text-[9px] sm:text-[10px] tracking-wider uppercase shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  IN PRODUKTION
                </span>
              )}`
);

fs.writeFileSync('src/components/MovieDetailModal.tsx', content);
