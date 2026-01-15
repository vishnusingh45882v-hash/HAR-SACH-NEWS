
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-2 shadow-sm' : 'bg-white py-4 border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg transform rotate-3">H</div>
            <span className="newspaper-font text-2xl font-black tracking-tighter text-slate-900 uppercase italic">
              Har <span className="text-red-600">Sach</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-900 hover:text-red-600 text-xs font-black uppercase tracking-tighter transition-colors px-2"
              >
                {item.label}
              </a>
            ))}
            <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 shadow-lg">
              Post Vacancy
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-6 flex flex-col space-y-4 shadow-2xl">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-900 font-black py-2 uppercase text-lg italic border-b border-slate-50"
            >
              {item.label}
            </a>
          ))}
          <button className="bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-widest">Post A Job</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
