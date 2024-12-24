# ryanbarnett.dev

A multi-layered digital garden exploring technology, human potential, and systems thinking. This project combines minimalist design with deep systematic thinking, creating a space for knowledge sharing and personal growth.

![Preview](/docs/assets/output.gif)

## 🌌 Core Architecture

This site is built as a multi-dimensional system with progressive depth:

```javascript
const SystemArchitecture = {
  dimensions: ["Technical", "Human", "Value", "Time"],
  layers: ["Quick", "Core", "Context", "Deep", "Meta"],
  perspectives: ["Leader", "Builder", "Human", "Systems"],
  states: ["Learning", "Building", "Growing", "Connecting"],
};
```

### Information Architecture

```javascript
const informationSystem = {
  structural_layers: {
    surface: {
      // Immediate visibility layer
      primary: {
        identity: "Ryan Barnett",
        role: ["Engineering Leader", "Problem Solver", "Lifelong Learner"],
        mission: "Technology × Human Potential",
      },
      navigation: {
        core: ["About", "Thoughts", "Projects"],
        contextual: ["System", "Experience"],
      },
    },
    intellectual: {
      // Thought layer
      writing: {
        essays: "Deep explorations of key themes",
        notes: "Evolving thoughts and observations",
        systems: "Frameworks and mental models",
      },
      projects: {
        current: "Active explorations and builds",
        archived: "Historical work and learnings",
        future: "Planned investigations",
      },
    },
    system: {
      // Personal OS integration
      operating_model: "Full systems documentation",
      principles: "Core thinking and approaches",
      patterns: "Recurring solutions and insights",
    },
  },

  knowledge_graph: {
    nodes: {
      concepts: "Core ideas and principles",
      projects: "Concrete implementations",
      thoughts: "Evolving perspectives",
      connections: "Relationship mappings",
    },
    relationships: {
      explicit: "Direct connections",
      implicit: "Emergent patterns",
      temporal: "Time-based evolution",
    },
  },
};
```

### Layer Structure

1. **Surface Layer** (`/`)

   - Clean, minimalist entry point
   - Interactive particle system visualization
   - Primary navigation: About, Thoughts, Projects

2. **Knowledge Layer** (`/thoughts`)

   - Essays and deep explorations
   - Living documentation
   - Interconnected ideas

3. **System Layer** (`/system`)

   - Personal operating system documentation
   - Mental models and frameworks
   - System visualization and interaction

4. **Laboratory** (`/lab`)
   - Experimental features
   - Interactive demonstrations
   - Technical explorations

## 🧠 Technical Stack

- **Core Framework**: Astro 4.0
- **Interactive Elements**:
  - React + React Three Fiber
  - Three.js for 3D visualizations
  - Framer Motion for animations
- **Content**:
  - MDX for rich content
  - KaTeX for mathematical notation
  - Mermaid for diagrams
- **Styling**:
  - Tailwind CSS with Flexoki theme
  - Systematic typography and spacing
- **Performance**:
  - Static generation with dynamic islands
  - Optimized assets and loading
  - Perfect Core Web Vitals scores

## 📚 Content Strategy

```javascript
const contentSystem = {
  principles: {
    authenticity: "True to personal voice and thinking",
    depth: "Meaningful exploration of topics",
    evolution: "Living documents that grow",
    connection: "Clear relationship between ideas",
  },

  types: {
    essays: {
      purpose: "Deep exploration of topics",
      format: "Long-form markdown with rich elements",
      frequency: "When ideas are ready",
    },
    notes: {
      purpose: "Capture evolving thoughts",
      format: "Shorter, more immediate",
      frequency: "As insights emerge",
    },
    projects: {
      purpose: "Document work and learning",
      format: "Structured case studies",
      frequency: "With meaningful progress",
    },
  },

  metadata: {
    taxonomy: {
      topics: "Core theme categorization",
      stages: "Maturity of thinking",
      connections: "Related content",
    },
    syndication: {
      canonical: "Website as source",
      crosspost: "Selected platforms",
      attribution: "Clear sourcing",
    },
  },
};
```

## 🎨 Visual System

```javascript
const designSystem = {
  typography: {
    hierarchy: {
      primary: {
        font: "Standard | Miller Text",
        weights: ["Regular (400)", "Medium (500)"],
        sizes: {
          h1: "2.5rem", // 40px
          h2: "2rem", // 32px
          h3: "1.5rem", // 24px
          body: "1.125rem", // 18px
          small: "0.875rem", // 14px
        },
        lineHeight: {
          headings: "1.2",
          body: "1.6",
        },
      },
      secondary: {
        font: "JetBrains Mono",
        weights: ["Regular (400)"],
        sizes: {
          code: "0.875rem", // 14px
          system: "0.75rem", // 12px
        },
      },
    },
    spacing: {
      vertical: {
        base: "1.5rem",
        section: "4rem",
        component: "2rem",
      },
      horizontal: {
        container: "max-width: 65ch",
        margin: "clamp(1rem, 5vw, 3rem)",
      },
    },
  },

  colors: {
    // Quantum-Flexoki Synthesis
    base: {
      // Core Flexoki - https://stephango.com/flexoki
      black: { hex: "#100F0F", lab: [10, 0, 0] },
      950: "#1C1B1A",
      900: "#282726",
      850: "#343331",
      800: "#403E3C",
      700: "#575653",
      600: "#6F6E69",
      500: "#878580",
      300: "#B7B5AC",
      200: "#CECDC3",
      150: "#DAD8CE",
      100: "#E6E4D9",
      50: "#F2F0E5",
      paper: { hex: "#FFFCF0", lab: [98, -2, 4] },
    },
    quantum: {
      // Quantum Layer Colors in CIELAB
      primary: { hex: "#00FFFF", lab: [85, -20, -32] }, // Quantum Cyan
      secondary: { hex: "#8B1FFF", lab: [65, 28, -58] }, // Astral Purple
      matrix: { hex: "#59a066", lab: [60, -40, 20] }, // Matrix Green
      neural: { hex: "#d14554", lab: [50, 50, 20] }, // Neural Red
      void: { hex: "#10cdb8e", lab: [90, 0, 40] }, // Void Yellow
      deep: { hex: "#88409a", lab: [40, 40, -40] }, // Deep Mind
    },
    semantic: {
      // Extended Flexoki Semantic Colors
      red: {
        DEFAULT: "#AF3029",
        light: "#D14D41",
      },
      orange: {
        DEFAULT: "#BC5215",
        light: "#DA702C",
      },
      yellow: {
        DEFAULT: "#AD8301",
        light: "#D0A215",
      },
      green: {
        DEFAULT: "#66800B",
        light: "#879A39",
      },
      cyan: {
        DEFAULT: "#24837B",
        light: "#3AA99F",
      },
      blue: {
        DEFAULT: "#205EA6",
        light: "#4385BE",
      },
      purple: {
        DEFAULT: "#5E409D",
        light: "#8B7EC8",
      },
      magenta: {
        DEFAULT: "#A02F6F",
        light: "#CE5D97",
      },
    },
    usage: {
      background: {
        primary: "var(--color-base-paper)",
        secondary: "var(--color-base-50)",
        tertiary: "var(--color-base-100)",
        quantum: "var(--color-quantum-primary)/10",
      },
      text: {
        primary: "var(--color-base-black)",
        secondary: "var(--color-base-600)",
        tertiary: "var(--color-base-500)",
        inverse: "var(--color-base-paper)",
        glow: "var(--color-quantum-primary)",
      },
      border: {
        subtle: "var(--color-base-100)",
        medium: "var(--color-base-200)",
        strong: "var(--color-base-300)",
        quantum: "var(--color-quantum-primary)",
      },
      accent: {
        primary: "var(--color-quantum-primary)",
        secondary: "var(--color-quantum-secondary)",
        matrix: "var(--color-quantum-matrix)",
        neural: "var(--color-quantum-neural)",
        void: "var(--color-quantum-void)",
        deep: "var(--color-quantum-deep)",
      },
      effects: {
        "quantum-glow": "0 0 10px var(--color-quantum-primary)/40",
        "quantum-gradient":
          "linear-gradient(to right, var(--color-quantum-primary)/10, var(--color-quantum-secondary)/10)",
        "quantum-radial":
          "radial-gradient(circle at center, var(--color-quantum-primary)/20 0%, transparent 70%)",
      },
    },
  },

  spacing: {
    grid: {
      gap: "1.5rem",
      columns: "repeat(12, minmax(0, 1fr))",
    },
    layout: {
      page: "clamp(1rem, 5vw, 3rem)",
      section: "4rem",
      component: "1.5rem",
    },
  },

  animation: {
    timing: {
      fast: "150ms",
      base: "300ms",
      slow: "500ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    usage: {
      hover: {
        scale: "transform: scale(1.02)",
        transition: "all var(--timing-base) var(--easing-default)",
      },
      fade: {
        enter: "opacity: 1",
        exit: "opacity: 0",
        transition: "opacity var(--timing-base) var(--easing-out)",
      },
      slide: {
        enter: "transform: translateY(0)",
        exit: "transform: translateY(10px)",
        transition: "transform var(--timing-base) var(--easing-out)",
      },
    },
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },

  radii: {
    sm: "0.25rem",
    base: "0.375rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },
};
```

## 🔄 Interaction Models

```javascript
const interactionSystem = {
  principles: {
    clarity: "Clear affordances",
    purpose: "Meaningful interactions",
    feedback: "Subtle but present",
    performance: "Always smooth",
  },

  patterns: {
    navigation: {
      primary: "Clear, consistent access",
      contextual: "Related content",
      system: "Deep linking capability",
    },
    revelation: {
      content: "Progressive disclosure",
      system: "Depth on demand",
      context: "Related information",
    },
    feedback: {
      hover: "Subtle indication",
      active: "Clear response",
      loading: "Minimal but present",
    },
  },

  states: {
    page: {
      entry: "Smooth fade in",
      exit: "Graceful transition",
      error: "Helpful recovery",
    },
    system: {
      idle: "Subtle movement",
      active: "Responsive interaction",
      loading: "Maintained context",
    },
  },
};
```

## ✨ Project Structure

```plaintext
ryanbarnett.dev/
├── site/                   # Main website implementation
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── content/      # MDX content and articles
│   │   │   ├── thoughts/ # Essays and explorations
│   │   │   ├── system/  # Personal OS documentation
│   │   │   └── lab/     # Experimental projects
│   │   ├── layouts/      # Page layouts and templates
│   │   ├── pages/        # Route definitions
│   │   ├── styles/       # Global styles and theme
│   │   └── utils/        # Shared utilities
│   └── public/           # Static assets
├── docs/                  # Documentation and examples
│   ├── portfolio-examples/  # Implementation examples
│   └── target-architecture.md  # System blueprint
├── components/            # Shared component library
└── deploy/               # Deployment configurations
```

## 🚀 Getting Started

1. **Development Setup**

   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/ryanbarnett.dev.git
   cd ryanbarnett.dev

   # Install dependencies
   cd site
   npm install

   # Start development server
   npm run dev
   ```

2. **Building for Production**

   ```bash
   npm run build
   ```

3. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🔄 Growth Patterns

```javascript
const growthSystem = {
  content: {
    evolution: {
      essays: "Living documents",
      projects: "Progress documentation",
      system: "Expanding understanding",
    },
    versioning: {
      tracking: "Git-based history",
      changelog: "Notable updates",
      roadmap: "Planned additions",
    },
  },

  technical: {
    scalability: {
      content: "MDX compilation",
      performance: "Automatic optimization",
      systems: "Modular architecture",
    },
    maintenance: {
      automation: "CI/CD pipelines",
      monitoring: "Performance tracking",
      updates: "Dependency management",
    },
  },

  experience: {
    adaptation: {
      feedback: "Usage patterns",
      performance: "Metrics tracking",
      improvement: "Iterative enhancement",
    },
    expansion: {
      features: "Thoughtful additions",
      integrations: "Relevant connections",
      reach: "Controlled growth",
    },
  },
};
```

## 🤝 Contributing

This is a personal project but open to inspiration and learning. Feel free to:

1. Open issues for discussions
2. Submit pull requests for improvements
3. Fork for your own explorations

## 📖 Documentation

- [Target Architecture](/docs/target-architecture.md)
- [Portfolio Examples](/docs/portfolio-examples)
- [System Documentation](/site/src/content/system)

## 📄 License

MIT License - See LICENSE file for details

---

Built with 🌌 🧠 ✨ by Ryan Barnett
