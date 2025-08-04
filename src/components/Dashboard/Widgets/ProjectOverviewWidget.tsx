import React from 'react';
import { MoreHorizontal, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

// Mock data - this would come from your project management system
const projects = [
  {
    id: '1',
    name: 'Basement Waterproofing',
    contractor: 'AquaGuard Solutions',
    status: 'in-progress',
    progress: 65,
    budget: 15000,
    spent: 9750,
    nextMilestone: 'Interior sealant application',
    dueDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Foundation Repair',
    contractor: 'SolidBase Corp',
    status: 'planning',
    progress: 25,
    budget: 8500,
    spent: 2125,
    nextMilestone: 'Site preparation',
    dueDate: '2024-01-20',
  },
  {
    id: '3',
    name: 'Sump Pump Installation',
    contractor: 'FlowGuard Systems',
    status: 'completed',
    progress: 100,
    budget: 3200,
    spent: 3200,
    nextMilestone: 'Project completed',
    dueDate: '2024-01-10',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'planning':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const ProjectOverviewWidget: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Projects</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/project-tracker')}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{project.name}</h3>
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace('-', ' ')}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Contractor: {project.contractor}
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">
                  ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Due:</span>
                <span className="font-medium">{project.dueDate}</span>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">Next milestone:</p>
              <p className="text-sm font-medium">{project.nextMilestone}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};