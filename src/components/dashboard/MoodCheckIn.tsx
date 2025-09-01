'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const moods = [
  { emoji: '😔', label: 'Sad' },
  { emoji: '😟', label: 'Anxious' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Okay' },
  { emoji: '😊', label: 'Happy' },
];

export function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<{ emoji: string; label: string } | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleMoodSelect = (mood: { emoji: string; label: string }) => {
    setSelectedMood(mood);
    setDialogOpen(true);
  };

  const handleLogMood = () => {
    toast({
      title: 'Mood Logged',
      description: `You've logged your mood as "${selectedMood?.label}".`,
    });
    setDialogOpen(false);
    setNote('');
    // Here you would typically save the mood and note to a database
  };

  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around items-center flex-wrap gap-4">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => handleMoodSelect(mood)}
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-all group"
                aria-label={`Select mood: ${mood.label}`}
              >
                <div className="text-4xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-200">
                  {mood.emoji}
                </div>
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              You're feeling <span className="text-primary">{selectedMood?.label.toLowerCase()}</span> {selectedMood?.emoji}
            </DialogTitle>
            <DialogDescription>
              Would you like to add a note about what's on your mind? This is optional.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g., Feeling overwhelmed with coursework..."
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleLogMood}>Log Mood</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
