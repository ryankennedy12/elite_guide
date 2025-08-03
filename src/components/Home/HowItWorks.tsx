import React from 'react';
import { ClipboardList, MessageCircle, Users, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: ClipboardList,
    title: 'Prepare Your Questions',
    description: 'Get the Elite 12 Questions that separate legitimate pros from scammers. Each question comes with red flags to watch for.',
    features: ['Elite 12 Questions', 'Red Flag Decoder', 'Pro Tips & Follow-ups'],
    cta: 'View Questions',
    route: '/elite-12'
  },
  {
    icon: MessageCircle,
    title: 'Interview Contractors',
    description: 'Use our custom question maker to create targeted questions for your specific project and concerns.',
    features: ['Custom Question Builder', 'Concern-Based Questions', 'Interview Cheat Sheets'],
    cta: 'Build Questions',
    route: '/question-maker'
  },
  {
    icon: Users,
    title: 'Compare & Decide',
    description: 'Track multiple contractors side-by-side with our comparison tools. See who passes the test.',
    features: ['Contractor Comparison', 'Score Tracking', 'Decision Matrix'],
    cta: 'Compare Contractors',
    route: '/contractor-comparison'
  },
  {
    icon: FolderOpen,
    title: 'Manage Your Project',
    description: 'Keep everything organized with project tracking, notes, and progress monitoring tools.',
    features: ['Project Tracking', 'Progress Monitoring', 'Notes & Documentation'],
    cta: 'Start Project',
    route: '/project-tracker'
  }
];

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl text-foreground mb-6">
            How ContractorVET Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow our proven 4-step process to find trustworthy waterproofing contractors and avoid costly mistakes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div 
                key={index} 
                className="relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-6 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-inter-tight font-bold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-6">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={() => navigate(step.route)}
                >
                  {step.cta}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Process flow indicators on desktop */}
        <div className="hidden lg:block relative mt-8">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border transform -translate-y-1/2" />
          {/* Arrow connectors would be styled here for larger screens */}
        </div>
      </div>
    </section>
  );
};