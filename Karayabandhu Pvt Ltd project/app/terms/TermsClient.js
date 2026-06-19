"use client";

import React, { useState, useEffect } from "react";

export default function TermsOfService() {
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

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}>

      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${isDark ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-100"
        }`}>
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3 group">
            <img
              src="/logo-removebg-preview.png"
              alt="Karaya Bandhu Logo"
              className="w-15 h-15 object-contain group-hover:scale-105 transition-transform duration-300"
              style={{
                filter: isDark
                  ? "brightness(0) invert(1)"
                  : "invert(24%) sepia(85%) saturate(3088%) hue-rotate(214deg) brightness(95%) contrast(101%)"
              }}
            />
            <div className="flex flex-col">
              <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${isDark ? "text-white group-hover:text-blue-400" : "text-slate-900 group-hover:text-blue-600"
                }`}>
                Karaya Bandhu
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider -mt-1">
                Pvt. Ltd.
              </span>
            </div>
          </a>

          <a
            href="/"
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-300 ${isDark
                ? "text-slate-300 bg-slate-900 border-slate-800 hover:bg-slate-850 hover:text-white"
                : "text-slate-700 bg-white border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
          >
            <span>←</span>
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      {/* Spacer to push content below fixed header */}
      <div className="h-20" />

      {/* Main Document Body */}
      <main className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Title Section */}
        <div className="border-b pb-8 mb-10 transition-colors duration-300 border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/45 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
            Legal Document
          </span>
          <h1 className={`text-4xl font-bold tracking-tight mt-4 mb-2 transition-colors ${isDark ? "text-white" : "text-slate-900"
            }`}>
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400 font-mono">
            Last Updated: May 18, 2026 | Effective Date: May 18, 2026
          </p>
        </div>

        {/* Content Paragraphs */}
        <div className={`space-y-8 text-sm leading-relaxed transition-colors duration-300 ${isDark ? "text-slate-300" : "text-slate-655"
          }`}>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              1. Agreement to Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the web portals, incubator platforms, and training academies operated by Karaya Bandhu Pvt. Ltd. ("Company", "we", "our", or "us"), you agree to be bound in full by these Terms of Service ("Terms").
            </p>
            <p>
              If you do not agree to these Terms, you are prohibited from utilizing our platforms, generating compliance credentials, playing academy modules, or contracting through our portfolio brand networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              2. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise indicated, the website, portals, including code base, design systems, vector assets, logos, brand markers, training content, and LMS video materials are our proprietary property and are protected by international trademark, copyright, and intellectual property rights regulations.
            </p>
            <p>
              You are granted a limited, non-exclusive, revocable, and non-transferable license to access our informational pages and claim compliance certificates solely for partner onboarding purposes. You must not copy, reproduce, scrape, republish, or distribute our proprietary materials without explicit corporate approval.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              3. User & Partner Conduct Codes
            </h2>
            <p>
              To maintain the integrity of India's gig economy ecosystem, all partners accessing our Training Academy or portal interfaces must adhere to strict guidelines:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className={isDark ? "text-white" : "text-slate-900"}>Identity Integrity:</strong> You must provide truthful, current, and verified credentials. Falsifying identity documents immediately terminates partner standing.
              </li>
              <li>
                <strong className={isDark ? "text-white" : "text-slate-900"}>Training Interlock Compliance:</strong> Generating and claiming our Gold Seal compliance certificate requires sequential completion of all steps, checking compliance agreements in good faith, and executing proper peer safety procedures.
              </li>
              <li>
                <strong className={isDark ? "text-white" : "text-slate-900"}>Safe Operations:</strong> Any behavior violating professional etiquette, consumer safety, transparent billing guidelines, or operational norms will lead to instant account deactivation.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              4. Disclaimer of Warranties
            </h2>
            <p>
              The website, SaaS telemetry dashboards, and partner training courses are served on an "AS-IS" and "AS-AVAILABLE" basis. We disclaim all warranties of any kind, whether express or implied, including without limitation, merchantability, suitability for a particular purpose, uptime security, or error-free rendering.
            </p>
            <p>
              We assume no responsibility or liability for third-party networks, device connectivity errors, local power breakdowns, or temporary latency in Patna Headquarters HUB servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall Karaya Bandhu Pvt. Ltd. or its board members, employees, or tech operators be liable for any direct, indirect, consequential, exemplary, incidental, or special damages, including lost profits, lost telemetry data, or training delays arising from your use of our platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              6. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms of Service and your relationship with Karaya Bandhu Pvt. Ltd. shall be governed by, and interpreted in accordance with, the laws of the Republic of India.
            </p>
            <p>
              Any legal actions, arbitration proceedings, or disputes arising from these agreements shall be resolved exclusively within the state and local courts located in <span className="font-bold text-slate-955 dark:text-white">Patna, Bihar, India</span>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              7. Amendments & Updates
            </h2>
            <p>
              We reserve the right to revise or update these Terms at any time to align with new legal statutes, startup regulations, or brand modifications. Any adjustments will take effect immediately upon being posted on our site. Your continued use of our systems implies active agreement to revised legal standards.
            </p>
          </section>

        </div>

      </main>

    </div>
  );
}
