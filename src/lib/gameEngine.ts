/**
 * Magic Learning Playground - Core Game Engine
 * Handles state management, scoring, XP, timers, and rewards
 */

// ============ TYPES ============
export type GameState = 'idle' | 'rules' | 'playing' | 'paused' | 'completed' | 'failed';

export interface GameConfig {
  id: string;
  name: string;
  maxTime?: number; // seconds, 0 = no limit
  maxQuestions?: number;
  pointsPerCorrect: number;
  pointsPerWrong: number;
  xpMultiplier: number;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
}

export interface GameProgress {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeElapsed: number;
  currentQuestion: number;
  totalQuestions: number;
  streak: number;
  maxStreak: number;
}

export interface GameResult {
  score: number;
  xpEarned: number;
  stars: number; // 0-3
  accuracy: number;
  timeSpent: number;
  completed: boolean;
  passed: boolean;
}

export interface Question {
  id: string | number;
  type: 'mcq' | 'input' | 'drag-drop' | 'match' | 'sequence' | 'tap';
  question: string;
  options?: string[];
  correctAnswer: string | string[] | number;
  hint?: string;
  points?: number;
  imageUrl?: string;
  difficulty?: 1 | 2 | 3 | 4 | 5;
}

// ============ GAME ENGINE CLASS ============
export class GameEngine {
  private state: GameState = 'idle';
  private config: GameConfig;
  private progress: GameProgress;
  private timerInterval: number | null = null;
  private onStateChange?: (state: GameState) => void;
  private onProgressChange?: (progress: GameProgress) => void;
  private onTimeUpdate?: (time: number) => void;

  constructor(config: GameConfig) {
    this.config = config;
    this.progress = this.createInitialProgress();
  }

  private createInitialProgress(): GameProgress {
    return {
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      timeElapsed: 0,
      currentQuestion: 0,
      totalQuestions: this.config.maxQuestions || 10,
      streak: 0,
      maxStreak: 0,
    };
  }

  // ============ STATE MANAGEMENT ============
  getState(): GameState {
    return this.state;
  }

  setState(newState: GameState): void {
    this.state = newState;
    this.onStateChange?.(newState);
  }

  getProgress(): GameProgress {
    return { ...this.progress };
  }

  getConfig(): GameConfig {
    return { ...this.config };
  }

  // ============ LIFECYCLE ============
  showRules(): void {
    this.setState('rules');
  }

  start(): void {
    this.progress = this.createInitialProgress();
    this.setState('playing');
    this.startTimer();
  }

  pause(): void {
    if (this.state === 'playing') {
      this.setState('paused');
      this.stopTimer();
    }
  }

  resume(): void {
    if (this.state === 'paused') {
      this.setState('playing');
      this.startTimer();
    }
  }

  reset(): void {
    this.stopTimer();
    this.progress = this.createInitialProgress();
    this.setState('idle');
    this.onProgressChange?.(this.progress);
  }

  complete(): GameResult {
    this.stopTimer();
    this.setState('completed');
    return this.calculateResult();
  }

  fail(): GameResult {
    this.stopTimer();
    this.setState('failed');
    return this.calculateResult();
  }

  // ============ TIMER ============
  private startTimer(): void {
    if (this.timerInterval) return;
    
    this.timerInterval = window.setInterval(() => {
      this.progress.timeElapsed++;
      this.onTimeUpdate?.(this.progress.timeElapsed);
      
      // Check time limit
      if (this.config.maxTime && this.progress.timeElapsed >= this.config.maxTime) {
        this.complete();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getRemainingTime(): number {
    if (!this.config.maxTime) return Infinity;
    return Math.max(0, this.config.maxTime - this.progress.timeElapsed);
  }

  // ============ SCORING ============
  submitAnswer(isCorrect: boolean, bonusPoints: number = 0): { pointsEarned: number; isCorrect: boolean } {
    let pointsEarned = 0;

    if (isCorrect) {
      this.progress.correctAnswers++;
      this.progress.streak++;
      this.progress.maxStreak = Math.max(this.progress.maxStreak, this.progress.streak);
      
      // Base points + streak bonus
      pointsEarned = this.config.pointsPerCorrect + bonusPoints;
      const streakBonus = Math.min(this.progress.streak - 1, 5) * 5; // Max +25 for streak
      pointsEarned += streakBonus;
    } else {
      this.progress.wrongAnswers++;
      this.progress.streak = 0;
      pointsEarned = this.config.pointsPerWrong;
    }

    this.progress.score = Math.max(0, this.progress.score + pointsEarned);
    this.progress.currentQuestion++;
    
    this.onProgressChange?.(this.progress);

    // Check if game is complete
    if (this.config.maxQuestions && this.progress.currentQuestion >= this.config.maxQuestions) {
      this.complete();
    }

    return { pointsEarned, isCorrect };
  }

  // ============ RESULTS & XP ============
  private calculateResult(): GameResult {
    const totalAnswers = this.progress.correctAnswers + this.progress.wrongAnswers;
    const accuracy = totalAnswers > 0 ? (this.progress.correctAnswers / totalAnswers) * 100 : 0;
    
    // Calculate stars (0-3)
    let stars = 0;
    if (accuracy >= 50) stars = 1;
    if (accuracy >= 75) stars = 2;
    if (accuracy >= 90) stars = 3;
    
    // Calculate XP
    const baseXP = this.progress.score * this.config.xpMultiplier;
    const streakBonus = this.progress.maxStreak * 2;
    const accuracyBonus = Math.floor(accuracy / 10);
    const timeBonus = this.config.maxTime 
      ? Math.max(0, Math.floor((this.config.maxTime - this.progress.timeElapsed) / 10))
      : 0;
    
    const xpEarned = Math.floor(baseXP + streakBonus + accuracyBonus + timeBonus);

    return {
      score: this.progress.score,
      xpEarned,
      stars,
      accuracy,
      timeSpent: this.progress.timeElapsed,
      completed: this.state === 'completed',
      passed: accuracy >= 50,
    };
  }

  // ============ CALLBACKS ============
  onStateChangeCallback(callback: (state: GameState) => void): void {
    this.onStateChange = callback;
  }

  onProgressChangeCallback(callback: (progress: GameProgress) => void): void {
    this.onProgressChange = callback;
  }

  onTimeUpdateCallback(callback: (time: number) => void): void {
    this.onTimeUpdate = callback;
  }

  // ============ DIFFICULTY ============
  setDifficulty(level: 1 | 2 | 3 | 4 | 5): void {
    this.config.difficultyLevel = level;
    // Adjust time based on difficulty
    if (this.config.maxTime) {
      const timeMultiplier = [1.5, 1.25, 1, 0.85, 0.7][level - 1];
      this.config.maxTime = Math.floor(this.config.maxTime * timeMultiplier);
    }
  }

  // ============ CLEANUP ============
  destroy(): void {
    this.stopTimer();
    this.onStateChange = undefined;
    this.onProgressChange = undefined;
    this.onTimeUpdate = undefined;
  }
}

// ============ UTILITY FUNCTIONS ============
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count);
}

export function calculateLevel(totalXP: number): { level: number; xpForNext: number; xpInLevel: number } {
  // XP needed per level: 100, 200, 300, 400...
  let level = 1;
  let xpRemaining = totalXP;
  let xpNeeded = 100;

  while (xpRemaining >= xpNeeded) {
    xpRemaining -= xpNeeded;
    level++;
    xpNeeded = level * 100;
  }

  return {
    level,
    xpForNext: xpNeeded,
    xpInLevel: xpRemaining,
  };
}
