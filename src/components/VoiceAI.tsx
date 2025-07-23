import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VoiceAIProps {
  onResponse?: (response: string) => void;
  isListening?: boolean;
  onToggleListening?: () => void;
  greeting?: string;
  context?: string;
  className?: string;
}

const VoiceAI = ({ 
  onResponse, 
  isListening = false, 
  onToggleListening,
  greeting = "Hi! I'm your Omnidimensions AI assistant. How can I help you today?",
  context = "general",
  className = ""
}: VoiceAIProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  // Simulate AI greeting on mount
  useEffect(() => {
    if (greeting) {
      setTimeout(() => {
        speakText(greeting);
      }, 1000);
    }
  }, [greeting]);

  const speakText = (text: string) => {
    if (isMuted) return;
    
    setIsPlaying(true);
    setCurrentText(text);
    
    // Simulate TTS playback
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentText("");
    }, text.length * 50); // Rough timing based on text length
  };

  const handleVoiceInput = () => {
    if (onToggleListening) {
      onToggleListening();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentText("");
    }
  };

  return (
    <div className={`voice-ai-container ${className}`}>
      {/* AI Status Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-accent'}`} />
          <Badge className="verification-badge">
            🤖 Omnidimensions AI
          </Badge>
        </div>
        
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="sm"
          className="rounded-full"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Voice Interaction Area */}
      <div className={`glass-card rounded-[20px] p-6 ${isListening ? 'voice-active' : ''}`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">AI Assistant</p>
              <p className="text-xs text-muted-foreground">
                {isPlaying ? "Speaking..." : isListening ? "Listening..." : "Ready to help"}
              </p>
            </div>
          </div>

          {/* Current AI Text */}
          {currentText && (
            <div className="mb-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-foreground">{currentText}</p>
            </div>
          )}

          {/* Waveform Animation */}
          {(isListening || isPlaying) && (
            <div className="flex justify-center mb-4">
              <div className="waveform">
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
              </div>
            </div>
          )}

          {/* Voice Control Button */}
          <Button
            onClick={handleVoiceInput}
            variant={isListening ? "default" : "outline"}
            className={`rounded-full w-16 h-16 ${isListening ? 'bg-primary animate-pulse' : ''}`}
            disabled={isPlaying}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <p className="text-xs text-muted-foreground mt-3">
            {isListening 
              ? "Speak now or tap to stop" 
              : isPlaying 
              ? "AI is speaking..." 
              : "Tap to speak with AI"
            }
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-xs"
          onClick={() => speakText("Let me help you with your profile setup.")}
        >
          Profile Help
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-xs"
          onClick={() => speakText("I can explain how our matching algorithm works.")}
        >
          How It Works
        </Button>
      </div>
    </div>
  );
};

export default VoiceAI;