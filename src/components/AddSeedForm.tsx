import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Sliders, Send, Crosshair, Image, PlusCircle } from 'lucide-react';
import { PortfolioSeed, CreativeState } from '../types';

interface AddSeedFormProps {
  onAddSeed: (seed: Omit<PortfolioSeed, 'id' | 'createdAt' | 'lastTouched' | 'connections' | 'residue' | 'timeline'>) => void;
}

export default function AddSeedForm({ onAddSeed }: AddSeedFormProps) {
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [creatorRole, setCreatorRole] = useState('');
  const [concept, setConcept] = useState('');
  const [state, setState] = useState<CreativeState>('Exploring');
  const [vulnerability, setVulnerability] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsString, setTagsString] = useState('');
  
  // Pick location on map between 15% and 85% indices
  const [xCoord, setXCoord] = useState(Math.floor(Math.random() * 60) + 20);
  const [yCoord, setYCoord] = useState(Math.floor(Math.random() * 60) + 20);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !concept.trim()) return;

    const tags = tagsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Fallbacks of visually interesting process illustrations
    const fallbackImages = [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541462608141-2f58c4809c57?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=1200&q=80'
    ];
    const finalImage = coverImage.trim() || fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

    onAddSeed({
      title: title.trim(),
      creator: creator.trim() || 'Unidentified Creative',
      creatorRole: creatorRole.trim() || 'Designer',
      concept: concept.trim(),
      state,
      vulnerabilityContext: vulnerability.trim() || 'No blockers reported — documenting early evolutionary curves with grace.',
      tags: tags.length > 0 ? tags : ['ProcessDraft'],
      coverImage: finalImage,
      coordinates: { x: xCoord, y: yCoord }
    });

    // Reset fields
    setTitle('');
    setCreator('');
    setCreatorRole('');
    setConcept('');
    setState('Exploring');
    setVulnerability('');
    setCoverImage('');
    setTagsString('');
    setXCoord(Math.floor(Math.random() * 60) + 20);
    setYCoord(Math.floor(Math.random() * 60) + 20);

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  const defaultStates: CreativeState[] = ['Exploring', 'Inspired', 'Blocked', 'Experimenting', 'Refining'];

  return (
    <div id="sprout-seed-panel" className="bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-zinc-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex items-center gap-2 mb-4">
        <Compass className="h-4.5 w-4.5 text-teal-400" />
        <h2 id="sprout-form-title" className="font-sans text-lg font-medium text-white tracking-tight">
          Sow an Unfinished Concept
        </h2>
      </div>

      <p className="text-xs font-sans font-light text-zinc-400 mb-6 leading-relaxed max-w-2xl">
        Share your unfinished moodboard, sketches, failures, or layout anomalies. This space removes the pressure of polish, offering other designers insights into the genuine evolution behind creative thinking.
      </p>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 px-4 rounded-2xl border border-teal-500/20 bg-teal-950/5"
        >
          <div className="w-12 h-12 rounded-full border border-teal-500/20 flex items-center justify-center mx-auto mb-4 bg-teal-500/10 text-teal-400 animate-bounce">
            <PlusCircle className="h-5 w-5" />
          </div>
          <h4 className="font-sans text-base font-medium text-white mb-1.5">Project Sown Successfully</h4>
          <p className="text-xs font-sans font-light text-zinc-400 max-w-sm mx-auto leading-relaxed mb-6">
            Your draft is now plotted onto our shared inspiration constellation network and visible on the Antiportfolio Feed.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-[11px] font-mono uppercase tracking-widest text-teal-400 hover:underline hover:text-teal-300 transition-colors"
          >
            Sow another unfinished draft
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          {/* Left Column Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-medium">Concept / Draft Title</label>
              <input
                type="text"
                required
                className="w-full text-xs font-sans p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500/50 transition-all font-light"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Liquid Grids Layout Draft"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-medium">Your Name</label>
                <input
                  type="text"
                  className="w-full text-xs font-mono p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500/50 transition-all"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  placeholder="e.g. Liam Cruz"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-medium">Creative Practice</label>
                <input
                  type="text"
                  className="w-full text-xs font-mono p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500/50 transition-all"
                  value={creatorRole}
                  onChange={(e) => setCreatorRole(e.target.value)}
                  placeholder="e.g. Interaction Architect"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-medium">The Essence & Conceptual Core</label>
              <textarea
                required
                className="w-full text-xs font-sans p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500/50 min-h-[105px] transition-all font-light leading-relaxed"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="Describe your design aspirations, core aesthetics, and what parameters you are testing..."
              />
            </div>
          </div>

          {/* Right Column Fields */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-medium">Creative State</label>
                <select
                  className="w-full text-xs font-mono p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-200 focus:outline-none focus:border-teal-500/50 transition-all"
                  value={state}
                  onChange={(e) => setState(e.target.value as CreativeState)}
                >
                  {defaultStates.map(st => (
                    <option key={st} value={st} className="bg-zinc-950 text-zinc-100">{st}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-medium">Process Image URL (Optional)</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full text-xs font-mono p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-100 placeholder-zinc-750 focus:outline-none focus:border-teal-500/50 transition-all"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/..."
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-medium">Anxieties, Blocks, or Pivot Logic (Vulnerability Log)</label>
              <textarea
                className="w-full text-xs font-serif italic p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-teal-500/50 min-h-[105px] transition-all leading-relaxed"
                value={vulnerability}
                onChange={(e) => setVulnerability(e.target.value)}
                placeholder="Detail what became overwhelming or why you chose to alter your goals. Make it human."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-medium font-mono">Process Tags (comma-spaced)</label>
                <input
                  type="text"
                  className="w-full text-xs font-mono p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-500/50 transition-all animate-none"
                  value={tagsString}
                  onChange={(e) => setTagsString(e.target.value)}
                  placeholder="e.g. editorial, raw, experimental"
                />
              </div>

              {/* Coordinates */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-medium flex items-center gap-1">
                  <Crosshair className="h-3 w-3 text-teal-400" /> Network Grid Placement
                </label>
                <div className="grid grid-cols-2 gap-1.5 font-mono">
                  <div className="flex items-center bg-zinc-950 border border-zinc-850 rounded-xl px-2.5 py-1.5">
                    <span className="text-[9px] text-zinc-600 mr-1.5">X:</span>
                    <input
                      type="number"
                      min="15"
                      max="85"
                      className="w-full text-xs text-zinc-100 bg-transparent focus:outline-none"
                      value={xCoord}
                      onChange={(e) => setXCoord(Math.min(85, Math.max(15, Number(e.target.value))))}
                    />
                  </div>
                  <div className="flex items-center bg-zinc-950 border border-zinc-850 rounded-xl px-2.5 py-1.5">
                    <span className="text-[9px] text-zinc-600 mr-1.5">Y:</span>
                    <input
                      type="number"
                      min="15"
                      max="85"
                      className="w-full text-xs text-zinc-100 bg-transparent focus:outline-none"
                      value={yCoord}
                      onChange={(e) => setYCoord(Math.min(85, Math.max(15, Number(e.target.value))))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Submit */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-teal-500 hover:bg-teal-400 text-zinc-950 rounded-xl font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_12px_rgba(20,184,166,0.2)] flex items-center justify-center gap-1.5"
            >
              <Send className="h-3 w-3" />
              <span>Plat onto Inspiration Constellation Map</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
