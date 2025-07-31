import { v4 as uuidv4 } from 'uuid';
import { IDDocument } from './idVerification';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  age: number;
  location: string;
  occupation?: string;
  maritalStatus: 'single' | 'married';
  workStatus: 'working' | 'student' | 'both';
  profilePhoto?: string;
  isVerified: boolean;
  idDocument?: IDDocument;
  createdAt: string;
  updatedAt: string;
}

export interface SurveyResponse {
  userId: string;
  sleepSchedule: 'early_bird' | 'night_owl' | 'flexible' | 'work_dependent';
  cleanliness: 'very_organized' | 'tidy' | 'clean_when_needed' | 'relaxed';
  sociability: 'love_guests' | 'occasional_ok' | 'prefer_quiet' | 'open_to_preferences';
  personalSpace: 'need_lots' | 'moderate' | 'love_together' | 'very_flexible';
  dealBreakers: 'smoking_drinking' | 'loud_parties' | 'frequent_partners' | 'poor_hygiene';
  roomPreference: 'window_side' | 'ground_level' | 'no_preference';
  workHours: 'standard_9_5' | 'flexible' | 'night_shift' | 'student_schedule';
  noiseTolerance: 'very_quiet' | 'moderate' | 'can_handle_noise' | 'no_preference';
}

export interface Room {
  id: string;
  name: string;
  side: 'window' | 'door';
  isOccupied: boolean;
  occupantId?: string;
}

export interface MatchResult {
  roommateId: string;
  roommateName: string;
  matchScore: number;
  suggestedRoom: Room;
  explanation: string;
}

// In-memory database simulation - In production, use a real database
class Database {
  private users: Map<string, UserProfile> = new Map();
  private surveys: Map<string, SurveyResponse> = new Map();
  private rooms: Room[] = [
    { id: 'room-1-window', name: 'Room 1', side: 'window', isOccupied: false },
    { id: 'room-1-door', name: 'Room 1', side: 'door', isOccupied: false },
    { id: 'room-2-window', name: 'Room 2', side: 'window', isOccupied: false },
    { id: 'room-2-door', name: 'Room 2', side: 'door', isOccupied: false },
    { id: 'room-3-window', name: 'Room 3', side: 'window', isOccupied: false },
    { id: 'room-3-door', name: 'Room 3', side: 'door', isOccupied: false },
  ];

  async createUser(userData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserProfile> {
    const user: UserProfile = {
      ...userData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.users.set(user.id, user);
    return user;
  }

  async getUserByEmail(email: string): Promise<UserProfile | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async getUserById(id: string): Promise<UserProfile | null> {
    return this.users.get(id) || null;
  }

  async updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async saveSurveyResponse(response: SurveyResponse): Promise<void> {
    this.surveys.set(response.userId, response);
  }

  async getSurveyResponse(userId: string): Promise<SurveyResponse | null> {
    return this.surveys.get(userId) || null;
  }

  async getVerifiedUsers(): Promise<UserProfile[]> {
    return Array.from(this.users.values()).filter(user => 
      user.isVerified && user.idDocument?.isVerified
    );
  }

  async getAvailableRooms(): Promise<Room[]> {
    return this.rooms.filter(room => !room.isOccupied);
  }

  async assignRoom(roomId: string, userId: string): Promise<boolean> {
    const room = this.rooms.find(r => r.id === roomId);
    if (room && !room.isOccupied) {
      room.isOccupied = true;
      room.occupantId = userId;
      return true;
    }
    return false;
  }
}

export const db = new Database();

// Compatibility scoring algorithm
export const calculateCompatibilityScore = (
  user1Survey: SurveyResponse,
  user2Survey: SurveyResponse
): number => {
  let score = 0;
  let totalFactors = 0;

  // Sleep schedule compatibility (20% weight)
  if (user1Survey.sleepSchedule === user2Survey.sleepSchedule) {
    score += 20;
  } else if (
    (user1Survey.sleepSchedule === 'flexible' || user2Survey.sleepSchedule === 'flexible') ||
    (user1Survey.sleepSchedule === 'work_dependent' || user2Survey.sleepSchedule === 'work_dependent')
  ) {
    score += 15;
  } else {
    score += 5;
  }
  totalFactors += 20;

  // Cleanliness compatibility (25% weight)
  const cleanlinessScore = {
    'very_organized': 4,
    'tidy': 3,
    'clean_when_needed': 2,
    'relaxed': 1
  };
  const cleanDiff = Math.abs(
    cleanlinessScore[user1Survey.cleanliness] - cleanlinessScore[user2Survey.cleanliness]
  );
  score += Math.max(0, 25 - (cleanDiff * 8));
  totalFactors += 25;

  // Sociability compatibility (20% weight)
  if (user1Survey.sociability === user2Survey.sociability) {
    score += 20;
  } else if (
    user1Survey.sociability === 'open_to_preferences' || 
    user2Survey.sociability === 'open_to_preferences'
  ) {
    score += 15;
  } else {
    score += 10;
  }
  totalFactors += 20;

  // Personal space compatibility (15% weight)
  if (user1Survey.personalSpace === user2Survey.personalSpace) {
    score += 15;
  } else if (
    user1Survey.personalSpace === 'very_flexible' || 
    user2Survey.personalSpace === 'very_flexible'
  ) {
    score += 12;
  } else {
    score += 8;
  }
  totalFactors += 15;

  // Deal breakers compatibility (10% weight)
  if (user1Survey.dealBreakers === user2Survey.dealBreakers) {
    score += 10;
  } else {
    score += 5;
  }
  totalFactors += 10;

  // Noise tolerance (10% weight)
  if (user1Survey.noiseTolerance === user2Survey.noiseTolerance) {
    score += 10;
  } else if (
    user1Survey.noiseTolerance === 'no_preference' || 
    user2Survey.noiseTolerance === 'no_preference'
  ) {
    score += 8;
  } else {
    score += 5;
  }
  totalFactors += 10;

  return Math.round((score / totalFactors) * 100);
};

export const findBestMatch = async (userId: string): Promise<MatchResult | null> => {
  const currentUser = await db.getUserById(userId);
  const currentUserSurvey = await db.getSurveyResponse(userId);
  
  if (!currentUser || !currentUserSurvey || !currentUser.isVerified) {
    return null;
  }

  const verifiedUsers = await db.getVerifiedUsers();
  const availableRooms = await db.getAvailableRooms();
  
  if (availableRooms.length === 0) {
    return null;
  }

  // Filter out current user and find potential matches
  const potentialMatches = verifiedUsers.filter(user => user.id !== userId);
  
  if (potentialMatches.length === 0) {
    return null;
  }

  let bestMatch: UserProfile | null = null;
  let bestScore = 0;
  let bestExplanation = '';

  for (const user of potentialMatches) {
    const userSurvey = await db.getSurveyResponse(user.id);
    if (!userSurvey) continue;

    const score = calculateCompatibilityScore(currentUserSurvey, userSurvey);
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = user;
      
      // Generate explanation
      const explanations = [];
      if (currentUserSurvey.sleepSchedule === userSurvey.sleepSchedule) {
        explanations.push('similar sleep schedules');
      }
      if (currentUserSurvey.cleanliness === userSurvey.cleanliness) {
        explanations.push('matching cleanliness preferences');
      }
      if (currentUserSurvey.sociability === userSurvey.sociability) {
        explanations.push('compatible social preferences');
      }
      
      bestExplanation = explanations.length > 0 
        ? `Great match based on ${explanations.join(' and ')}.`
        : 'Compatible lifestyle preferences make this a good match.';
    }
  }

  if (!bestMatch) {
    return null;
  }

  // Find suitable room based on preferences
  let suggestedRoom = availableRooms[0]; // Default
  
  if (currentUserSurvey.roomPreference === 'window_side') {
    const windowRoom = availableRooms.find(room => room.side === 'window');
    if (windowRoom) suggestedRoom = windowRoom;
  } else if (currentUserSurvey.roomPreference === 'ground_level') {
    const groundRoom = availableRooms.find(room => room.name.includes('1'));
    if (groundRoom) suggestedRoom = groundRoom;
  }

  return {
    roommateId: bestMatch.id,
    roommateName: bestMatch.fullName,
    matchScore: bestScore,
    suggestedRoom,
    explanation: bestExplanation
  };
};