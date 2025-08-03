import React from 'react';
import { ArrowRight, BookOpen, MessageSquare, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const getStartedPaths = [
  {
    icon: BookOpen,
    title: 'New to Contractor Vetting?',
    description: 'Start with our comprehensive prep checklist to understand the process',
    action: 'View Prep Checklist',
    route: '/prep-checklist',
    timeCommitment: '15 min read'
  },
  {
    icon: MessageSquare,
    title: 'Ready to Interview?',
    description: 'Get the Elite 12 Questions that expose contractor weaknesses',
    action: 'Get Elite Questions',
    route: '/elite-12',
    timeCommitment: '5 min to review'
  },
  {
    icon: Users,
    title: 'Comparing Contractors?',
    description: 'Use our tools to track and compare multiple contractor responses',
    action: 'Start Comparison',
    route: '/auth',
    timeCommitment: '2 min signup'
  }
];

export const SimpleGetStarted: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl text-foreground mb-6">
            Choose Your Starting Point
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're just beginning to research contractors or ready to start interviews, 
            we have the right tools for your situation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {getStartedPaths.map((path, index) => (
            <Card key={index} className="h-full group hover:border-primary/50 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <path.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="font-inter-tight font-bold text-xl text-foreground mb-3">
                  {path.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {path.description}
                </p>
                
                <div className="text-sm text-primary font-medium mb-6">
                  {path.timeCommitment}
                </div>
                
                <Button 
                  onClick={() => navigate(path.route)}
                  variant="outline"
                  className="w-full group-hover:border-primary group-hover:text-primary"
                >
                  {path.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 bg-muted/50 rounded-lg border">
            <h3 className="font-inter-tight font-bold text-2xl text-foreground mb-4">
              Not Sure Where to Start?
            </h3>
            <p className="text-muted-foreground mb-6">
              If you're dealing with water issues and need contractor help, start with our 
              preparation checklist. It walks you through everything you need to know before 
              meeting with any contractors.
            </p>
            
            <Button 
              onClick={() => navigate('/prep-checklist')}
              size="lg"
            >
              Start with Prep Checklist
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};