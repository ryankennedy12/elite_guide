import React from 'react';
import { AlertTriangle, DollarSign, Clock, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const problems = [
  {
    icon: DollarSign,
    title: 'Overcharging & Hidden Costs',
    description: 'Bad contractors often quote low to win jobs, then add expensive "surprises" once work begins.',
    examples: [
      'Starting at $5,000, ending at $15,000',
      'Hidden material markups of 200-300%',
      'Emergency repairs that weren\'t needed'
    ]
  },
  {
    icon: Clock,
    title: 'Delays & Poor Workmanship',
    description: 'Inexperienced contractors create more problems than they solve, often abandoning jobs.',
    examples: [
      'Projects taking 3x longer than promised',
      'Work that fails within months',
      'Contractors disappearing mid-project'
    ]
  },
  {
    icon: Home,
    title: 'Permanent Home Damage',
    description: 'Poor waterproofing work can cause structural damage costing tens of thousands to repair.',
    examples: [
      'Foundation cracks from improper drainage',
      'Mold growth from failed moisture control',
      'Flooded basements from inadequate systems'
    ]
  }
];

export const ProblemExplanation: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            The Reality of Bad Contractors
          </div>
          
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl text-foreground mb-6">
            Why Most Homeowners Get Burned
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Understanding common contractor problems helps you recognize them before it's too late. 
            Here's what happens when homeowners don't properly vet contractors:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                    <problem.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-inter-tight font-bold text-xl text-foreground">
                    {problem.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {problem.description}
                </p>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Real Examples:</h4>
                  <ul className="space-y-2">
                    {problem.examples.map((example, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20">
          <h3 className="font-inter-tight font-bold text-2xl text-foreground mb-4 text-center">
            The Solution: Proper Vetting
          </h3>
          <p className="text-muted-foreground text-center leading-relaxed">
            Every single one of these problems can be avoided by asking the right questions upfront. 
            Our tools teach you exactly what to ask and what responses to watch for, so you can 
            identify quality contractors before signing any contracts.
          </p>
        </div>
      </div>
    </section>
  );
};