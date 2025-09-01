'use server';

/**
 * @fileOverview This file implements the Genkit flow for providing personalized resource suggestions.
 *
 * The flow analyzes a user's mood tracking history and usage patterns to suggest relevant coping mechanisms.
 * It exports the following:
 * - `getPersonalizedResourceSuggestions` - A function that initiates the flow and returns personalized suggestions.
 * - `PersonalizedResourceSuggestionsInput` - The input type for the `getPersonalizedResourceSuggestions` function.
 * - `PersonalizedResourceSuggestionsOutput` - The return type for the `getPersonalizedResourceSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedResourceSuggestionsInputSchema = z.object({
  moodTrackingHistory: z.array(z.object({
    date: z.string().describe('Date of the mood entry (ISO format).'),
    mood: z.string().describe('Mood recorded by the user (e.g., happy, sad, anxious).'),
    notes: z.string().optional().describe('Optional notes associated with the mood entry.'),
  })).describe('History of mood tracking entries for the user.'),
  usagePatterns: z.array(z.object({
    tool: z.string().describe('Name of the tool used (e.g., breathing exercise, meditation).'),
    frequency: z.number().describe('Frequency of tool usage.'),
  })).describe('Usage patterns of different coping tools by the user.'),
  userPreferences: z.array(z.string()).optional().describe('List of user preferences, such as preferred types of coping mechanisms (e.g., mindfulness, physical activity).'),
});

export type PersonalizedResourceSuggestionsInput = z.infer<typeof PersonalizedResourceSuggestionsInputSchema>;

const PersonalizedResourceSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.object({
    resourceName: z.string().describe('Name of the suggested resource (e.g., Guided Meditation for Anxiety).'),
    resourceType: z.string().describe('Type of resource (e.g., meditation, article, exercise).'),
    reason: z.string().describe('Reason for suggesting this resource based on user data.'),
  })).describe('List of personalized resource suggestions.'),
});

export type PersonalizedResourceSuggestionsOutput = z.infer<typeof PersonalizedResourceSuggestionsOutputSchema>;

export async function getPersonalizedResourceSuggestions(input: PersonalizedResourceSuggestionsInput): Promise<PersonalizedResourceSuggestionsOutput> {
  return personalizedResourceSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedResourceSuggestionsPrompt',
  input: {schema: PersonalizedResourceSuggestionsInputSchema},
  output: {schema: PersonalizedResourceSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized coping mechanism suggestions to users based on their mood tracking history, usage patterns, and preferences.

  Analyze the following user data to provide relevant suggestions:

  Mood Tracking History:
  {{#each moodTrackingHistory}}
  - Date: {{date}}, Mood: {{mood}}, Notes: {{notes}}
  {{/each}}

  Usage Patterns:
  {{#each usagePatterns}}
  - Tool: {{tool}}, Frequency: {{frequency}}
  {{/each}}

  User Preferences:
  {{#if userPreferences}}
  {{#each userPreferences}}
  - {{this}}
  {{/each}}
  {{else}}
  - No specific preferences indicated.
  {{/if}}

  Based on this information, suggest resources that could help the user manage their mental well-being. Explain the reason for each suggestion, relating it back to the user's data.
  Ensure suggestions align with user preferences where available.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const personalizedResourceSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedResourceSuggestionsFlow',
    inputSchema: PersonalizedResourceSuggestionsInputSchema,
    outputSchema: PersonalizedResourceSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
