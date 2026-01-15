
import React from 'react';

interface BottomNavProps {
  activeTab: 'home' | 'news' | 'chat' | 'jobs' | 'profile';
  setActiveTab: (tab: 'home' | 'news' | 'chat' | 'jobs' | 'profile') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'news', label: 'News', icon: 'article' },
    { id: 'chat', label: 'Chat', icon: 'chat' },
    { id: 'jobs', label: 'Jobs', icon: 'work' },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  const Icon = ({ name, active }: { name: string, active: boolean }) => {
    const color = active ? 'var(--primary)' : '#9CA3AF';
    switch (name) {
      case 'home': return <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={color} strokeWidth="2"><path d="M3 9.5L12 3L21 9.5V21H15V15H9V21H3V9.5Z"/></svg>;
      case 'article': return <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={color} strokeWidth="2"><path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"/><path d="M7 7H17M7 12H17M7 17H13"/></svg>;
      case 'chat': return <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={color} strokeWidth="2"><path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"/></svg>;
      case 'work': return <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={color} strokeWidth="2"><path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"/><path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21"/></svg>;
      case 'person': return <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={color} strokeWidth="2"><path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"/><circle cx="12" cy="7" r="4"/></svg>;
      default: return null;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1B1B1B] border-t border-custom h-[70px] z-[70] px-2 flex justify-around items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex flex-col items-center justify-center py-2 flex-1 relative"
          >
            <div className={`mb-1 transition-all ${isActive ? 'scale-110' : 'opacity-60'}`}>
              <Icon name={tab.icon} active={isActive} />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-tight ${isActive ? 'text-[#0A5FFF] dark:text-[#4D8DFF]' : 'text-[#9CA3AF]'}`}>
              {tab.label}
            </span>
            {isActive && <div className="absolute bottom-1 w-1 h-1 bg-primary-custom rounded-full animate-pulse"></div>}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
