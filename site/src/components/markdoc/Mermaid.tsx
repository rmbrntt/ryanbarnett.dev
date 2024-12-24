import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import type { QuantumTheme } from '../markdoc/QuantumContainer';

interface MermaidProps {
  chart: string;
  title?: string;
  theme?: QuantumTheme;
}

// Initialize mermaid with base config
if (typeof window !== 'undefined') {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 30,
      actorMargin: 100,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 8,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: false,
      bottomMarginAdj: 1,
      useMaxWidth: true,
      messageAlign: 'center',
      wrap: true,
      wrapPadding: 10,
    }
  });
}

export function Mermaid({ chart, title, theme }: MermaidProps) {
  const diagramRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!diagramRef.current || !theme) return;

    // Update mermaid config with theme colors
    mermaid.initialize({
      theme: 'dark',
      themeVariables: {
        // Primary theme color for all text and lines
        primaryColor: theme.colors.primary,
        lineColor: theme.colors.primary,
        textColor: theme.colors.primary,
        
        // Actor boxes - dark background with theme border
        actorBorder: theme.colors.primary,
        actorBkg: '#1a1b1e',
        actorTextColor: theme.colors.primary,
        actorLineColor: theme.colors.primary,
        
        // Messages and arrows
        signalColor: theme.colors.primary,
        signalTextColor: theme.colors.primary,
        
        // Note boxes - same style as actors
        noteBkgColor: '#1a1b1e',
        noteTextColor: theme.colors.primary,
        noteBorderColor: theme.colors.primary,
        
        // Activation boxes (the little rectangles)
        activationBorderColor: theme.colors.primary,
        activationBkgColor: '#1a1b1e',
        
        // Sequence numbers
        sequenceNumberColor: theme.colors.primary,
        
        // General settings
        mainBkg: 'transparent',
        nodeBorder: theme.colors.primary,
        clusterBkg: 'transparent',
        labelBoxBorderColor: theme.colors.primary,
        labelBoxBkgColor: '#1a1b1e',
        labelTextColor: theme.colors.primary,
      }
    });

    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render('mermaid-diagram', chart);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = svg;
          
          // Post-process SVG to add some quantum styling
          const svgElement = diagramRef.current.querySelector('svg');
          if (svgElement) {
            // Set base font
            (svgElement as SVGElement).style.fontFamily = 'ui-sans-serif, system-ui, sans-serif';
            
            // Add subtle glow to actor boxes and notes
            const rects = svgElement.querySelectorAll('.actor rect, .note rect');
            for (const rect of rects) {
              (rect as SVGElement).style.filter = `drop-shadow(0 0 2px ${theme.colors.primary}40)`;
            }
            
            // Make activation boxes slightly transparent
            const activations = svgElement.querySelectorAll('.activation0');
            for (const activation of activations) {
              (activation as SVGElement).style.fillOpacity = '0.8';
            }
          }
        }
      } catch (error) {
        console.error('Failed to render mermaid diagram:', error);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = 'Failed to render diagram';
        }
      }
    };

    renderDiagram();
  }, [chart, theme]);

  return (
    <figure className="my-4">
      <div className="overflow-x-auto rounded-lg bg-black/50 p-6">
        <pre
          ref={diagramRef}
          className="mermaid"
          style={{ background: 'transparent' }}
        >
          {chart}
        </pre>
      </div>
      {title && (
        <figcaption className="mt-2 text-center text-sm text-gray-400">
          {title}
        </figcaption>
      )}
    </figure>
  );
}

// Usage in Markdoc:
/*
{% mermaid title="Example Flow" %}
graph TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    C --> D[Rethink]
    D --> B
    B -- No ----> E[End]
{% /mermaid %}
*/ 