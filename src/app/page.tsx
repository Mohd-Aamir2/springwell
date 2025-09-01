import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { OnboardingCarousel } from '@/components/OnboardingCarousel';
import { AppLogo } from '@/components/AppLogo';

export default function OnboardingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-blue-100 dark:to-blue-900/20">
      <header className="p-4 sm:p-6">
        <AppLogo />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground mb-4">
            Your mental well-being journey starts here.
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Discover tools and support to help you navigate student life.
          </p>
          <OnboardingCarousel />
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="p-4 text-center text-muted-foreground text-sm">
        Discreetly provided by your university.
      </footer>
    </div>
  );
}
