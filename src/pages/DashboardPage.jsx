import React, { useMemo } from 'react';
import { Show, UserButton } from '@clerk/react';
import { FiArrowRight, FiBookmark, FiCompass, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CourseBrowse from '../components/CourseBrowse';
import CourseSliderSection from '../components/CourseSliderSection';
import DashboardSidebar from '../components/DashboardSidebar';
import { coursesData } from '../data/coursesData';

function OverviewStat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-[1.5rem] border border-white/40 bg-white/76 p-4 shadow-md shadow-slate-900/5 backdrop-blur-md">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  );
}

function EmptyPanel({ title, body, actionLabel }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/60 p-6 text-center shadow-sm backdrop-blur-md">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">{body}</p>
      <Link
        to="/dashboard/courses"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        {actionLabel}
        <FiArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function DashboardPage({
  section = 'dashboard',
  userName,
  userEmail,
  savedCourseIdSet,
  enrolledById,
  courseFilters,
  onFiltersChange,
  onToggleSavedCourse,
  onEnrollCourse,
  onContinueCourse,
}) {
  const enrolledCourses = useMemo(
    () =>
      coursesData
        .filter((course) => enrolledById.has(course.id))
        .map((course) => ({
          ...course,
          progress: enrolledById.get(course.id)?.progress || 0,
        }))
        .sort((a, b) => (enrolledById.get(b.id)?.progress || 0) - (enrolledById.get(a.id)?.progress || 0)),
    [enrolledById]
  );

  const savedCourses = useMemo(
    () => coursesData.filter((course) => savedCourseIdSet.has(course.id)),
    [savedCourseIdSet]
  );

  const recommendedCourses = useMemo(() => {
    const preferredCategories = courseFilters.selectedCategories || [];
    const preferredAgeGroups = courseFilters.selectedAgeGroups || [];

    return coursesData
      .filter((course) => {
        const categoryMatch =
          preferredCategories.length === 0 || preferredCategories.includes(course.category);
        const ageMatch =
          preferredAgeGroups.length === 0 || preferredAgeGroups.includes(course.ageGroup);

        return categoryMatch || ageMatch;
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }, [courseFilters.selectedAgeGroups, courseFilters.selectedCategories]);

  const renderCourseProps = (course) => {
    const enrolledState = enrolledById.get(course.id);

    return {
      isAuthenticated: true,
      isSaved: savedCourseIdSet.has(course.id),
      isEnrolled: Boolean(enrolledState),
      progress: enrolledState?.progress || 0,
      onToggleSave: onToggleSavedCourse,
      onEnroll: onEnrollCourse,
      onContinue: onContinueCourse,
    };
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <section className="rounded-[1.75rem] border border-white/45 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(37,99,235,0.88),rgba(34,211,238,0.82))] p-5 text-white shadow-xl shadow-sky-900/10 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-100">
              Learning Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">
              Pick up where you left off and keep momentum.
            </h1>
            <p className="mt-2 text-sm text-sky-50/85">
              Your filters, saved courses, and active enrollments stay in sync so you can move from discovery to progress without losing context.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm backdrop-blur-sm">
            <Show when="signed-in">
              <UserButton />
            </Show>
            <div>
              <p className="font-semibold">{userName}</p>
              <p className="text-xs text-sky-100/80">{userEmail}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <OverviewStat label="Active learning paths" value={enrolledCourses.length} icon={FiCompass} />
        <OverviewStat label="Courses saved to revisit" value={savedCourses.length} icon={FiBookmark} />
        <OverviewStat label="Preference-based picks ready" value={recommendedCourses.length} icon={FiTrendingUp} />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Continue learning</h2>
            <p className="text-sm text-slate-600">Progress is tracked locally so you can resume quickly.</p>
          </div>
          <Link to="/dashboard/courses" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
            View course library
          </Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {enrolledCourses.slice(0, 4).map((course) => (
              <div
                key={course.id}
                className="rounded-[1.5rem] border border-white/45 bg-white/78 p-4 shadow-md shadow-slate-900/5 backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                      {course.category}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold text-slate-900">{course.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {course.instructor} • {course.ageGroup}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {course.progress}% complete
                  </span>
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-500">
                    Keep going to unlock the next milestone.
                  </p>
                  <button
                    type="button"
                    onClick={() => onContinueCourse(course.id)}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Resume
                    <FiArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyPanel
            title="No active courses yet"
            body="Enroll in a course from the catalog and it will appear here with progress tracking and quick resume actions."
            actionLabel="Browse courses"
          />
        )}
      </section>

      <CourseSliderSection
        title="Recommended for you"
        subtitle="Based on the age groups and domains you explored before logging in."
        courses={recommendedCourses}
        getCourseCardProps={renderCourseProps}
        maxItems={6}
      />

      <CourseSliderSection
        title="My courses"
        subtitle="A mix of your saved picks and current enrollments."
        courses={savedCourses.length > 0 ? savedCourses : enrolledCourses}
        getCourseCardProps={renderCourseProps}
        maxItems={6}
      />
    </div>
  );

  const renderCourses = () => (
    <CourseBrowse
      compactMode
      savedCourseIdSet={savedCourseIdSet}
      enrolledById={enrolledById}
      initialFilters={courseFilters}
      onFiltersChange={onFiltersChange}
      onToggleSavedCourse={onToggleSavedCourse}
      onEnrollCourse={onEnrollCourse}
      onContinueCourse={onContinueCourse}
    />
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <section className="rounded-[1.5rem] border border-white/45 bg-white/78 p-5 shadow-md shadow-slate-900/5 backdrop-blur-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profile and preferences</h1>
            <p className="mt-2 text-sm text-slate-600">
              This area reflects what the product knows about your interests so the dashboard can stay personalized.
            </p>
          </div>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-[1.5rem] border border-white/45 bg-white/78 p-5 shadow-md shadow-slate-900/5 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-slate-900">Account</h2>
          <dl className="mt-5 space-y-4 text-sm text-slate-600">
            <div>
              <dt className="font-medium text-slate-500">Name</dt>
              <dd className="mt-1 text-base font-semibold text-slate-900">{userName}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Email</dt>
              <dd className="mt-1 text-base font-semibold text-slate-900">{userEmail}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-[1.5rem] border border-white/45 bg-white/78 p-5 shadow-md shadow-slate-900/5 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-slate-900">Learning snapshot</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Saved courses</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{savedCourseIdSet.size}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Enrolled courses</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{enrolledCourses.length}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Average completion</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {enrolledCourses.length > 0
                  ? `${Math.round(
                      enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length
                    )}%`
                  : '0%'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/45 bg-white/78 p-5 shadow-md shadow-slate-900/5 backdrop-blur-md">
        <h2 className="text-xl font-semibold text-slate-900">Saved preferences</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {(courseFilters.selectedCategories || []).map((category) => (
            <span key={category} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Domain: {category}
            </span>
          ))}
          {(courseFilters.selectedAgeGroups || []).map((ageGroup) => (
            <span key={ageGroup} className="rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
              Age: {ageGroup}
            </span>
          ))}
          {!courseFilters.selectedCategories?.length && !courseFilters.selectedAgeGroups?.length && (
            <p className="text-sm text-slate-600">
              You have not saved any filters yet. Explore the landing page and your dashboard will adapt automatically.
            </p>
          )}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f8fafc_0%,_#e0f2fe_32%,_#dbeafe_62%,_#fdf2f8_100%)] px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <DashboardSidebar userName={userName} userEmail={userEmail} />

        <main className="min-w-0">
          {section === 'dashboard' && renderOverview()}
          {section === 'courses' && renderCourses()}
          {section === 'profile' && renderProfile()}
        </main>
      </div>
    </div>
  );
}
