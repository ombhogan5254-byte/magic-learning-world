import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XPBadgeProps {
  xp: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const XPBadge: React.FC<XPBadgeProps> = ({
  xp,
  showIcon = true,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  return (
    <div
      className={cn(
        'xp-badge inline-flex items-center gap-1.5 font-bold',
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        <Sparkles size={iconSizes[size]} className="text-amber-600" />
      )}
      <span>{xp.toLocaleString()} XP</span>
    </div>
  );
};

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  className,
}) => {
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 28,
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          size={iconSizes[size]}
          className={cn(
            'transition-all duration-300',
            i < rating
              ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]'
              : 'text-muted-foreground/30'
          )}
        />
      ))}
    </div>
  );
};
