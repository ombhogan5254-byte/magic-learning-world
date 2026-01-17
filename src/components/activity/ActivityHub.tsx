import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { XPBadge, StarRating } from '@/components/ui/XPBadge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { GameContainer } from '@/components/games/GameContainer';
import { getActivitiesForClass, ActivityConfig } from '@/data/gameData';
import { storage } from '@/lib/storage';
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
  },
  { 
    id: 'play' as ActivityType, 
    title: 'Play', 
    description: 'Fun games to learn concepts',
    icon: <Gamepad2 className="w-6 h-6" />,
    color: 'from-emerald-500 to-emerald-600',
  },
  { 
    id: 'practice' as ActivityType, 
    title: 'Practice', 
    description: 'Solve problems step by step',
    icon: <Target className="w-6 h-6" />,
    color: 'from-amber-500 to-amber-600',
  },
  { 
    id: 'quiz' as ActivityType, 
    title: 'Quiz', 
    description: 'Test your knowledge',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
  },
];

export const ActivityHub: React.FC<ActivityHubProps> = ({
  classNumber,
  subject,
  onBack,
}) => {
  const [selectedMode, setSelectedMode] = useState<ActivityType>('learn');
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeGame, setActiveGame] = useState<ActivityConfig | null>(null);
  const [playerXP, setPlayerXP] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load player data
  useEffect(() => {
    const profile = storage.getProfile();
    setPlayerXP(profile.totalXP);
  }, [refreshKey]);

  const activities = getActivitiesForClass(classNumber, subject);
  const filteredActivities = activities.filter(a => a.type === selectedMode);

  const formatSubjectName = (s: string) => 
    s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');

  const isActivityUnlocked = (activity: ActivityConfig): boolean => {
    if (!activity.unlockAfter) return true;
    return storage.isActivityCompleted(classNumber, subject, activity.type, activity.unlockAfter);
  };

  const getActivityStars = (activity: ActivityConfig): number => {
    return storage.getActivityStars(classNumber, subject, activity.type, activity.id);
  };

  const isActivityCompleted = (activity: ActivityConfig): boolean => {
    return storage.isActivityCompleted(classNumber, subject, activity.type, activity.id);
  };

  const handleActivityClick = (activity: ActivityConfig) => {
    if (!isActivityUnlocked(activity)) return;
    if (activity.questions && activity.questions.length > 0) {
      setActiveGame(activity);
    }
  };

  const handleGameComplete = (result: any) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setRefreshKey(k => k + 1);
  };

  const handleCloseGame = () => {
    setActiveGame(null);
    setRefreshKey(k => k + 1);
  };

  // Calculate overall progress
  const completedCount = activities.filter(a => isActivityCompleted(a)).length;
  const overallProgress = Math.round((completedCount / activities.length) * 100);

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

      {/* Active Game Modal */}
      {activeGame && (
        <GameContainer
          activity={activeGame}
          classNumber={classNumber}
          subjectId={subject}
          onClose={handleCloseGame}
          onComplete={handleGameComplete}
        />
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
            <ProgressRing progress={overallProgress} size={60} strokeWidth={6} color="magic" />
            <XPBadge xp={playerXP} size="lg" />
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
        
        {/* Activities List */}
        <div className="grid gap-4">
          <h2 className="text-xl font-bold text-foreground">
            {selectedMode === 'learn' && '📚 Lessons'}
            {selectedMode === 'play' && '🎮 Games'}
            {selectedMode === 'practice' && '✏️ Practice Sets'}
            {selectedMode === 'quiz' && '🧠 Quizzes'}
          </h2>
          
          {filteredActivities.length === 0 ? (
            <GlassCard className="p-8 text-center" tilt={false}>
              <p className="text-muted-foreground">No activities available for this mode yet.</p>
            </GlassCard>
          ) : (
            filteredActivities.map((activity, index) => {
              const unlocked = isActivityUnlocked(activity);
              const completed = isActivityCompleted(activity);
              const stars = getActivityStars(activity);

              return (
                <GlassCard
                  key={activity.id}
                  onClick={() => handleActivityClick(activity)}
                  className={cn(
                    'p-5 flex items-center gap-4 animate-slide-up',
                    !unlocked && 'opacity-60 cursor-not-allowed'
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  tilt={unlocked}
                >
                  {/* Status indicator */}
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                    completed ? 'bg-emerald-500/20' : !unlocked ? 'bg-muted' : 'bg-primary/20'
                  )}>
                    {completed ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : !unlocked ? (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <span className="text-lg font-bold text-primary">{activity.id}</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground">{activity.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <StarRating rating={stars} size="sm" />
                      <span className="text-xs text-muted-foreground">+{activity.xpReward} XP</span>
                      {activity.timeLimit && (
                        <span className="text-xs text-muted-foreground">
                          ⏱️ {Math.floor(activity.timeLimit / 60)}:{(activity.timeLimit % 60).toString().padStart(2, '0')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action button */}
                  {unlocked && (
                    <MagicButton 
                      variant={completed ? 'glass' : 'magic'} 
                      size="sm"
                    >
                      {completed ? 'Review' : 'Start'}
                    </MagicButton>
                  )}
                </GlassCard>
              );
            })
          )}
        </div>
        
        {/* Achievement teaser */}
        <div className="mt-12 glass-card-strong p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-foreground">Next Achievement</h3>
            <p className="text-sm text-muted-foreground">Complete {Math.max(0, 3 - completedCount)} more activities to earn "Rising Star" badge!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{completedCount}/{activities.length}</div>
            <div className="text-xs text-muted-foreground">completed</div>
          </div>
        </div>
      </div>
    </section>
  );
};
