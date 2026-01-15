
import React, { useState } from 'react';
import { User, Comment, TrustLevel } from '../types';

interface CommentSectionProps {
  postId: string;
  currentUser: User | null;
  comments: Comment[];
  onAddComment: (text: string, parentId?: string) => void;
  onLikeComment: (commentId: string) => void;
  onReportComment: (commentId: string, reason: string) => void;
}

const TrustBadge = ({ level }: { level: TrustLevel }) => {
  const configs = {
    1: { color: 'bg-slate-400', label: 'Citizen' },
    2: { color: 'bg-[#1DB954]', label: 'Verified' },
    3: { color: 'bg-[#0A5FFF]', label: 'Trusted' },
    4: { color: 'bg-[#E53935]', label: 'Editor' }
  };
  const config = configs[level];
  return (
    <span className={`w-2.5 h-2.5 rounded-full ${config.color} ring-2 ring-white dark:ring-[#1E1E1E]`} title={config.label} />
  );
};

const CommentCard = ({ 
  comment, 
  onReply, 
  onLike, 
  onReport, 
  isReply = false,
  replyToId = null,
  isNew = false
}: { 
  comment: Comment; 
  onReply: (id: string) => void; 
  onLike: (id: string) => void;
  onReport: (id: string) => void;
  isReply?: boolean;
  replyToId?: string | null;
  isNew?: boolean;
}) => {
  const [showReplies, setShowReplies] = useState(true);
  const isActive = replyToId === comment.id;
  const isReported = comment.status === 'pending';

  const getBorderColor = () => {
    if (isReported) return 'border-[#EF4444]';
    if (isActive) return 'border-[#22C55E]';
    return 'border-[#0A5FFF] hover:border-[#004CFF]';
  };

  return (
    <div className={`group flex flex-col ${isReply ? 'ml-6 md:ml-10 mt-3' : 'mb-4'}`}>
      <div 
        className={`comment-box-transition relative flex flex-col bg-white dark:bg-[#1E1E1E] p-3 md:p-4 rounded-xl border-2 shadow-sm ${getBorderColor()} ${isNew ? 'new-comment-pulse' : ''}`}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 relative">
            <div className={`rounded-lg overflow-hidden bg-slate-200 ${isReply ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <img src={comment.userAvatar || `https://i.pravatar.cc/100?u=${comment.userId}`} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1">
              <TrustBadge level={comment.userTrustLevel} />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-[11px] md:text-xs font-black uppercase text-main italic">{comment.userName}</h4>
                {comment.userTrustLevel >= 3 && <span className="text-[8px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded font-black uppercase">Trusted</span>}
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase">{comment.timestamp}</span>
            </div>
            <p className="text-xs md:text-sm text-secondary font-medium leading-relaxed">{comment.text}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
          <button 
            onClick={() => onLike(comment.id)}
            className={`flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest transition-colors ${comment.isLiked ? 'text-[#0A5FFF]' : 'text-slate-400 hover:text-[#0A5FFF]'}`}
          >
            <span className="text-sm">👍</span>
            <span>{(comment.likes || 0) > 0 ? comment.likes : 'Like'}</span>
          </button>
          
          <button 
            onClick={() => onReply(comment.id)}
            className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-[#22C55E]' : 'text-slate-400 hover:text-main'}`}
          >
            <span className="text-sm">↩️</span> Reply
          </button>
          
          <button 
            onClick={() => onReport(comment.id)}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#EF4444]"
          >
            <span className="text-sm">🚩</span> Report
          </button>
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="mt-1">
           <button 
             onClick={() => setShowReplies(!showReplies)}
             className="text-[8px] font-black text-[#0A5FFF] uppercase py-1 px-3"
           >
             {showReplies ? `− Hide ${comment.replies.length} Replies` : `+ Show ${comment.replies.length} Replies`}
           </button>
           {showReplies && comment.replies.map((reply) => (
             <CommentCard 
               key={reply.id} 
               comment={reply} 
               isReply 
               onReply={onReply} 
               onLike={onLike} 
               onReport={onReport}
               replyToId={replyToId}
               isNew={reply.timestamp === 'Just Now'}
             />
           ))}
        </div>
      )}
    </div>
  );
};

const CommentSection: React.FC<CommentSectionProps> = ({ 
  postId, 
  currentUser, 
  comments, 
  onAddComment,
  onLikeComment,
  onReportComment
}) => {
  const [inputText, setInputText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onAddComment(inputText, replyTo || undefined);
    setInputText('');
    setReplyTo(null);
  };

  return (
    <div className="space-y-6 mt-12 pt-10 border-t-2 border-slate-200 dark:border-white/10">
      <div className="flex justify-between items-center px-2">
        <div>
           <h3 className="text-lg font-black italic newspaper-font uppercase">Khabar Discussion</h3>
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Share your take with the community</p>
        </div>
        <div className="flex items-center space-x-2 bg-[#0A5FFF]/10 px-3 py-1.5 rounded-xl border border-[#0A5FFF]/20">
           <span className="w-1.5 h-1.5 bg-[#0A5FFF] rounded-full animate-pulse" />
           <span className="text-[8px] font-black text-[#0A5FFF] uppercase">Active Engagement</span>
        </div>
      </div>

      <div className={`comment-box-transition bg-white dark:bg-[#1B1B1B] p-5 rounded-2xl border-2 ${replyTo ? 'border-[#22C55E]' : 'border-[#0A5FFF]'} shadow-md`}>
        {!currentUser ? (
          <div className="text-center py-4 space-y-3">
             <p className="text-[10px] font-black uppercase text-slate-400">Puri charcha dekhne aur participate karne ke liye Login karein</p>
             <button className="bg-[#0A5FFF] text-white px-8 py-2.5 rounded-xl text-[10px] font-black uppercase shadow-lg active:scale-95 transition-all">Login Required</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {replyTo && (
              <div className="flex justify-between items-center bg-[#22C55E]/10 p-2 rounded-lg border-l-4 border-[#22C55E] animate-in slide-in-from-left duration-200">
                <p className="text-[9px] font-black uppercase text-[#22C55E]">Replying to thread...</p>
                <button type="button" onClick={() => setReplyTo(null)} className="text-[10px] font-bold">✕ Close</button>
              </div>
            )}
            <textarea 
              rows={2}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Aapka vichaar kya hai?..."
              className="w-full p-4 bg-slate-50 dark:bg-black/20 rounded-xl border-none focus:ring-0 text-sm font-medium placeholder:text-slate-400 resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 text-xl opacity-50">
                 <button type="button" className="hover:scale-110 transition-transform">😊</button>
                 <button type="button" className="hover:scale-110 transition-transform">📸</button>
              </div>
              <button 
                type="submit"
                className="bg-[#0A5FFF] text-white px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                Post Comment
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-1">
        {(comments?.length || 0) === 0 ? (
          <div className="text-center py-10 opacity-20">
             <span className="text-3xl">💬</span>
             <p className="text-[9px] font-black uppercase mt-2 tracking-widest">No comments on this story yet</p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentCard 
              key={comment.id} 
              comment={comment} 
              onReply={setReplyTo} 
              onLike={onLikeComment}
              onReport={() => onReportComment(comment.id, 'Spam')}
              replyToId={replyTo}
              isNew={comment.timestamp === 'Just Now'}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
