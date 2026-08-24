import React, { useState, useEffect } from 'react';
import { DOOMSDAY_RELEASE_DATE, DOOMSDAY_RELEASE_DISPLAY } from '../data/config';
import { Clock, Calendar, Crown, ShieldAlert } from 'lucide-react';
import { useDevice } from '../hooks/useDevice';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const { isMobile } = useDevice();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(DOOMSDAY_RELEASE_DATE).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="doomsday-countdown" className="w-full bg-[#070C14] border-y border-slate-800/60 py-3.5 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Label */}
        <div className="flex items-center gap-3 text-left w-full sm:w-auto">
          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 shadow-sm flex items-center justify-center text-slate-300 flex-shrink-0 relative overflow-hidden">
            <Crown className="w-4 h-4 relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-widest text-[#E23636] uppercase drop-shadow-sm">
                COUNTDOWN
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">
                • Kinostart: {DOOMSDAY_RELEASE_DISPLAY}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              Avengers: Doomsday (Multiverse Saga)
            </h3>
          </div>
        </div>

        {/* Counter Grid */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-baseline gap-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-base sm:text-lg font-black text-white tabular-nums drop-shadow-sm">
              {timeLeft.days}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Tage
            </span>
          </div>

          <div className="flex items-baseline gap-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-base sm:text-lg font-black text-white tabular-nums drop-shadow-sm">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Std
            </span>
          </div>

          <div className="flex items-baseline gap-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-base sm:text-lg font-black text-white tabular-nums drop-shadow-sm">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Min
            </span>
          </div>

          <div className="flex items-baseline gap-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-base sm:text-lg font-black text-slate-200 tabular-nums drop-shadow-sm">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold text-slate-300 uppercase">
              Sek
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
