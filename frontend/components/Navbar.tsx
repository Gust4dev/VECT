import React, { useState, useRef, useEffect } from 'react';
import { Bell, Settings, LayoutGrid, PenTool, MessageSquare, Mail, User, Moon, Sun, Globe, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/authService';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [userName, setUserName] = React.useState('Usuário');
  const [userInitials, setUserInitials] = React.useState('U');
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await import('../services/supabaseClient').then(m => m.supabase.auth.getUser());
      if (user && user.user_metadata?.full_name) {
        const name = user.user_metadata.full_name;
        setUserName(name);
        setUserInitials(name.substring(0, 2).toUpperCase());
      }
    };
    getUser();

    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => currentPath === path;

  const handleLogout = async () => {
    await authService.signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-4 z-50 px-4 lg:px-8 animate-fade-in-up">
      <div className="bg-white/90 dark:bg-[#121214]/90 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/5 dark:shadow-black/20 relative">
        
        {/* Logo Area */}
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/dashboard')}
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
            <span className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 group-hover:from-blue-400 group-hover:to-blue-200 transition-all">VECT</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-900/50 rounded-xl p-1 border border-black/5 dark:border-white/5">
            <NavButton 
              active={isActive('/dashboard')} 
              onClick={() => navigate('/dashboard')} 
              icon={<LayoutGrid size={16} />} 
              label="Início" 
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
                isActive('/notifications') ? 'bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white' : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <Bell size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-black animate-pulse"></span>
            </button>
            
            {/* Settings Dropdown */}
            <div className="relative" ref={settingsRef}>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2.5 transition-all rounded-full group ${
                  showSettings || isActive('/settings') ? 'bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white' : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-4 w-72 bg-white dark:bg-[#0B0E14] border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-2 space-y-1">
                      <div className="px-3 py-2 mb-2 border-b border-black/5 dark:border-white/5">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">Configurações Rápidas</p>
                      </div>
                      
                      <SettingsItem icon={<User size={16} />} label="Perfil" onClick={() => navigate('/profile')} />
                      <SettingsItem icon={<Bell size={16} />} label="Notificações" onClick={() => navigate('/notifications')} />
                      <SettingsItem icon={<Globe size={16} />} label="Idioma" onClick={() => {}} />
                      <SettingsItem icon={<CreditCard size={16} />} label="Cobrança" onClick={() => {}} />
                      
                      <div className="my-2 border-t border-white/5"></div>
                      
                      <SettingsItem 
                        icon={theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />} 
                        label={`Tema: ${theme === 'dark' ? 'Escuro' : 'Claro'}`} 
                        onClick={() => {
                          // Trigger animation first
                          const btn = document.getElementById('theme-toggle-btn');
                          if (btn) {
                            btn.classList.add('active');
                            setTimeout(() => {
                              toggleTheme();
                              btn.classList.remove('active');
                            }, 300); // Wait for slide animation
                          } else {
                            toggleTheme();
                          }
                        }}
                        id="theme-toggle-btn"
                        className="fill-animation hover:bg-transparent"
                      />
                      
                      <div className="my-2 border-t border-black/5 dark:border-white/5"></div>

                      <button 
                        onClick={() => { setShowSettings(false); navigate('/settings'); }}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors group"
                      >
                        <span className="flex items-center gap-3">
                          <Settings size={16} />
                          Configurações Avançadas
                        </span>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <div className="my-2 border-t border-white/5"></div>

                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        Sair da Conta
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div 
            className="flex items-center gap-3 pl-5 border-l border-black/5 dark:border-white/10 cursor-pointer group"
            onClick={() => navigate('/profile')}
          >
            <div className="text-right hidden sm:block">
              <p className={`text-sm font-semibold transition-colors ${isActive('/profile') ? 'text-blue-400' : 'text-zinc-900 dark:text-white group-hover:text-blue-400'}`}>{userName}</p>
              <p className="text-[10px] uppercase tracking-wider text-zinc-900 dark:text-zinc-500 font-bold">Pro Plan</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-all duration-300 border ${
               isActive('/profile') 
               ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)] border-blue-400' 
               : 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-[0_0_15px_rgba(37,99,235,0.3)] border-blue-400/30 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]'
            }`}>
              {userInitials}
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
        ? 'text-zinc-900 dark:text-white shadow-lg' 
        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
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

const SettingsItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; className?: string; id?: string }> = ({ icon, label, onClick, className = '', id }) => (
  <button 
    id={id}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors ${className}`}
  >
    {icon}
    {label}
  </button>
);