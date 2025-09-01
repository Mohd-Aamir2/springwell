import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Users, MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import { MoodCheckIn } from "@/components/dashboard/MoodCheckIn";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { PersonalizedSuggestions } from "@/components/dashboard/PersonalizedSuggestions";

const quickActions = [
  {
    href: "/toolkit",
    icon: BrainCircuit,
    title: "Toolkit",
    description: "Coping tools & exercises",
  },
  {
    href: "/community",
    icon: Users,
    title: "Community",
    description: "Connect with peers",
  },
  {
    href: "/support",
    icon: MessageSquareHeart,
    title: "Talk to Someone",
    description: "Professional support",
  },
];

const featuredResources = [
    { title: "Managing Exam Stress", type: "Article", image: "https://picsum.photos/600/400?random=1", dataAiHint: "books study" },
    { title: "5-Minute Mindful Meditation", type: "Meditation", image: "https://picsum.photos/600/400?random=2", dataAiHint: "calm meditation" },
    { title: "Campus Walk for Well-being", type: "Event", image: "https://picsum.photos/600/400?random=3", dataAiHint: "campus walk" },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-0">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Hello, Alex! 👋</h1>
        <p className="text-muted-foreground">Welcome back to your safe space.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <MoodCheckIn />

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-headline">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Card key={action.href} className="hover:shadow-md transition-shadow">
                  <Link href={action.href} className="flex flex-col h-full">
                    <CardHeader className="flex-row items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <action.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{action.description}</CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-2xl font-semibold mb-4 font-headline">Featured Today</h2>
             <Carousel opts={{ loop: true }}>
                <CarouselContent>
                    {featuredResources.map((resource, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Card className="overflow-hidden h-full flex flex-col">
                           <Image src={resource.image} alt={resource.title} width={600} height={400} className="w-full h-32 object-cover" data-ai-hint={resource.dataAiHint} />
                           <CardHeader>
                                <CardTitle className="text-base">{resource.title}</CardTitle>
                                <CardDescription>{resource.type}</CardDescription>
                           </CardHeader>
                           <CardContent className="mt-auto">
                                <Button variant="secondary" className="w-full">Explore</Button>
                           </CardContent>
                        </Card>
                    </CarouselItem>
                    ))}
                </CarouselContent>
             </Carousel>
          </section>
        </div>
        
        <div className="lg:col-span-1">
            <PersonalizedSuggestions />
        </div>
      </div>
    </div>
  );
}
