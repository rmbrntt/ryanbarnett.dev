import React from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const SubstrateMaterial = shaderMaterial(
  {
    time: 0,
    mode: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform float mode;
    varying vec2 vUv;
    
    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      float intensity = sin(p.x * 10.0 + time) * sin(p.y * 10.0 + time) * 0.5 + 0.5;
      vec3 color = mix(
        vec3(0.0, 1.0, 1.0),  // Cyan
        vec3(0.545, 0.122, 1.0),  // Purple
        intensity
      );
      float alpha = mix(0.1, 0.3, mode);
      gl_FragColor = vec4(color, alpha);
    }
  `
);

// Extend Three.js with our custom material
extend({ SubstrateMaterial });

const SubstratePlane = ({ mode, rotation }) => {
  const materialRef = React.useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time += 0.01;
      materialRef.current.mode = mode === "subtle" ? 0.0 : 1.0;
    }
  });

  return (
    <mesh rotation={[rotation.x, rotation.y, rotation.z]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <substrateMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const QuantumSubstrate = ({ mode, rotation, interactive, reveal }) => {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: reveal ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: interactive ? "auto" : "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <SubstratePlane mode={mode} rotation={rotation} />
      </Canvas>
    </motion.div>
  );
};

export default QuantumSubstrate;
