import React from 'react';
import { WatchlistStats } from '../hooks/useWatchlist';
import { CheckCircle2, Clock, Flame, Film, ShieldAlert, Trophy, Crown, Sparkles, Play } from 'lucide-react';
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
    <section id="doomsday-status-dashboard" className="w-full bg-[#05080A] border-b border-slate-800/80 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                Latveria Multiverse Protocol
              </span>
              {doomsdayMode && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-500/50 animate-pulse">
                  ⚡ 32 Doomsday Essentials aktiv
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase mt-1">
              Doomsday Vorbereitungs-Status
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-normal">
              Dein Fortschritt durch MCU, X-Men, Spider-Verse und Fantastic Four bis zur Incursion-Krise.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              id="dashboard-planner-btn"
              onClick={onNavigateToPlanner}
              className="px-3 sm:px-4 py-2 text-xs font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Marathon Planer
            </button>
            <button
              id="dashboard-doomsday-toggle"
              onClick={onToggleDoomsdayMode}
              className={`px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                doomsdayMode 
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
                  : 'bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/80'
              }`}
            >
              <Crown className={`w-3.5 h-3.5 ${doomsdayMode ? 'fill-black' : 'text-emerald-400'}`} />
              {doomsdayMode ? 'Doomsday Filter: AKTIV' : '⚡ Doomsday Essentials Filtern'}
            </button>
          </div>
        </div>

        {/* 5 Big Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-4">
          {/* Watched */}
          <div className="bg-gradient-to-b from-slate-900/90 to-[#080d14] border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-emerald-500/50 shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>Gesehen</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
                {stats.watchedTitles} <span className="text-xs font-bold text-slate-400">/ {stats.totalTitles}</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 flex-wrap">
                <span>{stats.moviesWatchedCount} Filme</span>
                <span>•</span>
                <span>{stats.seriesWatchedCount} Serien</span>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-gradient-to-b from-slate-900/90 to-[#080d14] border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-sky-500/50 shadow-md">
            <div className="flex items-center justify-between text-sky-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>In Arbeit</span>
              <Play className="w-4 h-4 text-sky-400 fill-sky-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-sky-400 tracking-tight tabular-nums">
                {stats.inProgressTitles || 0}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                Aktuell angefangen
              </p>
            </div>
          </div>

          {/* Essential Left */}
          <div className="bg-gradient-to-b from-slate-900/90 to-[#080d14] border border-emerald-800/40 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-emerald-500/60 relative overflow-hidden shadow-md">
            <div className="flex items-center justify-between text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>Pflichttitel Offen</span>
              <Crown className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-emerald-400 tracking-tight tabular-nums">
                {stats.remainingEssential} <span className="text-xs font-bold text-slate-400">/ {stats.totalEssential}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                {stats.watchedEssential} von {stats.totalEssential} geschaut
              </p>
            </div>
          </div>

          {/* Hours Left */}
          <div className="bg-gradient-to-b from-slate-900/90 to-[#080d14] border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-slate-700 shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>Verbleibende Zeit</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
                {stats.remainingHours} <span className="text-xs font-bold text-slate-400">Std</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                {stats.watchedHours}h geschaut von {stats.totalHours}h
              </p>
            </div>
          </div>

          {/* Completion % */}
          <div className="col-span-2 md:col-span-1 bg-gradient-to-b from-emerald-950/40 to-slate-900/90 border border-emerald-700/50 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-emerald-400 relative overflow-hidden shadow-md">
            <div className="flex items-center justify-between text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>Bereitschaft</span>
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-xl sm:text-3xl font-black text-white tracking-tight tabular-nums flex items-baseline gap-1">
                <span>{stats.completionPercentage}%</span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Ready</span>
              </div>
              <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                  style={{ width: `${Math.max(2, stats.completionPercentage)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gradient-to-b from-slate-900/90 to-[#080d14] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-2.5 shadow-md">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200 uppercase tracking-wider">Road to Doomsday Fortschritt</span>
              <span className="text-slate-400 hidden sm:inline">({stats.watchedTitles} von {stats.totalTitles} Titeln vorbereitet)</span>
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
                ? '★ 100% BEREIT FÜR AVENGERS: DOOMSDAY ★' 
                : `Noch ${stats.remainingHours} Stunden Vorbereitung bis zur Multiversum-Konvergenz`}
            </span>
            <span>Avengers: Doomsday (Mai 2026)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

