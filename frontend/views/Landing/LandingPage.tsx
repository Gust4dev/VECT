import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, RoundedBox, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Layers, Image as ImageIcon, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// --- 3D Components ---

// --- 3D Components ---

// --- 3D Components ---

// --- 3D Components ---



const ModernVilla = () => {
  return (
    <group rotation={[0, -Math.PI / 5, 0]} position={[0, -1, 0]}>
      {/* --- Ground/Base --- */}
      <RoundedBox args={[7, 0.2, 7]} radius={0.05} smoothness={4} position={[0, -0.1, 0]} receiveShadow>
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </RoundedBox>

      {/* --- Main Concrete Structure (Ground Floor) --- */}
      <RoundedBox args={[3.5, 1.2, 4]} radius={0.05} smoothness={4} position={[-0.5, 0.6, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#e5e5e5" roughness={0.2} metalness={0.1} />
      </RoundedBox>

      {/* --- Upper Floor (Cantilever) --- */}
      <RoundedBox args={[4, 1.2, 3.5]} radius={0.05} smoothness={4} position={[0.5, 1.8, 0.5]} castShadow receiveShadow>
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.2} />
      </RoundedBox>

      {/* --- Wood Accent Panel --- */}
      <RoundedBox args={[0.1, 1.2, 2]} radius={0.02} smoothness={4} position={[2.5, 1.8, 1]} castShadow>
        <meshStandardMaterial color="#8B5A2B" roughness={0.8} />
      </RoundedBox>

      {/* --- Glass Windows --- */}
      {/* Ground Floor Large Window */}
      <mesh position={[1.26, 0.6, 0.5]}>
        <boxGeometry args={[0.1, 1, 2.5]} />
        <meshPhysicalMaterial 
          color="#88ccff" 
          metalness={0.1} 
          roughness={0} 
          transmission={0.9} 
          thickness={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Upper Floor Panoramic Window */}
      <mesh position={[0.5, 1.8, 2.26]}>
        <boxGeometry args={[3.8, 1, 0.1]} />
        <meshPhysicalMaterial 
          color="#skyblue" 
          metalness={0.1} 
          roughness={0} 
          transmission={0.9} 
          thickness={0.5}
          transparent 
          opacity={0.5}
        />
      </mesh>

      {/* --- Pool Area --- */}
      <group position={[2, 0.1, 2]}>
        {/* Water */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
          <planeGeometry args={[2.5, 2]} />
          <meshPhysicalMaterial color="#00ffff" transmission={0.6} roughness={0} metalness={0.5} />
        </mesh>
        {/* Pool Border */}
        <RoundedBox args={[2.7, 0.15, 0.2]} radius={0.02} smoothness={4} position={[0, 0, 1.1]} castShadow>
           <meshStandardMaterial color="#333" />
        </RoundedBox>
        <RoundedBox args={[2.7, 0.15, 0.2]} radius={0.02} smoothness={4} position={[0, 0, -1.1]} castShadow>
           <meshStandardMaterial color="#333" />
        </RoundedBox>
        <RoundedBox args={[0.2, 0.15, 2.4]} radius={0.02} smoothness={4} position={[1.35, 0, 0]} castShadow>
           <meshStandardMaterial color="#333" />
        </RoundedBox>
      </group>

      {/* --- Abstract Vegetation --- */}
      <group position={[-2.5, 0.5, 2.5]}>
         <mesh castShadow position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color="#2d4c1e" roughness={0.8} />
         </mesh>
         <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 1]} />
            <meshStandardMaterial color="#3e2723" />
         </mesh>
      </group>

    </group>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 5, 10]} fov={40} />
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        minPolarAngle={Math.PI / 3} 
        maxPolarAngle={Math.PI / 2.1} 
      />
      
      {/* Professional Studio Lighting - Brightened */}
      <ambientLight intensity={0.8} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#3399FF" />
      <directionalLight position={[-5, 5, 5]} intensity={1.5} color="#ffffff" />
      
      {/* Rim Light for separation */}
      <spotLight position={[0, 5, -10]} intensity={2} color="#ffffff" angle={0.5} penumbra={1} />
      
      {/* Soft Ground Shadows for Realism */}
      <ContactShadows 
        resolution={1024} 
        scale={20} 
        blur={2} 
        opacity={0.5} 
        far={10} 
        color="#000000" 
      />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <ModernVilla />
      </Float>
    </>
  );
};

// --- UI Components ---

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-blue-500/30 transition-all group cursor-default"
  >
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-500/10">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{desc}</p>
  </motion.div>
);

const Stat = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">{value}</div>
    <div className="text-sm text-zinc-500 uppercase tracking-wider font-medium">{label}</div>
  </div>
);

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05070a] text-white overflow-x-hidden selection:bg-blue-500/30 font-sans">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300 bg-[#05070a]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">V</div>
            <span className="text-2xl font-bold tracking-tight">VECT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Entrar</button>
            <button onClick={() => navigate('/register')} className="px-6 py-2.5 bg-white text-black rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10">Criar Conta</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-600/10 blur-[100px] rounded-full opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Zap size={14} />
              Versão Beta Disponível
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] mb-8 tracking-tight">
              Design <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-white">
                Inteligente.
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed font-light">
              O VECT funde a precisão da modelagem arquitetônica com a criatividade ilimitada da IA Generativa.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all flex items-center justify-center gap-3 group"
              >
                Começar Gratuitamente
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold text-lg transition-all backdrop-blur-sm">
                Ver Demo
              </button>
            </div>

            <div className="mt-16 flex items-center gap-8 border-t border-white/5 pt-8">
              <Stat value="Nuvem" label="Render via GPU" />
              <div className="w-px h-12 bg-white/10"></div>
              <Stat value="AI Inpainting" label="Powered by VECT" />
              <div className="w-px h-12 bg-white/10"></div>
              <Stat value="Atualizações" label="Semanais" />
            </div>
          </motion.div>

          {/* 3D Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[600px] lg:h-[800px] w-full relative cursor-grab active:cursor-grabbing"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <Canvas className="z-10" dpr={[1, 2]} shadows>
              <React.Suspense fallback={null}>
                <Scene />
              </React.Suspense>
            </Canvas>
            
            {/* Floating UI Elements around 3D */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute top-1/4 right-0 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-zinc-300">Renderizando...</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-2/3"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Workflow do Futuro.</h2>
            <p className="text-zinc-400 max-w-2xl text-xl">
              Esqueça horas de configuração de render. Foque no design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Layers size={28} />}
              title="O Fim da Renderização Lenta"
              desc="O mercado exige velocidade. O VECT elimina as horas de espera do V-Ray e Lumion, entregando resultados instantâneos."
            />
             <FeatureCard 
              icon={<Cpu size={28} />}
              title="Inteligência Generativa"
              desc="Não apenas filtros. O VECT entende geometria e materiais, permitindo iterações de design que antes levavam dias."
            />
             <FeatureCard 
              icon={<ImageIcon size={28} />}
              title="Futuro da Arquitetura"
              desc="Integração direta com fluxos BIM e CAD. O VECT não substitui o arquiteto, ele o torna 10x mais produtivo."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Pronto para criar?</h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Estamos construindo o sistema operacional visual para a próxima geração de arquitetos. Garanta seu lugar na revolução.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="px-12 py-6 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
          >
            Criar Conta Gratuita
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#020305]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center font-bold text-white">V</div>
            <span className="font-bold text-zinc-300 text-lg">VECT</span>
          </div>
          <div className="text-zinc-600 text-sm">
            © 2025 VECT Inc. Architecture AI.
          </div>
          <div className="flex gap-8 text-zinc-500 font-medium text-sm">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
