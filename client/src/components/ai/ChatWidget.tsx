import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { AnimatePresence, motion } from 'framer-motion';

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, loading, sendMessage, inputValue, setInputValue } = useChat();

  const toggleChat = () => setIsOpen(!isOpen);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
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
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <h3 className="text-sm font-semibold">LexAI Assistant</h3>
                  </div>
                  <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground hover:text-primary-foreground/90 hover:bg-primary/90 h-8 w-8 p-0">
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>
                
                <ScrollArea className="h-64 p-4 bg-background/5">
                  <div className="flex flex-col space-y-3">
                    {messages.map((message) => (
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
                    ))}
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
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="ml-2 bg-primary"
                      disabled={loading || !inputValue.trim()}
                    >
                      <Send className="h-5 w-5" />
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
