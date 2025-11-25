import { useRef, useState, useCallback, useEffect } from 'react';
import { ToolType } from '../../types';

interface UseCanvasProps {
  scale: number;
  activeTool: ToolType;
  brushSize: number;
  saveToHistory: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  onMaskChange: (hasMask: boolean) => void;
}

export const useCanvas = ({
  scale,
  activeTool,
  brushSize,
  saveToHistory,
  onMaskChange
}: UseCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);

  const getImgCoordinates = useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current || !containerRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / scale;
    const y = (clientY - rect.top) / scale;
    return { x, y };
  }, [scale]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (activeTool === 'pan' || e.button === 1 || activeTool === 'move') {
      return; // Handled by viewport
    }

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const coords = getImgCoordinates(e.clientX, e.clientY);
    setIsDrawing(true);

    if (activeTool === 'rect' || activeTool === 'circle') {
       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    if (activeTool === 'brush' || activeTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.globalCompositeOperation = activeTool === 'brush' ? 'source-over' : 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.7)'; 
      ctx.lineTo(coords.x, coords.y); 
      ctx.stroke();
    } else if (activeTool === 'rect' || activeTool === 'circle') {
      setStartPos(coords);
      setSnapshot(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    }
  }, [activeTool, brushSize, getImgCoordinates, scale]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const coords = getImgCoordinates(e.clientX, e.clientY);

    if (activeTool === 'brush' || activeTool === 'eraser') {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (activeTool === 'rect' || activeTool === 'circle') {
      if (snapshot) {
        ctx.putImageData(snapshot, 0, 0);
        
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();

        const width = coords.x - startPos.x;
        const height = coords.y - startPos.y;

        if (activeTool === 'rect') {
          ctx.rect(startPos.x, startPos.y, width, height);
        } else {
          const radiusX = Math.abs(width) / 2;
          const radiusY = Math.abs(height) / 2;
          const centerX = startPos.x + width / 2;
          const centerY = startPos.y + height / 2;
          ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        }
        
        ctx.fill();
        ctx.stroke();
      }
    }
  }, [isDrawing, activeTool, getImgCoordinates, snapshot, startPos]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing) {
        setIsDrawing(false);
        setSnapshot(null);
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
             saveToHistory(ctx, canvasRef.current);
             onMaskChange(true);
          }
        }
    }
  }, [isDrawing, saveToHistory, onMaskChange]);

  const clearCanvas = useCallback(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        onMaskChange(false);
        saveToHistory(ctx, canvasRef.current);
      }
    }
  }, [saveToHistory, onMaskChange]);

  const initCanvas = useCallback(() => {
    if (canvasRef.current && imageRef.current) {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Save initial blank state
        saveToHistory(ctx, canvas);
      }
      onMaskChange(false);
    }
  }, [saveToHistory, onMaskChange]);

  return {
    containerRef,
    canvasRef,
    imageRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    initCanvas,
    clearCanvas,
    isDrawing
  };
};
