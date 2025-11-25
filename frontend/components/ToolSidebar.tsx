import React from 'react';
import { Brush, Eraser, Hand, MousePointer2, BoxSelect, Circle, Wand2, Sliders } from 'lucide-react';
import { ToolType } from '../types';

interface ToolSidebarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
}

export const ToolSidebar: React.FC<ToolSidebarProps> = ({ activeTool, setActiveTool, brushSize, setBrushSize }) => {
  return (
    <aside className="w-72 glass-panel border-r-0 border-zinc-800/50 rounded-r-2xl flex flex-col py-6 px-4 gap-3 h-[calc(100vh-8rem)] my-4 ml-4 overflow-y-auto custom-scrollbar animate-fade-in-up delay-100 z-20">
      <div className="flex items-center gap-2 mb-4 px-2">
        <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
        <div className="text-sm font-bold text-white tracking-wide uppercase">Ferramentas</div>
      </div>
      
      {/* Primary Tools */}
      <div className="space-y-1">
        <ToolButton 
          active={activeTool === 'brush'} 
          onClick={() => setActiveTool('brush')} 
          icon={<Brush size={18} />} 
          label="Pincel"
          desc="Desenhar máscara"
        />
        <ToolButton 
          active={activeTool === 'eraser'} 
          onClick={() => setActiveTool('eraser')} 
          icon={<Eraser size={18} />} 
          label="Borracha"
          desc="Remover máscara"
        />
      </div>

      {/* Brush Settings (Only visible for Paint/Erase) */}
      {(activeTool === 'brush' || activeTool === 'eraser') && (
        <div className="bg-zinc-900/40 rounded-xl p-4 my-2 border border-white/5 animate-fade-in-up">
           <div className="flex justify-between text-xs text-zinc-400 mb-2 font-medium">
              <span className="flex items-center gap-1"><Sliders size={12}/> Tamanho</span>
              <span>{brushSize}px</span>
           </div>
           <input 
              type="range" 
              min="5" 
              max="200" 
              value={brushSize} 
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
           />
        </div>
      )}
      
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />
      
      {/* Selection Tools */}
      <div className="space-y-1">
        <ToolButton 
          active={activeTool === 'rect'} 
          onClick={() => setActiveTool('rect')} 
          icon={<BoxSelect size={18} />} 
          label="Retângulo"
          desc="Seleção quadrada"
        />
        <ToolButton 
          active={activeTool === 'circle'} 
          onClick={() => setActiveTool('circle')} 
          icon={<Circle size={18} />} 
          label="Círculo"
          desc="Seleção elíptica"
        />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

      {/* Navigation Tools */}
      <div className="space-y-1">
        <ToolButton 
          active={activeTool === 'move'} 
          onClick={() => setActiveTool('move')} 
          icon={<MousePointer2 size={18} />} 
          label="Cursor"
          desc="Seleção neutra"
        />
         <ToolButton 
          active={activeTool === 'pan'} 
          onClick={() => setActiveTool('pan')} 
          icon={<Hand size={18} />} 
          label="Pan"
          desc="Mover visualização"
        />
      </div>

      <div className="mt-auto bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-4 border border-blue-500/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-blue-400 mb-2">
           <Wand2 size={16} />
           <span className="text-xs font-bold uppercase">Dica Pro</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
           Use o <strong>Scroll</strong> do mouse para Zoom e segure <strong>Espaço</strong> para ativar o Pan temporariamente.
        </p>
      </div>
    </aside>
  );
};

const ToolButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; desc: string }> = ({
  active, onClick, icon, label, desc
}) => (
  <button
    onClick={onClick}
    className={`group flex items-center gap-3 px-3 py-3 w-full rounded-xl text-left transition-all duration-200 border border-transparent ${
      active 
        ? 'bg-blue-600/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
        : 'hover:bg-white/5 hover:border-white/5'
    }`}
  >
    <div className={`p-2 rounded-lg transition-all duration-200 ${active ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-zinc-900/50 text-zinc-400 group-hover:text-white group-hover:bg-zinc-800'}`}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className={`text-sm font-medium transition-colors ${active ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{label}</span>
      <span className={`text-[10px] transition-colors ${active ? 'text-blue-200' : 'text-zinc-600 group-hover:text-zinc-500'}`}>{desc}</span>
    </div>
  </button>
);