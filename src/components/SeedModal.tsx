import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, FileText, ChevronRight, PenTool, Trash2, Calendar, HardDrive, CheckCircle2, Quote, AlertOctagon, Layers, Compass, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { PortfolioSeed, CreativeResidue, CreativeState } from '../types';

interface SeedModalProps {
  seed: PortfolioSeed;
  onClose: () => void;
  onAddResidue: (seedId: string, residue: Omit<CreativeResidue, 'id'>) => void;
  onDeleteResidue: (seedId: string, residueId: string) => void;
  onUpdateState: (seedId: string, newState: CreativeState) => void;
}

export default function SeedModal({ seed, onClose, onAddResidue, onDeleteResidue, onUpdateState }: SeedModalProps) {
  const [newResidueType, setNewResidueType] = useState<'text' | 'sketch' | 'quote' | 'mistake'>('text');
  const [newResidueContent, setNewResidueContent] = useState('');
  const [newResidueMeta, setNewResidueMeta] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmitResidue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResidueContent.trim()) return;

    onAddResidue(seed.id, {
      type: newResidueType,
      content: newResidueContent,
      meta: newResidueMeta.trim() || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    setNewResidueContent('');
    setNewResidueMeta('');
    setShowAddForm(false);
  };

  const getResidueIcon = (type: CreativeResidue['type']) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4 text-emerald-400" />;
      case 'sketch': return <PenTool className="h-4 w-4 text-amber-400" />;
      case 'quote': return <Quote className="h-4 w-4 text-blue-400" />;
      case 'mistake': return <AlertOctagon className="h-4 w-4 text-rose-400" />;
    }
  };

  const getResidueBg = (type: CreativeResidue['type']) => {
    switch (type) {
      case 'text': return 'border-emerald-500/10 bg-emerald-500/5';
      case 'sketch': return 'border-amber-500/10 bg-amber-500/5';
      case 'quote': return 'border-blue-500/10 bg-blue-500/5';
      case 'mistake': return 'border-rose-500/10 bg-rose-500/5';
    }
  };

  const statesList: CreativeState[] = ['Exploring', 'Inspired', 'Blocked', 'Experimenting', 'Refining'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl overflow-y-auto"
    >
      <motion.div
        initial={{ y: 30, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl rounded-3xl bg-zinc-950 overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8)] border border-zinc-800 flex flex-col max-h-[92vh]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-900/40">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <span className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase">Process Workspace Board</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 transition-colors p-1.5 rounded-full hover:bg-zinc-900"
            title="Close Workspace"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Layout Content */}
        <div id="modal-container-grid" className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-900">
          
          {/* LEFT PANEL: Concept details & Creative State & Creative Timeline */}
          <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col gap-8 overflow-y-auto bg-zinc-950">
            {/* Context/Hero block */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-850 p-6 min-h-[180px] flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <img 
                  src={seed.coverImage} 
                  alt={seed.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-20 filter grayscale" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-2 text-zinc-500 font-mono text-[10px]">
                  <span>Initiated {seed.createdAt}</span>
                  <span>•</span>
                  <span>Active Work {seed.lastTouched}</span>
                </div>
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight mb-2">
                  {seed.title}
                </h2>
                <p className="text-xs font-mono text-zinc-400">
                  Documented by <span className="text-zinc-100 font-medium">{seed.creator}</span> — {seed.creatorRole}
                </p>
              </div>
            </div>

            {/* MANUAL CREATIVE STATE SELECTOR */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-900">
              <h4 className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider mb-3">
                Change Creative State Manual Filter
              </h4>
              <div className="flex flex-wrap gap-2">
                {statesList.map((st) => {
                  const isActive = seed.state === st;
                  return (
                    <button
                      key={st}
                      onClick={() => onUpdateState(seed.id, st)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-teal-500/10 border border-teal-500/40 text-teal-400 font-semibold'
                          : 'bg-zinc-900 border border-zinc-850 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        st === 'Exploring' ? 'bg-amber-400' :
                        st === 'Inspired' ? 'bg-rose-400' :
                        st === 'Blocked' ? 'bg-zinc-500' :
                        st === 'Experimenting' ? 'bg-emerald-400' : 'bg-blue-400'
                      }`} />
                      {st}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] font-mono text-zinc-650 leading-relaxed mt-2.5 text-zinc-500">
                Select your current disposition manually. This status coordinates your filter search on the live Antiportfolio Feed and influences connecting paths on the constellation map.
              </p>
            </div>

            {/* Concept Statement */}
            <div id="seed-conceptual-block">
              <h4 className="text-[11px] font-mono uppercase text-teal-400 tracking-wider mb-2">Conceptual Nucleus</h4>
              <p className="text-sm font-sans font-light text-zinc-300 leading-relaxed pl-3.5 border-l border-teal-500/40">
                {seed.concept}
              </p>
            </div>

            {/* CREATIVE TIMELINE (Project Evolution Stages) */}
            <div>
              <h4 className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider mb-5 flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-teal-400" />
                Creative Timeline & Evolution History
              </h4>
              
              <div className="relative border-l border-zinc-850 ml-3 pl-6 space-y-8 py-2">
                {seed.timeline && seed.timeline.length > 0 ? (
                  seed.timeline.map((event, index) => (
                    <div key={event.id} className="relative">
                      {/* Chronology visual pulse dot */}
                      <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-teal-400 ring-4 ring-zinc-950 flex items-center justify-center" />
                      
                      <div className="flex flex-col md:flex-row gap-6 bg-zinc-900/35 border border-zinc-900 p-5 rounded-2xl hover:border-zinc-800 transition-all duration-300">
                        {/* Event Content */}
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <span className="font-sans font-medium text-sm text-zinc-100">{event.stageName}</span>
                            <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">{event.date}</span>
                          </div>
                          <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        {/* Stage Event Visual Box */}
                        {event.imageUrl && (
                          <div className="w-full md:w-36 h-24 rounded-lg overflow-hidden bg-zinc-950 flex-shrink-0">
                            <img 
                              src={event.imageUrl} 
                              alt={event.stageName} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-400" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-zinc-600 text-xs font-mono italic">No chronological stages logged yet.</div>
                )}
              </div>
            </div>

            {/* Vulnerability Log */}
            <div id="seed-vulnerability-box">
              <h4 className="text-[11px] font-mono uppercase text-rose-400/90 tracking-wider mb-2">
                Anxiety & Failure Log
              </h4>
              <div className="p-4 rounded-xl bg-rose-950/10 border border-rose-900/20">
                <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                  "{seed.vulnerabilityContext}"
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Creative Residue & Board clips */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto bg-zinc-950">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans text-sm font-medium text-zinc-100 flex items-center gap-1.5">
                  <HardDrive className="h-4 w-4 text-teal-400" />
                  Developmental Residue
                </h3>
                <p className="text-[10px] font-mono text-zinc-500">Unpolished sketches & visual notes</p>
              </div>

              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="text-[10px] font-mono text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-2.5 py-1 rounded-lg transition-all"
                >
                  + Add Clip
                </button>
              )}
            </div>

            {/* ADD RESIDUE FORM */}
            {showAddForm && (
              <motion.form
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmitResidue}
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-850 flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">New Residue clipping</span>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-zinc-550 hover:text-zinc-400 font-mono text-[9px]"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-1">
                  {(['text', 'sketch', 'quote', 'mistake'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewResidueType(t)}
                      className={`py-1 text-[9px] font-mono uppercase rounded transition-all ${
                        newResidueType === t
                          ? 'bg-teal-500/10 border border-teal-500/40 text-teal-400'
                          : 'bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <textarea
                  value={newResidueContent}
                  onChange={(e) => setNewResidueContent(e.target.value)}
                  placeholder="Record draft logs, math ratios, color specs, errors..."
                  className="w-full text-xs font-mono p-2.5 rounded bg-zinc-950 border border-zinc-850 text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-teal-500/60"
                  rows={3}
                  required
                />

                <input
                  type="text"
                  value={newResidueMeta}
                  onChange={(e) => setNewResidueMeta(e.target.value)}
                  placeholder="Context tags (e.g. sketchbook p. 12)"
                  className="w-full text-[10px] font-mono p-2 rounded bg-zinc-950 border border-zinc-850 text-zinc-300 placeholder-zinc-700 focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-2 bg-teal-500 text-zinc-950 rounded-lg font-mono text-xs font-medium hover:bg-teal-400 transition-colors"
                >
                  DEPOSIT CLIPPING
                </button>
              </motion.form>
            )}

            {/* RESIDUE FEED */}
            <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-1">
              {seed.residue && seed.residue.length > 0 ? (
                seed.residue.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${getResidueBg(item.type)}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        {getResidueIcon(item.type)}
                        <span className="font-mono text-[9px] tracking-wider uppercase text-zinc-400">
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.meta && (
                          <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                            {item.meta}
                          </span>
                        )}
                        <button
                          onClick={() => onDeleteResidue(seed.id, item.id)}
                          className="text-zinc-600 hover:text-rose-400 p-1 rounded hover:bg-zinc-900 transition-colors"
                          title="Purge clipping"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words border-l border-zinc-805 pl-2.5">
                      {item.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs font-mono text-zinc-600 border border-dashed border-zinc-900 rounded-xl">
                  Vault is empty of residue.
                  <br />
                  <span className="text-[10px] text-teal-400 cursor-pointer hover:underline mt-1 block" onClick={() => setShowAddForm(true)}>Post new draft notes</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-zinc-900 bg-zinc-950 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
          <span>PROJECT NODE ID: {seed.id.toUpperCase()}</span>
          <span>DOCUMENTING EVOLUTION OVER PERFECTION</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
