import React, { useRef, createContext, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Context para compartilhar controles de rotação
interface RotationContextType {
  isDragging: React.MutableRefObject<boolean>;
  lastPosition: React.MutableRefObject<{ x: number; y: number }>;
  rotationVelocity: React.MutableRefObject<{ x: number; y: number }>;
  resetInteractionTimer: () => void;
}

const RotationContext = createContext<RotationContextType | null>(null);

// Componente de Label Flutuante (HUD Técnico) com controles de rotação
const FloatingLabel = ({ position, text, delay = 0 }: { position: [number, number, number], text: string, delay?: number }) => {
  const rotationCtx = useContext(RotationContext);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!rotationCtx) return;
    e.preventDefault();
    rotationCtx.isDragging.current = true;
    rotationCtx.lastPosition.current = { x: e.clientX, y: e.clientY };
    rotationCtx.resetInteractionTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!rotationCtx || e.touches.length !== 1) return;
    e.preventDefault();
    rotationCtx.isDragging.current = true;
    rotationCtx.lastPosition.current = { 
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY 
    };
    rotationCtx.resetInteractionTimer();
  };

  return (
    <Html position={position} center distanceFactor={8} zIndexRange={[100, 0]}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
        className="select-none flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-cyan-500/30 backdrop-blur-md whitespace-nowrap cursor-grab active:cursor-grabbing"
        style={{ userSelect: 'none' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
        <span className="text-[10px] font-mono font-bold text-cyan-100 tracking-wider uppercase select-none">{text}</span>
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

  // Sistema de rotação manual e automática
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const lastInteractionTime = useRef(0); // Inicializa em 0 para começar rodando
  const hasInteracted = useRef(false); // Flag para primeira interação
  const autoRotationEnabled = useRef(true);

  const resetInteractionTimer = () => {
    hasInteracted.current = true; // Marca que houve interação
    lastInteractionTime.current = Date.now();
    autoRotationEnabled.current = false;
  };

  // Context value para compartilhar com FloatingLabels
  const rotationContextValue: RotationContextType = {
    isDragging,
    lastPosition,
    rotationVelocity,
    resetInteractionTimer
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const timeSinceInteraction = Date.now() - lastInteractionTime.current;
    const idleThreshold = 3000; // 3 segundos

    if (groupRef.current) {
      // Se nunca interagiu OU passou tempo suficiente sem interação, ativar rotação automática
      if ((!hasInteracted.current || timeSinceInteraction > idleThreshold) && !isDragging.current) {
        autoRotationEnabled.current = true;
        // Rotação automática suave
        groupRef.current.rotation.y += 0.003;
        groupRef.current.rotation.x += 0.001;
      } else if (!isDragging.current) {
        // Aplicar velocidade de rotação (inércia)
        rotationVelocity.current.x *= 0.95;
        rotationVelocity.current.y *= 0.95;
        
        // ROTAÇÃO LIVRE SEM LIMITES
        groupRef.current.rotation.x += rotationVelocity.current.x;
        groupRef.current.rotation.y += rotationVelocity.current.y;
      } else {
        // Durante drag, aplicar rotação manual
        groupRef.current.rotation.x += rotationVelocity.current.x;
        groupRef.current.rotation.y += rotationVelocity.current.y;
      }
    }

    // Animação do Núcleo (HDR Glow)
    if (innerCubeRef.current) {
      const mat = innerCubeRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 3.0 + Math.sin(t * 2.5) * 2.0;
      
      const pulse = 1.0 + Math.sin(t * 2.5) * 0.03;
      innerCubeRef.current.scale.setScalar(pulse);
    }

    // Animação das Linhas (opacidade + pulsação)
    if (outerLinesRef.current) {
      const mat = outerLinesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.5 + Math.sin(t * 2.0) * 0.3;
      
      // Pulsação no wireframe externo
      const outerPulse = 1.0 + Math.sin(t * 1.5) * 0.04; // 4% de variação
      outerLinesRef.current.scale.setScalar(outerPulse);
    }

    if (middleLinesRef.current) {
      const mat = middleLinesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.4 + Math.sin(t * 2.0 + 1.0) * 0.2;
      
      // Pulsação no wireframe médio (frequência diferente)
      const middlePulse = 1.0 + Math.sin(t * 1.8 + 0.5) * 0.035; // 3.5% de variação
      middleLinesRef.current.scale.setScalar(middlePulse);
    }
  });

  // Handlers de mouse e touch no DOM
  React.useEffect(() => {
    const canvas = gl.domElement;

    // Mouse handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
      resetInteractionTimer();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;

      const speed = 0.005;
      
      rotationVelocity.current.x = deltaY * speed;
      rotationVelocity.current.y = deltaX * speed;

      lastPosition.current = { x: e.clientX, y: e.clientY };
      resetInteractionTimer();
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = 'grab';
    };

    // Touch handlers para mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        lastPosition.current = { 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        };
        resetInteractionTimer();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - lastPosition.current.x;
      const deltaY = e.touches[0].clientY - lastPosition.current.y;

      const speed = 0.005;
      
      rotationVelocity.current.x = deltaY * speed;
      rotationVelocity.current.y = deltaX * speed;

      lastPosition.current = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      };
      resetInteractionTimer();
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    // Mouse events
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    canvas.style.cursor = 'grab';
    canvas.style.touchAction = 'none'; // Prevenir scroll no mobile

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
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
    <RotationContext.Provider value={rotationContextValue}>
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
    </RotationContext.Provider>
  );
};

export const VectLogo3D: React.FC = () => {
  return (
    <div className="w-full h-full pointer-events-auto">
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