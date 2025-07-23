import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Mic, MicOff, ArrowRight, Bot, MessageCircle } from "lucide-react";

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "What's your ideal sleeping schedule?",
      options: [
        "Early bird (sleep by 10 PM, wake up by 6 AM)",
        "Night owl (sleep after midnight, wake up late)",
        "Flexible schedule",
        "Depends on work/study schedule"
      ]
    },
    {
      id: 2,
      question: "How do you prefer to socialize at home?",
      options: [
        "Love having friends over frequently",
        "Occasional gatherings are fine",
        "Prefer quiet, minimal visitors",
        "Open to roommate's preferences"
      ]
    },
    {
      id: 3,
      question: "What's your approach to cleanliness?",
      options: [
        "Very organized, clean daily",
        "Tidy most of the time",
        "Clean when needed",
        "Relaxed about mess"
      ]
    },
    {
      id: 4,
      question: "How important is personal space to you?",
      options: [
        "Need lots of alone time",
        "Moderate personal space",
        "Love spending time together",
        "Very flexible and social"
      ]
    },
    {
      id: 5,
      question: "What are your deal-breakers?",
      options: [
        "Smoking or excessive drinking",
        "Loud music/parties late at night",
        "Bringing romantic partners over frequently",
        "Poor hygiene or cleanliness"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    }
  };

  const handleFinish = () => {
    navigate("/matches");
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, this would start/stop speech recognition
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow relative overflow-hidden">
      {/* Floating decorations */}
      <div className="floating-hearts top-20 left-10">🤖</div>
      <div className="floating-hearts top-40 right-20 animation-delay-1000">💬</div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 mb-4">
            <Bot className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Step 2 of 3</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            AI Compatibility Survey
          </h1>
          <p className="text-muted-foreground">
            Answer 5 quick questions so our AI can find your perfect match
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
            
            {/* Voice Input UI */}
            <div className="glass-card rounded-[20px] p-4 mb-6">
              <div className="flex items-center justify-center gap-4">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Speak your answer or select below
                </span>
                <Button
                  onClick={toggleListening}
                  variant={isListening ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              
              {/* Waveform Animation */}
              {isListening && (
                <div className="flex justify-center mt-4">
                  <div className="waveform">
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                  </div>
                </div>
              )}
            </div>
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
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-sm font-medium text-foreground"
                  >
                    {option}
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
                disabled={!answers[currentQuestion]}
                className="btn-primary flex items-center gap-2"
              >
                Find My Matches
                <ArrowRight className="w-4 h-4" />
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