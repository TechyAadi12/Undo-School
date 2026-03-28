import React from 'react';
import { ClerkLoaded, ClerkLoading, RedirectToSignIn, Show } from '@clerk/react';

export default function ProtectedRoute({ children }) {
  return (
    <>
      <ClerkLoading>
        <div className="flex min-h-screen items-center justify-center text-slate-700">
          <div className="rounded-3xl border border-white/40 bg-white/70 px-8 py-6 shadow-lg backdrop-blur-md">
            <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            <p className="text-sm font-medium">Preparing your learning dashboard...</p>
          </div>
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <Show when="signed-in">{children}</Show>
        <Show when="signed-out">
          <RedirectToSignIn />
        </Show>
      </ClerkLoaded>
    </>
  );
}
