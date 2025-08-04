import React from 'react';
import { Clock, CheckCircle, AlertCircle, User, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const activities = [
  {
    id: '1',
    type: 'milestone',
    icon: CheckCircle,
    title: 'Milestone completed',
    description: 'Basement excavation finished',
    time: '2 hours ago',
    color: 'text-green-600',
  },
  {
    id: '2',
    type: 'contractor',
    icon: User,
    title: 'New contractor proposal',
    description: 'AquaGuard Solutions submitted bid',
    time: '4 hours ago',
    color: 'text-blue-600',
  },
  {
    id: '3',
    type: 'deadline',
    icon: AlertCircle,
    title: 'Upcoming deadline',
    description: 'Foundation inspection in 3 days',
    time: '6 hours ago',
    color: 'text-orange-600',
  },
  {
    id: '4',
    type: 'note',
    icon: FileText,
    title: 'Note added',
    description: 'Meeting notes with contractor',
    time: '1 day ago',
    color: 'text-purple-600',
  },
  {
    id: '5',
    type: 'payment',
    icon: CheckCircle,
    title: 'Payment processed',
    description: '$5,000 milestone payment',
    time: '2 days ago',
    color: 'text-green-600',
  },
];

export const RecentActivityWidget: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};