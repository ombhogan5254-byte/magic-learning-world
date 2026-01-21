/**
 * Word Builder / Spelling Game
 * Arrange letters to form words
 */

import React, { useState, useEffect, useCallback } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { Trophy, X, RotateCcw, Trash2, Lightbulb, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundManager } from '@/lib/soundManager';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

interface WordBuilderGameProps {
  title: string;
  words: { word: string; hint: string; image?: string }[];
  onComplete: (score: number, accuracy: number, timeSpent: number) => void;
  onClose: () => void;
}

const DEFAULT_WORDS = [
  { word: 'APPLE', hint: 'A red fruit 🍎', image: '🍎' },
  { word: 'HAPPY', hint: 'Feeling of joy 😊', image: '😊' },
  { word: 'STAR', hint: 'Shines in the sky ⭐', image: '⭐' },
  { word: 'BOOK', hint: 'You read this 📚', image: '📚' },
  { word: 'CAT', hint: 'A furry pet 🐱', image: '🐱' },
  { word: 'SUN', hint: 'Gives us light ☀️', image: '☀️' },
  { word: 'TREE', hint: 'Has leaves and branches 🌳', image: '🌳' },
  { word: 'FISH', hint: 'Lives in water 🐟', image: '🐟' },
];

export const WordBuilderGame: React.FC<WordBuilderGameProps> = ({
  title,
  words,
  onComplete,
  onClose,
}) => {
  const gameWords = words.length > 0 ? words : DEFAULT_WORDS;
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<{ id: string; letter: string }[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<{ id: string; letter: string }[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean }>({ show: false, correct: false });
  const [startTime, setStartTime] = useState(0);

  const currentWord = gameWords[currentWordIndex];

  // Shuffle letters when word changes
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const letters = currentWord.word.split('').map((letter, i) => ({
      id: `${letter}-${i}-${Math.random()}`,
      letter,
    }));
    
    // Shuffle
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    
    setShuffledLetters(letters);
    setSelectedLetters([]);
    setShowHint(false);
  }, [currentWordIndex, gameState, currentWord]);

  const startGame = () => {
    soundManager.playClick();
    setGameState('playing');
    setCurrentWordIndex(0);
    setCorrectCount(0);
    setAttempts(0);
    setStartTime(Date.now());
  };

  const handleLetterClick = (letterObj: { id: string; letter: string }) => {
    soundManager.playClick();
    
    // Remove from shuffled and add to selected
    setShuffledLetters(prev => prev.filter(l => l.id !== letterObj.id));
    setSelectedLetters(prev => [...prev, letterObj]);
  };

  const handleSelectedLetterClick = (letterObj: { id: string; letter: string }) => {
    soundManager.playClick();
    
    // Remove from selected and add back to shuffled
    setSelectedLetters(prev => prev.filter(l => l.id !== letterObj.id));
    setShuffledLetters(prev => [...prev, letterObj]);
  };

  const handleClear = () => {
    soundManager.playClick();
    setShuffledLetters(prev => [...prev, ...selectedLetters].sort(() => Math.random() - 0.5));
    setSelectedLetters([]);
  };

  const handleCheck = () => {
    const formedWord = selectedLetters.map(l => l.letter).join('');
    setAttempts(prev => prev + 1);

    if (formedWord === currentWord.word) {
      soundManager.playCorrect();
      setCorrectCount(prev => prev + 1);
      setFeedback({ show: true, correct: true });

      setTimeout(() => {
        setFeedback({ show: false, correct: false });
        
        if (currentWordIndex < gameWords.length - 1) {
          setCurrentWordIndex(prev => prev + 1);
        } else {
          // Game complete
          setGameState('completed');
          soundManager.playComplete();
          const timeSpent = (Date.now() - startTime) / 1000;
          const totalAttempts = attempts + 1;
          const accuracy = totalAttempts > 0 ? ((correctCount + 1) / totalAttempts) * 100 : 100;
          onComplete((correctCount + 1) * 20, Math.min(accuracy, 100), timeSpent);
        }
      }, 1000);
    } else {
      soundManager.playWrong();
      setFeedback({ show: true, correct: false });
      
      setTimeout(() => {
        setFeedback({ show: false, correct: false });
        handleClear();
      }, 800);
    }
  };

  // Idle screen
  if (gameState === 'idle') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center" tilt={false}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-3xl">
            📝
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">
            Arrange the letters to form the correct word!
          </p>
          
          <div className="glass-card p-4 mb-6">
            <div className="text-2xl font-bold text-foreground mb-1">{gameWords.length}</div>
            <div className="text-xs text-muted-foreground">words to spell</div>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Cancel</MagicButton>
            <MagicButton onClick={startGame} icon={<Play className="w-4 h-4" />}>
              Start Game
            </MagicButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Completed screen
  if (gameState === 'completed') {
    const timeSpent = (Date.now() - startTime) / 1000;
    const accuracy = Math.round((correctCount / attempts) * 100) || 100;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center animate-scale-in" tilt={false}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">Spelling Bee! 🐝</h2>
          
          <div className="grid grid-cols-3 gap-3 my-6">
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{correctCount}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-emerald-500">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-primary">{correctCount * 20}</div>
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
            <p className="text-xs text-muted-foreground">
              Word {currentWordIndex + 1} of {gameWords.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold text-foreground">
            {correctCount * 20} pts
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div 
          className="h-full bg-magic-gradient transition-all duration-300"
          style={{ width: `${(currentWordIndex / gameWords.length) * 100}%` }}
        />
      </div>

      {/* Game content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Hint / Image */}
        <div className="text-6xl mb-4">{currentWord.image}</div>
        
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm">{showHint ? currentWord.hint : 'Show hint'}</span>
        </button>

        {/* Selected letters (answer area) */}
        <GlassCard 
          className={cn(
            'p-6 mb-8 min-h-[100px] min-w-[300px] transition-all duration-200',
            feedback.show && feedback.correct && 'ring-2 ring-emerald-500 bg-emerald-500/10',
            feedback.show && !feedback.correct && 'ring-2 ring-destructive bg-destructive/10 animate-shake'
          )} 
          tilt={false}
        >
          <div className="flex flex-wrap justify-center gap-3 min-h-[60px]">
            <AnimatePresence mode="popLayout">
              {selectedLetters.map((letterObj) => (
                <motion.button
                  key={letterObj.id}
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  onClick={() => handleSelectedLetterClick(letterObj)}
                  className="w-14 h-14 rounded-xl bg-primary text-primary-foreground text-2xl font-bold hover:bg-primary/80 transition-colors shadow-glow"
                >
                  {letterObj.letter}
                </motion.button>
              ))}
            </AnimatePresence>
            
            {selectedLetters.length === 0 && (
              <p className="text-muted-foreground text-sm self-center">
                Tap letters below to spell the word
              </p>
            )}
          </div>
        </GlassCard>

        {/* Available letters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <AnimatePresence mode="popLayout">
            {shuffledLetters.map((letterObj) => (
              <motion.button
                key={letterObj.id}
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => handleLetterClick(letterObj)}
                className="w-14 h-14 rounded-xl bg-card border-2 border-border text-foreground text-2xl font-bold hover:border-primary hover:shadow-glow transition-all"
              >
                {letterObj.letter}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <MagicButton 
            variant="glass" 
            onClick={handleClear}
            disabled={selectedLetters.length === 0}
            icon={<Trash2 className="w-4 h-4" />}
          >
            Clear
          </MagicButton>
          <MagicButton 
            onClick={handleCheck}
            disabled={selectedLetters.length !== currentWord.word.length}
          >
            Check Answer
          </MagicButton>
        </div>
      </div>
    </div>
  );
};
