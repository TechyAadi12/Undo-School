import React, { useEffect, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { sendEnrollmentEmail } from '../utils/emailService';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export default function EnrollmentModal({ course, isOpen, onClose, onEnrollmentSuccess }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setIsSubmitted(false);
      setIsLoading(false);
      setSubmitError('');
    }
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmitError('');

    try {
      await sendEnrollmentEmail({
        course,
        student: formData,
      });

      onEnrollmentSuccess?.();
      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
      }, 1600);
    } catch (error) {
      console.error('Enrollment email error:', error);
      setSubmitError('Enrollment could not be sent right now. Please try again shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-white/35 bg-white shadow-2xl shadow-slate-950/25">
        <div className="sticky top-0 flex items-center justify-between rounded-t-[2rem] border-b border-slate-100 bg-white/95 p-6 backdrop-blur-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Enrollment</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Secure your seat</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close enrollment modal"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                <FiCheck size={30} />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-900">Enrollment confirmed</h3>
              <p className="mt-2 text-sm text-slate-600">
                {course.title} has been added to your learning dashboard.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#eff6ff,#f5f3ff)] p-5">
                <p className="text-sm font-medium text-blue-700">{course.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{course.title}</h3>
                <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-600">
                  <span>{course.instructor}</span>
                  <span className="text-lg font-bold text-slate-900">${course.price}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last name"
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone number"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />

                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  <input type="checkbox" required className="mt-1 h-4 w-4 accent-blue-600" />
                  <span>
                    I agree to receive enrollment details and course updates for this learning path.
                  </span>
                </label>

                {submitError && (
                  <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing enrollment
                    </>
                  ) : (
                    <>
                      <FiCheck className="h-4 w-4" />
                      Confirm enrollment
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
