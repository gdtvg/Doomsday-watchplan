import React from 'react';
import { UniverseType } from '../types';
import { Shield, Sparkles, Zap, Crown, Layers, Orbit } from 'lucide-react';

interface BrandHubsProps {
  onSelectUniverse: (universe: UniverseType | 'ALL') => void;
  activeUniverse: UniverseType | 'ALL';
  onSelectDoomsdayFocus: () => void;
  doomsdayMode: boolean;
}

export const BrandHubs: React.FC<BrandHubsProps> = ({
  onSelectUniverse,
  activeUniverse,
  onSelectDoomsdayFocus,
  doomsdayMode,
}) => {
  const hubs = [
    {
      id: 'all',
      name: 'Alle Universen',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
      onClick: () => onSelectUniverse('ALL'),
      isActive: !doomsdayMode && activeUniverse === 'ALL',
    },
    {
      id: 'doomsday',
      name: 'Doomsday Pflicht',
      icon: <Crown className="w-3.5 h-3.5 text-emerald-400" />,
      onClick: () => onSelectDoomsdayFocus(),
      isActive: doomsdayMode,
    },
    {
      id: 'mcu',
      name: 'Marvel MCU (Earth-616)',
      icon: <Shield className="w-3.5 h-3.5 text-rose-400" />,
      onClick: () => onSelectUniverse('MCU'),
      isActive: !doomsdayMode && activeUniverse === 'MCU',
    },
    {
      id: 'xmen',
      name: 'Fox X-Men',
      icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
      onClick: () => onSelectUniverse('X-MEN'),
      isActive: !doomsdayMode && activeUniverse === 'X-MEN',
    },
    {
      id: 'f4',
      name: 'Fantastic Four',
      icon: <Layers className="w-3.5 h-3.5 text-sky-400" />,
      onClick: () => onSelectUniverse('FANTASTIC FOUR'),
      isActive: !doomsdayMode && activeUniverse === 'FANTASTIC FOUR',
    },
    {
      id: 'spiderman',
      name: 'Spider-Verse & Sony',
      icon: <Orbit className="w-3.5 h-3.5 text-indigo-400" />,
      onClick: () => onSelectUniverse('SPIDER-MAN'),
      isActive: !doomsdayMode && activeUniverse === 'SPIDER-MAN',
    },
  ];

  return (
    <section id="category-filter-bar" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {hubs.map((hub) => (
          <button
            key={hub.id}
            onClick={hub.onClick}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
              hub.isActive
                ? 'bg-emerald-500 text-black shadow-md'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {hub.icon}
            <span>{hub.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
