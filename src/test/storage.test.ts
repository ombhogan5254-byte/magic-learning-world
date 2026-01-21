/**
 * Storage Manager Tests
 * Tests for persistence, XP, achievements, and progress tracking
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Import after mocking
import { storage } from '@/lib/storage';

describe('StorageManager', () => {
  beforeEach(() => {
    localStorageMock.clear();
    // Clear the storage singleton's cached state by clearing localStorage
    storage.clearAll();
  });

  describe('Profile', () => {
    it('should return default profile when no profile exists', () => {
      const profile = storage.getProfile();
      expect(profile.name).toBe('Student');
      expect(profile.totalXP).toBe(0);
      expect(profile.level).toBe(1);
    });

    it('should update profile correctly', () => {
      storage.updateProfile({ name: 'Test User' });
      const profile = storage.getProfile();
      expect(profile.name).toBe('Test User');
    });

    it('should add XP and calculate level correctly', () => {
      const result = storage.addXP(150);
      expect(result.newTotal).toBe(150);
      expect(result.newLevel).toBe(2);
      expect(result.levelUp).toBe(true);
    });

    it('should accumulate XP correctly', () => {
      const before = storage.getTotalXP();
      storage.addXP(50);
      const result = storage.addXP(50);
      expect(result.newTotal).toBe(before + 100);
    });
  });

  describe('Progress', () => {
    it('should return empty progress initially', () => {
      const progress = storage.getProgress();
      expect(progress.currentClass).toBe(1);
      expect(Object.keys(progress.classes)).toHaveLength(0);
    });

    it('should create class progress when accessed', () => {
      const classProgress = storage.getClassProgress(5);
      expect(classProgress.classNumber).toBe(5);
      expect(classProgress.totalXP).toBe(0);
    });

    it('should create subject progress when accessed', () => {
      const subjectProgress = storage.getSubjectProgress(5, 'math');
      expect(subjectProgress.subjectId).toBe('math');
      expect(subjectProgress.totalXP).toBe(0);
    });

    it('should complete activity and track progress', () => {
      storage.completeActivity(5, 'math', 'play', 1, 100, 50, 85, 3, 120);
      
      const subjectProgress = storage.getSubjectProgress(5, 'math');
      expect(subjectProgress.gamesCompleted).toContain(1);
      expect(subjectProgress.totalXP).toBe(50);
    });

    it('should check if activity is completed', () => {
      storage.completeActivity(5, 'math', 'play', 1, 100, 50, 85, 3, 120);
      
      expect(storage.isActivityCompleted(5, 'math', 'play', 1)).toBe(true);
      expect(storage.isActivityCompleted(5, 'math', 'play', 2)).toBe(false);
    });
  });

  describe('Achievements', () => {
    it('should return default achievements', () => {
      const achievements = storage.getAchievements();
      expect(achievements.length).toBeGreaterThan(0);
    });

    it('should update achievement progress', () => {
      storage.updateAchievementProgress('xp_100', 100);
      const achievements = storage.getAchievements();
      const xpAchievement = achievements.find(a => a.id === 'xp_100');
      expect(xpAchievement?.progress).toBeGreaterThanOrEqual(100);
      expect(xpAchievement?.unlockedAt).not.toBeNull();
    });
  });

  describe('Settings', () => {
    it('should return default settings', () => {
      const settings = storage.getSettings();
      expect(settings.soundEnabled).toBe(true);
      expect(settings.difficulty).toBe(2);
    });

    it('should update settings', () => {
      storage.updateSettings({ soundEnabled: false });
      const settings = storage.getSettings();
      expect(settings.soundEnabled).toBe(false);
    });
  });

  describe('Helper Methods', () => {
    it('should get total XP', () => {
      const before = storage.getTotalXP();
      storage.addXP(200);
      expect(storage.getTotalXP()).toBe(before + 200);
    });

    it('should count completed activities', () => {
      storage.completeActivity(5, 'math', 'play', 1, 100, 50, 85, 3, 120);
      storage.completeActivity(5, 'math', 'quiz', 1, 80, 40, 70, 2, 90);
      expect(storage.getCompletedActivitiesCount()).toBe(2);
    });

    it('should get subjects played', () => {
      storage.completeActivity(5, 'math', 'play', 1, 100, 50, 85, 3, 120);
      storage.completeActivity(5, 'science', 'play', 1, 100, 50, 85, 3, 120);
      const subjects = storage.getSubjectsPlayed();
      expect(subjects).toContain('math');
      expect(subjects).toContain('science');
    });
  });
});
