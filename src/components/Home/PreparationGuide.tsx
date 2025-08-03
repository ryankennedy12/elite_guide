import React from 'react';
import { CheckCircle, FileText, Camera, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const preparationSteps = [
  {
    icon: FileText,
    title: 'Document Your Problem',
    description: 'Take photos and notes about your waterproofing issues',
    tasks: [
      'Photograph all areas of concern',
      'Note when problems occur (rain, snow melt, etc.)',
      'Measure affected areas',
      'Document any previous repair attempts'
    ],
    timeNeeded: '30 minutes'
  },
  {
    icon: Users,
    title: 'Gather Your Questions',
    description: 'Prepare the right questions using our proven tools',
    tasks: [
      'Start with the Elite 12 Questions',
      'Use Question Maker for specific concerns',
      'Print or save questions to your phone',
      'Prepare follow-up questions for vague answers'
    ],
    timeNeeded: '15 minutes'
  },
  {
    icon: Camera,
    title: 'Research Local Requirements',
    description: 'Understand what contractors need in your area',
    tasks: [
      'Check local licensing requirements',
      'Understand permit needs for your project',
      'Research typical costs for similar work',
      'Find your city\'s contractor complaint database'
    ],
    timeNeeded: '45 minutes'
  },
  {
    icon: Clock,
    title: 'Set Your Timeline',
    description: 'Establish realistic expectations and deadlines',
    tasks: [
      'Determine your urgency level',
      'Plan time for multiple contractor meetings',
      'Set decision deadlines',
      'Consider seasonal factors (winter, spring thaw)'
    ],
    timeNeeded: '15 minutes'
  }
];

const meetingChecklist = [
  'Bring printed questions',
  'Take notes on contractor responses',
  'Ask for business license and insurance info',
  'Request 3-5 recent references',
  'Don\'t commit to anything on the spot',
  'Trust your instincts about the person'
];

export const PreparationGuide: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl text-foreground mb-6">
            Before You Meet Any Contractors
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proper preparation is the key to successful contractor interviews. 
            Spend 2 hours preparing now to save thousands later.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {preparationSteps.map((step, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="font-inter-tight font-bold text-xl text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    <div className="text-sm text-primary font-medium">
                      ⏱️ Time needed: {step.timeNeeded}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Tasks:</h4>
                  <ul className="space-y-2">
                    {step.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meeting checklist */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h3 className="font-inter-tight font-bold text-2xl text-foreground mb-6">
                During Contractor Meetings
              </h3>
              
              <div className="space-y-3 mb-6">
                {meetingChecklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Pro tip:</strong> The best contractors 
                  appreciate informed homeowners. If someone seems annoyed by your questions, 
                  that's valuable information about how they'll handle your project.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <h3 className="font-inter-tight font-bold text-2xl text-foreground mb-4">
                Ready to Start?
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Get your proven questions and start vetting contractors like a pro. 
                Our tools guide you through every step of the process.
              </p>

              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/elite-12')}
                  className="w-full"
                  size="lg"
                >
                  Get the Elite 12 Questions
                </Button>
                
                <Button 
                  onClick={() => navigate('/question-maker')}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Build Custom Questions
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                No signup required to view the questions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};