'use client';

import { getPersonalizedResourceSuggestions, PersonalizedResourceSuggestionsInput, PersonalizedResourceSuggestionsOutput } from "@/ai/flows/personalized-resource-suggestions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

// Mock data for demonstration purposes
const mockInput: PersonalizedResourceSuggestionsInput = {
    moodTrackingHistory: [
        { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), mood: "anxious", notes: "Stressed about upcoming exams." },
        { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), mood: "sad", notes: "Feeling lonely on campus." },
        { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), mood: "anxious", notes: "Can't sleep, mind is racing." },
    ],
    usagePatterns: [
        { tool: "breathing exercise", frequency: 5 },
        { tool: "journal", frequency: 1 },
    ],
    userPreferences: ["mindfulness", "meditation"]
};


export function PersonalizedSuggestions() {
  const [suggestionsOutput, setSuggestionsOutput] = useState<PersonalizedResourceSuggestionsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const output = await getPersonalizedResourceSuggestions(mockInput);
        setSuggestionsOutput(output);
      } catch (e) {
        console.error("Error fetching personalized suggestions", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Lightbulb className="text-accent"/> For You</CardTitle>
                <CardDescription>Suggestions based on your activity.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Loading suggestions...</p>
            </CardContent>
        </Card>
    );
  }
  
  if (!suggestionsOutput || suggestionsOutput.suggestions.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Lightbulb className="text-accent"/> For You</CardTitle>
                <CardDescription>Suggestions based on your activity.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Not enough data to generate suggestions yet. Keep logging your mood to get personalized tips!</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="bg-accent/10 border-accent/30">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><Lightbulb className="text-accent"/> For You</CardTitle>
            <CardDescription>Based on your recent mood entries, here are some suggestions that might help.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {suggestionsOutput.suggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-background rounded-lg shadow-sm">
                        <p className="font-semibold">{suggestion.resourceName}</p>
                        <p className="text-xs text-muted-foreground mb-1">{suggestion.resourceType}</p>
                        <p className="text-sm">{suggestion.reason}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
  );
}
