import React, { useState } from 'react';
import { MessageSquare, Search, Users, FolderOpen, ChevronRight, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const tutorials = [
  {
    icon: MessageSquare,
    title: 'Elite 12 Questions',
    description: 'Master the proven questions that expose contractor weaknesses',
    route: '/elite-12',
    steps: [
      'Print or save the questions to your phone',
      'Use them during every contractor meeting',
      'Pay attention to the red flags and follow-up questions',
      'Compare how different contractors respond'
    ],
    duration: '15 min read',
    difficulty: 'Beginner'
  },
  {
    icon: Search,
    title: 'Custom Question Builder',
    description: 'Generate targeted questions based on your specific concerns',
    route: '/question-maker',
    steps: [
      'Describe your specific problem (flooding, cracks, etc.)',
      'Select relevant categories (cost, timeline, warranty)',
      'Review AI-generated questions tailored to your situation',
      'Export your personalized interview plan'
    ],
    duration: '10 min setup',
    difficulty: 'Beginner'
  },
  {
    icon: Users,
    title: 'Contractor Comparison',
    description: 'Track and compare multiple contractors side-by-side',
    route: '/contractor-comparison',
    steps: [
      'Add contractors as you interview them',
      'Rate their responses to your questions',
      'Track licenses, insurance, and references',
      'Compare pricing and project timelines'
    ],
    duration: '5 min per contractor',
    difficulty: 'Intermediate'
  },
  {
    icon: FolderOpen,
    title: 'Project Management',
    description: 'Stay organized from planning through completion',
    route: '/project-tracker',
    steps: [
      'Create a project with timeline and budget',
      'Track milestones and payment schedules',
      'Monitor progress and document issues',
      'Store contracts, photos, and communications'
    ],
    duration: 'Ongoing',
    difficulty: 'Intermediate'
  }
];

export const ToolTutorials: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState(0);
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl text-foreground mb-6">
            How to Use Each Tool
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Step-by-step guides for each tool in your contractor vetting toolkit. 
            Start with the Elite 12 Questions if you're new to contractor interviews.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Tool selection */}
          <div className="space-y-4">
            {tutorials.map((tool, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all ${
                  selectedTool === index ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedTool(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedTool === index ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-inter-tight font-bold text-lg text-foreground mb-1">
                        {tool.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {tool.description}
                      </p>
                    </div>
                    
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      selectedTool === index ? 'rotate-90 text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected tool details */}
          <Card className="h-fit">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  {React.createElement(tutorials[selectedTool].icon, { 
                    className: "w-8 h-8 text-primary" 
                  })}
                </div>
                
                <div>
                  <h3 className="font-inter-tight font-bold text-2xl text-foreground mb-1">
                    {tutorials[selectedTool].title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{tutorials[selectedTool].duration}</span>
                    <span>•</span>
                    <span>{tutorials[selectedTool].difficulty}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {tutorials[selectedTool].description}
              </p>

              <div className="mb-8">
                <h4 className="font-semibold text-foreground mb-4">Step-by-Step Process:</h4>
                <ol className="space-y-3">
                  {tutorials[selectedTool].steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary mt-0.5 shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <Button 
                onClick={() => navigate(tutorials[selectedTool].route)}
                className="w-full"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Try {tutorials[selectedTool].title}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};