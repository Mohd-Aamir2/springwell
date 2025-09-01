import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Brain, Feather, BookOpen, Wind } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const toolkitCategories = [
  {
    href: "/toolkit/breathing",
    icon: Wind,
    title: "Breathe",
    description: "Calm your nerves in 60 seconds with guided breathing.",
    image: "https://picsum.photos/600/400?random=4",
    dataAiHint: "calm sky",
  },
  {
    href: "#",
    icon: Brain,
    title: "Meditate",
    description: "Guided sessions for focus, sleep, and mindfulness.",
    image: "https://picsum.photos/600/400?random=5",
    dataAiHint: "serene landscape",
  },
  {
    href: "#",
    icon: Feather,
    title: "Journal",
    description: "Prompts for reflection, gratitude, and self-discovery.",
    image: "https://picsum.photos/600/400?random=6",
    dataAiHint: "journal pen",
  },
  {
    href: "#",
    icon: BookOpen,
    title: "Learn",
    description: "Articles on managing stress, anxiety, and building resilience.",
    image: "https://picsum.photos/600/400?random=7",
    dataAiHint: "library books",
  },
];

export default function ToolkitPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Toolkit</h1>
        <p className="text-muted-foreground">Find a tool to support you right now.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {toolkitCategories.map((category) => (
          <Link href={category.href} key={category.title}>
            <Card className="h-full overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  data-ai-hint={category.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <category.icon className="h-8 w-8 mb-2" />
                  <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
                </div>
              </div>
              <CardContent className="p-4">
                <CardDescription>{category.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
