import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import emailjs from 'emailjs-com';

export default function Contact({ isDarkMode }) {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    try {
      await emailjs.send(
        "service_h3wu6rs",
        "template_go18kya",
        formData,
        "O0hbQoXv1DqwQrSo5"
      );

      setSubmitted(true);
      setFormData({
        user_name: '',
        user_email: '',
        subject: '',
        message: '',
      });

    } catch (error) {
      console.error("Email error:", error);
      alert("❌ Failed to send message");
    }

    setLoading(false);

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
    <section
      id="contact"
      className={`py-16 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-neutral-800' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Get In Touch
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {info.label}
                    </h3>
                    <p className={isDarkMode ? 'text-neutral-400' : 'text-gray-600'}>
                      {info.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg border"
            />

            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg border"
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full px-4 py-2 rounded-lg border"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Your message..."
              className="w-full px-4 py-2 rounded-lg border"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {submitted && (
              <div className="p-4 bg-green-100 text-green-800 text-center rounded-lg">
                ✅ Message sent successfully!
              </div>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
