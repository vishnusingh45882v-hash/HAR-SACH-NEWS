
import { Post, PostType, NavItem } from './types';

export const MAIN_TABS = [
  { id: 'breaking', label: '🔴 Breaking', icon: '🔥' },
  { id: 'job', label: '💼 Jobs', icon: '💼' },
  { id: 'tech', label: '💻 Tech', icon: '🤖' },
  { id: 'education', label: '🎓 Education', icon: '📝' },
  { id: 'sports', label: '⚽ Sports', icon: '🏏' },
  { id: 'entertainment', label: '🎬 Ent.', icon: '🍿' }
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: 'https://www.harsach.in/' },
  { label: 'News', href: 'https://www.harsach.in/category/news' },
  { label: 'Jobs', href: 'https://www.harsach.in/category/jobs' },
  { label: 'AI Assistant', href: '#ai' },
  { label: 'About', href: 'https://www.harsach.in/about' }
];

export const SUB_CATEGORIES: Record<string, string[]> = {
  breaking: ['Top Breaking', 'Politics', 'Crime & Accident', 'Weather Alert', 'Local Breaking'],
  job: ['Govt Jobs', 'Private Jobs', 'IT Jobs', 'Freshers Jobs', 'Skill Based', 'Location Wise'],
  tech: ['AI & Technology', 'Mobile & Apps', 'Software Updates', 'Digital India', 'Cyber & Security'],
  education: ['Exam Notifications', 'Result & Admit Card', 'College News', 'Online Courses', 'Study Tips (AI)', 'Scholarships'],
  sports: ['Cricket', 'Football', 'Badminton', 'Olympics', 'Score & Stats'],
  entertainment: ['Film News', 'CG Cinema', 'Bollywood', 'TV Serials', 'Web Series', 'Movie Reviews', 'OTT Releases']
};

const generatePosts = (): Post[] => {
  const types: PostType[] = ['news', 'job', 'tech', 'education', 'sports', 'entertainment'];
  return Array.from({ length: 120 }).map((_, i) => {
    const type = types[i % types.length] || 'news';
    const categoryKey = type === 'news' ? 'breaking' : type;
    const subs = SUB_CATEGORIES[categoryKey] || [];
    const subCat = subs.length > 0 ? subs[i % subs.length] : 'General';

    const base: Post = {
      id: `p-${i}`,
      title: `${subCat}: ${i % 2 === 0 ? 'Breaking Update' : 'New Report'} from Har Sach.`,
      content: "Verified news and career updates from harsach.in. We ensure that every piece of information is cross-checked with official sources before publishing.",
      thumbnail: `https://picsum.photos/seed/harsach-${i}/800/600`,
      date: `${Math.floor(Math.random() * 55) + 5} min ago`,
      category: i % 2 === 0 ? 'National' : 'Regional',
      type: type,
      subCategory: subCat,
      views: Math.floor(Math.random() * 15000) + 500,
      status: 'approved',
      location: i % 3 === 0 ? 'Raipur' : i % 3 === 1 ? 'Delhi' : 'Bastar',
      isTrending: i % 10 === 0,
      author: 'Har Sach Bureau',
      authorLevel: 3,
      teams: [],
      reportCount: 0,
      officialLink: 'https://www.harsach.in'
    };

    if (type === 'job') {
      base.company = i % 2 === 0 ? 'SSC / Railway' : 'Tech Mahindra';
      base.salary = i % 2 === 0 ? '₹35k - ₹55k' : '₹8L - ₹12L PA';
      base.lastDate = '15 Nov 2024';
      base.matchPercent = 75 + (i % 25);
    } else if (type === 'tech') {
      base.whatsNew = 'Latest AI tools integrated on harsach.in portal.';
      base.impact = i % 3 === 0 ? 'High' : 'Medium';
    } else if (type === 'education') {
      base.examDate = 'Dec 2024';
      base.importance = i % 2 === 0 ? 'Urgent' : 'Regular';
      base.officialLink = 'https://www.harsach.in/category/education';
    } else if (type === 'sports') {
      base.matchName = subCat === 'Cricket' ? 'World Cup' : 'Pro Kabaddi';
      base.status = i % 2 === 0 ? 'Live' : 'Finished';
      base.teams = [{ name: 'IND', score: '240/3' }, { name: 'AUS', score: '110/5' }];
    } else if (type === 'entertainment') {
      base.rating = (i % 5) + 1;
      base.releaseDate = 'Out Now / OTT';
    }

    return base;
  });
};

export const MOCK_POSTS = generatePosts();

export const JOB_CATEGORIES = [
  { id: 'news', title: 'Journalism', icon: '📰', description: 'Be a reporter at Har Sach. Apply via harsach.in' },
  { id: 'it', title: 'Tech & IT', icon: '💻', description: 'Web dev and AI roles for techies.' },
  { id: 'govt', title: 'Government', icon: '🏛️', description: 'Daily sarkari naukri alerts.' }
];

export const LATEST_NEWS = (MOCK_POSTS || []).filter(p => p.type === 'news').slice(0, 8);
export const FEATURED_JOBS = (MOCK_POSTS || []).filter(p => p.type === 'job').slice(0, 6);
