import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 -z-10" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse hidden md:block" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-accent/30 rounded-full animate-pulse delay-1000 hidden md:block" />
      <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-secondary/40 rounded-full animate-pulse delay-500 hidden md:block" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Shield className="w-4 h-4" />
            Trusted by 1,000+ Columbus Homeowners
          </div>

          {/* Main headline */}
          <h1 className="font-inter-tight font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight animate-fade-in">
            <span className="block">Never Get Scammed by</span>
            <span className="block text-primary">Waterproofing Contractors</span>
            <span className="block">Again</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            The complete toolkit Columbus homeowners use to <strong className="text-foreground">vet contractors</strong>, 
            <strong className="text-foreground"> avoid scams</strong>, and 
            <strong className="text-foreground"> protect their biggest investment</strong>.
          </p>

          {/* Value proposition points */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-10 animate-fade-in">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>12 Proven Questions</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Red Flag Detection</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Project Management</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold h-auto group"
              onClick={() => navigate('/auth')}
            >
              Start Vetting Contractors Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold h-auto"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See How It Works
            </Button>
          </div>

          {/* Social proof numbers */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">1,200+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Homeowners Protected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">$2.5M+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Scams Prevented</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Bad Contractors Exposed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};