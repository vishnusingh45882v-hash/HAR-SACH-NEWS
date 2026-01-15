
import React, { useState, useEffect } from 'react';
import { MOCK_POSTS, MAIN_TABS, SUB_CATEGORIES } from './constants';
import { Post, User, AdminStats, AppNotification, Comment } from './types';
import PostCard from './components/PostCard';
import BottomNav from './components/BottomNav';
import ProfileSection from './components/ProfileSection';
import AdminPanel from './components/AdminPanel';
import NewsSection from './components/NewsSection';
import NewsDetail from './components/NewsDetail';
import JobBoard from './components/JobBoard';
import NotificationPanel from './components/NotificationPanel';
import ChatSystem from './components/ChatSystem';
import { fetchLatestFromWeb } from './services/geminiService';

// Path for your logo - users should ensure this file exists or replace with hosted URL
const APP_LOGO = "https://raw.githubusercontent.com/username/repo/main/logo.png"; // Placeholder path for the uploaded logo

const SplashScreen: React.FC<{ onComplete: () => void, syncStatus: string }> = ({ onComplete, syncStatus }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center">
      <div className="w-64 h-auto animate-pulse flex flex-col items-center">
        {/* Logo Container mimicking the SACH NEWS style */}
        <div className="text-center">
          <span className="text-6xl font-black text-[#1e3a8a] italic tracking-tighter">SACH</span>
          <div className="h-2 w-full bg-slate-200 my-2"></div>
          <span className="text-7xl font-black text-[#b91c1c] tracking-tighter block">NEWS</span>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h1 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Official Portal</h1>
        <p className="text-sm font-bold text-[#b91c1c] mt-2 italic">harsach.in</p>
        <p className="text-[10px] font-black uppercase mt-6 text-slate-400 animate-bounce">{syncStatus}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [syncStatus, setSyncStatus] = useState('Connecting to harsach.in...');
  const [activeTab, setActiveTab] = useState<'home' | 'news' | 'chat' | 'jobs' | 'profile'>('home');
  const [mainTab, setMainTab] = useState('breaking');
  const [subCat, setSubCat] = useState('All');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS || []);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNews, setSelectedNews] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [notifications] = useState<AppNotification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});

  // Fix: Defined handleLogout function to clear user state and reset navigation
  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  useEffect(() => {
    const initSync = async () => {
      setSyncStatus('Searching for latest updates on harsach.in...');
      try {
        const realPosts = await fetchLatestFromWeb();
        if (realPosts && realPosts.length > 0) {
          const mappedPosts: Post[] = realPosts.map((rp: any, idx: number) => ({
            ...MOCK_POSTS[idx % MOCK_POSTS.length],
            id: `live-${Date.now()}-${idx}`,
            title: rp.title,
            content: rp.content,
            type: rp.type === 'job' ? 'job' : 'news',
            category: rp.category || 'Latest',
            date: rp.date || 'Just Uploaded',
            status: 'approved',
            thumbnail: rp.thumbnail || `https://picsum.photos/seed/harsach-${idx}/800/600`,
            officialLink: 'https://www.harsach.in'
          }));
          setPosts([...mappedPosts, ...MOCK_POSTS]);
          setSyncStatus('Live Posts Loaded!');
        } else {
          setSyncStatus('Connected to Portal.');
        }
      } catch (err) {
        setSyncStatus('Using Cached Content.');
      }
    };
    initSync();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    const realPosts = await fetchLatestFromWeb();
    if (realPosts && realPosts.length > 0) {
       const mappedPosts: Post[] = realPosts.map((rp: any, idx: number) => ({
          ...MOCK_POSTS[idx % MOCK_POSTS.length],
          id: `manual-sync-${Date.now()}-${idx}`,
          title: rp.title,
          content: rp.content,
          type: rp.type === 'job' ? 'job' : 'news',
          category: rp.category || 'Breaking',
          date: 'Live Now',
          status: 'approved',
          thumbnail: rp.thumbnail || `https://picsum.photos/seed/sync-${idx}/800/600`,
          officialLink: 'https://www.harsach.in'
        }));
        setPosts(prev => [...mappedPosts, ...prev]);
    }
    setIsSyncing(false);
  };

  const filteredPosts = (posts || []).filter(p => {
    const isCorrectType = p.type === (mainTab === 'breaking' ? 'news' : mainTab);
    const isCorrectSub = subCat === 'All' || p.subCategory === subCat;
    return isCorrectType && isCorrectSub && p.status === 'approved';
  });

  if (isInitializing) {
    return <SplashScreen onComplete={() => setIsInitializing(false)} syncStatus={syncStatus} />;
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0f172a] transition-colors duration-300">
      {showAdmin ? (
        <AdminPanel 
          stats={{ totalNews: posts.length, pendingApproval: 0, reportsToday: 0, usersRegistered: 0, rejectedNews: 0, bannedUsers: 0, trustedReporters: 0, aiFlagged: 0, totalNotificationsSent: 0 }}
          pendingPosts={[]}
          users={[]}
          reportedPosts={[]}
          onApprove={() => {}}
          onReject={() => {}}
          onUserAction={() => {}}
          onClose={() => setShowAdmin(false)}
        />
      ) : (
        <>
          <header className="bg-white dark:bg-[#1e293b] sticky top-0 z-[60] px-4 py-3 flex justify-between items-center border-b border-slate-200 shadow-sm">
             <div className="flex items-center space-x-2">
                <div className="flex flex-col leading-none">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl font-black text-[#1e3a8a] italic tracking-tighter">SACH</span>
                    <span className="text-2xl font-black text-[#b91c1c] tracking-tighter">NEWS</span>
                  </div>
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">OFFICIAL HARSACH.IN PORTAL</span>
                </div>
             </div>
             <div className="flex items-center space-x-2">
                <button 
                  onClick={handleSync}
                  disabled={isSyncing}
                  className={`w-9 h-9 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-lg transition-all ${isSyncing ? 'animate-spin' : 'active:scale-90'}`}
                >
                  🔄
                </button>
                <button onClick={() => setShowNotifications(true)} className="w-9 h-9 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-lg relative">
                  🔔
                </button>
                <div onClick={() => !user ? setShowAuthModal(true) : setActiveTab('profile')} className="w-9 h-9 bg-slate-200 dark:bg-white/10 rounded-xl border-2 border-white dark:border-white/5 shadow-md overflow-hidden cursor-pointer flex items-center justify-center">
                    {user ? <img src={user.avatar} className="w-full h-full object-cover" /> : <span className="text-xs">👤</span>}
                </div>
             </div>
          </header>

          <main className="flex-1">
            {activeTab === 'home' && (
              <div className="pb-32">
                <div className="bg-[#b91c1c] text-white py-2 overflow-hidden whitespace-nowrap">
                   <div className="inline-block animate-[marquee_25s_linear_infinite] px-4 text-[9px] font-black uppercase tracking-[0.2em]">
                     🔴 LIVE: Latest Updates from harsach.in • Verified Breaking News • New Job Notifications • Stay Connected to the Truth • 
                   </div>
                </div>

                <div className="sticky top-[64px] z-[55] bg-white/90 backdrop-blur-md dark:bg-[#1e293b]/90 border-b border-slate-200">
                  <div className="flex justify-around overflow-x-auto no-scrollbar">
                    {MAIN_TABS.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => { setMainTab(tab.id); setSubCat('All'); }}
                        className={`min-w-[70px] py-4 text-[9px] font-black uppercase transition-all border-b-2 ${mainTab === tab.id ? 'border-[#b91c1c] text-[#b91c1c]' : 'border-transparent text-slate-400'}`}
                      >
                        {tab.icon} {(tab.label || '').split(' ')[1] || tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black italic newspaper-font uppercase tracking-tighter text-[#1e3a8a]">
                      Latest from harsach.in
                    </h2>
                    <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                       <span className="text-[8px] font-black text-emerald-600 uppercase">Live Web Data</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(filteredPosts || []).map(post => (
                      <div key={post.id} onClick={() => setSelectedNews(post)} className="cursor-pointer">
                        <PostCard post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'news' && <div className="px-4 py-8"><NewsSection posts={posts || []} onPostClick={setSelectedNews} /></div>}
            {activeTab === 'jobs' && <div className="pb-32"><JobBoard /></div>}
            {activeTab === 'chat' && user && <ChatSystem currentUser={user} sessions={[]} onSendMessage={() => {}} />}
            {activeTab === 'profile' && user && <ProfileSection user={user} onLogout={handleLogout} isDarkMode={isDarkMode} onThemeToggle={(d) => setIsDarkMode(d)} userPosts={posts.filter(p => p.authorId === user.id)} />}
          </main>

          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}

      {selectedNews && (
        <NewsDetail 
          post={selectedNews} 
          onClose={() => setSelectedNews(null)} 
          currentUser={user}
          comments={commentsByPost[selectedNews.id] || []}
          onAddComment={() => {}}
          onLikeComment={() => {}}
          onReportComment={() => {}}
        />
      )}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onAuth={(u) => { setUser(u); setShowAuthModal(false); }} />}
      {showNotifications && <NotificationPanel notifications={notifications || []} onClose={() => setShowNotifications(false)} onNotificationClick={() => {}} onMarkAllRead={() => {}} />}
    </div>
  );
};

const AuthModal = ({ onClose, onAuth }: { onClose: () => void, onAuth: (u: User) => void }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1e293b] w-full max-w-md rounded-[40px] p-10 space-y-6">
        <div className="text-center mb-4">
          <span className="text-4xl font-black text-[#1e3a8a] italic tracking-tighter">SACH</span>
          <span className="text-5xl font-black text-[#b91c1c] tracking-tighter block">NEWS</span>
        </div>
        <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white uppercase tracking-tight">Login to Portal</h2>
        <button onClick={() => onAuth({
          id: 'u1', name: 'Verified Reader', mobile: '999', location: { state: 'CG', city: 'Raipur' },
          type: 'Citizen', trustLevel: 2, trustScore: 90, isVerified: true, joinedDate: '2024', kycLast4: '0000',
          stats: { totalPosted: 0, approved: 0, rejected: 0, reports: 0, followers: 0, following: 0 },
          strikes: 0, avatar: 'https://i.pravatar.cc/100?u=u1'
        })} className="w-full bg-[#1e3a8a] text-white py-5 rounded-2xl font-black uppercase shadow-xl active:scale-95 transition-all">Fast Login</button>
        <a href="https://www.harsach.in" className="block text-center text-[10px] font-black uppercase text-slate-400">Official harsach.in Website</a>
      </div>
    </div>
  );
};

export default App;
