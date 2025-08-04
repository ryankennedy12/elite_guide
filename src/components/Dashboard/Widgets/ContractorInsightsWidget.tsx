import React from 'react';
import { Star, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const contractors = [
  {
    name: 'AquaGuard Solutions',
    project: 'Basement Waterproofing',
    rating: 4.8,
    status: 'active',
    performance: 'excellent',
    lastContact: '2 days ago',
  },
  {
    name: 'SolidBase Corp',
    project: 'Foundation Repair',
    rating: 4.5,
    status: 'planning',
    performance: 'good',
    lastContact: '1 week ago',
  },
  {
    name: 'FlowGuard Systems',
    project: 'Sump Pump Installation',
    rating: 5.0,
    status: 'completed',
    performance: 'excellent',
    lastContact: '3 days ago',
  },
];

const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case 'excellent':
      return 'bg-green-100 text-green-800';
    case 'good':
      return 'bg-blue-100 text-blue-800';
    case 'average':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const ContractorInsightsWidget: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Contractor Insights</span>
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/contractor-comparison')}
        >
          Compare All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contractors.map((contractor) => (
            <div key={contractor.name} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{contractor.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {contractor.project}
                  </p>
                </div>
                <Badge 
                  variant="outline"
                  className={getPerformanceColor(contractor.performance)}
                >
                  {contractor.performance}
                </Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{contractor.rating}</span>
                <span className="text-xs text-muted-foreground">rating</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Last contact:</span>
                </div>
                <span className="font-medium">{contractor.lastContact}</span>
              </div>

              <div className="pt-2 border-t">
                <Badge 
                  variant="outline" 
                  className={
                    contractor.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : contractor.status === 'active'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {contractor.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-foreground">4.8</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">95%</p>
              <p className="text-xs text-muted-foreground">On Time</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};