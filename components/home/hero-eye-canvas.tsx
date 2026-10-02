"use client";

import { Center, Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/lib/theme-provider";

const MODEL_PATH = "/assets/homepage/eye-icon.glb";
/** Spatial frequency of the grain pattern (fbm input multiplier). */
const NOISE_SCALE = 18;
/** Surface grain strength; bump depth is NOISE_AMOUNT / 1000. */
const NOISE_AMOUNT = 50;

type SurfaceNoiseMaps = {
  roughnessMap: THREE.DataTexture;
  bumpMap: THREE.DataTexture;
};

let cachedSurfaceNoise: SurfaceNoiseMaps | null = null;

function hashNoise(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function smoothNoise(x: number, y: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = hashNoise(x0, y0);
  const n10 = hashNoise(x0 + 1, y0);
  const n01 = hashNoise(x0, y0 + 1);
  const n11 = hashNoise(x0 + 1, y0 + 1);

  const ix0 = n00 + (n10 - n00) * sx;
  const ix1 = n01 + (n11 - n01) * sx;
  return ix0 + (ix1 - ix0) * sy;
}

function fbmNoise(x: number, y: number) {
  let value = 0;
  let amplitude = 0.55;
  let frequency = 1;
  for (let octave = 0; octave < 4; octave += 1) {
    value += smoothNoise(x * frequency, y * frequency) * amplitude;
    amplitude *= 0.5;
    frequency *= 2.1;
  }
  return value;
}

function createSurfaceNoiseMaps(size = 512): SurfaceNoiseMaps {
  const roughnessData = new Uint8Array(size * size);
  const bumpData = new Uint8Array(size * size);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = y * size + x;
      const nx = x / size;
      const ny = y / size;
      const grain = fbmNoise(nx * NOISE_SCALE, ny * NOISE_SCALE);
      const fine = fbmNoise(nx * 42 + 12.7, ny * 42 + 4.2);
      const combined = THREE.MathUtils.clamp(grain * 0.72 + fine * 0.28, 0, 1);

      roughnessData[index] = Math.floor(combined * 255);
      bumpData[index] = Math.floor(combined * 255);
    }
  }

  const roughnessMap = new THREE.DataTexture(roughnessData, size, size, THREE.RedFormat);
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(3.5, 3.5);
  roughnessMap.needsUpdate = true;

  const bumpMap = new THREE.DataTexture(bumpData, size, size, THREE.RedFormat);
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(3.5, 3.5);
  bumpMap.needsUpdate = true;

  return { roughnessMap, bumpMap };
}

function getSurfaceNoiseMaps() {
  if (!cachedSurfaceNoise) {
    cachedSurfaceNoise = createSurfaceNoiseMaps();
  }
  return cachedSurfaceNoise;
}

function createChromeMaterial(envIntensity: number, noise: SurfaceNoiseMaps) {
  const noiseStrength = NOISE_AMOUNT / 1000;
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#060606"),
    metalness: 1,
    roughness: 0.18 + noiseStrength * 0.35,
    roughnessMap: noise.roughnessMap,
    bumpMap: noise.bumpMap,
    bumpScale: noiseStrength,
    envMapIntensity: envIntensity,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12,
    reflectivity: 1,
    sheen: 0.12,
    sheenRoughness: 0.45,
    sheenColor: new THREE.Color("#777777"),
  });
  material.userData.heroChrome = true;
  return material;
}

function disposeHeroChromeMaterial(material: THREE.Material | THREE.Material[]) {
  const materials = Array.isArray(material) ? material : [material];
  for (const entry of materials) {
    if (entry.userData?.heroChrome) {
      entry.dispose();
    }
  }
}

function EyeModel({ animate, envIntensity }: { animate: boolean; envIntensity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const surfaceNoise = useMemo(() => getSurfaceNoiseMaps(), []);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      disposeHeroChromeMaterial(child.material);
      child.material = createChromeMaterial(envIntensity, surfaceNoise);
      child.castShadow = true;
      child.receiveShadow = true;
    });
    return clone;
  }, [scene, envIntensity, surfaceNoise]);

  useFrame((_, delta) => {
    if (!groupRef.current || !animate) return;
    groupRef.current.rotation.y += delta * 0.315;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={model} scale={1} />
      </Center>
    </group>
  );
}

function EyeScene({ animate, envIntensity }: { animate: boolean; envIntensity: number }) {
  return (
    <>
      <Environment preset="studio" background={false} blur={0.45} environmentIntensity={envIntensity * 0.88} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[0, 6, 3]} intensity={1.35} color="#f5f5f5" />
      <directionalLight position={[-5, 1, 4]} intensity={0.42} color="#e8e8e8" />
      <directionalLight position={[5, -1, 2]} intensity={0.22} color="#cccccc" />
      <spotLight
        position={[0, 7, 1]}
        angle={0.42}
        penumbra={0.65}
        intensity={0.55}
        color="#ffffff"
      />
      <EyeModel animate={animate} envIntensity={envIntensity} />
    </>
  );
}

export function HeroEyeCanvas() {
  const { isDark } = useTheme();
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;
  const envIntensity = isDark ? 1.55 : 1.75;

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.98,
      }}
      style={{ width: "100%", height: "100%" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>
        <EyeScene animate={animate} envIntensity={envIntensity} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATH);
