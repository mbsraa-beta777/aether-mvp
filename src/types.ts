/**
 * types.ts
 * Type definitions for the ÆTHER anti-portfolio ecosystem.
 */

export type CreativeState = 'Exploring' | 'Inspired' | 'Blocked' | 'Experimenting' | 'Refining';

export interface CreativeResidue {
  id: string;
  type: 'text' | 'sketch' | 'quote' | 'mistake';
  content: string;
  meta?: string;
  imageUrl?: string;
}

export interface TimelineEvent {
  id: string;
  stageName: string; // e.g. "Genesis Sketch", "First Prototype", "Major Roadblock", "Fallen Leaf Refinement"
  description: string;
  date: string;
  imageUrl?: string;
}

export interface PortfolioSeed {
  id: string;
  title: string;
  creator: string;
  creatorRole: string;
  concept: string;
  state: CreativeState;
  vulnerabilityContext: string;
  tags: string[];
  createdAt: string;
  lastTouched: string;
  coverImage: string; // Main representational process image/sketch
  residue: CreativeResidue[];
  timeline: TimelineEvent[];
  connections: string[]; // Connected PortfolioSeed IDs
  coordinates: { x: number; y: number }; // Coordinates on the interactive inspiration network map
}

export interface VulnerabilityShare {
  id: string;
  text: string;
  alias: string;
  timestamp: string;
  category: 'imposter-syndrome' | 'technical-disaster' | 'creative-block' | 'happy-accident';
  resonance: number;
}
