import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, Send, Eye, Heart, HelpCircle } from 'lucide-react';
import { VulnerabilityShare } from '../types';

interface ShedSkinFormProps {
  onAddConfession: (text: string, alias: string, category: VulnerabilityShare['category']) => void;
  confessions: VulnerabilityShare[];
  onResonateConfession: (confessionId: string) => void;
}

export default function ShedSkinForm({ onAddConfession, confessions, onResonateConfession }: ShedSkinFormProps) {
  const [text, setText] = useState('');
  const [alias, setAlias] = useState('');
  const [category, setCategory] = useState<VulnerabilityShare['category']>('imposter-syndrome');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitConfession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const finalAlias = alias.trim() || 'Anonymous Designer';
    onAddConfession(text.trim(), finalAlias, category);
    
    setText('');
    setAlias('');
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  const getCategoryThemeColors = (cat: VulnerabilityShare['category']) => {
    switch (cat) {
      case 'imposter-syndrome': return 'text-purple-400 border-purple-500/20 bg-purple-500/5';
      case 'creative-block': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case 'technical-disaster': return 'text-rose-400 border-rose-500/20 bg-rose-500/5';
      case 'happy-accident': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
    }
  };

  return (
    <div id="vulnerability-shelter" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Interactive Form */}
      <div className="lg:col-span-5 bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />

        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-4.5 w-4.5 text-amber-400" />
          <h2 id="skin-section-title" className="font-sans text-lg font-medium text-white tracking-tight">
            Share a Creative Block
          </h2>
        </div>

        <p className="text-xs font-sans font-light text-zinc-400 mb-6 leading-relaxed">
          This is an anti-perfectionist zone. Document your designer block, pitch anxieties, or coding failures anonymously. Letting go of the perfect façade supports real-world community confidence.
        </p>

        <form onSubmit={handleSubmitConfession} className="flex flex-col gap-4">
          {/* Select Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">Category of Experience</label>
            <div className="grid grid-cols-2 gap-2">
              {(['imposter-syndrome', 'creative-block', 'technical-disaster', 'happy-accident'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 text-[10px] font-mono uppercase rounded-lg border text-left flex flex-col justify-between transition-all ${
                    category === cat
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <span>{cat.replace('-', ' ')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sincere Content Area */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">The Hard Truth</label>
            <textarea
              className="w-full text-xs font-sans min-h-[105px] p-4 rounded-xl bg-zinc-950 border border-zinc-855 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-amber-500 transition-all font-light leading-relaxed"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. I deleted my Figma file out of pure rage..."
              maxLength={400}
              required
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" /> Fully Anonymous Sharing
              </span>
              <span>{text.length}/400</span>
            </div>
          </div>

          {/* Pseudonym */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">Pseudonym or Brand Symbol (Optional)</label>
            <input
              type="text"
              className="w-full text-xs font-mono p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500 transition-all"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="e.g. OverlappingLayers"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-amber-500 text-zinc-950 font-mono text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
          >
            <Send className="h-3 w-3" />
            <span>Post to the Shared Logs</span>
          </button>
        </form>

        {/* Success confirmation animation */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 text-center border border-amber-500/20 rounded-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center mb-4 bg-amber-500/15 text-amber-450"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <h4 className="font-sans text-base font-medium text-white mb-1.5">Log Posted Cleanly</h4>
              <p className="text-xs font-sans font-light text-zinc-455 max-w-[280px] leading-relaxed text-zinc-400">
                Your creative block has been registered. Other developers and designers can learn and resonate with this challenge.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confession Vault Feed */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-1 mb-2">
          <h3 id="shedding-gallery-title" className="font-sans text-lg font-medium text-white flex items-center gap-2">
            Shared Creative Blocks
            <span className="text-xs font-mono text-zinc-500 font-normal">({confessions.length} shared items)</span>
          </h3>
          <span className="text-[10px] font-mono text-zinc-500">Resonate to support shared vulnerability</span>
        </div>

        {/* Scrollable grid feed */}
        <div id="confessions-feed-box" className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
          {confessions.map((con) => (
            <motion.div
              key={con.id}
              layout
              className="p-5 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-300 border border-zinc-805 flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[9px]">
                  <span className={`px-2 py-0.5 rounded border ${getCategoryThemeColors(con.category)}`}>
                    #{con.category.replace('-', ' ')}
                  </span>
                  <span className="text-zinc-500">{con.timestamp}</span>
                </div>
                
                <p className="text-xs text-zinc-300 font-serif leading-relaxed italic mb-4 font-light">
                  "{con.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-850 mt-auto">
                <span className="text-[9px] font-mono text-zinc-500">
                  by <strong className="text-zinc-400 font-medium">{con.alias}</strong>
                </span>

                <button
                  onClick={() => onResonateConfession(con.id)}
                  className="flex items-center gap-1.5 group/btn text-[10px] font-mono text-amber-400/80 hover:text-amber-300 transition-colors"
                  title="Resonate and support"
                >
                  <Heart className="h-3 w-3 transition-transform duration-300 group-hover/btn:scale-120 group-hover/btn:fill-amber-400 fill-none" />
                  <span>Resonate ({con.resonance})</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
