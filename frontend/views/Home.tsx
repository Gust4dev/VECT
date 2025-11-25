import React from 'react';
import { Plus, Clock, MoreVertical, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Modern Villa Concept',
    description: 'Exterior render - golden hour lighting adjustments',
    thumbnail: 'https://picsum.photos/800/600?random=1',
    lastModified: 'há 2 horas'
  },
  {
    id: '2',
    name: 'Urban Office Complex',
    description: 'Facade material exploration',
    thumbnail: 'https://picsum.photos/800/600?random=2',
    lastModified: 'Ontem'
  },
  {
    id: '3',
    name: 'Residential Tower',
    description: 'Lobby interior visualization',
    thumbnail: 'https://picsum.photos/800/600?random=3',
    lastModified: 'há 3 dias'
  },
  {
    id: '4',
    name: 'Minimalist Beach House',
    description: 'Adding vegetation to foreground',
    thumbnail: 'https://picsum.photos/800/600?random=4',
    lastModified: 'há 5 dias'
  },
  {
    id: '5',
    name: 'Industrial Loft Conversion',
    description: 'Interior lighting setup',
    thumbnail: 'https://picsum.photos/800/600?random=5',
    lastModified: 'há 1 semana'
  },
  {
    id: '6',
    name: 'Sustainable Campus Design',
    description: 'Green roof integration',
    thumbnail: 'https://picsum.photos/800/600?random=6',
    lastModified: 'há 2 semanas'
  }
];

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-[calc(100vh-8rem)] animate-fade-in-up">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">Meus Projetos</h1>
          <p className="text-zinc-400 text-lg font-light">Gerencie e refine suas visualizações arquitetônicas com IA</p>
        </div>
        <button 
          onClick={() => navigate('/editor')}
          className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 border border-blue-400/30"
        >
          <Plus size={22} className="group-hover:rotate-90 transition-transform duration-300" />
          Novo Projeto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PROJECTS.map((project, index) => (
          <div 
            key={project.id} 
            className="group glass-panel rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 cursor-pointer flex flex-col animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate('/editor')}
          >
            <div className="h-60 overflow-hidden relative">
              <img 
                src={project.thumbnail} 
                alt={project.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Overlay Actions */}
              <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                  VECT Edit
                </div>
                <button className="p-2 bg-black/40 backdrop-blur-md rounded-lg text-white hover:bg-blue-600 transition-colors border border-white/10">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-[2px]">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 text-white transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                    <ArrowRight size={24} />
                 </div>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-black/20">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{project.name}</h3>
                <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{project.description}</p>
              </div>
              <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/5">
                 <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Clock size={14} className="text-blue-500" />
                  <span>Editado {project.lastModified}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center text-[10px] text-zinc-300 font-bold shadow-inner">JS</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};