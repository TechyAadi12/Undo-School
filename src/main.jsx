import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/react';
import App from './App';
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {clerkPublishableKey ? (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <App />
      </ClerkProvider>
    ) : (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-md">
          <h1 className="text-2xl font-bold">Clerk publishable key missing</h1>
          <p className="mt-3 text-sm text-slate-200">
            Add `VITE_CLERK_PUBLISHABLE_KEY` to your environment so EduPathway can load the visitor and dashboard experiences.
          </p>
        </div>
      </div>
    )}
  </React.StrictMode>
);
