/**
 * Achievement System Manager
 * Handles unlocking, tracking, and displaying achievements
 */

import { storage, Achievement } from './storage';
import { soundManager } from './soundManager';

// Achievement definitions with icons and unlock criteria
export const ACHIEVEMENTS = {
  // Getting Started
  first_game: {
    id: 'first_game',
    name: 'First Steps',
    description: 'Play your first game',
    icon: '🎯',
    target: 1,
    category: 'beginner',
  },
  first_win: {
    id: 'first_win',
    name: 'Winner!',
    description: 'Win your first game with 50%+ accuracy',
    icon: '🏆',
    target: 1,
    category: 'beginner',
  },
  
  // Accuracy achievements
  perfect_score: {
    id: 'perfect_score',
    name: 'Perfect!',
    description: 'Get 100% accuracy in any game',
    icon: '⭐',
    target: 1,
    category: 'skill',
  },
  perfect_5: {
    id: 'perfect_5',
    name: 'Perfectionist',
    description: 'Get 5 perfect scores',
    icon: '💫',
    target: 5,
    category: 'skill',
  },
  
  // Streak achievements
  streak_5: {
    id: 'streak_5',
    name: 'On Fire',
    description: 'Get 5 correct answers in a row',
    icon: '🔥',
    target: 5,
    category: 'skill',
  },
  streak_10: {
    id: 'streak_10',
    name: 'Unstoppable',
    description: 'Get 10 correct answers in a row',
    icon: '⚡',
    target: 10,
    category: 'skill',
  },
  streak_20: {
    id: 'streak_20',
    name: 'Legendary',
    description: 'Get 20 correct answers in a row',
    icon: '👑',
    target: 20,
    category: 'skill',
  },
  
  // XP achievements
  xp_100: {
    id: 'xp_100',
    name: 'Rising Star',
    description: 'Earn 100 XP',
    icon: '🌟',
    target: 100,
    category: 'progress',
  },
  xp_500: {
    id: 'xp_500',
    name: 'Knowledge Seeker',
    description: 'Earn 500 XP',
    icon: '📚',
    target: 500,
    category: 'progress',
  },
  xp_1000: {
    id: 'xp_1000',
    name: 'Scholar',
    description: 'Earn 1000 XP',
    icon: '🎓',
    target: 1000,
    category: 'progress',
  },
  xp_5000: {
    id: 'xp_5000',
    name: 'Genius',
    description: 'Earn 5000 XP',
    icon: '🧠',
    target: 5000,
    category: 'progress',
  },
  
  // Games completed
  games_5: {
    id: 'games_5',
    name: 'Gamer',
    description: 'Complete 5 games',
    icon: '🎮',
    target: 5,
    category: 'progress',
  },
  games_10: {
    id: 'games_10',
    name: 'Game Master',
    description: 'Complete 10 games',
    icon: '🕹️',
    target: 10,
    category: 'progress',
  },
  games_25: {
    id: 'games_25',
    name: 'Champion',
    description: 'Complete 25 games',
    icon: '🏅',
    target: 25,
    category: 'progress',
  },
  games_50: {
    id: 'games_50',
    name: 'Legend',
    description: 'Complete 50 games',
    icon: '🌈',
    target: 50,
    category: 'progress',
  },
  
  // Correct answers
  correct_10: {
    id: 'correct_10',
    name: 'Quick Learner',
    description: 'Get 10 correct answers',
    icon: '✅',
    target: 10,
    category: 'progress',
  },
  correct_50: {
    id: 'correct_50',
    name: 'Smart Cookie',
    description: 'Get 50 correct answers',
    icon: '🍪',
    target: 50,
    category: 'progress',
  },
  correct_100: {
    id: 'correct_100',
    name: 'Brain Power',
    description: 'Get 100 correct answers',
    icon: '💪',
    target: 100,
    category: 'progress',
  },
  
  // Speed achievements
  speed_demon: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a game in under 30 seconds',
    icon: '⚡',
    target: 1,
    category: 'skill',
  },
  
  // Subject variety
  explorer: {
    id: 'explorer',
    name: 'Explorer',
    description: 'Try games in 3 different subjects',
    icon: '🌍',
    target: 3,
    category: 'variety',
  },
  all_rounder: {
    id: 'all_rounder',
    name: 'All-Rounder',
    description: 'Play games in all subjects',
    icon: '🎭',
    target: 5,
    category: 'variety',
  },
} as const;

type AchievementId = keyof typeof ACHIEVEMENTS;

interface AchievementUnlock {
  achievement: Achievement;
  isNew: boolean;
}

class AchievementManager {
  private pendingUnlocks: Achievement[] = [];
  private listeners: Set<(achievement: Achievement) => void> = new Set();

  // Subscribe to achievement unlocks
  onUnlock(callback: (achievement: Achievement) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyUnlock(achievement: Achievement): void {
    soundManager.playAchievement();
    this.listeners.forEach(listener => listener(achievement));
  }

  // Check and update achievement progress
  updateProgress(achievementId: AchievementId, newProgress: number): AchievementUnlock | null {
    const achievementDef = ACHIEVEMENTS[achievementId];
    if (!achievementDef) return null;

    const achievements = storage.getAchievements();
    let achievement = achievements.find(a => a.id === achievementId);

    // Create if doesn't exist
    if (!achievement) {
      achievement = {
        id: achievementId,
        name: achievementDef.name,
        description: achievementDef.description,
        icon: achievementDef.icon,
        unlockedAt: null,
        progress: 0,
        target: achievementDef.target,
      };
    }

    const wasUnlocked = achievement.unlockedAt !== null;
    
    // Update progress
    achievement.progress = Math.max(achievement.progress, newProgress);
    
    // Check if just unlocked
    if (achievement.progress >= achievement.target && !wasUnlocked) {
      achievement.unlockedAt = new Date().toISOString();
      storage.updateAchievementProgress(achievementId, newProgress);
      this.notifyUnlock(achievement);
      return { achievement, isNew: true };
    }

    storage.updateAchievementProgress(achievementId, newProgress);
    return { achievement, isNew: false };
  }

  // Increment-based progress update
  incrementProgress(achievementId: AchievementId, amount: number = 1): AchievementUnlock | null {
    const achievements = storage.getAchievements();
    const current = achievements.find(a => a.id === achievementId);
    const currentProgress = current?.progress || 0;
    return this.updateProgress(achievementId, currentProgress + amount);
  }

  // Check multiple achievements at once after game completion
  checkGameCompletion(result: {
    accuracy: number;
    timeSpent: number;
    correctAnswers: number;
    totalXP: number;
    streak: number;
    gamesCompleted: number;
    subjectsPlayed: string[];
  }): Achievement[] {
    const unlocked: Achievement[] = [];

    // First game
    const firstGame = this.updateProgress('first_game', 1);
    if (firstGame?.isNew) unlocked.push(firstGame.achievement);

    // First win
    if (result.accuracy >= 50) {
      const firstWin = this.updateProgress('first_win', 1);
      if (firstWin?.isNew) unlocked.push(firstWin.achievement);
    }

    // Perfect score
    if (result.accuracy === 100) {
      const perfect = this.incrementProgress('perfect_score');
      if (perfect?.isNew) unlocked.push(perfect.achievement);
      
      const perfect5 = this.incrementProgress('perfect_5');
      if (perfect5?.isNew) unlocked.push(perfect5.achievement);
    }

    // Streak achievements
    if (result.streak >= 5) {
      const streak5 = this.updateProgress('streak_5', result.streak);
      if (streak5?.isNew) unlocked.push(streak5.achievement);
    }
    if (result.streak >= 10) {
      const streak10 = this.updateProgress('streak_10', result.streak);
      if (streak10?.isNew) unlocked.push(streak10.achievement);
    }
    if (result.streak >= 20) {
      const streak20 = this.updateProgress('streak_20', result.streak);
      if (streak20?.isNew) unlocked.push(streak20.achievement);
    }

    // XP achievements
    const xp100 = this.updateProgress('xp_100', result.totalXP);
    if (xp100?.isNew) unlocked.push(xp100.achievement);
    
    const xp500 = this.updateProgress('xp_500', result.totalXP);
    if (xp500?.isNew) unlocked.push(xp500.achievement);
    
    const xp1000 = this.updateProgress('xp_1000', result.totalXP);
    if (xp1000?.isNew) unlocked.push(xp1000.achievement);
    
    const xp5000 = this.updateProgress('xp_5000', result.totalXP);
    if (xp5000?.isNew) unlocked.push(xp5000.achievement);

    // Games completed
    const games5 = this.updateProgress('games_5', result.gamesCompleted);
    if (games5?.isNew) unlocked.push(games5.achievement);
    
    const games10 = this.updateProgress('games_10', result.gamesCompleted);
    if (games10?.isNew) unlocked.push(games10.achievement);
    
    const games25 = this.updateProgress('games_25', result.gamesCompleted);
    if (games25?.isNew) unlocked.push(games25.achievement);
    
    const games50 = this.updateProgress('games_50', result.gamesCompleted);
    if (games50?.isNew) unlocked.push(games50.achievement);

    // Correct answers
    const correct10 = this.updateProgress('correct_10', result.correctAnswers);
    if (correct10?.isNew) unlocked.push(correct10.achievement);
    
    const correct50 = this.updateProgress('correct_50', result.correctAnswers);
    if (correct50?.isNew) unlocked.push(correct50.achievement);
    
    const correct100 = this.updateProgress('correct_100', result.correctAnswers);
    if (correct100?.isNew) unlocked.push(correct100.achievement);

    // Speed demon
    if (result.timeSpent < 30 && result.accuracy >= 70) {
      const speed = this.updateProgress('speed_demon', 1);
      if (speed?.isNew) unlocked.push(speed.achievement);
    }

    // Subject variety
    const explorer = this.updateProgress('explorer', result.subjectsPlayed.length);
    if (explorer?.isNew) unlocked.push(explorer.achievement);
    
    const allRounder = this.updateProgress('all_rounder', result.subjectsPlayed.length);
    if (allRounder?.isNew) unlocked.push(allRounder.achievement);

    return unlocked;
  }

  // Get all achievements with current progress
  getAllAchievements(): Achievement[] {
    const stored = storage.getAchievements();
    const allAchievements: Achievement[] = [];

    // Merge stored with definitions
    Object.values(ACHIEVEMENTS).forEach(def => {
      const stored_ach = stored.find(a => a.id === def.id);
      allAchievements.push({
        id: def.id,
        name: def.name,
        description: def.description,
        icon: def.icon,
        unlockedAt: stored_ach?.unlockedAt || null,
        progress: stored_ach?.progress || 0,
        target: def.target,
      });
    });

    return allAchievements;
  }

  // Get unlocked achievements count
  getUnlockedCount(): number {
    return this.getAllAchievements().filter(a => a.unlockedAt !== null).length;
  }

  // Get total achievements count
  getTotalCount(): number {
    return Object.keys(ACHIEVEMENTS).length;
  }
}

// Export singleton
export const achievementManager = new AchievementManager();
