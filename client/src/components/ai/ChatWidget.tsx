import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Mic, MicOff, BotIcon, Volume2 } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { AnimatePresence, motion } from 'framer-motion';

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

interface ChatWidgetProps {
  voiceEnabled?: boolean;
}

export function ChatWidget({ voiceEnabled = false }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { messages, loading, sendMessage, inputValue, setInputValue } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  const toggleChat = () => setIsOpen(!isOpen);
  
  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined' && voiceEnabled) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        speechRecognitionRef.current = new SpeechRecognition();
        speechRecognitionRef.current.continuous = true;
        speechRecognitionRef.current.interimResults = true;
        
        speechRecognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
          
          setInputValue(transcript);
        };
        
        speechRecognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
      }
    }
    
    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      if (synth) {
        synth.cancel();
      }
    };
  }, [voiceEnabled]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  const toggleVoiceRecognition = () => {
    if (!speechRecognitionRef.current) return;
    
    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      speechRecognitionRef.current.start();
      setIsListening(true);
    }
  };
  
  const speakMessage = (text: string) => {
    if (!synth) return;
    
    // Cancel any ongoing speech
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Use a female voice if available
    const voices = synth.getVoices();
    const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('Female'));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    synth.speak(utterance);
  };
  
  // Function to play the most recent message
  const playLatestMessage = () => {
    const latestAssistantMessage = [...messages].reverse().find(msg => msg.sender === 'assistant');
    if (latestAssistantMessage) {
      speakMessage(latestAssistantMessage.content);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-30">
      <div className="flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-80 md:w-96 mb-3"
            >
              <Card className="shadow-xl border-border overflow-hidden">
                <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <BotIcon className="h-5 w-5 mr-2" />
                    <h3 className="text-sm font-semibold">LexAI Assistant</h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    {voiceEnabled && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={playLatestMessage}
                        disabled={isPlaying || messages.length === 0}
                        className="text-primary-foreground hover:text-primary-foreground/90 hover:bg-primary/90 h-8 w-8 p-0"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleChat} 
                      className="text-primary-foreground hover:text-primary-foreground/90 hover:bg-primary/90 h-8 w-8 p-0"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <ScrollArea className="h-64 p-4 bg-background/5">
                  <div className="flex flex-col space-y-3">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-48 text-center">
                        <div className="mb-4 rounded-full bg-primary/10 p-4">
                          <BotIcon className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-sm font-medium mb-2">How can I help you today?</h3>
                        <p className="text-xs text-muted-foreground max-w-md">
                          Ask me anything about legal research, document drafting, case analysis, or other legal tasks.
                        </p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex items-start ${message.sender === 'assistant' ? 'justify-start' : 'justify-end'}`}
                        >
                          {message.sender === 'assistant' && (
                            <Avatar className="h-8 w-8 mr-3 bg-primary text-primary-foreground">
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div 
                            className={`py-2 px-3 rounded-lg shadow-sm max-w-[75%] ${
                              message.sender === 'assistant' 
                                ? 'bg-card text-card-foreground' 
                                : 'bg-primary text-primary-foreground'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                            <span className={`text-xs mt-1 block ${
                              message.sender === 'assistant'
                                ? 'text-muted-foreground'
                                : 'text-primary-foreground/75'
                            }`}>
                              {message.timestamp}
                            </span>
                          </div>
                          
                          {message.sender === 'user' && (
                            <Avatar className="h-8 w-8 ml-3 bg-muted text-muted-foreground">
                              <AvatarFallback>AH</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <CardFooter className="p-3 border-t">
                  <form onSubmit={handleSubmit} className="flex items-center w-full">
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-background"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      disabled={loading}
                    />
                    {voiceEnabled && (
                      <Button 
                        type="button"
                        variant={isListening ? "destructive" : "outline"}
                        size="icon" 
                        onClick={toggleVoiceRecognition}
                        className="ml-2"
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    )}
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="ml-2 bg-primary"
                      disabled={loading || !inputValue.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button 
          onClick={toggleChat}
          size="icon" 
          className="bg-primary hover:bg-primary/90 h-12 w-12 rounded-full shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
