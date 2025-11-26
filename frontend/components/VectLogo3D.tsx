import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Componente de Label Flutuante (HUD Técnico)
const FloatingLabel = ({ position, text, delay = 0 }: { position: [number, number, number], text: string, delay?: number }) => {
  return (
    <Html position={position} center distanceFactor={8} zIndexRange={[100, 0]}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
        className="pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-cyan-500/30 backdrop-blur-md whitespace-nowrap"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
        <span className="text-[10px] font-mono font-bold text-cyan-100 tracking-wider uppercase">{text}</span>
        <div className="absolute top-1/2 -left-4 w-4 h-px bg-gradient-to-r from-transparent to-cyan-500/50"></div>
      </motion.div>
    </Html>
  );
};

export const VectLogoMesh = () => {
  const groupRef = useRef<THREE.Group>(null);
  const innerCubeRef = useRef<THREE.Mesh>(null);
  const outerLinesRef = useRef<THREE.LineSegments>(null);
  const middleLinesRef = useRef<THREE.LineSegments>(null);
  
  const { size, gl } = useThree();
  const scale = size.width < 768 ? 0.6 : 1.0;

  // Sistema de rotação manual
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Aplicar velocidade de rotação (inércia)
      if (!isDragging.current) {
        rotationVelocity.current.x *= 0.95;
        rotationVelocity.current.y *= 0.95;
      }
      
      // ROTAÇÃO LIVRE SEM LIMITES
      groupRef.current.rotation.x += rotationVelocity.current.x;
      groupRef.current.rotation.y += rotationVelocity.current.y;
    }

    // Animação do Núcleo (HDR Glow)
    if (innerCubeRef.current) {
      const mat = innerCubeRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 3.0 + Math.sin(t * 2.5) * 2.0;
      
      const pulse = 1.0 + Math.sin(t * 2.5) * 0.03;
      innerCubeRef.current.scale.setScalar(pulse);
    }

    // Animação das Linhas
    if (outerLinesRef.current) {
      const mat = outerLinesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.5 + Math.sin(t * 2.0) * 0.3;
    }

    if (middleLinesRef.current) {
      const mat = middleLinesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.4 + Math.sin(t * 2.0 + 1.0) * 0.2;
    }
  });

  // Handlers de mouse no DOM
  React.useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;

      const speed = 0.005;
      
      rotationVelocity.current.x = deltaY * speed;
      rotationVelocity.current.y = deltaX * speed;

      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    canvas.style.cursor = 'grab';

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gl]);

  const outerGeometry = React.useMemo(() => {
    const box = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    return new THREE.EdgesGeometry(box);
  }, []);

  const middleGeometry = React.useMemo(() => {
    const box = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    return new THREE.EdgesGeometry(box);
  }, []);

  return (
    <group ref={groupRef} scale={scale}>
      {/* LINHAS RENDERIZADAS PRIMEIRO */}
      <lineSegments ref={outerLinesRef} geometry={outerGeometry} renderOrder={-2}>
        <lineBasicMaterial
          color="#3399FF"
          transparent
          opacity={0.5}
          toneMapped={false}
          depthWrite={false}
        />
      </lineSegments>

      <lineSegments ref={middleLinesRef} geometry={middleGeometry} renderOrder={-1}>
        <lineBasicMaterial
          color="#3399FF"
          transparent
          opacity={0.4}
          toneMapped={false}
          depthWrite={false}
        />
      </lineSegments>

      {/* NÚCLEO RENDERIZADO POR ÚLTIMO */}
      <mesh ref={innerCubeRef} renderOrder={0}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#00FFFF"
          emissive="#3399FF"
          emissiveIntensity={3.0}
          toneMapped={false}
          roughness={0.1}
          metalness={0.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* LABELS TÉCNICAS FLUTUANTES (HUD) */}
      <FloatingLabel position={[2.0, 1.0, 0]} text="Geometria: Fixa" delay={0} />
      <FloatingLabel position={[-2.0, -0.8, 0.8]} text="Material: Vidro" delay={0.5} />
      <FloatingLabel position={[0, -2.0, -0.5]} text="Luz: HDR 4K" delay={1.0} />
    </group>
  );
};

export const VectLogo3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3399FF" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#00E5FF" />

        <VectLogoMesh />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.05}
            intensity={2.0}
            levels={9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};