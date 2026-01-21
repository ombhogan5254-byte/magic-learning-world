/**
 * True/False Quiz Game
 * Fast-paced true or false questions
 */

import React, { useState, useEffect, useCallback } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { Trophy, X, RotateCcw, Check, XIcon, Clock, Play, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundManager } from '@/lib/soundManager';
import { motion, AnimatePresence } from 'framer-motion';

interface TrueFalseQuestion {
  statement: string;
  isTrue: boolean;
  explanation?: string;
}

interface TrueFalseGameProps {
  title: string;
  questions: TrueFalseQuestion[];
  timePerQuestion?: number;
  onComplete: (score: number, accuracy: number, timeSpent: number) => void;
  onClose: () => void;
}

const DEFAULT_QUESTIONS: TrueFalseQuestion[] = [
  { statement: 'The Sun is a star', isTrue: true, explanation: 'The Sun is the star at the center of our Solar System.' },
  { statement: 'Water boils at 50°C', isTrue: false, explanation: 'Water boils at 100°C at sea level.' },
  { statement: 'Humans have 206 bones', isTrue: true, explanation: 'Adult humans have 206 bones.' },
  { statement: 'The Earth is flat', isTrue: false, explanation: 'The Earth is roughly spherical.' },
  { statement: 'Dolphins are mammals', isTrue: true, explanation: 'Dolphins breathe air and nurse their young.' },
  { statement: 'Light travels faster than sound', isTrue: true, explanation: 'Light travels at ~300,000 km/s, sound at ~343 m/s.' },
  { statement: 'Plants produce oxygen', isTrue: true, explanation: 'Plants produce oxygen through photosynthesis.' },
  { statement: 'The Moon has its own light', isTrue: false, explanation: 'The Moon reflects sunlight.' },
  { statement: 'Spiders have 8 legs', isTrue: true, explanation: 'All spiders are arachnids with 8 legs.' },
  { statement: 'Gold is a liquid at room temperature', isTrue: false, explanation: 'Gold is solid at room temperature. Mercury is liquid.' },
];

export const TrueFalseGame: React.FC<TrueFalseGameProps> = ({
  title,
  questions,
  timePerQuestion = 10,
  onComplete,
  onClose,
}) => {
  const gameQuestions = questions.length > 0 ? questions : DEFAULT_QUESTIONS;
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'feedback' | 'completed'>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);
  const [startTime, setStartTime] = useState(0);

  const currentQuestion = gameQuestions[currentQuestionIndex];

  const startGame = () => {
    soundManager.playClick();
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(timePerQuestion);
    setStartTime(Date.now());
  };

  const handleAnswer = useCallback((answer: boolean | null) => {
    setGameState('feedback');
    
    const isCorrect = answer === currentQuestion.isTrue;
    
    if (isCorrect) {
      soundManager.playCorrect();
      const timeBonus = Math.floor(timeLeft / 2);
      const streakBonus = streak >= 3 ? 5 : 0;
      setScore(prev => prev + 10 + timeBonus + streakBonus);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(max => Math.max(max, newStreak));
        return newStreak;
      });
    } else {
      soundManager.playWrong();
      setStreak(0);
    }

    setFeedback({
      correct: isCorrect,
      explanation: currentQuestion.explanation || '',
    });

    // Move to next question after delay
    setTimeout(() => {
      setFeedback(null);
      
      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeLeft(timePerQuestion);
        setGameState('playing');
      } else {
        setGameState('completed');
        soundManager.playComplete();
        const timeSpent = (Date.now() - startTime) / 1000;
        const accuracy = ((correctCount + (isCorrect ? 1 : 0)) / gameQuestions.length) * 100;
        onComplete(score + (isCorrect ? 10 : 0), accuracy, timeSpent);
      }
    }, 1500);
  }, [currentQuestion, currentQuestionIndex, gameQuestions.length, score, streak, timeLeft, correctCount, startTime, onComplete, timePerQuestion]);

  // Timer - use ref to avoid stale closure
  const handleAnswerRef = React.useRef(handleAnswer);
  handleAnswerRef.current = handleAnswer;

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswerRef.current(null); // Time out
          return timePerQuestion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentQuestionIndex, timePerQuestion]);

  // Idle screen
  if (gameState === 'idle') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center" tilt={false}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">
            Is the statement TRUE or FALSE? Answer quickly for bonus points!
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{gameQuestions.length}</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{timePerQuestion}s</div>
              <div className="text-xs text-muted-foreground">Per Question</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Cancel</MagicButton>
            <MagicButton onClick={startGame} icon={<Play className="w-4 h-4" />}>
              Start Quiz
            </MagicButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Completed screen
  if (gameState === 'completed') {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const accuracy = Math.round((correctCount / gameQuestions.length) * 100);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center animate-scale-in" tilt={false}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {accuracy >= 80 ? 'Amazing! 🌟' : accuracy >= 60 ? 'Good Job! 👍' : 'Keep Learning! 📚'}
          </h2>
          
          <div className="grid grid-cols-2 gap-3 my-6">
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{score}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-emerald-500">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{correctCount}/{gameQuestions.length}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-amber-500">{maxStreak}🔥</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Done</MagicButton>
            <MagicButton onClick={startGame} icon={<RotateCcw className="w-4 h-4" />}>
              Play Again
            </MagicButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Playing / Feedback screen
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
              Question {currentQuestionIndex + 1} of {gameQuestions.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={cn(
            'px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1',
            timeLeft <= 3 ? 'bg-destructive/20 text-destructive animate-pulse' : 'bg-primary/20 text-primary'
          )}>
            <Clock className="w-4 h-4" />
            {timeLeft}s
          </div>
          
          {streak >= 3 && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-sm font-bold">
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
          style={{ width: `${((currentQuestionIndex) / gameQuestions.length) * 100}%` }}
        />
      </div>

      {/* Timer bar */}
      <div className="h-1 bg-muted">
        <motion.div 
          className={cn(
            'h-full transition-colors',
            timeLeft <= 3 ? 'bg-destructive' : 'bg-primary'
          )}
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / timePerQuestion) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>

      {/* Game content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl"
          >
            {/* Question */}
            <GlassCard 
              className={cn(
                'p-8 mb-8 text-center transition-all duration-300',
                feedback?.correct === true && 'ring-2 ring-emerald-500 bg-emerald-500/10',
                feedback?.correct === false && 'ring-2 ring-destructive bg-destructive/10'
              )} 
              tilt={false}
            >
              <p className="text-2xl font-bold text-foreground leading-relaxed">
                "{currentQuestion.statement}"
              </p>
              
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-muted-foreground"
                >
                  {feedback.explanation}
                </motion.div>
              )}
            </GlassCard>

            {/* Answer buttons */}
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(true)}
                disabled={gameState === 'feedback'}
                className={cn(
                  'flex-1 max-w-[200px] p-6 rounded-2xl font-bold text-xl transition-all',
                  'bg-emerald-500 text-white hover:bg-emerald-600',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'flex items-center justify-center gap-3'
                )}
              >
                <Check className="w-8 h-8" />
                TRUE
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(false)}
                disabled={gameState === 'feedback'}
                className={cn(
                  'flex-1 max-w-[200px] p-6 rounded-2xl font-bold text-xl transition-all',
                  'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'flex items-center justify-center gap-3'
                )}
              >
                <XIcon className="w-8 h-8" />
                FALSE
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
