import { PortfolioSeed, VulnerabilityShare } from '../types';

export const INITIAL_SEEDS: PortfolioSeed[] = [
  {
    id: 'mycofont',
    title: 'Kinetic Spore: Dynamic Responsive Typography',
    creator: 'Elowen Aris',
    creatorRole: 'Type Designer & Bio-Coder',
    concept: 'A variable typeface designed to expand its geometric characters based on responsive layouts. The ink traps and display weights behave organically, breathing with viewport flow and resizing stress instead of breaking.',
    state: 'Exploring',
    vulnerabilityContext: 'I got completely overwhelmed trying to satisfy standard optical alignment rules. The lowercase letters looked bloated in responsive tests. In the end, instead of trying to fix the bloated letters, I leaned into the weight distortion—making the "mistakes" the main dynamic signature of the typeface.',
    tags: ['Typography', 'Editorial', 'CreativeCoding', 'WIP'],
    createdAt: '2026-02-10',
    lastTouched: '2026-05-12',
    coverImage: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=800&q=80',
    connections: ['gravitygrid', 'vaporware'],
    coordinates: { x: 32, y: 28 },
    timeline: [
      {
        id: 't-myco-1',
        stageName: 'Hand-Carved Ink Traps',
        description: 'First sketches on raw grid sheets focusing on extreme contrast inside the stem junctions. Attempting to preserve legibility when letters are pushed together.',
        date: 'Feb 12, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 't-myco-2',
        stageName: 'Interpolation Crisis',
        description: 'When exporting to bezier coordinates, the dynamic interpolation broke down on high-density monitors. Characters flattened into illegible dark squares.',
        date: 'Mar 18, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 't-myco-3',
        stageName: 'Decentering Performance',
        description: 'Decided to stop correcting the interpolation drift. Created custom logic that expands standard spacing dynamically, creating an organic typography mesh.',
        date: 'May 05, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1541462608141-2f58c4809c57?auto=format&fit=crop&w=800&q=80'
      }
    ],
    residue: [
      {
        id: 'r1',
        type: 'sketch',
        content: '(◌) -> stem-weight-ratio: variable [0.25 to 1.8] inside character boundaries. No optical locks.',
        meta: 'Grid Notebook, p. 14'
      },
      {
        id: 'r2',
        type: 'mistake',
        content: 'Error in glyph offset parameters. Decentered character collisions. Kept and renamed output as: "Accidental Collisions Preset".',
        meta: 'Vite Terminal Log'
      }
    ]
  },
  {
    id: 'aurastream',
    title: 'Aura: Intentional Reading Chrome Tool',
    creator: 'Siddharth Jain',
    creatorRole: 'Product & Accessibility Designer',
    concept: 'A browser workspace companion designed to slow down reading loops. It gently reduces high-contrast distractions of ads, and fades text into abstract color clouds when scrolling speeds exceed a calm, meditative tempo.',
    state: 'Experimenting',
    vulnerabilityContext: 'I tried to use a complex, futuristic layout engine to predict calm visual speeds, and standard Chrome security immediately flagged it as adware. For my presentation, my computer completely crashed. I sat there in silence. Now I am building a humble, purely manual delay system instead.',
    tags: ['SlowTech', 'Interaction', 'Minimalism', 'ChromeExtension'],
    createdAt: '2026-01-05',
    lastTouched: '2026-06-02',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    connections: ['gravitygrid'],
    coordinates: { x: 68, y: 35 },
    timeline: [
      {
        id: 't-aura-1',
        stageName: 'Sensory Overload Audit',
        description: 'Mapped out standard blog structures and identified elements that induce visual fatigue: flashing overlays, endless recommendation badges, and blue light triggers.',
        date: 'Jan 10, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 't-aura-2',
        stageName: 'Text Dissolve Experiments',
        description: 'Testing the aesthetic experience of having characters slowly dissolve into beautiful CSS lens blur nodes. Discovered that the transition felt incredibly soothing.',
        date: 'Apr 11, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'
      }
    ],
    residue: [
      {
        id: 'r3',
        type: 'quote',
        content: '"Information wants to be fast, but human wisdom needs friction. We do not learn by skimming a thousand glossy panels."',
        meta: 'Are.na Reference Channel'
      },
      {
        id: 'r4',
        type: 'mistake',
        content: 'Uncaught TypeError on scrolledSpeed calculation. Page blurred permanently during live prototype testing. Redesigned filter to use CSS transition values instead of continuous JS loops.',
        meta: 'Console Log'
      }
    ]
  },
  {
    id: 'feltslate',
    title: 'Felt & Slate: Acoustic Desktop Architecture',
    creator: 'Akihiro Takahashi',
    creatorRole: 'Industrial & Interaction Designer',
    concept: 'A series of tactile tangible desk interfaces made of natural wool felt and textured slate that connect to dynamic displays, bringing warm material texture back into isolated flat screens.',
    state: 'Inspired',
    vulnerabilityContext: 'I ordered the wrong slate sizes three times. The custom silicone cases split open when stretching them over the stone modules. I felt like I was wasting critical materials. But seeing the raw, split-open silicone beside the rough-hewn slate was actually beautiful. I chose to leave the raw gaps visible in the final model, showcasing natural decay.',
    tags: ['IndustrialDesign', 'Tactility', 'RawMaterials', 'Objects'],
    createdAt: '2025-12-15',
    lastTouched: '2026-05-18',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    connections: ['vaporware'],
    coordinates: { x: 22, y: 72 },
    timeline: [
      {
        id: 't-felt-1',
        stageName: 'Material Collage',
        description: 'Gathering local materials to test thermal and tactile feedback when moving hands between cold slate and soft, heat-trapping pressed wool.',
        date: 'Dec 20, 2025',
        imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 't-felt-2',
        stageName: 'Silicone Split Crisis',
        description: 'First pour-mold trials failed to cure properly, resulting in a sticky, gray residue. The outer silicone sleeve was too thin and tore during stretching.',
        date: 'Mar 03, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1565192647048-f997ded87958?auto=format&fit=crop&w=800&q=80'
      }
    ],
    residue: [
      {
        id: 'r5',
        type: 'sketch',
        content: 'Felt layers stacked vertically, forming a terrace. Embedded copper threads conducting current on physical compression.',
        meta: 'A5 Grid Book draft'
      }
    ]
  },
  {
    id: 'gravitygrid',
    title: 'Gravity Grid: Dynamic Decolonial Web Layouts',
    creator: 'Clara Mendoza',
    creatorRole: 'Design Scholar & Frontend Cultivator',
    concept: 'A CSS template and layout philosophy that rebels against corporate snap-to-grids. Text blocks, imagery, and links behave like fallen leaves, scattering with natural gravity vectors and digital wind to foster organic collision and serendipitous discovery.',
    state: 'Refining',
    vulnerabilityContext: 'Clients criticized this as "broken CSS loading states." But when I let go of standard alignment anxieties, the site felt incredibly comforting. Elements overlap, conversational threads touch, and reading order is organic and human.',
    tags: ['Layouts', 'AntiGrid', 'WebDesign', 'FluidWeb'],
    createdAt: '2026-03-22',
    lastTouched: '2026-06-12',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    connections: ['aurastream', 'mycofont'],
    coordinates: { x: 50, y: 64 },
    timeline: [
      {
        id: 't-grav-1',
        stageName: 'Discarding the CSS Grid',
        description: 'Experimenting with overlapping element nodes by stripping standard absolute positions. Creating floating block collisions.',
        date: 'Mar 28, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 't-grav-2',
        stageName: 'Legibility Thresholds',
        description: 'Designing boundaries so columns overlap beautiful images, creating rich contrast layers without losing critical reading access.',
        date: 'May 14, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
      }
    ],
    residue: [
      {
        id: 'r6',
        type: 'quote',
        content: '"Corporate layouts organize web structures like storage units. Let’s build spaces that feel like overgrown, welcoming gardens instead."',
        meta: 'Notebook entry'
      }
    ]
  },
  {
    id: 'vaporware',
    title: 'Vaporware: Iridescent 3D Texture Studies',
    creator: 'Chloe Young',
    creatorRole: '3D Designer & Visualist',
    concept: 'An open-source repository of experimental glass, ceramic, and liquid metals render coordinates. Designed to reflect lighting behaviors under organic movement patterns, providing materials for digital moodboards.',
    state: 'Blocked',
    vulnerabilityContext: 'I tried to optimize complex refraction code for mobile Safari and spent my entire weekend fighting frozen tabs and GPU thermal throttling. The lighting looked like terrible flat neon blobs. I felt completely defeated by hardware limitations. I have shelved the web engine and am documenting only the raw unoptimized asset files here.',
    tags: ['3DRenders', 'Textures', 'VisualReferences', 'Are_na'],
    createdAt: '2026-04-01',
    lastTouched: '2026-06-15',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    connections: ['mycofont', 'feltslate'],
    coordinates: { x: 45, y: 40 },
    timeline: [
      {
        id: 't-vap-1',
        stageName: 'Glass Refraction Vector Sketches',
        description: 'Handdrawing paths of light as they pass through organic fluid drop shapes. Setting up manual refraction arrays.',
        date: 'Apr 03, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1634973357973-f2ed255753e1?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 't-vap-2',
        stageName: 'Safari Mobile Crash Loop',
        description: 'Compiling real-time GLSL fragment shaders threw out-of-memory crashes on mobile browsers. Devices heated up instantly.',
        date: 'May 20, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80'
      }
    ],
    residue: [
      {
        id: 'r7',
        type: 'mistake',
        content: 'GPU instruction count exceeded in main vertex loop. Shader output collapsed into solid neon pink blobs.',
        meta: 'Terminal debug report'
      }
    ]
  }
];

export const INITIAL_CONFESSIONS: VulnerabilityShare[] = [
  {
    id: 'c1',
    text: 'I spent four days fine-tuning a button hover microinteraction, only for the product lead to tell me "it feels sluggish." I replaced it with a standard browser outline. It got approved, but I felt so generic.',
    alias: 'SheddingType',
    timestamp: '2 hours ago',
    category: 'creative-block',
    resonance: 18
  },
  {
    id: 'c2',
    text: 'I deleted my entire curated Behance and Dribbble portfolio last night. It felt too polished, too artificial. It didn’t look like my messy, chaotic sketchbook or my real day-to-day experiments at all.',
    alias: 'Are_na_Gardener',
    timestamp: '6 hours ago',
    category: 'imposter-syndrome',
    resonance: 42
  },
  {
    id: 'c3',
    text: 'I told a client a layout was "impossible to implement with CSS grid limitations" because I in reality couldn’t find the energy or confidence to debug a nested flex alignment bug for the fifth time.',
    alias: 'GhostInTheCSS',
    timestamp: '1 day ago',
    category: 'technical-disaster',
    resonance: 25
  },
  {
    id: 'c4',
    text: 'I spent an entire weekend designing a website layout on my 27-inch display, only to realize it becomes completely unreadable and broken on every laptop, tablet, and mobile interface.',
    alias: 'ResponsiveStruggle',
    timestamp: '2 days ago',
    category: 'happy-accident',
    resonance: 14
  }
];
