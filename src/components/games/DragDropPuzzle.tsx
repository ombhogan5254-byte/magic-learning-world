/**
 * Drag & Drop Puzzle Game for Class 1-3
 * Touch-friendly with visual feedback
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, RotateCcw, Sparkles } from 'lucide-react';

export interface PuzzlePiece {
  id: string;
  content: string;
  type: 'emoji' | 'text' | 'image';
}

export interface PuzzleSlot {
  id: string;
  label: string;
  correctPieceId: string;
}

export interface DragDropPuzzleProps {
  title: string;
  instruction: string;
  pieces: PuzzlePiece[];
  slots: PuzzleSlot[];
  onComplete: (score: number, accuracy: number, timeSpent: number) => void;
  onClose: () => void;
}

export const DragDropPuzzle: React.FC<DragDropPuzzleProps> = ({
  title,
  instruction,
  pieces,
  slots,
  onComplete,
  onClose,
}) => {
  // Shuffle pieces initially
  const [availablePieces, setAvailablePieces] = useState<PuzzlePiece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<Record<string, string | null>>({});
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ slotId: string; correct: boolean } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  
  // Touch handling
  const [touchDragging, setTouchDragging] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize pieces on mount
  useEffect(() => {
    const shuffled = [...pieces].sort(() => Math.random() - 0.5);
    setAvailablePieces(shuffled);
    // Initialize all slots as empty
    const initial: Record<string, string | null> = {};
    slots.forEach(slot => { initial[slot.id] = null; });
    setPlacedPieces(initial);
  }, [pieces, slots]);

  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', piece.id);
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent, piece: PuzzlePiece) => {
    e.preventDefault();
    setDraggedPiece(piece);
    setTouchDragging(true);
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
  }, []);

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });

    // Find which slot we're hovering over
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const slotElement = elements.find(el => el.getAttribute('data-slot-id'));
    if (slotElement) {
      setHoveredSlot(slotElement.getAttribute('data-slot-id'));
    } else {
      setHoveredSlot(null);
    }
  }, [touchDragging]);

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (touchDragging && draggedPiece && hoveredSlot) {
      handleDrop(hoveredSlot);
    }
    setTouchDragging(false);
    setDraggedPiece(null);
    setHoveredSlot(null);
  }, [touchDragging, draggedPiece, hoveredSlot]);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    setHoveredSlot(slotId);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setHoveredSlot(null);
  }, []);

  // Handle drop
  const handleDrop = useCallback((slotId: string) => {
    if (!draggedPiece) return;

    const slot = slots.find(s => s.id === slotId);
    if (!slot) return;

    setAttempts(prev => prev + 1);
    const isCorrect = slot.correctPieceId === draggedPiece.id;

    // Show feedback
    setFeedback({ slotId, correct: isCorrect });
    setTimeout(() => setFeedback(null), 800);

    if (isCorrect) {
      setScore(prev => prev + 10);
      
      // Place the piece
      setPlacedPieces(prev => ({ ...prev, [slotId]: draggedPiece.id }));
      
      // Remove from available
      setAvailablePieces(prev => prev.filter(p => p.id !== draggedPiece.id));
    }

    setDraggedPiece(null);
    setHoveredSlot(null);
  }, [draggedPiece, slots]);

  // Handle drop event for mouse
  const handleDropEvent = useCallback((e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    handleDrop(slotId);
  }, [handleDrop]);

  // Check completion
  useEffect(() => {
    const allPlaced = Object.values(placedPieces).every(v => v !== null);
    if (allPlaced && Object.keys(placedPieces).length === slots.length && slots.length > 0) {
      const accuracy = attempts > 0 ? (slots.length / attempts) * 100 : 100;
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setIsComplete(true);
      setTimeout(() => {
        onComplete(score + 50, Math.min(100, accuracy), timeSpent);
      }, 1500);
    }
  }, [placedPieces, slots.length, score, attempts, startTime, onComplete]);

  // Reset puzzle
  const handleReset = useCallback(() => {
    const shuffled = [...pieces].sort(() => Math.random() - 0.5);
    setAvailablePieces(shuffled);
    const initial: Record<string, string | null> = {};
    slots.forEach(slot => { initial[slot.id] = null; });
    setPlacedPieces(initial);
    setScore(0);
    setAttempts(0);
    setIsComplete(false);
  }, [pieces, slots]);

  // Get piece by ID
  const getPiece = (pieceId: string) => pieces.find(p => p.id === pieceId);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-background"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="glass-card-strong p-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{instruction}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold text-foreground">{score} pts</div>
          <MagicButton variant="glass" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </MagicButton>
          <MagicButton variant="glass" size="sm" onClick={onClose}>
            ✕
          </MagicButton>
        </div>
      </div>

      {/* Game area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6 overflow-auto">
        {/* Completion celebration */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="text-center animate-scale-in">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Puzzle Complete!</h2>
              <p className="text-muted-foreground">You earned {score + 50} points!</p>
            </div>
          </div>
        )}

        {/* Drop slots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-3xl">
          {slots.map((slot) => {
            const placedPieceId = placedPieces[slot.id];
            const placedPiece = placedPieceId ? getPiece(placedPieceId) : null;
            const isFeedback = feedback?.slotId === slot.id;
            
            return (
              <div
                key={slot.id}
                data-slot-id={slot.id}
                onDragOver={(e) => handleDragOver(e, slot.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDropEvent(e, slot.id)}
                className={cn(
                  'relative p-4 rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[100px] flex flex-col items-center justify-center',
                  hoveredSlot === slot.id && !placedPiece && 'border-primary bg-primary/10 scale-105',
                  placedPiece && 'border-solid border-emerald-500 bg-emerald-500/10',
                  !placedPiece && !hoveredSlot && 'border-muted-foreground/30 bg-card',
                  isFeedback && feedback.correct && 'animate-pulse border-emerald-500',
                  isFeedback && !feedback.correct && 'animate-shake border-destructive'
                )}
              >
                {/* Label */}
                <span className="text-xs font-medium text-muted-foreground mb-2">{slot.label}</span>
                
                {/* Placed piece or placeholder */}
                {placedPiece ? (
                  <div className="text-4xl animate-scale-in">{placedPiece.content}</div>
                ) : (
                  <div className="text-2xl text-muted-foreground/20">?</div>
                )}

                {/* Feedback icon */}
                {isFeedback && (
                  <div className="absolute -top-2 -right-2">
                    {feedback.correct ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500 animate-bounce" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive animate-shake" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl border-t border-border my-4" />

        {/* Draggable pieces */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 w-full max-w-3xl">
          {availablePieces.map((piece) => (
            <div
              key={piece.id}
              draggable
              onDragStart={(e) => handleDragStart(e, piece)}
              onDragEnd={() => setDraggedPiece(null)}
              onTouchStart={(e) => handleTouchStart(e, piece)}
              className={cn(
                'glass-card p-4 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing',
                'transition-all duration-200 hover:scale-110 hover:shadow-glow select-none',
                'touch-none', // Prevents default touch behavior
                draggedPiece?.id === piece.id && 'opacity-50 scale-95'
              )}
            >
              <span className="text-3xl sm:text-4xl">{piece.content}</span>
            </div>
          ))}
        </div>

        {availablePieces.length === 0 && !isComplete && (
          <p className="text-muted-foreground text-center">All pieces placed! Checking...</p>
        )}
      </div>

      {/* Touch drag overlay */}
      {touchDragging && draggedPiece && (
        <div
          className="fixed pointer-events-none z-50 text-5xl transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: touchPosition.x, top: touchPosition.y }}
        >
          {draggedPiece.content}
        </div>
      )}
    </div>
  );
};

// Shake animation for wrong answers
const shakeKeyframes = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}
.animate-shake { animation: shake 0.3s ease-in-out; }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shakeKeyframes;
  document.head.appendChild(style);
}
