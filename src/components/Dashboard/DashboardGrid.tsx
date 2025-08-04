import React from 'react';
import { ProjectOverviewWidget } from './Widgets/ProjectOverviewWidget';
import { QuickActionsWidget } from './Widgets/QuickActionsWidget';
import { RecentActivityWidget } from './Widgets/RecentActivityWidget';
import { StatsOverviewWidget } from './Widgets/StatsOverviewWidget';
import { ContractorInsightsWidget } from './Widgets/ContractorInsightsWidget';
import { FinancialSummaryWidget } from './Widgets/FinancialSummaryWidget';

export const DashboardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Overview - Full width on mobile, spans 2 columns on desktop */}
      <div className="lg:col-span-2">
        <StatsOverviewWidget />
      </div>

      {/* Quick Actions */}
      <div className="lg:col-span-1">
        <QuickActionsWidget />
      </div>

      {/* Project Overview */}
      <div className="lg:col-span-2">
        <ProjectOverviewWidget />
      </div>

      {/* Recent Activity */}
      <div className="lg:col-span-1">
        <RecentActivityWidget />
      </div>

      {/* Financial Summary */}
      <div className="lg:col-span-1">
        <FinancialSummaryWidget />
      </div>

      {/* Contractor Insights */}
      <div className="lg:col-span-2">
        <ContractorInsightsWidget />
      </div>
    </div>
  );
};