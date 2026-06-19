"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MissionPage() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("kb-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  // Sync theme with document.documentElement for global styling
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("kb-theme", nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-500 selection:text-white flex flex-col transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Spacer to push content below fixed header */}
      <div className="h-20" />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Scaling Infrastructure For<br />
              <span className="text-indigo-600 underline decoration-indigo-200 dark:decoration-indigo-900 underline-offset-8">Next-Gen Services</span>
            </h1>
            
            <blockquote className={`pl-6 border-l-4 border-indigo-600 italic text-lg sm:text-xl leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              "By leveraging cutting-edge technology to build scalable marketplaces, gig-economy infrastructure, and consumer tech solutions."
            </blockquote>
            
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Our mission is to create robust platforms that formalize the gig economy, providing tools for growth, learning, and financial stability for millions of blue-collar workers and independent professionals across India.
            </p>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Background blur/glow effect */}
            <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-600/20 blur-3xl rounded-full transform scale-105" />
            
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl text-white overflow-hidden">
              
              {/* Background badge icon (Watermark) */}
              <div className="absolute top-4 right-4 opacity-10 transform rotate-12 pointer-events-none">
                <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold mb-8 relative z-10">Our Mission</h2>
              
              <p className="text-lg leading-relaxed mb-12 relative z-10 text-indigo-50">
                "To build low-latency, mass-consumer systems optimized for high throughput and rapid growth, enabling seamless connections across all tiers of the Indian economy."
              </p>

              <div className="border-t border-indigo-400/30 pt-6 flex items-center relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-semibold tracking-wide">Empowering India</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
