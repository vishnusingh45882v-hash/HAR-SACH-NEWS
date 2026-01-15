
import React, { useState } from 'react';
import { Post, User, AdminStats, RiskLevel } from '../types';

interface AdminPanelProps {
  stats: AdminStats;
  pendingPosts: Post[];
  users: User[];
  reportedPosts: Post[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onUserAction: (userId: string, action: string) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  stats, 
  pendingPosts = [], 
  users = [], 
  reportedPosts = [],
  onApprove, 
  onReject, 
  onUserAction,
  onClose 
}) => {
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'approval' | 'comments' | 'reports' | 'users' | 'ai' | 'analytics' | 'settings'>('dashboard');

  const safeStats = stats || {
    totalNews: 0,
    pendingApproval: 0,
    reportsToday: 0,
    usersRegistered: 0,
    rejectedNews: 0,
    bannedUsers: 0,
    trustedReporters: 0,
    aiFlagged: 0,
    totalNotificationsSent: 0,
    reportedComments: 0
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total News" value={safeStats.totalNews} color="text-white" bg="bg-[#0A5FFF]" />
        <StatCard label="Pending" value={safeStats.pendingApproval} color="text-white" bg="bg-orange-500" />
        <StatCard label="Reports" value={safeStats.reportsToday} color="text-white" bg="bg-red-600" />
        <StatCard label="Comments Flagged" value={safeStats.reportedComments || 0} color="text-white" bg="bg-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1B1B1B] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xs font-black uppercase italic tracking-widest text-slate-400">🚩 Reported Comments</h3>
            <button onClick={() => setActiveMenu('comments')} className="text-[10px] font-bold text-[#0A5FFF] uppercase">View All</button>
          </div>
          <div className="p-4 space-y-3">
             <div className="p-4 bg-white/5 rounded-2xl flex justify-between items-center">
                <div>
                   <p className="text-[10px] font-black uppercase text-red-600">Abusive Content</p>
                   <p className="text-xs font-bold mt-1 line-clamp-1">"Bad words in Hindi..."</p>
                </div>
                <div className="flex space-x-2">
                   <button className="w-8 h-8 bg-emerald-600/20 text-emerald-500 rounded-lg">✅</button>
                   <button className="w-8 h-8 bg-red-600/20 text-red-600 rounded-lg">🗑️</button>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-[#1B1B1B] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xs font-black uppercase italic tracking-widest text-slate-400">⏳ News Approval</h3>
            <button onClick={() => setActiveMenu('approval')} className="text-[10px] font-bold text-red-600 uppercase">Queue</button>
          </div>
          <div className="divide-y divide-white/5">
            {(pendingPosts || []).slice(0, 3).map(post => (
              <PendingNewsRow key={post.id} post={post} onApprove={onApprove} onReject={() => {}} />
            ))}
            {(pendingPosts || []).length === 0 && <EmptyState label="No pending news" />}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[150] bg-[#0F0F0F] text-[#f8fafc] flex">
      <aside className="w-64 border-r border-white/5 hidden lg:flex flex-col h-full bg-[#0F0F0F]">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-[#0A5FFF] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg transform rotate-2">H</div>
             <div className="flex flex-col leading-none">
                <span className="newspaper-font text-xl font-black uppercase italic tracking-tighter">ADMIN <span className="text-red-600">PANEL</span></span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Har Sach AI Control</span>
             </div>
          </div>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <MenuBtn active={activeMenu === 'dashboard'} onClick={() => setActiveMenu('dashboard')} icon="🏠" label="Dashboard" />
          <MenuBtn active={activeMenu === 'approval'} onClick={() => setActiveMenu('approval')} icon="📰" label="Approval Queue" count={(pendingPosts || []).length} />
          <MenuBtn active={activeMenu === 'comments'} onClick={() => setActiveMenu('comments')} icon="💬" label="Moderation" count={safeStats?.reportedComments || 0} />
          <MenuBtn active={activeMenu === 'reports'} onClick={() => setActiveMenu('reports')} icon="🚩" label="Reports" />
          <MenuBtn active={activeMenu === 'users'} onClick={() => setActiveMenu('users')} icon="👤" label="Users" />
          <div className="pt-8 mt-8 border-t border-white/5">
            <button onClick={onClose} className="w-full flex items-center space-x-3 px-6 py-4 text-xs font-black uppercase text-red-600 hover:bg-red-600/5 rounded-2xl transition-all">
               <span>🚪</span>
               <span>Exit Admin</span>
            </button>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0F0F0F]/50 backdrop-blur-xl">
           <div className="lg:hidden flex items-center space-x-4">
              <span className="text-2xl">☰</span>
              <span className="newspaper-font text-lg font-black uppercase italic">HAR SACH</span>
           </div>
           <div className="flex items-center space-x-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#0A5FFF] to-purple-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">A</div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 no-scrollbar bg-[#0F0F0F]">
          {activeMenu === 'dashboard' && renderDashboard()}
          {activeMenu === 'approval' && (
             <div className="grid grid-cols-1 gap-4">
               {(pendingPosts || []).map(post => (
                 <div key={post.id} className="bg-[#1B1B1B] p-6 rounded-[32px] border border-white/5 flex gap-6">
                   <img src={post.thumbnail} className="w-32 h-32 object-cover rounded-2xl" />
                   <div className="flex-1">
                     <h3 className="text-lg font-bold">{post.title}</h3>
                     <p className="text-xs text-slate-400 mt-2">{post.author}</p>
                     <div className="mt-4 flex space-x-4">
                        <button onClick={() => onApprove(post.id)} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-xs font-black">Approve</button>
                        <button className="bg-red-600/10 text-red-600 border border-red-600/20 px-6 py-2 rounded-xl text-xs font-black">Reject</button>
                     </div>
                   </div>
                 </div>
               ))}
               {(pendingPosts || []).length === 0 && <EmptyState label="Approval queue is empty" />}
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

const MenuBtn = ({ active, onClick, icon, label, count }: { active: boolean, onClick: () => void, icon: string, label: string, count?: number }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${active ? 'bg-white/5 text-[#0A5FFF]' : 'text-slate-400 hover:text-white'}`}
  >
    <div className="flex items-center space-x-4">
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </div>
    {count !== undefined && count > 0 && <span className="bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full">{count}</span>}
  </button>
);

const StatCard = ({ label, value, bg, color }: any) => (
  <div className={`${bg} p-8 rounded-[40px] shadow-2xl`}>
    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
    <h4 className={`text-4xl font-black italic newspaper-font ${color}`}>{value}</h4>
  </div>
);

const PendingNewsRow = ({ post, onApprove }: any) => (
  <div className="p-6 flex items-center justify-between">
    <div className="flex items-center space-x-4">
       <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden"><img src={post.thumbnail} className="w-full h-full object-cover" /></div>
       <div>
          <p className="text-[8px] font-black uppercase text-emerald-500">AI Verified</p>
          <h4 className="text-xs font-bold line-clamp-1">{post.title}</h4>
       </div>
    </div>
    <button onClick={() => onApprove(post.id)} className="w-8 h-8 bg-emerald-600/20 text-emerald-500 rounded-lg">✅</button>
  </div>
);

const EmptyState = ({ label }: any) => (
  <div className="py-12 text-center opacity-20"><p className="text-xs font-black uppercase">{label}</p></div>
);

export default AdminPanel;
