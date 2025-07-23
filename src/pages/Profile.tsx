import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, User, Briefcase, Heart, Camera } from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "female",
    maritalStatus: "",
    workStatus: "",
    governmentId: false
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (formData.fullName && formData.age && formData.maritalStatus && formData.workStatus) {
      navigate("/survey");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating decorations */}
      <div className="floating-hearts top-16 right-10">✨</div>
      <div className="floating-hearts top-32 left-20 animation-delay-1500">💫</div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Step 1 of 3</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Tell Us About You
          </h1>
          <p className="text-muted-foreground">
            Our AI needs some basic info to find your perfect roommate match
          </p>
        </div>

        {/* Profile Form */}
        <Card className="brutal-card max-w-lg mx-auto p-8">
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <Label className="text-sm font-semibold text-foreground">Full Name *</Label>
              <Input 
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="rounded-[16px] border-2 border-primary/20 focus:border-primary mt-2"
              />
            </div>

            {/* Age */}
            <div>
              <Label className="text-sm font-semibold text-foreground">Age *</Label>
              <Input 
                type="number"
                placeholder="Your age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="rounded-[16px] border-2 border-primary/20 focus:border-primary mt-2"
              />
            </div>

            {/* Gender */}
            <div>
              <Label className="text-sm font-semibold text-foreground">Gender</Label>
              <div className="mt-3">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Women Only 👩‍🤝‍👩
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Roomee RM2 currently serves women-only accommodations for safety and comfort
                </p>
              </div>
            </div>

            {/* Marital Status */}
            <div>
              <Label className="text-sm font-semibold text-foreground">Relationship Status *</Label>
              <RadioGroup 
                value={formData.maritalStatus} 
                onValueChange={(value) => setFormData({...formData, maritalStatus: value})}
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single" className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    Single
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="married" id="married" />
                  <Label htmlFor="married" className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    Married/In Relationship
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Work Status */}
            <div>
              <Label className="text-sm font-semibold text-foreground">Current Status *</Label>
              <RadioGroup 
                value={formData.workStatus} 
                onValueChange={(value) => setFormData({...formData, workStatus: value})}
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="working" id="working" />
                  <Label htmlFor="working" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Working Professional
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Student + Part-time Work
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Government ID Verification */}
            <div className="glass-card rounded-[20px] p-4">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <Label className="text-sm font-semibold text-foreground">Identity Verification</Label>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Upload a government-issued ID for security and trust. This helps us verify all users and create a safe community.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-2 border-primary/20 hover:border-primary rounded-[12px]"
              >
                <Camera className="w-4 h-4 mr-2" />
                Upload Government ID
              </Button>
            </div>
          </div>

          <Button 
            onClick={handleNext}
            disabled={!formData.fullName || !formData.age || !formData.maritalStatus || !formData.workStatus}
            className="btn-primary w-full mt-8 flex items-center justify-center gap-2"
          >
            Continue to AI Survey
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;