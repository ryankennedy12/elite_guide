import React from 'react';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader';
import { DashboardGrid } from '@/components/Dashboard/DashboardGrid';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <DashboardHeader user={user} />
        <main className="container mx-auto px-4 py-6">
          <DashboardGrid />
        </main>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;