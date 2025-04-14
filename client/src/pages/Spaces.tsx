import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Building, Users, FileText, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Spaces() {
  // Mock law firms data
  const firms = [
    { 
      id: 1, 
      name: 'Johnson Legal Group', 
      members: 12, 
      cases: 34, 
      progress: 78,
      lastActivity: '2 hours ago' 
    },
    { 
      id: 2, 
      name: 'Smith & Associates', 
      members: 8, 
      cases: 22, 
      progress: 65,
      lastActivity: '4 hours ago' 
    },
    { 
      id: 3, 
      name: 'Williams Law Partners', 
      members: 15, 
      cases: 41, 
      progress: 92,
      lastActivity: '1 day ago' 
    },
    { 
      id: 4, 
      name: 'Davis & Miller LLP', 
      members: 5, 
      cases: 17, 
      progress: 45,
      lastActivity: '3 days ago' 
    },
  ];

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Spaces: Law Firms</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and collaborate with your legal practice spaces.
          </p>
        </div>
        <Button className="bg-primary">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Space
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {firms.map((firm) => (
          <Card key={firm.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">{firm.name}</h3>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2 space-y-3">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{firm.members} Members</span>
                </div>
                <div className="flex items-center text-sm">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{firm.cases} Active Cases</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Last active: {firm.lastActivity}</span>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Case Progress</span>
                    <span className="font-medium">{firm.progress}%</span>
                  </div>
                  <Progress value={firm.progress} className="h-2" />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="border-dashed border-muted-foreground/30 flex items-center justify-center h-[220px] cursor-pointer hover:border-primary/50 transition-colors">
          <div className="text-center">
            <PlusCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground font-medium">Add New Law Firm</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
