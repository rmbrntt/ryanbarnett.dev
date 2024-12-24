import { type FC, useState, useEffect } from 'react';

const colors = {
  flexoki: {
    base: {
      black: { lab: [10, 0, 0], hex: '#100F0F' },
      paper: { lab: [98, -2, 4], hex: '#FFFCF0' }
    },
    quantum: {
      primary: { lab: [85, -20, -32], hex: '#00FFFF' },
      secondary: { lab: [65, 28, -58], hex: '#8B1FFF' }
    }
  }
};

// LAB to RGB conversion utilities
const labToRGB = (l: number, a: number, b: number): [number, number, number] => {
  // Convert LAB to XYZ
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  // Convert XYZ to RGB with D65 illuminant
  let r = x * 3.2406 - y * 1.5372 - z * 0.4986;
  let g = -x * 0.9689 + y * 1.8758 + z * 0.0415;
  let b1 = x * 0.0557 - y * 0.2040 + z * 1.0570;

  // Apply gamma correction
  const gamma = (n: number) => {
    return n > 0.0031308 
      ? 1.055 * (n ** (1/2.4)) - 0.055 
      : 12.92 * n;
  };

  r = gamma(r);
  g = gamma(g);
  b1 = gamma(b1);

  // Clamp values
  return [
    Math.max(0, Math.min(1, r)),
    Math.max(0, Math.min(1, g)), 
    Math.max(0, Math.min(1, b1))
  ];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

interface Color {
  l: number;
  a: number;
  b: number;
}

const CIELABFlexokiExplorer: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentColor, setCurrentColor] = useState<Color>({ l: 50, a: 0, b: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Convert current LAB color to RGB hex
  const currentHex = () => {
    const [r, g, b] = labToRGB(currentColor.l, currentColor.a, currentColor.b);
    return rgbToHex(r, g, b);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl bg-background/80 backdrop-blur-sm border border-muted rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium">CIELAB Color Explorer</h2>
      </div>

      <div className="grid gap-8">
        {/* Color Controls */}
        <div className="grid gap-4">
          <div>
            <label htmlFor="lightness" className="flex items-center gap-2 text-sm mb-2">
              <span className="text-[#00FFFF]">L*</span> Lightness
              <span className="text-muted-foreground text-xs">(0-100)</span>
            </label>
            <input 
              id="lightness"
              type="range" 
              min="0" 
              max="100" 
              value={currentColor.l}
              onChange={(e) => setCurrentColor(prev => ({
                ...prev,
                l: Number.parseFloat(e.target.value)
              }))}
              className="w-full h-1 rounded-full bg-muted appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00FFFF] [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="a-value" className="flex items-center gap-2 text-sm mb-2">
              <span className="text-[#00FFFF]">a*</span> Green ← → Red
              <span className="text-muted-foreground text-xs">(-128 to 127)</span>
            </label>
            <input 
              id="a-value"
              type="range" 
              min="-128" 
              max="127" 
              value={currentColor.a}
              onChange={(e) => setCurrentColor(prev => ({
                ...prev,
                a: Number.parseFloat(e.target.value)
              }))}
              className="w-full h-1 rounded-full bg-muted appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00FFFF] [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="b-value" className="flex items-center gap-2 text-sm mb-2">
              <span className="text-[#00FFFF]">b*</span> Blue ← → Yellow
              <span className="text-muted-foreground text-xs">(-128 to 127)</span>
            </label>
            <input 
              id="b-value"
              type="range" 
              min="-128" 
              max="127" 
              value={currentColor.b}
              onChange={(e) => setCurrentColor(prev => ({
                ...prev,
                b: Number.parseFloat(e.target.value)
              }))}
              className="w-full h-1 rounded-full bg-muted appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00FFFF] [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        </div>

        {/* Color Display */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-4">Selected Color</h3>
            <div 
              className="w-full h-32 rounded-lg" 
              style={{ backgroundColor: currentHex() }}
            />
            <div className="mt-2 font-mono text-sm">
              L*a*b({currentColor.l.toFixed(0)}, {currentColor.a.toFixed(0)}, {currentColor.b.toFixed(0)})
              <br />
              {currentHex()}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Quantum Theme Colors</h3>
            <div className="grid gap-2">
              {Object.entries(colors.flexoki.quantum).map(([name, color]) => (
                <div key={name} className="flex items-center gap-2 p-2 rounded bg-muted">
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="font-mono text-xs">
                    {name}: {color.hex}
                    <br />
                    L*a*b({color.lab.join(', ')})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIELABFlexokiExplorer;