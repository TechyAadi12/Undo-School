import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CourseCard from './CourseCard';

export default function CourseSliderSection({
  title,
  subtitle,
  courses,
  maxItems = 6,
  getCourseCardProps = () => ({}),
}) {
  const scrollContainer = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainer.current) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    checkScroll();

    const container = scrollContainer.current;

    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }

      window.removeEventListener('resize', checkScroll);
    };
  }, [courses]);

  const scroll = (direction) => {
    if (!scrollContainer.current) {
      return;
    }

    scrollContainer.current.scrollBy({
      left: direction === 'left' ? -380 : 380,
      behavior: 'smooth',
    });
  };

  if (!courses.length) {
    return null;
  }

  return (
    <section className="space-y-5">
      {title && (
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="relative">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2.5 text-slate-700 shadow-lg shadow-slate-900/10 transition hover:bg-slate-50"
            aria-label="Scroll courses left"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div ref={scrollContainer} className="no-scrollbar flex gap-5 overflow-x-auto pb-2">
          {courses.slice(0, maxItems).map((course) => (
            <div key={course.id} className="w-[19rem] min-w-[19rem] sm:w-[19.5rem] sm:min-w-[19.5rem]">
              <CourseCard course={course} {...getCourseCardProps(course)} />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2.5 text-slate-700 shadow-lg shadow-slate-900/10 transition hover:bg-slate-50"
            aria-label="Scroll courses right"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </section>
  );
}
