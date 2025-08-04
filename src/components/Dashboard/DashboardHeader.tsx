import React from 'react';
import { User } from '@supabase/supabase-js';
import { Bell, Search, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  user: User | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const navigate = useNavigate();
  
  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <header className="bg-card border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Welcome back!
          </h1>
          <p className="text-sm text-muted-foreground">
            Here's what's happening with your projects today.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Help Community CTA */}
          <Button 
            onClick={() => navigate('/reviews-referrals')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium"
            size="sm"
          >
            <Heart className="h-4 w-4 mr-2" />
            Help Community
          </Button>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10 w-64"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full text-xs flex items-center justify-center text-primary-foreground">
              3
            </span>
          </Button>

          {/* User Avatar */}
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {user?.email ? getInitials(user.email) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">
                {user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-muted-foreground">Homeowner</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};