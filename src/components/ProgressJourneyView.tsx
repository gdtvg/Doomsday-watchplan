import React, { useRef, useState } from 'react';
import { WatchlistStats } from '../hooks/useWatchlist';
import { 
  Trophy, 
  Crown, 
  Film, 
  Tv, 
  Clock, 
  Star, 
  Heart, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useDevice } from '../hooks/useDevice';

interface ProgressJourneyViewProps {
  stats: WatchlistStats;
  onExportJSON: () => void;
  onImportJSON: (jsonStr: string) => boolean;
  onResetAllProgress: () => void;
}

export const ProgressJourneyView: React.FC<ProgressJourneyViewProps> = ({
  stats,
  onExportJSON,
  onImportJSON,
  onResetAllProgress,
}) => {
  const { isMobile } = useDevice();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = onImportJSON(content);
        if (success) {
          setImportStatus('Watchlist data restored successfully!');
        } else {
          setImportStatus('Failed to parse JSON file. Please check file format.');
        }
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  const universeEntries = [
    { key: 'MCU', label: 'MCU (Earth-616)', color: 'from-rose-600 to-rose-400' },
    { key: 'X-MEN', label: 'X-Men & Fox Universe', color: 'from-amber-600 to-amber-400' },
    { key: 'SPIDER-MAN', label: 'Spider-Man & Sony', color: 'from-sky-600 to-sky-400' },
    { key: 'FANTASTIC FOUR', label: 'Fantastic Four', color: 'from-indigo-600 to-indigo-400' },
    { key: 'SERIES', label: 'Disney+ Marvel Series', color: 'from-purple-600 to-purple-400' },
  ];

  return (
    <section id="progress-journey-section" className="w-full bg-[#040714] py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight">
              Personal Marathon Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Detailed breakdown of your viewing time, franchise coverage, ratings, and cloud export capabilities.
          </p>
        </div>

        {/* Big Trophy Status Card */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-[#0A1A12] to-[#0C121D] border border-emerald-500/50 rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
          <div className="flex items-center gap-4 text-left w-full md:w-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.6)] flex-shrink-0">
              <Crown className="w-7 h-7 sm:w-8 sm:h-8 fill-black" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
                Doomsday Readiness Level
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                {stats.completionPercentage >= 100 
                  ? 'MASTER OF BATTLEWORLD (100%)' 
                  : stats.completionPercentage >= 70 
                  ? 'MULTIVERSE VETERAN' 
                  : stats.completionPercentage >= 35 
                  ? 'SACRED TIMELINE EXPLORER' 
                  : 'CASUAL TIMELINE TRAVELER'}
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-normal">
                {stats.watchedTitles} of {stats.totalTitles} titles logged ({stats.watchedHours} hours watched).
              </p>
            </div>
          </div>

          <div className="text-center md:text-right flex-shrink-0 bg-slate-900/80 px-6 py-4 rounded-xl border border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tabular-nums">
              {stats.completionPercentage}%
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
              Overall Completion
            </span>
          </div>
        </div>

        {/* Universe Progress Breakdown */}
        <div className="bg-[#1A1D29] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-md">
          <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Franchise & Universe Breakdown
          </h3>

          <div className="space-y-4">
            {universeEntries.map((u) => {
              const uStats = stats.universeStats[u.key] || { total: 0, watched: 0, percentage: 0, hours: 0, watchedHours: 0 };
              return (
                <div key={u.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-200">{u.label}</span>
                    <span className="text-slate-400">
                      {uStats.watched} / {uStats.total} titles ({uStats.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${u.color} transition-all duration-500`}
                      style={{ width: `${Math.max(uStats.percentage, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Persistence, Backup & Cloud Export */}
        <div className="bg-[#1A1D29] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400" />
              Backup & Data Export
            </h3>
            {importStatus && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-600">
                {importStatus}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-normal">
            Export your watchlist as a JSON file to transfer between devices or restore your progress anytime.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExportJSON}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              Export Progress (JSON)
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              Import Progress (JSON)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              onClick={() => setConfirmReset(true)}
              className="px-4 py-2.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-bold text-xs uppercase tracking-wider rounded-xl border border-rose-800 transition-all flex items-center gap-2 cursor-pointer ml-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Progress
            </button>
          </div>
        </div>

        {/* Confirmation Modal for Reset */}
        {confirmReset && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in"
            onClick={() => setConfirmReset(false)}
          >
            <div 
              className="bg-[#1A1D29] border border-slate-700 p-6 rounded-2xl max-w-md w-full text-center space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-600/50 flex items-center justify-center text-rose-400 mx-auto">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black text-white uppercase">Reset All Watchlist Data?</h4>
                <p className="text-xs text-slate-400 font-normal">
                  This will wipe all watched statuses, ratings, and personal notes. This action cannot be undone unless you export a backup first.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetAllProgress();
                    setConfirmReset(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-700 cursor-pointer shadow-md"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
