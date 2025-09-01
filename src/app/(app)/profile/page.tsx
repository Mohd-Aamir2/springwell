import { MoodChart } from "@/components/profile/MoodChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, SlidersHorizontal, LogOut } from "lucide-react";
import Link from "next/link";

const appointments = [
    { id: 1, type: "Video Session", with: "Dr. Anya Sharma", date: "May 20, 2024", status: "Completed" },
    { id: 2, type: "In-Person Session", with: "Dr. Ben Carter", date: "June 5, 2024", status: "Upcoming" },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Profile & Data</h1>
        <p className="text-muted-foreground">Your personal space to track your journey.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Mood Over Last 30 Days</CardTitle>
              <CardDescription>Visualize your emotional well-being at a glance.</CardDescription>
            </CardHeader>
            <CardContent>
              <MoodChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <p className="font-semibold">I want to reduce my anxiety</p>
                    <div className="flex items-center gap-4">
                        <Progress value={75} className="w-full"/>
                        <span className="text-muted-foreground text-sm font-medium">75%</span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> 3 out of 4 weekly check-ins completed.</p>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {appointments.map((appt, index) => (
                        <li key={appt.id}>
                             <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{appt.type}</p>
                                    <p className="text-sm text-muted-foreground">with {appt.with}</p>
                                </div>
                                <p className={`text-sm font-medium ${appt.status === 'Upcoming' ? 'text-primary' : 'text-muted-foreground'}`}>{appt.status}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{appt.date}</p>
                            {index < appointments.length - 1 && <Separator className="mt-4" />}
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                 <Button variant="ghost" className="w-full justify-start gap-2">
                    <SlidersHorizontal className="h-4 w-4" /> Notification Preferences
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                    <Link href="/login">
                        <LogOut className="h-4 w-4" /> Logout
                    </Link>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
