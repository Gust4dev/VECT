import { useState, useCallback } from 'react';

export const useHistory = (initialState: ImageData | null = null) => {
  const [history, setHistory] = useState<ImageData[]>(initialState ? [initialState] : []);
  const [historyStep, setHistoryStep] = useState(initialState ? 0 : -1);

  const saveToHistory = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    setHistory(prev => {
      const newHistory = prev.slice(0, historyStep + 1);
      newHistory.push(currentData);
      return newHistory;
    });
    setHistoryStep(prev => prev + 1);
  }, [historyStep]);

  const undo = useCallback((ctx: CanvasRenderingContext2D) => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      ctx.putImageData(history[newStep], 0, 0);
      setHistoryStep(newStep);
      return true;
    }
    return false;
  }, [history, historyStep]);

  const redo = useCallback((ctx: CanvasRenderingContext2D) => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      ctx.putImageData(history[newStep], 0, 0);
      setHistoryStep(newStep);
      return true;
    }
    return false;
  }, [history, historyStep]);

  const resetHistory = useCallback((initialData?: ImageData) => {
    if (initialData) {
      setHistory([initialData]);
      setHistoryStep(0);
    } else {
      setHistory([]);
      setHistoryStep(-1);
    }
  }, []);

  return {
    historyStep,
    historyLength: history.length,
    saveToHistory,
    undo,
    redo,
    resetHistory,
    canUndo: historyStep > 0,
    canRedo: historyStep < history.length - 1
  };
};
