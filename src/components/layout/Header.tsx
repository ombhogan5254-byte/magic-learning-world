import React, { useState, useEffect } from 'react';
import { Sparkles, User, Trophy } from 'lucide-react';
import { XPBadge } from '@/components/ui/XPBadge';
import { SoundControls } from '@/components/ui/SoundControls';
import { storage } from '@/lib/storage';
import { achievementManager } from '@/lib/achievementManager';

interface HeaderProps {
  showStats?: boolean;
  onAvatarClick?: () => void;
  onAchievementsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  showStats = false,
  onAvatarClick,
  onAchievementsClick,
}) => {
  const [xp, setXp] = useState(0);
  const [achievementCount, setAchievementCount] = useState({ unlocked: 0, total: 0 });

  useEffect(() => {
    const profile = storage.getProfile();
    setXp(profile.totalXP);
    setAchievementCount({
      unlocked: achievementManager.getUnlockedCount(),
      total: achievementManager.getTotalCount(),
    });
  }, []);

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
        <div className="flex items-center gap-3">
          {showStats && (
            <>
              <XPBadge xp={xp} size="md" />
              
              {/* Achievements button */}
              <button
                onClick={onAchievementsClick}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-500">
                  {achievementCount.unlocked}/{achievementCount.total}
                </span>
              </button>
            </>
          )}
          
          <SoundControls compact />
          
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
