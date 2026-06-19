"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function VisionPage() {
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
    <div className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white flex flex-col transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Spacer to push content below fixed header */}
      <div className="h-20" />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Empowering<br />
              Communities Through<br />
              <span className="text-blue-600 underline decoration-blue-200 dark:decoration-blue-900 underline-offset-8">Trusted Connections</span>
            </h1>
            
            <blockquote className={`pl-6 border-l-4 border-blue-600 italic text-lg sm:text-xl leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              "To bridge the gap between service seekers and skilled professionals across India, ensuring quality, trust, and convenience in every interaction."
            </blockquote>
            
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              We believe everyone deserves access to reliable services, whether you're in a bustling metro or a quiet rural town. Our platform empowers both customers and service providers to thrive together in a safe and efficient ecosystem.
            </p>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Background blur/glow effect */}
            <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-600/20 blur-3xl rounded-full transform scale-105" />
            
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl text-white overflow-hidden">
              
              {/* Background badge icon (Watermark) */}
              <div className="absolute top-4 right-4 opacity-10 transform rotate-12 pointer-events-none">
                <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold mb-8 relative z-10">Our Vision</h2>
              
              <p className="text-lg leading-relaxed mb-12 relative z-10 text-blue-50">
                "To become India's most trusted service marketplace, where quality meets convenience, and where every service provider can build a successful career while helping communities thrive."
              </p>

              <div className="border-t border-blue-400/30 pt-6 flex items-center relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold tracking-wide">Built for India</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
