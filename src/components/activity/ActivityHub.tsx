import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { XPBadge, StarRating } from '@/components/ui/XPBadge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { 
  ArrowLeft, BookOpen, Gamepad2, Target, Brain, 
  CheckCircle, Lock, Star, Trophy, Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityHubProps {
  classNumber: number;
  subject: string;
  onBack: () => void;
}

type ActivityType = 'learn' | 'play' | 'practice' | 'quiz';

const activityModes = [
  { 
    id: 'learn' as ActivityType, 
    title: 'Learn', 
    description: 'Interactive lessons with visuals',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
  },
  { 
    id: 'play' as ActivityType, 
    title: 'Play', 
    description: 'Fun games to learn concepts',
    icon: <Gamepad2 className="w-6 h-6" />,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-500/10',
  },
  { 
    id: 'practice' as ActivityType, 
    title: 'Practice', 
    description: 'Solve problems step by step',
    icon: <Target className="w-6 h-6" />,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-500/10',
  },
  { 
    id: 'quiz' as ActivityType, 
    title: 'Quiz', 
    description: 'Test your knowledge',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
  },
];

const sampleLessons = [
  { id: 1, title: 'Introduction', completed: true, stars: 3, xp: 50 },
  { id: 2, title: 'Basic Concepts', completed: true, stars: 2, xp: 75 },
  { id: 3, title: 'Practice Problems', completed: false, stars: 0, xp: 100 },
  { id: 4, title: 'Advanced Topics', locked: true, stars: 0, xp: 150 },
  { id: 5, title: 'Final Challenge', locked: true, stars: 0, xp: 200 },
];

export const ActivityHub: React.FC<ActivityHubProps> = ({
  classNumber,
  subject,
  onBack,
}) => {
  const [selectedMode, setSelectedMode] = useState<ActivityType>('learn');
  const [showConfetti, setShowConfetti] = useState(false);
  
  const formatSubjectName = (s: string) => 
    s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
  
  const handleLessonClick = (lesson: typeof sampleLessons[0]) => {
    if (!lesson.locked && !lesson.completed) {
      // Simulate completing a lesson
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };
  
  return (
    <section className="min-h-screen py-12 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-glow-gradient opacity-20 pointer-events-none" />
      
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce-soft"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <Sparkles 
                className="w-4 h-4 text-amber-400" 
                style={{ transform: `rotate(${Math.random() * 360}deg)` }}
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <MagicButton variant="glass" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </MagicButton>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {formatSubjectName(subject)}
              </h1>
              <p className="text-muted-foreground mt-1">
                Class {classNumber} • Your Learning Journey
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ProgressRing progress={40} size={60} strokeWidth={6} color="magic" />
            <XPBadge xp={1250} size="lg" />
          </div>
        </div>
        
        {/* Activity Mode Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {activityModes.map((mode) => (
            <GlassCard
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={cn(
                'p-4 text-center cursor-pointer transition-all duration-300',
                selectedMode === mode.id && 'ring-2 ring-primary shadow-glow'
              )}
              tilt={false}
            >
              <div className={cn(
                'w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center',
                'bg-gradient-to-br',
                mode.color
              )}>
                <div className="text-white">{mode.icon}</div>
              </div>
              <h3 className="font-bold text-foreground">{mode.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{mode.description}</p>
            </GlassCard>
          ))}
        </div>
        
        {/* Lessons List */}
        <div className="grid gap-4">
          <h2 className="text-xl font-bold text-foreground">
            {selectedMode === 'learn' && '📚 Lessons'}
            {selectedMode === 'play' && '🎮 Games'}
            {selectedMode === 'practice' && '✏️ Practice Sets'}
            {selectedMode === 'quiz' && '🧠 Quizzes'}
          </h2>
          
          {sampleLessons.map((lesson, index) => (
            <GlassCard
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className={cn(
                'p-5 flex items-center gap-4 animate-slide-up',
                lesson.locked && 'opacity-60 cursor-not-allowed'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              tilt={!lesson.locked}
            >
              {/* Status indicator */}
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                lesson.completed ? 'bg-emerald-500/20' : lesson.locked ? 'bg-muted' : 'bg-primary/20'
              )}>
                {lesson.completed ? (
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                ) : lesson.locked ? (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <span className="text-lg font-bold text-primary">{lesson.id}</span>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-grow">
                <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <StarRating rating={lesson.stars} size="sm" />
                  <span className="text-xs text-muted-foreground">+{lesson.xp} XP</span>
                </div>
              </div>
              
              {/* Action button */}
              {!lesson.locked && (
                <MagicButton 
                  variant={lesson.completed ? 'glass' : 'magic'} 
                  size="sm"
                >
                  {lesson.completed ? 'Review' : 'Start'}
                </MagicButton>
              )}
            </GlassCard>
          ))}
        </div>
        
        {/* Achievement teaser */}
        <div className="mt-12 glass-card-strong p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-foreground">Next Achievement</h3>
            <p className="text-sm text-muted-foreground">Complete 3 more lessons to earn "Rising Star" badge!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">2/5</div>
            <div className="text-xs text-muted-foreground">lessons done</div>
          </div>
        </div>
      </div>
    </section>
  );
};
