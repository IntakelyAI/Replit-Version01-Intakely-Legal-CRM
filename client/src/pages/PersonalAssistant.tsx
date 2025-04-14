import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useChat } from "@/hooks/use-chat";

export default function PersonalAssistant() {
  const { messages, loading, sendMessage, inputValue, setInputValue } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Personal Assistant</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your AI-powered legal assistant is ready to help with research, drafting, and more.
        </p>
      </div>

      <Card className="flex flex-col h-[calc(100%-5rem)]">
        <CardHeader className="p-4 bg-primary/10 border-b">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 bg-primary text-primary-foreground">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">LexAI Assistant</h3>
              <p className="text-sm text-muted-foreground">Always available to help with your legal tasks</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="flex flex-col space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <Avatar className="h-10 w-10 bg-primary text-primary-foreground">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Your Legal AI Assistant</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    I can help you research case law, draft documents, analyze contracts, and more. 
                    Just start typing your question.
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
                      className={`py-3 px-4 rounded-lg shadow-sm max-w-[75%] ${
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
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-center w-full">
            <Input
              type="text"
              placeholder="Type your message..."
              className="flex-1"
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
    </div>
  );
}
