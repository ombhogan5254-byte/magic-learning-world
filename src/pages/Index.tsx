/**
 * Main Index Page
 * Navigation flow: Landing → Class Selection → Subject Selection → Activity Hub
 * With Analytics Dashboard access from Subject Selection
 */

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { ClassSelection } from '@/components/class-selection/ClassSelection';
import { SubjectSelection } from '@/components/subject-selection/SubjectSelection';
import { ActivityHub } from '@/components/activity/ActivityHub';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

type View = 'landing' | 'class-selection' | 'subject-selection' | 'activity-hub' | 'analytics';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleGetStarted = () => {
    setCurrentView('class-selection');
  };

  const handleSelectClass = (classNumber: number) => {
    setSelectedClass(classNumber);
    setCurrentView('subject-selection');
  };

  const handleSelectSubject = (subject: string) => {
    setSelectedSubject(subject);
    setCurrentView('activity-hub');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedClass(null);
    setSelectedSubject(null);
  };

  const handleBackToClassSelection = () => {
    setCurrentView('class-selection');
    setSelectedSubject(null);
  };

  const handleBackToSubjectSelection = () => {
    setCurrentView('subject-selection');
  };

  const handleViewAnalytics = () => {
    setCurrentView('analytics');
  };

  const handleBackFromAnalytics = () => {
    setCurrentView('subject-selection');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showStats={currentView !== 'landing'} />
      
      <main className={currentView !== 'landing' ? 'pt-24' : ''}>
        {currentView === 'landing' && (
          <HeroSection onGetStarted={handleGetStarted} />
        )}
        
        {currentView === 'class-selection' && (
          <ClassSelection 
            onSelectClass={handleSelectClass}
            onBack={handleBackToLanding}
          />
        )}
        
        {currentView === 'subject-selection' && selectedClass && (
          <SubjectSelection
            classNumber={selectedClass}
            onSelectSubject={handleSelectSubject}
            onBack={handleBackToClassSelection}
            onViewAnalytics={handleViewAnalytics}
          />
        )}
        
        {currentView === 'activity-hub' && selectedClass && selectedSubject && (
          <ActivityHub
            classNumber={selectedClass}
            subject={selectedSubject}
            onBack={handleBackToSubjectSelection}
          />
        )}

        {currentView === 'analytics' && selectedClass && (
          <AnalyticsDashboard
            classNumber={selectedClass}
            onBack={handleBackFromAnalytics}
          />
        )}
      </main>
    </div>
  );
};

export default Index;