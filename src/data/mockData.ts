import { UserProfile, Room, MatchResult, SurveyQuestion } from '@/types';

// Enhanced Survey Questions with Inclusive Options
export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'sleep_schedule',
    question: "What's your ideal sleeping schedule?",
    category: 'schedule',
    weight: 5,
    isRequired: true,
    options: [
      {
        id: 'early_bird',
        text: 'Early bird (sleep by 10 PM, wake up by 6 AM)',
        value: 'early_bird',
        compatibilityTags: ['morning-person', 'quiet-evenings']
      },
      {
        id: 'night_owl',
        text: 'Night owl (sleep after midnight, wake up late)',
        value: 'night_owl',
        compatibilityTags: ['late-night', 'quiet-mornings']
      },
      {
        id: 'flexible_schedule',
        text: 'Flexible schedule - I adapt easily',
        value: 'flexible_schedule',
        compatibilityTags: ['adaptable', 'understanding']
      },
      {
        id: 'depends_on_work',
        text: 'Varies with work/study commitments',
        value: 'depends_on_work',
        compatibilityTags: ['professional', 'adaptable']
      }
    ]
  },
  {
    id: 'social_frequency',
    question: "How do you prefer to socialize at home?",
    category: 'social',
    weight: 4,
    isRequired: true,
    options: [
      {
        id: 'love_friends_over',
        text: 'Love having friends over frequently',
        value: 'love_friends_over',
        compatibilityTags: ['social', 'hosting', 'outgoing']
      },
      {
        id: 'occasional_gatherings',
        text: 'Occasional small gatherings (2-4 people)',
        value: 'occasional_gatherings',
        compatibilityTags: ['balanced-social', 'selective']
      },
      {
        id: 'prefer_quiet',
        text: 'Prefer quiet, minimal visitors',
        value: 'prefer_quiet',
        compatibilityTags: ['introverted', 'peaceful', 'study-focused']
      },
      {
        id: 'roommate_space',
        text: 'Want to connect with roommate, but respect boundaries',
        value: 'roommate_space',
        compatibilityTags: ['balanced', 'respectful', 'friendship-open']
      }
    ]
  },
  {
    id: 'cleanliness_level',
    question: "What's your approach to cleanliness and organization?",
    category: 'cleanliness',
    weight: 5,
    isRequired: true,
    options: [
      {
        id: 'very_organized',
        text: 'Very organized - clean daily, everything has a place',
        value: 'very_organized',
        compatibilityTags: ['neat', 'organized', 'detailed']
      },
      {
        id: 'tidy_most_time',
        text: 'Generally tidy - clean regularly, occasional mess is ok',
        value: 'tidy_most_time',
        compatibilityTags: ['clean', 'realistic', 'balanced']
      },
      {
        id: 'clean_when_needed',
        text: 'Clean when needed - practical approach',
        value: 'clean_when_needed',
        compatibilityTags: ['practical', 'low-maintenance']
      },
      {
        id: 'shared_responsibility',
        text: 'Prefer shared cleaning schedule and responsibilities',
        value: 'shared_responsibility',
        compatibilityTags: ['collaborative', 'fair', 'structured']
      }
    ]
  },
  {
    id: 'personal_space',
    question: "How important is personal space and alone time?",
    category: 'boundaries',
    weight: 4,
    isRequired: true,
    options: [
      {
        id: 'need_lots_space',
        text: 'Need significant alone time to recharge',
        value: 'need_lots_space',
        compatibilityTags: ['introverted', 'independent', 'respectful-distance']
      },
      {
        id: 'moderate_space',
        text: 'Moderate personal space - balance of together/apart time',
        value: 'moderate_space',
        compatibilityTags: ['balanced', 'flexible', 'understanding']
      },
      {
        id: 'love_together_time',
        text: 'Enjoy spending time together - potential friendship',
        value: 'love_together_time',
        compatibilityTags: ['social', 'friendship-focused', 'outgoing']
      },
      {
        id: 'communicate_needs',
        text: 'Prefer open communication about space needs',
        value: 'communicate_needs',
        compatibilityTags: ['communicative', 'mature', 'understanding']
      }
    ]
  },
  {
    id: 'lifestyle_priorities',
    question: "What are your top lifestyle priorities in a living situation?",
    category: 'lifestyle',
    weight: 4,
    isRequired: true,
    options: [
      {
        id: 'study_focused',
        text: 'Study/work-focused environment with minimal distractions',
        value: 'study_focused',
        compatibilityTags: ['academic', 'quiet', 'goal-oriented']
      },
      {
        id: 'health_wellness',
        text: 'Health & wellness - fitness, healthy eating, self-care',
        value: 'health_wellness',
        compatibilityTags: ['healthy', 'active', 'mindful']
      },
      {
        id: 'creative_space',
        text: 'Creative and inspiring environment',
        value: 'creative_space',
        compatibilityTags: ['artistic', 'innovative', 'expressive']
      },
      {
        id: 'safety_security',
        text: 'Safety, security, and peaceful environment',
        value: 'safety_security',
        compatibilityTags: ['security-conscious', 'peaceful', 'responsible']
      },
      {
        id: 'budget_friendly',
        text: 'Budget-conscious with smart spending',
        value: 'budget_friendly',
        compatibilityTags: ['practical', 'economical', 'resourceful']
      }
    ]
  }
];

// Sample Real User Profiles (Government Verified)
export const sampleUserProfiles: UserProfile[] = [
  {
    id: 'user1',
    userId: 'auth_user1',
    fullName: 'Sarah Chen',
    age: 24,
    pronouns: 'she/her',
    relationshipStatus: 'single',
    occupation: 'working',
    location: 'Downtown District',
    preferredAreas: ['Downtown District', 'Tech Hub', 'University Area'],
    profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Software engineer who loves clean spaces, occasional social gatherings, and maintaining work-life balance. Looking for a reliable roommate who shares similar values.',
    backgroundCheckComplete: true,
    emergencyContact: {
      name: 'Linda Chen',
      phone: '+1-555-0123',
      relationship: 'Mother'
    },
    safetyPreferences: {
      shareLocationWithMatches: true,
      allowVideoCallVerification: true,
      preferVerifiedUsersOnly: true
    },
    accessibility: {
      dietaryRestrictions: ['vegetarian'],
      languagesSpoken: ['English', 'Mandarin'],
      culturalPreferences: ['Asian cuisine', 'Mindfulness practices']
    },
    surveyResponses: [
      { questionId: 'sleep_schedule', answer: 'early_bird', weight: 5 },
      { questionId: 'social_frequency', answer: 'occasional_gatherings', weight: 4 },
      { questionId: 'cleanliness_level', answer: 'very_organized', weight: 5 },
      { questionId: 'personal_space', answer: 'moderate_space', weight: 4 },
      { questionId: 'lifestyle_priorities', answer: 'health_wellness', weight: 4 }
    ],
    roomPreferences: {
      bedType: 'twin',
      floorLevel: 'high',
      furnished: true,
      privateBathroom: false,
      budgetRange: { min: 800, max: 1200 },
      moveInDate: new Date('2024-08-01'),
      leaseDuration: '1-year',
      amenities: ['gym', 'wifi', 'laundry', 'kitchen']
    },
    privacy: {
      hideAge: false,
      hideLocation: false,
      onlyMatchVerifiedUsers: true
    },
    badges: ['Verified ID', 'Background Check', 'Early Responder'],
    communityScore: 95,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: 'user2',
    userId: 'auth_user2',
    fullName: 'Priya Sharma',
    age: 22,
    pronouns: 'she/her',
    relationshipStatus: 'single',
    occupation: 'student',
    location: 'University Area',
    preferredAreas: ['University Area', 'Student District', 'Downtown District'],
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Medical student dedicated to studies but also values mental health and balance. Seeking a roommate who understands the demands of professional programs.',
    backgroundCheckComplete: true,
    emergencyContact: {
      name: 'Raj Sharma',
      phone: '+1-555-0124',
      relationship: 'Father'
    },
    safetyPreferences: {
      shareLocationWithMatches: true,
      allowVideoCallVerification: true,
      preferVerifiedUsersOnly: true
    },
    accessibility: {
      dietaryRestrictions: ['vegetarian', 'lactose-intolerant'],
      languagesSpoken: ['English', 'Hindi', 'Punjabi'],
      culturalPreferences: ['Indian cuisine', 'Meditation', 'Bollywood']
    },
    surveyResponses: [
      { questionId: 'sleep_schedule', answer: 'flexible_schedule', weight: 4 },
      { questionId: 'social_frequency', answer: 'prefer_quiet', weight: 5 },
      { questionId: 'cleanliness_level', answer: 'tidy_most_time', weight: 4 },
      { questionId: 'personal_space', answer: 'need_lots_space', weight: 5 },
      { questionId: 'lifestyle_priorities', answer: 'study_focused', weight: 5 }
    ],
    roomPreferences: {
      bedType: 'twin',
      floorLevel: 'no-preference',
      furnished: true,
      privateBathroom: false,
      budgetRange: { min: 600, max: 900 },
      moveInDate: new Date('2024-08-15'),
      leaseDuration: '1-year',
      amenities: ['wifi', 'study_area', 'quiet_hours', 'library_access']
    },
    privacy: {
      hideAge: false,
      hideLocation: false,
      onlyMatchVerifiedUsers: true
    },
    badges: ['Verified ID', 'Student Verified', 'Honor Student'],
    communityScore: 92,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-07-22')
  },
  {
    id: 'user3',
    userId: 'auth_user3',
    fullName: 'Emma Rodriguez',
    age: 26,
    pronouns: 'she/her',
    relationshipStatus: 'single',
    occupation: 'working',
    location: 'Business District',
    preferredAreas: ['Business District', 'Arts Quarter', 'Downtown District'],
    profilePhoto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    bio: 'Marketing professional who loves creativity, hosting intimate gatherings, and exploring the city. Looking for a roommate who shares a zest for life!',
    backgroundCheckComplete: true,
    emergencyContact: {
      name: 'Carlos Rodriguez',
      phone: '+1-555-0125',
      relationship: 'Brother'
    },
    safetyPreferences: {
      shareLocationWithMatches: true,
      allowVideoCallVerification: true,
      preferVerifiedUsersOnly: false
    },
    accessibility: {
      languagesSpoken: ['English', 'Spanish'],
      culturalPreferences: ['Latin cuisine', 'Art galleries', 'Live music']
    },
    surveyResponses: [
      { questionId: 'sleep_schedule', answer: 'night_owl', weight: 3 },
      { questionId: 'social_frequency', answer: 'love_friends_over', weight: 5 },
      { questionId: 'cleanliness_level', answer: 'tidy_most_time', weight: 3 },
      { questionId: 'personal_space', answer: 'love_together_time', weight: 4 },
      { questionId: 'lifestyle_priorities', answer: 'creative_space', weight: 5 }
    ],
    roomPreferences: {
      bedType: 'twin',
      floorLevel: 'high',
      furnished: false,
      privateBathroom: true,
      budgetRange: { min: 1000, max: 1500 },
      moveInDate: new Date('2024-07-30'),
      leaseDuration: '1-year',
      amenities: ['rooftop', 'entertainment_area', 'wifi', 'parking']
    },
    privacy: {
      hideAge: false,
      hideLocation: false,
      onlyMatchVerifiedUsers: false
    },
    badges: ['Verified ID', 'Background Check', 'Community Leader'],
    communityScore: 88,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-07-18')
  }
];

// Sample Available Rooms
export const sampleRooms: Room[] = [
  {
    id: 'room1',
    ownerId: 'owner1',
    title: 'Modern Twin Room in Safe Downtown Complex',
    description: 'Beautiful twin-sharing room with great natural light, security features, and close to public transport.',
    location: 'Downtown District',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
    bedType: 'twin',
    furnished: true,
    privateBathroom: false,
    rent: 1100,
    utilities: {
      included: ['wifi', 'electricity', 'water'],
      additional: ['cable', 'parking']
    },
    amenities: ['gym', 'laundry', 'kitchen', 'study_area', 'rooftop'],
    houseRules: ['No smoking', 'Quiet hours 10 PM - 7 AM', 'Guest policy: max 2 nights/week'],
    floorLevel: 8,
    safetyFeatures: ['24/7 security', 'keycard_access', 'security_cameras', 'emergency_contacts'],
    availableFrom: new Date('2024-08-01'),
    availableUntil: new Date('2025-08-01'),
    isActive: true,
    createdAt: new Date('2024-07-01')
  },
  {
    id: 'room2',
    ownerId: 'owner2',
    title: 'Cozy Twin Room Near University - Student Friendly',
    description: 'Perfect for students! Quiet environment, study-friendly with great wifi and library access.',
    location: 'University Area',
    coordinates: { lat: 40.7282, lng: -73.9942 },
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    bedType: 'twin',
    furnished: true,
    privateBathroom: false,
    rent: 850,
    utilities: {
      included: ['wifi', 'electricity', 'water', 'heating'],
      additional: ['cable']
    },
    amenities: ['wifi', 'study_area', 'library_access', 'kitchen', 'laundry'],
    houseRules: ['No smoking', 'Quiet study hours', 'Clean common areas after use'],
    floorLevel: 3,
    safetyFeatures: ['secure_building', 'keypad_entry', 'well_lit_area'],
    availableFrom: new Date('2024-08-15'),
    availableUntil: new Date('2025-06-15'),
    isActive: true,
    createdAt: new Date('2024-06-15')
  },
  {
    id: 'room3',
    ownerId: 'owner3',
    title: 'Luxury Twin Suite with Private Bathroom',
    description: 'Upscale twin room with private bathroom, perfect for working professionals who value comfort and style.',
    location: 'Business District',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
    bedType: 'twin',
    furnished: false,
    privateBathroom: true,
    rent: 1400,
    utilities: {
      included: ['wifi', 'electricity', 'water', 'heating', 'cable'],
      additional: ['parking', 'gym_membership']
    },
    amenities: ['gym', 'rooftop', 'entertainment_area', 'wifi', 'parking', 'concierge'],
    houseRules: ['No smoking', 'Professional atmosphere', 'Guest policy flexible'],
    floorLevel: 15,
    safetyFeatures: ['24/7_concierge', 'security_cameras', 'keycard_access', 'emergency_system'],
    availableFrom: new Date('2024-07-30'),
    availableUntil: new Date('2025-07-30'),
    isActive: true,
    createdAt: new Date('2024-06-20')
  }
];