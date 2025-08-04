import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ClipboardList, 
  Users, 
  Brain, 
  FileText, 
  BarChart3, 
  Star,
  Trophy,
  FolderOpen
} from 'lucide-react';

export const AccountPromptSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: ClipboardList,
      title: "Project Tracker",
      description: "Manage multiple waterproofing projects with timelines and budgets"
    },
    {
      icon: Users,
      title: "Contractor Comparison",
      description: "Side-by-side tools to evaluate multiple contractors"
    },
    {
      icon: Brain,
      title: "AI Question Generator",
      description: "Custom questions tailored to your specific situation"
    },
    {
      icon: FileText,
      title: "Personal Notes",
      description: "Save and organize all contractor interactions"
    },
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description: "Track your vetting progress and project status"
    },
    {
      icon: Star,
      title: "Reviews & Referrals",
      description: "Share experiences and earn community impact points"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Unlock badges for helping other homeowners"
    },
    {
      icon: FolderOpen,
      title: "Document Management",
      description: "Keep quotes, photos, and documents organized"
    }
  ];

  return (
    <section className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Unlock Your Full Contractor Vetting Toolkit
          </h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Create a free account to access powerful tools that help you organize, track, and make informed decisions about your waterproofing project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              Create Free Account
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-background/80 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Join thousands of homeowners who've made smarter contractor decisions
          </p>
        </div>
      </div>
    </section>
  );
};