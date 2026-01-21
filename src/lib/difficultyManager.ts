/**
 * Adaptive Difficulty Manager
 * Automatically adjusts game difficulty based on player performance
 */

import { storage } from './storage';

// ============ TYPES ============
export interface PerformanceMetrics {
  accuracy: number;
  averageTime: number;
  streak: number;
  recentScores: number[];
  totalAttempts: number;
  correctAnswers: number;
}

export interface DifficultySettings {
  level: 1 | 2 | 3 | 4 | 5;
  timeMultiplier: number;
  hintEnabled: boolean;
  questionCount: number;
  pointsMultiplier: number;
}

// ============ STORAGE KEY ============
const DIFFICULTY_KEY = 'mlp_difficulty_data';

// ============ DIFFICULTY THRESHOLDS ============
const THRESHOLDS = {
  INCREASE_ACCURACY: 85,   // Increase difficulty if accuracy > 85%
  DECREASE_ACCURACY: 50,   // Decrease difficulty if accuracy < 50%
  STREAK_BOOST: 5,         // Boost difficulty after 5 correct in a row
  CONSECUTIVE_PERFECT: 3,  // Auto-increase after 3 perfect games
};

// ============ DIFFICULTY PRESETS ============
const DIFFICULTY_PRESETS: Record<1 | 2 | 3 | 4 | 5, DifficultySettings> = {
  1: { level: 1, timeMultiplier: 1.5, hintEnabled: true, questionCount: 5, pointsMultiplier: 0.8 },
  2: { level: 2, timeMultiplier: 1.2, hintEnabled: true, questionCount: 8, pointsMultiplier: 1.0 },
  3: { level: 3, timeMultiplier: 1.0, hintEnabled: false, questionCount: 10, pointsMultiplier: 1.2 },
  4: { level: 4, timeMultiplier: 0.8, hintEnabled: false, questionCount: 12, pointsMultiplier: 1.5 },
  5: { level: 5, timeMultiplier: 0.6, hintEnabled: false, questionCount: 15, pointsMultiplier: 2.0 },
};

// ============ DIFFICULTY MANAGER CLASS ============
class DifficultyManager {
  private metrics: Record<string, PerformanceMetrics> = {};
  private subjectDifficulty: Record<string, 1 | 2 | 3 | 4 | 5> = {};

  constructor() {
    this.loadData();
  }

  // ============ PERSISTENCE ============
  private loadData(): void {
    try {
      const saved = localStorage.getItem(DIFFICULTY_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        this.metrics = data.metrics || {};
        this.subjectDifficulty = data.subjectDifficulty || {};
      }
    } catch (e) {
      console.error('Failed to load difficulty data:', e);
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem(DIFFICULTY_KEY, JSON.stringify({
        metrics: this.metrics,
        subjectDifficulty: this.subjectDifficulty,
      }));
    } catch (e) {
      console.error('Failed to save difficulty data:', e);
    }
  }

  // ============ GET METRICS ============
  private getKey(classNumber: number, subject: string): string {
    return `${classNumber}_${subject}`;
  }

  getMetrics(classNumber: number, subject: string): PerformanceMetrics {
    const key = this.getKey(classNumber, subject);
    if (!this.metrics[key]) {
      this.metrics[key] = {
        accuracy: 70,
        averageTime: 0,
        streak: 0,
        recentScores: [],
        totalAttempts: 0,
        correctAnswers: 0,
      };
    }
    return this.metrics[key];
  }

  // ============ GET DIFFICULTY ============
  getDifficulty(classNumber: number, subject: string): DifficultySettings {
    const key = this.getKey(classNumber, subject);
    const level = this.subjectDifficulty[key] || this.calculateInitialDifficulty(classNumber);
    return DIFFICULTY_PRESETS[level];
  }

  private calculateInitialDifficulty(classNumber: number): 1 | 2 | 3 | 4 | 5 {
    // Higher classes start at higher difficulty
    if (classNumber <= 3) return 1;
    if (classNumber <= 5) return 2;
    if (classNumber <= 7) return 3;
    if (classNumber <= 9) return 4;
    return 5;
  }

  // ============ UPDATE PERFORMANCE ============
  recordAttempt(
    classNumber: number,
    subject: string,
    correct: boolean,
    timeSpent: number
  ): void {
    const key = this.getKey(classNumber, subject);
    const metrics = this.getMetrics(classNumber, subject);

    metrics.totalAttempts++;
    if (correct) {
      metrics.correctAnswers++;
      metrics.streak++;
    } else {
      metrics.streak = 0;
    }

    // Update accuracy
    metrics.accuracy = (metrics.correctAnswers / metrics.totalAttempts) * 100;

    // Update average time (rolling average)
    if (metrics.averageTime === 0) {
      metrics.averageTime = timeSpent;
    } else {
      metrics.averageTime = (metrics.averageTime * 0.8) + (timeSpent * 0.2);
    }

    this.metrics[key] = metrics;
    this.saveData();
  }

  recordGameCompletion(
    classNumber: number,
    subject: string,
    score: number,
    accuracy: number,
    totalQuestions: number
  ): DifficultyAdjustment {
    const key = this.getKey(classNumber, subject);
    const metrics = this.getMetrics(classNumber, subject);

    // Add to recent scores
    metrics.recentScores.push(accuracy);
    if (metrics.recentScores.length > 10) {
      metrics.recentScores.shift();
    }

    this.metrics[key] = metrics;

    // Calculate and apply difficulty adjustment
    const adjustment = this.calculateAdjustment(classNumber, subject, accuracy);
    this.applyAdjustment(classNumber, subject, adjustment);
    
    this.saveData();
    return adjustment;
  }

  // ============ DIFFICULTY ADJUSTMENT ============
  private calculateAdjustment(
    classNumber: number,
    subject: string,
    latestAccuracy: number
  ): DifficultyAdjustment {
    const metrics = this.getMetrics(classNumber, subject);
    const recentAverage = this.getRecentAverage(metrics.recentScores);
    
    let adjustment: DifficultyAdjustment = { change: 0, reason: '' };

    // Check for consistent high performance
    if (latestAccuracy >= 100 && this.countPerfectGames(metrics.recentScores) >= THRESHOLDS.CONSECUTIVE_PERFECT) {
      adjustment = { change: 1, reason: 'Outstanding performance! 🌟' };
    }
    // Check for high streak
    else if (metrics.streak >= THRESHOLDS.STREAK_BOOST) {
      adjustment = { change: 1, reason: `Amazing ${metrics.streak} answer streak! 🔥` };
    }
    // Check recent average
    else if (recentAverage >= THRESHOLDS.INCREASE_ACCURACY) {
      adjustment = { change: 1, reason: 'Great accuracy! Increasing challenge 📈' };
    }
    else if (recentAverage < THRESHOLDS.DECREASE_ACCURACY) {
      adjustment = { change: -1, reason: 'Let\'s try easier questions 📚' };
    }

    return adjustment;
  }

  private applyAdjustment(classNumber: number, subject: string, adjustment: DifficultyAdjustment): void {
    if (adjustment.change === 0) return;

    const key = this.getKey(classNumber, subject);
    const current = this.subjectDifficulty[key] || this.calculateInitialDifficulty(classNumber);
    
    const newLevel = Math.max(1, Math.min(5, current + adjustment.change)) as 1 | 2 | 3 | 4 | 5;
    this.subjectDifficulty[key] = newLevel;
  }

  private getRecentAverage(scores: number[]): number {
    if (scores.length === 0) return 70;
    const sum = scores.reduce((a, b) => a + b, 0);
    return sum / scores.length;
  }

  private countPerfectGames(scores: number[]): number {
    let count = 0;
    for (let i = scores.length - 1; i >= 0; i--) {
      if (scores[i] === 100) count++;
      else break;
    }
    return count;
  }

  // ============ MANUAL ADJUSTMENT ============
  setDifficulty(classNumber: number, subject: string, level: 1 | 2 | 3 | 4 | 5): void {
    const key = this.getKey(classNumber, subject);
    this.subjectDifficulty[key] = level;
    this.saveData();
  }

  // ============ DIFFICULTY INFO ============
  getDifficultyLabel(level: 1 | 2 | 3 | 4 | 5): string {
    const labels = {
      1: 'Easy',
      2: 'Medium',
      3: 'Standard',
      4: 'Hard',
      5: 'Expert',
    };
    return labels[level];
  }

  getDifficultyColor(level: 1 | 2 | 3 | 4 | 5): string {
    const colors = {
      1: 'text-green-500',
      2: 'text-blue-500',
      3: 'text-yellow-500',
      4: 'text-orange-500',
      5: 'text-red-500',
    };
    return colors[level];
  }

  // ============ RESET ============
  resetProgress(classNumber?: number, subject?: string): void {
    if (classNumber && subject) {
      const key = this.getKey(classNumber, subject);
      delete this.metrics[key];
      delete this.subjectDifficulty[key];
    } else {
      this.metrics = {};
      this.subjectDifficulty = {};
    }
    this.saveData();
  }
}

// ============ TYPES ============
export interface DifficultyAdjustment {
  change: -1 | 0 | 1;
  reason: string;
}

// Export singleton instance
export const difficultyManager = new DifficultyManager();
