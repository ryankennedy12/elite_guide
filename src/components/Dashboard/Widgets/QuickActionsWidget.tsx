import React from 'react';
import { Plus, FileText, Users, Calculator, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const quickActions = [
  {
    title: 'New Project',
    description: 'Start tracking a new home project',
    icon: Plus,
    action: '/project-tracker',
    color: 'bg-primary text-primary-foreground hover:bg-primary/90',
  },
  {
    title: 'Generate Questions',
    description: 'Create questions for contractors',
    icon: FileText,
    action: '/question-maker',
    color: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  },
  {
    title: 'Compare Contractors',
    description: 'Evaluate contractor proposals',
    icon: Users,
    action: '/contractor-comparison',
    color: 'bg-accent text-accent-foreground hover:bg-accent/90',
  },
  {
    title: 'Help Community',
    description: 'Share reviews & refer friends',
    icon: Heart,
    action: '/reviews-referrals',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
  },
  {
    title: 'Prep Checklist',
    description: 'Prepare for contractor meetings',
    icon: Calculator,
    action: '/prep-checklist',
    color: 'bg-muted text-muted-foreground hover:bg-muted/90',
  },
];

export const QuickActionsWidget: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant="outline"
              className="w-full h-auto p-4 justify-start"
              onClick={() => navigate(action.action)}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="p-2 rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};