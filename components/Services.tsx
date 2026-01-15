
import React from 'react';
import { JOB_CATEGORIES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="categories" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">Job Sectors</h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600">
            Find the right path by browsing through our most active job categories.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {JOB_CATEGORIES.map((cat) => (
            <div key={cat.id} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-2">
              <div className="text-4xl mb-6 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-blue-600 transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{cat.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {cat.description}
              </p>
              <a href="#" className="text-blue-600 font-bold inline-flex items-center hover:translate-x-2 transition-transform">
                Explore Category
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
