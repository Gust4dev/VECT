import React, { useState } from 'react';
import { Moon, Bell, Shield, Sun, Monitor, Globe, CreditCard, ChevronRight, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [highQuality, setHighQuality] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-5xl mx-auto p-8 pb-16 min-h-[calc(100vh-8rem)] animate-fade-in-up">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Configurações</h1>
        <p className="text-zinc-400 text-lg font-light">Gerencie suas preferências e ajustes do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Menu */}
        <div className="lg:col-span-3">
            <div className="glass-panel rounded-2xl p-2 sticky top-24">
                {[
                    { icon: <Monitor size={18} />, label: "Geral", active: true },
                    { icon: <Bell size={18} />, label: "Notificações", active: false },
                    { icon: <Shield size={18} />, label: "Privacidade", active: false },
                    { icon: <CreditCard size={18} />, label: "Cobrança", active: false },
                    { icon: <Globe size={18} />, label: "Idioma", active: false },
                ].map((item, idx) => (
                    <button 
                        key={idx}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            item.active 
                            ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-6">
            
            {/* Preferences Section */}
            <div className="glass-panel rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Monitor size={20} className="text-blue-500" />
                    Preferências do Editor
                </h3>
                
                <div className="space-y-6">
                    <ToggleItem 
                        label="Renderização em Alta Definição"
                        desc="Sempre gerar pré-visualizações na qualidade máxima (consome mais dados)"
                        checked={highQuality}
                        onChange={() => setHighQuality(!highQuality)}
                    />
                     <div className="h-px bg-white/5" />
                    <ToggleItem 
                        label="Salvamento Automático"
                        desc="Salvar alterações no projeto a cada 2 minutos"
                        checked={autoSave}
                        onChange={() => setAutoSave(!autoSave)}
                    />
                    <div className="h-px bg-white/5" />
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="text-white font-medium">Tema da Interface</p>
                            <p className="text-xs text-zinc-500 mt-1">Selecione a aparência do editor</p>
                        </div>
                        <div className="flex gap-2 bg-black/40 p-1 rounded-lg border border-white/10">
                            <button 
                                onClick={() => setTheme('dark')}
                                className={`p-2 rounded-md transition-all ${theme === 'dark' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                <Moon size={16}/>
                            </button>
                            <button 
                                onClick={() => setTheme('light')}
                                className={`p-2 rounded-md transition-all ${theme === 'light' ? 'bg-white text-black shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                <Sun size={16}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="glass-panel rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Bell size={20} className="text-blue-500" />
                    Notificações
                </h3>
                
                <div className="space-y-6">
                    <ToggleItem 
                        label="Alertas por Email"
                        desc="Receber atualizações de renderização e faturas por email"
                        checked={emailNotif}
                        onChange={() => setEmailNotif(!emailNotif)}
                    />
                     <div className="h-px bg-white/5" />
                    <ToggleItem 
                        label="Notificações Push"
                        desc="Receber alertas no navegador quando um render finalizar"
                        checked={pushNotif}
                        onChange={() => setPushNotif(!pushNotif)}
                    />
                </div>
            </div>

            {/* Account Section */}
            <div className="glass-panel rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-blue-500" />
                    Conta e Segurança
                </h3>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 mb-4 group cursor-pointer hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400">
                             ********
                        </div>
                        <div>
                            <p className="text-white font-medium">Alterar Senha</p>
                            <p className="text-xs text-zinc-500">Última alteração há 3 meses</p>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-zinc-600 group-hover:text-blue-400" />
                </div>

                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group cursor-pointer hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-green-500">
                            <Check size={18} />
                        </div>
                        <div>
                            <p className="text-white font-medium">Autenticação de Dois Fatores</p>
                            <p className="text-xs text-zinc-500">Ativado via App Autenticador</p>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-zinc-600 group-hover:text-blue-400" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ToggleItem: React.FC<{ label: string; desc: string; checked: boolean; onChange: () => void }> = ({ label, desc, checked, onChange }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="text-white font-medium">{label}</p>
            <p className="text-xs text-zinc-500 mt-1">{desc}</p>
        </div>
        <button 
            onClick={onChange}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${checked ? 'bg-blue-600' : 'bg-zinc-700'}`}
        >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    </div>
);