import React from 'react';
import { WatchlistStats } from '../hooks/useWatchlist';
import { CheckCircle2, Clock, Flame, Film, Tv, Trophy, Crown, Sparkles } from 'lucide-react';
import { useDevice } from '../hooks/useDevice';

interface StatusDashboardProps {
  stats: WatchlistStats;
  doomsdayMode: boolean;
  onToggleDoomsdayMode: () => void;
  onNavigateToPlanner: () => void;
}

export const StatusDashboard: React.FC<StatusDashboardProps> = ({
  stats,
  doomsdayMode,
  onToggleDoomsdayMode,
  onNavigateToPlanner
}) => {
  const { isMobile } = useDevice();

  return (
    <section id="doomsday-status-dashboard" className="w-full bg-[#040714] border-b border-slate-800/80 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                <Crown className="w-3.5 h-3.5 text-emerald-400" />
                Multiverse Marathon Hub
              </span>
              {doomsdayMode && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-500/50 animate-pulse">
                  ⚡ Doomsday Filter On
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase mt-1">
              Your Marathon Status
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-normal">
              Track your readiness across Marvel Cinematic Universe, Fox X-Men, Spider-Verse & Fantastic Four.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              id="dashboard-planner-btn"
              onClick={onNavigateToPlanner}
              className="px-3 sm:px-4 py-2 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Viewing Planner
            </button>
            <button
              id="dashboard-doomsday-toggle"
              onClick={onToggleDoomsdayMode}
              className={`px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                doomsdayMode 
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                  : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/80'
              }`}
            >
              <Crown className={`w-3.5 h-3.5 ${doomsdayMode ? 'fill-black' : 'text-emerald-400'}`} />
              {doomsdayMode ? 'Doomsday: ON' : '⚡ Activate Doomsday'}
            </button>
          </div>
        </div>

        {/* 5 Big Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-4">
          {/* Watched */}
          <div className="bg-[#1A1D29] border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-emerald-500/50 shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>Watched</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
                {stats.watchedTitles} <span className="text-xs font-bold text-slate-400">/ {stats.totalTitles}</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 flex-wrap">
                <span>{stats.moviesWatchedCount} films</span>
                <span>•</span>
                <span>{stats.seriesWatchedCount} series</span>
              </div>
            </div>
          </div>

          {/* Remaining */}
          <div className="bg-[#1A1D29] border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-slate-700 shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>Remaining</span>
              <Film className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
                {stats.remainingTitles}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                Titles to watch
              </p>
            </div>
          </div>

          {/* Essential Left */}
          <div className="bg-[#1A1D29] border border-emerald-800/40 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-slate-500/60 relative overflow-hidden shadow-md">
            <div className="flex items-center justify-between text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>Essential Left</span>
              <Crown className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-emerald-400 tracking-tight tabular-nums">
                {stats.remainingEssential} <span className="text-xs font-bold text-slate-400">/ {stats.totalEssential}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                {stats.watchedEssential} of {stats.totalEssential} must-see
              </p>
            </div>
          </div>

          {/* Hours Left */}
          <div className="bg-[#1A1D29] border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-slate-700 shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>Watch Hours</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
                {stats.remainingHours} <span className="text-xs font-bold text-slate-400">hrs</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                {stats.watchedHours}h done of {stats.totalHours}h
              </p>
            </div>
          </div>

          {/* Completion % */}
          <div className="col-span-2 md:col-span-1 bg-[#1A1D29] border border-emerald-700/50 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-emerald-400 relative overflow-hidden shadow-md">
            <div className="flex items-center justify-between text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>Multiverse Ready</span>
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-emerald-400 tracking-tight tabular-nums">
                {stats.completionPercentage}%
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                Essential: {stats.essentialCompletionPercentage}% done
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#1A1D29] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-2.5 shadow-md">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200 uppercase tracking-wider">Road to Doomsday Progress</span>
              <span className="text-slate-400 hidden sm:inline">({stats.watchedTitles} of {stats.totalTitles} titles prepared)</span>
            </div>
            <span className="font-black text-emerald-400 tabular-nums text-sm">
              {stats.completionPercentage}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-300 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(16,185,129,0.7)]"
              style={{ width: `${Math.max(stats.completionPercentage, 2)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pt-0.5">
            <span>Iron Man (2008)</span>
            <span className="text-emerald-400 font-bold">
              {stats.completionPercentage === 100 
                ? '★ 100% PREPARED FOR AVENGERS: DOOMSDAY ★' 
                : `${stats.remainingHours} hours left until full convergence`}
            </span>
            <span>Avengers: Doomsday (May 2026)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
