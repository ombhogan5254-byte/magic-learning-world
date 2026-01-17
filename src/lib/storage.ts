/**
 * LocalStorage Manager for Magic Learning Playground
 * Handles all persistence for progress, XP, achievements
 */

// ============ STORAGE KEYS ============
const STORAGE_KEYS = {
  PLAYER_PROFILE: 'mlp_player_profile',
  PROGRESS: 'mlp_progress',
  ACHIEVEMENTS: 'mlp_achievements',
  SETTINGS: 'mlp_settings',
  ANALYTICS: 'mlp_analytics',
} as const;

// ============ TYPES ============
export interface PlayerProfile {
  name: string;
  avatar: string;
  totalXP: number;
  level: number;
  createdAt: string;
  lastPlayedAt: string;
}

export interface SubjectProgress {
  subjectId: string;
  lessonsCompleted: number[];
  gamesCompleted: number[];
  quizzesCompleted: number[];
  practiceCompleted: number[];
  totalXP: number;
  accuracy: number;
  timeSpent: number; // seconds
  lastPlayedAt: string;
  highScores: Record<string, number>;
  stars: Record<string, number>; // lessonId -> stars earned
}

export interface ClassProgress {
  classNumber: number;
  subjects: Record<string, SubjectProgress>;
  overallProgress: number; // percentage
  totalXP: number;
}

export interface ProgressData {
  classes: Record<number, ClassProgress>;
  currentClass: number;
  currentSubject: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  progress: number;
  target: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  difficulty: 1 | 2 | 3 | 4 | 5;
  theme: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
}

export interface AnalyticsEntry {
  date: string;
  classNumber: number;
  subjectId: string;
  activityType: 'learn' | 'play' | 'practice' | 'quiz';
  activityId: string;
  score: number;
  xpEarned: number;
  accuracy: number;
  timeSpent: number;
  completed: boolean;
}

// ============ DEFAULT VALUES ============
const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Student',
  avatar: 'default',
  totalXP: 0,
  level: 1,
  createdAt: new Date().toISOString(),
  lastPlayedAt: new Date().toISOString(),
};

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  difficulty: 2,
  theme: 'system',
  reducedMotion: false,
};

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', unlockedAt: null, progress: 0, target: 1 },
  { id: 'streak_5', name: 'On Fire', description: 'Get 5 correct answers in a row', icon: '🔥', unlockedAt: null, progress: 0, target: 5 },
  { id: 'streak_10', name: 'Unstoppable', description: 'Get 10 correct answers in a row', icon: '⚡', unlockedAt: null, progress: 0, target: 10 },
  { id: 'perfect_score', name: 'Perfect!', description: 'Get 100% accuracy in any activity', icon: '⭐', unlockedAt: null, progress: 0, target: 1 },
  { id: 'xp_100', name: 'Rising Star', description: 'Earn 100 XP', icon: '🌟', unlockedAt: null, progress: 0, target: 100 },
  { id: 'xp_500', name: 'Knowledge Seeker', description: 'Earn 500 XP', icon: '📚', unlockedAt: null, progress: 0, target: 500 },
  { id: 'xp_1000', name: 'Scholar', description: 'Earn 1000 XP', icon: '🎓', unlockedAt: null, progress: 0, target: 1000 },
  { id: 'games_10', name: 'Game Master', description: 'Complete 10 games', icon: '🎮', unlockedAt: null, progress: 0, target: 10 },
  { id: 'quizzes_5', name: 'Quiz Whiz', description: 'Complete 5 quizzes', icon: '🧠', unlockedAt: null, progress: 0, target: 5 },
  { id: 'all_subjects', name: 'Explorer', description: 'Try all subjects in your class', icon: '🌍', unlockedAt: null, progress: 0, target: 4 },
];

// ============ STORAGE CLASS ============
class StorageManager {
  // ============ GENERIC METHODS ============
  private get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  // ============ PROFILE ============
  getProfile(): PlayerProfile {
    return this.get(STORAGE_KEYS.PLAYER_PROFILE, DEFAULT_PROFILE);
  }

  updateProfile(updates: Partial<PlayerProfile>): PlayerProfile {
    const profile = { ...this.getProfile(), ...updates, lastPlayedAt: new Date().toISOString() };
    this.set(STORAGE_KEYS.PLAYER_PROFILE, profile);
    return profile;
  }

  addXP(amount: number): { newTotal: number; levelUp: boolean; newLevel: number } {
    const profile = this.getProfile();
    const oldLevel = profile.level;
    profile.totalXP += amount;
    
    // Calculate new level
    let level = 1;
    let xpRemaining = profile.totalXP;
    let xpNeeded = 100;
    while (xpRemaining >= xpNeeded) {
      xpRemaining -= xpNeeded;
      level++;
      xpNeeded = level * 100;
    }
    
    profile.level = level;
    this.set(STORAGE_KEYS.PLAYER_PROFILE, profile);
    
    // Update XP achievements
    this.updateAchievementProgress('xp_100', profile.totalXP);
    this.updateAchievementProgress('xp_500', profile.totalXP);
    this.updateAchievementProgress('xp_1000', profile.totalXP);
    
    return { newTotal: profile.totalXP, levelUp: level > oldLevel, newLevel: level };
  }

  // ============ PROGRESS ============
  getProgress(): ProgressData {
    return this.get<ProgressData>(STORAGE_KEYS.PROGRESS, {
      classes: {},
      currentClass: 1,
      currentSubject: null,
    });
  }

  getClassProgress(classNumber: number): ClassProgress {
    const progress = this.getProgress();
    if (!progress.classes[classNumber]) {
      progress.classes[classNumber] = {
        classNumber,
        subjects: {},
        overallProgress: 0,
        totalXP: 0,
      };
      this.set(STORAGE_KEYS.PROGRESS, progress);
    }
    return progress.classes[classNumber];
  }

  getSubjectProgress(classNumber: number, subjectId: string): SubjectProgress {
    const classProgress = this.getClassProgress(classNumber);
    if (!classProgress.subjects[subjectId]) {
      classProgress.subjects[subjectId] = {
        subjectId,
        lessonsCompleted: [],
        gamesCompleted: [],
        quizzesCompleted: [],
        practiceCompleted: [],
        totalXP: 0,
        accuracy: 0,
        timeSpent: 0,
        lastPlayedAt: new Date().toISOString(),
        highScores: {},
        stars: {},
      };
      this.saveClassProgress(classNumber, classProgress);
    }
    return classProgress.subjects[subjectId];
  }

  saveClassProgress(classNumber: number, classProgress: ClassProgress): void {
    const progress = this.getProgress();
    progress.classes[classNumber] = classProgress;
    this.set(STORAGE_KEYS.PROGRESS, progress);
  }

  completeActivity(
    classNumber: number,
    subjectId: string,
    activityType: 'learn' | 'play' | 'practice' | 'quiz',
    activityId: number,
    score: number,
    xpEarned: number,
    accuracy: number,
    stars: number,
    timeSpent: number
  ): void {
    const classProgress = this.getClassProgress(classNumber);
    const subjectProgress = this.getSubjectProgress(classNumber, subjectId);

    // Add to completed list
    const completedList = {
      learn: subjectProgress.lessonsCompleted,
      play: subjectProgress.gamesCompleted,
      practice: subjectProgress.practiceCompleted,
      quiz: subjectProgress.quizzesCompleted,
    }[activityType];

    if (!completedList.includes(activityId)) {
      completedList.push(activityId);
    }

    // Update high score
    const activityKey = `${activityType}_${activityId}`;
    if (!subjectProgress.highScores[activityKey] || score > subjectProgress.highScores[activityKey]) {
      subjectProgress.highScores[activityKey] = score;
    }

    // Update stars
    if (!subjectProgress.stars[activityKey] || stars > subjectProgress.stars[activityKey]) {
      subjectProgress.stars[activityKey] = stars;
    }

    // Update totals
    subjectProgress.totalXP += xpEarned;
    subjectProgress.timeSpent += timeSpent;
    subjectProgress.lastPlayedAt = new Date().toISOString();

    // Update average accuracy
    const totalActivities = 
      subjectProgress.lessonsCompleted.length +
      subjectProgress.gamesCompleted.length +
      subjectProgress.practiceCompleted.length +
      subjectProgress.quizzesCompleted.length;
    subjectProgress.accuracy = 
      ((subjectProgress.accuracy * (totalActivities - 1)) + accuracy) / totalActivities;

    classProgress.subjects[subjectId] = subjectProgress;
    classProgress.totalXP = Object.values(classProgress.subjects)
      .reduce((sum, s) => sum + s.totalXP, 0);

    this.saveClassProgress(classNumber, classProgress);

    // Update achievements
    this.updateAchievementProgress('first_lesson', 1);
    if (activityType === 'play') {
      const totalGames = Object.values(this.getProgress().classes)
        .flatMap(c => Object.values(c.subjects))
        .reduce((sum, s) => sum + s.gamesCompleted.length, 0);
      this.updateAchievementProgress('games_10', totalGames);
    }
    if (activityType === 'quiz') {
      const totalQuizzes = Object.values(this.getProgress().classes)
        .flatMap(c => Object.values(c.subjects))
        .reduce((sum, s) => sum + s.quizzesCompleted.length, 0);
      this.updateAchievementProgress('quizzes_5', totalQuizzes);
    }
    if (accuracy === 100) {
      this.updateAchievementProgress('perfect_score', 1);
    }

    // Log analytics
    this.logActivity({
      date: new Date().toISOString(),
      classNumber,
      subjectId,
      activityType,
      activityId: String(activityId),
      score,
      xpEarned,
      accuracy,
      timeSpent,
      completed: true,
    });
  }

  isActivityCompleted(
    classNumber: number,
    subjectId: string,
    activityType: 'learn' | 'play' | 'practice' | 'quiz',
    activityId: number
  ): boolean {
    const subjectProgress = this.getSubjectProgress(classNumber, subjectId);
    const completedList = {
      learn: subjectProgress.lessonsCompleted,
      play: subjectProgress.gamesCompleted,
      practice: subjectProgress.practiceCompleted,
      quiz: subjectProgress.quizzesCompleted,
    }[activityType];
    return completedList.includes(activityId);
  }

  getActivityStars(
    classNumber: number,
    subjectId: string,
    activityType: 'learn' | 'play' | 'practice' | 'quiz',
    activityId: number
  ): number {
    const subjectProgress = this.getSubjectProgress(classNumber, subjectId);
    return subjectProgress.stars[`${activityType}_${activityId}`] || 0;
  }

  // ============ ACHIEVEMENTS ============
  getAchievements(): Achievement[] {
    return this.get(STORAGE_KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS);
  }

  updateAchievementProgress(achievementId: string, newProgress: number): Achievement | null {
    const achievements = this.getAchievements();
    const achievement = achievements.find(a => a.id === achievementId);
    
    if (achievement) {
      achievement.progress = Math.max(achievement.progress, newProgress);
      if (achievement.progress >= achievement.target && !achievement.unlockedAt) {
        achievement.unlockedAt = new Date().toISOString();
      }
      this.set(STORAGE_KEYS.ACHIEVEMENTS, achievements);
      return achievement;
    }
    return null;
  }

  updateStreakAchievement(streak: number): void {
    this.updateAchievementProgress('streak_5', streak);
    this.updateAchievementProgress('streak_10', streak);
  }

  // ============ SETTINGS ============
  getSettings(): GameSettings {
    return this.get(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  updateSettings(updates: Partial<GameSettings>): GameSettings {
    const settings = { ...this.getSettings(), ...updates };
    this.set(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  }

  // ============ ANALYTICS ============
  logActivity(entry: AnalyticsEntry): void {
    const analytics = this.get<AnalyticsEntry[]>(STORAGE_KEYS.ANALYTICS, []);
    analytics.push(entry);
    // Keep only last 100 entries
    if (analytics.length > 100) {
      analytics.shift();
    }
    this.set(STORAGE_KEYS.ANALYTICS, analytics);
  }

  getAnalytics(): AnalyticsEntry[] {
    return this.get(STORAGE_KEYS.ANALYTICS, []);
  }

  getWeeklyStats(): { dates: string[]; xp: number[]; accuracy: number[] } {
    const analytics = this.getAnalytics();
    const now = new Date();
    const dates: string[] = [];
    const xp: number[] = [];
    const accuracy: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dates.push(date.toLocaleDateString('en', { weekday: 'short' }));

      const dayEntries = analytics.filter(a => a.date.startsWith(dateStr));
      xp.push(dayEntries.reduce((sum, e) => sum + e.xpEarned, 0));
      
      const avgAccuracy = dayEntries.length > 0
        ? dayEntries.reduce((sum, e) => sum + e.accuracy, 0) / dayEntries.length
        : 0;
      accuracy.push(Math.round(avgAccuracy));
    }

    return { dates, xp, accuracy };
  }

  getStrengthsAndWeaknesses(classNumber: number): { strengths: string[]; weaknesses: string[] } {
    const classProgress = this.getClassProgress(classNumber);
    const subjects = Object.values(classProgress.subjects);
    
    const sorted = subjects
      .filter(s => s.lessonsCompleted.length + s.gamesCompleted.length + s.quizzesCompleted.length > 0)
      .sort((a, b) => b.accuracy - a.accuracy);

    return {
      strengths: sorted.slice(0, 2).map(s => s.subjectId),
      weaknesses: sorted.slice(-2).reverse().map(s => s.subjectId),
    };
  }

  // ============ RESET ============
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
}

// Export singleton instance
export const storage = new StorageManager();
