"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function OrbCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.25) * 0.15;
    meshRef.current.rotation.y += 0.004;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[0, 0, -1]}>
        <icosahedronGeometry args={[2, 5]} />
        <MeshDistortMaterial
          color="#2A0A5E"
          emissive="#7C3AED"
          emissiveIntensity={0.4}
          distort={0.35}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function GoldRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.12;
    ref.current.rotation.z = clock.elapsedTime * 0.08;
  });

  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <torusGeometry args={[2.8, 0.012, 16, 200]} />
      <meshStandardMaterial
        color="#D4AF37"
        emissive="#D4AF37"
        emissiveIntensity={1.2}
        roughness={0}
        metalness={1}
      />
    </mesh>
  );
}

function GoldRing2() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = -clock.elapsedTime * 0.09;
    ref.current.rotation.y = clock.elapsedTime * 0.06;
  });

  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <torusGeometry args={[3.4, 0.008, 16, 200]} />
      <meshStandardMaterial
        color="#F0D060"
        emissive="#F0D060"
        emissiveIntensity={0.8}
        roughness={0}
        metalness={1}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 4000;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 4 + Math.random() * 10;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.015) * 0.08;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#D4AF37"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#030305"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} color="#D4AF37" intensity={3} />
      <pointLight position={[-3, -2, -3]} color="#7C3AED" intensity={2} />
      <pointLight position={[0, -4, 2]} color="#4B1C8C" intensity={1.5} />

      <Stars radius={60} depth={60} count={6000} factor={3} saturation={0} fade speed={0.8} />
      <Particles />
      <OrbCore />
      <GoldRing />
      <GoldRing2 />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.85}
          intensity={2.5}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
