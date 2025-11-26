import React from 'react';
import { motion } from 'framer-motion';
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

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05070a] text-white overflow-x-hidden selection:bg-blue-500/30 font-sans">
      
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
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-600/10 blur-[100px] rounded-full opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[600px] lg:h-[800px] w-full relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <VectLogo3D />
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
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="O Fim da Renderização Lenta"
              desc="O mercado exige velocidade. O VECT elimina as horas de espera, entregando resultados instantâneos."
            />
            <FeatureCard 
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
              title="Inteligência Generativa"
              desc="Não apenas filtros. O VECT entende geometria e materiais, permitindo iterações que antes levavam dias."
            />
            <FeatureCard 
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
              title="Futuro da Arquitetura"
              desc="Integração com fluxos BIM e CAD. O VECT não substitui o arquiteto, ele o torna 10x mais produtivo."
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
