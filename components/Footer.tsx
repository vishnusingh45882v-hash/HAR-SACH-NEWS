
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">HS</div>
              <span className="text-2xl font-bold">Har Sach</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Building the future of truthful digital engagement. Your partner in branding, media, and tech.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><span className="sr-only">Twitter</span>🐦</a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><span className="sr-only">LinkedIn</span>💼</a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><span className="sr-only">Facebook</span>👤</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#home" className="hover:text-blue-500 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-blue-500 transition-colors">Services</a></li>
              <li><a href="#insights" className="hover:text-blue-500 transition-colors">Insights</a></li>
              <li><a href="#ai" className="hover:text-blue-500 transition-colors">AI Assistant</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start">
                <span className="mr-3">📍</span>
                <span>Har Sach HQ, Digital Valley</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">📧</span>
                <span>contact@harsach.in</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">🌐</span>
                <span>www.harsach.in</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-4 text-sm">Get the weekly "Sach" delivered to your inbox.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-slate-800 border-none px-4 py-3 rounded-l-xl w-full focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <button className="bg-blue-600 px-4 py-3 rounded-r-xl font-bold hover:bg-blue-700">Go</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-10 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Har Sach (harsach.in). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
