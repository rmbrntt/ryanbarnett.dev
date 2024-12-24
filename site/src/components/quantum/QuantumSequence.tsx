import React from 'react';
import { cn } from '../../utils/cn';
import type { QuantumTheme } from '../markdoc/QuantumContainer.tsx';
import { Mermaid } from '../markdoc/Mermaid';

interface SequenceStep {
  from: string;
  to: string;
  action: string;
  description?: string;
}

interface SequenceParticipant {
  id: string;
  name: string;
  theme: QuantumTheme;
}

interface QuantumSequenceProps {
  title?: string;
  participants: SequenceParticipant[];
  steps: SequenceStep[];
  note?: string;
  className?: string;
}

export function QuantumSequence({
  title,
  participants,
  steps,
  note,
  className
}: QuantumSequenceProps) {
  // Use the first participant's theme as the primary theme
  const primaryTheme = participants[0].theme;

  // Build mermaid diagram
  const buildDiagram = () => {
    let diagram = 'sequenceDiagram\n';
    diagram += '  %% Set participants\n';
    
    // Add participants with proper spacing
    for (const p of participants) {
      diagram += `  participant ${p.id} as "${p.name}"\n`;
    }
    diagram += '\n';
    
    // Add steps with proper formatting
    for (const step of steps) {
      diagram += `  ${step.from}->>+${step.to}: ${step.action}\n`;
      if (step.description) {
        diagram += `  Note over ${step.from},${step.to}: ${step.description}\n`;
      }
      // Add deactivation for better visual flow
      diagram += `  ${step.to}-->>-${step.from}: complete\n`;
    }

    // Add final note if provided
    if (note) {
      const firstParticipant = participants[0].id;
      const lastParticipant = participants[participants.length - 1].id;
      diagram += '\n';
      diagram += `  Note over ${firstParticipant},${lastParticipant}: ${note}\n`;
    }

    return diagram;
  };

  return (
    <div className={cn('bg-black/50 rounded-lg', className)}>
      {title && (
        <h3 className="text-lg font-medium mb-4">
          {title}
        </h3>
      )}
      <Mermaid chart={buildDiagram()} theme={primaryTheme} />
    </div>
  );
}