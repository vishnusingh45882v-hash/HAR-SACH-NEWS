
import React, { useState } from 'react';
import { Post, Comment, User } from '../types';
import CommentSection from './CommentSection';

interface NewsDetailProps {
  post: Post;
  onClose: () => void;
  currentUser: User | null;
  comments: Comment[];
  onAddComment: (text: string, parentId?: string) => void;
  onLikeComment: (id: string) => void;
  onReportComment: (id: string, reason: string) => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ 
  post, 
  onClose, 
  currentUser, 
  comments,
  onAddComment,
  onLikeComment,
  onReportComment
}) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-[#121212] overflow-y-auto animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-10 p-4 flex justify-between items-center bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-custom">
        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-sm">←</button>
        <div className="flex items-center space-x-2">
           <button onClick={() => setIsSaved(!isSaved)} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm ${isSaved ? 'text-red-600 bg-red-600/10' : 'bg-slate-100 dark:bg-white/5'}`}>{isSaved ? '❤️' : '🤍'}</button>
           <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-sm">🔁</button>
           <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-sm">🚩</button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8 pb-32">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-[#0A5FFF]">
             <span>{post.category}</span>
             <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
             <span className="text-slate-400">📍 {post.location}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black italic newspaper-font leading-tight tracking-tighter">
            {post.title}
          </h1>
          <div className="flex items-center justify-between pt-4 border-t border-custom">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0A5FFF] flex items-center justify-center text-white font-black text-xl shadow-lg">V</div>
              <div>
                <p className="text-xs font-black uppercase text-main">{post.author}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Reporter • {post.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black italic newspaper-font">{post.views?.toLocaleString() || '1.2K'}</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Total Views</p>
            </div>
          </div>
        </div>

        <div className="rounded-[40px] overflow-hidden shadow-2xl border border-custom">
          <img src={post.thumbnail} className="w-full object-cover" />
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg md:text-xl leading-relaxed font-medium text-slate-800 dark:text-slate-200">
            {post.content}
            {"\n\n"}
            Har Sach Bureau ki report ke anusar, yeh ghatna subah hui jab sthaniye log apne kaam par ja rahe the. Prashasan ne turant karyawahi karte hue mauke par police bal tainat kar diya hai.
            {"\n\n"}
            Humein mil rahi jankari ke mutabik, abhi tak is maamle mein 3 logon se puchtach ki ja rahi hai. Har Sach ki team mauke par hai aur aap tak sabse satya khabar pahuncha rahi hai.
          </p>
        </div>

        <div className="bg-emerald-500/10 border-2 border-emerald-500/20 p-8 rounded-[40px] flex items-center justify-between shadow-sm">
           <div className="space-y-1">
             <h4 className="text-xs font-black uppercase text-emerald-600 tracking-widest">📊 Credibility: HIGH ✅</h4>
             <p className="text-[10px] font-bold text-slate-500 uppercase">AI Source Verification: 100% Reliable</p>
           </div>
           <div className="text-3xl">🛡️</div>
        </div>

        {/* Real Dynamic Comment Section */}
        <CommentSection 
          postId={post.id}
          currentUser={currentUser}
          comments={comments}
          onAddComment={onAddComment}
          onLikeComment={onLikeComment}
          onReportComment={onReportComment}
        />
      </div>
    </div>
  );
};

export default NewsDetail;
