import React from 'react';
import { SignInButton } from '@clerk/react';
import { FiArrowRight } from 'react-icons/fi';
import bgImage from '../assets/hero.jpg';

export default function Hero() {
  return (
    <section id="home" className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto flex min-h-[28rem] max-w-7xl items-end overflow-hidden rounded-[2.5rem] border border-white/25 bg-slate-900 shadow-2xl shadow-slate-900/15 md:min-h-[34rem]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,23,42,0.78),rgba(15,23,42,0.34),rgba(15,23,42,0.16))]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,rgba(15,23,42,0.58),transparent)]" />

        <div className="relative z-10 w-full px-6 py-10 sm:px-10 sm:py-12 lg:max-w-3xl lg:px-14 lg:py-16">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-md sm:text-sm">
            EduPathway
          </p>

          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Find the right course with more clarity and confidence.
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-slate-100/90 sm:text-base lg:text-lg">
            Explore age-appropriate learning paths, discover trusted programs, and step into a focused dashboard experience once you sign in.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SignInButton mode="modal">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-950/15 transition duration-300 hover:-translate-y-1 hover:bg-slate-100"
              >
                Start now
                <FiArrowRight className="h-4 w-4" />
              </button>
            </SignInButton>

            <button
              type="button"
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/18"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
