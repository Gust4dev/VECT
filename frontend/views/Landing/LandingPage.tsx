import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VectLogo3D } from '../../components/VectLogo3D';

const Stat = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center px-4 border-l border-white/10 first:border-0">
    <div className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
    <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-bold">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
    }}
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

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.0, ease: "easeOut" } }
};

import { SmoothScroll } from '../../components/landing/SmoothScroll';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // --- LIQUID DEPTH PARALLAX ---
  // The key here is subtle, massive movement for the background, 
  // and faster movement for the mid-ground to create the "window" effect.

  // Force scroll to top on refresh
  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Layer 1: The Deep Void (Massive, Slow)
  const deepY = useTransform(scrollY, [0, 8000], [0, 500]); // Moves very slowly
  const deepRotate = useTransform(scrollY, [0, 8000], [0, 10]);

  // Layer 2: The Ethereal Forms (Mid-speed)
  const form1Y = useTransform(scrollY, [0, 8000], [0, -400]);
  const form1Rotate = useTransform(scrollY, [0, 8000], [0, 45]);
  
  const form2Y = useTransform(scrollY, [0, 8000], [0, -800]);
  const form2Scale = useTransform(scrollY, [0, 8000], [1, 1.2]);

  const form3Y = useTransform(scrollY, [0, 8000], [0, -600]);
  const form3Rotate = useTransform(scrollY, [0, 8000], [0, -60]);

  // Layer 3: The Glass Shards (Faster, Foreground Accents)
  const shard1Y = useTransform(scrollY, [0, 8000], [0, -1000]);
  const shard1Rotate = useTransform(scrollY, [0, 8000], [0, -90]);

  const shard2Y = useTransform(scrollY, [0, 8000], [0, -1200]);
  const shard2X = useTransform(scrollY, [0, 8000], [0, 200]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#05070a] text-white overflow-x-hidden selection:bg-blue-500/30 font-sans relative">
        
        {/* --- MAGNIFICENT BACKGROUND SYSTEM --- */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          
          {/* 1. Deep Atmosphere (The "Liquid" Base) */}
          <motion.div style={{ y: deepY, rotate: deepRotate }} className="absolute inset-[-20%] opacity-40">
             <div className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] bg-blue-900/30 rounded-full blur-[180px] mix-blend-screen" />
             <div className="absolute bottom-[10%] right-[10%] w-[90vw] h-[90vw] bg-indigo-900/20 rounded-full blur-[180px] mix-blend-screen" />
             <div className="absolute top-[40%] left-[40%] w-[60vw] h-[60vw] bg-cyan-900/10 rounded-full blur-[150px] mix-blend-screen" />
          </motion.div>

          {/* 2. Floating Ethereal Forms (The "Structure") */}
          <motion.div style={{ y: form1Y, rotate: form1Rotate }} className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] opacity-40">
             <div className="w-full h-full border-[2px] border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-[4rem] backdrop-blur-3xl" />
          </motion.div>

          <motion.div style={{ y: form2Y, scale: form2Scale }} className="absolute top-[60%] left-[-10%] w-[50vw] h-[50vw] opacity-30">
             <div className="w-full h-full border-[1px] border-cyan-500/30 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full backdrop-blur-2xl" />
          </motion.div>

          <motion.div style={{ y: form3Y, rotate: form3Rotate }} className="absolute top-[80%] right-[20%] w-[35vw] h-[35vw] opacity-30">
             <div className="w-full h-full border-[1px] border-purple-500/20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-[3rem] backdrop-blur-3xl" />
          </motion.div>

          {/* 3. Glass Shards (The "Detail") */}
          <motion.div style={{ y: shard1Y, rotate: shard1Rotate }} className="absolute bottom-[-10%] right-[15%] w-[20vw] h-[20vw] opacity-50">
             <div className="w-full h-full border border-white/20 bg-white/10 backdrop-blur-md rounded-3xl transform rotate-45" />
          </motion.div>

          <motion.div style={{ y: shard2Y, x: shard2X }} className="absolute top-[30%] left-[10%] w-[15vw] h-[15vw] opacity-40">
             <div className="w-full h-full border border-blue-400/20 bg-blue-400/5 backdrop-blur-md rounded-2xl transform -rotate-12" />
          </motion.div>

          {/* 4. Noise Grain Overlay (Texture) */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        </div>

        {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300 bg-[#05070a]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
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
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden z-10">
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)] pointer-events-auto">
              <Zap size={14} />
              Versão Beta Disponível
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] mb-8 tracking-tight">
              Renderize na <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-white">
                velocidade do pensamento.
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed font-light">
              Transforme volumetria básica em visualização fotorrealista instantaneamente. Preserve sua geometria, altere apenas o necessário.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto">
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

            <div className="mt-16 flex items-center gap-2 border-t border-white/5 pt-8 pointer-events-auto">
              <Stat value="0.2s" label="Tempo de Resposta" />
              <Stat value="4K" label="Exportação UHD" />
              <Stat value="100%" label="Geometria Preservada" />
            </div>
          </motion.div>

          {/* 3D Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="h-[600px] lg:h-[800px] w-full relative"
          >
            {/* Logo Glow - kept local to logo but reduced intensity as main background handles ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
            
            <VectLogo3D />
          </motion.div>
        </div>
      </section>

      {/* Problem / Stats Section */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px", amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="text-5xl font-bold text-white mb-2">30%</div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-4">do Tempo de Projeto</div>
              <p className="text-zinc-500 leading-relaxed">
                Arquitetos perdem quase um terço do tempo de projeto configurando luzes, texturas e renderizando cenas de teste.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="text-5xl font-bold text-white mb-2">R$ 2.5k+</div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-4">Custo Médio por Imagem</div>
              <p className="text-zinc-500 leading-relaxed">
                Estúdios de visualização cobram caro e levam dias. Alterações custam extra e atrasam a entrega final.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="text-5xl font-bold text-white mb-2">48h</div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-4">Ciclo de Feedback</div>
              <p className="text-zinc-500 leading-relaxed">
                O tempo médio para receber uma prévia de um renderizador externo. Com VECT, é instantâneo.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">A Evolução do Workflow</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl">
              A diferença entre esperar e criar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
            {/* Traditional */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2, margin: "-50px" }}
              variants={fadeInLeft}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 opacity-60 hover:opacity-100 transition-opacity"
            >
              <h3 className="text-2xl font-bold text-zinc-400 mb-8 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-zinc-600"></span>
                Workflow Tradicional
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between text-zinc-500 border-b border-white/5 pb-4">
                  <span>Modelagem 3D</span>
                  <span>4-8 Horas</span>
                </div>
                <div className="flex items-center justify-between text-zinc-500 border-b border-white/5 pb-4">
                  <span>Configuração de Materiais</span>
                  <span>2-4 Horas</span>
                </div>
                <div className="flex items-center justify-between text-zinc-500 border-b border-white/5 pb-4">
                  <span>Configuração de Luz</span>
                  <span>1-3 Horas</span>
                </div>
                <div className="flex items-center justify-between text-zinc-500 border-b border-white/5 pb-4">
                  <span>Renderização (Alta Res)</span>
                  <span>2-6 Horas</span>
                </div>
                <div className="flex items-center justify-between text-red-400 font-bold pt-2">
                  <span>Tempo Total</span>
                  <span>~2 Dias</span>
                </div>
              </div>
            </motion.div>

            {/* VECT */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2, margin: "-50px" }}
              variants={fadeInRight}
              className="p-10 rounded-3xl bg-gradient-to-b from-blue-900/20 to-blue-900/5 border border-blue-500/30 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>
                VECT Workflow
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between text-zinc-300 border-b border-blue-500/10 pb-4">
                  <span>Modelagem 3D (Básica)</span>
                  <span>4-8 Horas</span>
                </div>
                <div className="flex items-center justify-between text-blue-300 border-b border-blue-500/10 pb-4">
                  <span>VECT AI Rendering</span>
                  <span className="font-bold flex items-center gap-2">
                    <Zap size={14} />
                    Instantâneo
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-500 border-b border-blue-500/10 pb-4 opacity-50">
                  <span className="line-through">Configuração de Materiais</span>
                  <span>0 min</span>
                </div>
                <div className="flex items-center justify-between text-zinc-500 border-b border-blue-500/10 pb-4 opacity-50">
                  <span className="line-through">Configuração de Luz</span>
                  <span>0 min</span>
                </div>
                <div className="flex items-center justify-between text-blue-400 font-bold pt-2 text-xl">
                  <span>Tempo Total</span>
                  <span>Mesmo dia</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section (Refined) */}
      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Tecnologia que Entende Arquitetura.</h2>
            <p className="text-zinc-400 max-w-2xl text-xl">
              Não é apenas um gerador de imagens. É uma ferramenta de design assistido por IA.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard 
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Renderização em Tempo Real"
              desc="Visualize suas ideias instantaneamente. O VECT permite iterar dezenas de opções de materiais e iluminação em segundos, não horas."
            />
            <FeatureCard 
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
              title="Preservação de Geometria"
              desc="Ao contrário de outros modelos generativos, o VECT respeita rigorosamente as linhas do seu modelo 3D. O que você modela é o que você vê."
            />
            <FeatureCard 
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
              title="Integração BIM/CAD"
              desc="Exporte vistas do Revit, SketchUp ou Rhino e transforme-as em visualizações fotorrealistas sem sair do seu fluxo de trabalho."
            />
          </motion.div>
        </div>
      </section>

      {/* ROI / Benefits Section */}
      <section className="py-32 relative z-10 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-8">Venda Projetos com Mais Facilidade.</motion.h2>
              <div className="space-y-8">
                <motion.div variants={fadeInUp} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Redução de Custos Operacionais</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      Elimine a necessidade de render farms caros ou terceirização. O VECT roda na nuvem, acessível de qualquer laptop.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Encante seus Clientes</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      Apresente múltiplas opções de acabamento em tempo real durante reuniões. Aumente a confiança e feche contratos mais rápido.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Foco no Design, não na Técnica</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      Volte a ser arquiteto. Deixe que a IA cuide dos cálculos de fótons e materiais complexos.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2, margin: "-50px" }}
              variants={zoomIn}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 blur-[100px] rounded-full"></div>
              <div className="relative bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white">JD</div>
                  <div>
                    <div className="font-bold text-white">João D.</div>
                    <div className="text-sm text-zinc-400">Arquiteto Sênior</div>
                  </div>
                  <div className="ml-auto text-blue-400">
                    ★★★★★
                  </div>
                </div>
                <p className="text-zinc-300 italic leading-relaxed">
                  "O VECT mudou completamente como apresento meus projetos. Antes eu levava 2 dias para preparar uma apresentação final. Hoje faço em 30 minutos e o cliente sai muito mais satisfeito."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-blue-900/10"></div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={zoomIn}
          className="max-w-5xl mx-auto px-6 text-center relative z-10"
        >
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
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#020305] relative z-10">
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
    </SmoothScroll>
  );
};
