"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { AmbientBlob } from "./ambient-blob";

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 2, 4]} intensity={30} color="#e29a50" />
      <pointLight position={[-4, -2, 2]} intensity={12} color="#7898c7" />
      <AmbientBlob />
      <Sparkles
        count={35}
        scale={[6, 4, 2]}
        size={2}
        speed={0.25}
        color="#e29a50"
        opacity={0.5}
      />
    </Canvas>
  );
}
