import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { XPBadge, StarRating } from '@/components/ui/XPBadge';
import { useGameEngine } from '@/hooks/useGameEngine';
import { ActivityConfig } from '@/data/gameData';
import { formatTime } from '@/lib/gameEngine';
import { cn } from '@/lib/utils';
import { 
  Play, Pause, RotateCcw, X, Trophy, Sparkles, 
  CheckCircle, XCircle, Clock, Target, Zap
} from 'lucide-react';
import { DragDropPuzzle } from './DragDropPuzzle';
import { MemoryGridGame } from './MemoryGridGame';
import { 
  alphabetPuzzles, numberPuzzles, shapePuzzles, colorPuzzles, storyPuzzles,
  mathMemoryGames, scienceMemoryGames, emojiMemoryGames 
} from '@/data/puzzleData';
import { storage } from '@/lib/storage';

interface GameContainerProps {
  activity: ActivityConfig;
  classNumber: number;
  subjectId: string;
  onClose: () => void;
  onComplete: (result: any) => void;
}

export const GameContainer: React.FC<GameContainerProps> = ({
  activity,
  classNumber,
  subjectId,
  onClose,
  onComplete,
}) => {
  const [inputAnswer, setInputAnswer] = useState('');

  const {
    gameState,
    progress,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    feedback,
    result,
    remainingTime,
    showRules,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    submitAnswer,
  } = useGameEngine({
    classNumber,
    subjectId,
    activityType: activity.type,
    activityId: activity.id,
    questions: activity.questions || [],
    config: {
      name: activity.title,
      maxTime: activity.timeLimit,
      pointsPerCorrect: 10,
      pointsPerWrong: 0,
      xpMultiplier: 1,
      difficultyLevel: activity.difficulty,
    },
    onComplete,
  });

  const handleOptionClick = (option: string) => {
    if (gameState === 'playing' && !feedback.show) {
      submitAnswer(option);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAnswer.trim() && gameState === 'playing' && !feedback.show) {
      submitAnswer(inputAnswer.trim());
      setInputAnswer('');
    }
  };

  // Get puzzle/memory game config based on activity
  const getPuzzleConfig = () => {
    const allPuzzles = [...alphabetPuzzles, ...numberPuzzles, ...shapePuzzles, ...colorPuzzles, ...storyPuzzles];
    const puzzleIndex = activity.id - 5; // Puzzles start at id 5
    return allPuzzles[puzzleIndex] || allPuzzles[0];
  };

  const getMemoryConfig = () => {
    const allMemory = [...mathMemoryGames, ...scienceMemoryGames, ...emojiMemoryGames];
    return subjectId === 'math' ? mathMemoryGames[0] : subjectId === 'science' ? scienceMemoryGames[0] : emojiMemoryGames[0];
  };

  // Handle special game types
  if (activity.gameType === 'dragdrop') {
    const puzzleConfig = getPuzzleConfig();
    return (
      <DragDropPuzzle
        title={puzzleConfig.title}
        instruction={puzzleConfig.instruction}
        pieces={puzzleConfig.pieces}
        slots={puzzleConfig.slots}
        onComplete={(score, accuracy, timeSpent) => {
          const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;
          const xpEarned = Math.floor(activity.xpReward * (accuracy / 100));
          storage.completeActivity(classNumber, subjectId, activity.type, activity.id, score, xpEarned, accuracy, stars, timeSpent);
          storage.addXP(xpEarned);
          onComplete({ score, accuracy, timeSpent, stars, xpEarned, passed: accuracy >= 50 });
        }}
        onClose={onClose}
      />
    );
  }

  if (activity.gameType === 'memory') {
    const memoryConfig = getMemoryConfig();
    return (
      <MemoryGridGame
        title={memoryConfig.title}
        cards={memoryConfig.cards}
        timeLimit={memoryConfig.timeLimit}
        onComplete={(score, accuracy, timeSpent) => {
          const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;
          const xpEarned = Math.floor(activity.xpReward * (accuracy / 100));
          storage.completeActivity(classNumber, subjectId, activity.type, activity.id, score, xpEarned, accuracy, stars, timeSpent);
          storage.addXP(xpEarned);
          onComplete({ score, accuracy, timeSpent, stars, xpEarned, passed: accuracy >= 50 });
        }}
        onClose={onClose}
      />
    );
  }

  // Render based on game state
  if (gameState === 'idle') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center" tilt={false}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-magic-gradient flex items-center justify-center">
            <Play className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{activity.title}</h2>
          <p className="text-muted-foreground mb-6">{activity.description}</p>
          
          <div className="flex justify-center gap-4 mb-6 text-sm">
            {activity.timeLimit && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTime(activity.timeLimit)}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Target className="w-4 h-4" />
              <span>{activity.questions?.length || 10} Questions</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Zap className="w-4 h-4" />
              <span>+{activity.xpReward} XP</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Cancel</MagicButton>
            <MagicButton onClick={startGame}>Start Game</MagicButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (gameState === 'completed' && result) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center animate-scale-in" tilt={false}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {result.passed ? '🎉 Great Job!' : '💪 Keep Trying!'}
          </h2>
          
          <StarRating rating={result.stars} size="lg" className="justify-center my-4" />
          
          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{result.score}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-primary">+{result.xpEarned}</div>
              <div className="text-xs text-muted-foreground">XP Earned</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-emerald-500">{Math.round(result.accuracy)}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-foreground">{formatTime(result.timeSpent)}</div>
              <div className="text-xs text-muted-foreground">Time</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Done</MagicButton>
            <MagicButton onClick={resetGame} icon={<RotateCcw className="w-4 h-4" />}>
              Play Again
            </MagicButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Playing state
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="glass-card-strong p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MagicButton variant="glass" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </MagicButton>
          <div>
            <h3 className="font-bold text-foreground">{activity.title}</h3>
            <p className="text-xs text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {activity.timeLimit && (
            <div className={cn(
              'px-3 py-1 rounded-full text-sm font-bold',
              remainingTime <= 30 ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'
            )}>
              <Clock className="w-4 h-4 inline mr-1" />
              {formatTime(remainingTime)}
            </div>
          )}
          <div className="text-lg font-bold text-foreground">{progress?.score || 0} pts</div>
          {gameState === 'playing' ? (
            <MagicButton variant="glass" size="sm" onClick={pauseGame}>
              <Pause className="w-4 h-4" />
            </MagicButton>
          ) : (
            <MagicButton variant="glass" size="sm" onClick={resumeGame}>
              <Play className="w-4 h-4" />
            </MagicButton>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div 
          className="h-full bg-magic-gradient transition-all duration-300"
          style={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Game content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {currentQuestion && (
          <div className="max-w-2xl w-full">
            {/* Question */}
            <GlassCard className="p-8 mb-6 text-center" tilt={false}>
              {currentQuestion.imageUrl && (
                <div className="text-6xl mb-4">{currentQuestion.imageUrl}</div>
              )}
              <h2 className="text-2xl font-bold text-foreground">{currentQuestion.question}</h2>
            </GlassCard>

            {/* Feedback overlay */}
            {feedback.show && (
              <div className={cn(
                'mb-6 p-4 rounded-2xl flex items-center gap-3 animate-scale-in',
                feedback.correct ? 'bg-emerald-500/20 text-emerald-600' : 'bg-destructive/20 text-destructive'
              )}>
                {feedback.correct ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
                <span className="font-medium">{feedback.message}</span>
              </div>
            )}

            {/* Answer options */}
            {currentQuestion.type === 'input' ? (
              <form onSubmit={handleInputSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1 px-6 py-4 rounded-2xl bg-card border border-border text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={feedback.show}
                  autoFocus
                />
                <MagicButton type="submit" disabled={!inputAnswer.trim() || feedback.show}>
                  Submit
                </MagicButton>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options?.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(option)}
                    disabled={feedback.show}
                    className={cn(
                      'p-5 rounded-2xl text-lg font-semibold transition-all duration-200',
                      'bg-card border-2 border-border hover:border-primary hover:shadow-glow',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      feedback.show && option === currentQuestion.correctAnswer && 'border-emerald-500 bg-emerald-500/10',
                      feedback.show && !feedback.correct && option !== currentQuestion.correctAnswer && 'opacity-50'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Streak indicator */}
            {progress && progress.streak > 1 && (
              <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-600 font-bold animate-bounce-soft">
                  <Sparkles className="w-4 h-4" />
                  {progress.streak} Streak!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
