/**
 * Geography Explorer Game
 * Interactive maps, capitals, climate zones, and resources
 * Designed for Classes 7-10
 */

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { Trophy, X, RotateCcw, Play, Globe, MapPin, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundManager } from '@/lib/soundManager';
import { motion, AnimatePresence } from 'framer-motion';

interface GeoQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  category: 'capitals' | 'rivers' | 'climate' | 'resources' | 'landmarks' | 'countries';
  hint?: string;
  emoji?: string;
}

interface GeographyExplorerGameProps {
  title: string;
  classNumber: number;
  questions?: GeoQuestion[];
  timeLimit?: number;
  onComplete: (score: number, accuracy: number, timeSpent: number) => void;
  onClose: () => void;
}

// Generate questions based on class level
const getQuestions = (classNumber: number): GeoQuestion[] => {
  const questions: GeoQuestion[] = [];
  
  // Class 7 - Basic Geography (India & World)
  if (classNumber <= 7) {
    questions.push(
      { question: 'What is the capital of India?', options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'], correctAnswer: 'New Delhi', category: 'capitals', emoji: '🇮🇳' },
      { question: 'Which river is known as the "Ganga"?', options: ['Yamuna', 'Ganges', 'Brahmaputra', 'Narmada'], correctAnswer: 'Ganges', category: 'rivers', emoji: '🌊' },
      { question: 'The Sahara Desert is located in which continent?', options: ['Asia', 'Africa', 'Australia', 'South America'], correctAnswer: 'Africa', category: 'climate', emoji: '🏜️' },
      { question: 'Which mountain range separates India from China?', options: ['Alps', 'Andes', 'Himalayas', 'Rockies'], correctAnswer: 'Himalayas', category: 'landmarks', emoji: '🏔️' },
      { question: 'What is the capital of Japan?', options: ['Seoul', 'Tokyo', 'Beijing', 'Bangkok'], correctAnswer: 'Tokyo', category: 'capitals', emoji: '🇯🇵' },
      { question: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], correctAnswer: 'Pacific', category: 'resources', emoji: '🌊' },
      { question: 'The Amazon River flows through which continent?', options: ['Africa', 'Asia', 'South America', 'Europe'], correctAnswer: 'South America', category: 'rivers', emoji: '🌳' },
      { question: 'Which country is known as the Land of Rising Sun?', options: ['China', 'Korea', 'Japan', 'Thailand'], correctAnswer: 'Japan', category: 'countries', emoji: '☀️' },
      { question: 'What is the largest continent by area?', options: ['Africa', 'Asia', 'Europe', 'North America'], correctAnswer: 'Asia', category: 'countries', emoji: '🌏' },
      { question: 'Which Indian state is known for tea plantations?', options: ['Kerala', 'Assam', 'Punjab', 'Gujarat'], correctAnswer: 'Assam', category: 'resources', emoji: '🍵' },
    );
  }
  
  // Class 8 - Physical & Political Geography
  if (classNumber === 8) {
    questions.push(
      { question: 'What causes seasons on Earth?', options: ['Distance from Sun', 'Axial tilt', 'Moon phases', 'Solar flares'], correctAnswer: 'Axial tilt', category: 'climate', emoji: '🌍' },
      { question: 'Which type of soil is best for cotton cultivation?', options: ['Alluvial', 'Black', 'Red', 'Laterite'], correctAnswer: 'Black', category: 'resources', emoji: '🌱', hint: 'Also called Regur soil' },
      { question: 'The Prime Meridian passes through which city?', options: ['Paris', 'Greenwich', 'New York', 'Tokyo'], correctAnswer: 'Greenwich', category: 'landmarks', emoji: '🌐' },
      { question: 'Which mineral is known as Black Gold?', options: ['Coal', 'Iron', 'Petroleum', 'Gold'], correctAnswer: 'Petroleum', category: 'resources', emoji: '🛢️' },
      { question: 'Which country has the longest coastline?', options: ['Russia', 'Australia', 'Canada', 'USA'], correctAnswer: 'Canada', category: 'countries', emoji: '🏖️' },
      { question: 'The Tropic of Cancer passes through how many Indian states?', options: ['6', '7', '8', '9'], correctAnswer: '8', category: 'climate', emoji: '🗺️' },
      { question: 'Which is the highest plateau in the world?', options: ['Deccan Plateau', 'Tibetan Plateau', 'Colorado Plateau', 'Brazilian Plateau'], correctAnswer: 'Tibetan Plateau', category: 'landmarks', emoji: '🏔️' },
      { question: 'Which river forms the Grand Canyon?', options: ['Mississippi', 'Colorado', 'Missouri', 'Columbia'], correctAnswer: 'Colorado', category: 'rivers', emoji: '🏞️' },
      { question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correctAnswer: 'Canberra', category: 'capitals', emoji: '🇦🇺' },
      { question: 'Which climate zone has moderate rainfall throughout the year?', options: ['Tropical', 'Temperate', 'Polar', 'Mediterranean'], correctAnswer: 'Temperate', category: 'climate', emoji: '🌤️' },
    );
  }
  
  // Class 9-10 - Advanced Geography & Contemporary Issues
  if (classNumber >= 9) {
    questions.push(
      { question: 'Which country leads in solar energy production?', options: ['USA', 'Germany', 'China', 'India'], correctAnswer: 'China', category: 'resources', emoji: '☀️' },
      { question: 'The Ring of Fire is associated with which phenomenon?', options: ['Earthquakes & Volcanoes', 'Coral Reefs', 'Deserts', 'Ice Caps'], correctAnswer: 'Earthquakes & Volcanoes', category: 'landmarks', emoji: '🌋', hint: 'Located around the Pacific Ocean' },
      { question: 'What is the capital of Brazil?', options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'], correctAnswer: 'Brasília', category: 'capitals', emoji: '🇧🇷' },
      { question: 'Which Indian state has the highest literacy rate?', options: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra'], correctAnswer: 'Kerala', category: 'countries', emoji: '📚' },
      { question: 'The Coriolis Effect influences what?', options: ['Tides', 'Wind direction', 'Earthquakes', 'Soil erosion'], correctAnswer: 'Wind direction', category: 'climate', emoji: '💨' },
      { question: 'Which strait connects the Mediterranean and Atlantic?', options: ['Bering', 'Gibraltar', 'Malacca', 'Hormuz'], correctAnswer: 'Gibraltar', category: 'rivers', emoji: '🚢' },
      { question: 'What percentage of Earth\'s water is freshwater?', options: ['97%', '50%', '3%', '25%'], correctAnswer: '3%', category: 'resources', emoji: '💧' },
      { question: 'Which country is both in Europe and Asia?', options: ['Russia', 'Turkey', 'Greece', 'Both A and B'], correctAnswer: 'Both A and B', category: 'countries', emoji: '🌍' },
      { question: 'The Northern Lights are best seen near which region?', options: ['Equator', 'Arctic Circle', 'Tropic of Cancer', 'Antarctic'], correctAnswer: 'Arctic Circle', category: 'climate', emoji: '🌌' },
      { question: 'Which dam is the world\'s largest by generating capacity?', options: ['Hoover Dam', 'Three Gorges', 'Sardar Sarovar', 'Aswan'], correctAnswer: 'Three Gorges', category: 'landmarks', emoji: '🏗️' },
    );
  }
  
  return questions.sort(() => Math.random() - 0.5);
};

export const GeographyExplorerGame: React.FC<GeographyExplorerGameProps> = ({
  title,
  classNumber,
  questions,
  timeLimit = 180,
  onComplete,
  onClose,
}) => {
  const gameQuestions = questions && questions.length > 0 ? questions : getQuestions(classNumber);
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; correctAnswer: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [categoryStats, setCategoryStats] = useState<Record<string, { correct: number; total: number }>>({});

  const currentQuestion = gameQuestions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    soundManager.playClick();
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setTimeLeft(timeLimit);
    setShowHint(false);
    setStartTime(Date.now());
    setCategoryStats({});
  };

  const finishGame = () => {
    setGameState('completed');
    soundManager.playComplete();
    
    const timeSpent = (Date.now() - startTime) / 1000;
    const accuracy = currentQuestionIndex > 0 ? (correctCount / (currentQuestionIndex + 1)) * 100 : 0;
    
    onComplete(score, accuracy, timeSpent);
  };

  const handleAnswer = (answer: string) => {
    if (feedback) return;
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    // Update category stats
    setCategoryStats(prev => ({
      ...prev,
      [currentQuestion.category]: {
        correct: (prev[currentQuestion.category]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[currentQuestion.category]?.total || 0) + 1,
      },
    }));
    
    if (isCorrect) {
      soundManager.playCorrect();
      const streakBonus = streak >= 3 ? 5 : 0;
      const hintPenalty = showHint ? -5 : 0;
      setScore(prev => prev + 10 + streakBonus + hintPenalty);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      soundManager.playWrong();
      setStreak(0);
    }

    setFeedback({ show: true, correct: isCorrect, correctAnswer: currentQuestion.correctAnswer });

    setTimeout(() => {
      setFeedback(null);
      setShowHint(false);
      
      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        finishGame();
      }
    }, 1200);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'capitals': return '🏛️';
      case 'rivers': return '🌊';
      case 'climate': return '🌤️';
      case 'resources': return '💎';
      case 'landmarks': return '🗿';
      case 'countries': return '🌍';
      default: return '📍';
    }
  };

  // Idle screen
  if (gameState === 'idle') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center" tilt={false}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">
            Explore the world! Answer questions about capitals, rivers, climate, and more.
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            <div className="glass-card p-4">
              <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
              <div className="text-lg font-bold text-foreground">{Math.floor(timeLimit / 60)}:{String(timeLimit % 60).padStart(2, '0')}</div>
              <div className="text-xs text-muted-foreground">Time Limit</div>
            </div>
            <div className="glass-card p-4">
              <MapPin className="w-5 h-5 mx-auto mb-1 text-primary" />
              <div className="text-lg font-bold text-foreground">{gameQuestions.length}</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="glass-card p-4">
              <Zap className="w-5 h-5 mx-auto mb-1 text-amber-500" />
              <div className="text-lg font-bold text-foreground">Class {classNumber}</div>
              <div className="text-xs text-muted-foreground">Level</div>
            </div>
          </div>

          {/* Categories preview */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['capitals', 'rivers', 'climate', 'resources', 'landmarks', 'countries'].map(cat => (
              <span key={cat} className="text-xs px-2 py-1 rounded-full bg-card border border-border">
                {getCategoryIcon(cat)} {cat}
              </span>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Cancel</MagicButton>
            <MagicButton onClick={startGame} icon={<Play className="w-4 h-4" />}>
              Start Exploring!
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
        <GlassCard className="max-w-lg w-full p-8 text-center animate-scale-in" tilt={false}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {accuracy >= 80 ? '🌟 World Expert!' : accuracy >= 60 ? '🗺️ Good Explorer!' : '📚 Keep Learning!'}
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
              <div className="text-2xl font-bold text-primary">{timeSpent}s</div>
              <div className="text-xs text-muted-foreground">Time</div>
            </div>
          </div>

          {/* Category breakdown */}
          {Object.keys(categoryStats).length > 0 && (
            <div className="glass-card p-4 mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Performance by Category</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(categoryStats).map(([cat, stats]) => (
                  <div key={cat} className="text-center">
                    <div className="text-lg">{getCategoryIcon(cat)}</div>
                    <div className="text-sm font-bold text-foreground">{stats.correct}/{stats.total}</div>
                    <div className="text-xs text-muted-foreground capitalize">{cat}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Done</MagicButton>
            <MagicButton onClick={startGame} icon={<RotateCcw className="w-4 h-4" />}>
              Explore Again
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
              Question {currentQuestionIndex + 1} of {gameQuestions.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={cn(
            'px-4 py-2 rounded-full text-lg font-bold flex items-center gap-1',
            timeLeft <= 30 ? 'bg-destructive/20 text-destructive animate-pulse' : 'bg-primary/20 text-primary'
          )}>
            <Clock className="w-4 h-4" />
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
          
          {streak >= 3 && (
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
          style={{ width: `${((currentQuestionIndex) / gameQuestions.length) * 100}%` }}
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
            {/* Category badge */}
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground">
                {getCategoryIcon(currentQuestion.category)}
                <span className="capitalize">{currentQuestion.category}</span>
              </span>
            </div>

            {/* Question */}
            <GlassCard 
              className={cn(
                'p-8 mb-8 text-center transition-all duration-300',
                feedback?.correct === true && 'ring-2 ring-emerald-500 bg-emerald-500/10',
                feedback?.correct === false && 'ring-2 ring-destructive bg-destructive/10'
              )} 
              tilt={false}
            >
              {currentQuestion.emoji && (
                <div className="text-5xl mb-4">{currentQuestion.emoji}</div>
              )}
              
              <p className="text-2xl font-bold text-foreground leading-relaxed">
                {currentQuestion.question}
              </p>
              
              {currentQuestion.hint && !feedback && (
                <button
                  onClick={() => setShowHint(true)}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  {showHint ? `💡 ${currentQuestion.hint}` : '💡 Show hint (-5 pts)'}
                </button>
              )}
              
              {feedback && !feedback.correct && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-muted-foreground"
                >
                  Correct answer: <span className="text-emerald-500 font-semibold">{feedback.correctAnswer}</span>
                </motion.p>
              )}
            </GlassCard>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: feedback ? 1 : 1.02 }}
                  whileTap={{ scale: feedback ? 1 : 0.98 }}
                  onClick={() => handleAnswer(option)}
                  disabled={!!feedback}
                  className={cn(
                    'p-5 rounded-2xl text-lg font-semibold transition-all',
                    'bg-card border-2 border-border',
                    !feedback && 'hover:border-primary hover:shadow-glow',
                    feedback && option === currentQuestion.correctAnswer && 'border-emerald-500 bg-emerald-500/10',
                    feedback && !feedback.correct && option !== currentQuestion.correctAnswer && 'opacity-50',
                    'disabled:cursor-not-allowed'
                  )}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
