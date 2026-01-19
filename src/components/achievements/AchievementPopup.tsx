/**
 * Achievement Unlock Popup
 * Shows animated popup when achievements are unlocked
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/lib/storage';
import { achievementManager } from '@/lib/achievementManager';
import { Trophy, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AchievementPopup: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const unsubscribe = achievementManager.onUnlock((achievement) => {
      setAchievements(prev => [...prev, achievement]);
      
      // Auto-remove after 4 seconds
      setTimeout(() => {
        setAchievements(prev => prev.filter(a => a.id !== achievement.id));
      }, 4000);
    });

    return unsubscribe;
  }, []);

  const dismissAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="pointer-events-auto"
          >
            <div className="glass-card-strong p-4 rounded-2xl flex items-center gap-4 min-w-[280px] shadow-glow border border-amber-500/30">
              {/* Icon with glow effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full animate-pulse" />
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl shadow-lg">
                  {achievement.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-medium text-amber-500 uppercase tracking-wider">
                    Achievement Unlocked!
                  </span>
                </div>
                <h4 className="font-bold text-foreground">{achievement.name}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => dismissAchievement(achievement.id)}
                className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>

            {/* Sparkle effects */}
            <div className="absolute -inset-2 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400 rounded-full"
                  initial={{ 
                    opacity: 1, 
                    scale: 0,
                    x: '50%',
                    y: '50%'
                  }}
                  animate={{ 
                    opacity: 0, 
                    scale: 1.5,
                    x: `${50 + Math.cos(i * 60 * Math.PI / 180) * 100}%`,
                    y: `${50 + Math.sin(i * 60 * Math.PI / 180) * 100}%`
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.05,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
