"use client";

import React from "react";
import Link from "next/link";

// Core Values for Section 2
const coreValues = [
  {
    name: "Innovation",
    desc: "Architecting bespoke, cloud-native tech infrastructure designed for Indian regional hubs.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    name: "Integrity",
    desc: "Fostering absolute compliance, legal transparency, and safety across all platform tiers.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    name: "Local Empowerment",
    desc: "Elevating blue-collar service workers through formalized gig economies and micro-skills.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    name: "Scalability",
    desc: "Building low-latency, mass-consumer systems optimized for high throughput and rapid growth.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  }
];

export default function About({ isDark }) {
  return (
    <section id="about" className={`py-20 border-t transition-all duration-300 ${
      isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100"
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/30 dark:text-blue-400">
            Who We Are
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mt-4 transition-colors ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Building the Infrastructure for India's Future Workforce
          </h2>
          <p className={`mt-3 text-base transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Karaya Bandhu incubates tech-driven platforms that empower professionals, digitize logistics, and expand micro-finance coverage.
          </p>
        </div>

        {/* Two Distinct Cards Side-by-Side with horizontal scrolling on mobile */}
        <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-2 gap-6 md:gap-8 snap-x snap-mandatory scrollbar-none px-4 -mx-4 md:px-0 md:mx-0 mb-16">
          
          {/* Card 1: Our Vision */}
          <Link href="/vision" className={`relative group block rounded-2xl p-8 border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between w-[82vw] max-w-[335px] md:max-w-none md:w-auto flex-shrink-0 md:flex-shrink snap-center ${
            isDark 
              ? "bg-slate-900/40 hover:bg-slate-900 border-slate-800 hover:border-slate-700" 
              : "bg-slate-50/50 hover:bg-white border-slate-100 hover:border-blue-100"
          }`}>
            {/* Highlight gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>Our Vision</h3>
              <p className={`text-sm leading-relaxed transition-colors ${isDark ? "text-slate-350" : "text-slate-600"}`}>
                To drive digital inclusion, economic growth, and formalized employment across Tier-2 and Tier-3 cities in India.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-blue-650 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
              <span>INCUBATING GROWTH</span>
              <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Card 2: Our Mission */}
          <Link href="/mission" className={`relative group block rounded-2xl p-8 border shadow-sm hover:shadow-xl transition-all duration-350 overflow-hidden flex flex-col justify-between w-[82vw] max-w-[335px] md:max-w-none md:w-auto flex-shrink-0 md:flex-shrink snap-center ${
            isDark 
              ? "bg-slate-900/40 hover:bg-slate-900 border-slate-800 hover:border-slate-700" 
              : "bg-slate-50/50 hover:bg-white border-slate-100 hover:border-indigo-100"
          }`}>
            {/* Highlight gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>Our Mission</h3>
              <p className={`text-sm leading-relaxed transition-colors ${isDark ? "text-slate-350" : "text-slate-600"}`}>
                By leveraging cutting-edge technology to build scalable marketplaces, gig-economy infrastructure, and consumer tech solutions.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-indigo-655 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
              <span>SCALING INFRASTRUCTURE</span>
              <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

        </div>

        {/* Grid Highlighting Core Values */}
        <div className={`border-t pt-16 transition-colors ${isDark ? "border-slate-900" : "border-slate-100"}`}>
          <h3 className={`text-center text-xs font-bold tracking-widest uppercase mb-12 transition-colors ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}>
            Our Core Architectural Values
          </h3>
          
          <div className="flex overflow-x-auto pb-6 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 snap-x snap-mandatory scrollbar-none px-4 -mx-4 sm:px-0 sm:mx-0">
            {coreValues.map((value, index) => (
              <div key={index} className={`flex flex-col items-start p-5 rounded-xl w-[75vw] max-w-[285px] sm:max-w-none sm:w-auto flex-shrink-0 sm:flex-shrink snap-center transition-all duration-200 ${
                isDark ? "hover:bg-slate-900/50" : "hover:bg-slate-50"
              }`}>
                <div className={`p-2.5 rounded-lg mb-4 flex items-center justify-center transition-colors ${
                  isDark ? "bg-blue-950/30" : "bg-blue-50"
                }`}>
                  {value.icon}
                </div>
                <h4 className={`font-bold text-base mb-1.5 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>{value.name}</h4>
                <p className={`text-xs leading-relaxed transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
