import React, { useEffect, useState } from 'react';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { icon: FiFacebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/80 bg-slate-100 px-6 py-8 text-slate-900 shadow-2xl shadow-slate-900/10 backdrop-blur-lg">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-sky-500 text-sm font-bold text-white">
                EP
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">EduPathway</p>
                <p className="text-sm text-slate-600">Find the right course. Keep learning with clarity.</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              A guided discovery experience for learners and families who want more confidence before choosing the next course.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition duration-300 hover:-translate-y-1 hover:bg-slate-900 hover:text-cyan-300"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            <p className="text-sm text-slate-600">
              © 2026 EduPathway. Built for thoughtful learning discovery.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-sky-500 text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        style={{
          opacity: showScrollButton ? 1 : 0,
          pointerEvents: showScrollButton ? 'auto' : 'none',
        }}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </footer>
  );
}
