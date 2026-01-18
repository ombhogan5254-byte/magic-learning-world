/**
 * Memory Grid Game for Class 7-8
 * Card flip matching game with animations
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { cn } from '@/lib/utils';
import { Clock, RotateCcw, Trophy, Sparkles, X } from 'lucide-react';
import { formatTime } from '@/lib/gameEngine';

export interface MemoryCard {
  id: string;
  pairId: string;
  content: string;
  type: 'emoji' | 'text' | 'formula';
}

export interface MemoryGridGameProps {
  title: string;
  cards: MemoryCard[];
  timeLimit?: number;
  onComplete: (score: number, accuracy: number, timeSpent: number) => void;
  onClose: () => void;
}

interface CardState {
  id: string;
  card: MemoryCard;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGridGame: React.FC<MemoryGridGameProps> = ({
  title,
  cards,
  timeLimit = 120,
  onComplete,
  onClose,
}) => {
  const [gameCards, setGameCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Initialize game
  useEffect(() => {
    initializeGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cards]);

  const initializeGame = useCallback(() => {
    // Create pairs and shuffle
    const cardStates: CardState[] = cards.map(card => ({
      id: card.id,
      card,
      isFlipped: false,
      isMatched: false,
    }));
    
    // Shuffle cards
    const shuffled = [...cardStates].sort(() => Math.random() - 0.5);
    setGameCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setScore(0);
    setTimeElapsed(0);
    setIsComplete(false);
    setCombo(0);
    startTimeRef.current = Date.now();

    // Start timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, [cards]);

  // Check for time limit
  useEffect(() => {
    if (timeLimit && timeElapsed >= timeLimit && !isComplete) {
      handleGameOver();
    }
  }, [timeElapsed, timeLimit, isComplete]);

  // Check for completion
  useEffect(() => {
    const totalPairs = cards.length / 2;
    if (matchedPairs.length === totalPairs && totalPairs > 0) {
      handleGameComplete();
    }
  }, [matchedPairs, cards.length]);

  const handleCardClick = useCallback((cardId: string) => {
    if (isProcessing) return;
    if (flippedCards.includes(cardId)) return;
    if (matchedPairs.some(pairId => gameCards.find(c => c.id === cardId)?.card.pairId === pairId)) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves(prev => prev + 1);
      checkMatch(newFlipped);
    }
  }, [isProcessing, flippedCards, matchedPairs, gameCards]);

  const checkMatch = useCallback((flipped: string[]) => {
    const [first, second] = flipped;
    const firstCard = gameCards.find(c => c.id === first);
    const secondCard = gameCards.find(c => c.id === second);

    if (!firstCard || !secondCard) {
      setTimeout(() => {
        setFlippedCards([]);
        setIsProcessing(false);
      }, 800);
      return;
    }

    const isMatch = firstCard.card.pairId === secondCard.card.pairId && first !== second;

    setTimeout(() => {
      if (isMatch) {
        // Match found!
        setMatchedPairs(prev => [...prev, firstCard.card.pairId]);
        setGameCards(prev => prev.map(c => 
          c.card.pairId === firstCard.card.pairId 
            ? { ...c, isMatched: true }
            : c
        ));
        
        // Calculate score with combo
        const comboBonus = combo * 5;
        const matchScore = 20 + comboBonus;
        setScore(prev => prev + matchScore);
        setCombo(prev => prev + 1);
        
        // Show combo animation
        if (combo > 0) {
          setShowCombo(true);
          setTimeout(() => setShowCombo(false), 800);
        }
      } else {
        // No match - reset combo
        setCombo(0);
      }
      
      setFlippedCards([]);
      setIsProcessing(false);
    }, isMatch ? 500 : 1000);
  }, [gameCards, combo]);

  const handleGameComplete = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsComplete(true);
    
    const totalPairs = cards.length / 2;
    const accuracy = Math.min(100, (totalPairs / moves) * 100);
    const timeBonus = Math.max(0, (timeLimit - timeElapsed) * 2);
    const finalScore = score + timeBonus;
    
    setTimeout(() => {
      onComplete(finalScore, accuracy, timeElapsed);
    }, 2000);
  }, [cards.length, moves, score, timeLimit, timeElapsed, onComplete]);

  const handleGameOver = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsComplete(true);
    
    const totalPairs = cards.length / 2;
    const accuracy = Math.min(100, (matchedPairs.length / Math.max(1, moves)) * 100);
    
    setTimeout(() => {
      onComplete(score, accuracy, timeElapsed);
    }, 1500);
  }, [cards.length, matchedPairs.length, moves, score, timeElapsed, onComplete]);

  const remainingTime = timeLimit - timeElapsed;
  const gridCols = cards.length <= 8 ? 4 : cards.length <= 12 ? 4 : cards.length <= 16 ? 4 : 6;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="glass-card-strong p-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">
            Pairs: {matchedPairs.length}/{cards.length / 2} • Moves: {moves}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className={cn(
            'px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1',
            remainingTime <= 30 ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'
          )}>
            <Clock className="w-4 h-4" />
            {formatTime(Math.max(0, remainingTime))}
          </div>
          
          {/* Score */}
          <div className="text-lg font-bold text-foreground">{score} pts</div>
          
          {/* Reset */}
          <MagicButton variant="glass" size="sm" onClick={initializeGame}>
            <RotateCcw className="w-4 h-4" />
          </MagicButton>
          
          {/* Close */}
          <MagicButton variant="glass" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </MagicButton>
        </div>
      </div>

      {/* Combo indicator */}
      {showCombo && combo > 1 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 animate-bounce-soft">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
            <Sparkles className="w-5 h-5 inline mr-2" />
            {combo}x Combo!
          </div>
        </div>
      )}

      {/* Game area */}
      <div className="flex-1 flex items-center justify-center p-6">
        {isComplete ? (
          <div className="text-center animate-scale-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {matchedPairs.length === cards.length / 2 ? '🎉 Excellent!' : '⏰ Time\'s Up!'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {matchedPairs.length}/{cards.length / 2} pairs matched in {moves} moves
            </p>
            <div className="text-4xl font-bold text-magic">{score} points</div>
          </div>
        ) : (
          <div 
            className={cn(
              'grid gap-3 w-full max-w-2xl',
              gridCols === 4 && 'grid-cols-4',
              gridCols === 6 && 'grid-cols-6'
            )}
          >
            {gameCards.map((cardState) => {
              const isFlipped = flippedCards.includes(cardState.id) || cardState.isMatched;
              
              return (
                <div
                  key={cardState.id}
                  onClick={() => handleCardClick(cardState.id)}
                  className={cn(
                    'aspect-square cursor-pointer perspective-container'
                  )}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className={cn(
                      'w-full h-full relative transition-transform duration-500',
                      isFlipped && 'rotate-y-180'
                    )}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Card back */}
                    <div
                      className={cn(
                        'absolute inset-0 rounded-xl flex items-center justify-center',
                        'bg-gradient-to-br from-primary to-primary/80',
                        'shadow-soft hover:shadow-glow hover:scale-105 transition-all',
                        cardState.isMatched && 'opacity-0 pointer-events-none'
                      )}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="text-4xl text-white/30">?</div>
                    </div>
                    
                    {/* Card front */}
                    <div
                      className={cn(
                        'absolute inset-0 rounded-xl flex items-center justify-center',
                        'bg-card border-2',
                        cardState.isMatched 
                          ? 'border-emerald-500 bg-emerald-500/10' 
                          : 'border-border',
                        cardState.isMatched && 'animate-pulse'
                      )}
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <span className={cn(
                        cardState.card.type === 'emoji' && 'text-4xl',
                        cardState.card.type === 'text' && 'text-xl font-bold text-foreground',
                        cardState.card.type === 'formula' && 'text-lg font-mono text-foreground'
                      )}>
                        {cardState.card.content}
                      </span>
                      
                      {cardState.isMatched && (
                        <div className="absolute top-1 right-1">
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
