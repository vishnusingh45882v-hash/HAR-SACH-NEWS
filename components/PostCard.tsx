
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const isJob = post.type === 'job';
  
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-[24px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={post.thumbnail} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
          loading="lazy" 
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest text-white ${isJob ? 'bg-[#b91c1c]' : 'bg-[#1e3a8a]'}`}>
            {post.category}
          </span>
          {post.isTrending && (
            <span className="bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
              Trending
            </span>
          )}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
            {isJob && <span className="text-[#b91c1c] font-black text-[10px] uppercase">Hiring Now</span>}
          </div>
          
          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight newspaper-font italic group-hover:text-[#1e3a8a] transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
            {post.content}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px]">👤</div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Bureau Report</span>
          </div>
          <a 
            href={post.officialLink || 'https://www.harsach.in'} 
            target="_blank" 
            className="text-[10px] font-black uppercase text-[#1e3a8a] border-b-2 border-[#1e3a8a] hover:text-[#b91c1c] hover:border-[#b91c1c] transition-all"
          >
            Pura Padhein →
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
