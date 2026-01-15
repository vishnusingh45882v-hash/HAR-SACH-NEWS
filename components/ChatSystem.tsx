
import React, { useState, useRef, useEffect } from 'react';
import { User, ChatSession, Message, TrustLevel } from '../types';

interface ChatSystemProps {
  currentUser: User;
  sessions: ChatSession[];
  onSendMessage: (chatId: string, text: string) => void;
}

const TrustDot = ({ level }: { level: TrustLevel }) => {
  const colors = { 1: '#9CA3AF', 2: '#1DB954', 3: '#0A5FFF', 4: '#E53935' };
  return <div className="w-3 h-3 rounded-full border-2 border-white dark:border-[#1E1E1E]" style={{ backgroundColor: colors[level] }} />;
};

const ChatSystem: React.FC<ChatSystemProps> = ({ currentUser, sessions = [], onSendMessage }) => {
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const safeSessions = sessions || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeChat]);

  const handleSend = () => {
    if (!inputText.trim() || !activeChat) return;
    const newMessage: Message = {
      id: Math.random().toString(),
      chatId: activeChat.id,
      senderId: currentUser.id,
      text: inputText,
      type: 'text',
      timestamp: 'Now',
      status: 'sent'
    };
    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
    }));
    onSendMessage(activeChat.id, inputText);
    setInputText('');
  };

  const InboxView = () => (
    <div className="flex flex-col h-full bg-white dark:bg-[#121212]">
      <header className="p-6 border-b border-custom">
        <h2 className="text-3xl font-black italic newspaper-font uppercase">Inbox</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Chat with Trusted Reporters</p>
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {safeSessions.map(session => {
          const otherUser = session.participants.find(p => p.id !== currentUser.id);
          return (
            <div 
              key={session.id}
              onClick={() => setActiveChat(session)}
              className="p-5 flex items-center space-x-4 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer border-b border-custom transition-all"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                  <img src={otherUser?.avatar || `https://i.pravatar.cc/100?u=${otherUser?.id}`} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <TrustDot level={otherUser?.trustLevel || 1} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-sm font-bold text-main truncate">{otherUser?.name}</h3>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{session.lastMessageTime}</span>
                </div>
                <p className="text-xs text-secondary truncate">{session.lastMessage}</p>
              </div>
              {session.unreadCount > 0 && (
                <div className="w-5 h-5 bg-[#0A5FFF] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md">
                  {session.unreadCount}
                </div>
              )}
            </div>
          );
        })}
        {safeSessions.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-10 opacity-20">
            <span className="text-5xl mb-4">💬</span>
            <p className="text-xs font-black uppercase text-center">No active chats found</p>
          </div>
        )}
      </div>
    </div>
  );

  const ChatWindow = () => {
    const otherUser = activeChat?.participants.find(p => p.id !== currentUser.id);
    const chatId = activeChat?.id || '';
    const chatMessages = messages[chatId] || [];

    return (
      <div className="flex flex-col h-full bg-white dark:bg-[#121212] animate-in slide-in-from-right duration-300">
        <header className="p-4 border-b border-custom flex items-center justify-between sticky top-0 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md z-10">
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveChat(null)} className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-xl text-xl">←</button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                <img src={otherUser?.avatar || `https://i.pravatar.cc/100?u=${otherUser?.id}`} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-main">{otherUser?.name}</h3>
                <p className="text-[9px] font-bold text-[#1DB954] uppercase tracking-widest">{otherUser?.isOnline ? 'Active Now' : 'Last Seen: 2h ago'}</p>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-xl">⚠️</button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-[#f8fafc] dark:bg-black/10">
          <div className="text-center py-4">
            <span className="text-[10px] font-black uppercase text-slate-400 bg-white dark:bg-white/5 px-4 py-1.5 rounded-full border border-custom">Security: End-to-End Encrypted</span>
          </div>
          
          {chatMessages.map((msg, idx) => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-4 rounded-3xl text-sm font-medium shadow-sm ${isMe ? 'bg-[#0A5FFF] text-white rounded-tr-none' : 'bg-white dark:bg-[#1E1E1E] text-main border border-custom rounded-tl-none'}`}>
                  {msg.text}
                  <div className={`text-[8px] mt-1 flex items-center justify-end space-x-1 ${isMe ? 'text-white/60' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {isMe && <span>{msg.status === 'seen' ? '✔️✔️' : '✔️'}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-custom bg-white dark:bg-[#1E1E1E]">
          <div className="flex items-center space-x-3">
            <button className="w-10 h-10 flex items-center justify-center text-xl text-slate-400">📎</button>
            <div className="flex-1 relative">
              <input 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..." 
                className="w-full p-4 bg-slate-100 dark:bg-white/5 rounded-2xl border-none focus:ring-2 focus:ring-[#0A5FFF] text-sm"
              />
              <button className="absolute right-4 top-4">😊</button>
            </div>
            <button 
              onClick={handleSend}
              className="w-12 h-12 bg-[#0A5FFF] text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"/></svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-white dark:bg-[#121212] flex flex-col">
      {activeChat ? <ChatWindow /> : <InboxView />}
    </div>
  );
};

export default ChatSystem;
