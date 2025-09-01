import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const animals = [
  "Panda", "Sunflower", "Koala", "Maple", "Otter", "Willow", "Fox", "Fern",
  "Penguin", "River", "Hedgehog", "Cloud", "Owl", "Stone", "Rabbit", "Moon"
];
const animalEmojis: { [key: string]: string } = {
  Panda: '🐼', Sunflower: '🌻', Koala: '🐨', Maple: '🍁', Otter: '🦦', Willow: '🌿',
  Fox: '🦊', Fern: '🌿', Penguin: '🐧', River: '🏞️', Hedgehog: '🦔', Cloud: '☁️',
  Owl: '🦉', Stone: '🪨', Rabbit: '🐰', Moon: '🌙'
};

export function getAnonymousUser() {
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return {
    name: `Anonymous ${animal}`,
    avatar: animalEmojis[animal] || '👤'
  };
}
