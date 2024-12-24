import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { QuantumTheme } from '../markdoc/QuantumContainer';
import { BlochSphere3D } from '../quantum3D/BlochSphere3D';
import { QuantumCanvas } from '../quantum3D/QuantumCanvas';

export interface QuantumOperation {
  type: 'H' | 'CNOT' | 'Measure';
  qubit: number | number[];
  control?: number;
  target?: number;
}

export interface BlochState {
  theta: number;
  phi: number;
}

export interface QuantumDiagramProps {
  type: 'circuit' | 'bloch';
  title: string;
  description: string;
  theme: QuantumTheme;
  operations?: QuantumOperation[];
  state?: BlochState;
  withAnimation?: boolean;
  className?: string;
  visualizationMode?: 'sphere' | 'wireframe' | 'icosahedron' | 'dodecahedron' | 'cielab';
  cutaway?: {
    enabled: boolean;
    angle?: number;
    depth?: number;
  };
  wireframe?: {
    enabled: boolean;
    opacity?: number;
    color?: string;
  };
  colorMapping?: {
    l: number;
    a: number;
    b: number;
    mode: 'radial' | 'linear' | 'angular';
  };
  interference?: {
    frequency: number;
    amplitude: number;
    speed: number;
  };
}

function CircuitDiagram({ operations, theme }: { operations: QuantumOperation[], theme: QuantumTheme }) {
  const numQubits = Math.max(...operations.flatMap(op => 
    [op.qubit, op.control, op.target].filter((n): n is number => typeof n === 'number')
  )) + 1;

  return (
    <svg 
      className="w-full h-full" 
      viewBox={`0 0 ${operations.length * 60 + 40} ${numQubits * 40 + 20}`}
      role="img"
      aria-label="Quantum Circuit Diagram"
    >
      {/* Draw qubit lines */}
      {Array.from({ length: numQubits }).map((_, i) => (
        <line
          key={`qubit-line-${i}`}
          x1="20"
          y1={i * 40 + 30}
          x2={operations.length * 60 + 20}
          y2={i * 40 + 30}
          stroke={theme.colors.border}
          strokeWidth="1"
        />
      ))}

      {/* Draw operations */}
      {operations.map((op, opIndex) => {
        const x = opIndex * 60 + 40;
        const operationId = `operation-${opIndex}`;
        
        switch (op.type) {
          case 'H': {
            return (
              <g key={operationId} aria-label="Hadamard Gate">
                <rect
                  x={x - 15}
                  y={Number(op.qubit) * 40 + 15}
                  width="30"
                  height="30"
                  fill={theme.colors.background || theme.colors.bg}
                  stroke={theme.colors.accent || theme.colors.secondary}
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={Number(op.qubit) * 40 + 35}
                  textAnchor="middle"
                  fill={theme.colors.foreground || theme.colors.text}
                  fontSize="14"
                  fontFamily="var(--font-mono)"
                  aria-label="H Gate"
                >
                  H
                </text>
              </g>
            );
          }
          
          case 'CNOT': {
            if (typeof op.control === 'number' && typeof op.target === 'number') {
              const [minY, maxY] = [
                Math.min(op.control, op.target) * 40 + 30,
                Math.max(op.control, op.target) * 40 + 30
              ];
              
              return (
                <g key={operationId} aria-label="CNOT Gate">
                  <line
                    x1={x}
                    y1={minY}
                    x2={x}
                    y2={maxY}
                    stroke={theme.colors.accent || theme.colors.secondary}
                    strokeWidth="1"
                  />
                  <circle
                    cx={x}
                    cy={op.control * 40 + 30}
                    r="4"
                    fill={theme.colors.accent || theme.colors.secondary}
                  />
                  <circle
                    cx={x}
                    cy={op.target * 40 + 30}
                    r="8"
                    fill="none"
                    stroke={theme.colors.accent || theme.colors.secondary}
                    strokeWidth="1"
                  />
                  <line
                    x1={x}
                    y1={op.target * 40 + 22}
                    x2={x}
                    y2={op.target * 40 + 38}
                    stroke={theme.colors.accent || theme.colors.secondary}
                    strokeWidth="1"
                  />
                </g>
              );
            }
            return null;
          }
          
          case 'Measure': {
            const qubits = Array.isArray(op.qubit) ? op.qubit : [op.qubit];
            return (
              <g key={operationId} aria-label="Measurement Operation">
                {qubits.map((q, i) => (
                  <g key={`${operationId}-qubit-${q}`} aria-label={`Measure Qubit ${q}`}>
                    <path
                      d={`M ${x-10} ${q * 40 + 20} 
                         L ${x+10} ${q * 40 + 20} 
                         L ${x+10} ${q * 40 + 40} 
                         L ${x-10} ${q * 40 + 40} Z`}
                      fill={theme.colors.background || theme.colors.bg}
                      stroke={theme.colors.accent || theme.colors.secondary}
                      strokeWidth="1"
                    />
                    <path
                      d={`M ${x-5} ${q * 40 + 25} 
                         Q ${x} ${q * 40 + 35} 
                         ${x+5} ${q * 40 + 25}`}
                      fill="none"
                      stroke={theme.colors.accent || theme.colors.secondary}
                      strokeWidth="1"
                    />
                  </g>
                ))}
              </g>
            );
          }
        }
      })}
    </svg>
  );
}

export function QuantumDiagram({
  type,
  title,
  description,
  theme,
  operations = [],
  state = { theta: 0, phi: 0 },
  withAnimation = false,
  className,
  visualizationMode = 'sphere',
  cutaway = {
    enabled: false,
    angle: 0,
    depth: 0
  },
  wireframe = {
    enabled: false,
    opacity: 0.5,
    color: '#000'
  },
  colorMapping = {
    l: 70,
    a: 30,
    b: -50,
    mode: 'radial'
  },
  interference = {
    frequency: 8,
    amplitude: 0.3,
    speed: 1
  }
}: QuantumDiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'w-full flex flex-col',
        className
      )}
    >
      <div className="p-4 pb-2">
        <h3
          className="text-base font-medium"
          style={{ color: theme.colors.text }}
        >
          {title}
        </h3>
        <p
          className="text-xs"
          style={{ color: theme.colors.muted || theme.colors.text }}
        >
          {description}
        </p>
      </div>

      <div className="relative w-full aspect-[4/3] min-h-[300px]">
        {type === 'circuit' ? (
          <CircuitDiagram operations={operations} theme={theme} />
        ) : (
          <QuantumCanvas>
            <BlochSphere3D
              state={state}
              theme={theme}
              withAnimation={withAnimation}
              visualizationMode={visualizationMode}
              cutaway={cutaway}
              wireframe={wireframe}
              colorMapping={colorMapping}
              interference={interference}
            />
          </QuantumCanvas>
        )}
      </div>
    </motion.div>
  );
} 