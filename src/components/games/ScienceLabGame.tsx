/**
 * Science Lab Simulator Game
 * Interactive experiments with step-by-step simulation
 * Designed for Classes 7-10
 */

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { Trophy, X, RotateCcw, Play, Beaker, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { soundManager } from '@/lib/soundManager';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperimentStep {
  instruction: string;
  options: { text: string; correct: boolean; feedback: string }[];
  hint?: string;
}

interface Experiment {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'physics' | 'chemistry' | 'biology';
  steps: ExperimentStep[];
}

interface ScienceLabGameProps {
  title: string;
  classNumber: number;
  experiments?: Experiment[];
  onComplete: (score: number, accuracy: number, timeSpent: number) => void;
  onClose: () => void;
}

// Default experiments based on class level
const getExperiments = (classNumber: number): Experiment[] => {
  const experiments: Experiment[] = [];
  
  if (classNumber <= 8) {
    experiments.push(
      {
        id: 'acid-base',
        title: 'Acid-Base Indicator',
        description: 'Test substances with litmus paper',
        icon: '🧪',
        category: 'chemistry',
        steps: [
          {
            instruction: 'You have lemon juice, soap water, and distilled water. First, dip blue litmus in lemon juice. What happens?',
            options: [
              { text: 'Turns red', correct: true, feedback: 'Correct! Acids turn blue litmus red.' },
              { text: 'Stays blue', correct: false, feedback: 'Acids change blue litmus to red.' },
              { text: 'Turns green', correct: false, feedback: 'Litmus only turns red or blue.' },
            ],
            hint: 'Lemon juice is acidic.',
          },
          {
            instruction: 'Now dip red litmus paper in soap water. What do you observe?',
            options: [
              { text: 'Turns blue', correct: true, feedback: 'Correct! Bases turn red litmus blue.' },
              { text: 'Stays red', correct: false, feedback: 'Soap is a base, it will change the color.' },
              { text: 'Dissolves', correct: false, feedback: 'Litmus paper doesn\'t dissolve easily.' },
            ],
          },
          {
            instruction: 'What is the pH of distilled water?',
            options: [
              { text: 'pH 7 (Neutral)', correct: true, feedback: 'Correct! Pure water has pH 7.' },
              { text: 'pH 1 (Acidic)', correct: false, feedback: 'pH 1 is strongly acidic.' },
              { text: 'pH 14 (Basic)', correct: false, feedback: 'pH 14 is strongly basic.' },
            ],
          },
        ],
      },
      {
        id: 'motion',
        title: 'Laws of Motion',
        description: 'Explore Newton\'s laws interactively',
        icon: '🚀',
        category: 'physics',
        steps: [
          {
            instruction: 'A ball is at rest on a table. According to Newton\'s First Law, what will happen if no force acts on it?',
            options: [
              { text: 'It will stay at rest', correct: true, feedback: 'Correct! Objects at rest stay at rest unless acted upon by a force.' },
              { text: 'It will start moving', correct: false, feedback: 'An object needs a force to change its state.' },
              { text: 'It will float up', correct: false, feedback: 'Gravity keeps it on the table.' },
            ],
          },
          {
            instruction: 'You push a heavy box and a light box with the same force. According to F=ma, which accelerates more?',
            options: [
              { text: 'Light box accelerates more', correct: true, feedback: 'Correct! Less mass means more acceleration for same force.' },
              { text: 'Heavy box accelerates more', correct: false, feedback: 'Higher mass means less acceleration.' },
              { text: 'Both accelerate equally', correct: false, feedback: 'Acceleration depends on mass: a = F/m' },
            ],
            hint: 'Remember: a = F/m',
          },
          {
            instruction: 'When you jump off a boat, the boat moves backward. Which law explains this?',
            options: [
              { text: 'Newton\'s Third Law', correct: true, feedback: 'Correct! For every action, there is an equal and opposite reaction.' },
              { text: 'Newton\'s First Law', correct: false, feedback: 'First law is about inertia.' },
              { text: 'Newton\'s Second Law', correct: false, feedback: 'Second law is F=ma.' },
            ],
          },
        ],
      }
    );
  }
  
  if (classNumber >= 9) {
    experiments.push(
      {
        id: 'electricity',
        title: 'Electric Circuit',
        description: 'Build and analyze circuits using Ohm\'s Law',
        icon: '⚡',
        category: 'physics',
        steps: [
          {
            instruction: 'You have a circuit with V=12V and R=4Ω. Using Ohm\'s Law, calculate the current I.',
            options: [
              { text: 'I = 3A', correct: true, feedback: 'Correct! I = V/R = 12/4 = 3A' },
              { text: 'I = 48A', correct: false, feedback: 'That would be V×R, not V/R.' },
              { text: 'I = 8A', correct: false, feedback: 'Check your calculation: I = V/R' },
            ],
            hint: 'Ohm\'s Law: V = IR, so I = V/R',
          },
          {
            instruction: 'Two resistors (4Ω and 6Ω) are in series. What is the total resistance?',
            options: [
              { text: '10Ω', correct: true, feedback: 'Correct! In series: R_total = R1 + R2' },
              { text: '2.4Ω', correct: false, feedback: 'That formula is for parallel circuits.' },
              { text: '24Ω', correct: false, feedback: 'In series, we add resistances, not multiply.' },
            ],
          },
          {
            instruction: 'The same resistors (4Ω and 6Ω) are now in parallel. What is the equivalent resistance?',
            options: [
              { text: '2.4Ω', correct: true, feedback: 'Correct! 1/R = 1/4 + 1/6 = 5/12, so R = 2.4Ω' },
              { text: '10Ω', correct: false, feedback: 'That\'s the series resistance.' },
              { text: '0.42Ω', correct: false, feedback: 'You calculated 1/R, not R.' },
            ],
            hint: 'For parallel: 1/R = 1/R1 + 1/R2',
          },
        ],
      },
      {
        id: 'chemical-reactions',
        title: 'Chemical Reactions',
        description: 'Balance equations and predict products',
        icon: '⚗️',
        category: 'chemistry',
        steps: [
          {
            instruction: 'Balance this equation: H₂ + O₂ → H₂O. How many H₂ molecules are needed?',
            options: [
              { text: '2 H₂', correct: true, feedback: 'Correct! 2H₂ + O₂ → 2H₂O balances the equation.' },
              { text: '1 H₂', correct: false, feedback: 'Count the atoms: 2H on left, but 2H on right needs 4H total.' },
              { text: '4 H₂', correct: false, feedback: 'That would give 8 hydrogen atoms.' },
            ],
            hint: 'Count atoms on both sides.',
          },
          {
            instruction: 'When zinc (Zn) reacts with hydrochloric acid (HCl), what gas is released?',
            options: [
              { text: 'Hydrogen (H₂)', correct: true, feedback: 'Correct! Zn + 2HCl → ZnCl₂ + H₂↑' },
              { text: 'Oxygen (O₂)', correct: false, feedback: 'No oxygen is present in the reactants.' },
              { text: 'Chlorine (Cl₂)', correct: false, feedback: 'Chlorine stays bonded in ZnCl₂.' },
            ],
          },
          {
            instruction: 'Burning magnesium in air is what type of reaction?',
            options: [
              { text: 'Combination reaction', correct: true, feedback: 'Correct! 2Mg + O₂ → 2MgO. Two elements combine.' },
              { text: 'Decomposition', correct: false, feedback: 'Decomposition breaks compounds apart.' },
              { text: 'Double displacement', correct: false, feedback: 'That involves exchange of ions.' },
            ],
          },
        ],
      }
    );
  }
  
  return experiments;
};

export const ScienceLabGame: React.FC<ScienceLabGameProps> = ({
  title,
  classNumber,
  experiments,
  onComplete,
  onClose,
}) => {
  const gameExperiments = experiments && experiments.length > 0 ? experiments : getExperiments(classNumber);
  
  const [gameState, setGameState] = useState<'idle' | 'selecting' | 'playing' | 'completed'>('idle');
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; correct: boolean } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [completedExperiments, setCompletedExperiments] = useState<string[]>([]);

  const currentStep = selectedExperiment?.steps[currentStepIndex];

  const startGame = () => {
    soundManager.playClick();
    setGameState('selecting');
    setScore(0);
    setCorrectCount(0);
    setTotalAttempts(0);
    setCompletedExperiments([]);
    setStartTime(Date.now());
  };

  const selectExperiment = (experiment: Experiment) => {
    soundManager.playClick();
    setSelectedExperiment(experiment);
    setCurrentStepIndex(0);
    setShowHint(false);
    setGameState('playing');
  };

  const handleOptionClick = (option: { text: string; correct: boolean; feedback: string }) => {
    if (feedback) return;
    
    setTotalAttempts(prev => prev + 1);
    
    if (option.correct) {
      soundManager.playCorrect();
      setScore(prev => prev + (showHint ? 5 : 10));
      setCorrectCount(prev => prev + 1);
    } else {
      soundManager.playWrong();
    }
    
    setFeedback({ message: option.feedback, correct: option.correct });
    
    setTimeout(() => {
      setFeedback(null);
      setShowHint(false);
      
      if (selectedExperiment && currentStepIndex < selectedExperiment.steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // Experiment completed
        setCompletedExperiments(prev => [...prev, selectedExperiment!.id]);
        
        if (completedExperiments.length + 1 >= gameExperiments.length) {
          // All experiments done
          setGameState('completed');
          soundManager.playComplete();
          const timeSpent = (Date.now() - startTime) / 1000;
          const accuracy = totalAttempts > 0 ? ((correctCount + (option.correct ? 1 : 0)) / (totalAttempts + 1)) * 100 : 0;
          onComplete(score + (option.correct ? 10 : 0), accuracy, timeSpent);
        } else {
          setGameState('selecting');
          setSelectedExperiment(null);
        }
      }
    }, 1500);
  };

  // Idle screen
  if (gameState === 'idle') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center" tilt={false}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Beaker className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">
            Conduct virtual experiments! Follow each step carefully and make the right choices.
          </p>
          
          <div className="glass-card p-4 mb-6">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-foreground">{gameExperiments.length} Experiments</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Class {classNumber} Level</p>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Cancel</MagicButton>
            <MagicButton onClick={startGame} icon={<Play className="w-4 h-4" />}>
              Start Lab
            </MagicButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Experiment selection
  if (gameState === 'selecting') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        <div className="glass-card-strong p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MagicButton variant="glass" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </MagicButton>
            <div>
              <h3 className="font-bold text-foreground">Choose an Experiment</h3>
              <p className="text-xs text-muted-foreground">
                {completedExperiments.length}/{gameExperiments.length} completed
              </p>
            </div>
          </div>
          <div className="text-lg font-bold text-foreground">{score} pts</div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {gameExperiments.map((exp) => {
              const isCompleted = completedExperiments.includes(exp.id);
              return (
                <motion.button
                  key={exp.id}
                  whileHover={{ scale: isCompleted ? 1 : 1.02 }}
                  whileTap={{ scale: isCompleted ? 1 : 0.98 }}
                  onClick={() => !isCompleted && selectExperiment(exp)}
                  disabled={isCompleted}
                  className={cn(
                    'p-6 rounded-2xl text-left transition-all',
                    'bg-card border-2',
                    isCompleted 
                      ? 'border-emerald-500/50 opacity-60 cursor-not-allowed' 
                      : 'border-border hover:border-primary hover:shadow-glow cursor-pointer'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{exp.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-foreground">{exp.title}</h4>
                        {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                      <span className={cn(
                        'text-xs px-2 py-1 rounded-full mt-2 inline-block',
                        exp.category === 'physics' ? 'bg-blue-500/20 text-blue-500' :
                        exp.category === 'chemistry' ? 'bg-purple-500/20 text-purple-500' :
                        'bg-emerald-500/20 text-emerald-500'
                      )}>
                        {exp.category}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Completed screen
  if (gameState === 'completed') {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const accuracy = Math.round((correctCount / totalAttempts) * 100) || 100;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <GlassCard className="max-w-md w-full p-8 text-center animate-scale-in" tilt={false}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">Lab Complete! 🔬</h2>
          
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
              <div className="text-2xl font-bold text-foreground">{completedExperiments.length}</div>
              <div className="text-xs text-muted-foreground">Experiments</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-primary">{timeSpent}s</div>
              <div className="text-xs text-muted-foreground">Time</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <MagicButton variant="glass" onClick={onClose}>Done</MagicButton>
            <MagicButton onClick={startGame} icon={<RotateCcw className="w-4 h-4" />}>
              Try Again
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
          <MagicButton variant="glass" size="sm" onClick={() => setGameState('selecting')}>
            <X className="w-4 h-4" />
          </MagicButton>
          <div>
            <h3 className="font-bold text-foreground">{selectedExperiment?.title}</h3>
            <p className="text-xs text-muted-foreground">
              Step {currentStepIndex + 1} of {selectedExperiment?.steps.length}
            </p>
          </div>
        </div>
        <div className="text-lg font-bold text-foreground">{score} pts</div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div 
          className="h-full bg-magic-gradient transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / (selectedExperiment?.steps.length || 1)) * 100}%` }}
        />
      </div>

      {/* Game content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-2xl"
          >
            {/* Experiment icon */}
            <div className="text-6xl text-center mb-6">{selectedExperiment?.icon}</div>

            {/* Instruction */}
            <GlassCard className="p-6 mb-6" tilt={false}>
              <p className="text-lg text-foreground leading-relaxed">
                {currentStep?.instruction}
              </p>
              
              {currentStep?.hint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  {showHint ? `💡 ${currentStep.hint}` : '💡 Show hint (-5 pts)'}
                </button>
              )}
            </GlassCard>

            {/* Feedback */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'mb-6 p-4 rounded-2xl text-center',
                  feedback.correct ? 'bg-emerald-500/20 text-emerald-600' : 'bg-destructive/20 text-destructive'
                )}
              >
                {feedback.message}
              </motion.div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentStep?.options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: feedback ? 1 : 1.01 }}
                  whileTap={{ scale: feedback ? 1 : 0.99 }}
                  onClick={() => handleOptionClick(option)}
                  disabled={!!feedback}
                  className={cn(
                    'w-full p-4 rounded-xl text-left transition-all flex items-center gap-3',
                    'bg-card border-2 border-border',
                    !feedback && 'hover:border-primary hover:shadow-glow',
                    feedback && option.correct && 'border-emerald-500 bg-emerald-500/10',
                    'disabled:cursor-not-allowed'
                  )}
                >
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{option.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
