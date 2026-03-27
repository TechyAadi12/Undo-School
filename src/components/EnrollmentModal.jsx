import React, { useEffect, useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import { sendEnrollmentEmail } from '../utils/emailService';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export default function EnrollmentModal({ course, isOpen, onClose }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');

    try {
      await sendEnrollmentEmail({
        course,
        student: formData,
      });

      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Enrollment email error:', error);
      setSubmitError(
        'Enrollment could not be sent right now. Please try again shortly.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-neutral-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-neutral-900">Enroll in Course</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition duration-200 hover:bg-neutral-100"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="animate-fade-in py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 animate-bounce-scale items-center justify-center rounded-full bg-green-500">
                <FiCheck size={32} className="text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-neutral-900">
                Enrollment Successful!
              </h3>
              <p className="mb-4 text-neutral-600">
                Your enrollment request for {course.title} has been shared.
              </p>
              <p className="text-sm text-neutral-500">
                Check your email for the next steps.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                <h3 className="mb-2 line-clamp-2 font-semibold text-neutral-900">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-neutral-600">
                    <span className="font-medium">Instructor:</span>{' '}
                    {course.instructor}
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ${course.price}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="stagger-1">
                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-neutral-300 px-4 py-2 transition duration-200 hover:border-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div className="stagger-2">
                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-neutral-300 px-4 py-2 transition duration-200 hover:border-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="stagger-3">
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-neutral-300 px-4 py-2 transition duration-200 hover:border-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="stagger-4">
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-neutral-300 px-4 py-2 transition duration-200 hover:border-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (XXX) XXX-XXXX"
                  />
                </div>

                <div className="flex items-start gap-2 rounded-lg bg-neutral-50 p-3">
                  <input
                    type="checkbox"
                    id={`terms-${course.id}`}
                    required
                    className="mt-1 h-4 w-4 cursor-pointer accent-blue-600"
                  />
                  <label
                    htmlFor={`terms-${course.id}`}
                    className="cursor-pointer text-xs text-neutral-600"
                  >
                    I agree to the terms of service and privacy policy
                  </label>
                </div>

                {submitError && (
                  <div className="rounded-lg bg-rose-100 p-3 text-sm text-rose-700">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white transition duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:from-neutral-400 disabled:to-neutral-400 stagger-5"
                >
                  <span className="absolute inset-0 opacity-0 transition duration-200 group-hover:opacity-10 bg-white"></span>
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Sending enrollment...
                    </>
                  ) : (
                    <>
                      <FiCheck size={20} />
                      Confirm Enrollment
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-neutral-500">
                Your information is secure and will never be shared.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
