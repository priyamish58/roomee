import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Heart, Sparkles, ArrowRight, Mic, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-roommates.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating decorations */}
      <div className="floating-hearts top-20 left-10">💕</div>
      <div className="floating-hearts top-40 right-20 animation-delay-1000">✨</div>
      <div className="floating-hearts top-60 left-1/4 animation-delay-2000">💖</div>
      <div className="floating-hearts bottom-32 right-1/3 animation-delay-3000">🎉</div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/50 rounded-full px-6 py-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Roomee RM2</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            Find Your Perfect
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Roommate Match
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            AI-powered roommate matching for twin-sharing accommodations. 
            Get matched with compatible roommates in just 3 simple steps.
          </p>

          {/* Hero Image */}
          <div className="glass-card rounded-[32px] p-6 max-w-2xl mx-auto mb-12">
            <img 
              src={heroImage} 
              alt="Happy roommates celebrating perfect match" 
              className="w-full h-80 object-cover rounded-[24px]"
            />
          </div>

          <Button 
            onClick={handleGetStarted}
            className="btn-primary text-lg px-12 py-6 flex items-center gap-3 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="brutal-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center mx-auto mb-6">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">
              Voice AI Survey
            </h3>
            <p className="text-muted-foreground">
              Answer just 5 questions using our natural voice AI to capture your preferences perfectly
            </p>
          </Card>

          <Card className="brutal-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">
              Smart Matching
            </h3>
            <p className="text-muted-foreground">
              Our AI analyzes compatibility across lifestyle, schedule, and personality factors
            </p>
          </Card>

          <Card className="brutal-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">
              Safe & Verified
            </h3>
            <p className="text-muted-foreground">
              Government ID verification and women-only accommodations ensure safety and trust
            </p>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-12">
            How It Works
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-semibold text-foreground mb-2">Create Profile</h3>
              <p className="text-sm text-muted-foreground">Tell us about yourself and verify your identity</p>
            </div>
            
            <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI Survey</h3>
              <p className="text-sm text-muted-foreground">Answer 5 questions using voice or text input</p>
            </div>
            
            <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get Matches</h3>
              <p className="text-sm text-muted-foreground">View compatible roommates with match scores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
