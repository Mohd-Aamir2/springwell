import { HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-foreground", className)}>
      <HeartPulse className="h-6 w-6 text-primary" />
      <span className="font-bold text-xl font-headline">Wellspring</span>
    </div>
  );
}
