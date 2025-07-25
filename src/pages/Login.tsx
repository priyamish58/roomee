import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, Camera, CheckCircle, AlertTriangle, FileText, User, Lock, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-roommates.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [verificationStep, setVerificationStep] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isLogin) {
      // For existing users, go straight to profile
      navigate("/profile");
    } else {
      // New users must complete verification
      setVerificationStep(1);
    }
  };

  const handleVerificationComplete = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      navigate("/profile");
    }, 3000);
  };

  const renderVerificationStep = () => {
    switch (verificationStep) {
      case 1:
        return (
          <Card className="brutal-card max-w-md mx-auto p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Government Verification Required
              </h2>
              <p className="text-muted-foreground text-sm">
                For your safety and security, we require government-issued ID verification for all users.
              </p>
            </div>

            <div className="space-y-4">
              <div className="security-indicator">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">256-bit encryption</span>
              </div>
              <div className="security-indicator">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Government database verification</span>
              </div>
              <div className="security-indicator">
                <Lock className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Data automatically deleted after verification</span>
              </div>
            </div>

            <Button 
              onClick={() => setVerificationStep(2)}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Start Verification
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Accepted: Driver's License, Passport, National ID
            </p>
          </Card>
        );

      case 2:
        return (
          <Card className="brutal-card max-w-md mx-auto p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Upload ID Document
              </h2>
              <p className="text-muted-foreground text-sm">
                Take a clear photo of your government-issued ID
              </p>
            </div>

            <div className="photo-upload mb-6">
              <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="font-semibold text-foreground mb-2">Upload Document Photo</p>
              <p className="text-xs text-muted-foreground">
                Ensure all text is clearly visible and not blurred
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setVerificationStep(1)}
                className="flex-1 border-2 border-primary/20 rounded-[12px]"
              >
                Back
              </Button>
              <Button 
                onClick={() => setVerificationStep(3)}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="brutal-card max-w-md mx-auto p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Live Selfie Verification
              </h2>
              <p className="text-muted-foreground text-sm">
                Take a live selfie to verify your identity matches your ID
              </p>
            </div>

            <div className="photo-upload mb-6">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-primary mx-auto mb-4 flex items-center justify-center">
                <User className="w-16 h-16 text-primary" />
              </div>
              <p className="font-semibold text-foreground mb-2">Position your face in the circle</p>
              <p className="text-xs text-muted-foreground">
                Look directly at the camera and ensure good lighting
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setVerificationStep(2)}
                className="flex-1 border-2 border-primary/20 rounded-[12px]"
              >
                Back
              </Button>
              <Button 
                onClick={handleVerificationComplete}
                disabled={isVerifying}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    Capture Selfie
                  </>
                )}
              </Button>
            </div>

            {isVerifying && (
              <div className="mt-6 text-center">
                <div className="security-indicator mx-auto max-w-fit">
                  <Shield className="w-4 h-4 text-accent animate-pulse" />
                  <span className="text-xs">Verifying with government database...</span>
                </div>
              </div>
            )}
          </Card>
        );

      default:
        return null;
    }
  };

  if (verificationStep > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
        {/* Floating decorations */}
        <div className="floating-particles top-20 left-10">🔐</div>
        <div className="floating-particles top-40 right-20 animation-delay-1000">🛡️</div>
        <div className="floating-particles top-60 left-1/4 animation-delay-2000">✅</div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Secure Verification
              </h1>
            </div>
            <div className="verification-badge mx-auto max-w-fit">
              Government-Grade Security
            </div>
          </div>

          {renderVerificationStep()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating decorations */}
      <div className="floating-particles top-20 left-10">✨</div>
      <div className="floating-particles top-40 right-20 animation-delay-1000">🌟</div>
      <div className="floating-particles top-60 left-1/4 animation-delay-2000">💫</div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4 logo-bounce">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center logo-glow">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground logo-shimmer">
              Roomee
            </h1>
          </div>
          <p className="text-muted-foreground font-medium">
            AI-powered roommate matching for the perfect twin-sharing experience
          </p>
          <div className="flex justify-center gap-2 mt-3">
            <Badge className="verification-badge">
              <Shield className="w-3 h-3 mr-1" />
              Government Verified
            </Badge>
            <Badge className="verification-badge">
              <Shield className="w-3 h-3 mr-1" />
              Women Only
            </Badge>
          </div>
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
            {!isLogin && (
              <div className="flex items-center justify-center gap-2 mt-3 p-3 bg-accent/10 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-accent" />
                <span className="text-xs text-accent-foreground font-semibold">
                  Government ID verification required
                </span>
              </div>
            )}
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
              className="btn-primary w-full flex items-center justify-center gap-2 btn-spring"
            >
              {isLogin ? (
                <>
                  <Users className="w-4 h-4" />
                  Sign In
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Create Account & Verify
                </>
              )}
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold hover:underline liquid-swipe"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-medium">Smart Matching</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-medium">AI Security</p>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-medium">Perfect Pairs</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;