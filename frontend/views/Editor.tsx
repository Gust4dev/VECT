import React, { useState, useCallback } from 'react';
import { ToolSidebar } from '../components/ToolSidebar';
import { ToolType, EditVersion } from '../types';
import { Upload, X } from 'lucide-react';
import { useHistory } from '../hooks/editor/useHistory';
import { useViewport } from '../hooks/editor/useViewport';
import { useCanvas } from '../hooks/editor/useCanvas';
import { EditorCanvas } from './Editor/components/EditorCanvas';
import { FloatingToolbar } from './Editor/components/FloatingToolbar';
import { PropertiesPanel } from './Editor/components/PropertiesPanel';

export const Editor: React.FC = () => {
  // --- State Management ---
  const [activeTool, setActiveTool] = useState<ToolType>('brush');
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [versions, setVersions] = useState<EditVersion[]>([]);
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState(40);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [hasMask, setHasMask] = useState(false);

  // --- Hooks ---
  const { 
    saveToHistory, 
    undo, 
    redo, 
    resetHistory, 
    canUndo, 
    canRedo 
  } = useHistory();

  const {
    scale,
    position,
    isDragging,
    resetView,
    handleWheel,
    startPan,
    doPan,
    stopPan,
    zoomIn,
    zoomOut
  } = useViewport();

  const {
    containerRef,
    canvasRef,
    imageRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    initCanvas,
    clearCanvas,
    isDrawing
  } = useCanvas({
    scale,
    activeTool,
    brushSize,
    saveToHistory,
    onMaskChange: setHasMask
  });

  // --- Handlers ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setMainImage(event.target.result);
          setVersions([{
            id: 'original',
            imageUrl: event.target.result,
            prompt: 'Upload Original',
            timestamp: Date.now(),
            name: 'Versão Original'
          }]);
          setActiveVersionId('original');
          resetView();
          resetHistory();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateClick = async () => {
    setShowFeatureModal(true);
  };

  const currentImageSrc = versions.find(v => v.id === activeVersionId)?.imageUrl;

  // --- Render ---
  if (!mainImage) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] animate-fade-in-up">
        <div className="glass-panel p-12 rounded-3xl flex flex-col items-center gap-8 border border-white/10 max-w-xl w-full mx-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="w-32 h-32 bg-zinc-900/50 rounded-full flex items-center justify-center border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 group-hover:scale-110 transition-transform duration-500">
            <Upload size={48} className="text-zinc-400 group-hover:text-blue-400 transition-colors duration-300" />
          </div>
          
          <div className="text-center relative z-10">
            <h3 className="text-3xl font-bold text-theme-title mb-3 tracking-tight">Novo Projeto</h3>
            <p className="text-lg text-theme-body mb-10 font-light">Carregue seu render para começar a edição com IA</p>
            <label className="relative inline-flex group/btn cursor-pointer">
                <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover/btn:opacity-100 group-hover/btn:-inset-1 group-hover/btn:duration-200 animate-tilt"></div>
                <div className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-zinc-900 font-pj rounded-xl">
                    Selecionar Imagem
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] overflow-hidden relative">
      <ToolSidebar 
        activeTool={activeTool} 
        setActiveTool={setActiveTool} 
        brushSize={brushSize}
        setBrushSize={setBrushSize}
      />

      <EditorCanvas
        containerRef={containerRef}
        canvasRef={canvasRef}
        imageRef={imageRef}
        mainImage={mainImage}
        currentImageSrc={currentImageSrc}
        scale={scale}
        position={position}
        activeTool={activeTool}
        isDragging={isDragging}
        hasMask={hasMask}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClearMask={clearCanvas}
        onInitCanvas={initCanvas}
        onStartPan={startPan}
        onDoPan={doPan}
        onStopPan={stopPan}
      />

      <FloatingToolbar
        scale={scale}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetView={resetView}
        undo={() => {
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) undo(ctx);
            }
        }}
        redo={() => {
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) redo(ctx);
            }
        }}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <PropertiesPanel
        prompt={prompt}
        setPrompt={setPrompt}
        isGenerating={isGenerating}
        onGenerate={handleGenerateClick}
        versions={versions}
        activeVersionId={activeVersionId}
        setActiveVersionId={setActiveVersionId}
      />

      {/* Feature Coming Soon Modal */}
      {showFeatureModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up">
            <div className="glass-panel p-8 rounded-3xl max-w-sm w-full mx-4 text-center border border-white/10 shadow-2xl relative">
                <button 
                    onClick={() => setShowFeatureModal(false)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
                
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 relative flex items-center justify-center animate-pulse">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-500 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                            <path d="M20 4L4 12V28L20 36L36 28V12L20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20 4V20M36 12L20 20M4 12L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20 36V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20 20L28 16L20 12L12 16L20 20Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1"/>
                        </svg>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-theme-title mb-2">Funcionalidade em Breve!</h3>
                <p className="text-theme-body text-sm leading-relaxed mb-6">
                    A geração via IA está sendo aprimorada para oferecer resultados ainda mais realistas.
                </p>

                <button 
                    onClick={() => setShowFeatureModal(false)}
                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                >
                    Entendi
                </button>
            </div>
        </div>
      )}
    </div>
  );
};