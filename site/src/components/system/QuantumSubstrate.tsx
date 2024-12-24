import React from 'react';
import type { CSSProperties } from 'react';
import * as THREE from 'three';

interface QuantumSubstrateProps {
  mode?: 'subtle' | 'reveal';
  coherence?: number;
  fadeOut?: boolean;
  rotation?: { x: number; y: number; z: number };
  interactive?: boolean;
  amplitude?: number;
  frequency?: number;
  colorMix?: number;
  isPaused?: boolean;
}

const QuantumSubstrate3D: React.FC<QuantumSubstrateProps> = ({
  mode = 'subtle',
  coherence = 0,
  fadeOut = false,
  rotation = { x: -Math.PI * 0.15, y: 0, z: 0 },
  interactive = false,
  amplitude = 0.5,
  frequency = 1.0,
  colorMix = 0.5,
  isPaused = false,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const substrateRef = React.useRef<THREE.Mesh>();
  const rendererRef = React.useRef<THREE.WebGLRenderer>();
  const rafId = React.useRef<number>();

  const isMobile = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 60 : 75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    });
    rendererRef.current = renderer;

    // Set up shader material
    const segments = isMobile ? 75 : 150;
    const geometry = new THREE.PlaneGeometry(20, 20, segments, segments);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mode: { value: mode === 'reveal' ? 1.0 : 0.3 },
        coherence: { value: coherence },
        amplitude: { value: amplitude },
        frequency: { value: frequency },
        colorMix: { value: colorMix },
        colorA: { value: new THREE.Color('#00FFFF') },
        colorB: { value: new THREE.Color('#8B1FFF') },
      },
      vertexShader: `
        uniform float time;
        uniform float mode;
        uniform float amplitude;
        uniform float frequency;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          float elevation = sin(pos.x * 2.0 * frequency + time) *
                          cos(pos.y * 2.0 * frequency + time) * 0.5 * amplitude;
          elevation += sin(pos.x * 4.0 * frequency - time * 0.5) *
                      cos(pos.y * 4.0 * frequency) * 0.25 * amplitude;
          
          float crystal = sin(pos.x * 6.0 * frequency + pos.y * 6.0 * frequency + time) * 0.15 * amplitude;
          elevation += crystal;
          
          pos.z += elevation * mode;
          vElevation = elevation;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float mode;
        uniform float colorMix;
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying float vElevation;
        varying vec2 vUv;
        
        void main() {
          float mixStrength = (vElevation + 1.0) * 0.5 * colorMix;
          vec3 color = mix(colorA, colorB, mixStrength);
          float alpha = mode * (0.2 + abs(vElevation) * 0.5);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const substrate = new THREE.Mesh(geometry, material);
    substrateRef.current = substrate;
    scene.add(substrate);

    camera.position.z = isMobile ? 4 : 5;
    substrate.rotation.set(rotation.x, rotation.y, rotation.z);

    // Interactive controls
    if (interactive) {
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      const handleStart = (e: MouseEvent | TouchEvent) => {
        isDragging = true;
        if ('touches' in e) {
          previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          };
        } else {
          previousMousePosition = {
            x: e.clientX,
            y: e.clientY
          };
        }
      };

      const handleMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;

        const currentPosition = 'touches' in e ? {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        } : {
          x: e.clientX,
          y: e.clientY
        };

        const deltaMove = {
          x: currentPosition.x - previousMousePosition.x,
          y: currentPosition.y - previousMousePosition.y,
        };

        substrate.rotation.y += deltaMove.x * 0.005;
        substrate.rotation.x += deltaMove.y * 0.005;

        previousMousePosition = currentPosition;
      };

      const handleEnd = () => {
        isDragging = false;
      };

      // Add event listeners
      const canvas = renderer.domElement;
      canvas.addEventListener('mousedown', handleStart);
      canvas.addEventListener('touchstart', handleStart);
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
    }

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Animation loop
    let lastTime = 0;
    const maxFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / maxFPS;

    const animate = (currentTime: number) => {
      rafId.current = requestAnimationFrame(animate);

      if (currentTime - lastTime > frameInterval) {
        if (!isPaused) {
          const delta = isMobile ? 0.008 : 0.01;
          (material.uniforms.time.value as number) += delta;
        }
        renderer.render(scene, camera);
        lastTime = currentTime;
      }
    };

    // Initial setup
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    animate(0);

    // Cleanup
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('resize', handleResize);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [mode, coherence, rotation.x, rotation.y, rotation.z, interactive, isMobile, amplitude, frequency, colorMix, isPaused]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
        mixBlendMode: 'screen',
        cursor: interactive ? 'grab' : 'default',
      }}
    />
  );
};

export default QuantumSubstrate3D;