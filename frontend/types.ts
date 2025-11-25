import React from 'react';



export interface Project {
  id: string;
  name: string;
  thumbnail: string;
  lastModified: string;
  description: string;
}

export interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface EditVersion {
  id: string;
  imageUrl: string;
  prompt: string;
  timestamp: number;
  name: string;
}

export type ToolType = 'brush' | 'eraser' | 'move' | 'rect' | 'circle' | 'pan';