import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

function FabricMesh({ textureUrl, roughness, metalness }) {
  const texture = useTexture(textureUrl);
  const [spring] = useSpring(() => ({
    scale: [1, 1, 1],
    config: { mass: 1, tension: 280, friction: 60 }
  }));

  return (
    <animated.mesh scale={spring.scale}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <meshStandardMaterial 
        map={texture}
        roughness={roughness}
        metalness={metalness}
        envMapIntensity={1}
      />
    </animated.mesh>
  );
}

export default function FabricVisualizer({ fabricData }) {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <FabricMesh 
            textureUrl={fabricData.textureUrl}
            roughness={fabricData.roughness || 0.5}
            metalness={fabricData.metalness || 0.1}
          />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={1.5}
            maxDistance={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}