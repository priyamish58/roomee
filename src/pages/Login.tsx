import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Users } from "lucide-react";
import heroImage from "@/assets/hero-roommates.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = () => {
    // Navigate to profile setup
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating hearts decoration */}
      <div className="floating-hearts top-20 left-10">💕</div>
      <div className="floating-hearts top-40 right-20 animation-delay-1000">💖</div>
      <div className="floating-hearts top-60 left-1/4 animation-delay-2000">💝</div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Roomee RM2
            </h1>
          </div>
          <p className="text-muted-foreground font-medium">
            AI-powered roommate matching for the perfect twin-sharing experience
          </p>
        </div>

        {/* Hero Image */}
        <div className="glass-card rounded-[32px] p-4 mb-8 max-w-md mx-auto">
          <img 
            src={heroImage} 
            alt="Happy roommates high-fiving" 
            className="w-full h-48 object-cover rounded-[24px]"
          />
        </div>

        {/* Auth Card */}
        <Card className="brutal-card max-w-md mx-auto p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              {isLogin ? "Welcome Back!" : "Join Roomee"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? "Sign in to find your perfect roommate" : "Create your account to get started"}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <Input 
                placeholder="Full Name" 
                className="rounded-[16px] border-2 border-primary/20 focus:border-primary"
              />
            )}
            <Input 
              type="email" 
              placeholder="Email Address" 
              className="rounded-[16px] border-2 border-primary/20 focus:border-primary"
            />
            <Input 
              type="password" 
              placeholder="Password" 
              className="rounded-[16px] border-2 border-primary/20 focus:border-primary"
            />
            
            <Button 
              onClick={handleAuth}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-medium">Smart Matching</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-medium">AI Survey</p>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-medium">Perfect Pairs</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;