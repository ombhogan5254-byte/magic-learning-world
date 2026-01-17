import React from 'react';
import { Sparkles, User, Settings } from 'lucide-react';
import { XPBadge } from '@/components/ui/XPBadge';
import { MagicButton } from '@/components/ui/MagicButton';

interface HeaderProps {
  showStats?: boolean;
  onAvatarClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  showStats = false,
  onAvatarClick 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="glass-card-strong max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-magic-gradient flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground hidden sm:block">
            Magic Learning
          </span>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-4">
          {showStats && (
            <XPBadge xp={1250} size="md" />
          )}
          
          <button 
            onClick={onAvatarClick}
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <User className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
};
