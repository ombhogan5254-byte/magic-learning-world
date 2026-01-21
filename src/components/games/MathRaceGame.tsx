/**
 * Math Race Game
 * Solve equations under time pressure with difficulty scaling
 * Designed for Classes 7-10
 */

import React, { useState, useEffect, useCallback } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { Trophy, X, RotateCcw, Play, Clock, Zap, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundManager } from '@/lib/soundManager';
import { motion, AnimatePresence } from 'framer-motion';

interface MathProblem {
  question: string;
  answer: number | string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface MathRaceGameProps {
  title: string;
  classNumber: number;
  problems?: MathProblem[];
  timeLimit: number;
  onComplete: (score: number, accuracy: number, timeSpent: number, problemsSolved: number) => void;
  onClose: () => void;
}

// Generate problems based on class level
const generateProblems = (classNumber: number): MathProblem[] => {
  const problems: MathProblem[] = [];
  
  if (classNumber <= 7) {
    // Class 7: Basic algebra, fractions, percentages
    problems.push(
      { question: 'Solve: 5x + 3 = 18', answer: '3', difficulty: 'easy', points: 10 },
      { question: 'Solve: 2x - 7 = 11', answer: '9', difficulty: 'easy', points: 10 },
      { question: '25% of 80 = ?', answer: '20', difficulty: 'easy', points: 10 },
      { question: '3/4 + 1/4 = ?', answer: '1', difficulty: 'easy', points: 10 },
      { question: 'Solve: 3x + 5 = 2x + 12', answer: '7', difficulty: 'medium', points: 15 },
      { question: '15% of 200 = ?', answer: '30', difficulty: 'medium', points: 15 },
      { question: 'Solve: 4(x - 2) = 12', answer: '5', difficulty: 'medium', points: 15 },
      { question: '√144 = ?', answer: '12', difficulty: 'medium', points: 15 },
      { question: 'If x² = 49, x = ? (positive)', answer: '7', difficulty: 'hard', points: 20 },
      { question: '2³ × 3² = ?', answer: '72', difficulty: 'hard', points: 20 },
    );
  } else if (classNumber === 8) {
    // Class 8: Linear equations, exponents, simple quadratics
    problems.push(
      { question: 'Solve: 7x - 4 = 3x + 8', answer: '3', difficulty: 'easy', points: 10 },
      { question: '(2³)² = ?', answer: '64', difficulty: 'easy', points: 10 },
      { question: '√196 = ?', answer: '14', difficulty: 'easy', points: 10 },
      { question: 'Simplify: x² × x³', answer: 'x^5', difficulty: 'medium', points: 15 },
      { question: 'If 2x + 3y = 12 and x = 3, find y', answer: '2', difficulty: 'medium', points: 15 },
      { question: '(-3)² + 4² = ?', answer: '25', difficulty: 'medium', points: 15 },
      { question: 'Solve: x²/4 = 9', answer: '6', difficulty: 'hard', points: 20 },
      { question: '5! ÷ 4! = ?', answer: '5', difficulty: 'hard', points: 20 },
      { question: 'Sum of angles in hexagon = ?', answer: '720', difficulty: 'hard', points: 20 },
      { question: 'LCM of 12 and 18 = ?', answer: '36', difficulty: 'hard', points: 20 },
    );
  } else if (classNumber === 9) {
    // Class 9: Quadratics, trigonometry basics, coordinate geometry
    problems.push(
      { question: 'Solve: x² - 9 = 0 (positive root)', answer: '3', difficulty: 'easy', points: 10 },
      { question: 'sin 30° = ? (as fraction)', answer: '1/2', difficulty: 'easy', points: 10 },
      { question: 'cos 60° = ? (as fraction)', answer: '1/2', difficulty: 'easy', points: 10 },
      { question: 'tan 45° = ?', answer: '1', difficulty: 'medium', points: 15 },
      { question: 'Distance: (0,0) to (3,4) = ?', answer: '5', difficulty: 'medium', points: 15 },
      { question: '(x+3)(x-3) = ?', answer: 'x^2-9', difficulty: 'medium', points: 15 },
      { question: 'log₁₀(100) = ?', answer: '2', difficulty: 'hard', points: 20 },
      { question: 'If sin θ = 0.5, θ = ? (in degrees)', answer: '30', difficulty: 'hard', points: 20 },
      { question: 'Discriminant of x²-5x+6: b²-4ac = ?', answer: '1', difficulty: 'hard', points: 20 },
      { question: '∑(1 to 5) = ?', answer: '15', difficulty: 'hard', points: 20 },
    );
  } else {
    // Class 10: Advanced quadratics, trigonometry, statistics
    problems.push(
      { question: 'Roots sum of x²-7x+12=0?', answer: '7', difficulty: 'easy', points: 10 },
      { question: 'sin²30° + cos²30° = ?', answer: '1', difficulty: 'easy', points: 10 },
      { question: 'AP: 2,5,8,11... 10th term?', answer: '29', difficulty: 'medium', points: 15 },
      { question: 'tan 60° = ? (as √)', answer: 'sqrt3', difficulty: 'medium', points: 15 },
      { question: 'Median of 2,4,6,8,10?', answer: '6', difficulty: 'medium', points: 15 },
      { question: 'CSA of cone: πrl. If r=3,l=5, CSA=?', answer: '15pi', difficulty: 'hard', points: 20 },
      { question: 'GP: 2,6,18... sum of 4 terms?', answer: '80', difficulty: 'hard', points: 20 },
      { question: 'P(A∪B) if P(A)=0.3, P(B)=0.4, P(A∩B)=0.1?', answer: '0.6', difficulty: 'hard', points: 20 },
      { question: 'Quadratic formula: x = (-b±√(b²-4ac))/2a. For x²-4x+3=0, b²-4ac=?', answer: '4', difficulty: 'hard', points: 20 },
      { question: 'Volume of sphere with r=3: (4/3)πr³ = ?π', answer: '36', difficulty: 'hard', points: 20 },
    );
  }
  
  return problems.sort(() => Math.random() - 0.5);
};

export const MathRaceGame: React.FC<MathRaceGameProps> = ({
  title,
  classNumber,
  problems,
  timeLimit,
  onComplete,
  onClose,
}) => {
  const gameProblems = problems && problems.length > 0 ? problems : generateProblems(classNumber);
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean } | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const currentProblem = gameProblems[currentProblemIndex];

  const startGame = () => {
    soundManager.playClick();
    setGameState('playing');
    setCurrentProblemIndex(0);
    setUserAnswer('');
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setTimeLeft(timeLimit);
    setStartTime(Date.now());
    setDifficulty('easy');
  };

  const finishGame = useCallback(() => {
    setGameState('completed');
    soundManager.playComplete();
    
    const timeSpent = (Date.now() - startTime) / 1000;
    const totalAttempted = currentProblemIndex + 1;
    const accuracy = totalAttempted > 0 ? (correctCount / totalAttempted) * 100 : 0;
    
    onComplete(score, accuracy, timeSpent, correctCount);
  }, [score, correctCount, currentProblemIndex, startTime, onComplete]);

  // Timer - use ref to avoid stale closure
  const finishGameRef = React.useRef(finishGame);
  finishGameRef.current = finishGame;

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGameRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || feedback?.show) return;

    const normalizedAnswer = userAnswer.toLowerCase().replace(/\s/g, '');
    const correctAnswer = String(currentProblem.answer).toLowerCase().replace(/\s/g, '');
    
    const isCorrect = normalizedAnswer === correctAnswer;
    
    if (isCorrect) {
      soundManager.playCorrect();
      const streakBonus = streak >= 3 ? 5 : 0;
      setScore(prev => prev + currentProblem.points + streakBonus);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      
      // Increase difficulty after 3 correct in a row
      if (streak >= 2 && difficulty !== 'hard') {
        setDifficulty(difficulty === 'easy' ? 'medium' : 'hard');
      }
    } else {
      soundManager.playWrong();
      setStreak(0);
      if (difficulty !== 'easy') {
        setDifficulty(difficulty === 'hard' ? 'medium' : 'easy');
      }
    }

    setFeedback({ show: true, correct: isCorrect });

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      
      if (currentProblemIndex < gameProblems.length - 1) {
        setCurrentProblemIndex(prev => prev + 1);
      } else {
        finishGame();
      }
    }, 800);
  };

  const handleSkip = () => {
    soundManager.playClick();
    setStreak(0);
    setUserAnswer('');
    
    if (currentProblemIndex < gameProblems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
    } else {
      finishGame();
    }
  };

  // Idle screen
  if (gameState === 'idle') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center" tilt={false}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-3xl">
            🏎️
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">
            Race against time! Solve math problems as fast as you can. Streak bonuses for consecutive correct answers!
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            <div className="glass-card p-4">
              <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
              <div className="text-lg font-bold text-foreground">{Math.floor(timeLimit / 60)}:{String(timeLimit % 60).padStart(2, '0')}</div>
              <div className="text-xs text-muted-foreground">Time Limit</div>
            </div>
            <div className="glass-card p-4">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-primary" />
              <div className="text-lg font-bold text-foreground">{gameProblems.length}</div>
              <div className="text-xs text-muted-foreground">Problems</div>
            </div>
            <div className="glass-card p-4">
              <Zap className="w-5 h-5 mx-auto mb-1 text-amber-500" />
              <div className="text-lg font-bold text-foreground">Class {classNumber}</div>
              <div className="text-xs text-muted-foreground">Level</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Cancel</MagicButton>
            <MagicButton onClick={startGame} icon={<Play className="w-4 h-4" />}>
              Start Race!
            </MagicButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Completed screen
  if (gameState === 'completed') {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const accuracy = currentProblemIndex > 0 ? Math.round((correctCount / (currentProblemIndex + 1)) * 100) : 0;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center animate-scale-in" tilt={false}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {accuracy >= 80 ? '🏆 Champion!' : accuracy >= 60 ? '🥈 Great Run!' : '🏁 Race Complete!'}
          </h2>
          
          <div className="grid grid-cols-2 gap-3 my-6">
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{score}</div>
              <div className="text-xs text-muted-foreground">Total Score</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-emerald-500">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{correctCount}/{currentProblemIndex + 1}</div>
              <div className="text-xs text-muted-foreground">Solved</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-primary">{timeSpent}s</div>
              <div className="text-xs text-muted-foreground">Time Used</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Done</MagicButton>
            <MagicButton onClick={startGame} icon={<RotateCcw className="w-4 h-4" />}>
              Race Again
            </MagicButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Playing screen
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="glass-card-strong p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MagicButton variant="glass" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </MagicButton>
          <div>
            <h3 className="font-bold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">
              Problem {currentProblemIndex + 1} of {gameProblems.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={cn(
            'px-3 py-1 rounded-full text-sm font-bold',
            difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-500' :
            difficulty === 'medium' ? 'bg-amber-500/20 text-amber-500' :
            'bg-red-500/20 text-red-500'
          )}>
            {difficulty.toUpperCase()}
          </div>
          
          <div className={cn(
            'px-4 py-2 rounded-full text-lg font-bold flex items-center gap-1',
            timeLeft <= 30 ? 'bg-destructive/20 text-destructive animate-pulse' : 'bg-primary/20 text-primary'
          )}>
            <Clock className="w-4 h-4" />
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
          
          {streak >= 2 && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-sm font-bold animate-bounce-soft">
              <Zap className="w-4 h-4" />
              {streak}🔥
            </div>
          )}
          
          <div className="text-lg font-bold text-foreground">{score} pts</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div 
          className="h-full bg-magic-gradient transition-all duration-300"
          style={{ width: `${((currentProblemIndex) / gameProblems.length) * 100}%` }}
        />
      </div>

      {/* Game content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProblemIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg"
          >
            {/* Problem */}
            <GlassCard 
              className={cn(
                'p-8 mb-8 text-center transition-all duration-300',
                feedback?.correct === true && 'ring-2 ring-emerald-500 bg-emerald-500/10',
                feedback?.correct === false && 'ring-2 ring-destructive bg-destructive/10 animate-shake'
              )} 
              tilt={false}
            >
              <div className={cn(
                'text-xs font-semibold mb-4 px-3 py-1 rounded-full inline-block',
                currentProblem.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-500' :
                currentProblem.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-500' :
                'bg-red-500/20 text-red-500'
              )}>
                {currentProblem.points} points
              </div>
              
              <p className="text-3xl font-bold text-foreground leading-relaxed font-mono">
                {currentProblem.question}
              </p>
            </GlassCard>

            {/* Answer input */}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer..."
                className="flex-1 px-6 py-4 text-xl font-mono text-center rounded-2xl bg-card border-2 border-border text-foreground focus:outline-none focus:border-primary focus:shadow-glow"
                autoComplete="off"
                autoFocus
                disabled={!!feedback?.show}
              />
              <MagicButton type="submit" disabled={!userAnswer.trim() || !!feedback?.show}>
                Submit
              </MagicButton>
            </form>

            {/* Skip button */}
            <div className="text-center mt-4">
              <button
                onClick={handleSkip}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                disabled={!!feedback?.show}
              >
                Skip this problem →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
