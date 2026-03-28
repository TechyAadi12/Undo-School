import React, { useMemo } from 'react';
import { useUser } from '@clerk/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import usePersistentState from './hooks/usePersistentState';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';

const defaultFilters = {
  searchQuery: '',
  selectedCategories: [],
  selectedAgeGroups: [],
  selectedPriceRange: null,
  selectedRating: null,
  sortBy: 'popular',
};

export default function App() {
  const { user, isSignedIn } = useUser();
  const [savedCourseIds, setSavedCourseIds] = usePersistentState(
    'undo-school-saved-courses',
    []
  );
  const [enrolledCourses, setEnrolledCourses] = usePersistentState(
    'undo-school-enrolled-courses',
    []
  );
  const [courseFilters, setCourseFilters] = usePersistentState(
    'undo-school-course-filters',
    defaultFilters
  );

  const userName =
    user?.firstName || user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Learner';
  const userEmail = user?.primaryEmailAddress?.emailAddress || 'learner@edupathway.com';

  const savedCourseIdSet = useMemo(() => new Set(savedCourseIds), [savedCourseIds]);
  const enrolledById = useMemo(
    () => new Map(enrolledCourses.map((course) => [course.courseId, course])),
    [enrolledCourses]
  );

  const handleToggleSavedCourse = (courseId) => {
    setSavedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleEnrollCourse = (courseId) => {
    setEnrolledCourses((prev) => {
      const existingCourse = prev.find((course) => course.courseId === courseId);

      if (existingCourse) {
        return prev.map((course) =>
          course.courseId === courseId
            ? {
                ...course,
                progress: Math.min(course.progress + 12, 100),
                updatedAt: new Date().toISOString(),
              }
            : course
        );
      }

      return [
        ...prev,
        {
          courseId,
          progress: 12,
          updatedAt: new Date().toISOString(),
        },
      ];
    });
  };

  const handleContinueCourse = (courseId) => {
    setEnrolledCourses((prev) =>
      prev.map((course) =>
        course.courseId === courseId
          ? {
              ...course,
              progress: Math.min(course.progress + 8, 100),
              updatedAt: new Date().toISOString(),
            }
          : course
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LandingPage
                savedCourseIdSet={savedCourseIdSet}
                enrolledById={enrolledById}
                courseFilters={courseFilters}
                onFiltersChange={setCourseFilters}
                onToggleSavedCourse={handleToggleSavedCourse}
                onEnrollCourse={handleEnrollCourse}
                onContinueCourse={handleContinueCourse}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage
                userName={userName}
                userEmail={userEmail}
                savedCourseIdSet={savedCourseIdSet}
                enrolledById={enrolledById}
                courseFilters={courseFilters}
                onFiltersChange={setCourseFilters}
                onToggleSavedCourse={handleToggleSavedCourse}
                onEnrollCourse={handleEnrollCourse}
                onContinueCourse={handleContinueCourse}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/courses"
          element={
            <ProtectedRoute>
              <DashboardPage
                section="courses"
                userName={userName}
                userEmail={userEmail}
                savedCourseIdSet={savedCourseIdSet}
                enrolledById={enrolledById}
                courseFilters={courseFilters}
                onFiltersChange={setCourseFilters}
                onToggleSavedCourse={handleToggleSavedCourse}
                onEnrollCourse={handleEnrollCourse}
                onContinueCourse={handleContinueCourse}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <DashboardPage
                section="profile"
                userName={userName}
                userEmail={userEmail}
                savedCourseIdSet={savedCourseIdSet}
                enrolledById={enrolledById}
                courseFilters={courseFilters}
                onFiltersChange={setCourseFilters}
                onToggleSavedCourse={handleToggleSavedCourse}
                onEnrollCourse={handleEnrollCourse}
                onContinueCourse={handleContinueCourse}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
