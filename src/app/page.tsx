'use client';

import { AuthButton } from '@/components/auth-button';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-6 md:px-10 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <AuthButton />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center text-center px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="absolute top-0 -z-10 h-full w-full bg-white">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(90,94,224,0.5)] opacity-50 blur-[80px]"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter">
            Welcome to <span className="text-primary">HostelDesk</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            The simplest way to manage your hostels. Add, view, and organize all your properties from one modern, slick dashboard.
          </p>
          
          {user ? (
             <Button asChild>
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <div className="mt-4">
               <AuthButton />
            </div>
          )}
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} HostelDesk. All rights reserved.</p>
      </footer>
    </div>
  );
}
