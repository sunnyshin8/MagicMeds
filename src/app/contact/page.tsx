'use client';

import { useState } from 'react';
import React from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideInUp 0.6s ease-out;
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {/* Contact Form */}
          <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-emerald-700 mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-emerald-100 border-l-4 border-emerald-600 text-emerald-700 rounded-lg animate-slide-in">
                  <p className="font-semibold">✓ Message sent successfully!</p>
                  <p className="text-sm">We'll get back to you soon at {formData.email}</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg">
                  <p className="font-semibold">✗ Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            {/* Email Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-emerald-600 font-medium">shingloo93@gmail.com</p>
                  <p className="text-sm text-gray-600 mt-1">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
                  <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-600 mt-1">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Office</h3>
                  <p className="text-gray-700 font-medium">MagicMeds Healthcare</p>
                  <p className="text-sm text-gray-600 mt-1">123 Medical Plaza, Health City, HC 12345</p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🕐</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Hours</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
                    <li>Sat: 10:00 AM - 4:00 PM</li>
                    <li>Sun: Closed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold text-emerald-700 mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How quickly will I receive a response?</h3>
              <p className="text-gray-600 text-sm">We aim to respond to all inquiries within 24 business hours.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What information should I include?</h3>
              <p className="text-gray-600 text-sm">Please provide your name, email, and a detailed description of your inquiry.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is my information secure?</h3>
              <p className="text-gray-600 text-sm">Yes, all submissions are encrypted and handled according to our privacy policy.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I schedule a consultation?</h3>
              <p className="text-gray-600 text-sm">Yes, mention your preferred time in the message and we'll arrange it with you.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}