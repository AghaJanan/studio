'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmailAndPassword, signUpWithEmailAndPassword, signInWithGoogle } from '@/lib/firebase/auth';
import { LogIn } from 'lucide-react';

const signUpSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

function GoogleSignInButton() {
    return (
      <Button variant="outline" className="w-full">
        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-72.2 72.2C297.1 114.5 273.5 104 248 104c-73.8 0-134.3 60.5-134.3 134.3s60.5 134.3 134.3 134.3c81.5 0 115.7-60.2 120.7-90.3H248.1v-64.8h239.9c3.3 18.4 5.9 37.5 5.9 58.3z"></path>
        </svg>
        Sign in with Google
      </Button>
    );
}

function AuthForm({
    children,
    onSubmit,
    isSubmitting,
    buttonText,
    submittingText,
}: {
    children: React.ReactNode;
    onSubmit: () => void;
    isSubmitting: boolean;
    buttonText: string;
    submittingText: string;
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-4 pt-4">
            {children}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? submittingText : buttonText}
            </Button>
        </form>
    )
}

export function EmailAuthDialog() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      await signUpWithEmailAndPassword(data.email, data.password);
      toast({
        title: 'Account Created!',
        description: "You've been successfully signed up.",
      });
      setOpen(false);
    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = 'Failed to sign up. Please try again.';
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Please sign in or use a different email.';
      }
      toast({
        variant: 'destructive',
        title: 'Sign Up Error',
        description: errorMessage,
      });
    }
  };

  const handleSignIn = async (data: SignInFormData) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
      toast({
        title: 'Signed In!',
        description: "Welcome back.",
      });
      setOpen(false);
    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Sign In Error',
        description: 'Invalid email or password. Please try again.',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: 'Signed In!',
        description: "Welcome back.",
      });
      setOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Sign In Error',
        description: 'Failed to sign in with Google. Please try again.',
      });
    }
  };
  
  const renderAuthForms = (form: any, handler: any, buttonText: string, submittingText: string) => (
    <>
    <Form {...form}>
      <AuthForm
        onSubmit={form.handleSubmit(handler)}
        isSubmitting={form.formState.isSubmitting}
        buttonText={buttonText}
        submittingText={submittingText}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </AuthForm>
    </Form>
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <div onClick={handleGoogleSignIn}>
        <GoogleSignInButton />
    </div>
    </>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LogIn className="mr-2 h-4 w-4" />
          Login / Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Welcome to HostelDesk</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one to get started.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            {renderAuthForms(signInForm, handleSignIn, 'Sign In', 'Signing In...')}
          </TabsContent>
          <TabsContent value="signup">
            {renderAuthForms(signUpForm, handleSignUp, 'Create Account', 'Creating Account...')}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
