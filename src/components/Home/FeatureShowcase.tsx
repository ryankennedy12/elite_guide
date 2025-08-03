import React from 'react';
import { CheckCircle, Shield, Brain, FileText, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: Target,
    title: 'Elite 12 Questions',
    description: 'Industry-tested questions that expose contractor weaknesses and reveal true expertise.',
    benefits: ['Proven by professionals', 'Red flag detection', 'Follow-up questions included'],
    route: '/elite-12',
    highlight: true
  },
  {
    icon: Brain,
    title: 'Smart Question Builder',
    description: 'AI-powered tool creates custom questions based on your specific concerns and project needs.',
    benefits: ['Personalized questions', '9 category coverage', 'Export-ready sheets'],
    route: '/question-maker'
  },
  {
    icon: Users,
    title: 'Contractor Comparison',
    description: 'Side-by-side comparison tool to track multiple contractors and their responses.',
    benefits: ['Visual comparisons', 'Score tracking', 'Decision support'],
    route: '/contractor-comparison'
  },
  {
    icon: FileText,
    title: 'Project Management',
    description: 'Complete project tracking with timelines, milestones, and progress monitoring.',
    benefits: ['Timeline tracking', 'Milestone alerts', 'Progress reports'],
    route: '/project-tracker'
  },
  {
    icon: Shield,
    title: 'Scam Protection',
    description: 'Comprehensive database of red flags, warning signs, and common contractor scams.',
    benefits: ['Scam database', 'Warning alerts', 'Protection tips'],
    route: '/prep-checklist'
  },
  {
    icon: CheckCircle,
    title: 'Reference Library',
    description: 'Extensive glossary and preparation checklist to keep you informed and prepared.',
    benefits: ['Technical glossary', 'Prep checklists', 'Quick references'],
    route: '/glossary'
  }
];

export const FeatureShowcase: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl text-foreground mb-6">
            Everything You Need to Vet Contractors
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade tools designed specifically for Columbus homeowners to identify trustworthy waterproofing contractors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 group ${
                  feature.highlight ? 'ring-2 ring-primary/20 border-primary/30' : ''
                }`}
              >
                {feature.highlight && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}

                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    feature.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-inter-tight font-bold text-xl text-foreground mb-3">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    variant={feature.highlight ? "default" : "outline"}
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate(feature.route)}
                  >
                    Explore Feature
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg font-semibold h-auto"
            onClick={() => navigate('/auth')}
          >
            Get Started with All Features
          </Button>
        </div>
      </div>
    </section>
  );
};