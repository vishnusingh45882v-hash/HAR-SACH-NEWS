
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'news' | 'chat' | 'jobs' | 'profile'>('home');
  const [mainTab, setMainTab] = useState('breaking');
  const [subCat, setSubCat] = useState('All');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS || []);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNews, setSelectedNews] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});

  const [adminStats] = useState<AdminStats>({
    totalNews: (MOCK_POSTS || []).length,
    pendingApproval: 5,
    reportsToday: 2,
    usersRegistered: 1200,
    rejectedNews: 12,
    bannedUsers: 1,
    trustedReporters: 45,
    aiFlagged: 8,
    totalNotificationsSent: 4500,
    reportedComments: 3
  });

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const handleAuth = (u: User) => {
    setUser(u);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
    setShowAdmin(false);
  };

  const filteredPosts = (posts || []).filter(p => {
    const isCorrectType = p.type === (mainTab === 'breaking' ? 'news' : mainTab);
    const isCorrectSub = subCat === 'All' || p.subCategory === subCat;
    return isCorrectType && isCorrectSub && p.status === 'approved';
  });

  const handlePostSubmit = async (newPost: Post) => {
    if (!user) { setShowAuthModal(true); return; }
    setPosts([newPost, ...(posts || [])]);
    setShowPostModal(false);
  };

  const handleAddComment = async (postId: string, text: string, parentId?: string) => {
    if (!user) { setShowAuthModal(true); return; }

    const newComment: Comment = {
      id: Math.random().toString(),
      postId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userTrustLevel: user.trustLevel,
      text,
      timestamp: 'Just Now',
      likes: 0,
      replies: [], 
      parentId,
      status: 'active'
    };

    setCommentsByPost(prev => {
      const postComments = [...(prev[postId] || [])];
      
      if (parentId) {
        const updateReplies = (list: Comment[]): Comment[] => {
          return (list || []).map(c => {
            if (c.id === parentId) {
              return { ...c, replies: [...(c.replies || []), newComment] };
            }
            if (c.replies && c.replies.length > 0) {
              return { ...c, replies: updateReplies(c.replies) };
            }
            return c;
          });
        };
        return { ...prev, [postId]: updateReplies(postComments) };
      }
      return { ...prev, [postId]: [newComment, ...postComments] };
    });
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    setCommentsByPost(prev => {
      const updateLikes = (list: Comment[]): Comment[] => {
        return (list || []).map(c => {
          if (c.id === commentId) {
            const isLiked = !c.isLiked;
            return { ...c, isLiked, likes: (c.likes || 0) + (isLiked ? 1 : -1) };
          }
          if (c.replies && c.replies.length > 0) {
            return { ...c, replies: updateLikes(c.replies) };
          }
          return c;
        });
      };
      return { ...prev, [postId]: updateLikes(prev[postId] || []) };
    });
  };

  const unreadCount = (notifications || []).filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#121212] transition-colors duration-300">
      {showAdmin ? (
        <AdminPanel 
          stats={adminStats}
          pendingPosts={(posts || []).filter(p => p.status === 'pending')}
          users={[]}
          reportedPosts={(posts || []).filter(p => (p.reportCount || 0) > 0)}
          onApprove={(id) => setPosts(prev => prev.map(p => p.id === id ? {...p, status: 'approved'} : p))}
          onReject={() => {}}
          onUserAction={() => {}}
          onClose={() => setShowAdmin(false)}
        />
      ) : (
        <>
          <header className="bg-white dark:bg-[#1E1E1E] sticky top-0 z-[60] px-4 py-3 flex justify-between items-center border-b border-custom shadow-sm">
             <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#0A5FFF] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg transform rotate-2">H</div>
                <div className="flex flex-col leading-none">
                  <span className="newspaper-font text-xl font-black uppercase italic tracking-tighter">HAR <span className="text-[#0A5FFF] dark:text-[#4D8DFF]">SACH</span></span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Sahi Khabar, Sahi Naukri</span>
                </div>
             </div>
             <div className="flex items-center space-x-2">
                <button onClick={() => user ? setShowPostModal(true) : setShowAuthModal(true)} className="w-10 h-10 bg-[#0A5FFF] text-white rounded-xl flex items-center justify-center text-2xl shadow-lg active:scale-90 transition-all mr-1">+</button>
                <button onClick={() => setShowAdmin(true)} className="w-9 h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center text-[10px] font-black uppercase">AD</button>
                <button onClick={() => setShowNotifications(true)} className="w-9 h-9 bg-slate-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-lg relative">
                  🔔
                  {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E53935] text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-[#1E1E1E]">{unreadCount}</span>}
                </button>
                <div onClick={() => !user ? setShowAuthModal(true) : setActiveTab('profile')} className="w-9 h-9 bg-slate-200 dark:bg-white/20 rounded-xl border-2 border-white dark:border-white/5 shadow-md overflow-hidden cursor-pointer flex items-center justify-center">
                    {user ? <img src={user.avatar || `https://i.pravatar.cc/100?u=${user.id}`} alt="User" className="w-full h-full object-cover" /> : <span className="text-xs">👤</span>}
                </div>
             </div>
          </header>

          <main className="flex-1">
            {activeTab === 'home' && (
              <div className="pb-32">
                <div className="sticky top-[64px] z-[55] bg-white dark:bg-[#1E1E1E] border-b border-custom">
                  <div className="flex justify-around overflow-x-auto no-scrollbar">
                    {MAIN_TABS.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => { setMainTab(tab.id); setSubCat('All'); }}
                        className={`min-w-[80px] py-4 text-[10px] font-black uppercase transition-all border-b-2 ${mainTab === tab.id ? 'border-[#0A5FFF] text-[#0A5FFF]' : 'border-transparent text-slate-400'}`}
                      >
                        {tab.icon} {(tab.label || '').split(' ')[1] || tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="overflow-x-auto no-scrollbar flex space-x-2 p-3 bg-slate-50 dark:bg-black/20">
                    {['All', ...(SUB_CATEGORIES[mainTab] || [])].map(sub => (
                      <button 
                        key={sub}
                        onClick={() => setSubCat(sub)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${subCat === sub ? 'bg-[#0A5FFF] text-white shadow-md' : 'bg-white dark:bg-white/5 text-slate-500 border border-custom'}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 space-y-6">
                  <h2 className="text-xl font-black italic newspaper-font uppercase tracking-tighter">
                    {mainTab === 'breaking' ? 'Top Stories' : `${mainTab} Center`}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(filteredPosts || []).map(post => (
                      <div key={post.id} onClick={() => setSelectedNews(post)}>
                        <PostCard post={post} />
                      </div>
                    ))}
                    {filteredPosts.length === 0 && (
                      <div className="col-span-full py-20 text-center opacity-30">
                        <span className="text-6xl">🔍</span>
                        <p className="mt-4 font-black uppercase text-xs">No updates in this section</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'news' && <div className="px-4 py-8"><NewsSection posts={posts || []} onPostClick={setSelectedNews} /></div>}
            {activeTab === 'jobs' && <div className="pb-32"><JobBoard /></div>}
            {activeTab === 'chat' && user && <ChatSystem currentUser={user} sessions={[]} onSendMessage={() => {}} />}
            {activeTab === 'profile' && user && <ProfileSection user={user} onLogout={handleLogout} isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode} userPosts={(posts || []).filter(p => p.authorId === user.id)} />}
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
          onAddComment={(txt, pid) => handleAddComment(selectedNews.id, txt, pid)}
          onLikeComment={(cid) => handleLikeComment(selectedNews.id, cid)}
          onReportComment={() => {}}
        />
      )}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onAuth={handleAuth} />}
      {showPostModal && <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"><div className="bg-white dark:bg-[#1E1E1E] p-10 rounded-[50px]"><button onClick={() => setShowPostModal(false)}>Close Wizard</button></div></div>}
      {showNotifications && <NotificationPanel notifications={notifications || []} onClose={() => setShowNotifications(false)} onNotificationClick={() => {}} onMarkAllRead={() => {}} />}
    </div>
  );
};

const AuthModal = ({ onClose, onAuth }: { onClose: () => void, onAuth: (u: User) => void }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-[40px] p-10 space-y-6">
        <h2 className="text-3xl font-black italic newspaper-font uppercase">Join Har Sach</h2>
        <button onClick={() => onAuth({
          id: 'u1', name: 'User', mobile: '999', location: { state: 'CG', city: 'Raipur' },
          type: 'Citizen', trustLevel: 1, trustScore: 80, isVerified: true, joinedDate: '2024', kycLast4: '0000',
          stats: { totalPosted: 0, approved: 0, rejected: 0, reports: 0, followers: 0, following: 0 },
          strikes: 0, settings: { notificationsEnabled: true, locationAlerts: true, nightMode: false, privacyLevel: 'Anyone' }
        })} className="w-full bg-[#0A5FFF] text-white py-5 rounded-2xl font-black uppercase">Fast Login</button>
      </div>
    </div>
  );
};

export default App;
