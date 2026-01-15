
import React, { useState, useEffect } from 'react';
import { Post, TrustLevel } from '../types';
import PostCard from './PostCard';

interface NewsSectionProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ posts, onPostClick }) => {
  const [activeCat, setActiveCat] = useState('🔴 Breaking');
  const [filter, setFilter] = useState<'trusted' | 'near' | 'trending'>('trusted');
  const [sliderIndex, setSliderIndex] = useState(0);

  const breakingPosts = posts.filter(p => p.type === 'news' && p.status === 'approved').slice(0, 5);
  const categories = ['🔴 Breaking', '🏛️ Politics', '🌆 Local', '🚨 Crime', '🌧️ Weather', '⚖️ Court', '🛣️ Accident'];

  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex(prev => (prev + 1) % breakingPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [breakingPosts.length]);

  return (
    <div className="space-y-8 pb-32">
      {/* 🔴 Breaking News Slider */}
      <div className="relative h-64 w-full overflow-hidden md:rounded-[32px] shadow-lg bg-black group">
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
                <span className="bg-[#E53935] text-white text-[10px] font-black px-3 py-1 rounded-md animate-pulse">LIVE BREAKING</span>
                <span className="text-white/80 text-[10px] font-bold">📍 {post.location}</span>
                <span className="text-white/60 text-[10px] font-bold">⏱️ {post.date}</span>
              </div>
              <h2 className="text-white text-2xl font-bold leading-tight line-clamp-2 newspaper-font italic mb-4">
                {post.title}
              </h2>
            </div>
          </div>
        ))}
        {/* Slider Indicators */}
        <div className="absolute bottom-6 right-8 flex space-x-2">
          {breakingPosts.map((_, idx) => (
            <button 
              key={idx} 
              onClick={(e) => { e.stopPropagation(); setSliderIndex(idx); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === sliderIndex ? 'w-8 bg-[#0A5FFF]' : 'w-2 bg-white/30'}`}
            ></button>
          ))}
        </div>
      </div>

      {/* 🧭 Category Tabs */}
      <div className="sticky top-[70px] z-40 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-custom -mx-4 px-4 py-3 flex overflow-x-auto no-scrollbar space-x-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${activeCat === cat ? 'bg-[#0A5FFF] text-white shadow-md' : 'bg-custom-card text-secondary border border-custom'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* AI Credibility Banner */}
      <div className="bg-[#1DB954]/5 dark:bg-[#22C55E]/10 border border-[#1DB954]/20 p-5 rounded-[24px] flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white dark:bg-[#1B1B1B] rounded-xl flex items-center justify-center text-2xl shadow-sm">🧠</div>
            <div>
              <p className="text-[12px] font-black text-[#1DB954] uppercase tracking-widest">AI Content Analyzer</p>
              <p className="text-[10px] font-bold text-secondary uppercase">Scanning 24/7 for True Journalism</p>
            </div>
         </div>
         <div className="flex items-center space-x-1 text-[#1DB954]">
           <span className="text-[10px] font-black">99.8% ACCURACY</span>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/></svg>
         </div>
      </div>

      {/* 📰 News Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.filter(p => p.type === 'news' && p.status === 'approved').map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
