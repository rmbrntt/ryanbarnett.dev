import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface MenuBlochProps {
  size?: number;
  color?: string;
  wireframe?: boolean;
  rotation?: { x: number; y: number; z: number };
  onHover?: () => void;
}

export function MenuBloch({ 
  size = 300,
  color = '#88d0f3',
  wireframe = true,
  rotation = { x: 0, y: 0, z: 0 },
  onHover
}: MenuBlochProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const isRotatingRef = useRef(true);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });

    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);

    // Create sphere
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      wireframe,
      transparent: true,
      opacity: wireframe ? 0.3 : 0.8,
      side: THREE.DoubleSide
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add subtle lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Position camera
    camera.position.z = 2.5;

    // Store refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    sphereRef.current = sphere;

    // Mouse event handlers
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !sphereRef.current) return;

      const deltaMove = {
        x: event.clientX - previousMousePositionRef.current.x,
        y: event.clientY - previousMousePositionRef.current.y
      };

      sphereRef.current.rotation.y += deltaMove.x * 0.005;
      sphereRef.current.rotation.x += deltaMove.y * 0.005;

      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleClick = () => {
      isRotatingRef.current = !isRotatingRef.current;
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('click', handleClick);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      if (!sphere || !renderer || !scene || !camera) return;

      if (isRotatingRef.current && !isDraggingRef.current) {
        sphere.rotation.x += rotation.x * (isHovered ? 0.5 : 1);
        sphere.rotation.y += rotation.y * (isHovered ? 0.5 : 1);
        sphere.rotation.z += rotation.z * (isHovered ? 0.5 : 1);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (rendererRef.current) {
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('click', handleClick);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        rendererRef.current.dispose();
      }
      if (containerRef.current?.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, [size, color, wireframe, rotation, isHovered]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => {
        setIsHovered(true);
        onHover?.();
      }}
      onHoverEnd={() => setIsHovered(false)}
      style={{ 
        width: size,
        height: size,
        position: 'relative',
        cursor: 'grab'
      }}
    />
  );
} 