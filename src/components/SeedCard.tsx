import React from 'react';
import { motion } from 'motion/react';
import { PortfolioSeed } from '../types';
import { Compass, Sparkles, AlertCircle, HelpCircle, Layers, ArrowRight } from 'lucide-react';

interface SeedCardProps {
  key?: React.Key;
  seed: PortfolioSeed;
  onSelect: () => void;
  isSelected: boolean;
}

export default function SeedCard({ seed, onSelect, isSelected }: SeedCardProps) {
  const getStateIcon = (state: PortfolioSeed['state']) => {
    switch (state) {
      case 'Exploring':
        return <Compass className="h-3 w-3" />;
      case 'Inspired':
        return <Sparkles className="h-3 w-3" />;
      case 'Blocked':
        return <AlertCircle className="h-3 w-3" />;
      case 'Experimenting':
        return <HelpCircle className="h-3 w-3" />;
      case 'Refining':
        return <Layers className="h-3 w-3" />;
    }
  };

  const getStateBadgeClass = (state: PortfolioSeed['state']) => {
    switch (state) {
      case 'Exploring':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'Inspired':
        return 'bg-rose-500/10 border-rose-500/20 text-rose-300';
      case 'Blocked':
        return 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400';
      case 'Experimenting':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      case 'Refining':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-300';
    }
  };

  return (
    <motion.div
      id={`seed-card-${seed.id}`}
      onClick={onSelect}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col h-full rounded-2xl overflow-hidden bg-zinc-900/40 border transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'border-teal-500/60 bg-zinc-900/90 shadow-[0_12px_24px_rgba(20,184,166,0.12)]'
          : 'border-zinc-800/60 hover:border-zinc-700/80 hover:bg-zinc-900/60'
      }`}
    >
      {/* Visual Image Header */}
      <div className="relative aspect-[3/2] overflow-hidden bg-zinc-950">
        <img
          src={seed.coverImage}
          alt={seed.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
        
        {/* State Badge floating */}
        <div className="absolute top-3 left-3 flex gap-1.5 items-center">
          <span className={`text-[9px] font-mono font-medium tracking-widest uppercase px-2.5 py-1 rounded-md border backdrop-blur-md flex items-center gap-1 shadow-md ${getStateBadgeClass(seed.state)}`}>
            {getStateIcon(seed.state)}
            <span>{seed.state}</span>
          </span>
        </div>

        {/* Timeline Indicator floating */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md border border-zinc-800/50 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300">
          {seed.timeline?.length || 0} stages
        </div>
      </div>

      {/* Main Metadata */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 id="card-title" className="text-[15px] font-sans font-medium text-zinc-100 group-hover:text-teal-400 transition-colors duration-300 leading-snug">
            {seed.title}
          </h3>
          
          <div className="flex items-baseline gap-1 mt-1.5 text-[10px] font-mono text-zinc-500">
            <span>by</span>
            <span className="text-zinc-300 font-medium">{seed.creator}</span>
            <span>·</span>
            <span className="truncate">{seed.creatorRole}</span>
          </div>

          <p id="card-concept" className="text-xs text-zinc-400 font-sans font-light leading-relaxed my-3.5 line-clamp-3">
            {seed.concept}
          </p>
        </div>

        <div className="mt-auto">
          {/* Vulnerability Context Excerpt */}
          <div className="border-t border-zinc-800/60 pt-3.5 pb-2.5">
            <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">Process Anchor</span>
            <p className="text-[11px] text-zinc-400 line-clamp-2 italic font-serif leading-relaxed font-light pl-2.5 border-l border-zinc-700">
              "{seed.vulnerabilityContext}"
            </p>
          </div>

          {/* Tags */}
          <div id="card-tags" className="flex flex-wrap gap-1 pt-1.5">
            {seed.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono text-zinc-500 bg-zinc-850/50 hover:bg-zinc-800 border border-zinc-800/30 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
            {seed.tags.length > 3 && (
              <span className="text-[9px] font-mono text-zinc-600 bg-transparent px-1.5 py-0.5">
                +{seed.tags.length - 3}
              </span>
            )}
            
            <span className="ml-auto text-[10px] font-mono text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 self-center">
              View Space <ArrowRight className="h-2.5 w-2.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
