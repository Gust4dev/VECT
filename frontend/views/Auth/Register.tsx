import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual registration logic
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center font-bold text-white text-xl mx-auto mb-4 shadow-lg">V</div>
          <h2 className="text-3xl font-bold text-white mb-2">Criar Conta</h2>
          <p className="text-zinc-400">Comece a transformar seus projetos hoje</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Nome Completo</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Seu nome" 
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="seu@email.com" 
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2 group"
          >
            Criar Conta Grátis
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Já tem uma conta? <button onClick={() => navigate('/login')} className="text-white font-bold hover:underline">Entrar</button>
        </div>
      </div>
    </div>
  );
};
