"use client";

import React, { useState, useEffect } from "react";

export default function PrivacyPolicy() {
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
            Privacy Policy
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
              1. Introduction
            </h2>
            <p>
              Welcome to Karaya Bandhu Pvt. Ltd. ("Company", "we", "our", or "us"). We operate hyper-local gig economy platforms, digital brand incubators, and operational training suites. We respect your privacy and are committed to protecting your personal data in compliance with applicable information technology laws in India.
            </p>
            <p>
              This Privacy Policy explains how we collect, safeguard, use, and share your personal information when you visit our website, apply for partner compliance on our portals, stream training videos, or utilize our operational SaaS systems.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              2. Information We Collect
            </h2>
            <p>
              We collect information to provide high-quality incubational and gig infrastructure services. The categories of data we gather include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className={isDark ? "text-white" : "text-slate-900"}>Personal Identity Information:</strong> Real name, telephone numbers, mailing addresses, email addresses, and regional verified identities (e.g. Aadhar card, PAN card) for partner compliance.
              </li>
              <li>
                <strong className={isDark ? "text-white" : "text-slate-900"}>Training and Compliance Records:</strong> Milestone progress, module scores, checkbox acceptances, safety check logs, and issued compliance certificates.
              </li>
              <li>
                <strong className={isDark ? "text-white" : "text-slate-900"}>Operational Metrics & Telemetry:</strong> Connection node logs, transaction velocities, regional Patna HQ HUB telemetry, response latencies, and device specifications.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              3. How We Use Your Data
            </h2>
            <p>
              Karaya Bandhu Pvt. Ltd. uses collected information for standard operational processes, including:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>To initialize, manage, and verify partner statuses on our ecosystem platforms.</li>
              <li>To power our integrated Learning Management System (LMS) and generate verified Gold Seal compliance certificates.</li>
              <li>To coordinate talent hiring checks for applications submitted to <span className="font-mono text-blue-600 dark:text-blue-400">careers@karayabandhu.com</span>.</li>
              <li>To protect consumer safety, monitor service quality, and defend against fraudulent activities.</li>
              <li>To meet compliance thresholds set by municipal regulations in Patna, Bihar, and other regional startup jurisdictions.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              4. Data Retention & Security
            </h2>
            <p>
              We prioritize data security using advanced cloud-native architectures, encrypted SSL transmission, and strict access controls. We retain personal partner data only as long as necessary to fulfill corporate compliance, resolve disputes, and maintain active gig-worker portals.
            </p>
            <p>
              While we make every effort to protect your information, no transmission over the internet can be guaranteed 100% secure. In the event of a telemetry leak, we will notify registered accounts in compliance with regulatory mandates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              5. Your Legal Rights
            </h2>
            <p>
              Subject to local legislation, you possess several rights regarding your data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access and receive copy files of your personal information.</li>
              <li>The right to correct, supplement, or update incomplete records.</li>
              <li>The right to request absolute deletion of your credentials, subject to statutory retention exceptions.</li>
              <li>The right to withdraw compliance consent at any time (which may deactivate your partner status).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              6. Contact Us
            </h2>
            <p>
              If you have any questions, compliance queries, or complaints regarding this Privacy Policy or our telemetry data operations, please reach our administrative board directly at:
            </p>
            <div className={`p-5 rounded-xl border font-mono text-xs transition-colors ${isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
              }`}>
              <p className="font-bold text-sm mb-1.5 text-blue-600 dark:text-blue-400">Karaya Bandhu Pvt. Ltd.</p>
              <p>Attn: Data Protection Officer (DPO)</p>
              <p>Registered Office: Patna, Bihar, India</p>
              <p>Official Email: info@karayabandhu.com</p>
            </div>
          </section>

        </div>

      </main>

    </div>
  );
}
