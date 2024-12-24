export type { QuantumTheme } from "../markdoc/QuantumContainer.ts";
export { quantumThemes } from "../markdoc/QuantumContainer.ts";
export { QuantumColorBlock } from "./QuantumColorBlock.tsx";
export { QuantumStateFlow } from "./QuantumStateFlow.tsx";
export { QuantumMathBlock } from "./QuantumMathBlock.tsx";
export { QuantumHierarchy } from "./QuantumHierarchy.tsx";
export { QuantumCallout } from "./QuantumCallout.tsx";
export { QuantumSequence } from "./QuantumSequence.tsx";
export { QuantumGallery } from "./QuantumGallery.tsx";
export { QuantumDiagram } from "./QuantumDiagram.tsx";
export { QuantumLayout } from "./QuantumLayout";

// Examples:

/*
// Classic Quantum Callout
<QuantumCallout
  variant="quantum"
  title="Quantum Design Principles"
>
  Design in the quantum space emerges from the superposition of form and function—each component exists in multiple states of purpose while maintaining coherent visual harmony.
</QuantumCallout>

// Quantum Sequence
<QuantumSequence
  title="Information Flow"
  participants={[
    { id: 'Q', name: 'Quantum State', theme: quantumThemes.cyan },
    { id: 'O', name: 'Observer', theme: quantumThemes.purple },
    { id: 'E', name: 'Environment', theme: quantumThemes.green },
    { id: 'I', name: 'Information', theme: quantumThemes.deep }
  ]}
  steps={[
    { from: 'Q', to: 'O', action: 'Superposition' },
    { from: 'O', to: 'E', action: 'Measurement' },
    { from: 'E', to: 'O', action: 'Decoherence' },
    { from: 'O', to: 'I', action: 'State Collapse' },
    { from: 'I', to: 'Q', action: 'Feedback Loop' }
  ]}
  note="Quantum Information Cycle"
/>
*/
