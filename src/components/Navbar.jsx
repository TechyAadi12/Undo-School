import React, { useState } from 'react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSectionClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    navigate('/');

    window.setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <nav className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.75rem] border border-slate-200/70 bg-slate-50/95 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-2xl sm:px-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-sky-500 font-bold text-white shadow-lg shadow-sky-500/20">
            EP
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 sm:text-lg">EduPathway</p>
            <p className="text-xs text-slate-500">Age-aware learning discovery</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full bg-white px-2 py-2 shadow-sm md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleSectionClick(link.id)}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition duration-300 hover:bg-white hover:text-blue-700"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
              >
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Sign up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link
              to="/dashboard"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm backdrop-blur-md transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-slate-200 bg-slate-50/95 px-4 pb-5 pt-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl md:hidden">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleSectionClick(link.id)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button type="button" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button type="button" className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                  Sign up
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Dashboard
              </Link>
              <div className="flex items-center justify-between rounded-2xl border border-white/35 bg-white px-4 py-3">
                <span className="text-sm font-medium text-slate-700">Profile</span>
                <UserButton />
              </div>
            </Show>
          </div>
        </div>
      )}
    </nav>
  );
}
