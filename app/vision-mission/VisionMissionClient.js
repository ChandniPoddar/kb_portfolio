"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function VisionMissionClient() {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("vision"); // "vision" or "mission"
  const [activePhase, setActivePhase] = useState(0); // 0, 1, 2 for the roadmap

  // Sync theme with local storage and prefers-color-scheme
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

  // Vision Pillars
  const visionPillars = [
    {
      title: "Digital Inclusion",
      desc: "Bringing state-of-the-art consumer technology and connectivity to Tier-2 and Tier-3 cities across India.",
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      bgGlow: "from-blue-500/10 to-indigo-500/5"
    },
    {
      title: "Empowering Local Workforce",
      desc: "Transforming unorganized service professionals into certified micro-entrepreneurs with sustainable careers.",
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgGlow: "from-cyan-500/10 to-blue-500/5"
    },
    {
      title: "Regional Economic Engines",
      desc: "Catalyzing regional micro-economies by facilitating local demand-supply chains through custom frameworks.",
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bgGlow: "from-indigo-500/10 to-purple-500/5"
    }
  ];

  // Mission Pillars
  const missionPillars = [
    {
      title: "Next-Gen Marketplaces",
      desc: "Building high-performance, localized matching algorithms to connect providers and consumers in real time.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      bgGlow: "from-indigo-500/10 to-purple-500/5"
    },
    {
      title: "SaaS Compliance Layer",
      desc: "Providing instant KYC validations, secure insurance protocols, and lightning-fast digital payout gateways.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bgGlow: "from-purple-500/10 to-pink-500/5"
    },
    {
      title: "Academy & Certification",
      desc: "Powering our integrated training suite to certify workers with verifiable Gold Seal compliance status.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      bgGlow: "from-blue-500/10 to-indigo-500/5"
    }
  ];

  // Roadmap Stages
  const roadmapStages = [
    {
      title: "Phase 1: Incubate & Seed",
      subtitle: "Laying local foundations",
      desc: "Identifying structural gaps in Tier-2/3 regions, architecting lightweight marketplace MVPs, and establishing our primary regional operating hub in Patna, Bihar.",
      points: [
        "Launch hyper-local gig platforms",
        "Deploy lightweight mobile UI engines",
        "Validate compliance & KYC pipelines"
      ],
      icon: "🌱"
    },
    {
      title: "Phase 2: Train & Validate",
      subtitle: "Upskilling and trust framework",
      desc: "Scaling the Karaya Bandhu Academy (LMS), distributing verifiable Gold Seal certificates, and implementing local community compliance checks for safer gig-work.",
      points: [
        "Deploy modular LMS software suite",
        "Form partnerships for regional certification",
        "Optimize payout speed & latency checks"
      ],
      icon: "🎓"
    },
    {
      title: "Phase 3: Scale & Integrate",
      subtitle: "Connected regional clusters",
      desc: "Interlinking multiple high-growth marketplace brands with cross-platform SaaS infrastructure, providing integrated micro-finance and insurance options.",
      points: [
        "Integrate cross-brand service directories",
        "Activate high-throughput matching APIs",
        "Deploy unified dashboard for brand analytics"
      ],
      icon: "🚀"
    }
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300 ${
      isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Hide scrollbar styles for this page */}
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar {
          display: none !important;
        }
        * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />

      {/* Shared Navigation Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      {/* Spacer to push content below fixed header */}
      <div className="h-20" />

      {/* Cinematic Hero Section */}
      <section className={`relative overflow-hidden py-16 sm:py-24 border-b transition-colors duration-300 ${
        isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
      }`}>
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors ${
            isDark ? "bg-blue-950/30 border-blue-900/50 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-600"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Ecosystem Core
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650">
              Vision &amp; Mission
            </span>
          </h1>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            Architecting the digital structures, marketplaces, and trust frameworks to empower the next generation of India's distributed workforce.
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <span className={`px-4 py-2 rounded-2xl border text-xs font-bold transition-all ${
              isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-700"
            }`}>
              📍 Patna Headquarters
            </span>
            <span className={`px-4 py-2 rounded-2xl border text-xs font-bold transition-all ${
              isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-700"
            }`}>
              💼 Gig Platform SaaS
            </span>
            <span className={`px-4 py-2 rounded-2xl border text-xs font-bold transition-all ${
              isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-700"
            }`}>
              🎯 local inclusion Focus
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Interactive Area */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Toggleable Vision & Mission Deck */}
        <section className="space-y-10">
          
          {/* Deck Controller Tabs */}
          <div className="flex justify-center">
            <div className={`p-1.5 rounded-2xl flex items-center border shadow-inner ${
              isDark ? "bg-slate-900/50 border-slate-850" : "bg-slate-100 border-slate-200"
            }`}>
              <button
                onClick={() => setActiveTab("vision")}
                className={`px-6 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  activeTab === "vision"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Our Vision (Incubating Growth)
              </button>
              <button
                onClick={() => setActiveTab("mission")}
                className={`px-6 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  activeTab === "mission"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Our Mission (Scaling Infrastructure)
              </button>
            </div>
          </div>

          {/* Active Tab Panel Container */}
          <div className="relative min-h-[400px]">
            {activeTab === "vision" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fade-in">
                {/* Vision Text Block */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
                    Incubating Growth
                  </span>
                  <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                    To drive digital inclusion, economic growth, and formalized employment.
                  </h2>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    We aim to unlock the economic potential of India's Tier-2 and Tier-3 hubs. By creating a unified digital trust layer, Karaya Bandhu connects local gig workers with national-grade opportunities, reducing entry friction and establishing secure, formal channels of income.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/#portfolio"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Explore incubated startups <span>→</span>
                    </a>
                  </div>
                </div>

                {/* Vision Pillars Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-1 gap-6">
                  {visionPillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden group rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg ${
                        isDark
                          ? "bg-slate-900/40 border-slate-850 hover:bg-slate-900 hover:border-slate-800"
                          : "bg-white border-slate-200/60 hover:border-blue-200 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.bgGlow} blur-2xl opacity-75 group-hover:scale-125 transition-transform duration-500`} />
                      <div className="flex gap-4 items-start relative z-10">
                        <div className={`p-3 rounded-xl ${isDark ? "bg-slate-950/65" : "bg-slate-100"} flex-shrink-0`}>
                          {pillar.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>{pillar.title}</h3>
                          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-550"}`}>{pillar.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fade-in">
                {/* Mission Text Block */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30">
                    Scaling Infrastructure
                  </span>
                  <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                    Leveraging cutting-edge tech to build scalable marketplaces &amp; consumer solutions.
                  </h2>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Our operational framework supports gig-worker verification, low-latency transaction routing, and continuous education. By fusing mobile-first marketplaces with compliance middleware and LMS tools, we guarantee 99.9% uptime and rapid transaction speed across our network.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/#academy"
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Visit Training Academy <span>→</span>
                    </a>
                  </div>
                </div>

                {/* Mission Pillars Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-1 gap-6">
                  {missionPillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden group rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg ${
                        isDark
                          ? "bg-slate-900/40 border-slate-850 hover:bg-slate-900 hover:border-slate-800"
                          : "bg-white border-slate-200/60 hover:border-indigo-200 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.bgGlow} blur-2xl opacity-75 group-hover:scale-125 transition-transform duration-500`} />
                      <div className="flex gap-4 items-start relative z-10">
                        <div className={`p-3 rounded-xl ${isDark ? "bg-slate-950/65" : "bg-slate-100"} flex-shrink-0`}>
                          {pillar.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>{pillar.title}</h3>
                          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-555"}`}>{pillar.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Execution Roadmap Timeline */}
        <section className={`border-t pt-20 transition-colors ${isDark ? "border-slate-900" : "border-slate-200"}`}>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-full border border-blue-150 dark:border-blue-900/30">
              Ecosystem Roadmap
            </span>
            <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              From Strategy to Scale
            </h2>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Explore our structured timeline for incubating brands and building connected workforce networks across emerging markets.
            </p>
          </div>

          {/* Interactive Steps Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Step Selection Buttons */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
              {roadmapStages.map((stage, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhase(idx)}
                  className={`w-[75vw] sm:w-[45vw] lg:w-full flex-shrink-0 text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activePhase === idx
                      ? isDark
                        ? "bg-slate-900 border-blue-500 shadow-lg text-white"
                        : "bg-white border-blue-600 shadow-lg shadow-slate-100 text-slate-900"
                      : isDark
                        ? "bg-slate-900/30 border-slate-850 hover:bg-slate-900/60 text-slate-400"
                        : "bg-slate-50 border-slate-200/60 hover:bg-white hover:border-slate-300 text-slate-650"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stage.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Stage {idx + 1}</p>
                      <h3 className={`font-black text-sm transition-colors ${activePhase === idx ? (isDark ? "text-white" : "text-slate-900") : "text-slate-500"}`}>{stage.title.split(":")[1].trim()}</h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Display Pane for Active Phase */}
            <div className={`lg:col-span-8 border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
              isDark ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-200/80"
            }`}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase font-mono">
                      Current Focus Stage
                    </span>
                    <h3 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                      {roadmapStages[activePhase].title}
                    </h3>
                  </div>
                  <span className="text-3xl sm:text-4xl bg-slate-100 dark:bg-slate-950 p-3 rounded-2xl">
                    {roadmapStages[activePhase].icon}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-350" : "text-slate-600"}`}>
                  {roadmapStages[activePhase].desc}
                </p>

                {/* Key Deliverables Checkboxes */}
                <div className="space-y-3 pt-2">
                  <h4 className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-slate-450" : "text-slate-500"}`}>
                    Strategic Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {roadmapStages[activePhase].points.map((pt, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs font-semibold ${
                          isDark ? "bg-slate-950/60 border-slate-850 text-slate-300" : "bg-slate-50 border-slate-150 text-slate-700"
                        }`}
                      >
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="pt-8 border-t border-slate-800/10 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-400">
                <span>Phase Progress</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">100% Completed</span>
              </div>
            </div>

          </div>
        </section>

        {/* Shared Bottom CTA */}
        <section className={`rounded-3xl border p-8 sm:p-12 text-center relative overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-slate-900/40 border-slate-850 shadow-2xl shadow-black/20"
            : "bg-white border-slate-200/80 shadow-xl shadow-slate-100"
        }`}>
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10 max-w-2xl mx-auto">
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Empowering India's Local Economies
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              By connecting regional gig workers with next-generation digital frameworks, Karaya Bandhu builds sustainable careers and compliant startups. Learn more about our ecosystem brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href="/#portfolio"
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20"
              >
                View Incubated Brands
              </a>
              <a
                href="/#careers"
                className={`border font-bold text-xs px-6 py-3.5 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "bg-slate-950 border-slate-850 text-slate-300 hover:bg-slate-900 hover:text-white"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900"
                }`}
              >
                Explore Careers
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Shared Bottom Footer */}
      <Footer />
    </div>
  );
}
