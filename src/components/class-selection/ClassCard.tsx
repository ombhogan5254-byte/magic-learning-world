import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface ClassCardProps {
  classNumber: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  onClick: () => void;
  delay?: number;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  classNumber,
  title,
  description,
  icon,
  gradient,
  onClick,
  delay = 0,
}) => {
  return (
    <div
      className="animate-scale-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <GlassCard
        onClick={onClick}
        className="group p-6 h-full relative overflow-hidden"
        tilt={true}
      >
        {/* Background gradient */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
            gradient
          )}
        />
        
        {/* Class number badge */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{classNumber}</span>
        </div>
        
        {/* Icon */}
        <div className={cn(
          'w-16 h-16 rounded-2xl flex items-center justify-center mb-4',
          'bg-gradient-to-br',
          gradient
        )}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {/* Hover indicator */}
        <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-medium">Explore</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </GlassCard>
    </div>
  );
};
