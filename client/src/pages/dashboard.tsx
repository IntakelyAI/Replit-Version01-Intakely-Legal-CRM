import { Users, FileText, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { UpcomingCalls } from "@/components/dashboard/UpcomingCalls";

// Mock tasks data
const tasks = [
  { id: '1', title: 'Review agent call logs', dueTime: '2:30 PM', type: 'document' },
  { id: '2', title: 'Onboard Johnson Legal Group', dueTime: '4:00 PM', type: 'client' },
  { id: '3', title: 'Configure webhook settings', dueTime: 'Tomorrow', type: 'technical' },
];

// Mock calls data
const calls = [
  { id: '1', company: 'Smith & Associates', time: '11:30 AM' },
  { id: '2', company: 'Williams Law Partners', time: '2:00 PM' },
  { id: '3', company: 'Davis & Miller LLP', time: 'Tomorrow' },
];

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back! Here's an overview of your legal operations.
        </p>
        <div className="mt-4 p-4 bg-muted/50 rounded-md border border-border">
          <p className="text-sm italic text-muted-foreground">
            "Indeed, Allah will not change the condition of a people until they change what is in themselves."
            <span className="block mt-1 text-xs">— Quran 13:11</span>
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Active Clients" 
          value="328" 
          icon={<Users className="h-6 w-6" />} 
          change={{ value: 7.2, timeframe: "last month" }} 
        />
        
        <StatCard 
          title="Ongoing Cases" 
          value="143" 
          icon={<FileText className="h-6 w-6" />} 
          change={{ value: 2.5, timeframe: "last month" }}
          iconBgClassName="bg-blue-100 dark:bg-blue-900/30"
          iconClassName="text-blue-600 dark:text-blue-400" 
        />
        
        <StatCard 
          title="AI Calls" 
          value="87" 
          icon={<Phone className="h-6 w-6" />} 
          change={{ value: 12.9, timeframe: "last month" }}
          iconBgClassName="bg-indigo-100 dark:bg-indigo-900/30"
          iconClassName="text-indigo-600 dark:text-indigo-400" 
        />
      </div>

      {/* Content Tabs */}
      <div className="mt-8">
        <Tabs defaultValue="tasks">
          <TabsList className="w-full justify-start border-b rounded-none pb-0 mb-0">
            <TabsTrigger value="tasks" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Tasks</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-b-none">Notifications</TabsTrigger>
            <TabsTrigger value="communications" className="rounded-b-none">Communications</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-b-none">Analytics</TabsTrigger>
            <TabsTrigger value="personal-assistant" className="rounded-b-none">Personal Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks" className="mt-6">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <TaskList 
                title="Tasks in Progress" 
                count={12} 
                subtitle="4 due today" 
                tasks={tasks} 
              />
              
              <UpcomingCalls 
                calls={calls} 
                count={3} 
                nextCallMessage="Next call in 45 minutes" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="mt-4 p-6 bg-card rounded-md border border-border">
              <p className="text-center text-muted-foreground">Notification content will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="communications">
            <div className="mt-4 p-6 bg-card rounded-md border border-border">
              <p className="text-center text-muted-foreground">Communications content will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="mt-4 p-6 bg-card rounded-md border border-border">
              <p className="text-center text-muted-foreground">Analytics will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="personal-assistant">
            <div className="mt-4 p-6 bg-card rounded-md border border-border">
              <p className="text-center text-muted-foreground">Personal Assistant content will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
