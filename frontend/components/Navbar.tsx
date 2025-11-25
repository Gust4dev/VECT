import React from 'react';
import { Bell, Settings, LayoutGrid, PenTool, MessageSquare, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="sticky top-4 z-50 px-4 lg:px-8 animate-fade-in-up">
      <div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/20">
        
        {/* Logo Area */}
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 relative flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
               {/* Logo VECT Concept */}
               <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-500 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  <path d="M20 4L4 12V28L20 36L36 28V12L20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 4V20M36 12L20 20M4 12L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 36V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20L28 16L20 12L12 16L20 20Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1"/>
               </svg>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 group-hover:from-blue-400 group-hover:to-blue-200 transition-all">VECT</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-zinc-900/50 rounded-xl p-1 border border-white/5">
            <NavButton 
              active={isActive('/')} 
              onClick={() => navigate('/')} 
              icon={<LayoutGrid size={16} />} 
              label="Home" 
            />
            <NavButton 
              active={isActive('/editor')} 
              onClick={() => navigate('/editor')} 
              icon={<PenTool size={16} />} 
              label="Editor" 
            />
            <NavButton 
              active={isActive('/support')} 
              onClick={() => navigate('/support')} 
              icon={<MessageSquare size={16} />} 
              label="Suporte" 
            />
            <NavButton 
              active={isActive('/contact')} 
              onClick={() => navigate('/contact')} 
              icon={<Mail size={16} />} 
              label="Contato" 
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/notifications')}
              className={`relative p-2.5 transition-all rounded-full group ${
                isActive('/notifications') ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Bell size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-black animate-pulse"></span>
            </button>
            <button 
              onClick={() => navigate('/settings')}
              className={`p-2.5 transition-all rounded-full group ${
                isActive('/settings') ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
          
          <div 
            className="flex items-center gap-3 pl-5 border-l border-white/10 cursor-pointer group"
            onClick={() => navigate('/profile')}
          >
            <div className="text-right hidden sm:block">
              <p className={`text-sm font-semibold transition-colors ${isActive('/profile') ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}`}>João Silva</p>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Pro Plan</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-all duration-300 border ${
               isActive('/profile') 
               ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)] border-blue-400' 
               : 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-[0_0_15px_rgba(37,99,235,0.3)] border-blue-400/30 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]'
            }`}>
              JS
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ 
  active, onClick, icon, label 
}) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden ${
      active 
        ? 'text-white shadow-lg' 
        : 'text-zinc-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {active && (
      <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
    )}
    <span className="relative z-10 flex items-center gap-2">
      {React.cloneElement(icon as React.ReactElement<any>, { 
        className: active ? 'text-blue-400' : 'text-current',
        strokeWidth: active ? 2.5 : 2
      })}
      {label}
    </span>
    {active && (
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
    )}
  </button>
);