/**
 * Typing Speed Challenge Game
 * Tests typing speed and accuracy
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { Trophy, X, RotateCcw, Keyboard, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundManager } from '@/lib/soundManager';

interface TypingGameProps {
  title: string;
  words: string[];
  timeLimit: number;
  onComplete: (score: number, accuracy: number, timeSpent: number, wpm: number) => void;
  onClose: () => void;
}

const WORD_LISTS = {
  easy: ['cat', 'dog', 'sun', 'run', 'fun', 'hat', 'bat', 'sit', 'hit', 'pot', 'hot', 'lot', 'got', 'not', 'cut'],
  medium: ['apple', 'happy', 'water', 'music', 'dance', 'light', 'night', 'green', 'dream', 'smile', 'brave', 'cloud', 'river', 'ocean', 'magic'],
  hard: ['adventure', 'beautiful', 'celebrate', 'dangerous', 'education', 'fantastic', 'wonderful', 'knowledge', 'important', 'technology'],
};

export const TypingGame: React.FC<TypingGameProps> = ({
  title,
  words,
  timeLimit,
  onComplete,
  onClose,
}) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [correctWords, setCorrectWords] = useState(0);
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [startTime, setStartTime] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const gameWords = words.length > 0 ? words : [...WORD_LISTS.easy, ...WORD_LISTS.medium].sort(() => Math.random() - 0.5);

  const currentWord = gameWords[currentWordIndex % gameWords.length];

  // Start game
  const startGame = () => {
    soundManager.playClick();
    setGameState('playing');
    setCurrentWordIndex(0);
    setTypedText('');
    setCorrectWords(0);
    setTotalTypedChars(0);
    setCorrectChars(0);
    setTimeLeft(timeLimit);
    setStartTime(Date.now());
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('completed');
          soundManager.playComplete();
          return 0;
        }
        if (prev <= 10) soundManager.play('countdown');
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Handle game completion
  useEffect(() => {
    if (gameState === 'completed' && timeLeft === 0) {
      const timeSpent = (Date.now() - startTime) / 1000;
      const accuracy = totalTypedChars > 0 ? (correctChars / totalTypedChars) * 100 : 0;
      const wpm = timeSpent > 0 ? Math.round((correctWords / timeSpent) * 60) : 0;
      const score = correctWords * 10 + Math.round(accuracy);
      onComplete(score, accuracy, timeSpent, wpm);
    }
  }, [gameState, timeLeft, correctWords, totalTypedChars, correctChars, startTime, onComplete]);

  const finishGame = useCallback(() => {
    setGameState('completed');
    soundManager.playComplete();
  }, []);

  // Handle typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTypedText(value);

    // Check each character
    let newCorrectChars = 0;
    for (let i = 0; i < value.length && i < currentWord.length; i++) {
      if (value[i] === currentWord[i]) {
        newCorrectChars++;
      }
    }

    // Word completed
    if (value.endsWith(' ') || value === currentWord) {
      const trimmedValue = value.trim();
      setTotalTypedChars(prev => prev + trimmedValue.length);
      setCorrectChars(prev => prev + newCorrectChars);

      if (trimmedValue === currentWord) {
        soundManager.playCorrect();
        setCorrectWords(prev => prev + 1);
      } else {
        soundManager.playWrong();
      }

      setTypedText('');
      setCurrentWordIndex(prev => prev + 1);
    }
  };

  // Render character with color
  const renderWord = () => {
    return currentWord.split('').map((char, i) => {
      let className = 'text-muted-foreground';
      if (i < typedText.length) {
        className = typedText[i] === char ? 'text-emerald-500' : 'text-destructive';
      }
      return (
        <span key={i} className={cn('text-4xl font-mono font-bold', className)}>
          {char}
        </span>
      );
    });
  };

  // Idle screen
  if (gameState === 'idle') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center" tilt={false}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Keyboard className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">
            Type the words as fast as you can! Press space after each word.
          </p>
          
          <div className="glass-card p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{timeLimit} seconds</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Cancel</MagicButton>
            <MagicButton onClick={startGame}>Start Typing!</MagicButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Completed screen
  if (gameState === 'completed') {
    const timeSpent = (Date.now() - startTime) / 1000;
    const accuracy = totalTypedChars > 0 ? Math.round((correctChars / totalTypedChars) * 100) : 0;
    const wpm = Math.round((correctWords / timeSpent) * 60);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center animate-scale-in" tilt={false}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-6">Great Job! 🎉</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-card p-4">
              <div className="text-3xl font-bold text-foreground">{correctWords}</div>
              <div className="text-xs text-muted-foreground">Words</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-bold text-primary">{wpm}</div>
              <div className="text-xs text-muted-foreground">WPM</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-bold text-emerald-500">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-bold text-foreground">{correctWords * 10}</div>
              <div className="text-xs text-muted-foreground">Score</div>
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
            <p className="text-xs text-muted-foreground">Type fast!</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={cn(
            'px-4 py-2 rounded-full text-lg font-bold',
            timeLeft <= 10 ? 'bg-destructive/20 text-destructive animate-pulse' : 'bg-primary/20 text-primary'
          )}>
            <Clock className="w-4 h-4 inline mr-2" />
            {timeLeft}s
          </div>
          <div className="text-lg font-bold text-foreground">
            {correctWords} words
          </div>
        </div>
      </div>

      {/* Game content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Next words preview */}
        <div className="flex gap-4 mb-8 text-muted-foreground">
          {[1, 2, 3].map(offset => {
            const word = gameWords[(currentWordIndex + offset) % gameWords.length];
            return (
              <span key={offset} className="text-lg opacity-50">
                {word}
              </span>
            );
          })}
        </div>

        {/* Current word */}
        <GlassCard className="p-8 mb-8" tilt={false}>
          <div className="tracking-wider">{renderWord()}</div>
        </GlassCard>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          className="w-full max-w-md px-6 py-4 text-2xl font-mono text-center rounded-2xl bg-card border-2 border-border text-foreground focus:outline-none focus:border-primary focus:shadow-glow"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Stats */}
        <div className="flex gap-8 mt-8 text-muted-foreground">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{correctWords}</div>
            <div className="text-xs">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{currentWordIndex - correctWords}</div>
            <div className="text-xs">Mistakes</div>
          </div>
        </div>
      </div>
    </div>
  );
};
