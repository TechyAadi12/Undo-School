import React, { useState } from 'react';
import { SignInButton } from '@clerk/react';
import { FiBookmark, FiLock, FiPlayCircle, FiShoppingCart, FiStar, FiUsers } from 'react-icons/fi';
import EnrollmentModal from './EnrollmentModal';

export default function CourseCard({
  course,
  isAuthenticated = false,
  isPreviewMode = false,
  isSaved = false,
  isEnrolled = false,
  progress = 0,
  onToggleSave,
  onEnroll,
  onContinue,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSave = () => {
    onToggleSave?.(course.id);
  };

  const handlePrimaryAction = () => {
    if (isEnrolled) {
      onContinue?.(course.id);
      return;
    }

    setIsEnrollModalOpen(true);
  };

  const ctaLabel = isAuthenticated
    ? isEnrolled
      ? 'Resume course'
      : 'Enroll now'
    : 'Login to enroll';

  const ActionButton = ({ className }) => {
    if (!isAuthenticated) {
      return (
        <SignInButton mode="modal">
          <button type="button" className={className}>
            <FiLock className="h-4 w-4" />
            {ctaLabel}
          </button>
        </SignInButton>
      );
    }

    return (
      <button type="button" onClick={handlePrimaryAction} className={className}>
        {isEnrolled ? <FiPlayCircle className="h-4 w-4" /> : <FiShoppingCart className="h-4 w-4" />}
        {ctaLabel}
      </button>
    );
  };

  return (
    <>
      <article
        className="group relative overflow-hidden rounded-[1.75rem] border border-white/45 bg-white/80 shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-900/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <img
            src={course.image}
            alt={course.title}
            className={`h-full w-full object-cover transition duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-105`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5">
            <div className="flex flex-wrap gap-2">
              {course.badge && (
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  {course.badge}
                </span>
              )}
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-md">
                {course.ageGroup}
              </span>
            </div>

            {!isPreviewMode && (
              <button
                type="button"
                onClick={handleSave}
                className={`rounded-full p-2.5 shadow-md backdrop-blur-sm transition ${
                  isSaved
                    ? 'bg-slate-900 text-white'
                    : 'bg-white/85 text-slate-700 hover:bg-white'
                }`}
                aria-label={isSaved ? 'Remove course from saved list' : 'Save course'}
              >
                <FiBookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>

          <div
            className={`absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent p-4 transition ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-full rounded-2xl border border-white/10 bg-white/15 p-3 text-white backdrop-blur-sm">
              <p className="text-sm font-semibold">Ready to start?</p>
              <p className="mt-1 text-xs text-slate-100/90">
                {isAuthenticated
                  ? 'Enroll to add this course to your dashboard and track progress.'
                  : 'Login to unlock enrollment, saved courses, and your personalized dashboard.'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3.5 p-[18px]">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {course.category}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {course.level}
            </span>
          </div>

          <div>
            <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 transition group-hover:text-blue-700">
              {course.title}
            </h3>
            <p className="mt-1.5 text-sm text-slate-600">
              By {course.instructor} • {course.duration}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <FiStar className="h-4 w-4 text-amber-400" />
              {course.rating} ({course.reviews})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiUsers className="h-4 w-4 text-slate-400" />
              {course.enrolledCount} enrolled
            </span>
          </div>

          {isEnrolled && (
            <div>
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Learning progress</span>
                <span>{progress}% complete</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
              <FiLock className="h-4 w-4" />
              Login to enroll, save courses, and unlock your learning dashboard.
            </div>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3.5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                {isPreviewMode ? 'Access' : 'Price'}
              </p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {isPreviewMode ? 'Members only' : `$${course.price}`}
              </p>
            </div>
            <ActionButton className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700" />
          </div>
        </div>
      </article>

      <EnrollmentModal
        course={course}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        onEnrollmentSuccess={() => onEnroll?.(course.id)}
      />
    </>
  );
}
