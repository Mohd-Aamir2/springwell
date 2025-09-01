import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAnonymousUser() {
  const animals = [
    "Panda", "Sunflower", "Koala", "Maple", "Otter", "Willow", "Fox", "Fern",
    "Penguin", "River", "Hedgehog", "Cloud", "Owl", "Stone", "Rabbit", "Moon"
  ];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const animalEmojis: { [key: string]: string } = {
    Panda: '🐼', Sunflower: '🌻', Koala: '🐨', Maple: '🍁', Otter: '🦦', Willow: '🌿',
    Fox: '🦊', Fern: '🌿', Penguin: '🐧', River: '🏞️', Hedgehog: '🦔', Cloud: '☁️',
    Owl: '🦉', Stone: '🪨', Rabbit: '🐰', Moon: '🌙'
  };
  return {
    name: `Anonymous ${animal}`,
    avatar: animalEmojis[animal] || '👤'
  };
}
