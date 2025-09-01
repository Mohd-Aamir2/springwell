'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SendHorizonal, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'counselor';
};

const initialMessages: Message[] = [
  { id: 1, text: "You're connected to a licensed counselor from University Health Services. This chat is confidential. What's on your mind today?", sender: 'counselor' },
];

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const counselorResponse: Message = {
        id: Date.now() + 1,
        text: "Thank you for sharing that. It's completely normal to feel that way during exams. Let's talk about some strategies...",
        sender: 'counselor',
      };
      setMessages((prev) => [...prev, counselorResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-card rounded-xl shadow-lg">
       <header className="flex items-center gap-4 border-b p-3">
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <Avatar>
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Counselor</p>
            <p className="text-xs text-muted-foreground">University Health Services</p>
          </div>
       </header>
       
       <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <div
                key={message.id}
                className={cn('flex items-end gap-2', {
                    'justify-end': message.sender === 'user',
                })}
                >
                {message.sender === 'counselor' && (
                    <Avatar className="h-8 w-8">
                    <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                )}
                <div
                    className={cn('max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2', {
                    'bg-primary text-primary-foreground': message.sender === 'user',
                    'bg-muted': message.sender === 'counselor',
                    })}
                >
                    <p>{message.text}</p>
                </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-xl px-4 py-2">
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                        </div>
                    </div>
                </div>
            )}
            <div ref={endOfMessagesRef} />
       </div>

       <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                    <SendHorizonal className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </form>
       </div>
    </div>
  );
}
