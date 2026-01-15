
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">HS</div>
              <span className="text-2xl font-bold italic newspaper-font">Har Sach</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Official professional portal for Har Sach (harsach.in). Sahi Khabar, Sahi Naukri.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/harsach" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">🐦</a>
              <a href="https://facebook.com/harsach" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">👤</a>
              <a href="https://instagram.com/harsach" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">📸</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0A5FFF] mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-xs font-bold uppercase">
              <li><a href="https://www.harsach.in" className="hover:text-blue-500 transition-colors">Visit Official Site</a></li>
              <li><a href="https://www.harsach.in/category/jobs" className="hover:text-blue-500 transition-colors">Job Portal</a></li>
              <li><a href="https://www.harsach.in/category/news" className="hover:text-blue-500 transition-colors">Latest News</a></li>
              <li><a href="#ai" className="hover:text-blue-500 transition-colors">AI Assistant</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0A5FFF] mb-6">Contact Info</h4>
            <ul className="space-y-4 text-slate-400 text-xs font-bold uppercase">
              <li className="flex items-start">
                <span className="mr-3">📍</span>
                <span>Raipur, Chhattisgarh, India</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">📧</span>
                <span>contact@harsach.in</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">🌐</span>
                <a href="https://www.harsach.in" className="hover:text-white transition-colors">www.harsach.in</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0A5FFF] mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-4 text-xs font-medium">Get the weekly "Sach" delivered directly to your inbox.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-slate-800 border-none px-4 py-3 rounded-l-xl w-full focus:ring-1 focus:ring-blue-500 outline-none text-xs"
              />
              <button className="bg-blue-600 px-4 py-3 rounded-r-xl font-bold hover:bg-blue-700 text-xs">GO</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-10 text-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Har Sach (harsach.in). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
