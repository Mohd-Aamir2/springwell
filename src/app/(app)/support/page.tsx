'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageCircle, Phone, Siren } from "lucide-react";
import Link from "next/link";

const supportOptions = [
  {
    href: "/support/chat",
    icon: MessageCircle,
    title: "Message a Counselor",
    description: "Chat anonymously and confidentially with a licensed professional from University Health Services.",
  },
  {
    href: "#",
    icon: Calendar,
    title: "Schedule Appointment",
    description: "Book a video or in-person session with a counselor at a time that works for you.",
  },
];

export default function SupportPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Support</h1>
        <p className="text-muted-foreground">You are not alone. Help is available.</p>
      </header>

      <div className="space-y-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="lg" className="w-full h-auto py-4 text-left justify-start gap-4">
              <Siren className="h-8 w-8" />
              <div>
                <p className="font-bold text-lg">I need urgent help now</p>
                <p className="font-normal">Access crisis support immediately</p>
              </div>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you in a crisis?</AlertDialogTitle>
              <AlertDialogDescription>
                If you are in immediate danger, please call emergency services. Here are some resources that can provide immediate help.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-4 py-4">
                <a href="tel:988" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary">
                    <Phone />
                    <div>
                        <p className="font-semibold">988 Suicide & Crisis Lifeline</p>
                        <p className="text-sm text-muted-foreground">Call or text 988 anytime in the US and Canada.</p>
                    </div>
                </a>
                 <a href="tel:123-456-7890" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary">
                    <Phone />
                    <div>
                        <p className="font-semibold">Campus Security</p>
                        <p className="text-sm text-muted-foreground">24/7 on-campus emergency support.</p>
                    </div>
                </a>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction asChild>
                <a href="tel:123-456-7890">Call Campus Security</a>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportOptions.map((option) => (
            <Link href={option.href} key={option.title}>
              <Card className="h-full hover:bg-card/95 hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
