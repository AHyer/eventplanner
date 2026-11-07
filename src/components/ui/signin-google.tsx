// src/components/ui/signin-google.tsx
// Server component: the form posts to an inline server action, so no client
// JS is needed to start the OAuth redirect.

import { signIn } from '@/auth';

export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/' });
      }}
    >
      <button
        type="submit"
        className="framed-button"
      >
        Sign in with Google
      </button>
       


    </form>
  );
}
