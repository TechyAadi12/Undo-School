import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { sendContactEmail } from '../utils/emailService';

export default function Contact() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');

    try {
      await sendContactEmail(formData);

      setSubmitted(true);
      setFormData({
        user_name: '',
        user_email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Email error:', error);
      setSubmitError('Failed to send message. Please try again in a moment.');
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'pandeyaadi3112@gmail.com',
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+91 9621082164',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Prayagraj,India',
    },
  ];

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-950">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-700">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {info.label}
                    </h3>
                    <p className="text-slate-700">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/35 bg-white/50 p-6 shadow-xl shadow-fuchsia-950/10 backdrop-blur-md"
          >
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-white/40 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200/60"
            />

            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              placeholder="Your email"
              className="w-full rounded-xl border border-white/40 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200/60"
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full rounded-xl border border-white/40 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200/60"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Your message..."
              className="w-full rounded-xl border border-white/40 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200/60"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-fuchsia-500 to-orange-400 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-950/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {submitted && (
              <div className="rounded-xl bg-emerald-100 p-4 text-center text-emerald-800">
                Message sent successfully!
              </div>
            )}

            {submitError && (
              <div className="rounded-xl bg-rose-100 p-4 text-center text-rose-700">
                {submitError}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
