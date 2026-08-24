import React from 'react';
import { MARVEL_NEWS } from '../data/news';
import { Newspaper, ShieldCheck, Crown, ExternalLink, Sparkles } from 'lucide-react';

export const MarvelNewsView: React.FC = () => {
  return (
    <section id="marvel-news-section" className="w-full bg-[#05080C] py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight">
              Production Intel & Trade Reports
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Verified updates from Marvel Studios, San Diego Comic-Con, D23, and reputable trade publications (Deadline, THR, Variety).
          </p>
        </div>

        {/* News Cards Timeline */}
        <div className="space-y-4">
          {MARVEL_NEWS.map((item) => (
            <div
              key={item.id}
              className="bg-[#0C121D] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-emerald-500/50 transition-all shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded ${
                    item.category === 'OFFICIAL' 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : item.category === 'TRADE CONFIRMED'
                      ? 'bg-blue-950 text-blue-300 border border-blue-800'
                      : 'bg-purple-950 text-purple-300 border border-purple-800'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Source: {item.source}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-bold">
                  {item.date}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
