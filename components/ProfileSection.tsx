
import React, { useState } from 'react';
import { User, Post, TrustLevel } from '../types';

interface ProfileSectionProps {
  user: User;
  onLogout: () => void;
  onThemeToggle: (dark: boolean) => void;
  isDarkMode: boolean;
  userPosts: Post[];
}

const TrustLevelBadge = ({ level }: { level: TrustLevel }) => {
  const configs = {
    1: { label: 'New User', color: 'bg-slate-200 text-slate-600' },
    2: { label: 'Verified Reporter', color: 'bg-blue-600 text-white' },
    3: { label: 'Trusted Contributor', color: 'bg-emerald-600 text-white' },
    4: { label: 'Master Editor', color: 'bg-red-600 text-white' },
  };
  const config = configs[level];
  return (
    <span className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg ${config.color}`}>
      ⭐ {config.label}
    </span>
  );
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ user, onLogout, onThemeToggle, isDarkMode, userPosts }) => {
  const [activeSubTab, setActiveSubTab] = useState<'posts' | 'pending' | 'rejected' | 'saved'>('posts');

  const pendingPosts = userPosts.filter(p => p.status === 'pending');
  const approvedPosts = userPosts.filter(p => p.status === 'approved');
  const rejectedPosts = userPosts.filter(p => p.status === 'rejected');

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-32">
      {/* 🔝 TOP HEADER */}
      <div className="bg-custom-card p-8 rounded-[40px] border border-custom shadow-xl relative text-center">
        <div className="flex justify-between absolute top-6 left-6 right-6">
          <button onClick={() => onThemeToggle(!isDarkMode)} className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-xl flex items-center justify-center text-lg shadow-sm">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-xl flex items-center justify-center text-lg shadow-sm">⚙️</button>
        </div>

        <div className="flex flex-col items-center space-y-4 pt-4">
          <div className="w-28 h-28 rounded-[36px] overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl relative">
            <img src={user.avatar || `https://i.pravatar.cc/200?u=${user.id}`} alt="Profile" className="w-full h-full object-cover" />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#1DB954] border-2 border-white dark:border-[#1E1E1E] rounded-full"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black italic tracking-tighter newspaper-font">{user.name}</h2>
            <div className="flex flex-col items-center gap-2">
              <TrustLevelBadge level={user.trustLevel} />
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                📍 {user.location.city}, {user.location.state}
              </div>
            </div>
            
            <div className="flex items-center space-x-8 pt-2">
              <div className="text-center">
                 <p className="text-lg font-black italic newspaper-font">{user.stats.followers}</p>
                 <p className="text-[8px] font-black uppercase text-slate-400">Followers</p>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/10"></div>
              <div className="text-center">
                 <p className="text-lg font-black italic newspaper-font">{user.stats.following}</p>
                 <p className="text-[8px] font-black uppercase text-slate-400">Following</p>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
               <button className="bg-[#0A5FFF] text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                 ➕ Follow
               </button>
               <button className="bg-white dark:bg-white/5 border border-custom text-main px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all">
                 💬 Message
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 ACTIVITY */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-custom-card p-6 rounded-[32px] border border-custom shadow-lg text-center group hover:border-[#0A5FFF] transition-all">
          <p className="text-2xl font-black italic newspaper-font group-hover:text-[#0A5FFF] transition-colors">{user.stats.totalPosted}</p>
          <p className="text-[10px] font-black uppercase text-slate-400 mt-1">📰 Posts</p>
        </div>
        <div className="bg-custom-card p-6 rounded-[32px] border border-custom shadow-lg text-center group hover:border-[#1DB954] transition-all">
          <p className="text-2xl font-black italic newspaper-font text-emerald-600">{user.stats.approved}</p>
          <p className="text-[10px] font-black uppercase text-slate-400 mt-1">✅ Approved</p>
        </div>
      </div>

      {/* 🛡️ PRIVACY & CHAT SETTINGS */}
      <div className="bg-custom-card rounded-[32px] p-6 border border-custom shadow-lg space-y-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xl">🛡️</span>
          <h3 className="text-xs font-black uppercase italic tracking-widest">Privacy & Chat</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase italic">Message Requests</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">Who can start a chat with you</span>
            </div>
            <select className="bg-white dark:bg-white/10 text-[9px] font-black uppercase border-none rounded-lg p-2 focus:ring-0">
               <option>Anyone</option>
               <option>Followers Only</option>
               <option>Verified Only</option>
            </select>
          </div>
          <SettingItem icon="🔔" label="Push Notifications" action={<Switch active={user.settings?.notificationsEnabled ?? true} onClick={() => {}} />} />
          <SettingItem icon="🌙" label="Night Mode (10PM-6AM)" action={<Switch active={user.settings?.nightMode ?? false} onClick={() => {}} />} />
        </div>
      </div>

      <button onClick={onLogout} className="w-full bg-[#E53935]/10 text-[#E53935] py-5 rounded-[32px] font-black uppercase tracking-widest border border-[#E53935]/20 active:scale-95 transition-all">
        Logout from Har Sach
      </button>
    </div>
  );
};

const SettingItem = ({ icon, label, action }: { icon: string, label: string, action: React.ReactNode }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
    <div className="flex items-center space-x-3">
      <span className="text-lg">{icon}</span>
      <span className="text-[10px] font-black uppercase italic">{label}</span>
    </div>
    {action}
  </div>
);

const Switch = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`w-10 h-5 rounded-full relative transition-all ${active ? 'bg-[#0A5FFF]' : 'bg-slate-300'}`}>
    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`}></div>
  </button>
);

export default ProfileSection;
