"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

type PerfTier = "low" | "medium" | "high";

function detectPerfTier(): PerfTier {
  if (typeof window === "undefined") return "medium";
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 4;
  if (isMobile || memory <= 2) return "low";
  if (memory <= 4) return "medium";
  return "high";
}

const TIER_CONFIG = {
  low:    { count: 800,  dpr: [1, 1]   as [number, number], bloom: false },
  medium: { count: 1400, dpr: [1, 1.5] as [number, number], bloom: true  },
  high:   { count: 2200, dpr: [1, 2]   as [number, number], bloom: true  },
} as const;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 19.1947) * 34758.921;
  return x - Math.floor(x);
}

function SignalField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const band = Math.floor(seededRandom(i + 10) * 9) - 4;
      positions[i * 3]     = (seededRandom(i + 31) - 0.5) * 15;
      positions[i * 3 + 1] = band * 0.42 + (seededRandom(i + 52) - 0.5) * 0.1;
      positions[i * 3 + 2] = (seededRandom(i + 73) - 0.5) * 12;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  // Cleanup on unmount — prevent GPU memory leak
  useEffect(() => () => { geometry.dispose(); }, [geometry]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(clock.elapsedTime * 0.12) * 0.18;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.06;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#B9DFFF" size={0.018} transparent opacity={0.58} sizeAttenuation />
    </points>
  );
}

function BroadcastScreens() {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef  = useRef<THREE.LineSegments>(null);

  const screens = useMemo(
    () =>
      [
        [-2.5, 0.7, -1.2, -0.18, 0.22, 1.35],
        [0, 0.25, -1.75, 0.02, 0, 1.55],
        [2.45, 0.9, -1.3, 0.16, -0.24, 1.25],
        [-1.35, -1.1, -0.6, 0.12, -0.08, 0.92],
        [1.4, -0.95, -0.7, -0.08, 0.12, 1.02],
      ] as const,
    []
  );

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points: number[] = [];

    screens.forEach((screen, i) => {
      const [x, y, z] = screen;
      const next = screens[(i + 1) % screens.length];
      points.push(x, y, z, next[0], next[1], next[2]);
      points.push(0, 0, -1.25, x, y, z);
    });

    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, [screens]);

  useEffect(() => () => { lineGeometry.dispose(); }, [lineGeometry]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.14;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.11) * 0.05;
    }
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.22 + Math.sin(clock.elapsedTime * 1.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0.7, -0.05, -0.6]}>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#D8C6A4" transparent opacity={0.28} />
      </lineSegments>

      {screens.map(([x, y, z, rx, ry, scale], index) => (
        <group key={`${x}-${y}`} position={[x, y, z]} rotation={[rx, ry, 0]} scale={scale}>
          <mesh>
            <boxGeometry args={[1.62, 0.94, 0.035]} />
            <meshPhysicalMaterial
              color={index === 1 ? "#D8C6A4" : "#0D1626"}
              emissive={index === 1 ? "#7CC7FF" : "#243F66"}
              emissiveIntensity={index === 1 ? 0.8 : 0.42}
              metalness={0.45}
              roughness={0.18}
              transparent
              opacity={0.88}
            />
          </mesh>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[1.45, 0.72]} />
            <meshBasicMaterial
              color={index === 1 ? "#F4E8D0" : "#96D8FF"}
              transparent
              opacity={index === 1 ? 0.2 : 0.12}
            />
          </mesh>
          <mesh position={[0, -0.52, 0.04]}>
            <boxGeometry args={[0.72, 0.012, 0.012]} />
            <meshBasicMaterial color={index === 1 ? "#F4E8D0" : "#7CC7FF"} transparent opacity={0.72} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0, -1.28]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.006, 12, 220]} />
        <meshBasicMaterial color="#D8C6A4" transparent opacity={0.38} />
      </mesh>
      <mesh position={[0, 0, -1.28]} rotation={[Math.PI / 2.45, 0.22, 0.08]}>
        <torusGeometry args={[3.42, 0.004, 12, 220]} />
        <meshBasicMaterial color="#7CC7FF" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function ParticleScene() {
  const [tier] = useState<PerfTier>(() => detectPerfTier());
  const config = TIER_CONFIG[tier];

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 48 }}
      gl={{ antialias: tier !== "low", alpha: false }}
      dpr={config.dpr}
    >
      <color attach="background" args={["#05070B"]} />
      <fog attach="fog" args={["#05070B", 5.5, 13]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[2, 2.6, 2]}    color="#D8C6A4" intensity={3.2} />
      <pointLight position={[-3.6, -1.4, 1]} color="#7CC7FF" intensity={2.7} />
      <pointLight position={[2, -3, -2]}    color="#6B4CFF" intensity={1.6} />

      <SignalField count={config.count} />
      <BroadcastScreens />

      {config.bloom && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.16} luminanceSmoothing={0.8} intensity={1.6} mipmapBlur />
          <Vignette eskil={false} offset={0.18} darkness={0.72} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
