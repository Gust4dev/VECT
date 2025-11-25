import React from 'react';
import { ZoomIn, ZoomOut, Maximize, Undo, Redo } from 'lucide-react';

interface FloatingToolbarProps {
  scale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  scale,
  zoomIn,
  zoomOut,
  resetView,
  undo,
  redo,
  canUndo,
  canRedo
}) => {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 glass-panel px-6 py-2 rounded-full flex items-center gap-6 shadow-2xl border border-white/10 pointer-events-auto">
        <div className="flex items-center gap-2">
            <button 
              onClick={zoomOut}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
            >
                <ZoomOut size={18} />
            </button>
            <span className="text-sm font-mono w-12 text-center text-zinc-300">{Math.round(scale * 100)}%</span>
            <button 
              onClick={zoomIn}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
            >
                <ZoomIn size={18} />
            </button>
        </div>
        <div className="w-px h-4 bg-white/10"></div>
        <div className="flex items-center gap-2">
            <button 
              onClick={resetView}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
              title="Reset View"
            >
                <Maximize size={18} />
            </button>
        </div>
        <div className="w-px h-4 bg-white/10"></div>
        <div className="flex items-center gap-2">
            <button 
                onClick={undo}
                disabled={!canUndo}
                className={`p-2 rounded-full transition-colors ${!canUndo ? 'text-zinc-600 cursor-not-allowed' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
            >
                <Undo size={18} />
            </button>
            <button 
                onClick={redo}
                disabled={!canRedo}
                className={`p-2 rounded-full transition-colors ${!canRedo ? 'text-zinc-600 cursor-not-allowed' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
            >
                <Redo size={18} />
            </button>
        </div>
    </div>
  );
};
