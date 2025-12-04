import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Cpu, Image, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VectLogo3D } from '../../components/VectLogo3D';
import { SmoothScroll } from '../../components/landing/SmoothScroll';

// --- COMPONENTS ---
const Stat = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center px-4 border-l border-white/10 first:border-0">
    <div className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
    <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-bold">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
    }}
    whileHover={{ y: -10 }}
    className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 hover:border-blue-500/30 transition-all group cursor-default"
  >
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-500/10">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </motion.div>
);

// --- PREMIUM ANIMATION VARIANTS ---
const premiumFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] // "Luxury" ease (custom cubic-bezier)
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // --- LIQUID DEPTH PARALLAX ---
  // Force scroll to top on refresh
  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Layer 1: The Deep Void (Massive, Slow)
  const deepY = useTransform(scrollY, [0, 8000], [0, 500]); 
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

      {/* Hero Section - Magazine Cover Style */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden z-10">
        
        {/* Massive Typography Layer - Behind Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none"
        >
          <h1 className="text-[10vw] leading-[0.8] font-serif italic text-white/5 mix-blend-overlay tracking-tighter whitespace-nowrap">
            SUA VISÃO
          </h1>
          <h1 className="text-[10vw] leading-[0.8] font-poppins font-black text-white/5 mix-blend-overlay tracking-tighter whitespace-nowrap">
            MATERIALIZADA
          </h1>
        </motion.div>

        <div className="max-w-[90vw] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center w-full relative z-10">
          
          {/* Text Content - Spans 7 columns on large screens */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="pointer-events-none relative z-20 lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest mb-10 backdrop-blur-md pointer-events-auto">
              <Zap size={12} className="text-blue-400" />
              VECT 2.0 Beta
            </div>
            
            <div className="relative mb-12 w-full">
              <h1 className="text-[4vw] lg:text-[4.5vw] font-serif italic text-white leading-[0.9] tracking-tight mb-2 whitespace-nowrap">
                Sua Visão.
              </h1>
              {/* Force single line with whitespace-nowrap and responsive sizing */}
              <h1 className="text-[5vw] lg:text-[6vw] font-poppins font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 leading-[1.1] tracking-tighter whitespace-nowrap py-2">
                MATERIALIZADA.
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-lg leading-relaxed font-light border-l-2 border-white/10 pl-6">
              A nova era da visualização arquitetônica. <br/>
              <span className="text-white font-medium">Renderize o impossível em segundos.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto">
              <button 
                onClick={() => navigate('/register')}
                className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-3 group"
              >
                Começar Agora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full font-bold text-lg transition-all backdrop-blur-sm flex items-center gap-3">
                Showcase
                <Image size={18} className="text-zinc-400" />
              </button>
            </div>

            <div className="mt-20 flex items-center gap-12 text-zinc-500 font-mono text-xs tracking-widest uppercase">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                System Online
              </div>
              <div>v2.0.4-beta</div>
              <div>Lat: 24ms</div>
            </div>
          </motion.div>

          {/* 3D Logo Container - Spans 5 columns */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="h-[500px] lg:h-[800px] w-full relative z-10 flex items-center justify-center lg:justify-end lg:col-span-5"
          >
            {/* Architectural Grid Background for Logo */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
            
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
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            <motion.div variants={premiumFadeUp}>
              <div className="text-5xl font-bold text-white mb-2">30%</div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-4">do Tempo de Projeto</div>
              <p className="text-zinc-500 leading-relaxed">
                Arquitetos perdem quase um terço do tempo de projeto configurando luzes, texturas e renderizando cenas de teste.
              </p>
            </motion.div>
            <motion.div variants={premiumFadeUp}>
              <div className="text-5xl font-bold text-white mb-2">R$ 2.5k+</div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-4">Custo Médio por Imagem</div>
              <p className="text-zinc-500 leading-relaxed">
                Estúdios de visualização cobram caro e levam dias. Alterações custam extra e atrasam a entrega final.
              </p>
            </motion.div>
            <motion.div variants={premiumFadeUp}>
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
            viewport={{ once: true, amount: 0.5 }}
            variants={premiumFadeUp}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">A Evolução do Workflow</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl">
              A diferença entre esperar e criar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
            {/* Traditional - REMOVED OPACITY-60 CLASS */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              variants={premiumFadeUp}
              className="p-10 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
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
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              variants={premiumFadeUp}
              className="p-10 rounded-3xl bg-gradient-to-b from-blue-900/20 to-blue-900/5 border border-blue-500/30 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                Workflow VECT
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between text-zinc-300 border-b border-blue-500/10 pb-4">
                  <span>Importação do Modelo</span>
                  <span>Instantâneo</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300 border-b border-blue-500/10 pb-4">
                  <span>Sugestão de Materiais (IA)</span>
                  <span>~2 Minutos</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300 border-b border-blue-500/10 pb-4">
                  <span>Iluminação Automática</span>
                  <span>Automático</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300 border-b border-blue-500/10 pb-4">
                  <span>Renderização (4K)</span>
                  <span>~30 Segundos</span>
                </div>
                <div className="flex items-center justify-between text-blue-400 font-bold pt-2 text-xl">
                  <span>Tempo Total</span>
                  <span>~5 Minutos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative z-10 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap size={24} />}
              title="Renderização em Tempo Real"
              description="Visualize suas ideias instantaneamente. O VECT permite iterar dezenas de opções de materiais e iluminação em segundos, não horas."
            />
            <FeatureCard 
              icon={<Cpu size={24} />}
              title="Preservação de Geometria"
              description="Ao contrário de outros modelos generativos, o VECT respeita rigorosamente as linhas do seu modelo 3D. O que você modela é o que você vê."
            />
            <FeatureCard 
              icon={<Image size={24} />}
              title="Integração BIM/CAD"
              description="Exporte vistas do Revit, SketchUp ou Rhino e transforme-as em visualizações fotorrealistas sem sair do seu fluxo de trabalho."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={premiumFadeUp}
            className="bg-gradient-to-br from-zinc-900 to-black p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white border border-white/10">JD</div>
              <div>
                <div className="font-bold text-white">João D.</div>
                <div className="text-sm text-zinc-500">Arquiteto Sênior</div>
              </div>
              <div className="ml-auto flex gap-1 text-blue-500">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
            </div>
            <p className="text-2xl text-zinc-300 italic font-light leading-relaxed">
              "O VECT mudou completamente como apresento meus projetos. Antes eu levava 2 dias para preparar uma apresentação final. Hoje faço em 30 minutos e o cliente sai muito mais satisfeito."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={premiumFadeUp}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Pronto para criar?</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Estamos construindo o sistema operacional visual para a próxima geração de arquitetos. Garanta seu lugar na revolução.
            </p>
            <button 
              onClick={() => navigate('/register')}
              className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              Criar Conta Gratuita
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center text-xs font-bold">V</div>
            <span className="font-bold tracking-widest text-sm">VECT</span>
          </div>
          <div className="text-zinc-600 text-sm">
            © 2025 VECT Inc. Architecture AI.
          </div>
          <div className="flex gap-6 text-zinc-600 text-sm font-medium">
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
