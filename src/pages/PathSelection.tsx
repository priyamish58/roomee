import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Home, Search, Users, MapPin } from "lucide-react";
import VoiceAI from "@/components/VoiceAI";

const PathSelection = () => {
  const [selectedPath, setSelectedPath] = useState<"need-room" | "have-room" | null>(null);
  const [showVoiceAI, setShowVoiceAI] = useState(true);
  const navigate = useNavigate();

  const handlePathSelect = (path: "need-room" | "have-room") => {
    setSelectedPath(path);
  };

  const handleContinue = () => {
    if (selectedPath === "need-room") {
      navigate("/survey");
    } else if (selectedPath === "have-room") {
      navigate("/room-documentation");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating decorations */}
      <div className="floating-hearts top-20 left-10">🏠</div>
      <div className="floating-hearts top-40 right-20 animation-delay-1000">🔍</div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Step 3 of 4</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Smart Path Selection
          </h1>
          <p className="text-muted-foreground">
            Tell our AI what you're looking for so we can personalize your experience
          </p>
        </div>

        {/* Voice AI Assistant */}
        {showVoiceAI && (
          <div className="mb-8">
            <VoiceAI 
              greeting="I'll help you choose the right path. Are you looking for a room to rent, or do you have a room to share?"
              context="path-selection"
            />
          </div>
        )}

        {/* Path Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {/* Path A: I Need a Room */}
          <Card 
            className={`path-card ${selectedPath === "need-room" ? "selected" : ""}`}
            onClick={() => handlePathSelect("need-room")}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                I Need a Room
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Looking for the perfect shared living space and roommate match
              </p>
              <Badge className="verification-badge">
                <MapPin className="w-3 h-3 mr-1" />
                Roommate Matching
              </Badge>
            </div>
            
            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                5-question compatibility survey
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                AI-powered roommate matching
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                View available rooms
              </div>
            </div>
          </Card>

          {/* Path B: I Have a Room */}
          <Card 
            className={`path-card ${selectedPath === "have-room" ? "selected" : ""}`}
            onClick={() => handlePathSelect("have-room")}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                I Have a Room to Share
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                List your available room and find the perfect roommate
              </p>
              <Badge className="verification-badge">
                <Home className="w-3 h-3 mr-1" />
                Room Listing
              </Badge>
            </div>
            
            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                Upload room photos & details
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                Set preferences & house rules
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                Review potential roommates
              </div>
            </div>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            disabled={!selectedPath}
            className="btn-primary flex items-center gap-2 btn-spring px-8"
          >
            Continue to {selectedPath === "need-room" ? "Survey" : "Room Setup"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PathSelection;