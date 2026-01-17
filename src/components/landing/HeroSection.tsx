import React from 'react';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { MagicButton } from '@/components/ui/MagicButton';
import { FloatingElements } from './FloatingElements';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating background elements */}
      <FloatingElements />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">
            For Classes 1-10
          </span>
        </div>
        
        {/* Heading */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="block text-foreground">Magic Learning</span>
          <span className="text-magic">Playground</span>
        </h1>
        
        {/* Subheading */}
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          Step into a world where learning feels like magic. 
          Interactive lessons, fun games, and exciting challenges await you!
        </p>
        
        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          <MagicButton 
            size="lg" 
            onClick={onGetStarted}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start Learning
          </MagicButton>
          
          <MagicButton 
            variant="glass" 
            size="lg"
            icon={<Play className="w-5 h-5" />}
          >
            Watch Demo
          </MagicButton>
        </div>
        
        {/* Stats */}
        <div 
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up"
          style={{ animationDelay: '0.5s' }}
        >
          {[
            { value: '10', label: 'Classes' },
            { value: '50+', label: 'Subjects' },
            { value: '1000+', label: 'Activities' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-magic">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
