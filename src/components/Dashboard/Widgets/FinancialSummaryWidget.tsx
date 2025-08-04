import React from 'react';
import { TrendingUp, DollarSign, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const FinancialSummaryWidget: React.FC = () => {
  const totalBudget = 26700;
  const totalSpent = 15075;
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = (totalSpent / totalBudget) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <span>Financial Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Budget Overview */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Budget Used</span>
            <span className="text-sm font-medium">
              {spentPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={spentPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${totalSpent.toLocaleString()} spent</span>
            <span>${totalBudget.toLocaleString()} total</span>
          </div>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm">Remaining Budget</span>
            </div>
            <span className="font-semibold text-green-600">
              ${remainingBudget.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Next Payment</span>
            </div>
            <span className="font-semibold text-blue-600">$5,250</span>
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="pt-2 border-t">
          <h4 className="text-sm font-medium mb-2">Upcoming Payments</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Foundation work</span>
              <span className="font-medium">$5,250</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Waterproofing final</span>
              <span className="font-medium">$3,750</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};