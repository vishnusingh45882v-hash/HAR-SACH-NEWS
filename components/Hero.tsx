
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-28 pb-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Lead Story */}
          <div className="lg:w-2/3">
            <div className="relative group cursor-pointer overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200" 
                alt="Main Lead" 
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded w-fit mb-4">BREAKING STORY</span>
                <h1 className="newspaper-font text-3xl md:text-5xl text-white font-bold leading-tight mb-4">
                  National Digital Job Mission: Govt to link 1 Crore youth with tech companies.
                </h1>
                <p className="text-slate-200 text-lg hidden md:block line-clamp-2">
                  A massive digital drive has been launched to bridge the gap between rural education and urban employment opportunities. Har Sach investigates the impact...
                </p>
              </div>
            </div>
          </div>

          {/* Side Lead Story */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-[#fff9f9] p-6 rounded-xl border border-red-100 flex-1">
              <h2 className="text-red-600 font-bold text-sm uppercase tracking-widest mb-2">Job Alert</h2>
              <h3 className="newspaper-font text-2xl font-bold mb-3">Railway Recruitment 2024: 15,000 posts open for application.</h3>
              <p className="text-slate-600 text-sm mb-4">Last date for submission is Nov 15. Candidates with 12th pass certificates can apply...</p>
              <a href="#jobs" className="text-blue-600 font-bold text-sm underline decoration-2 underline-offset-4">Check Eligibility</a>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex-1">
              <h2 className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">Dharm & Rashifal</h2>
              <h3 className="newspaper-font text-xl font-bold mb-3">Today's Vastu Tip: How to arrange your workspace for career growth.</h3>
              <a href="#" className="text-slate-900 font-bold text-sm flex items-center group">
                Read Full Guide 
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
