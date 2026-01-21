/**
 * Difficulty Manager Tests
 * Tests for adaptive difficulty system
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
import { difficultyManager } from '@/lib/difficultyManager';

describe('DifficultyManager', () => {
  beforeEach(() => {
    localStorageMock.clear();
    difficultyManager.resetProgress();
  });

  describe('Initial Difficulty', () => {
    it('should return easy difficulty for class 1-3', () => {
      const settings = difficultyManager.getDifficulty(2, 'math');
      expect(settings.level).toBe(1);
    });

    it('should return higher difficulty for higher classes', () => {
      const settings9 = difficultyManager.getDifficulty(9, 'math');
      expect(settings9.level).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Difficulty Settings', () => {
    it('should have correct time multiplier for easy', () => {
      const settings = difficultyManager.getDifficulty(1, 'math');
      expect(settings.timeMultiplier).toBe(1.5);
      expect(settings.hintEnabled).toBe(true);
    });

    it('should have hints disabled for hard difficulty', () => {
      difficultyManager.setDifficulty(5, 'math', 4);
      const settings = difficultyManager.getDifficulty(5, 'math');
      expect(settings.hintEnabled).toBe(false);
    });
  });

  describe('Performance Tracking', () => {
    it('should record attempts correctly', () => {
      difficultyManager.recordAttempt(5, 'math', true, 5);
      difficultyManager.recordAttempt(5, 'math', true, 4);
      difficultyManager.recordAttempt(5, 'math', false, 6);
      
      const metrics = difficultyManager.getMetrics(5, 'math');
      expect(metrics.totalAttempts).toBe(3);
      expect(metrics.correctAnswers).toBe(2);
    });

    it('should track streak correctly', () => {
      difficultyManager.recordAttempt(5, 'math', true, 5);
      difficultyManager.recordAttempt(5, 'math', true, 4);
      
      let metrics = difficultyManager.getMetrics(5, 'math');
      expect(metrics.streak).toBe(2);
      
      difficultyManager.recordAttempt(5, 'math', false, 6);
      metrics = difficultyManager.getMetrics(5, 'math');
      expect(metrics.streak).toBe(0);
    });
  });

  describe('Difficulty Labels', () => {
    it('should return correct labels', () => {
      expect(difficultyManager.getDifficultyLabel(1)).toBe('Easy');
      expect(difficultyManager.getDifficultyLabel(3)).toBe('Standard');
      expect(difficultyManager.getDifficultyLabel(5)).toBe('Expert');
    });
  });

  describe('Manual Adjustment', () => {
    it('should allow manual difficulty setting', () => {
      difficultyManager.setDifficulty(5, 'math', 3);
      const settings = difficultyManager.getDifficulty(5, 'math');
      expect(settings.level).toBe(3);
    });
  });
});
