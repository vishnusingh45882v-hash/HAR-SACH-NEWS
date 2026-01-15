
import React from 'react';
import { FEATURED_JOBS } from '../constants';

const JobBoard: React.FC = () => {
  return (
    <section id="jobs" className="py-12 bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-l-4 border-[#1DB954] pl-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-main mb-2 uppercase italic tracking-tighter newspaper-font">Naukri Update</h2>
            <p className="text-secondary text-lg">Daily Career notifications and hiring trends.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="flex -space-x-2">
                {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/48?img=${i+20}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#121212] shadow-sm" />)}
            </div>
            <p className="meta-text text-secondary">+1,200 Applied</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_JOBS.map((job) => (
            <div key={job.id} className="group bg-custom-card border border-custom p-6 rounded-[24px] hover:border-[#0A5FFF] hover:shadow-xl transition-all relative">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-white dark:bg-[#121212] rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-6 transition-transform shadow-sm">
                  {job.category.includes('Govt') ? '🏛️' : '💼'}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-main group-hover:text-[#0A5FFF] transition-colors mb-1">{job.title}</h3>
                  <div className="flex items-center flex-wrap gap-y-1">
                    <span className="text-[#1DB954] font-bold text-xs uppercase mr-2">{job.company || 'Direct Hiring'}</span>
                    <span className="text-secondary meta-text">| {job.location}</span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2">
                        <span className="text-[10px] font-bold bg-white dark:bg-black/20 px-2.5 py-1 rounded-md text-secondary border border-custom">{job.category}</span>
                        <span className="text-[10px] font-bold bg-emerald-50 dark:bg-[#1DB954]/10 px-2.5 py-1 rounded-md text-[#1DB954] border border-[#1DB954]/20">{job.salary}</span>
                    </div>
                    <button className="bg-[#111111] dark:bg-white dark:text-[#111111] text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase hover:opacity-90 transition-all shadow-md">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobBoard;
