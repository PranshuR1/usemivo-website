"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { Mesh } from "three";

export function AmbientBlob() {
  const mesh = useRef<Mesh>(null);
  const target = useRef({ x: 0.6, y: 0 });

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.getElapsedTime();
    m.rotation.x = Math.sin(t * 0.15) * 0.3;
    m.rotation.y = t * 0.08;
    target.current.x = 0.6 + state.pointer.x * 0.5;
    target.current.y = state.pointer.y * 0.3;
    m.position.x = THREE.MathUtils.lerp(m.position.x, target.current.x, 0.02);
    m.position.y = THREE.MathUtils.lerp(m.position.y, target.current.y, 0.02);
  });

  return (
    <mesh ref={mesh} scale={1.9} position={[0.6, 0, -1]}>
      <icosahedronGeometry args={[1, 6]} />
      <MeshDistortMaterial
        color="#d4872a"
        distort={0.4}
        speed={1.3}
        roughness={0.4}
        metalness={0.15}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}
