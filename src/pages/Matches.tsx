import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Star, MapPin, Briefcase, Calendar, Home } from "lucide-react";
import twinRoomImage from "@/assets/twin-room-mockup.jpg";

const Matches = () => {
  const [selectedMatch, setSelectedMatch] = useState(0);

  const matches = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 24,
      profession: "Software Engineer",
      location: "Downtown District",
      matchScore: 95,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      interests: ["Reading", "Yoga", "Cooking", "Netflix"],
      lifestyle: "Early bird, clean, social",
      bio: "Looking for a reliable roommate who loves a tidy space and occasional movie nights!"
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 22,
      profession: "Medical Student",
      location: "University Area",
      matchScore: 89,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      interests: ["Study groups", "Plants", "Coffee", "Fitness"],
      lifestyle: "Focused, quiet, organized",
      bio: "Med student seeking a study-friendly roommate who appreciates a peaceful environment."
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      age: 26,
      profession: "Marketing Manager",
      location: "Business District",
      matchScore: 87,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      interests: ["Travel", "Photography", "Wine", "Art"],
      lifestyle: "Social, adventurous, clean",
      bio: "Creative professional who loves hosting small gatherings and exploring the city!"
    }
  ];

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-orange-600";
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (matches[selectedMatch].matchScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating decorations */}
      <div className="floating-particles top-16 right-10">🎉</div>
      <div className="floating-particles top-32 left-20 animation-delay-1000">✨</div>
      <div className="floating-particles top-48 right-1/4 animation-delay-2000">🌟</div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 mb-4">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Step 3 of 3</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Your Perfect Matches! 
          </h1>
          <p className="text-muted-foreground">
            Our AI found {matches.length} amazing roommates that match your preferences
          </p>
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
                    <div className={`text-2xl font-bold ${getMatchColor(matches[selectedMatch].matchScore)}`}>
                      {matches[selectedMatch].matchScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">Match</div>
                  </div>
                </div>
                <div className="sparkle absolute -top-2 -right-2"></div>
              </div>

              <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-primary/20">
                <AvatarImage src={matches[selectedMatch].avatar} alt={matches[selectedMatch].name} />
                <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                  {matches[selectedMatch].name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <h2 className="text-2xl font-display font-bold text-foreground">
                {matches[selectedMatch].name}
              </h2>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {matches[selectedMatch].age} years
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {matches[selectedMatch].profession}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                {matches[selectedMatch].location}
              </div>
            </div>

            {/* Bio */}
            <div className="glass-card rounded-[20px] p-4 mb-6">
              <p className="text-sm text-foreground text-center">
                "{matches[selectedMatch].bio}"
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Lifestyle</h3>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {matches[selectedMatch].lifestyle}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {matches[selectedMatch].interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="border-primary/20 text-primary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Button className="btn-primary flex-1 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat Now
              </Button>
              <Button variant="outline" className="border-2 border-primary/20 rounded-[12px] px-6">
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Room Preview & Other Matches */}
          <div className="space-y-6">
            {/* Room Mockup */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Your Future Room</h3>
              </div>
              <img 
                src={twinRoomImage} 
                alt="Twin bed room mockup" 
                className="w-full h-48 object-cover rounded-[16px] mb-4"
              />
              <p className="text-sm text-muted-foreground text-center">
                Modern twin-sharing accommodation with all amenities
              </p>
            </Card>

            {/* Other Matches */}
            <Card className="brutal-card p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Other Great Matches
              </h3>
              <div className="space-y-3">
                {matches.map((match, index) => (
                  <div 
                    key={match.id}
                    onClick={() => setSelectedMatch(index)}
                    className={`flex items-center gap-3 p-3 rounded-[12px] cursor-pointer transition-all ${
                      selectedMatch === index 
                        ? 'bg-primary/10 border-2 border-primary/20' 
                        : 'hover:bg-primary/5 border-2 border-transparent'
                    }`}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={match.avatar} alt={match.name} />
                      <AvatarFallback className="bg-primary text-white text-sm">
                        {match.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{match.name}</div>
                      <div className="text-xs text-muted-foreground">{match.profession}</div>
                    </div>
                    <div className={`text-sm font-bold ${getMatchColor(match.matchScore)}`}>
                      {match.matchScore}%
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
