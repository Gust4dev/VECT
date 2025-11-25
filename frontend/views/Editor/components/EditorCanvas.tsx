import React from 'react';
import { X } from 'lucide-react';
import { ToolType } from '../../../types';

interface EditorCanvasProps {
  containerRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  mainImage: string | null;
  currentImageSrc: string | undefined;
  scale: number;
  position: { x: number; y: number };
  activeTool: ToolType;
  isDragging: boolean;
  hasMask: boolean;
  onWheel: (e: React.WheelEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onClearMask: () => void;
  onInitCanvas: () => void;
  onStartPan: (x: number, y: number) => void;
  onDoPan: (x: number, y: number) => void;
  onStopPan: () => void;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  containerRef,
  canvasRef,
  imageRef,
  mainImage,
  currentImageSrc,
  scale,
  position,
  activeTool,
  isDragging,
  hasMask,
  onWheel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onClearMask,
  onInitCanvas,
  onStartPan,
  onDoPan,
  onStopPan
}) => {
  return (
    <div 
      ref={containerRef}
      className="flex-1 relative overflow-hidden bg-[#020203] cursor-gray-900 select-none animate-fade-in-up delay-200"
      onWheel={onWheel}
      onMouseDown={(e) => {
          if(e.target === containerRef.current) {
              onStartPan(e.clientX, e.clientY);
          }
      }}
      onMouseMove={(e) => {
          if (isDragging && e.target === containerRef.current) {
              onDoPan(e.clientX, e.clientY);
          }
      }}
      onMouseUp={onStopPan}
    >
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', 
          backgroundSize: '20px 20px',
          transform: `translate(${position.x}px, ${position.y}px)` 
        }} 
      />

      {/* Canvas Wrapper */}
      <div 
        className="absolute origin-top-left transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          top: '50%',
          left: '50%',
          marginTop: imageRef.current ? -(imageRef.current.naturalHeight * scale) / 2 : 0,
          marginLeft: imageRef.current ? -(imageRef.current.naturalWidth * scale) / 2 : 0,
        }}
      >
        <div className="relative shadow-2xl">
           <img 
              ref={imageRef}
              src={currentImageSrc || mainImage || ''} 
              alt="Workspace" 
              className="block select-none pointer-events-none"
              onLoad={onInitCanvas}
              style={{ maxWidth: 'none' }}
           />
           <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ 
                  cursor: activeTool === 'pan' ? 'grab' : 
                          activeTool === 'move' ? 'default' : 
                          activeTool === 'brush' || activeTool === 'eraser' ? 'none' : 'crosshair' 
              }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
           />
           
           {(activeTool === 'brush' || activeTool === 'eraser') && !isDragging && (
               <div 
                  className="pointer-events-none fixed border border-white/50 bg-blue-500/20 rounded-full z-50 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]"
                  style={{ display: 'none' }} 
               />
           )}
        </div>
      </div>
      
      {hasMask && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-xl flex items-center gap-3 animate-fade-in-up z-30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-white">Máscara Ativa</span>
              <button 
                  onClick={onClearMask}
                  className="ml-2 bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                  <X size={14} className="text-zinc-300" />
              </button>
          </div>
      )}
    </div>
  );
};
