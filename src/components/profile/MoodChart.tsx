'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';

const initialMoodData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    moodScore: 0, 
  };
});

const moodMapping: { [key: number]: { label: string, color: string } } = {
  1: { label: 'Sad', color: 'hsl(var(--chart-2))' },
  2: { label: 'Anxious', color: 'hsl(var(--chart-2))' },
  3: { label: 'Neutral', color: 'hsl(var(--muted-foreground))' },
  4: { label: 'Okay', color: 'hsl(var(--chart-1))' },
  5: { label: 'Happy', color: 'hsl(var(--chart-1))' },
};

const chartConfig = {
  moodScore: {
    label: "Mood Score",
  },
};

type MoodData = {
    date: string;
    moodScore: number;
}

export function MoodChart() {
    const [moodData, setMoodData] = useState<MoodData[]>(initialMoodData);
    
    useEffect(() => {
        setMoodData(
            Array.from({ length: 30 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (29 - i));
                return {
                    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    moodScore: Math.floor(Math.random() * 5) + 1, // 1-5 scale
                };
            })
        );
    }, []);

  return (
    <div className="h-64 w-full">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart accessibilityLayer data={moodData}>
                <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                />
                <YAxis
                    domain={[0, 5]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={(value) => moodMapping[value]?.label.charAt(0) || ''}
                    />
                <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent
                        formatter={(value, name, props) => (
                            <div className="flex flex-col">
                                <span className="font-semibold">{moodMapping[value as number]?.label}</span>
                                <span className="text-xs text-muted-foreground">{props.payload.date}</span>
                            </div>
                        )}
                    />}
                />
                <Bar dataKey="moodScore" radius={4}>
                {moodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={moodMapping[entry.moodScore]?.color || '#ccc'} />
                ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    </div>
  );
}
