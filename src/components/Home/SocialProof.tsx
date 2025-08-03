import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'Westerville, OH',
    image: '/lovable-uploads/testimonial-1.jpg',
    rating: 5,
    text: 'ContractorVET saved me from a $15,000 mistake. The red flags I learned to spot helped me avoid a contractor who would have made my basement flooding worse.',
    project: 'Basement Waterproofing'
  },
  {
    name: 'Mike Chen',
    location: 'Dublin, OH',
    image: '/lovable-uploads/testimonial-2.jpg',
    rating: 5,
    text: 'The Elite 12 Questions are incredible. I used them to interview 5 contractors and immediately knew which one actually understood waterproofing.',
    project: 'Foundation Repair'
  },
  {
    name: 'Jennifer Rodriguez',
    location: 'Hilliard, OH',
    image: '/lovable-uploads/testimonial-3.jpg',
    rating: 5,
    text: 'As a single mom, I was terrified of getting scammed. This app gave me the confidence to ask the right questions and find an honest contractor.',
    project: 'Sump Pump Installation'
  },
  {
    name: 'David Thompson',
    location: 'Upper Arlington, OH',
    image: '/lovable-uploads/testimonial-4.jpg',
    rating: 5,
    text: 'The project tracker helped me stay on top of every detail. My contractor was impressed with how organized and informed I was throughout the process.',
    project: 'Crawl Space Waterproofing'
  }
];

const stats = [
  { value: '98%', label: 'Success Rate in Finding Quality Contractors' },
  { value: '$2.3M', label: 'Total Amount Saved from Avoided Scams' },
  { value: '1,200+', label: 'Columbus Homeowners Protected' },
  { value: '4.9/5', label: 'Average User Satisfaction Rating' }
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Stats section */}
        <div className="text-center mb-16">
          <h2 className="font-inter-tight font-bold text-3xl md:text-5xl text-foreground mb-6">
            Trusted by Columbus Homeowners
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join over 1,200 Columbus homeowners who've successfully found trustworthy contractors and avoided costly scams.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="font-inter-tight font-bold text-2xl md:text-3xl text-foreground text-center mb-12">
            What Columbus Homeowners Are Saying
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  {/* Testimonial text */}
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.location} • {testimonial.project}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              100% Free to Use
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              No Contractor Partnerships
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              Unbiased Recommendations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};