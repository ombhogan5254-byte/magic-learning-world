import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress?: number;
  activities: number;
  onClick: () => void;
  delay?: number;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  title,
  description,
  icon,
  color,
  progress = 0,
  activities,
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
        className="group p-6 h-full flex flex-col"
        tilt={true}
      >
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center',
            color
          )}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          
          {/* Progress ring */}
          <ProgressRing 
            progress={progress} 
            size={50} 
            strokeWidth={5}
            color="magic"
            showPercentage={false}
          />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {activities} activities
          </span>
          <span className="text-xs font-medium text-primary">
            {progress}% complete
          </span>
        </div>
        
        {/* Hover glow effect */}
        <div className={cn(
          'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10',
          color
        )} style={{ filter: 'blur(20px)' }} />
      </GlassCard>
    </div>
  );
};
