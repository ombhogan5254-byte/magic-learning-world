/**
 * Achievements Page
 * Displays all achievements with progress and unlock status
 */

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { achievementManager, ACHIEVEMENTS } from '@/lib/achievementManager';
import { ArrowLeft, Trophy, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AchievementsPageProps {
  onBack: () => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onBack }) => {
  const achievements = achievementManager.getAllAchievements();
  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const totalCount = achievements.length;

  // Group by category
  const categories = {
    beginner: { title: '🌱 Getting Started', achievements: [] as typeof achievements },
    skill: { title: '⚡ Skill Badges', achievements: [] as typeof achievements },
    progress: { title: '📈 Progress Milestones', achievements: [] as typeof achievements },
    variety: { title: '🌍 Explorer', achievements: [] as typeof achievements },
  };

  achievements.forEach(ach => {
    const def = ACHIEVEMENTS[ach.id as keyof typeof ACHIEVEMENTS];
    const category = def?.category || 'progress';
    categories[category as keyof typeof categories]?.achievements.push(ach);
  });

  return (
    <section className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <MagicButton variant="glass" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </MagicButton>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-500" />
              Achievements
            </h1>
            <p className="text-muted-foreground">
              {unlockedCount} of {totalCount} unlocked
            </p>
          </div>
        </div>

        {/* Progress overview */}
        <GlassCard className="p-6 mb-8" tilt={false}>
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  className="fill-none stroke-muted"
                  strokeWidth="8"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  className="fill-none stroke-amber-500"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * unlockedCount / totalCount)}
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">
                  {Math.round((unlockedCount / totalCount) * 100)}%
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Your Progress</h3>
              <p className="text-muted-foreground">
                Keep playing to unlock more achievements!
              </p>
              <div className="flex gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-lg',
                      i < Math.ceil(unlockedCount / totalCount * 5)
                        ? 'bg-amber-500/20'
                        : 'bg-muted'
                    )}
                  >
                    ⭐
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Achievement categories */}
        {Object.entries(categories).map(([key, category]) => (
          category.achievements.length > 0 && (
            <div key={key} className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">{category.title}</h2>
              <div className="grid gap-3">
                {category.achievements.map((achievement, index) => {
                  const isUnlocked = achievement.unlockedAt !== null;
                  const progress = Math.min(achievement.progress / achievement.target * 100, 100);

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard
                        className={cn(
                          'p-4 flex items-center gap-4',
                          !isUnlocked && 'opacity-60'
                        )}
                        tilt={isUnlocked}
                      >
                        {/* Icon */}
                        <div className={cn(
                          'w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0',
                          isUnlocked
                            ? 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-glow'
                            : 'bg-muted'
                        )}>
                          {isUnlocked ? (
                            achievement.icon
                          ) : (
                            <Lock className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-foreground truncate">
                              {achievement.name}
                            </h4>
                            {isUnlocked && (
                              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {achievement.description}
                          </p>
                          
                          {/* Progress bar */}
                          {!isUnlocked && (
                            <div className="mt-2">
                              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {achievement.progress} / {achievement.target}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Unlocked badge */}
                        {isUnlocked && (
                          <div className="flex-shrink-0 text-right">
                            <div className="text-xs text-muted-foreground">Unlocked</div>
                            <div className="text-xs text-amber-500">
                              {new Date(achievement.unlockedAt!).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
};
