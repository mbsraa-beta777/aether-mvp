import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const initAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master output gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low pass filter with soft warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime); // warm & muddy
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Create a lush, ambient chords sweep (C minor add9 / G pedal)
      const frequencies = [32.7, 49.0, 65.4, 77.8, 116.5, 146.83];
      const oscillators: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Detune slightly for lush chorus effect
        const detuning = (idx - 2.5) * 4.5; // detune sweep
        osc.detune.setValueAtTime(detuning, ctx.currentTime);

        const oscGain = ctx.createGain();
        const volumeFactor = idx === 0 ? 0.25 : idx === 1 ? 0.2 : 0.08;
        oscGain.gain.setValueAtTime(volumeFactor, ctx.currentTime);
        
        const loopVolume = () => {
          if (!ctx || ctx.state === 'closed') return;
          const now = ctx.currentTime;
          const drift = Math.random() * 8 + 8; // gentle variation every 8-16s
          const targetG = (Math.random() * 0.09 + 0.01) * volumeFactor;
          oscGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, targetG), now + drift);
          setTimeout(loopVolume, drift * 1000);
        };
        
        osc.connect(oscGain);
        oscGain.connect(filter);
        oscillators.push(osc);
        
        osc.start(0);
        setTimeout(loopVolume, Math.random() * 2000);
      });

      oscillatorsRef.current = oscillators;

      // Create very slow LFO to modulate filter cutoff (simulating deep gentle breathing)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.04, ctx.currentTime); // one cycle every 25 seconds

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(120, ctx.currentTime); // sweep depth

      lfo.connect(lfoGain);
      if (filter.frequency) {
        lfoGain.connect(filter.frequency);
      }
      lfo.start(0);
      lfoRef.current = lfo;

    } catch (err) {
      console.warn('Web Audio compilation failed:', err);
    }
  };

  const toggleSound = async () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    if (!ctx || !gainNodeRef.current) return;

    if (isPlaying) {
      const now = ctx.currentTime;
      gainNodeRef.current.gain.linearRampToValueAtTime(0, now + 1.8);
      setTimeout(() => {
        if (ctx.state === 'running' && !isPlaying) {
          ctx.suspend();
        }
      }, 2000);
      setIsPlaying(false);
    } else {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      const now = ctx.currentTime;
      gainNodeRef.current.gain.linearRampToValueAtTime(0.35, now + 3.0);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div id="ambient-sound-control" className="flex items-center gap-3">
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 border ${
          isPlaying
            ? 'bg-zinc-850 border-teal-500 text-teal-400 font-semibold'
            : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
        }`}
        title="Activate contemplative process environment sound"
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-3.5 w-3.5 animate-pulse text-teal-400" />
            <span>Soundscape Playing</span>
          </>
        ) : (
          <>
            <VolumeX className="h-3.5 w-3.5" />
            <span>Muted Soundscape</span>
          </>
        )}
      </button>

      {isPlaying && (
        <span className="text-[10px] font-mono text-teal-500 animate-pulse flex items-center gap-1 max-sm:hidden">
          <Sparkles className="h-2.5 w-2.5 animate-spin" />
          Gentle Chords Sweeping
        </span>
      )}
    </div>
  );
}
