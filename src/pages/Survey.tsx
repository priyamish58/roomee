import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/auth";
import { db, SurveyResponse } from "@/lib/database";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Mic, MicOff, ArrowRight, Bot, MessageCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Survey = () => {
  const [user, loading] = useAuthState(auth);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!loading && !user) {
    navigate("/login");
    return null;
  }

  const questions = [
    {
      id: 1,
      question: "What's your ideal sleeping schedule?",
      key: 'sleepSchedule' as keyof SurveyResponse,
      options: [
        { label: "Early bird (sleep by 10 PM, wake up by 6 AM)", value: "early_bird" },
        { label: "Night owl (sleep after midnight, wake up late)", value: "night_owl" },
        { label: "Flexible schedule", value: "flexible" },
        { label: "Depends on work/study schedule", value: "work_dependent" }
      ]
    },
    {
      id: 2,
      question: "What's your approach to cleanliness?",
      key: 'cleanliness' as keyof SurveyResponse,
      options: [
        { label: "Very organized, clean daily", value: "very_organized" },
        { label: "Tidy most of the time", value: "tidy" },
        { label: "Clean when needed", value: "clean_when_needed" },
        { label: "Relaxed about mess", value: "relaxed" }
      ]
    },
    {
      id: 3,
      question: "How do you prefer to socialize at home?",
      key: 'sociability' as keyof SurveyResponse,
      options: [
        { label: "Love having friends over frequently", value: "love_guests" },
        { label: "Occasional gatherings are fine", value: "occasional_ok" },
        { label: "Prefer quiet, minimal visitors", value: "prefer_quiet" },
        { label: "Open to roommate's preferences", value: "open_to_preferences" }
      ]
    },
    {
      id: 4,
      question: "How important is personal space to you?",
      key: 'personalSpace' as keyof SurveyResponse,
      options: [
        { label: "Need lots of alone time", value: "need_lots" },
        { label: "Moderate personal space", value: "moderate" },
        { label: "Love spending time together", value: "love_together" },
        { label: "Very flexible and social", value: "very_flexible" }
      ]
    },
    {
      id: 5,
      question: "What are your deal-breakers?",
      key: 'dealBreakers' as keyof SurveyResponse,
      options: [
        { label: "Smoking or excessive drinking", value: "smoking_drinking" },
        { label: "Loud music/parties late at night", value: "loud_parties" },
        { label: "Bringing romantic partners over frequently", value: "frequent_partners" },
        { label: "Poor hygiene or cleanliness", value: "poor_hygiene" }
      ]
    },
    {
      id: 6,
      question: "What's your room preference?",
      key: 'roomPreference' as keyof SurveyResponse,
      options: [
        { label: "Near window (natural light)", value: "window_side" },
        { label: "Ground level (easy access)", value: "ground_level" },
        { label: "No specific preference", value: "no_preference" }
      ]
    },
    {
      id: 7,
      question: "What are your typical work hours?",
      key: 'workHours' as keyof SurveyResponse,
      options: [
        { label: "Standard 9 AM - 5 PM", value: "standard_9_5" },
        { label: "Flexible hours", value: "flexible" },
        { label: "Night shift", value: "night_shift" },
        { label: "Student schedule", value: "student_schedule" }
      ]
    },
    {
      id: 8,
      question: "How do you handle noise?",
      key: 'noiseTolerance' as keyof SurveyResponse,
      options: [
        { label: "Need very quiet environment", value: "very_quiet" },
        { label: "Moderate noise is okay", value: "moderate" },
        { label: "Can handle most noise", value: "can_handle_noise" },
        { label: "No preference", value: "no_preference" }
      ]
    }
  ];

  const handleAnswer = (answerValue: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerValue;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    }
  };

  const handleFinish = async () => {
    if (!user) {
      toast.error("Authentication required");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create survey response object
      const surveyResponse: SurveyResponse = {
        userId: user.uid,
        sleepSchedule: answers[0] as any,
        cleanliness: answers[1] as any,
        sociability: answers[2] as any,
        personalSpace: answers[3] as any,
        dealBreakers: answers[4] as any,
        roomPreference: answers[5] as any,
        workHours: answers[6] as any,
        noiseTolerance: answers[7] as any,
      };

      // Save survey response
      await db.saveSurveyResponse(surveyResponse);
      
      toast.success("Survey completed! Finding your matches...");
      navigate("/matches");
    } catch (error: any) {
      console.error('Survey submission failed:', error);
      toast.error("Failed to save survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating decorations */}
      <div className="floating-particles top-20 left-10">🤖</div>
      <div className="floating-particles top-40 right-20 animation-delay-1000">💬</div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 mb-4">
            <Bot className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Step 4 of 4</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Roommate Compatibility Survey
          </h1>
          <p className="text-muted-foreground">
            Answer these questions to find your perfect roommate match
          </p>
          
          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto mt-4">
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>

        {/* Question Card */}
        <Card className="brutal-card max-w-2xl mx-auto p-8">
          <div className="text-center mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Question {currentQuestion + 1}
            </Badge>
            <h2 className="text-xl font-display font-bold text-foreground mb-4">
              {questions[currentQuestion].question}
            </h2>
          </div>

          {/* Answer Options */}
          <RadioGroup 
            value={answers[currentQuestion] || ""} 
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="relative">
                <div className="flex items-center space-x-3 p-4 rounded-[16px] border-2 border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                  <RadioGroupItem value={option.value} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-sm font-medium text-foreground"
                  >
                    {option.label}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline"
              onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className="border-2 border-primary/20 rounded-[12px]"
            >
              Previous
            </Button>
            
            {currentQuestion === questions.length - 1 ? (
              <Button 
                onClick={handleFinish}
                disabled={!answers[currentQuestion] || isSubmitting}
                className="btn-primary flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    Find My Matches
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={() => answers[currentQuestion] && setCurrentQuestion(currentQuestion + 1)}
                disabled={!answers[currentQuestion]}
                className="btn-primary flex items-center gap-2"
              >
                Next Question
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Survey;