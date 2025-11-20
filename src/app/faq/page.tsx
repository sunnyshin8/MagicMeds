'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is MagicMeds?",
    answer: "MagicMeds is an AI-powered healthcare assistant that provides instant, reliable answers to health-related questions. It combines advanced artificial intelligence with comprehensive medical knowledge to offer accurate health information 24/7."
  },
  {
    question: "Is MagicMeds a substitute for professional medical advice?",
    answer: "No. MagicMeds is designed to provide informational support only and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns."
  },
  {
    question: "How accurate is the information provided?",
    answer: "Our AI is trained on extensive medical databases and is regularly updated with the latest health information. However, no AI system is 100% accurate. We recommend cross-referencing critical health information with healthcare professionals."
  },
  {
    question: "Is my health information secure?",
    answer: "Yes, we employ industry-standard encryption and security measures to protect your personal and health information. Your data is never shared with third parties without explicit consent, except as required by law."
  },
  {
    question: "How do I create an account?",
    answer: "You can create an account by clicking the 'Sign Up' button on our homepage. You'll need to provide your email address and create a password. Some features may be available without an account."
  },
  {
    question: "Can I use MagicMeds on mobile devices?",
    answer: "Yes, MagicMeds is fully responsive and works on smartphones, tablets, and desktop computers. You can access our services through any modern web browser."
  },
  {
    question: "What should I do in a medical emergency?",
    answer: "For medical emergencies, always call your local emergency services (911 in the US, 112 in India) or go to the nearest hospital. MagicMeds cannot provide emergency care."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our support team via email at support@magicmeds.com or through the Support page on our website. We aim to respond within 24 hours."
  },
  {
    question: "Is there a cost to use MagicMeds?",
    answer: "MagicMeds offers both free and premium tiers. Basic health information is available for free, while advanced features and personalized health tracking may require a subscription."
  },
  {
    question: "Can I export my health data?",
    answer: "Yes, you can request your health data and export it in standard formats. Please refer to your account settings or contact our support team for assistance."
  }
];

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-emerald-50 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 text-left">{item.question}</h3>
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white border-t border-gray-200 animate-slideInDown">
          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about MagicMeds and how to get the most out of our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem key={index} item={item} index={index} />
          ))}
        </div>

        <div className="mt-12 bg-linear-to-r from-emerald-50 to-blue-50 rounded-lg p-8 border border-emerald-200 animate-slideInUp">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for? Our support team is ready to help.
          </p>
          <a 
            href="/support" 
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
