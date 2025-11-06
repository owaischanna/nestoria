"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// --- Reusable FAQ Item Component (Accordion) ---
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-green-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        className="flex justify-between items-center w-full p-5 text-left bg-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <div className={`p-1 rounded-full text-white transition-colors duration-300 ${isOpen ? 'bg-red-500' : 'bg-green-600'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="p-5 pt-0 text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main FAQ Section Component ---
const FAQSection = () => {
  // Static data for the FAQ content
  const faqs = [
    {
      question: 'What Is Habisolo?',
      answer: 'Habisolo is a human-centered housing platform that connects elderly homeowners with international students and young professionals seeking affordable, meaningful accommodation in shared homes.',
    },
    {
      question: 'Is It Safe?',
      answer: 'Safety is our top priority. All users (both hosts and guests) go through a thorough ID verification process. We also offer secure payment systems and insurance options for peace of mind.',
    },
    {
      question: 'How Much Does It Cost?',
      answer: 'The cost varies based on location, room size, and duration. For students/professionals, we offer competitive, all-inclusive pricing. For hosts, listing a space is free, and we take a small, transparent service fee upon a successful match.',
    },
    {
      question: "What If There's Damage?",
      answer: "We commit to transparent insurance options and a clear protocol for handling damages. This includes a security deposit and a mediation service to ensure fair resolution for both the host and the guest.",
    },
    {
      question: 'Where Is Habisolo Available?',
      answer: 'Currently, habisolo is primarily focused on connecting communities across major cities in Spain. We are rapidly expanding and plan to launch in other European countries soon!',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          FREQUENTLY ASKED QUESTIONS (FAQ)
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;