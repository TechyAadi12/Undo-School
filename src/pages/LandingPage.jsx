import React from 'react';
import { SignInButton } from '@clerk/react';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

export default function LandingPage({
  savedCourseIdSet,
  enrolledById,
  courseFilters,
  onFiltersChange,
  onToggleSavedCourse,
  onEnrollCourse,
  onContinueCourse,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#fef3c7_0%,_#fde68a_18%,_#f9a8d4_42%,_#93c5fd_73%,_#67e8f9_100%)] text-neutral-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.26),transparent_38%,rgba(255,255,255,0.16)_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-200/25 blur-3xl" />

      <div className="relative">
        <Navbar />
        <Hero />
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-white/45 bg-white/72 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Members unlock the catalog
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                  Sign in to browse full course details, use filters, and manage enrollments.
                </h2>
                <p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
                  The landing page stays focused on discovery. After login, your dashboard reveals the full course library with age-group filters, domain filters, saved courses, and enrollment tracking.
                </p>
                <div className="mt-6">
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Sign in to view courses
                    </button>
                  </SignInButton>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-tilt rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-xl shadow-slate-900/10">
                  <p className="text-sm font-semibold text-cyan-300">After login</p>
                  <h3 className="mt-3 text-xl font-bold">Course details and filters</h3>
                  <p className="mt-2 text-sm text-slate-200">
                    Browse the full library with age-group, domain, price, and rating filters.
                  </p>
                </div>
                <div className="glass-tilt rounded-[1.75rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(239,246,255,0.9))] p-5 shadow-lg shadow-sky-500/10">
                  <p className="text-sm font-semibold text-blue-700">Dashboard access</p>
                  <h3 className="mt-3 text-xl font-bold text-slate-900">Enrollments and progress</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Track saved courses, continue learning, and manage your learning path in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
