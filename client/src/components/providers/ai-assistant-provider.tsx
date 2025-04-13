import React, { createContext, useState, useContext, ReactNode } from 'react';
import AIAssistantChat from '@/components/shared/ai-assistant-chat';

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

interface AIAssistantContextProps {
  isAssistantVisible: boolean;
  toggleAssistant: () => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const AIAssistantContext = createContext<AIAssistantContextProps | undefined>(undefined);

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};

export const AIAssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAssistantVisible, setIsAssistantVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSection, setCurrentSection] = useState('dashboard');

  const toggleAssistant = () => {
    setIsAssistantVisible(!isAssistantVisible);
    
    // Add a contextual welcome message when opening if there are no messages
    if (!isAssistantVisible && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: getContextualWelcome(currentSection),
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const getContextualWelcome = (section: string): string => {
    switch (section) {
      case 'dashboard':
        return "Hello! I'm your AI assistant. I can help you navigate the dashboard, explain metrics, or assist with any other tasks. What would you like to know?";
      case 'clients':
        return "Welcome to the Clients section. I can help you find client information, manage client data, or assist with client-related tasks. How can I assist you?";
      case 'cases':
        return "You're in the Cases section. I can help you track case progress, find case information, or manage case-related tasks. What do you need help with?";
      case 'agent-builder':
        return "Welcome to the Agent Builder. I can help you create AI agents, manage workflows, or optimize your agent configurations. How can I assist you today?";
      default:
        return "Hello! I'm your AI assistant. How can I help you today?";
    }
  };

  const handleSendMessage = async (message: string): Promise<string> => {
    // In a real implementation, this would call an API to get a response
    // For now, we'll simulate a response based on the current section
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses: Record<string, string[]> = {
      'dashboard': [
        "Here's a summary of your dashboard metrics for the week.",
        "I can help you interpret these trends. What specific aspect interests you?",
        "Your client satisfaction score has increased by 15% this month.",
        "Would you like me to generate a report based on these dashboard metrics?"
      ],
      'clients': [
        "I found 3 clients that match your criteria.",
        "The client record has been updated successfully.",
        "Would you like me to schedule a follow-up with this client?",
        "I've created a new client profile with the information you provided."
      ],
      'cases': [
        "This case is currently in the 'Discovery' phase.",
        "There are 3 upcoming deadlines for this case.",
        "I've updated the case status as requested.",
        "Would you like me to summarize the recent activity on this case?"
      ],
      'agent-builder': [
        "Your agent has been trained on the new knowledge base.",
        "The workflow has been saved and is ready for testing.",
        "I've analyzed your agent's performance and have some optimization suggestions.",
        "Would you like me to help you set up a new agent for a specific task?"
      ]
    };

    const sectionResponses = responses[currentSection] || responses['dashboard'];
    return sectionResponses[Math.floor(Math.random() * sectionResponses.length)];
  };

  return (
    <AIAssistantContext.Provider 
      value={{ 
        isAssistantVisible, 
        toggleAssistant, 
        messages, 
        addMessage,
        currentSection,
        setCurrentSection
      }}
    >
      {children}
      {isAssistantVisible && (
        <AIAssistantChat 
          initialMessages={messages} 
          onSendMessage={handleSendMessage}
        />
      )}
    </AIAssistantContext.Provider>
  );
};