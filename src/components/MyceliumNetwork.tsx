import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, HelpCircle } from 'lucide-react';
import { PortfolioSeed } from '../types';

interface MyceliumNetworkProps {
  seeds: PortfolioSeed[];
  onSelectSeed: (seed: PortfolioSeed) => void;
  selectedSeed: PortfolioSeed | null;
}

export default function MyceliumNetwork({ seeds, onSelectSeed, selectedSeed }: MyceliumNetworkProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Check if a connection is active (either node is hovered)
  const isConnectionActive = (fromId: string, toId: string) => {
    if (!hoveredNodeId) return false;
    return hoveredNodeId === fromId || hoveredNodeId === toId;
  };

  // State-based coloring for visual feedback
  const getStateColorClass = (state: PortfolioSeed['state'], isSelected: boolean, isHovered: boolean) => {
    if (isSelected) return 'fill-teal-400 stroke-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.8)]';
    if (isHovered) return 'fill-teal-300 stroke-teal-200';

    switch (state) {
      case 'Exploring': return 'fill-amber-400 stroke-amber-500/40';
      case 'Inspired': return 'fill-rose-400 stroke-rose-500/40';
      case 'Blocked': return 'fill-zinc-500 stroke-zinc-600/40';
      case 'Experimenting': return 'fill-emerald-400 stroke-emerald-500/40';
      case 'Refining': return 'fill-blue-400 stroke-blue-500/40';
      default: return 'fill-zinc-400 stroke-zinc-500/40';
    }
  };

  const getStateGlowColor = (state: PortfolioSeed['state']) => {
    switch (state) {
      case 'Exploring': return 'text-amber-400';
      case 'Inspired': return 'text-rose-400';
      case 'Blocked': return 'text-zinc-400';
      case 'Experimenting': return 'text-emerald-400';
      case 'Refining': return 'text-blue-400';
      default: return 'text-teal-400';
    }
  };

  const getBGCircleColor = (state: PortfolioSeed['state']) => {
    switch (state) {
      case 'Exploring': return 'fill-amber-500/10 stroke-amber-500/20';
      case 'Inspired': return 'fill-rose-500/10 stroke-rose-500/20';
      case 'Blocked': return 'fill-zinc-500/10 stroke-zinc-500/20';
      case 'Experimenting': return 'fill-emerald-500/10 stroke-emerald-500/20';
      case 'Refining': return 'fill-blue-500/10 stroke-blue-500/20';
      default: return 'fill-teal-500/10 stroke-teal-500/20';
    }
  };

  return (
    <div id="inspiration-constellation" className="relative w-full aspect-[4/3] md:aspect-[21/9] min-h-[380px] rounded-2xl bg-zinc-950/40 backdrop-blur-xl overflow-hidden border border-zinc-800 select-none">
      {/* Soft contemporary chromatic glows */}
      <div className="absolute top-1/6 left-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/6 right-1/4 w-80 h-80 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Clean blueprint coordinate lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Title & Stats */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-900/60 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-zinc-800">
        <div id="ecosystem-heading" className="flex items-center gap-1.5 text-zinc-100 font-semibold uppercase tracking-wider text-xs">
          <Compass className="h-3.5 w-3.5 text-teal-400" />
          <span>Inspiration Connection Network</span>
        </div>
        <div id="ecosystem-nodes" className="mt-1 flex items-center gap-2">
          <span>In-Progress Projects: <strong className="text-zinc-200">{seeds.length}</strong></span>
          <span className="text-zinc-700">|</span>
          <span>Influence Vectors: <strong className="text-zinc-200">{seeds.reduce((acc, s) => acc + (s.connections?.length || 0), 0) / 2}</strong></span>
        </div>
      </div>

      {/* Legend Indicators */}
      <div className="absolute bottom-4 left-4 z-10 flex gap-4 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-zinc-850">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Exploring</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /> Inspired</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Experimenting</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> Refining</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-500" /> Blocked</span>
      </div>

      <svg id="inspiration-svg" className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Curved inspiration threads connecting seeds */}
        <g id="influence-threads">
          {seeds.map((seed) =>
            seed.connections?.map((targetId) => {
              const target = seeds.find((s) => s.id === targetId);
              if (!target || seed.id > targetId) return null; // Deduplicate pathways

              const active = isConnectionActive(seed.id, targetId);
              
              // Calculate curved control handles for contemporary layout look (bezier path)
              const midX = (seed.coordinates.x + target.coordinates.x) / 2;
              const midY = (seed.coordinates.y + target.coordinates.y) / 2 - 4; // curved upward
              const d = `M ${seed.coordinates.x} ${seed.coordinates.y} Q ${midX} ${midY} ${target.coordinates.x} ${target.coordinates.y}`;

              return (
                <g key={`${seed.id}-${targetId}`}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={active ? 'url(#active-gradient)' : '#ffffff'}
                    strokeWidth={active ? 0.35 : 0.08}
                    animate={{
                      strokeOpacity: active ? 0.8 : 0.12,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {active && (
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth={0.25}
                      strokeDasharray="1.5 3"
                      animate={{ strokeDashoffset: [-10, 10] }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    />
                  )}
                </g>
              );
            })
          )}
          {/* Defs to support glowing lines */}
          <defs>
            <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
          </defs>
        </g>

        {/* Constellation Nodes */}
        <g id="influence-nodes">
          {seeds.map((seed) => {
            const isSelected = selectedSeed?.id === seed.id;
            const isHovered = hoveredNodeId === seed.id;
            const isDirectNeighbor = hoveredNodeId ? seed.connections.includes(hoveredNodeId) : false;

            return (
              <g
                key={seed.id}
                className="cursor-pointer group"
                onClick={() => onSelectSeed(seed)}
                onMouseEnter={() => setHoveredNodeId(seed.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Visual back-aura circle */}
                <circle
                  cx={seed.coordinates.x}
                  cy={seed.coordinates.y}
                  r={isSelected ? 4.0 : isHovered ? 3.5 : isDirectNeighbor ? 2.2 : 1.2}
                  className={`transition-all duration-500 pointer-events-none ${getBGCircleColor(seed.state)}`}
                  strokeWidth={0.08}
                />

                {/* Main Interactive Node dot */}
                <circle
                  cx={seed.coordinates.x}
                  cy={seed.coordinates.y}
                  r={isSelected ? 1.4 : isHovered ? 1.2 : isDirectNeighbor ? 0.9 : 0.6}
                  className={`transition-all duration-300 ease-out ${getStateColorClass(
                    seed.state,
                    isSelected,
                    isHovered
                  )}`}
                  stroke="rgba(0,0,0,0.8)"
                  strokeWidth={0.05}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating labels overlay */}
      <div className="absolute inset-0 pointer-events-none font-sans" id="network-labels-container">
        {seeds.map((seed) => {
          const isSelected = selectedSeed?.id === seed.id;
          const isHovered = hoveredNodeId === seed.id;
          const isDirectNeighbor = hoveredNodeId ? seed.connections.includes(hoveredNodeId) : false;

          const visible = isSelected || isHovered || isDirectNeighbor;

          return (
            <div
              key={`label-container-${seed.id}`}
              className="absolute transition-all duration-300"
              style={{
                left: `${seed.coordinates.x}%`,
                top: `${seed.coordinates.y}%`,
                transform: 'translate(-50%, -140%)',
              }}
            >
              <div
                className={`flex flex-col items-center pointer-events-auto cursor-pointer rounded-lg px-2.5 py-1.5 whitespace-nowrap transition-all duration-300 ${
                  visible
                    ? 'opacity-100 translate-y-0 bg-zinc-900 border border-zinc-800 shadow-xl'
                    : 'opacity-40 translate-y-0.5 scale-95 border border-transparent'
                }`}
                onClick={() => onSelectSeed(seed)}
              >
                <span className={`text-[10px] font-medium tracking-wide ${
                  isSelected ? 'text-teal-400 font-semibold' : 'text-zinc-200'
                }`}>
                  {seed.title.split(':')[0]}
                </span>
                
                {visible && (
                  <span className={`text-[8px] font-mono leading-none tracking-wider uppercase mt-1 ${getStateGlowColor(seed.state)}`}>
                    {seed.state}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-500 text-right flex flex-col gap-0.5 max-sm:hidden">
        <span>Curved lines represent inspiration paths</span>
        <span>Click node to inspect creative log</span>
      </div>
    </div>
  );
}
