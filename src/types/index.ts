// User and Profile Types
export interface User {
  id: string;
  email: string;
  isVerified: boolean;
  verifiedAt?: Date;
  governmentIdVerified: boolean;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  // Personal Info
  fullName: string;
  age: number;
  pronouns?: string;
  relationshipStatus: 'single' | 'married' | 'prefer-not-to-say';
  occupation: 'student' | 'working' | 'freelancer' | 'between-jobs';
  location: string;
  preferredAreas: string[];
  profilePhoto?: string;
  bio?: string;
  
  // Safety & Trust
  backgroundCheckComplete: boolean;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  safetyPreferences: {
    shareLocationWithMatches: boolean;
    allowVideoCallVerification: boolean;
    preferVerifiedUsersOnly: boolean;
  };
  
  // Inclusive Features
  accessibility: {
    mobilityNeeds?: string[];
    dietaryRestrictions?: string[];
    languagesSpoken: string[];
    culturalPreferences?: string[];
  };
  
  // Survey Responses
  surveyResponses: SurveyResponse[];
  
  // Matching Preferences
  roomPreferences: RoomPreferences;
  
  // Privacy Settings
  privacy: {
    hideAge: boolean;
    hideLocation: boolean;
    onlyMatchVerifiedUsers: boolean;
  };
  
  // Community Features
  badges: string[];
  communityScore: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface SurveyResponse {
  questionId: string;
  answer: string;
  weight: number; // importance level 1-5
}

export interface RoomPreferences {
  bedType: 'twin' | 'single' | 'no-preference';
  floorLevel: 'ground' | 'high' | 'no-preference';
  furnished: boolean;
  privateBathroom: boolean;
  budgetRange: {
    min: number;
    max: number;
  };
  moveInDate: Date;
  leaseDuration: '3-months' | '6-months' | '1-year' | 'flexible';
  amenities: string[];
}

// Room and Matching Types
export interface Room {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  photos: string[];
  bedType: 'twin' | 'single';
  furnished: boolean;
  privateBathroom: boolean;
  rent: number;
  utilities: {
    included: string[];
    additional: string[];
  };
  amenities: string[];
  houseRules: string[];
  floorLevel: number;
  safetyFeatures: string[];
  availableFrom: Date;
  availableUntil?: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface MatchResult {
  id: string;
  user1Id: string;
  user2Id: string;
  roomId?: string;
  compatibilityScore: number;
  matchFactors: MatchFactor[];
  roomCompatibilityScore?: number;
  explanationText: string;
  confidenceLevel: 'high' | 'medium' | 'low';
  createdAt: Date;
  status: 'pending' | 'both-interested' | 'one-interested' | 'declined';
}

export interface MatchFactor {
  category: string;
  description: string;
  score: number;
  importance: 'high' | 'medium' | 'low';
}

// Survey and Compatibility Types
export interface SurveyQuestion {
  id: string;
  question: string;
  category: 'lifestyle' | 'social' | 'cleanliness' | 'schedule' | 'boundaries';
  options: SurveyOption[];
  weight: number;
  isRequired: boolean;
}

export interface SurveyOption {
  id: string;
  text: string;
  value: string;
  compatibilityTags: string[];
}

// Admin Types
export interface AdminDashboard {
  totalUsers: number;
  verifiedUsers: number;
  activeMatches: number;
  roomsAvailable: number;
  successfulMatches: number;
  pendingVerifications: number;
}

export interface AdminUserView {
  profile: UserProfile;
  matchHistory: MatchResult[];
  reportCount: number;
  lastActive: Date;
  status: 'active' | 'suspended' | 'pending-verification';
}

// Safety and Trust Types
export interface SafetyReport {
  id: string;
  reporterId: string;
  reportedUserId: string;
  type: 'fake-profile' | 'inappropriate-behavior' | 'safety-concern' | 'harassment';
  description: string;
  evidence?: string[];
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: Date;
}

export interface TrustScore {
  userId: string;
  overallScore: number;
  factors: {
    verification: number;
    communityFeedback: number;
    profileCompleteness: number;
    responsiveness: number;
  };
  lastUpdated: Date;
}

// Communication Types
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'voice' | 'system';
  readAt?: Date;
  createdAt: Date;
}

export interface VideoCallVerification {
  id: string;
  participants: string[];
  scheduledAt: Date;
  completedAt?: Date;
  verificationResult?: 'verified' | 'failed' | 'rescheduled';
  moderatorNotes?: string;
}