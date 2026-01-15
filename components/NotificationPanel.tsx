
import React from 'react';
import { AppNotification } from '../types';

interface NotificationPanelProps {
  notifications: AppNotification[];
  onClose: () => void;
  onNotificationClick: (notif: AppNotification) => void;
  onMarkAllRead: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications = [], onClose, onNotificationClick, onMarkAllRead }) => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'breaking': return '🔴';
      case 'job': return '💼';
      case 'post': return '📰';
      default: return '🔔';
    }
  };

  const safeNotifications = notifications || [];

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <header className="p-6 border-b border-custom flex justify-between items-center sticky top-0 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md z-10">
          <div>
            <h2 className="text-xl font-black italic newspaper-font uppercase">Notifications</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stay Updated with Har Sach</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={onMarkAllRead} className="text-[10px] font-black uppercase text-[#0A5FFF]">Mark all Read</button>
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl">✕</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {safeNotifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30">
              <span className="text-6xl mb-4">🔔</span>
              <p className="text-xs font-black uppercase tracking-widest">No New Alerts</p>
            </div>
          ) : (
            safeNotifications.map(notif => (
              <div 
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className={`p-4 rounded-[24px] border border-custom transition-all cursor-pointer relative group ${notif.isRead ? 'bg-slate-50/50 dark:bg-white/[0.02]' : 'bg-white dark:bg-white/5 shadow-md border-[#0A5FFF]/20'}`}
              >
                {!notif.isRead && <div className="absolute top-4 right-4 w-2 h-2 bg-[#E53935] rounded-full animate-pulse"></div>}
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm bg-white dark:bg-[#1B1B1B] ${!notif.isRead ? 'border border-[#0A5FFF]/20' : ''}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className={`text-sm font-bold leading-tight ${!notif.isRead ? 'text-main' : 'text-slate-500'}`}>{notif.title}</h3>
                    <p className="text-xs text-secondary line-clamp-2">{notif.message}</p>
                    <div className="flex items-center justify-between pt-2">
                       <span className="text-[8px] font-black uppercase text-slate-400">{notif.timestamp}</span>
                       {notif.category && <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-slate-100 dark:bg-white/10 rounded-md">{notif.category}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="p-6 border-t border-custom text-center">
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Notification history is cleared every 30 days</p>
        </footer>
      </div>
    </div>
  );
};

export default NotificationPanel;
