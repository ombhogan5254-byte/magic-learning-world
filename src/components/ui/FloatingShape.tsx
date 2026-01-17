import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingShapeProps {
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'hexagon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'accent' | 'magic';
  className?: string;
  delay?: number;
}

export const FloatingShape: React.FC<FloatingShapeProps> = ({
  shape,
  size = 'md',
  color = 'primary',
  className,
  delay = 0,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const colorClasses = {
    primary: 'bg-primary/20 border-primary/30',
    accent: 'bg-accent/20 border-accent/30',
    magic: 'bg-magic-gradient opacity-30',
  };

  const shapeStyles: Record<string, React.CSSProperties> = {
    circle: { borderRadius: '50%' },
    square: { borderRadius: '20%', transform: 'rotate(15deg)' },
    triangle: { 
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      borderRadius: '0',
    },
    star: {
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    },
    hexagon: {
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    },
  };

  return (
    <div
      className={cn(
        'absolute backdrop-blur-sm border animate-float',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      style={{
        ...shapeStyles[shape],
        animationDelay: `${delay}s`,
        animationDuration: `${6 + Math.random() * 4}s`,
      }}
    />
  );
};
