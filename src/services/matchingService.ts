import { UserProfile, Room, MatchResult, MatchFactor, SurveyResponse } from '@/types';

export class MatchingService {
  
  /**
   * Calculate compatibility score between two user profiles
   */
  static calculateCompatibilityScore(profile1: UserProfile, profile2: UserProfile): number {
    const factors = this.getMatchFactors(profile1, profile2);
    const weightedScore = factors.reduce((sum, factor) => {
      const weight = factor.importance === 'high' ? 3 : factor.importance === 'medium' ? 2 : 1;
      return sum + (factor.score * weight);
    }, 0);
    
    const totalWeight = factors.reduce((sum, factor) => {
      return sum + (factor.importance === 'high' ? 3 : factor.importance === 'medium' ? 2 : 1);
    }, 0);
    
    return Math.round((weightedScore / totalWeight) * 100);
  }

  /**
   * Get detailed match factors between two profiles
   */
  static getMatchFactors(profile1: UserProfile, profile2: UserProfile): MatchFactor[] {
    const factors: MatchFactor[] = [];

    // Lifestyle Compatibility
    const lifestyleScore = this.compareLifestylePreferences(profile1, profile2);
    factors.push({
      category: 'Lifestyle',
      description: `Your living habits and daily routines align ${lifestyleScore > 80 ? 'perfectly' : lifestyleScore > 60 ? 'well' : 'moderately'}`,
      score: lifestyleScore,
      importance: 'high'
    });

    // Schedule Compatibility
    const scheduleScore = this.compareSchedules(profile1, profile2);
    factors.push({
      category: 'Schedule',
      description: `Your sleep and work schedules ${scheduleScore > 80 ? 'match excellently' : scheduleScore > 60 ? 'complement each other' : 'have some overlap'}`,
      score: scheduleScore,
      importance: 'high'
    });

    // Social Compatibility
    const socialScore = this.compareSocialPreferences(profile1, profile2);
    factors.push({
      category: 'Social',
      description: `Your social preferences ${socialScore > 80 ? 'align perfectly' : socialScore > 60 ? 'work well together' : 'are compatible'}`,
      score: socialScore,
      importance: 'medium'
    });

    // Cleanliness & Organization
    const cleanlinessScore = this.compareCleanlinessStandards(profile1, profile2);
    factors.push({
      category: 'Cleanliness',
      description: `Your cleanliness standards ${cleanlinessScore > 80 ? 'match perfectly' : cleanlinessScore > 60 ? 'are very compatible' : 'align reasonably well'}`,
      score: cleanlinessScore,
      importance: 'high'
    });

    // Cultural & Inclusive Compatibility
    const culturalScore = this.compareCulturalPreferences(profile1, profile2);
    if (culturalScore > 0) {
      factors.push({
        category: 'Cultural',
        description: `You share cultural interests and language compatibility`,
        score: culturalScore,
        importance: 'medium'
      });
    }

    // Professional Compatibility
    const professionalScore = this.compareProfessionalAlignment(profile1, profile2);
    factors.push({
      category: 'Professional',
      description: `Your work/study schedules ${professionalScore > 80 ? 'align well' : professionalScore > 60 ? 'are compatible' : 'can work together'}`,
      score: professionalScore,
      importance: 'medium'
    });

    return factors;
  }

  /**
   * Find compatible rooms for a match
   */
  static findCompatibleRooms(profile1: UserProfile, profile2: UserProfile, availableRooms: Room[]): Room[] {
    return availableRooms.filter(room => {
      // Check budget compatibility
      const avgBudget = (profile1.roomPreferences.budgetRange.max + profile2.roomPreferences.budgetRange.max) / 2;
      if (room.rent > avgBudget) return false;

      // Check bed type preference
      const bedTypeMatch = (
        (profile1.roomPreferences.bedType === 'twin' || profile1.roomPreferences.bedType === 'no-preference') &&
        (profile2.roomPreferences.bedType === 'twin' || profile2.roomPreferences.bedType === 'no-preference') &&
        room.bedType === 'twin'
      );
      if (!bedTypeMatch) return false;

      // Check location preferences
      const locationMatch = (
        profile1.preferredAreas.includes(room.location) || 
        profile2.preferredAreas.includes(room.location)
      );
      if (!locationMatch && profile1.preferredAreas.length > 0 && profile2.preferredAreas.length > 0) return false;

      // Check availability dates
      const moveInDate1 = new Date(profile1.roomPreferences.moveInDate);
      const moveInDate2 = new Date(profile2.roomPreferences.moveInDate);
      const latestMoveIn = moveInDate1 > moveInDate2 ? moveInDate1 : moveInDate2;
      if (room.availableFrom > latestMoveIn) return false;

      return true;
    }).sort((a, b) => {
      // Sort by room quality score (combine multiple factors)
      const scoreA = this.calculateRoomScore(a, profile1, profile2);
      const scoreB = this.calculateRoomScore(b, profile1, profile2);
      return scoreB - scoreA;
    });
  }

  /**
   * Generate match explanation text
   */
  static generateMatchExplanation(factors: MatchFactor[], room?: Room): string {
    const highScoreFactors = factors.filter(f => f.score > 80);
    const strongPoints = highScoreFactors.map(f => f.category.toLowerCase()).join(', ');
    
    let explanation = `You're a great match because you align well on ${strongPoints || 'key compatibility factors'}. `;
    
    if (room) {
      explanation += `We've also found a perfect twin-sharing room that meets both your preferences for location, budget, and amenities.`;
    } else {
      explanation += `Our AI recommends you both search for rooms together to find the perfect twin-sharing space.`;
    }

    return explanation;
  }

  // Private helper methods
  private static compareLifestylePreferences(profile1: UserProfile, profile2: UserProfile): number {
    // Compare lifestyle-related survey responses
    const lifestyleQuestions = ['sleep_schedule', 'social_frequency', 'noise_tolerance', 'guest_policy'];
    return this.compareSurveyResponses(profile1.surveyResponses, profile2.surveyResponses, lifestyleQuestions);
  }

  private static compareSchedules(profile1: UserProfile, profile2: UserProfile): number {
    // Compare schedule-related responses
    const scheduleQuestions = ['sleep_schedule', 'work_hours', 'study_hours'];
    return this.compareSurveyResponses(profile1.surveyResponses, profile2.surveyResponses, scheduleQuestions);
  }

  private static compareSocialPreferences(profile1: UserProfile, profile2: UserProfile): number {
    const socialQuestions = ['social_frequency', 'guest_policy', 'shared_activities'];
    return this.compareSurveyResponses(profile1.surveyResponses, profile2.surveyResponses, socialQuestions);
  }

  private static compareCleanlinessStandards(profile1: UserProfile, profile2: UserProfile): number {
    const cleanQuestions = ['cleanliness_level', 'organization_style', 'shared_spaces'];
    return this.compareSurveyResponses(profile1.surveyResponses, profile2.surveyResponses, cleanQuestions);
  }

  private static compareCulturalPreferences(profile1: UserProfile, profile2: UserProfile): number {
    let score = 0;
    const factors = [];

    // Language compatibility
    const commonLanguages = profile1.accessibility.languagesSpoken.filter(lang => 
      profile2.accessibility.languagesSpoken.includes(lang)
    );
    if (commonLanguages.length > 0) {
      factors.push(20 * commonLanguages.length);
    }

    // Cultural preferences overlap
    if (profile1.accessibility.culturalPreferences && profile2.accessibility.culturalPreferences) {
      const commonCulture = profile1.accessibility.culturalPreferences.filter(pref => 
        profile2.accessibility.culturalPreferences?.includes(pref)
      );
      if (commonCulture.length > 0) {
        factors.push(30 * commonCulture.length);
      }
    }

    // Dietary compatibility
    if (profile1.accessibility.dietaryRestrictions && profile2.accessibility.dietaryRestrictions) {
      const commonDietary = profile1.accessibility.dietaryRestrictions.filter(diet => 
        profile2.accessibility.dietaryRestrictions?.includes(diet)
      );
      if (commonDietary.length > 0) {
        factors.push(25 * commonDietary.length);
      }
    }

    if (factors.length > 0) {
      score = Math.min(100, factors.reduce((sum, factor) => sum + factor, 0) / factors.length);
    }

    return score;
  }

  private static compareProfessionalAlignment(profile1: UserProfile, profile2: UserProfile): number {
    let score = 50; // Base compatibility

    // Same occupation type gets bonus
    if (profile1.occupation === profile2.occupation) {
      score += 30;
    } else if (
      (profile1.occupation === 'student' && profile2.occupation === 'working') ||
      (profile1.occupation === 'working' && profile2.occupation === 'student')
    ) {
      score += 15; // Complementary schedules
    }

    // Age compatibility
    const ageDiff = Math.abs(profile1.age - profile2.age);
    if (ageDiff <= 3) score += 20;
    else if (ageDiff <= 6) score += 10;

    return Math.min(100, score);
  }

  private static compareSurveyResponses(responses1: SurveyResponse[], responses2: SurveyResponse[], questionIds: string[]): number {
    let totalScore = 0;
    let questionsCompared = 0;

    for (const questionId of questionIds) {
      const response1 = responses1.find(r => r.questionId === questionId);
      const response2 = responses2.find(r => r.questionId === questionId);

      if (response1 && response2) {
        // Calculate compatibility based on response similarity
        const similarity = this.calculateResponseSimilarity(response1.answer, response2.answer);
        const weightedScore = similarity * Math.max(response1.weight, response2.weight);
        totalScore += weightedScore;
        questionsCompared++;
      }
    }

    return questionsCompared > 0 ? Math.round((totalScore / questionsCompared) * 20) : 50; // Default to 50 if no common responses
  }

  private static calculateResponseSimilarity(answer1: string, answer2: string): number {
    // For exact matches
    if (answer1 === answer2) return 5;

    // For compatible but different answers, define compatibility matrix
    const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
      'early_bird': { 'flexible_schedule': 3, 'early_bird': 5 },
      'night_owl': { 'flexible_schedule': 3, 'night_owl': 5 },
      'flexible_schedule': { 'early_bird': 3, 'night_owl': 3, 'depends_on_work': 4 },
      'very_organized': { 'tidy_most_time': 4, 'very_organized': 5 },
      'tidy_most_time': { 'very_organized': 4, 'clean_when_needed': 3 },
      'love_friends_over': { 'occasional_gatherings': 3, 'love_friends_over': 5 },
      'occasional_gatherings': { 'love_friends_over': 3, 'prefer_quiet': 2 }
    };

    return compatibilityMatrix[answer1]?.[answer2] || 1; // Default low compatibility
  }

  private static calculateRoomScore(room: Room, profile1: UserProfile, profile2: UserProfile): number {
    let score = 0;

    // Budget score (closer to both preferences = higher score)
    const avgMaxBudget = (profile1.roomPreferences.budgetRange.max + profile2.roomPreferences.budgetRange.max) / 2;
    const budgetScore = Math.max(0, 100 - Math.abs(room.rent - avgMaxBudget) / avgMaxBudget * 100);
    score += budgetScore * 0.3;

    // Amenities score
    const desiredAmenities = [...profile1.roomPreferences.amenities, ...profile2.roomPreferences.amenities];
    const amenityMatches = room.amenities.filter(amenity => desiredAmenities.includes(amenity)).length;
    const amenityScore = (amenityMatches / Math.max(1, desiredAmenities.length)) * 100;
    score += amenityScore * 0.2;

    // Safety features score
    score += room.safetyFeatures.length * 10;

    // Photo quality indicator (more photos = better presentation)
    score += Math.min(room.photos.length * 5, 20);

    return Math.min(100, score);
  }
}