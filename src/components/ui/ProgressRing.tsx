import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'accent' | 'magic';
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 80,
  strokeWidth = 8,
  className,
  showPercentage = true,
  color = 'primary',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const colorClasses = {
    primary: 'stroke-primary',
    accent: 'stroke-accent',
    magic: 'stroke-[url(#magic-gradient)]',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        className="progress-ring"
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id="magic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--magic-start))" />
            <stop offset="100%" stopColor="hsl(var(--magic-end))" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          className="stroke-muted"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={cn(
            'progress-ring__circle transition-all duration-1000 ease-out',
            color === 'magic' ? '' : colorClasses[color]
          )}
          stroke={color === 'magic' ? 'url(#magic-gradient)' : undefined}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      {showPercentage && (
        <span className="absolute text-lg font-bold text-foreground">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};
