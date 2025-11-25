import React from 'react';
import { Mail, Phone, Clock, MessageSquare, Send, ChevronRight } from 'lucide-react';

export const Support: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 pb-16 min-h-[calc(100vh-8rem)] animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Central de Suporte</h1>
        <p className="text-zinc-400 text-lg font-light">Estamos aqui para ajudar você a aproveitar ao máximo o VECT</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="glass-panel rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
               Fale Conosco
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-blue-500 border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide font-bold mb-1">Email</p>
                  <p className="text-zinc-200 font-medium group-hover:text-blue-400 transition-colors">suporte@vect.ai</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-blue-500 border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                   <p className="text-xs text-zinc-500 uppercase tracking-wide font-bold mb-1">Telefone</p>
                  <p className="text-zinc-200 font-medium group-hover:text-blue-400 transition-colors">+55 11 99999-9999</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-blue-500 border border-white/10 shadow-lg">
                  <Clock size={20} />
                </div>
                <div>
                   <p className="text-xs text-zinc-500 uppercase tracking-wide font-bold mb-1">Horário</p>
                  <p className="text-zinc-200 font-medium">Seg - Sex: 9h às 18h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 bg-gradient-to-br from-blue-900/10 to-transparent border-blue-500/20">
            <h3 className="text-lg font-bold text-white mb-6">Status do Serviço</h3>
            <div className="space-y-5">
               <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400">API Response</span>
                      <span className="text-green-400 font-bold text-xs bg-green-900/30 px-2 py-1 rounded-md border border-green-500/20">Operational</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400">Image Processing</span>
                      <span className="text-green-400 font-bold text-xs bg-green-900/30 px-2 py-1 rounded-md border border-green-500/20">Operational</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Form */}
        <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel rounded-3xl p-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    <MessageSquare size={28} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Abrir Ticket</h3>
                    <p className="text-zinc-400 text-sm">Descreva seu problema e nossa equipe técnica analisará</p>
                </div>
            </div>

            <form className="space-y-6 relative z-10">
                <div className="group">
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">Assunto</label>
                    <input type="text" placeholder="Ex: Problema ao exportar render" className="w-full bg-black/20 border border-zinc-700/50 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all focus:bg-black/40" />
                </div>

                <div className="group">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">Mensagem</label>
                <textarea placeholder="Descreva seu problema em detalhes..." className="w-full h-56 bg-black/20 border border-zinc-700/50 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none focus:bg-black/40"></textarea>
                </div>

                <div className="pt-2">
                <button type="button" className="w-full md:w-auto bg-white text-black hover:bg-blue-50 px-10 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-3 hover:-translate-y-1">
                    <span>Enviar Ticket</span>
                    <Send size={18} />
                </button>
                </div>
            </form>
            </div>

            <div className="glass-panel rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 px-2">Perguntas Frequentes</h3>
                <div className="space-y-2">
                    {[
                        "Como posso gerar um novo render?",
                        "Quais formatos de arquivo são suportados?",
                        "Onde meus projetos são salvos?",
                        "Como alterar meu plano?"
                    ].map((question, i) => (
                        <div key={i} className="group border border-white/5 hover:border-blue-500/30 bg-white/5 hover:bg-white/10 rounded-xl p-4 cursor-pointer transition-all duration-300 flex justify-between items-center">
                            <span className="text-zinc-300 font-medium group-hover:text-white">{question}</span>
                            <ChevronRight size={18} className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};