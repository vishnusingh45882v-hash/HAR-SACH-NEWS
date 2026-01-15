
import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import PostCard from './PostCard';

interface NewsSectionProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ posts, onPostClick }) => {
  const [activeCat, setActiveCat] = useState('🔴 Breaking');
  const [sliderIndex, setSliderIndex] = useState(0);

  const breakingPosts = (posts || []).filter(p => p.type === 'news' && p.status === 'approved').slice(0, 5);
  const categories = ['🔴 Breaking', '🏛️ Politics', '🌆 Local', '🚨 Crime', '🌧️ Weather', '⚖️ Court', '🛣️ Accident'];

  useEffect(() => {
    if ((breakingPosts || []).length <= 1) return;
    const timer = setInterval(() => {
      setSliderIndex(prev => (prev + 1) % breakingPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [breakingPosts.length]);

  return (
    <div className="space-y-8 pb-32">
      {/* Breaking News Slider */}
      {(breakingPosts || []).length > 0 && (
        <div className="relative h-64 w-full overflow-hidden md:rounded-[40px] shadow-2xl bg-black group transition-all">
          {breakingPosts.map((post, idx) => (
            <div 
              key={post.id}
              onClick={() => onPostClick(post)}
              className={`absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer ${idx === sliderIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            >
              <img src={post.thumbnail} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-[#E53935] text-white text-[10px] font-black px-3 py-1 rounded-md animate-pulse">LIVE FROM HARSACH.IN</span>
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">📍 {post.location}</span>
                </div>
                <h2 className="text-white text-2xl font-bold leading-tight line-clamp-2 newspaper-font italic mb-4">
                  {post.title}
                </h2>
              </div>
            </div>
          ))}
          {breakingPosts.length > 1 && (
            <div className="absolute bottom-6 right-8 flex space-x-2">
              {breakingPosts.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={(e) => { e.stopPropagation(); setSliderIndex(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === sliderIndex ? 'w-8 bg-[#0A5FFF]' : 'w-2 bg-white/30'}`}
                ></button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Category Tabs */}
      <div className="sticky top-[70px] z-40 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-custom -mx-4 px-4 py-3 flex overflow-x-auto no-scrollbar space-x-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 ${activeCat === cat ? 'bg-[#0A5FFF] text-white shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-secondary border border-custom'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* AI Credibility */}
      <div className="bg-[#1DB954]/5 dark:bg-[#22C55E]/10 border border-[#1DB954]/20 p-6 rounded-[32px] flex items-center justify-between shadow-sm">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white dark:bg-[#1B1B1B] rounded-2xl flex items-center justify-center text-2xl shadow-sm">🧠</div>
            <div>
              <p className="text-[12px] font-black text-[#1DB954] uppercase tracking-widest">AI Content Verified</p>
              <p className="text-[10px] font-bold text-secondary uppercase">Cross-checked with harsach.in Database</p>
            </div>
         </div>
      </div>

      {/* News Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(posts || []).filter(p => p.type === 'news' && p.status === 'approved').map(post => (
          <div key={post.id} onClick={() => onPostClick(post)} className="cursor-pointer">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
