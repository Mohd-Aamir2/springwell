'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const phases = {
  inhale: { duration: 4000, text: 'Inhale...' },
  hold: { duration: 2000, text: 'Hold...' },
  exhale: { duration: 6000, text: 'Exhale...' },
};
const phaseOrder: (keyof typeof phases)[] = ['inhale', 'hold', 'exhale'];

export function BreathingExercise() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSoundOn, setSoundOn] = useState(true);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  const currentPhase = phaseOrder[currentPhaseIndex];
  const phaseInfo = phases[currentPhase];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setTimeout(() => {
        setCurrentPhaseIndex((prevIndex) => (prevIndex + 1) % phaseOrder.length);
      }, phaseInfo.duration);
    }
    return () => clearTimeout(timer);
  }, [isActive, currentPhaseIndex, phaseInfo.duration]);

  const getAnimationClass = () => {
    if (!isActive) return 'scale-50';
    switch (currentPhase) {
      case 'inhale':
        return 'scale-100';
      case 'hold':
        return 'scale-100';
      case 'exhale':
        return 'scale-50';
      default:
        return 'scale-50';
    }
  };

  const getTransitionDuration = () => {
    switch (currentPhase) {
      case 'inhale':
        return `${phases.inhale.duration}ms`;
      case 'exhale':
        return `${phases.exhale.duration}ms`;
      default:
        return '500ms';
    }
  };

  const toggleSound = useCallback(() => {
    setSoundOn(prev => !prev);
    // In a real app, you would also control an audio element here
  }, []);
  
  if (!isClient) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-blue-900/40 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div
        className={cn(
          'relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/20 flex items-center justify-center transition-transform ease-in-out',
          getAnimationClass()
        )}
        style={{ transitionDuration: getTransitionDuration() }}
      >
        <div className="absolute w-full h-full rounded-full bg-primary/30 animate-pulse" />
        <div className="z-10 text-center">
          <p className="text-2xl font-semibold text-primary-foreground">{phaseInfo.text}</p>
          <p className="text-lg text-primary-foreground/80">{phaseInfo.duration / 1000} seconds</p>
        </div>
      </div>

      <div className="absolute bottom-10 flex items-center gap-4">
        <Button size="icon" variant="ghost" onClick={() => setIsActive(!isActive)}>
          {isActive ? <Pause /> : <Play />}
          <span className="sr-only">{isActive ? 'Pause' : 'Start'}</span>
        </Button>
        <Button size="lg" variant="secondary" onClick={() => setIsActive(!isActive)}>
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button size="icon" variant="ghost" onClick={toggleSound}>
            {isSoundOn ? <Volume2 /> : <VolumeX />}
            <span className="sr-only">{isSoundOn ? 'Mute Sound' : 'Unmute Sound'}</span>
        </Button>
      </div>

      <Button size="icon" variant="ghost" onClick={() => router.back()} className="absolute top-5 right-5">
        <X />
        <span className="sr-only">Exit</span>
      </Button>
    </div>
  );
}
