
import React from 'react';
import { LATEST_NEWS } from '../constants';

const BlogSection: React.FC = () => {
  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b-4 border-slate-900 mb-8 pb-2 flex items-end justify-between">
          <h2 className="newspaper-font text-4xl font-black uppercase italic tracking-tighter">Badi Khabrein</h2>
          <div className="flex space-x-4 mb-1">
            <button className="text-xs font-bold uppercase text-red-600 border-b-2 border-red-600">Top Updates</button>
            <button className="text-xs font-bold uppercase text-slate-400 hover:text-slate-900">National</button>
            <button className="text-xs font-bold uppercase text-slate-400 hover:text-slate-900">Sports</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LATEST_NEWS.map((post) => (
            <div key={post.id} className="group flex flex-col border-b md:border-b-0 md:border-r border-slate-100 last:border-0 pr-0 md:pr-4">
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <img 
                  // Use 'thumbnail' property from Post interface
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-[10px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded">{post.category}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{post.date}</span>
              </div>
              <h3 className="newspaper-font text-lg font-bold leading-tight mb-2 group-hover:text-blue-700 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-500 text-xs mb-4 line-clamp-3">
                {/* Use 'content' property from Post interface */}
                {post.content}
              </p>
              <div className="mt-auto pb-4">
                <a href="#" className="text-slate-900 text-xs font-black uppercase tracking-tighter border-b-2 border-slate-900 hover:text-red-600 hover:border-red-600 transition-colors">
                  Pura Padhein
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;