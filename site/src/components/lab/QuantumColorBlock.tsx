import type { LABColor } from '../../lib/theme/tokens';

interface QuantumColorBlockProps {
  name: string;
  lab: LABColor;
  hex: string;
  usage: string;
}

export function QuantumColorBlock({ name, lab, hex, usage }: QuantumColorBlockProps) {
  return (
    <div className={`quantum-card quantum-${name.toLowerCase()}`}>
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-12 h-12 rounded-lg" 
          style={{ backgroundColor: hex }}
        />
        <div>
          <h3 className="quantum-heading text-lg">{name}</h3>
          <code className="quantum-text text-sm">{hex}</code>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="quantum-text text-sm">L: {lab.l}</span>
          <span className="quantum-text text-sm">a: {lab.a}</span>
          <span className="quantum-text text-sm">b: {lab.b}</span>
        </div>
        <p className="quantum-text text-sm">{usage}</p>
      </div>
    </div>
  );
} 