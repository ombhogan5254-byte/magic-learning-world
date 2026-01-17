/**
 * React hook for using the Game Engine
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  GameEngine, 
  GameConfig, 
  GameState, 
  GameProgress, 
  GameResult,
  Question,
  shuffleArray 
} from '@/lib/gameEngine';
import { storage } from '@/lib/storage';

interface UseGameEngineOptions {
  classNumber: number;
  subjectId: string;
  activityType: 'learn' | 'play' | 'practice' | 'quiz';
  activityId: number;
  questions: Question[];
  config: Omit<GameConfig, 'id'>;
  onComplete?: (result: GameResult) => void;
}

export function useGameEngine(options: UseGameEngineOptions) {
  const { classNumber, subjectId, activityType, activityId, questions, config, onComplete } = options;
  
  const [gameState, setGameState] = useState<GameState>('idle');
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({ show: false, correct: false, message: '' });
  const [result, setResult] = useState<GameResult | null>(null);
  const [remainingTime, setRemainingTime] = useState(config.maxTime || 0);

  const engineRef = useRef<GameEngine | null>(null);

  // Initialize engine
  useEffect(() => {
    const fullConfig: GameConfig = {
      ...config,
      id: `${activityType}_${activityId}`,
      maxQuestions: questions.length,
    };
    
    engineRef.current = new GameEngine(fullConfig);
    
    engineRef.current.onStateChangeCallback((state) => {
      setGameState(state);
    });
    
    engineRef.current.onProgressChangeCallback((prog) => {
      setProgress({ ...prog });
    });
    
    engineRef.current.onTimeUpdateCallback((time) => {
      if (config.maxTime) {
        setRemainingTime(config.maxTime - time);
      }
    });

    return () => {
      engineRef.current?.destroy();
    };
  }, [activityType, activityId, config, questions.length]);

  // Show rules
  const showRules = useCallback(() => {
    engineRef.current?.showRules();
  }, []);

  // Start game
  const startGame = useCallback(() => {
    setShuffledQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
    setFeedback({ show: false, correct: false, message: '' });
    setResult(null);
    setRemainingTime(config.maxTime || 0);
    engineRef.current?.start();
    setProgress(engineRef.current?.getProgress() || null);
  }, [questions, config.maxTime]);

  // Pause/Resume
  const pauseGame = useCallback(() => {
    engineRef.current?.pause();
  }, []);

  const resumeGame = useCallback(() => {
    engineRef.current?.resume();
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    engineRef.current?.reset();
    setCurrentQuestionIndex(0);
    setShuffledQuestions([]);
    setFeedback({ show: false, correct: false, message: '' });
    setResult(null);
  }, []);

  // Submit answer
  const submitAnswer = useCallback((answer: string | number | string[]) => {
    if (!engineRef.current || gameState !== 'playing') return;
    
    const currentQ = shuffledQuestions[currentQuestionIndex];
    if (!currentQ) return;

    // Check if answer is correct
    let isCorrect = false;
    if (Array.isArray(currentQ.correctAnswer)) {
      if (Array.isArray(answer)) {
        isCorrect = JSON.stringify([...answer].sort()) === JSON.stringify([...currentQ.correctAnswer].sort());
      } else {
        isCorrect = currentQ.correctAnswer.includes(answer as string);
      }
    } else {
      isCorrect = String(answer).toLowerCase().trim() === String(currentQ.correctAnswer).toLowerCase().trim();
    }

    // Submit to engine
    const { pointsEarned } = engineRef.current.submitAnswer(isCorrect);

    // Update streak achievement
    if (isCorrect) {
      const newProgress = engineRef.current.getProgress();
      storage.updateStreakAchievement(newProgress.streak);
    }

    // Show feedback
    setFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect 
        ? `Correct! +${pointsEarned} points` 
        : `Oops! The answer was: ${currentQ.correctAnswer}${currentQ.hint ? ` (Hint: ${currentQ.hint})` : ''}`,
    });

    // Move to next question or complete
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: '' });
      
      const newProgress = engineRef.current?.getProgress();
      if (newProgress && newProgress.currentQuestion >= shuffledQuestions.length) {
        completeGame();
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 1500);
  }, [gameState, shuffledQuestions, currentQuestionIndex]);

  // Complete game
  const completeGame = useCallback(() => {
    if (!engineRef.current) return;
    
    const gameResult = engineRef.current.complete();
    setResult(gameResult);

    // Save to storage
    storage.completeActivity(
      classNumber,
      subjectId,
      activityType,
      activityId,
      gameResult.score,
      gameResult.xpEarned,
      gameResult.accuracy,
      gameResult.stars,
      gameResult.timeSpent
    );

    // Add XP to profile
    const xpResult = storage.addXP(gameResult.xpEarned);

    onComplete?.({
      ...gameResult,
      // @ts-ignore - extend result
      levelUp: xpResult.levelUp,
      newLevel: xpResult.newLevel,
    });
  }, [classNumber, subjectId, activityType, activityId, onComplete]);

  // Get current question
  const currentQuestion = shuffledQuestions[currentQuestionIndex] || null;

  return {
    // State
    gameState,
    progress,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: shuffledQuestions.length,
    feedback,
    result,
    remainingTime,

    // Actions
    showRules,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    submitAnswer,
  };
}
