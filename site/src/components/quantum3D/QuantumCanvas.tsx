import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface QuantumCanvasProps {
  children: React.ReactNode;
  className?: string;
}

export function QuantumCanvas({ children, className }: QuantumCanvasProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [3, 3, 5], fov: 50, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          position: 'absolute',
          inset: 0
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            zoomSpeed={0.8}
          />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
} 