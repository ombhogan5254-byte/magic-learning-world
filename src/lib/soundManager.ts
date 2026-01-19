/**
 * Sound Effects Manager
 * Handles all audio playback with mute/volume controls
 * Sounds are persisted in localStorage
 */

// Sound effect frequencies and durations for Web Audio API
const SOUNDS = {
  correct: { frequencies: [523.25, 659.25, 783.99], duration: 0.15, type: 'triangle' as OscillatorType },
  wrong: { frequencies: [200, 180], duration: 0.2, type: 'sawtooth' as OscillatorType },
  click: { frequencies: [800], duration: 0.05, type: 'sine' as OscillatorType },
  complete: { frequencies: [523.25, 659.25, 783.99, 1046.5], duration: 0.2, type: 'triangle' as OscillatorType },
  levelUp: { frequencies: [392, 523.25, 659.25, 783.99, 1046.5], duration: 0.15, type: 'triangle' as OscillatorType },
  achievement: { frequencies: [523.25, 659.25, 783.99, 1046.5, 1318.5], duration: 0.25, type: 'sine' as OscillatorType },
  flip: { frequencies: [600, 800], duration: 0.08, type: 'sine' as OscillatorType },
  match: { frequencies: [440, 554.37, 659.25], duration: 0.12, type: 'triangle' as OscillatorType },
  tick: { frequencies: [1000], duration: 0.03, type: 'sine' as OscillatorType },
  countdown: { frequencies: [880, 440], duration: 0.1, type: 'square' as OscillatorType },
} as const;

type SoundType = keyof typeof SOUNDS;

const STORAGE_KEY = 'mlp_sound_settings';

interface SoundSettings {
  muted: boolean;
  volume: number; // 0 to 1
}

class SoundManager {
  private audioContext: AudioContext | null = null;
  private settings: SoundSettings;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.settings = this.loadSettings();
  }

  private loadSettings(): SoundSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return { muted: false, volume: 0.5 };
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {}
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private getContext(): AudioContext | null {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch {
        return null;
      }
    }
    // Resume if suspended (browser autoplay policies)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  play(soundType: SoundType): void {
    if (this.settings.muted || this.settings.volume === 0) return;

    const ctx = this.getContext();
    if (!ctx) return;

    const sound = SOUNDS[soundType];
    const now = ctx.currentTime;

    sound.frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = sound.type;
      oscillator.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(this.settings.volume * 0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + sound.duration + i * sound.duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(now + i * sound.duration * 0.5);
      oscillator.stop(now + (i + 1) * sound.duration + 0.1);
    });
  }

  // Play sound only if not muted - alias for readability
  playClick(): void { this.play('click'); }
  playCorrect(): void { this.play('correct'); }
  playWrong(): void { this.play('wrong'); }
  playComplete(): void { this.play('complete'); }
  playLevelUp(): void { this.play('levelUp'); }
  playAchievement(): void { this.play('achievement'); }
  playFlip(): void { this.play('flip'); }
  playMatch(): void { this.play('match'); }

  // Settings getters/setters
  isMuted(): boolean {
    return this.settings.muted;
  }

  getVolume(): number {
    return this.settings.volume;
  }

  setMuted(muted: boolean): void {
    this.settings.muted = muted;
    this.saveSettings();
  }

  toggleMute(): boolean {
    this.settings.muted = !this.settings.muted;
    this.saveSettings();
    return this.settings.muted;
  }

  setVolume(volume: number): void {
    this.settings.volume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
    // Play a click to preview volume
    if (!this.settings.muted) {
      this.play('click');
    }
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
