export type User = {
  id: number;
  username: string;
};

export type ChatMessage = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
};

export type Client = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
};

export type Case = {
  id: string;
  title: string;
  client: string;
  caseNumber: string;
  status: 'active' | 'pending' | 'closed';
  assignedTo: string[];
  createdAt: string;
};

export type Call = {
  id: string;
  company: string;
  time: string;
  participants?: string[];
  duration?: number;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'document' | 'meeting' | 'message' | 'client' | 'alert';
  read: boolean;
};
