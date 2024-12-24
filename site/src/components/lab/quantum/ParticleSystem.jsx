import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleSystem = ({ count = 1000 }) => {
  const points = useRef();
  const hover = useRef({ x: 0, y: 0 });

  // Generate initial particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x += 0.001;
      points.current.rotation.y += 0.001;

      const positions = points.current.geometry.attributes.position.array;
      const colors = points.current.geometry.attributes.color.array;
      let needsUpdate = false;

      for (let i = 0; i < positions.length; i += 3) {
        const dx = hover.current.x * 5 - positions[i];
        const dy = hover.current.y * 5 - positions[i + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2) {
          positions[i] += dx * 0.02;
          positions[i + 1] += dy * 0.02;

          const color = new THREE.Color();
          color.setHSL(0.5 + Math.sin(dist) * 0.2, 0.7, 0.5);
          colors[i] = color.r;
          colors[i + 1] = color.g;
          colors[i + 2] = color.b;

          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        points.current.geometry.attributes.position.needsUpdate = true;
        points.current.geometry.attributes.color.needsUpdate = true;
      }
    }
  });

  const handlePointerMove = (event) => {
    hover.current.x = event.uv.x * 2 - 1;
    hover.current.y = -(event.uv.y * 2 - 1);
  };

  return (
    <points ref={points} onPointerMove={handlePointerMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  );
};

export default ParticleSystem;
