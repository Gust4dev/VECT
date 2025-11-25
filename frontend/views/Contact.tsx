import React from 'react';
import { MapPin, Mail, Phone, Building2, Globe, Linkedin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 pb-16 min-h-[calc(100vh-8rem)] animate-fade-in-up">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">Entre em Contato</h1>
        <p className="text-zinc-400 text-lg font-light max-w-2xl mx-auto">Vamos conversar sobre como o VECT pode transformar seus projetos de arquitetura com inteligência artificial.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-500"><Building2 size={20} /></div>
                VECT Studios
            </h3>
            
            <div className="space-y-8 flex-1">
              <div className="flex items-start gap-5 group">
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-blue-500 shrink-0 border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-wide mb-1">Endereço</p>
                  <p className="text-zinc-200 text-sm leading-relaxed">Av. Arquitetura, 9999<br/>Bairro Design - São Paulo, SP<br/>CEP: 99999-999</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-blue-500 shrink-0 border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                  <Mail size={18} />
                </div>
                <div>
                   <p className="text-xs text-zinc-500 font-bold uppercase tracking-wide mb-1">Email</p>
                  <p className="text-zinc-200 text-sm font-medium hover:text-blue-400 transition-colors cursor-pointer">contato@vect.ai</p>
                  <p className="text-zinc-200 text-sm font-medium hover:text-blue-400 transition-colors cursor-pointer">vendas@vect.ai</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-blue-500 shrink-0 border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                  <Phone size={18} />
                </div>
                <div>
                   <p className="text-xs text-zinc-500 font-bold uppercase tracking-wide mb-1">Telefones</p>
                  <p className="text-zinc-200 text-sm font-medium hover:text-blue-400 transition-colors cursor-pointer">+55 11 99999-9999</p>
                  <p className="text-zinc-200 text-sm font-medium hover:text-blue-400 transition-colors cursor-pointer">+55 11 99999-9998</p>
                </div>
              </div>
            </div>

             <div className="pt-8 mt-8 border-t border-white/10">
                <div className="flex gap-3">
                <a href="#" className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300">
                    <Globe size={16} />
                    <span className="text-xs font-bold">Website</span>
                </a>
                <a href="#" className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-300 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300">
                    <Linkedin size={16} />
                    <span className="text-xs font-bold">LinkedIn</span>
                </a>
                </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-8">
          <div className="glass-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-white mb-2">Envie uma Mensagem</h3>
              <p className="text-zinc-400">Nossa equipe responderá sua solicitação em até 24 horas</p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">Nome Completo</label>
                  <input type="text" placeholder="Seu nome" className="w-full bg-black/20 border border-zinc-700/50 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all focus:bg-black/40" />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">Email Corporativo</label>
                  <input type="email" placeholder="seuemail@exemplo.com" className="w-full bg-black/20 border border-zinc-700/50 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all focus:bg-black/40" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">Telefone</label>
                  <input type="tel" placeholder="(11) 99999-9999" className="w-full bg-black/20 border border-zinc-700/50 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all focus:bg-black/40" />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">Empresa</label>
                  <input type="text" placeholder="Nome da sua empresa" className="w-full bg-black/20 border border-zinc-700/50 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all focus:bg-black/40" />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">Mensagem</label>
                <textarea placeholder="Como podemos ajudar você?" className="w-full h-40 bg-black/20 border border-zinc-700/50 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none focus:bg-black/40"></textarea>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                 <p className="text-xs text-zinc-500 max-w-xs">
                   Ao enviar, você concorda com nossa <a href="#" className="text-blue-400 hover:underline">Política de Privacidade</a>.
                </p>
                 <button type="button" className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] flex items-center justify-center gap-3 hover:scale-105 active:scale-95">
                    <span>Enviar Mensagem</span>
                    <Send size={18} />
                 </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};