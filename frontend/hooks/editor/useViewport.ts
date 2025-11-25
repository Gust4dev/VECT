import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useViewport = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    setScale(prev => Math.min(Math.max(0.1, prev + delta), 5));
  }, []);

  const startPan = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  }, [position]);

  const doPan = useCallback((clientX: number, clientY: number) => {
    if (isDragging) {
      setPosition({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const stopPan = useCallback(() => {
    setIsDragging(false);
  }, []);

  const zoomIn = useCallback(() => setScale(s => Math.min(5, s + 0.2)), []);
  const zoomOut = useCallback(() => setScale(s => Math.max(0.1, s - 0.2)), []);

  return {
    scale,
    position,
    isDragging,
    resetView,
    handleWheel,
    startPan,
    doPan,
    stopPan,
    zoomIn,
    zoomOut,
    setScale
  };
};
