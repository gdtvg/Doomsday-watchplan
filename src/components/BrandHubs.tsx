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
      activeStyle: 'badge-3d-doom text-emerald-300',
    },
    {
      id: 'doomsday',
      name: 'Doomsday Pflicht',
      icon: <Crown className="w-3.5 h-3.5 text-amber-300" />,
      onClick: () => onSelectDoomsdayFocus(),
      isActive: doomsdayMode,
      activeStyle: 'badge-3d-doom !border-amber-400/80 text-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.35)]',
    },
    {
      id: 'mcu',
      name: 'Marvel MCU (Earth-616)',
      icon: <Shield className="w-3.5 h-3.5 text-rose-400" />,
      onClick: () => onSelectUniverse('MCU'),
      isActive: !doomsdayMode && activeUniverse === 'MCU',
      activeStyle: 'badge-3d-marvel text-white',
    },
    {
      id: 'xmen',
      name: 'Fox X-Men',
      icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
      onClick: () => onSelectUniverse('X-MEN'),
      isActive: !doomsdayMode && activeUniverse === 'X-MEN',
      activeStyle: 'badge-3d-metallic !border-amber-500/80 text-amber-300',
    },
    {
      id: 'f4',
      name: 'Fantastic Four',
      icon: <Layers className="w-3.5 h-3.5 text-sky-400" />,
      onClick: () => onSelectUniverse('FANTASTIC FOUR'),
      isActive: !doomsdayMode && activeUniverse === 'FANTASTIC FOUR',
      activeStyle: 'badge-3d-metallic !border-sky-500/80 text-sky-300',
    },
    {
      id: 'spiderman',
      name: 'Spider-Verse & Sony',
      icon: <Orbit className="w-3.5 h-3.5 text-indigo-400" />,
      onClick: () => onSelectUniverse('SPIDER-MAN'),
      isActive: !doomsdayMode && activeUniverse === 'SPIDER-MAN',
      activeStyle: 'badge-3d-metallic !border-indigo-500/80 text-indigo-300',
    },
  ];

  return (
    <section id="category-filter-bar" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {hubs.map((hub) => (
          <button
            key={hub.id}
            onClick={hub.onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
              hub.isActive
                ? `${hub.activeStyle} scale-105`
                : 'badge-3d-metallic text-slate-300 hover:text-white hover:scale-[1.02]'
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
