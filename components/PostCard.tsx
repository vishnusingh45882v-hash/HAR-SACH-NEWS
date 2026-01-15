
import React from 'react';
import { Post, TrustLevel } from '../types';

interface PostCardProps {
  post: Post;
  onFollowClick?: (authorId: string) => void;
  isFollowing?: boolean;
}

const TrustBadge = ({ level }: { level?: TrustLevel }) => {
  const configs = {
    1: { label: 'New', color: 'bg-slate-200 text-[#666666]' },
    2: { label: 'Verified', color: 'bg-emerald-100 text-[#1DB954]' },
    3: { label: 'Trusted', color: 'bg-blue-100 text-[#0A5FFF]' },
    4: { label: 'Editor', color: 'bg-[#E53935] text-white' },
  };
  const config = configs[level || 1];
  return (
    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${config.color}`}>
      {config.label}
    </span>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post, onFollowClick, isFollowing }) => {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    }
  };

  const renderContent = () => {
    switch (post.type) {
      case 'job':
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[#1DB954] font-black text-[10px] uppercase tracking-widest">{post.company}</p>
                  <h3 className="text-sm font-black text-main mt-1 leading-tight">{post.title}</h3>
               </div>
               <div className="bg-[#0A5FFF]/10 text-[#0A5FFF] px-2 py-1 rounded text-[9px] font-black">
                 {post.matchPercent}% Match
               </div>
            </div>
            <div className="grid grid-cols-2 gap-2 py-2 border-y border-custom">
               <div className="text-[10px] font-bold text-secondary uppercase">📍 {post.location}</div>
               <div className="text-[10px] font-bold text-secondary uppercase text-right">📅 {post.lastDate}</div>
            </div>
            <div className="flex justify-between items-center pt-1">
               <span className="text-emerald-600 font-black text-xs">{post.salary}</span>
               <button className="bg-[#0A5FFF] text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase shadow-lg">Apply</button>
            </div>
          </div>
        );

      case 'tech':
        return (
          <div className="space-y-2">
            <h3 className="text-sm font-black text-main leading-tight">{post.title}</h3>
            <p className="text-[11px] text-secondary line-clamp-2">⚡ {post.whatsNew}</p>
            <div className="flex justify-between items-center pt-2">
              <span className={`text-[9px] font-black px-2 py-1 rounded uppercase ${post.impact === 'High' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                Impact: {post.impact}
              </span>
              <span className="text-[10px] font-bold text-slate-400">Read Full Tech →</span>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
               <span className="text-[9px] font-black text-[#0A5FFF] uppercase tracking-widest">Exam Alert</span>
               <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${post.importance === 'Urgent' ? 'border-red-500 text-red-500 bg-red-50' : 'border-blue-500 text-blue-500'}`}>
                 {post.importance}
               </span>
            </div>
            <h3 className="text-sm font-black text-main leading-tight">{post.title}</h3>
            <div className="bg-slate-50 dark:bg-white/5 p-2 rounded-lg text-[10px] font-bold text-secondary">
               📅 Exam Date: {post.examDate}
            </div>
            <button className="w-full mt-2 bg-[#111111] dark:bg-white dark:text-[#111111] text-white py-2 rounded-lg text-[9px] font-black uppercase tracking-widest">Official Link</button>
          </div>
        );

      case 'sports':
        const teamA = post.teams?.[0] || { name: 'Team A', score: '0' };
        const teamB = post.teams?.[1] || { name: 'Team B', score: '0' };
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-custom pb-2">
              <span className="text-[10px] font-black uppercase italic tracking-tighter text-secondary">{post.matchName}</span>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded ${post.status === 'Live' ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-200 text-slate-600'}`}>
                {post.status}
              </span>
            </div>
            <div className="flex items-center justify-around py-2">
               <div className="text-center">
                 <p className="text-xs font-black">{teamA.name}</p>
                 <p className="text-lg font-black newspaper-font italic">{teamA.score}</p>
               </div>
               <div className="text-[10px] font-bold text-slate-300">VS</div>
               <div className="text-center">
                 <p className="text-xs font-black">{teamB.name}</p>
                 <p className="text-lg font-black newspaper-font italic">{teamB.score}</p>
               </div>
            </div>
            <button className="w-full bg-[#0A5FFF] text-white py-1.5 rounded-lg text-[9px] font-black uppercase">🔥 Highlights</button>
          </div>
        );

      case 'entertainment':
        return (
          <div className="space-y-2">
            <h3 className="text-sm font-black text-main leading-tight">{post.title}</h3>
            <div className="flex justify-between items-center text-[10px] font-bold text-secondary uppercase">
               <span>⭐ {post.rating}/5 Rating</span>
               <span>🎬 {post.releaseDate}</span>
            </div>
            <div className="flex gap-1 pt-1">
               <span className="bg-purple-600/10 text-purple-600 text-[8px] font-black px-2 py-0.5 rounded">OTT Release</span>
               <span className="bg-pink-600/10 text-pink-600 text-[8px] font-black px-2 py-0.5 rounded">CG Cinema</span>
            </div>
          </div>
        );

      default: // BREAKING / NEWS
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
               <span className="bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded">🔴 BREAKING</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
            </div>
            <h3 className="text-sm font-black text-main leading-tight newspaper-font italic group-hover:text-[#0A5FFF] transition-colors">{post.title}</h3>
            <div className="flex justify-between items-center pt-2">
               <div className="flex items-center space-x-2">
                 <span className="text-[10px] text-secondary">👁️ {post.views?.toLocaleString()} Views</span>
               </div>
               <span className="text-[10px] font-black uppercase text-[#0A5FFF] border-b border-[#0A5FFF]">Read More →</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="comment-box-transition bg-white dark:bg-[#1B1B1B] rounded-2xl border-2 border-[#0A5FFF] shadow-sm hover:border-[#004CFF] hover:shadow-lg overflow-hidden flex flex-col h-full group">
      <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
        <img src={post.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" loading="lazy" />
        {post.isTrending && <div className="absolute top-2 right-2 bg-[#F4B400] text-white p-1 rounded-lg text-sm animate-bounce">🔥</div>}
        <div className="absolute top-2 left-2">
          <span className="bg-black/60 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
            {post.subCategory || post.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        {renderContent()}
      </div>
    </div>
  );
};

export default PostCard;
