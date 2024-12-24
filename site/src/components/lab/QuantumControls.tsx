import React from 'react';
import type { ChangeEvent } from 'react';
import QuantumSubstrate3D from '../system/QuantumSubstrate';

interface QuantumControlsProps {
  className?: string;
}

export function QuantumControls({ className = '' }: QuantumControlsProps) {
  console.log('QuantumControls rendering');

  const [mounted, setMounted] = React.useState(false);
  const [amplitude, setAmplitude] = React.useState(0.5);
  const [frequency, setFrequency] = React.useState(1.0);
  const [colorMix, setColorMix] = React.useState(0.5);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    console.log('QuantumControls mounted');
    setMounted(true);
    return () => {
      console.log('QuantumControls unmounting');
      setMounted(false);
    };
  }, []);

  const handleReset = () => {
    setAmplitude(0.5);
    setFrequency(1.0);
    setColorMix(0.5);
  };

  const handleInputChange = (setter: (value: number) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(Number.parseFloat(e.target.value));
  };

  if (!mounted) {
    console.log('QuantumControls not mounted yet');
    return null;
  }

  return (
    <div className={className}>
      <div className="relative bg-red-500/20">
        <div className="w-full h-[600px] rounded-lg overflow-hidden bg-blue-500/20">
          <QuantumSubstrate3D
            key="quantum-substrate"
            mode="reveal"
            interactive={true}
            coherence={0.5}
            amplitude={amplitude}
            frequency={frequency}
            colorMix={colorMix}
            isPaused={isPaused}
          />
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 p-6 bg-background/90 backdrop-blur-sm rounded-lg">
          <div className="grid gap-6">
            <div>
              <label htmlFor="amplitude" className="text-sm font-mono flex items-center gap-2">
                <span className="text-[#00FFFF]">⚡</span> Wave Amplitude
              </label>
              <input 
                id="amplitude"
                type="range" 
                min={0} 
                max={1} 
                step={0.01} 
                value={amplitude} 
                onChange={handleInputChange(setAmplitude)}
                className="quantum-slider w-full mt-3" 
              />
            </div>
            
            <div>
              <label htmlFor="frequency" className="text-sm font-mono flex items-center gap-2">
                <span className="text-[#00FFFF]">∿</span> Wave Frequency
              </label>
              <input 
                id="frequency"
                type="range" 
                min={0.1} 
                max={3} 
                step={0.1} 
                value={frequency}
                onChange={handleInputChange(setFrequency)}
                className="quantum-slider w-full mt-3" 
              />
            </div>
            
            <div>
              <label htmlFor="colorMix" className="text-sm font-mono flex items-center gap-2">
                <span className="text-[#00FFFF]">◐</span> Color Mix
              </label>
              <input 
                id="colorMix"
                type="range" 
                min={0} 
                max={1} 
                step={0.01} 
                value={colorMix}
                onChange={handleInputChange(setColorMix)}
                className="quantum-slider w-full mt-3" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setIsPaused(!isPaused)} 
                className="quantum-button"
              >
                <span className="text-[#00FFFF] mr-2">{isPaused ? '▶' : '⏸'}</span>
                {isPaused ? 'Play' : 'Pause'}
              </button>
              <button 
                type="button"
                onClick={handleReset} 
                className="quantum-button"
              >
                <span className="text-[#00FFFF] mr-2">⟲</span> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 