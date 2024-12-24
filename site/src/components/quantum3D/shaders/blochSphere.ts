export const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform vec3 stateVector;
  uniform vec3 color;
  uniform vec3 colorMapping;
  uniform int colorMode;
  uniform float time;
  uniform vec3 interferenceParams;
  uniform vec3 cutawayParams;
  uniform int visualizationMode;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  // CIELAB to RGB conversion
  vec3 lab2rgb(vec3 lab) {
    float l = lab.x;
    float a = lab.y;
    float b = lab.z;
    
    // L* to Y
    float y = (l + 16.0) / 116.0;
    float y3 = y * y * y;
    
    // Get X and Z
    float x = (a / 500.0) + y;
    float x3 = x * x * x;
    float z = y - (b / 200.0);
    float z3 = z * z * z;
    
    // Convert to XYZ
    float xr = (x3 > 0.008856) ? x3 : (x - 16.0/116.0) / 7.787;
    float yr = (y3 > 0.008856) ? y3 : (y - 16.0/116.0) / 7.787;
    float zr = (z3 > 0.008856) ? z3 : (z - 16.0/116.0) / 7.787;
    
    // D65 white point
    vec3 xyz = vec3(
      xr * 0.95047,
      yr,
      zr * 1.08883
    );
    
    // XYZ to RGB matrix
    vec3 rgb = vec3(
      3.2404542 * xyz.x - 1.5371385 * xyz.y - 0.4985314 * xyz.z,
      -0.9692660 * xyz.x + 1.8760108 * xyz.y + 0.0415560 * xyz.z,
      0.0556434 * xyz.x - 0.2040259 * xyz.y + 1.0572252 * xyz.z
    );
    
    // Gamma correction
    rgb = pow(clamp(rgb, 0.0, 1.0), vec3(1.0/2.2));
    
    return rgb;
  }

  void main() {
    vec3 baseColor = color;
    float alpha = 1.0;

    // Apply cutaway if enabled
    if (cutawayParams.x > 0.0) {
      float angle = cutawayParams.y;
      float depth = cutawayParams.z;
      vec3 cutNormal = vec3(cos(angle), sin(angle), 0.0);
      if (dot(vPosition, cutNormal) > depth) {
        discard;
      }
    }

    if (visualizationMode == 4) { // CIELAB mode
      // Map position to LAB coordinates
      // L* (Lightness) goes from 0 (bottom) to 100 (top)
      // a* (green to red) maps to x-axis
      // b* (blue to yellow) maps to y-axis
      vec3 labColor = vec3(
        50.0 + 50.0 * vPosition.y,     // L*: 0 to 100
        127.0 * vPosition.x,            // a*: -127 to +127
        127.0 * vPosition.z             // b*: -127 to +127
      );

      // Convert LAB to RGB
      baseColor = lab2rgb(labColor);
      alpha = 0.9;
    } else {
      // Basic lighting for non-CIELAB modes
      float diffuse = max(dot(normalize(vNormal), normalize(vec3(1.0, 1.0, 1.0))), 0.0);
      baseColor *= (0.5 + 0.5 * diffuse);

      // Add glow near state vector
      float distToState = length(vPosition - stateVector);
      float glow = exp(-distToState * 4.0);
      baseColor += vec3(glow * 0.5);

      // Add edge glow
      float edge = 1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
      baseColor += vec3(pow(edge, 3.0) * 0.3);
    }

    gl_FragColor = vec4(baseColor, alpha);
  }
`;
