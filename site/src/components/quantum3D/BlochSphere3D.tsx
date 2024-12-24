import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders/blochSphere';
import type { QuantumTheme } from '../quantum';
import type { BlochState } from '../quantum/QuantumDiagram';

interface ColorMapping {
  l: number;  // Lightness
  a: number;  // Green-Red
  b: number;  // Blue-Yellow
  mode?: 'linear' | 'radial' | 'angular';
}

interface BlochSphere3DProps {
  state: BlochState;
  theme: QuantumTheme;
  withAnimation?: boolean;
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
  detail?: number;
  colorMapping?: ColorMapping;
  pulseFrequency?: number;
  pulseAmplitude?: number;
  rotationAxis?: [number, number, number];
  rotationSpeed?: number;
  interference?: {
    frequency: number;
    amplitude: number;
    speed: number;
  };
}

export function BlochSphere3D({ 
  state, 
  theme, 
  withAnimation = true,
  visualizationMode = 'sphere',
  cutaway = { enabled: false, angle: Math.PI / 4, depth: 0.3 },
  wireframe = { enabled: false, opacity: 0.2, color: '#ffffff' },
  detail = 2,
  colorMapping,
  pulseFrequency = 1,
  pulseAmplitude = 0.1,
  rotationAxis = [0, 1, 0],
  rotationSpeed = 0.1,
  interference = {
    frequency: 8,
    amplitude: 0.3,
    speed: 1
  }
}: BlochSphere3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Convert spherical to cartesian coordinates
  const stateVector = useMemo(() => {
    const { theta, phi } = state;
    return new THREE.Vector3(
      Math.sin(theta) * Math.cos(phi),
      Math.sin(theta) * Math.sin(phi),
      Math.cos(theta)
    );
  }, [state]);

  // Create shader uniforms
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    stateVector: { value: stateVector },
    color: { value: new THREE.Color(theme.colors.primary) },
    colorMapping: colorMapping ? {
      value: new THREE.Vector3(colorMapping.l, colorMapping.a, colorMapping.b)
    } : { value: new THREE.Vector3(0, 0, 0) },
    colorMode: { value: colorMapping?.mode === 'radial' ? 1 : colorMapping?.mode === 'angular' ? 2 : 0 },
    interferenceParams: { value: new THREE.Vector3(
      interference.frequency,
      interference.amplitude,
      interference.speed
    )},
    cutawayParams: { 
      value: new THREE.Vector3(
        cutaway.enabled ? 1.0 : 0.0,
        cutaway.angle || Math.PI / 4,
        cutaway.depth || 0.3
      )
    },
    visualizationMode: { 
      value: ['sphere', 'wireframe', 'icosahedron', 'dodecahedron', 'cielab']
        .indexOf(visualizationMode)
    }
  }), [
    stateVector, 
    theme, 
    colorMapping, 
    interference,
    cutaway,
    visualizationMode
  ]);

  // Axis label styling
  const labelStyle = useMemo(() => ({
    fontSize: 0.15,
    color: theme.colors.text || theme.colors.primary,
    letterSpacing: 0,
    lineHeight: 1,
    textAlign: 'center' as const,
    anchorX: 'center' as const,
    anchorY: 'middle' as const,
    renderOrder: 2
  }), [theme]);

  // Animation loop with smoother rotation
  useFrame((_, delta) => {
    if (withAnimation && materialRef.current) {
      materialRef.current.uniforms.time.value += delta * 0.5;
    }
    if (meshRef.current) {
      const speed = rotationSpeed * delta;
      meshRef.current.rotation.x += speed * rotationAxis[0];
      meshRef.current.rotation.y += speed * rotationAxis[1];
      meshRef.current.rotation.z += speed * rotationAxis[2];
    }
    if (lightRef.current) {
      const time = Date.now() * 0.0005;
      lightRef.current.position.x = Math.sin(time) * 3;
      lightRef.current.position.z = Math.cos(time) * 3;
      lightRef.current.intensity = 1.0 + Math.sin(time * 2) * 0.2;
    }
  });

  // Geometry with wireframe option
  const GeometryComponent = useMemo(() => {
    switch (visualizationMode) {
      case 'sphere':
      case 'cielab':
        return <sphereGeometry args={[1, 64, 64]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, detail]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, detail]} />;
      default:
        return <sphereGeometry args={[1, 64, 64]} />;
    }
  }, [visualizationMode, detail]);

  return (
    <group>
      <PerspectiveCamera 
        makeDefault 
        position={[2, 2, 3]}
        fov={35}
        near={0.1}
        far={1000}
      />

      {/* Enhanced lighting */}
      <ambientLight intensity={0.1} />
      <pointLight 
        ref={lightRef} 
        position={[3, 2, 4]}
        intensity={1.5}
        color={theme.colors.primary}
        distance={8}
        decay={2}
      />
      <pointLight 
        position={[-2, -1, -2]}
        intensity={0.3}
        color={theme.colors.accent || theme.colors.secondary}
        distance={6}
        decay={2}
      />
      <spotLight
        position={[0, 4, 2]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />

      {/* Main geometry */}
      <mesh ref={meshRef}>
        {GeometryComponent}
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Refined wireframe */}
      {wireframe.enabled && (
        <mesh>
          {GeometryComponent}
          <meshBasicMaterial
            color={wireframe.color}
            wireframe
            transparent
            opacity={wireframe.opacity ?? 0.2}
            wireframeLinewidth={0.5}
          />
        </mesh>
      )}

      {/* Coordinate axes */}
      <group>
        {['x', 'y', 'z'].map((axis) => (
          <group key={axis}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={new Float32Array([
                    ...(axis === 'x' ? [-1.5, 0, 0, 1.5, 0, 0] :
                       axis === 'y' ? [0, -1.5, 0, 0, 1.5, 0] :
                                    [0, 0, -1.5, 0, 0, 1.5])
                  ])}
                  count={2}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial 
                color={theme.colors.border} 
                transparent 
                opacity={0.3} 
              />
            </line>
            <Billboard>
              <Text
                position={[
                  axis === 'x' ? 1.7 : 0,
                  axis === 'y' ? 1.7 : 0,
                  axis === 'z' ? 1.7 : 0
                ]}
                {...labelStyle}
              >
                {axis}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>

      {/* State vector */}
      <group>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([0, 0, 0, stateVector.x, stateVector.y, stateVector.z])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={theme.colors.accent || theme.colors.primary}
            linewidth={2}
          />
        </line>

        {/* State point */}
        <mesh position={[stateVector.x, stateVector.y, stateVector.z]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial
            color={theme.colors.accent || theme.colors.primary}
            emissive={theme.colors.accent || theme.colors.primary}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </group>
  );
} 