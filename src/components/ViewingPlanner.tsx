import React, { useMemo, useState } from 'react';
import { WatchlistStats } from '../hooks/useWatchlist';
import { DOOMSDAY_RELEASE_DATE, DOOMSDAY_RELEASE_DISPLAY } from '../data/config';
import { MARVEL_TITLES } from '../data/movies';
import { 
  Calendar, 
  Clock, 
  Crown, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  Compass,
  ArrowRight,
  Download,
  Share2,
  Check,
  Film,
  Flame,
  Layers
} from 'lucide-react';
import { useDevice } from '../hooks/useDevice';
import { playClickSound } from '../utils/soundEffects';

interface ViewingPlannerProps {
  stats: WatchlistStats;
  plannerHoursPerWeek: number;
  setPlannerHoursPerWeek: (h: number) => void;
  plannerTargetDate: string;
  setPlannerTargetDate: (d: string) => void;
  onNavigateToWatchlist: () => void;
}

export const ViewingPlanner: React.FC<ViewingPlannerProps> = ({
  stats,
  plannerHoursPerWeek,
  setPlannerHoursPerWeek,
  plannerTargetDate,
  setPlannerTargetDate,
  onNavigateToWatchlist,
}) => {
  const { isMobile } = useDevice();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Calculations
  const calculations = useMemo(() => {
    const remainingHours = stats.remainingHours;
    const hoursPerWeek = Math.max(1, plannerHoursPerWeek);

    // Weeks needed
    const weeksNeeded = remainingHours / hoursPerWeek;
    const daysNeeded = Math.ceil(weeksNeeded * 7);

    // Projected completion date
    const now = new Date();
    const projectedCompletion = new Date(now.getTime() + daysNeeded * 24 * 60 * 60 * 1000);

    // Target Date
    const target = new Date(plannerTargetDate);
    const timeDiffToTarget = target.getTime() - now.getTime();
    const daysUntilTarget = Math.max(0, Math.floor(timeDiffToTarget / (1000 * 60 * 60 * 24)));
    const weeksUntilTarget = daysUntilTarget / 7;

    // Required pace to finish by target
    const requiredHoursPerWeek = weeksUntilTarget > 0 ? Number((remainingHours / weeksUntilTarget).toFixed(1)) : remainingHours;

    // Status evaluation
    let status: 'ON TRACK' | 'BEHIND SCHEDULE' | 'AHEAD OF SCHEDULE' | 'COMPLETED' = 'ON TRACK';
    let statusClass = 'bg-emerald-950 text-emerald-300 border-emerald-500';

    if (remainingHours === 0) {
      status = 'COMPLETED';
      statusClass = 'bg-emerald-950 text-emerald-300 border-emerald-500';
    } else if (projectedCompletion > target) {
      status = 'BEHIND SCHEDULE';
      statusClass = 'bg-rose-950 text-rose-300 border-rose-700';
    } else if (weeksNeeded * 1.3 < weeksUntilTarget) {
      status = 'AHEAD OF SCHEDULE';
      statusClass = 'bg-amber-950 text-amber-300 border-amber-600';
    }

    return {
      remainingHours,
      weeksNeeded: Number(weeksNeeded.toFixed(1)),
      daysNeeded,
      projectedDateFormatted: projectedCompletion.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      targetDateFormatted: target.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      daysUntilTarget,
      requiredHoursPerWeek,
      status,
      statusClass
    };
  }, [stats.remainingHours, plannerHoursPerWeek, plannerTargetDate]);

  // Export iCal (.ics) Calendar
  const handleExportICS = () => {
    playClickSound();
    const now = new Date();
    const target = new Date(plannerTargetDate);
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Marvel Multiverse Hub//Doomsday Marathon Planner//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${now.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${target.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      'SUMMARY:Marvel Doomsday Multiverse Marathon',
      'DESCRIPTION:Prepare for Avengers: Doomsday! Finish required MCU, Fox X-Men, and Fantastic Four titles before the premiere.',
      'LOCATION:Disney+ / Home Theater',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'BEGIN:VEVENT',
      'DTSTART:20260501T180000Z',
      'DTEND:20260501T213000Z',
      'SUMMARY:★ AVENGERS: DOOMSDAY THEATRICAL PREMIERE ★',
      'DESCRIPTION:Robert Downey Jr. returns as Victor von Doom. Battleworld begins.',
      'LOCATION:IMAX Theaters',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Marvel_Doomsday_Marathon.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleCopySummary = () => {
    playClickSound();
    const text = `🎬 My Marvel Doomsday Marathon Plan:\n- ${stats.watchedCount}/${stats.totalTitles} titles watched (${stats.completionPercentage}%)\n- ${calculations.remainingHours} hours remaining\n- Target Pace: ${plannerHoursPerWeek} hrs/week\n- Projected finish: ${calculations.projectedDateFormatted} (Before Avengers: Doomsday on ${DOOMSDAY_RELEASE_DISPLAY})`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="viewing-planner-page" className="w-full bg-[#040714] py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight">
              Multiverse Marathon Planner
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl font-normal">
            Calculate your weekly streaming pace to finish all essential titles before Avengers: Doomsday hits theaters on {DOOMSDAY_RELEASE_DISPLAY}.
          </p>
        </div>

        {/* Schedule Status Banner */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ${calculations.statusClass}`}>
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider block">
                Pacing Diagnostic
              </span>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                {calculations.status === 'COMPLETED' && '★ 100% PREPARED FOR DOCTOR DOOM ★'}
                {calculations.status === 'ON TRACK' && 'Pacing On Target for Theatrical Collision'}
                {calculations.status === 'BEHIND SCHEDULE' && 'Increase Weekly Watch Hours to Catch Up'}
                {calculations.status === 'AHEAD OF SCHEDULE' && 'Ahead of Schedule — Multiverse Master'}
              </h3>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-xs font-bold block">
              Target Deadline: {calculations.targetDateFormatted}
            </span>
            <span className="text-[11px] opacity-80">
              {calculations.daysUntilTarget} days remaining
            </span>
          </div>
        </div>

        {/* 2-Column Controls & Projections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left: Interactive Controls */}
          <div className="bg-[#1A1D29] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-md">
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Adjust Your Weekly Pace
            </h3>

            {/* Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Viewing Hours Per Week:</span>
                <span className="text-emerald-400 text-sm font-black tabular-nums">{plannerHoursPerWeek} hrs/week</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={plannerHoursPerWeek}
                onChange={(e) => setPlannerHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>1 hr (Casual)</span>
                <span>6 hrs (Standard)</span>
                <span>15+ hrs (Binge Marathon)</span>
              </div>
            </div>

            {/* Target Date Picker */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-300 block">
                Target Deadline:
              </label>
              <input
                type="date"
                value={plannerTargetDate}
                onChange={(e) => setPlannerTargetDate(e.target.value)}
                className="w-full bg-[#070B12] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">
                Default set to Avengers: Doomsday theatrical debut ({DOOMSDAY_RELEASE_DISPLAY})
              </span>
            </div>

            {/* Calendar Export & Share Actions */}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={handleExportICS}
                className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                {downloaded ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
                <span>{downloaded ? 'Calendar Exported!' : 'Export iCal (.ics)'}</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                title="Copy Summary to Clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Right: Calculations & Metrics */}
          <div className="bg-[#1A1D29] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-md flex flex-col justify-between">
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Marathon Projections
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#070B12] p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Remaining Hours</span>
                <span className="text-xl font-black text-white tabular-nums">{calculations.remainingHours} hrs</span>
              </div>
              <div className="bg-[#070B12] p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Estimated Weeks</span>
                <span className="text-xl font-black text-emerald-400 tabular-nums">{calculations.weeksNeeded} wks</span>
              </div>
              <div className="bg-[#070B12] p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Projected Finish</span>
                <span className="text-sm font-black text-white">{calculations.projectedDateFormatted}</span>
              </div>
              <div className="bg-[#070B12] p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Pace Needed</span>
                <span className="text-sm font-black text-amber-400">{calculations.requiredHoursPerWeek} h/wk</span>
              </div>
            </div>

            <button
              onClick={onNavigateToWatchlist}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Explore Watchlist Titles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
