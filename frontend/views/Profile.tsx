import React, { useEffect, useState } from 'react';
import { User, CreditCard, HardDrive, Star, Zap, LogOut, Edit2 } from 'lucide-react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; initials: string } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await import('../services/supabaseClient').then(m => m.supabase.auth.getUser());
      if (user) {
        const name = user.user_metadata?.full_name || 'Usuário';
        const email = user.email || '';
        const initials = name.substring(0, 2).toUpperCase();
        setUser({ name, email, initials });
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await authService.signOut();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-8 pb-16 min-h-[calc(100vh-8rem)] animate-fade-in-up">
      
      {/* Header Profile Card */}
      <div className="glass-panel rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-black/30 hover:bg-black/50 backdrop-blur rounded-lg text-white transition-colors border border-white/10">
                <Edit2 size={16} />
            </button>
        </div>
        
        <div className="relative mt-12 flex flex-col md:flex-row items-end md:items-center gap-6">
            <div className="w-32 h-32 bg-zinc-900 rounded-2xl p-1 shadow-2xl border-4 border-[#0a0a0c]">
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-4xl font-bold text-white">
                    {user.initials}
                </div>
            </div>
            <div className="flex-1 mb-2">
                <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
                <p className="text-zinc-400">Arquiteto Senior • {user.email}</p>
            </div>
            <div className="flex items-center gap-3 mb-3 md:mb-0">
                <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 font-bold text-sm flex items-center gap-2">
                    <Star size={16} fill="currentColor" />
                    PRO PLAN
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Subscription Status */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Zap size={20} className="text-yellow-500" />
                      Assinatura
                  </h3>
                  <button className="text-xs font-bold text-blue-400 hover:text-blue-300">Gerenciar</button>
              </div>

              <div className="flex-1 space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Plano Atual</p>
                      <p className="text-xl font-bold text-white">VECT Professional</p>
                      <p className="text-sm text-zinc-400 mt-1">Renova em 24 Out, 2025</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CreditCard size={16} className="text-zinc-500" />
                      Visa terminando em 4242
                  </div>
              </div>
          </div>

          {/* Usage Stats */}
          <div className="glass-panel rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                  <HardDrive size={20} className="text-purple-500" />
                  Uso e Armazenamento
              </h3>
              
              <div className="space-y-6">
                  <div>
                      <div className="flex justify-between text-sm mb-2">
                          <span className="text-zinc-300">Projetos Ativos</span>
                          <span className="text-white font-bold">12 / 50</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-[24%]"></div>
                      </div>
                  </div>

                  <div>
                      <div className="flex justify-between text-sm mb-2">
                          <span className="text-zinc-300">Armazenamento em Nuvem</span>
                          <span className="text-white font-bold">45GB / 100GB</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 w-[45%]"></div>
                      </div>
                  </div>

                  <div>
                      <div className="flex justify-between text-sm mb-2">
                          <span className="text-zinc-300">Gerações de IA (Mensal)</span>
                          <span className="text-white font-bold">850 / 2000</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-[42%]"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="mt-8">
          <button 
            onClick={handleLogout}
            className="w-full p-4 glass-panel rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20 transition-all flex items-center justify-center gap-2 font-medium"
          >
              <LogOut size={18} />
              Sair da Conta
          </button>
      </div>

    </div>
  );
};