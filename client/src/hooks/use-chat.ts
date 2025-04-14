import { useState, useCallback } from 'react';
import { ChatMessage } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const initialMessages: ChatMessage[] = [
  {
    id: uuidv4(),
    content: 'Hello! How can I assist you with your legal tech needs today?',
    sender: 'assistant',
    timestamp: formatTime()
  }
];

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = useCallback((content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: formatTime()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Mock responses based on user input
      let responseContent = 'I understand. How else can I help you?';
      
      if (content.toLowerCase().includes('document') || content.toLowerCase().includes('case')) {
        responseContent = 'I found 3 recent documents for Johnson v. Smith (Case #LI-2023-42):\n1. Motion to Dismiss (uploaded yesterday)\n2. Client Statement (uploaded 3 days ago)\n3. Evidence Summary (uploaded last week)\n\nWould you like me to open any of these?';
      } else if (content.toLowerCase().includes('schedule') || content.toLowerCase().includes('meeting')) {
        responseContent = 'I\'ve scheduled a meeting for tomorrow at 2:00 PM with the litigation team. Would you like me to send out calendar invites?';
      } else if (content.toLowerCase().includes('research') || content.toLowerCase().includes('precedent')) {
        responseContent = 'Based on your case details, I\'ve found 5 relevant precedents that might be helpful for your argument. Would you like me to summarize them?';
      }
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        content: responseContent,
        sender: 'assistant',
        timestamp: formatTime()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 1000);
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    inputValue,
    setInputValue
  };
}
