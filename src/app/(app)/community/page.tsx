'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnonymousUser } from "@/lib/utils";
import { MessageSquare, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";

type Post = {
  id: number;
  user: { name: string; avatar: string };
  title: string;
  category: string;
  replies: number;
  lastActivity: string;
};

const initialPosts: Post[] = [
  { id: 1, user: { name: "", avatar: "" }, title: "Stressed about finals?", category: "Academics", replies: 12, lastActivity: "5m ago" },
  { id: 2, user: { name: "", avatar: "" }, title: "How to make friends in lectures?", category: "Social Life", replies: 8, lastActivity: "22m ago" },
  { id: 3, user: { name: "", avatar: "" }, title: "I can't sleep, anyone else?", category: "Health & Wellness", replies: 25, lastActivity: "1h ago" },
  { id: 4, user: { name: "", avatar: "" }, title: "Feeling homesick this semester", category: "Personal", replies: 15, lastActivity: "3h ago" },
  { id: 5, user: { name: "", avatar: "" }, title: "Tips for dealing with roommate issues?", category: "Campus Life", replies: 5, lastActivity: "8h ago" },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    // We generate users on the client to avoid hydration mismatches
    setPosts(initialPosts.map(p => ({ ...p, user: getAnonymousUser() })));
  }, []);

  return (
    <div className="container mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Community Forum</h1>
          <p className="text-muted-foreground">A safe and anonymous space to share and connect.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Post
        </Button>
      </header>
      
      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id} className="hover:bg-card/95 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>in <span className="text-primary">{post.category}</span></CardDescription>
                  </div>
                   <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.replies}</span>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <span className="text-lg">{post.user.avatar}</span>
                  <span>{post.user.name}</span>
               </div>
                <span>Last reply {post.lastActivity}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
