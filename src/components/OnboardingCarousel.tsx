'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BrainCircuit, MessageSquareHeart, Smile } from 'lucide-react';
import * as React from 'react';

const features = [
  {
    icon: <Smile className="h-10 w-10 text-primary" />,
    title: 'Track Your Mood',
    description: 'Quickly log how you feel and see your trends over time.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-accent" />,
    title: 'Find Peace in 5 Minutes',
    description: 'Access a toolkit of breathing exercises and guided meditations.',
  },
  {
    icon: <MessageSquareHeart className="h-10 w-10 text-primary" />,
    title: 'Connect With Support',
    description: 'Chat with professionals or join an anonymous community forum.',
  },
];

export function OnboardingCarousel() {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {features.map((feature, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
