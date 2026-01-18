/**
 * Subject Selection Component
 * Displays available subjects for the selected class (Hindi removed)
 */

import React from 'react';
import { SubjectCard } from './SubjectCard';
import { MagicButton } from '@/components/ui/MagicButton';
import { XPBadge } from '@/components/ui/XPBadge';
import { ArrowLeft, BookOpen, Calculator, Atom, Globe, Palette, Music, Dumbbell, BarChart2 } from 'lucide-react';

interface SubjectSelectionProps {
  classNumber: number;
  onSelectSubject: (subject: string) => void;
  onBack: () => void;
  onViewAnalytics?: () => void;
}

const getSubjectsForClass = (classNumber: number) => {
  const baseSubjects = [
    { 
      id: 'english',
      title: 'English', 
      description: 'Master reading, writing, and grammar skills.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      progress: 45,
      activities: 24
    },
    { 
      id: 'math',
      title: 'Mathematics', 
      description: 'Numbers, shapes, and problem-solving fun!',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      progress: 32,
      activities: 30
    },
  ];
  
  const middleSubjects = [
    { 
      id: 'science',
      title: 'Science', 
      description: 'Explore the wonders of nature and experiments.',
      icon: <Atom className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      progress: 28,
      activities: 22
    },
    { 
      id: 'social',
      title: 'Social Studies', 
      description: 'History, geography, and civics adventures.',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      progress: 15,
      activities: 18
    },
  ];
  
  const creativeSubjects = [
    { 
      id: 'art',
      title: 'Art & Craft', 
      description: 'Express yourself through colors and creativity.',
      icon: <Palette className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-pink-500 to-pink-600',
      progress: 60,
      activities: 15
    },
  ];
  
  const extraSubjects = [
    { 
      id: 'music',
      title: 'Music', 
      description: 'Learn rhythms, songs, and instruments.',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-rose-500 to-rose-600',
      progress: 20,
      activities: 12
    },
    { 
      id: 'pe',
      title: 'Physical Education', 
      description: 'Stay active with exercises and sports.',
      icon: <Dumbbell className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      progress: 50,
      activities: 10
    },
  ];
  
  if (classNumber <= 3) {
    return [...baseSubjects, ...creativeSubjects];
  } else if (classNumber <= 6) {
    return [...baseSubjects, ...middleSubjects, ...creativeSubjects];
  } else {
    return [...baseSubjects, ...middleSubjects, ...extraSubjects];
  }
};

export const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  classNumber,
  onSelectSubject,
  onBack,
  onViewAnalytics,
}) => {
  const subjects = getSubjectsForClass(classNumber);
  
  return (
    <section className="min-h-screen py-12 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-glow-gradient opacity-20 pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <MagicButton variant="glass" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </MagicButton>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Class {classNumber} <span className="text-magic">Subjects</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Pick a subject to start playing games
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {onViewAnalytics && (
              <MagicButton variant="glass" onClick={onViewAnalytics}>
                <BarChart2 className="w-4 h-4 mr-2" />
                Analytics
              </MagicButton>
            )}
            <XPBadge xp={1250} size="lg" />
          </div>
        </div>
        
        {/* Subjects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              {...subject}
              onClick={() => onSelectSubject(subject.id)}
              delay={index * 0.08}
            />
          ))}
        </div>
        
        {/* Daily challenge banner */}
        <div className="mt-12 glass-card-strong p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-magic-gradient opacity-5" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              🎯 Daily Challenge
            </h3>
            <p className="text-muted-foreground max-w-md">
              Complete today's special challenge to earn bonus XP and unlock a surprise reward!
            </p>
          </div>
          <MagicButton size="lg">
            Start Challenge
          </MagicButton>
        </div>
      </div>
    </section>
  );
};