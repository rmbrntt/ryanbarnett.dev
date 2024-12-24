// CIELAB to RGB conversion utilities

/**
 * Convert CIELAB to XYZ
 */
function labToXYZ(lab: [number, number, number]): [number, number, number] {
  const [l, a, b] = lab;
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  return [
    x ** 3 > 0.008856 ? x ** 3 : (x - 16/116) / 7.787,
    y ** 3 > 0.008856 ? y ** 3 : (y - 16/116) / 7.787,
    z ** 3 > 0.008856 ? z ** 3 : (z - 16/116) / 7.787
  ];
}

/**
 * Convert XYZ to RGB
 */
function xyzToRGB(xyz: [number, number, number]): [number, number, number] {
  const [x, y, z] = xyz;
  
  // XYZ to RGB matrix for D65
  const r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  const g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  const b = x * 0.0557 + y * -0.2040 + z * 1.0570;

  // Gamma correction
  const gamma = (n: number) => n > 0.0031308 
    ? 1.055 * (n ** (1/2.4)) - 0.055 
    : 12.92 * n;

  return [
    gamma(r),
    gamma(g),
    gamma(b)
  ];
}

/**
 * Convert CIELAB to RGB
 */
export function convertLABtoRGB(lab: [number, number, number]): [number, number, number] {
  return xyzToRGB(labToXYZ(lab));
}

/**
 * Convert CIELAB to hex color string
 */
export function labToHex(lab: [number, number, number]): string {
  const rgb = convertLABtoRGB(lab);
  const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
}