"use client";

import React, { useState, useEffect } from "react";

export default function Header({ isDark, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Automatically close mobile menu on page scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleScroll = () => {
      setMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${isDark ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-100"
      }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo & Company Name */}
        <a href="/" className="relative flex items-center group min-h-[4.5rem]">
          <img
            src="/logo-removebg-preview.png"
            alt="Karaya Bandhu Logo"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain group-hover:scale-105 transition-transform duration-300"
            style={{
              filter: isDark
                ? "brightness(0) invert(1)"
                : "invert(24%) sepia(85%) saturate(3088%) hue-rotate(214deg) brightness(95%) contrast(101%)"
            }}
          />
          <div className="ml-16 sm:ml-20 md:ml-24 flex flex-col">
            <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${isDark ? "text-white group-hover:text-blue-400" : "text-slate-900 group-hover:text-blue-600"
              }`}>
              Karaya Bandhu
            </span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider -mt-1">
              Pvt. Ltd.
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/#about" className={`text-sm font-semibold transition-colors duration-200 ${isDark ? "text-slate-350 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"
            }`}>
            About Us
          </a>
          <a href="/#portfolio" className={`text-sm font-semibold transition-colors duration-200 ${isDark ? "text-slate-350 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"
            }`}>
            Our Brands
          </a>
          <a href="/#careers" className={`text-sm font-semibold transition-colors duration-200 ${isDark ? "text-slate-350 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"
            }`}>
            Careers
          </a>
          <a href="/press" className={`text-sm font-semibold transition-colors duration-200 ${isDark ? "text-slate-350 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"
            }`}>
            Press & Media
          </a>
        </nav>

        {/* Far Right CTA Button & Theme Switcher */}
        <div className="hidden md:flex items-center space-x-4">

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer ${isDark
              ? "bg-slate-900 text-amber-400 border border-slate-800 hover:bg-slate-850 hover:text-amber-300"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5 animate-[spin_60s_linear_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>



          {/* <a
            href="/#academy"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Partner Portal
          </a> */}
        </div>

        {/* Mobile Actions: Theme + Hamburger Menu */}
        <div className="flex md:hidden items-center space-x-2">

          {/* Mobile Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${isDark ? "bg-slate-900 text-amber-400" : "bg-slate-100 text-slate-600"
              }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors focus:outline-none ${isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-blue-600"
              }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`md:hidden border-b absolute top-20 left-0 w-full shadow-lg transition-all duration-300 ease-in-out z-50 ${
        mobileMenuOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      } ${isDark ? "bg-slate-900/95 border-slate-800 backdrop-blur-lg" : "bg-white/95 border-slate-100 backdrop-blur-lg"}`}>
        <div className="py-5 px-6 space-y-4">
          <a
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-base font-semibold py-1 transition-colors ${isDark ? "text-slate-355 hover:text-blue-400" : "text-slate-700 hover:text-blue-600"
              }`}
          >
            About Us
          </a>
          <a
            href="/#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-base font-semibold py-1 transition-colors ${isDark ? "text-slate-355 hover:text-blue-400" : "text-slate-700 hover:text-blue-600"
              }`}
          >
            Our Brands
          </a>
          <a
            href="/#careers"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-base font-semibold py-1 transition-colors ${isDark ? "text-slate-355 hover:text-blue-400" : "text-slate-700 hover:text-blue-600"
              }`}
          >
            Careers
          </a>
          <a
            href="/press"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-base font-semibold py-1 transition-colors ${isDark ? "text-slate-355 hover:text-blue-400" : "text-slate-700 hover:text-blue-600"
              }`}
          >
            Press & Media
          </a>
          <div className="flex flex-col space-y-2 pt-2">
            {/* <a
              href="/#academy"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              Partner Portal
            </a> */}
          </div>
        </div>
      </div>
    </header>
  );
}
