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
    content: "Good morning Ahmad! Here are your important tasks for today:\n\n1. Review and approve intake forms for Johnson Legal (due at 11:00 AM)\n2. Schedule follow-up call with Smith & Associates about their AI intake implementation\n3. Review the billing reports from last month for all clients\n4. Prepare for tomorrow's presentation on Intakely's new features\n5. Complete agent builder configuration for Williams Law Partners\n\nHow would you like to prioritize these tasks? Or is there something else you'd like to focus on today?",
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
      let responseContent = 'I understand. How else can I help you today?';
      
      if (content.toLowerCase().includes('prioritize') || content.toLowerCase().includes('order')) {
        responseContent = "Based on deadlines and importance, I suggest this prioritization:\n\n1. First, review the Johnson Legal intake forms since they're due at 11:00 AM\n2. Next, schedule the Smith & Associates follow-up call\n3. Complete the agent builder configuration for Williams Law Partners\n4. Review the billing reports from last month\n5. Work on tomorrow's presentation\n\nWould you like me to block time in your calendar for these tasks?";
      } else if (content.toLowerCase().includes('document') || content.toLowerCase().includes('case')) {
        responseContent = 'I found 3 recent documents for Johnson v. Smith (Case #LI-2023-42):\n1. Motion to Dismiss (uploaded yesterday)\n2. Client Statement (uploaded 3 days ago)\n3. Evidence Summary (uploaded last week)\n\nWould you like me to open any of these?';
      } else if (content.toLowerCase().includes('schedule') || content.toLowerCase().includes('meeting')) {
        responseContent = 'I\'ve looked at your calendar and found these available time slots for the Smith & Associates call:\n- Today at 1:30 PM (30 min)\n- Today at 4:00 PM (45 min)\n- Tomorrow at 10:00 AM (60 min)\n\nWhich would you prefer?';
      } else if (content.toLowerCase().includes('billing') || content.toLowerCase().includes('reports')) {
        responseContent = 'I\'ve prepared a summary of last month\'s billing reports:\n\n- Total billable hours: 1,247 hours\n- Total billed amount: $312,450\n- Top billing practice area: Corporate Law ($145,320)\n- Invoices pending payment: 12 ($87,300)\n\nWould you like to see the detailed breakdown by attorney or practice area?';
      } else if (content.toLowerCase().includes('presentation') || content.toLowerCase().includes('tomorrow')) {
        responseContent = 'For tomorrow\'s presentation on Intakely\'s new features, I\'ve prepared an outline covering:\n\n1. Enhanced AI intake automation\n2. Multi-language support for client communications\n3. New analytics dashboard for practice performance\n4. Advanced document automation\n5. Client portal improvements\n\nWould you like me to incorporate any specific case studies or statistics?';
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
