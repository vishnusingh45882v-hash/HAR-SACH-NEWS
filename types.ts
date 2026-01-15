
export type PostType = 'news' | 'job' | 'tech' | 'education' | 'sports' | 'entertainment' | 'local';
export type UserType = 'Citizen' | 'Local Reporter' | 'Organization';
export type TrustLevel = 1 | 2 | 3 | 4; // 1: New, 2: Verified, 3: Trusted, 4: Editor
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface NavItem {
  label: string;
  href: string;
}

export interface AppNotification {
  id: string;
  type: 'post' | 'breaking' | 'job' | 'system' | 'message' | 'reply';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  targetId?: string; // ID of post, job, or chat
  authorName?: string;
  category?: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userTrustLevel: TrustLevel;
  text: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
  parentId?: string;
  status: 'active' | 'hidden' | 'deleted' | 'pending';
  isLiked?: boolean;
}

export interface CommentReport {
  id: string;
  commentId: string;
  reportedBy: string;
  reason: 'spam' | 'abuse' | 'fake' | 'harassment';
  text: string; // The content being reported
  status: 'open' | 'reviewed' | 'resolved';
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  type: 'text' | 'image' | 'video' | 'location';
  timestamp: string;
  status: 'sent' | 'seen';
  mediaUrl?: string;
}

export interface ChatSession {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
    trustLevel: TrustLevel;
  }[];
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  location: { state: string; city: string; village?: string };
  type: UserType;
  trustLevel: TrustLevel;
  trustScore: number; // 0-100
  isVerified: boolean;
  avatar?: string;
  joinedDate: string;
  kycLast4: string;
  stats: {
    totalPosted: number;
    approved: number;
    rejected: number;
    reports: number;
    followers: number;
    following: number;
  };
  followingIds?: string[];
  followedCategories?: string[];
  strikes: number;
  ipHistory?: string[];
  lastActive?: string;
  role?: 'Admin' | 'Editor' | 'User';
  settings?: {
    notificationsEnabled: boolean;
    locationAlerts: boolean;
    nightMode: boolean;
    privacyLevel: 'Anyone' | 'Followers' | 'Verified';
  };
}

export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  date: string;
  category: string;
  subCategory?: string;
  type: PostType;
  author?: string;
  authorId?: string;
  authorLevel?: TrustLevel;
  views?: number;
  location?: string;
  tags?: string[];
  isTrending?: boolean;
  isPinned?: boolean;
  proofUrl?: string;
  gpsLocation?: { lat: number; lng: number };
  reportCount?: number;
  status: 'pending' | 'approved' | 'rejected' | 'Live' | 'Finished';
  rejectionReason?: string;
  aiRisk?: RiskLevel;
  aiProbability?: number;
  aiFlags?: string[];
  salary?: string;
  company?: string;
  lastDate?: string;
  matchPercent?: number;
  rating?: number;
  releaseDate?: string;
  impact?: string;
  matchName?: string;
  teams?: { name: string; score: string }[];
  whatsNew?: string;
  examDate?: string;
  importance?: string;
  officialLink?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AdminStats {
  totalNews: number;
  pendingApproval: number;
  reportsToday: number;
  usersRegistered: number;
  rejectedNews: number;
  bannedUsers: number;
  trustedReporters: number;
  aiFlagged: number;
  totalNotificationsSent: number;
  reportedComments?: number;
}
