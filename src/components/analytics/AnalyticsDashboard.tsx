/**
 * Analytics Dashboard Component
 * Shows weekly progress charts, strengths/weaknesses, and improvement suggestions
 */

import React, { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { XPBadge } from '@/components/ui/XPBadge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { storage } from '@/lib/storage';
import { 
  ArrowLeft, TrendingUp, TrendingDown, Target, Brain,
  Clock, Star, Award, Zap, BookOpen, Gamepad2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsDashboardProps {
  classNumber: number;
  onBack: () => void;
}

interface WeeklyData {
  dates: string[];
  xp: number[];
  accuracy: number[];
}

interface SubjectStats {
  name: string;
  accuracy: number;
  gamesPlayed: number;
  timeSpent: number;
  xp: number;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  classNumber,
  onBack,
}) => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData>({ dates: [], xp: [], accuracy: [] });
  const [totalXP, setTotalXP] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [subjectStats, setSubjectStats] = useState<SubjectStats[]>([]);
  const [totalGames, setTotalGames] = useState(0);
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  useEffect(() => {
    // Load analytics data
    const profile = storage.getProfile();
    setTotalXP(profile.totalXP);
    setPlayerLevel(profile.level);

    const weekly = storage.getWeeklyStats();
    setWeeklyData(weekly);

    const { strengths: s, weaknesses: w } = storage.getStrengthsAndWeaknesses(classNumber);
    setStrengths(s);
    setWeaknesses(w);

    // Calculate subject-wise stats
    const classProgress = storage.getClassProgress(classNumber);
    const stats: SubjectStats[] = [];
    let totalGamesCount = 0;
    let totalAccSum = 0;
    let accCount = 0;
    let totalTime = 0;

    Object.entries(classProgress.subjects).forEach(([subjectId, progress]) => {
      const gamesCount = 
        progress.gamesCompleted.length + 
        progress.quizzesCompleted.length + 
        progress.practiceCompleted.length;
      
      if (gamesCount > 0) {
        stats.push({
          name: formatSubjectName(subjectId),
          accuracy: Math.round(progress.accuracy),
          gamesPlayed: gamesCount,
          timeSpent: progress.timeSpent,
          xp: progress.totalXP,
        });
        totalGamesCount += gamesCount;
        totalAccSum += progress.accuracy;
        accCount++;
        totalTime += progress.timeSpent;
      }
    });

    setSubjectStats(stats);
    setTotalGames(totalGamesCount);
    setAvgAccuracy(accCount > 0 ? Math.round(totalAccSum / accCount) : 0);
    setTotalTimeSpent(totalTime);
  }, [classNumber]);

  const formatSubjectName = (s: string) => 
    s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  // Calculate max values for chart scaling
  const maxXP = Math.max(...weeklyData.xp, 100);
  const maxAcc = 100;

  // Generate improvement suggestions
  const getSuggestions = () => {
    const suggestions: string[] = [];
    
    if (avgAccuracy < 60) {
      suggestions.push("📚 Review concepts before taking quizzes - understanding first, speed later!");
    }
    if (avgAccuracy >= 60 && avgAccuracy < 80) {
      suggestions.push("🎯 Good progress! Try harder difficulty levels to push your skills further.");
    }
    if (avgAccuracy >= 80) {
      suggestions.push("🌟 Excellent accuracy! Challenge yourself with timed quizzes.");
    }
    
    if (weaknesses.length > 0) {
      suggestions.push(`💪 Focus on ${formatSubjectName(weaknesses[0])} - extra practice will help!`);
    }
    
    if (totalGames < 10) {
      suggestions.push("🎮 Play more games! Consistency is key to mastery.");
    }
    
    if (totalTimeSpent < 600) {
      suggestions.push("⏰ Spend at least 10-15 minutes daily for best results.");
    }

    return suggestions.length > 0 ? suggestions : ["🎉 You're doing great! Keep up the amazing work!"];
  };

  const suggestions = getSuggestions();

  return (
    <section className="min-h-screen py-12 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-glow-gradient opacity-20 pointer-events-none" />
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <MagicButton variant="glass" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </MagicButton>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                📊 <span className="text-magic">Analytics</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Class {classNumber} • Your Learning Progress
              </p>
            </div>
          </div>
          
          <XPBadge xp={totalXP} size="lg" />
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-5 text-center" tilt={false}>
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{totalXP}</div>
            <div className="text-xs text-muted-foreground">Total XP</div>
          </GlassCard>

          <GlassCard className="p-5 text-center" tilt={false}>
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{totalGames}</div>
            <div className="text-xs text-muted-foreground">Games Played</div>
          </GlassCard>

          <GlassCard className="p-5 text-center" tilt={false}>
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{avgAccuracy}%</div>
            <div className="text-xs text-muted-foreground">Avg Accuracy</div>
          </GlassCard>

          <GlassCard className="p-5 text-center" tilt={false}>
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{formatTime(totalTimeSpent)}</div>
            <div className="text-xs text-muted-foreground">Time Spent</div>
          </GlassCard>
        </div>

        {/* Weekly Progress Chart */}
        <GlassCard className="p-6 mb-8" tilt={false}>
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Weekly Progress
          </h2>
          
          <div className="relative h-48">
            {/* XP Bar Chart */}
            <div className="flex items-end justify-between h-full gap-2">
              {weeklyData.dates.map((date, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  {/* XP Bar */}
                  <div 
                    className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden transition-all duration-500"
                    style={{ height: `${(weeklyData.xp[i] / maxXP) * 100}%`, minHeight: '4px' }}
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-primary to-primary/60"
                      style={{ opacity: weeklyData.xp[i] > 0 ? 1 : 0.3 }}
                    />
                  </div>
                  {/* Label */}
                  <div className="mt-2 text-xs text-muted-foreground">{date}</div>
                  <div className="text-xs font-bold text-primary">{weeklyData.xp[i]} XP</div>
                </div>
              ))}
            </div>
          </div>

          {/* Accuracy line indicator */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary" />
              <span className="text-sm text-muted-foreground">XP Earned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </div>
          </div>
        </GlassCard>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <GlassCard className="p-6" tilt={false}>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Strengths 💪
            </h2>
            {strengths.length > 0 ? (
              <div className="space-y-3">
                {strengths.map((subject, i) => (
                  <div 
                    key={subject}
                    className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium text-foreground">{formatSubjectName(subject)}</span>
                    <Award className="w-5 h-5 text-emerald-500 ml-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Play more games to discover your strengths!</p>
            )}
          </GlassCard>

          {/* Weaknesses */}
          <GlassCard className="p-6" tilt={false}>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-amber-500" />
              Needs Practice 📚
            </h2>
            {weaknesses.length > 0 ? (
              <div className="space-y-3">
                {weaknesses.map((subject, i) => (
                  <div 
                    key={subject}
                    className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium text-foreground">{formatSubjectName(subject)}</span>
                    <Brain className="w-5 h-5 text-amber-500 ml-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Play more games to identify areas to improve!</p>
            )}
          </GlassCard>
        </div>

        {/* Subject Performance */}
        {subjectStats.length > 0 && (
          <GlassCard className="p-6 mb-8" tilt={false}>
            <h2 className="text-xl font-bold text-foreground mb-6">Subject Performance</h2>
            <div className="space-y-4">
              {subjectStats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-foreground">{stat.name}</div>
                  <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        stat.accuracy >= 80 ? "bg-emerald-500" : 
                        stat.accuracy >= 60 ? "bg-primary" : "bg-amber-500"
                      )}
                      style={{ width: `${stat.accuracy}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-bold text-foreground">{stat.accuracy}%</div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Improvement Suggestions */}
        <GlassCard className="p-6" tilt={false}>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Tips for Improvement
          </h2>
          <div className="space-y-3">
            {suggestions.map((suggestion, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10"
              >
                <p className="text-foreground">{suggestion}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};