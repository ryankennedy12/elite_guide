import React, { useState } from 'react';
import { AlertTriangle, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const redFlags = [
  {
    category: 'Initial Contact',
    items: [
      {
        flag: 'Door-to-door solicitation',
        explanation: 'Quality contractors get work through referrals, not cold calling.',
        whatToSay: 'Thanks, but I only work with contractors I research myself.'
      },
      {
        flag: 'Pressure for immediate decision',
        explanation: 'High-pressure tactics are designed to prevent you from getting other quotes.',
        whatToSay: 'I always get multiple quotes before making decisions this large.'
      },
      {
        flag: 'Cash-only payments',
        explanation: 'Legitimate contractors accept checks and have business bank accounts.',
        whatToSay: 'I only pay by check for proper documentation and protection.'
      }
    ]
  },
  {
    category: 'Credentials & Licensing',
    items: [
      {
        flag: 'No license or insurance',
        explanation: 'Unlicensed contractors put you at legal and financial risk.',
        whatToSay: 'I need to verify your license and insurance before we proceed.'
      },
      {
        flag: 'Won\'t provide references',
        explanation: 'Good contractors are proud of their work and happy to share references.',
        whatToSay: 'I\'d like to speak with 3-5 recent customers before deciding.'
      },
      {
        flag: 'No physical business address',
        explanation: 'P.O. boxes or residential addresses suggest an unstable business.',
        whatToSay: 'Can I visit your business location to see your operation?'
      }
    ]
  },
  {
    category: 'Pricing & Contracts',
    items: [
      {
        flag: 'Demands full payment upfront',
        explanation: 'Never pay more than 10% upfront for legitimate work.',
        whatToSay: 'I follow industry standards: small deposit, then payments tied to milestones.'
      },
      {
        flag: 'Verbal agreements only',
        explanation: 'Without written contracts, you have no legal protection.',
        whatToSay: 'Everything needs to be in writing before we start.'
      },
      {
        flag: 'Prices significantly below others',
        explanation: 'If it seems too good to be true, it probably is.',
        whatToSay: 'Your price is much lower than others. Can you explain why?'
      }
    ]
  },
  {
    category: 'Technical Knowledge',
    items: [
      {
        flag: 'Vague answers to technical questions',
        explanation: 'Professional contractors can explain their methods clearly.',
        whatToSay: 'I need to understand exactly what work you\'ll be doing and why.'
      },
      {
        flag: 'One-size-fits-all solutions',
        explanation: 'Every basement and foundation problem is unique.',
        whatToSay: 'How does your solution address my specific situation?'
      },
      {
        flag: 'Dismisses need for permits',
        explanation: 'Major waterproofing work often requires permits.',
        whatToSay: 'Let\'s check with the city about what permits we need.'
      }
    ]
  }
];

const goodSigns = [
  'Provides detailed written estimates',
  'Shows photos of recent similar projects',
  'Explains warranty terms clearly',
  'Asks detailed questions about your problem',
  'Suggests you get other quotes',
  'Has local references and reviews',
  'Carries proper insurance and licensing',
  'Professional appearance and communication'
];

export const RedFlagsGuide: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Initial Contact');

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            Critical Red Flags
          </div>
          
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl text-foreground mb-6">
            Spot Bad Contractors Instantly
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn to recognize warning signs before they cost you money. 
            These red flags have saved countless homeowners from contractor scams.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Red flags */}
          <div className="lg:col-span-2">
            <h3 className="font-inter-tight font-bold text-2xl text-foreground mb-6">
              Warning Signs to Watch For
            </h3>
            
            <div className="space-y-4">
              {redFlags.map((category, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleCategory(category.category)}
                      className="w-full p-6 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                          <X className="w-4 h-4 text-destructive" />
                        </div>
                        <h4 className="font-semibold text-foreground">
                          {category.category}
                        </h4>
                      </div>
                      {expandedCategory === category.category ? 
                        <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      }
                    </button>
                    
                    {expandedCategory === category.category && (
                      <div className="px-6 pb-6 border-t border-border">
                        <div className="space-y-6 pt-6">
                          {category.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="border-l-2 border-destructive/20 pl-4">
                              <h5 className="font-semibold text-destructive mb-2">
                                🚩 {item.flag}
                              </h5>
                              <p className="text-muted-foreground text-sm mb-3">
                                {item.explanation}
                              </p>
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-sm font-medium text-foreground">
                                  What to say: "{item.whatToSay}"
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Good signs */}
          <div>
            <h3 className="font-inter-tight font-bold text-2xl text-foreground mb-6">
              Good Signs to Look For
            </h3>
            
            <Card className="h-fit">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">
                    Professional Contractors
                  </h4>
                </div>
                
                <div className="space-y-3">
                  {goodSigns.map((sign, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground text-sm">{sign}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Remember:</strong> Good contractors 
                    welcome your questions and scrutiny. If someone gets defensive about 
                    your due diligence, that's a red flag itself.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};