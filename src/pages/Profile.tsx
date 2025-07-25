import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, User, Briefcase, Heart, Camera, CheckCircle, MapPin, Upload } from "lucide-react";
import VoiceAI from "@/components/VoiceAI";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "female",
    maritalStatus: "",
    workStatus: "",
    location: "",
    occupation: "",
    profilePhoto: null as File | null,
    governmentId: true // Already verified from login
  });
  const [isListening, setIsListening] = useState(false);
  const [showVoiceAI, setShowVoiceAI] = useState(true);
  const navigate = useNavigate();

  const handleNext = () => {
    if (formData.fullName && formData.age && formData.maritalStatus && formData.workStatus && formData.location) {
      navigate("/path-selection");
    }
  };

  const handleVoiceResponse = (response: string) => {
    // Process voice input and update form data
    console.log("Voice response:", response);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({...formData, profilePhoto: file});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating decorations */}
      <div className="floating-particles top-16 right-10">✨</div>
      <div className="floating-particles top-32 left-20 animation-delay-1500">💫</div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Step 2 of 4</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            AI-Powered Profile Creation
          </h1>
          <p className="text-muted-foreground">
            Let our Omnidimensions AI help you create the perfect profile
          </p>
          <div className="flex justify-center gap-2 mt-3">
            <Badge className="verification-badge">
              <CheckCircle className="w-3 h-3 mr-1" />
              ID Verified
            </Badge>
            <Badge className="verification-badge">
              <Shield className="w-3 h-3 mr-1" />
              Secure
            </Badge>
          </div>
        </div>

        {/* Voice AI Assistant */}
        {showVoiceAI && (
          <div className="mb-8">
            <VoiceAI 
              onResponse={handleVoiceResponse}
              isListening={isListening}
              onToggleListening={() => setIsListening(!isListening)}
              greeting="Welcome! I'm here to help you create your profile. I can fill in information as you speak naturally."
              context="profile-creation"
            />
          </div>
        )}

        {/* Profile Form */}
        <Card className="brutal-card max-w-2xl mx-auto p-8">
          <div className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="text-center">
              <Label className="text-sm font-semibold text-foreground">Profile Photo</Label>
              <div className="photo-upload mt-3">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {formData.profilePhoto ? (
                    <img 
                      src={URL.createObjectURL(formData.profilePhoto)} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-primary" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label 
                  htmlFor="photo-upload"
                  className="btn-primary inline-flex items-center gap-2 cursor-pointer px-4 py-2 text-sm"
                >
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </label>
              </div>
            </div>

            {/* Two-column layout for form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  placeholder="18-45"
                  min="18 "
                  max="45"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="rounded-[16px] border-2 border-primary/20 focus:border-primary mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">Age range: 18-45 years</p>
              </div>

              {/* Current Location */}
              <div>
                <Label className="text-sm font-semibold text-foreground">Current Location *</Label>
                <Input 
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="rounded-[16px] border-2 border-primary/20 focus:border-primary mt-2"
                />
              </div>

              {/* Occupation */}
              <div>
                <Label className="text-sm font-semibold text-foreground">Occupation</Label>
                <Input 
                  placeholder="Your job title or field"
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  className="rounded-[16px] border-2 border-primary/20 focus:border-primary mt-2"
                />
              </div>
            </div>

            {/* Gender - Women Only Section */}
            <div className="col-span-full">
              <Label className="text-sm font-semibold text-foreground">Platform Focus</Label>
              <div className="glass-card rounded-[16px] p-4 mt-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl">👩‍🤝‍👩</span>
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">
                      Women-Only Platform
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Roomee exclusively serves women for enhanced safety, security, and comfort in shared living spaces.
                    </p>
                  </div>
                </div>
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
                    <User className="w-4 h-4 text-primary" />
                    Single
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="married" id="married" />
                  <Label htmlFor="married" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
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

          <div className="flex gap-4 mt-8">
            <Button 
              variant="outline"
              onClick={() => setShowVoiceAI(!showVoiceAI)}
              className="border-2 border-primary/20 rounded-[12px]"
            >
              {showVoiceAI ? "Hide AI Assistant" : "Show AI Assistant"}
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!formData.fullName || !formData.age || !formData.maritalStatus || !formData.workStatus || !formData.location}
              className="btn-primary flex-1 flex items-center justify-center gap-2 btn-spring"
            >
              Continue to Path Selection
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;