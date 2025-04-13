import { useState, useRef, useEffect } from "react";
import { Bot, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

type AIAssistantChatProps = {
  initialMessages?: Message[];
  title?: string;
  className?: string;
  heightClass?: string;
};

export default function AIAssistantChat({ 
  initialMessages = [], 
  title = "AI Assistant",
  className,
  heightClass = "h-[400px]"
}: AIAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    // This is a placeholder. In a real app, this would get responses from an API
    if (query.toLowerCase().includes("document") || query.toLowerCase().includes("file")) {
      return "I found several documents in our system. Would you like me to list them or perform a specific search?";
    }
    
    if (query.toLowerCase().includes("client") || query.toLowerCase().includes("case")) {
      return "I can help you find client information or case details. Please provide more specifics about what you're looking for.";
    }
    
    if (query.toLowerCase().includes("schedule") || query.toLowerCase().includes("appointment")) {
      return "I can help schedule meetings or calls. What date and time works for you?";
    }
    
    return "I'm here to assist with your legal CRM needs. How can I help you today?";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className={cn("flex flex-col", heightClass)}>
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 mb-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={cn(
                    "flex items-start gap-2",
                    message.role === "user" && "justify-end"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <div 
                    className={cn(
                      "rounded-lg p-3 text-sm",
                      message.role === "assistant" 
                        ? "rounded-tl-none bg-secondary" 
                        : "rounded-tr-none bg-primary/20"
                    )}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                  
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-lg rounded-tl-none bg-secondary p-3 text-sm">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-75" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="flex items-center gap-2 p-4 mt-auto border-t border-border">
            <Input
              type="text"
              placeholder="Ask the AI Assistant..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
