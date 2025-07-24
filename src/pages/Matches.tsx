import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Star, MapPin, Briefcase, Calendar, Home, Shield, Users, VideoIcon } from "lucide-react";
import twinRoomImage from "@/assets/twin-room-mockup.jpg";
import { sampleUserProfiles, sampleRooms } from "@/data/mockData";
import { MatchingService } from "@/services/matchingService";
import { UserProfile, Room, MatchResult } from "@/types";

const Matches = () => {
  const [selectedMatch, setSelectedMatch] = useState(0);
  const [realMatches, setRealMatches] = useState<any[]>([]);
  const [currentUser] = useState(sampleUserProfiles[0]); // Simulate current logged-in user
  const [suggestedRooms, setSuggestedRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Generate real matches based on current user
    const otherUsers = sampleUserProfiles.filter(profile => profile.id !== currentUser.id);
    const generatedMatches = otherUsers.map(otherUser => {
      const compatibilityScore = MatchingService.calculateCompatibilityScore(currentUser, otherUser);
      const matchFactors = MatchingService.getMatchFactors(currentUser, otherUser);
      const compatibleRooms = MatchingService.findCompatibleRooms(currentUser, otherUser, sampleRooms);
      const explanation = MatchingService.generateMatchExplanation(matchFactors, compatibleRooms[0]);
      
      return {
        id: `match_${currentUser.id}_${otherUser.id}`,
        profile: otherUser,
        compatibilityScore,
        matchFactors,
        suggestedRooms: compatibleRooms,
        explanation,
        trustScore: otherUser.communityScore,
        isVerified: otherUser.backgroundCheckComplete
      };
    }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    setRealMatches(generatedMatches);
    
    // Set suggested rooms for current selection
    if (generatedMatches.length > 0) {
      setSuggestedRooms(generatedMatches[0].suggestedRooms);
    }
  }, [currentUser]);

  useEffect(() => {
    // Update suggested rooms when selection changes
    if (realMatches[selectedMatch]) {
      setSuggestedRooms(realMatches[selectedMatch].suggestedRooms);
    }
  }, [selectedMatch, realMatches]);

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-orange-600";
  };

  const getTrustColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    return "text-yellow-600";
  };

  const getCompatibilityDescription = (score: number) => {
    if (score >= 95) return "Exceptional Match";
    if (score >= 85) return "Excellent Match";
    if (score >= 75) return "Great Match";
    if (score >= 65) return "Good Match";
    return "Fair Match";
  };

  if (!realMatches.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Finding Your Perfect Matches...</h2>
          <p className="text-muted-foreground">Our AI is analyzing compatibility factors</p>
        </div>
      </div>
    );
  }

  const currentMatch = realMatches[selectedMatch];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (currentMatch.compatibilityScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating decorations */}
      <div className="floating-hearts top-16 right-10">🎉</div>
      <div className="floating-hearts top-32 left-20 animation-delay-1000">✨</div>
      <div className="floating-hearts top-48 right-1/4 animation-delay-2000">💕</div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Step 3 of 3</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Your Perfect Matches! 
          </h1>
          <p className="text-muted-foreground">
            Our AI found {realMatches.length} verified roommates that match your preferences
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              {realMatches.filter(m => m.isVerified).length} Verified Users
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              <Star className="w-3 h-3 mr-1" />
              {realMatches.filter(m => m.compatibilityScore >= 85).length} High Compatibility
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Match Details */}
          <Card className="brutal-card p-8">
            <div className="text-center mb-6">
              {/* Progress Ring */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="progress-ring w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="45"
                    stroke="hsl(var(--primary) / 0.2)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="45"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="progress-ring-fill"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getMatchColor(currentMatch.compatibilityScore)}`}>
                      {currentMatch.compatibilityScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">{getCompatibilityDescription(currentMatch.compatibilityScore)}</div>
                  </div>
                </div>
                <div className="sparkle absolute -top-2 -right-2"></div>
              </div>

              <div className="relative">
                <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarImage src={currentMatch.profile.profilePhoto} alt={currentMatch.profile.fullName} />
                  <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                    {currentMatch.profile.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {currentMatch.isVerified && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <div className="text-center mb-4">
                <h2 className="text-2xl font-display font-bold text-foreground flex items-center justify-center gap-2">
                  {currentMatch.profile.fullName}
                  {currentMatch.profile.pronouns && (
                    <span className="text-sm text-muted-foreground">({currentMatch.profile.pronouns})</span>
                  )}
                </h2>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {currentMatch.profile.age} years
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Briefcase className="w-4 h-4" />
                    {currentMatch.profile.occupation}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  {currentMatch.profile.location}
                </div>
                
                {/* Trust Score */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">Trust Score:</span>
                  <span className={`text-sm font-semibold ${getTrustColor(currentMatch.trustScore)}`}>
                    {currentMatch.trustScore}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="glass-card rounded-[20px] p-4 mb-6">
              <p className="text-sm text-foreground text-center">
                "{currentMatch.profile.bio}"
              </p>
            </div>

            {/* AI Match Explanation */}
            <div className="glass-card rounded-[20px] p-4 mb-6 bg-blue-50/50 border border-blue-200/50">
              <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Why You're Compatible
              </h4>
              <p className="text-sm text-blue-700">
                {currentMatch.explanation}
              </p>
            </div>

            {/* Compatibility Factors */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Compatibility Breakdown</h3>
                <div className="space-y-3">
                  {currentMatch.matchFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                      <div>
                        <div className="font-medium text-sm text-foreground">{factor.category}</div>
                        <div className="text-xs text-muted-foreground">{factor.description}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${getMatchColor(factor.score)}`}>
                          {factor.score}%
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {factor.importance}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Features */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Safety & Verification</h3>
                <div className="flex flex-wrap gap-2">
                  {currentMatch.profile.badges.map((badge, index) => (
                    <Badge key={index} className="bg-green-100 text-green-700 border-green-200 text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Inclusive Information */}
              {currentMatch.profile.accessibility.languagesSpoken.length > 1 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.profile.accessibility.languagesSpoken.map((language, index) => (
                      <Badge key={index} variant="outline" className="border-blue-200 text-blue-700 text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="space-y-3 mt-8">
              <div className="flex gap-3">
                <Button className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Start Chat
                </Button>
                <Button variant="outline" className="border-2 border-primary/20 rounded-[12px] px-6">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Video Verification Option */}
              <Button 
                variant="outline" 
                className="w-full border-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-[12px] flex items-center justify-center gap-2"
              >
                <VideoIcon className="w-4 h-4" />
                Schedule Video Verification
              </Button>
              
              {/* Safety Features */}
              <div className="text-center text-xs text-muted-foreground mt-4">
                <p className="flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  All chats are monitored for safety
                </p>
              </div>
            </div>
          </Card>

          {/* Room Preview & Other Matches */}
          <div className="space-y-6">
            {/* Suggested Rooms */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Perfect Rooms for You Both ({suggestedRooms.length})
                </h3>
              </div>
              
              {suggestedRooms.length > 0 ? (
                <div className="space-y-4">
                  {suggestedRooms.slice(0, 2).map((room, index) => (
                    <div key={room.id} className="border border-primary/20 rounded-[16px] p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm text-foreground">{room.title}</h4>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">${room.rent}</div>
                          <div className="text-xs text-muted-foreground">per month</div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {room.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {room.amenities.slice(0, 4).map((amenity, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {amenity.replace('_', ' ')}
                          </Badge>
                        ))}
                        {room.amenities.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{room.amenities.length - 4}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {room.location}
                        </span>
                        <span className="text-green-600 font-medium">
                          {room.safetyFeatures.length} safety features
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {suggestedRooms.length > 2 && (
                    <Button variant="outline" className="w-full text-xs">
                      View {suggestedRooms.length - 2} More Rooms
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Home className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No compatible rooms found yet. We'll notify you when new listings match your preferences!
                  </p>
                </div>
              )}
            </Card>

            {/* Other Matches */}
            <Card className="brutal-card p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Other Great Matches
              </h3>
              <div className="space-y-3">
                {realMatches.map((match, index) => (
                  <div 
                    key={match.id}
                    onClick={() => setSelectedMatch(index)}
                    className={`flex items-center gap-3 p-3 rounded-[12px] cursor-pointer transition-all ${
                      selectedMatch === index 
                        ? 'bg-primary/10 border-2 border-primary/20' 
                        : 'hover:bg-primary/5 border-2 border-transparent'
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={match.profile.profilePhoto} alt={match.profile.fullName} />
                        <AvatarFallback className="bg-primary text-white text-sm">
                          {match.profile.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {match.isVerified && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                          <Shield className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{match.profile.fullName}</div>
                      <div className="text-xs text-muted-foreground capitalize">{match.profile.occupation}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${getMatchColor(match.compatibilityScore)}`}>
                        {match.compatibilityScore}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Trust: {match.trustScore}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
