import React from 'react';
import { ClassCard } from './ClassCard';
import { 
  Baby, Smile, Heart, Pencil, BookOpen, 
  Compass, FlaskConical, Microscope, GraduationCap, Trophy 
} from 'lucide-react';
import { MagicButton } from '@/components/ui/MagicButton';
import { ArrowLeft } from 'lucide-react';

interface ClassSelectionProps {
  onSelectClass: (classNumber: number) => void;
  onBack: () => void;
}

const classData = [
  { 
    classNumber: 1, 
    title: 'Class 1', 
    description: 'Start your journey with alphabets, numbers, and colors!',
    icon: <Baby className="w-8 h-8" />,
    gradient: 'from-pink-500 to-rose-500'
  },
  { 
    classNumber: 2, 
    title: 'Class 2', 
    description: 'Learn simple words, counting, and basic shapes.',
    icon: <Smile className="w-8 h-8" />,
    gradient: 'from-orange-500 to-amber-500'
  },
  { 
    classNumber: 3, 
    title: 'Class 3', 
    description: 'Explore stories, addition, subtraction, and nature.',
    icon: <Heart className="w-8 h-8" />,
    gradient: 'from-yellow-500 to-lime-500'
  },
  { 
    classNumber: 4, 
    title: 'Class 4', 
    description: 'Dive into multiplication, environment, and grammar.',
    icon: <Pencil className="w-8 h-8" />,
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    classNumber: 5, 
    title: 'Class 5', 
    description: 'Master fractions, science basics, and creative writing.',
    icon: <BookOpen className="w-8 h-8" />,
    gradient: 'from-teal-500 to-cyan-500'
  },
  { 
    classNumber: 6, 
    title: 'Class 6', 
    description: 'Discover geometry, history, and scientific method.',
    icon: <Compass className="w-8 h-8" />,
    gradient: 'from-cyan-500 to-blue-500'
  },
  { 
    classNumber: 7, 
    title: 'Class 7', 
    description: 'Explore algebra, physics basics, and world geography.',
    icon: <FlaskConical className="w-8 h-8" />,
    gradient: 'from-blue-500 to-indigo-500'
  },
  { 
    classNumber: 8, 
    title: 'Class 8', 
    description: 'Advanced math, chemistry intro, and literature.',
    icon: <Microscope className="w-8 h-8" />,
    gradient: 'from-indigo-500 to-violet-500'
  },
  { 
    classNumber: 9, 
    title: 'Class 9', 
    description: 'Prepare for boards with in-depth subjects.',
    icon: <GraduationCap className="w-8 h-8" />,
    gradient: 'from-violet-500 to-purple-500'
  },
  { 
    classNumber: 10, 
    title: 'Class 10', 
    description: 'Board exam prep with comprehensive practice.',
    icon: <Trophy className="w-8 h-8" />,
    gradient: 'from-purple-500 to-fuchsia-500'
  },
];

export const ClassSelection: React.FC<ClassSelectionProps> = ({ 
  onSelectClass,
  onBack 
}) => {
  return (
    <section className="min-h-screen py-12 px-6 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-glow-gradient opacity-30 pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <MagicButton variant="glass" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </MagicButton>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Choose Your <span className="text-magic">Class</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Select your class to explore subjects and activities
            </p>
          </div>
        </div>
        
        {/* Class grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {classData.map((cls, index) => (
            <ClassCard
              key={cls.classNumber}
              {...cls}
              onClick={() => onSelectClass(cls.classNumber)}
              delay={index * 0.05}
            />
          ))}
        </div>
        
        {/* Fun fact section */}
        <div className="mt-12 glass-card p-8 text-center max-w-2xl mx-auto">
          <p className="text-lg font-medium text-foreground mb-2">
            ✨ Did you know?
          </p>
          <p className="text-muted-foreground">
            Learning becomes 40% more effective when you enjoy it! 
            Choose your class and start your magical learning journey today.
          </p>
        </div>
      </div>
    </section>
  );
};
