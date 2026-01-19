/**
 * Sound Controls Component
 * Provides mute toggle and volume slider
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { soundManager } from '@/lib/soundManager';
import { cn } from '@/lib/utils';

interface SoundControlsProps {
  compact?: boolean;
  className?: string;
}

export const SoundControls: React.FC<SoundControlsProps> = ({ 
  compact = false,
  className 
}) => {
  const [muted, setMuted] = useState(soundManager.isMuted());
  const [volume, setVolume] = useState(soundManager.getVolume());
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe(() => {
      setMuted(soundManager.isMuted());
      setVolume(soundManager.getVolume());
    });
    return unsubscribe;
  }, []);

  const handleToggleMute = () => {
    soundManager.playClick();
    soundManager.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    soundManager.setVolume(newVolume);
  };

  const VolumeIcon = muted ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  if (compact) {
    return (
      <button
        onClick={handleToggleMute}
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center transition-all',
          'bg-card border border-border hover:border-primary hover:shadow-glow',
          muted && 'opacity-60',
          className
        )}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon className="w-5 h-5 text-foreground" />
      </button>
    );
  }

  return (
    <div 
      className={cn('relative', className)}
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <button
        onClick={handleToggleMute}
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center transition-all',
          'bg-card border border-border hover:border-primary hover:shadow-glow',
          muted && 'opacity-60'
        )}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon className="w-5 h-5 text-foreground" />
      </button>

      {/* Volume slider popup */}
      {showSlider && !muted && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 glass-card-strong rounded-xl animate-scale-in">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 rounded-full appearance-none cursor-pointer bg-muted
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-primary
              [&::-webkit-slider-thumb]:shadow-glow
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-primary
              [&::-moz-range-thumb]:border-none
              [&::-moz-range-thumb]:cursor-pointer"
          />
          <div className="text-xs text-muted-foreground text-center mt-1">
            {Math.round(volume * 100)}%
          </div>
        </div>
      )}
    </div>
  );
};

// Full settings panel version
export const SoundSettingsPanel: React.FC<{ className?: string }> = ({ className }) => {
  const [muted, setMuted] = useState(soundManager.isMuted());
  const [volume, setVolume] = useState(soundManager.getVolume());

  useEffect(() => {
    const unsubscribe = soundManager.subscribe(() => {
      setMuted(soundManager.isMuted());
      setVolume(soundManager.getVolume());
    });
    return unsubscribe;
  }, []);

  const handleToggleMute = () => {
    soundManager.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    soundManager.setVolume(parseFloat(e.target.value));
  };

  const testSound = () => {
    soundManager.playCorrect();
  };

  return (
    <div className={cn('glass-card p-6 rounded-2xl', className)}>
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-primary" />
        Sound Settings
      </h3>

      <div className="space-y-4">
        {/* Mute toggle */}
        <div className="flex items-center justify-between">
          <span className="text-foreground">Sound Effects</span>
          <button
            onClick={handleToggleMute}
            className={cn(
              'w-14 h-8 rounded-full transition-all relative',
              muted ? 'bg-muted' : 'bg-primary'
            )}
          >
            <div
              className={cn(
                'w-6 h-6 rounded-full bg-white shadow-md absolute top-1 transition-all',
                muted ? 'left-1' : 'left-7'
              )}
            />
          </button>
        </div>

        {/* Volume slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-foreground">Volume</span>
            <span className="text-muted-foreground text-sm">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            disabled={muted}
            className={cn(
              'w-full h-2 rounded-full appearance-none cursor-pointer bg-muted',
              muted && 'opacity-50 cursor-not-allowed',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-5',
              '[&::-webkit-slider-thumb]:h-5',
              '[&::-webkit-slider-thumb]:rounded-full',
              '[&::-webkit-slider-thumb]:bg-primary',
              '[&::-webkit-slider-thumb]:shadow-glow',
              '[&::-webkit-slider-thumb]:cursor-pointer',
              '[&::-moz-range-thumb]:w-5',
              '[&::-moz-range-thumb]:h-5',
              '[&::-moz-range-thumb]:rounded-full',
              '[&::-moz-range-thumb]:bg-primary',
              '[&::-moz-range-thumb]:border-none'
            )}
          />
        </div>

        {/* Test sound button */}
        <button
          onClick={testSound}
          disabled={muted}
          className={cn(
            'w-full py-2 rounded-xl text-sm font-medium transition-all',
            'bg-primary/10 text-primary hover:bg-primary/20',
            muted && 'opacity-50 cursor-not-allowed'
          )}
        >
          🔊 Test Sound
        </button>
      </div>
    </div>
  );
};
