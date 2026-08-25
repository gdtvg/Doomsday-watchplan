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
    <div id="doomsday-countdown" className="w-full bg-[#060A10] border-y border-slate-800/80 py-3.5 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Label */}
        <div className="flex items-center gap-3 text-left w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl badge-3d-doom flex items-center justify-center text-emerald-300 flex-shrink-0 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.35)]">
            <Crown className="w-5 h-5 relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black tracking-widest badge-3d-marvel px-2 py-0.5 rounded text-white uppercase">
                DOOMSDAY COUNTDOWN
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                • Kinostart: {DOOMSDAY_RELEASE_DISPLAY}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-white tracking-tight mt-0.5 font-bebas uppercase text-base sm:text-lg">
              Avengers: Doomsday — Multiverse Saga Finale
            </h3>
          </div>
        </div>

        {/* Counter Grid */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-baseline gap-1.5 badge-3d-metallic rounded-xl px-3.5 py-1.5 shadow-md">
            <span className="text-lg sm:text-xl font-black text-white tabular-nums drop-shadow-md font-bebas">
              {timeLeft.days}
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
              Tage
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 badge-3d-metallic rounded-xl px-3.5 py-1.5 shadow-md">
            <span className="text-lg sm:text-xl font-black text-white tabular-nums drop-shadow-md font-bebas">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
              Std
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 badge-3d-metallic rounded-xl px-3.5 py-1.5 shadow-md">
            <span className="text-lg sm:text-xl font-black text-white tabular-nums drop-shadow-md font-bebas">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
              Min
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 badge-3d-doom rounded-xl px-3.5 py-1.5 shadow-md">
            <span className="text-lg sm:text-xl font-black text-emerald-300 tabular-nums drop-shadow-md font-bebas">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider">
              Sek
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
