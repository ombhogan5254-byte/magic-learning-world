import React from 'react';
import { cn } from '@/lib/utils';

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'magic' | 'neumorphic' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
}

export const MagicButton = React.forwardRef<HTMLButtonElement, MagicButtonProps>(
  ({ children, className, variant = 'magic', size = 'md', icon, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm rounded-xl',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-2xl',
      xl: 'px-10 py-5 text-xl rounded-2xl',
    };

    const variantClasses = {
      magic: 'btn-magic',
      neumorphic: 'btn-neumorphic text-foreground',
      glass: 'glass-card px-6 py-3 font-semibold text-foreground hover:bg-card/80',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

MagicButton.displayName = 'MagicButton';
