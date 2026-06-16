import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Trash2, 
  PlusCircle, 
  HelpCircle, 
  Heart,
  Clock,
  Sparkles,
  RefreshCw,
  Eye,
  BookOpen,
  ChevronDown
} from 'lucide-react';

import { PortfolioSeed, VulnerabilityShare, CreativeResidue, CreativeState } from './types';
import { INITIAL_SEEDS, INITIAL_CONFESSIONS } from './data/mockSeeds';

import AmbientSound from './components/AmbientSound';
import MyceliumNetwork from './components/MyceliumNetwork';
import SeedCard from './components/SeedCard';
import SeedModal from './components/SeedModal';
import ShedSkinForm from './components/ShedSkinForm';
import AddSeedForm from './components/AddSeedForm';

// Floating Canvas Particles representing design drafts scattered
function InspirationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    class ScatterDot {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      alphaSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.12; // ultra calm movement
        this.speedY = (Math.random() - 0.5) * 0.12;
        
        // Alternate colors matching Exploring (amber), Inspired (rose), Experimenting (teal) states
        const roll = Math.random();
        if (roll < 0.4) {
          this.color = '20, 184, 166'; // teal
        } else if (roll < 0.7) {
          this.color = '244, 63, 94'; // rose
        } else {
          this.color = '245, 158, 11'; // amber
        }
        this.alpha = Math.random() * 0.4 + 0.1;
        this.alphaSpeed = (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1);
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.alpha += this.alphaSpeed;
        if (this.alpha > 0.5 || this.alpha < 0.1) {
          this.alphaSpeed = -this.alphaSpeed;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        c.shadowBlur = this.size * 5;
        c.shadowColor = `rgba(${this.color}, ${this.alpha * 0.7})`;
        c.fill();
        c.restore();
      }
    }

    const dots: ScatterDot[] = Array.from({ length: 50 }, () => new ScatterDot());

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const radGrad = ctx.createRadialGradient(width/2, height/2, 20, width/2, height/2, Math.max(width, height));
      radGrad.addColorStop(0, 'rgba(10, 11, 13, 0.45)');
      radGrad.addColorStop(1, 'rgba(9, 9, 11, 0.95)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.update();
        dot.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

export default function App() {
  // Navigation: "landing" or "workspace"
  const [currentMode, setCurrentMode] = useState<'landing' | 'workspace'>('landing');
  
  // Tab selector: "feed" (Antiportfolio Feed / Constellation map), "shelter" (Anxiety sharing logs), "sprout" (Uploader form)
  const [activeTab, setActiveTab] = useState<'feed' | 'shelter' | 'sprout'>('feed');

  // Persistence
  const [seeds, setSeeds] = useState<PortfolioSeed[]>(() => {
    const saved = localStorage.getItem('aether_seeds');
    return saved ? JSON.parse(saved) : INITIAL_SEEDS;
  });

  const [confessions, setConfessions] = useState<VulnerabilityShare[]>(() => {
    const saved = localStorage.getItem('aether_confessions');
    return saved ? JSON.parse(saved) : INITIAL_CONFESSIONS;
  });

  const [selectedSeed, setSelectedSeed] = useState<PortfolioSeed | null>(null);
  const [timeState, setTimeState] = useState(new Date());

  // Contemporary query and manual state filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState<string>('All');

  // Gentle ticking time drift
  useEffect(() => {
    const timer = setInterval(() => setTimeState(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('aether_seeds', JSON.stringify(seeds));
  }, [seeds]);

  useEffect(() => {
    localStorage.setItem('aether_confessions', JSON.stringify(confessions));
  }, [confessions]);

  // Create & plot a standalone seed
  const handleAddSeed = (newSeedData: Omit<PortfolioSeed, 'id' | 'createdAt' | 'lastTouched' | 'connections' | 'residue' | 'timeline'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newSeed: PortfolioSeed = {
      ...newSeedData,
      id: `seed-${Date.now()}`,
      createdAt: today,
      lastTouched: today,
      connections: [],
      residue: [],
      timeline: [
        {
          id: `t-init-${Date.now()}`,
          stageName: "First Draft Spark",
          description: "Project registered on ÆTHER anti-portfolio grid. Initial concept model uploaded.",
          date: today,
          imageUrl: newSeedData.coverImage
        }
      ]
    };

    const updatedSeeds = [...seeds];
    
    // Find closest nodes on coordinates space to link influence paths
    let nearestSeed: PortfolioSeed | null = null;
    let minDistance = Infinity;

    updatedSeeds.forEach((existing) => {
      const dx = existing.coordinates.x - newSeed.coordinates.x;
      const dy = existing.coordinates.y - newSeed.coordinates.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDistance) {
        minDistance = dist;
        nearestSeed = existing;
      }
    });

    if (nearestSeed && minDistance < 45) {
      newSeed.connections.push((nearestSeed as PortfolioSeed).id);
      (nearestSeed as PortfolioSeed).connections.push(newSeed.id);
    }

    setSeeds([newSeed, ...updatedSeeds]);
  };

  // Add individual debris clipping
  const handleAddResidue = (seedId: string, residueData: Omit<CreativeResidue, 'id'>) => {
    setSeeds(prevSeeds => 
      prevSeeds.map(seed => {
        if (seed.id !== seedId) return seed;
        
        const newResidue: CreativeResidue = {
          ...residueData,
          id: `res-${Date.now()}`
        };

        const updated = {
          ...seed,
          lastTouched: new Date().toISOString().split('T')[0],
          residue: [newResidue, ...(seed.residue || [])]
        };

        if (selectedSeed && selectedSeed.id === seedId) {
          setSelectedSeed(updated);
        }

        return updated;
      })
    );
  };

  // Delete individual debris clipping
  const handleDeleteResidue = (seedId: string, residueId: string) => {
    setSeeds(prevSeeds => 
      prevSeeds.map(seed => {
        if (seed.id !== seedId) return seed;
        
        const updated = {
          ...seed,
          residue: (seed.residue || []).filter(r => r.id !== residueId)
        };

        if (selectedSeed && selectedSeed.id === seedId) {
          setSelectedSeed(updated);
        }

        return updated;
      })
    );
  };

  // Manually update the Creative State badge tag
  const handleUpdateSeedState = (seedId: string, newState: CreativeState) => {
    setSeeds(prevSeeds => 
      prevSeeds.map((seed) => {
        if (seed.id !== seedId) return seed;
        const updated = {
          ...seed,
          state: newState,
          lastTouched: new Date().toISOString().split('T')[0]
        };

        if (selectedSeed && selectedSeed.id === seedId) {
          setSelectedSeed(updated);
        }
        return updated;
      })
    );
  };

  // Share creative block details
  const handleAddConfession = (text: string, alias: string, category: VulnerabilityShare['category']) => {
    const newConfession: VulnerabilityShare = {
      id: `conf-${Date.now()}`,
      text,
      alias,
      category,
      timestamp: 'just now',
      resonance: 0
    };
    setConfessions([newConfession, ...confessions]);
  };

  // Resonate confession block
  const handleResonateConfession = (confessionId: string) => {
    setConfessions(prev =>
      prev.map(c => c.id === confessionId ? { ...c, resonance: c.resonance + 1 } : c)
    );
  };

  // Filter lists based on state selection and search input
  const filteredSeeds = seeds.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.concept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = filterState === 'All' || s.state === filterState;
    return matchesSearch && matchesState;
  });

  return (
    <div id="aether-app-entry" className="min-h-screen bg-zinc-950 text-zinc-100 font-sans overflow-x-hidden relative selection:bg-teal-500/20 selection:text-teal-400 flex flex-col">
      <InspirationCanvas />

      {/* Decorative contemporary blurred chromatic glow points */}
      <div className="fixed top-12 left-1/3 w-[45vw] h-[45vw] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-24 right-1/4 w-[35vw] h-[35vw] rounded-full bg-rose-500/5 blur-[140px] pointer-events-none z-0" />

      <AnimatePresence mode="wait">
        {currentMode === 'landing' ? (
          <motion.div
            key="landing-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full flex flex-col justify-between items-center z-10 px-4 sm:px-6 relative text-center min-h-screen py-10 md:py-14"
          >
            {/* Top Bar on Landing */}
            <div className="w-full max-w-6xl mx-auto flex justify-between items-center mt-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-zinc-450 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                <span>Resting in deliberate draft state</span>
              </div>
              <AmbientSound />
            </div>

            {/* Centered Typography space */}
            <div className="max-w-3xl my-auto flex flex-col items-center">
              <motion.h1
                initial={{ letterSpacing: '0.12em', opacity: 0.8 }}
                animate={{ letterSpacing: '0.25em', opacity: 1 }}
                transition={{ duration: 4, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
                className="text-4xl sm:text-5xl md:text-6xl font-sans font-extralight tracking-widest text-white uppercase mb-5 text-center w-full pl-4"
              >
                ÆTHER
              </motion.h1>

              <p className="font-mono text-[11px] text-teal-400/80 tracking-[0.25em] uppercase mb-10 max-w-xl">
                ANTI-PORTFOLIO WORKBENCH FOR CONTEMPORARY CREATIVES
              </p>

              {/* Manifesto Card */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="p-8 md:p-10 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-805 relative flex flex-col items-center max-w-2xl"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-md border border-zinc-800 bg-zinc-900 font-mono text-[9px] uppercase tracking-widest text-amber-400">
                  Concept Fragment
                </div>

                <div className="font-serif italic text-lg sm:text-xl md:text-2xl text-zinc-100 leading-relaxed max-w-xl">
                  “The process is the artifact.”
                </div>

                <p className="text-xs sm:text-sm font-sans font-light text-zinc-400 leading-relaxed max-w-lg mt-6">
                  Perfect portfolios are curated cages of performance, raising perfectionist anxiety and constant comparison. Æther celebrates the honest visual clutter of unfinished moodboards, layout experiments, creative blocks, and project evolution over time.
                </p>

                <div className="flex gap-6 mt-8 border-t border-zinc-850 pt-6 w-full justify-center">
                  <div className="text-center">
                    <span className="font-mono text-xs text-teal-405 block font-semibold uppercase tracking-widest">WABI-SABI</span>
                    <span className="text-[10px] text-zinc-550 font-mono">Accepting imperfection</span>
                  </div>
                  <div className="w-px bg-zinc-850 h-8" />
                  <div className="text-center">
                    <span className="font-mono text-xs text-rose-405 block font-semibold uppercase tracking-widest">EVOLUTION</span>
                    <span className="text-[10px] text-zinc-550 font-mono">Valuing draft histories</span>
                  </div>
                </div>
              </motion.div>

              <motion.button
                onClick={() => setCurrentMode('workspace')}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="mt-12 px-8 py-3.5 bg-zinc-100 text-zinc-950 font-mono text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-teal-400 hover:text-zinc-950 transition-all duration-300 shadow-[0_4px_16px_rgba(255,255,255,0.06)] cursor-slow flex items-center gap-2"
              >
                <span>Enter Personal Workspace</span>
                <Compass className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Bottom info on Landing */}
            <div className="text-[10px] font-mono text-zinc-500 flex justify-between w-full max-w-6xl mx-auto border-t border-zinc-900 pt-5">
              <span>LATENCY: ZERO BIO-INTEGRATIONS</span>
              <span>COPENHAGEN | LONDON | BERLIN</span>
            </div>
          </motion.div>
        ) : (
          /* WORKSPACE VIEW: IMMERSIVE APPLET FOR CONTEMPORARY STUDY */
          <motion.div
            key="workspace-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-7xl mx-auto z-10 px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-between"
          >
            {/* Top Workspace Header */}
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6 mb-8 mt-2">
              <div className="flex items-center gap-4">
                <div 
                  onClick={() => setCurrentMode('landing')}
                  className="cursor-pointer group"
                  title="Return to the serene draft manifesto"
                >
                  <h1 className="text-lg font-sans font-light text-white tracking-[0.15em] uppercase hover:text-teal-400 transition-colors leading-none">
                    ÆTHER
                  </h1>
                  <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase block mt-1">
                    ← RETREAT TO MANIFESTO
                  </span>
                </div>

                <div className="h-6 w-px bg-zinc-850 max-sm:hidden" />

                {/* Clock ticker */}
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs max-sm:hidden">
                  <Clock className="h-3.5 w-3.5 text-teal-400 animate-pulse" />
                  <span className="text-[10px] tracking-widest uppercase font-medium">
                    TEMPORAL DRIFT: {timeState.toLocaleTimeString('en-US', { hour12: false })} UTC
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <AmbientSound />
              </div>
            </header>

            {/* Main Section */}
            <main id="workspace-main" className="flex-1 flex flex-col gap-8">
              
              {/* PRIMARY TABS MENU */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <div className="flex gap-4 sm:gap-6 border-b border-transparent">
                  {(['feed', 'shelter', 'sprout'] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    let tabLabel = '';
                    switch (tab) {
                      case 'feed': tabLabel = 'Anti-Portfolio Feed & Map'; break;
                      case 'shelter': tabLabel = 'Creative Blocks Vault'; break;
                      case 'sprout': tabLabel = 'Sow New Draft'; break;
                    }

                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-xs sm:text-sm font-sans tracking-wider relative transition-all uppercase cursor-pointer ${
                          isActive
                            ? 'text-teal-450 font-medium'
                            : 'text-zinc-500 hover:text-zinc-350'
                        }`}
                      >
                        <span>{tabLabel}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-teal-400"
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="text-[10px] font-mono text-zinc-650 max-sm:hidden uppercase tracking-widest text-zinc-500">
                  Valuing Process Over Outcomes
                </div>
              </div>

              {/* VIEW SWITCHER PANELS */}
              <div id="active-panel-container">
                <AnimatePresence mode="wait">
                  {activeTab === 'feed' && (
                    <motion.div
                      key="feed-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-8"
                    >
                      {/* INSPIRATION CONSTELLATION MAP (Redesigned Network) */}
                      <section>
                        <MyceliumNetwork
                          seeds={seeds}
                          onSelectSeed={(seed) => setSelectedSeed(seed)}
                          selectedSeed={selectedSeed}
                        />
                      </section>

                      {/* DETAILED CONTEMPORARY SEARCH & SELECTOR BAR */}
                      <section className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative w-full md:w-80">
                          <input
                            type="text"
                            placeholder="Sift through creative crumbs & concepts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-xs font-mono p-3 pl-4 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-250 placeholder-zinc-700 focus:outline-none focus:border-teal-500/50"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 text-[10px] font-mono"
                            >
                              clear
                            </button>
                          )}
                        </div>

                        {/* Creative States selector filters matching tags */}
                        <div className="flex flex-wrap gap-1.5 justify-center w-full md:w-auto">
                          {['All', 'Exploring', 'Inspired', 'Blocked', 'Experimenting', 'Refining'].map((state) => (
                            <button
                              key={state}
                              onClick={() => setFilterState(state)}
                              className={`text-[10px] font-mono uppercase px-3 py-1.5 rounded-lg border transition-all ${
                                filterState === state
                                  ? 'border-teal-550 text-teal-400 bg-teal-500/5 font-semibold'
                                  : 'border-transparent text-zinc-500 bg-transparent hover:text-zinc-300'
                              }`}
                            >
                              {state}
                            </button>
                          ))}
                        </div>
                      </section>

                      {/* IMAGE-CENTRIC GRID WORK PROCESS BOARD */}
                      <section>
                        <div id="cards-grid-heading" className="flex items-center justify-between mb-4">
                          <h3 className="font-sans text-sm font-medium text-zinc-400 flex items-center gap-1.5">
                            <span>Process Moodboards & Experiments ({filteredSeeds.length})</span>
                          </h3>
                          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                            Showing incremental developmental states
                          </span>
                        </div>

                        {filteredSeeds.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredSeeds.map((seed) => (
                              <SeedCard
                                key={seed.id}
                                seed={seed}
                                onSelect={() => setSelectedSeed(seed)}
                                isSelected={selectedSeed?.id === seed.id}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-16 border border-dashed border-zinc-900 rounded-3xl bg-zinc-900/10">
                            <p className="text-xs font-mono text-zinc-550">No creative draft matches your filter criteria.</p>
                            <button
                              onClick={() => { setSearchQuery(''); setFilterState('All'); }}
                              className="text-xs font-mono text-teal-400 underline mt-2 block mx-auto hover:text-teal-300"
                            >
                              Reset filters
                            </button>
                          </div>
                        )}
                      </section>
                    </motion.div>
                  )}

                  {activeTab === 'shelter' && (
                    <motion.div
                      key="shelter-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ShedSkinForm
                        onAddConfession={handleAddConfession}
                        confessions={confessions}
                        onResonateConfession={handleResonateConfession}
                      />
                    </motion.div>
                  )}

                  {activeTab === 'sprout' && (
                    <motion.div
                      key="sprout-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-4xl mx-auto"
                    >
                      <AddSeedForm
                        onAddSeed={(newSeed) => {
                          handleAddSeed(newSeed);
                          setActiveTab('feed'); // Return to central feed so they see their draft card instantly!
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </main>

            {/* Immersive Footer */}
            <footer className="mt-16 pt-6 border-t border-zinc-900 text-[10px] font-mono text-zinc-550 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span>© 2026 ÆTHER PROCESS NETWORK</span>
                <span>•</span>
                <span className="text-teal-552">EVOLUTION & PROGRESS HISTORY STUDY</span>
              </div>
              <div className="flex gap-4 text-zinc-500">
                <span>STATUS: STABILIZED</span>
                <span>CHRONOLOGY: INTERACTIVE MOODBOARDS</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED INTERACTIVE MOODBOARD WORKSPACE DRAWER / MODAL */}
      <AnimatePresence>
        {selectedSeed && (
          <SeedModal
            seed={selectedSeed}
            onClose={() => setSelectedSeed(null)}
            onAddResidue={handleAddResidue}
            onDeleteResidue={handleDeleteResidue}
            onUpdateState={handleUpdateSeedState}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
