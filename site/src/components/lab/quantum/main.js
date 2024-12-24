import * as THREE from "three";
import { extend } from "@react-three/fiber";

class VisualizationSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.eventListeners = new Map();
    this.particles = [];
    this.isTransitioning = false;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.init();
  }

  init() {
    // Create particle system
    this.particleSystem = this.createParticleSystem();
    this.scene.add(this.particleSystem);

    // Event listeners
    window.addEventListener("resize", this.handleResize.bind(this));
    this.container.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    this.container.addEventListener(
      "touchmove",
      this.handleTouchMove.bind(this)
    );
  }

  createParticleSystem() {
    const geometry = new THREE.BufferGeometry();
    const particles = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);

    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      particles[i3] = (Math.random() - 0.5) * 10;
      particles[i3 + 1] = (Math.random() - 0.5) * 10;
      particles[i3 + 2] = (Math.random() - 0.5) * 10;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(particles, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    return new THREE.Points(geometry, material);
  }

  handleResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  handleMouseMove(event) {
    if (this.isTransitioning) return;

    const rect = this.container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.updateParticles(x, y);
  }

  handleTouchMove(event) {
    if (this.isTransitioning || !event.touches[0]) return;

    const rect = this.container.getBoundingClientRect();
    const touch = event.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

    this.updateParticles(x, y);
  }

  updateParticles(x, y) {
    const positions = this.particleSystem.geometry.attributes.position.array;
    const colors = this.particleSystem.geometry.attributes.color.array;

    for (let i = 0; i < positions.length; i += 3) {
      const dx = x * 5 - positions[i];
      const dy = y * 5 - positions[i + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        positions[i] += dx * 0.02;
        positions[i + 1] += dy * 0.02;

        const color = new THREE.Color();
        color.setHSL(0.5 + Math.sin(dist) * 0.2, 0.7, 0.5);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }
    }

    this.particleSystem.geometry.attributes.position.needsUpdate = true;
    this.particleSystem.geometry.attributes.color.needsUpdate = true;
  }

  transitionToParticles(duration) {
    this.isTransitioning = true;
    const startTime = Date.now();

    const transition = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        requestAnimationFrame(transition);
      } else {
        this.isTransitioning = false;
        this.emit("onPhaseComplete", "initial");
        this.emit("onControlsEnabled");
      }
    };

    transition();
  }

  performIntroSequence() {
    this.emit("onPhaseComplete", "initial");
    setTimeout(() => {
      this.emit("onControlsEnabled");
    }, 1000);
  }

  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(callback);
  }

  emit(event, data) {
    if (this.eventListeners.has(event)) {
      for (const callback of this.eventListeners.get(event)) {
        callback(data);
      }
    }
  }

  cleanup() {
    window.removeEventListener("resize", this.handleResize);
    this.container.removeEventListener("mousemove", this.handleMouseMove);
    this.container.removeEventListener("touchmove", this.handleTouchMove);

    this.scene.remove(this.particleSystem);
    this.particleSystem.geometry.dispose();
    this.particleSystem.material.dispose();
  }
}

export const initIncend = (containerId, options = {}) => {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const system = new VisualizationSystem(container, options);
  return {
    visualization: {
      system,
    },
  };
};

export const cleanupIncend = (instance) => {
  if (instance?.visualization?.system) {
    instance.visualization.system.cleanup();
  }
};
