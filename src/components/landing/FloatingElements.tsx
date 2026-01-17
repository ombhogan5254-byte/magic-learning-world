import React from 'react';
import { FloatingShape } from '@/components/ui/FloatingShape';
import { BookOpen, Sparkles, Star, Lightbulb, Rocket, Brain, Atom, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingIconProps {
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon, className, delay = 0 }) => (
  <div
    className={cn(
      'absolute glass-card p-4 animate-float shadow-soft',
      className
    )}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${5 + Math.random() * 3}s`,
    }}
  >
    {icon}
  </div>
);

export const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-gradient opacity-50" />
      
      {/* Floating shapes */}
      <FloatingShape shape="circle" size="lg" color="primary" className="top-[15%] left-[8%]" delay={0} />
      <FloatingShape shape="square" size="md" color="accent" className="top-[25%] right-[12%]" delay={1} />
      <FloatingShape shape="hexagon" size="sm" color="magic" className="bottom-[30%] left-[15%]" delay={2} />
      <FloatingShape shape="triangle" size="md" color="primary" className="bottom-[20%] right-[8%]" delay={0.5} />
      <FloatingShape shape="star" size="sm" color="accent" className="top-[60%] left-[5%]" delay={1.5} />
      <FloatingShape shape="circle" size="sm" color="magic" className="top-[10%] right-[25%]" delay={2.5} />
      
      {/* Floating icons */}
      <FloatingIcon 
        icon={<BookOpen className="w-6 h-6 text-primary" />}
        className="top-[20%] right-[20%]"
        delay={0.3}
      />
      <FloatingIcon 
        icon={<Star className="w-6 h-6 text-amber-500" />}
        className="top-[35%] left-[12%]"
        delay={1.2}
      />
      <FloatingIcon 
        icon={<Lightbulb className="w-6 h-6 text-accent" />}
        className="bottom-[35%] right-[15%]"
        delay={0.8}
      />
      <FloatingIcon 
        icon={<Rocket className="w-6 h-6 text-primary" />}
        className="bottom-[25%] left-[20%]"
        delay={2}
      />
      <FloatingIcon 
        icon={<Brain className="w-6 h-6 text-accent" />}
        className="top-[50%] right-[8%]"
        delay={1.5}
      />
      <FloatingIcon 
        icon={<Atom className="w-5 h-5 text-primary" />}
        className="top-[65%] left-[8%]"
        delay={0.5}
      />
      <FloatingIcon 
        icon={<Calculator className="w-5 h-5 text-accent" />}
        className="top-[12%] left-[25%]"
        delay={1.8}
      />
    </div>
  );
};
