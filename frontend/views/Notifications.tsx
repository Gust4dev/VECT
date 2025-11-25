import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Info, Filter } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'success',
        title: 'Render Finalizado',
        desc: 'Modern Villa Concept está pronto para visualização.',
        time: 'Há 2 minutos',
        read: false
    },
    {
        id: 2,
        type: 'info',
        title: 'Atualização do Sistema',
        desc: 'Novos recursos de pincel foram adicionados ao editor.',
        time: 'Há 1 hora',
        read: false
    },
    {
        id: 3,
        type: 'warning',
        title: 'Limite de Armazenamento',
        desc: 'Você utilizou 80% do seu espaço em nuvem.',
        time: 'Há 3 horas',
        read: true
    },
    {
        id: 4,
        type: 'success',
        title: 'Pagamento Confirmado',
        desc: 'Sua assinatura Pro foi renovada com sucesso.',
        time: 'Ontem',
        read: true
    },
    {
        id: 5,
        type: 'info',
        title: 'Novo Comentário',
        desc: 'Maria curtiu seu projeto "Urban Office".',
        time: 'Há 2 dias',
        read: true
    }
];

export const Notifications: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 pb-16 min-h-[calc(100vh-8rem)] animate-fade-in-up">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Notificações</h1>
          <p className="text-zinc-400 text-lg font-light">Fique por dentro das atualizações do seu workspace</p>
        </div>
        <div className="flex gap-2">
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors border border-white/5">
                <Filter size={18} />
            </button>
             <button className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 rounded-lg text-blue-400 text-sm font-bold transition-colors border border-blue-500/20">
                Marcar todas como lidas
            </button>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((notif, index) => (
            <div 
                key={notif.id}
                className={`glass-panel rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:border-blue-500/30 group ${!notif.read ? 'bg-blue-900/10 border-blue-500/20' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/10 shadow-lg ${
                    notif.type === 'success' ? 'bg-green-500/10 text-green-500' :
                    notif.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-blue-500/10 text-blue-500'
                }`}>
                    {notif.type === 'success' && <CheckCircle2 size={20} />}
                    {notif.type === 'warning' && <AlertCircle size={20} />}
                    {notif.type === 'info' && <Info size={20} />}
                </div>
                
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-bold text-base ${!notif.read ? 'text-white' : 'text-zinc-300'}`}>{notif.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                             <Clock size={12} />
                             {notif.time}
                        </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{notif.desc}</p>
                </div>
                
                {!notif.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                )}
            </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
          <button className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">Carregar anteriores...</button>
      </div>
    </div>
  );
};