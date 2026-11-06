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
        className="rounded-md bg-[#daa4c2] px-6 py-3 text-white shadow-sm transition-colors hover:bg-[#c88fb0]"
      >
        Sign in with Google
      </button>
    </form>
  );
}
