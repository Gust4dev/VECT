import React from 'react';
import { Sparkles, Loader2, Play, History, Share2 } from 'lucide-react';
import { EditVersion } from '../../../types';

interface PropertiesPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  versions: EditVersion[];
  activeVersionId: string | null;
  setActiveVersionId: (id: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  prompt,
  setPrompt,
  isGenerating,
  onGenerate,
  versions,
  activeVersionId,
  setActiveVersionId
}) => {
  return (
    <div className="w-[400px] glass-panel border-l-0 border-zinc-800/50 rounded-l-2xl flex flex-col my-4 mr-4 overflow-hidden animate-fade-in-up delay-300 z-20">
      <div className="p-6 pt-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
        <div className="flex items-center gap-2 mb-1">
           <Sparkles size={18} className="text-blue-400" />
           <h2 className="text-lg font-bold text-theme-title">Ajuste Fino IA</h2>
        </div>
        <p className="text-xs text-theme-body leading-relaxed">
           Selecione a área na imagem e descreva o que deseja alterar.
        </p>
      </div>

      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-50 transition duration-500 blur"></div>
              <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Trocar o piso por madeira clara, adicionar vegetação na parede..."
                  className="relative w-full h-36 input-theme rounded-xl p-4 text-sm focus:ring-0 focus:border-blue-500/50 outline-none resize-none transition-all shadow-inner"
              />
          </div>

          <button 
              onClick={onGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                  isGenerating 
                  ? 'bg-zinc-800 cursor-not-allowed opacity-70' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-blue-900/30 border border-blue-400/20'
              }`}
          >
              {isGenerating ? (
                  <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Processando...</span>
                  </>
              ) : (
                  <>
                      <Play size={20} fill="currentColor" />
                      <span>Gerar Variação</span>
                  </>
              )}
          </button>

          <div className="mt-4 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                      <History size={14} /> Histórico
                  </h3>
                  <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded-md text-zinc-400">{versions.length} Versões</span>
              </div>
              
              <div className="space-y-3">
                  {versions.map((version) => (
                      <div 
                          key={version.id}
                          onClick={() => setActiveVersionId(version.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 group relative overflow-hidden ${
                              activeVersionId === version.id 
                              ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                              : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-800/60 hover:border-white/10'
                          }`}
                      >
                          <div className="flex justify-between items-center mb-1 relative z-10">
                              <span className={`text-sm font-medium ${activeVersionId === version.id ? 'text-blue-300' : 'text-zinc-300'}`}>
                                  {version.name}
                              </span>
                              {activeVersionId === version.id && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                          </div>
                          {version.id !== 'original' && (
                              <p className="text-xs text-zinc-500 line-clamp-1 mt-1 relative z-10">
                                  {version.prompt}
                              </p>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur flex gap-3">
         <button className="flex-1 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 rounded-lg text-xs font-medium transition-colors border border-white/5">Download</button>
         <button className="px-3 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 rounded-lg transition-colors border border-white/5"><Share2 size={16} /></button>
      </div>
    </div>
  );
};
