import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

export const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            100% Free • No Contractor Partnerships • Unbiased Advice
          </div>

          {/* Main headline */}
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl mb-6 leading-tight">
            Ready to Find a Trustworthy Contractor?
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join over 1,200 Columbus homeowners who've successfully avoided scams and found quality contractors using ContractorVET.
          </p>

          {/* Value points */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-10">
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <CheckCircle className="w-5 h-5" />
              <span>Start vetting in 5 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <CheckCircle className="w-5 h-5" />
              <span>Avoid costly mistakes</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <CheckCircle className="w-5 h-5" />
              <span>Find quality contractors</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold h-auto group bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => navigate('/auth')}
            >
              Get Started Free Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold h-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate('/elite-12')}
            >
              View Sample Questions
            </Button>
          </div>

          {/* Final trust signal */}
          <p className="text-sm text-primary-foreground/70 mt-8">
            No email required to explore • Full access with free account
          </p>
        </div>
      </div>
    </section>
  );
};