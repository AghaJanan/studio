'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { signInWithGoogle, signOut } from '@/lib/firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function AuthButton() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    await signInWithGoogle();
    router.push('/dashboard');
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }

  if (!user) {
    return (
      <Button onClick={handleSignIn}>
        <LogIn className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
            <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
