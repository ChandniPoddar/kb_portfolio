"use client";

import React, { useState, useEffect } from "react";

export default function Hero({ isDark }) {
  const [certCount, setCertCount] = useState(0);
  const [brands, setBrands] = useState([]);
  const [brandsError, setBrandsError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch("/api/certificates");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setCertCount(data.length);
          }
        }
      } catch (err) {
        console.error("Error fetching certificate count:", err);
      }
    };

    fetchCertificates();

    // Listen for custom event to update immediately when a new certificate is generated
    const handleCertClaimed = () => {
      fetchCertificates();
    };
    window.addEventListener("certificate-claimed", handleCertClaimed);

    return () => {
      window.removeEventListener("certificate-claimed", handleCertClaimed);
    };
  }, []);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const res = await fetch("/api/brands");
        if (!res.ok) {
          throw new Error(`Unable to fetch brands: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setBrands(data);
          setBrandsError(null);
        } else {
          throw new Error("Unexpected marketplace payload");
        }
      } catch (err) {
        // Suppress console error to avoid cluttering client console
        setBrandsError("Unable to load live marketplace data.");
      }
    };

    loadBrands();
  }, []);

  const marketplaceCount = brands.length > 0 ? brands.length : certCount;
  const liveCount = brands.filter((brand) => brand.status?.toLowerCase().includes("live")).length;
  const featuredBrands = brands.length > 0 ? brands.slice(0, 4) : [];
  const formattedPartners = `${marketplaceCount}+`;
  const formattedActive = liveCount > 0 ? `${liveCount}+` : `${marketplaceCount}+`;

  return (
    <section className={`relative overflow-hidden pt-6 pb-20 lg:pt-8 lg:pb-28 transition-all duration-300 ${isDark ? "bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950" : "bg-gradient-to-b from-white via-slate-50/50 to-white"
      }`}>
      {/* Aesthetic background decorative elements */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl -z-10 transition-colors duration-300 ${isDark ? "bg-blue-950/20" : "bg-blue-100/30"
        }`} />
      <div className={`absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl -z-10 transition-colors duration-300 ${isDark ? "bg-indigo-950/25" : "bg-indigo-100/40"
        }`} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

            {/* Top Pill Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors duration-300 ${isDark
              ? "bg-blue-950/30 border-blue-900/50 text-blue-400"
              : "bg-blue-50 border-blue-100 text-blue-600 animate-pulse"
              }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Gig Economy Ecosystem
            </div>

            {/* Main Heading */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"
              }`}>
              Empowering India’s Digital Economy Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Innovative Platforms.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className={`text-lg max-w-xl font-normal leading-relaxed transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-500"
              }`}>
              Karaya Bandhu Pvt. Ltd. is an incubator and operator of high-growth digital brands, connecting emerging markets with modern tech ecosystems.
            </p>
            <p className={`text-sm max-w-xl font-medium leading-relaxed transition-colors duration-300 ${isDark ? "text-slate-500" : "text-slate-600"
              }`}>
              {brands.length > 0
                ? `Live marketplace feed active: ${brands.length} incubated brands across our gig economy portfolio, including ${Math.max(0, brands.length - liveCount)} beta and launch-phase brand partners.`
                : brandsError
                ? "Unable to retrieve the live marketplace roster right now. Showing the rest of our platform overview."
                : "Loading current gig marketplace brand roster from backend..."
              }
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Explore Our Portfolio
              </a>
              {/* <a
                href="#academy"
                className={`inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold border transition-all duration-300 hover:-translate-y-0.5 ${isDark
                  ? "text-slate-300 bg-slate-900 border-slate-800 hover:bg-slate-850 hover:text-white"
                  : "text-slate-700 bg-white border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                Partner With Us
              </a> */}
            </div>

            {/* Quick Trust Badges */}
            <div className={`flex items-center space-x-6 pt-6 border-t w-full transition-colors duration-300 ${isDark ? "border-slate-850" : "border-slate-100"
              }`}>
              <div className="flex flex-col">
                <span className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>{formattedPartners}</span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Partners Onboard</span>
              </div>
              <div className={`h-8 w-px transition-colors ${isDark ? "bg-slate-805" : "bg-slate-200"}`} />
              <div className="flex flex-col">
                <span className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>99.9%</span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Ecosystem Uptime</span>
              </div>
              <div className={`h-8 w-px transition-colors ${isDark ? "bg-slate-805" : "bg-slate-200"}`} />
              <div className="flex flex-col">
                <span className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>Patna</span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Operational Hub</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Glassmorphism / Geometric Wireframe */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square">
              {/* Visual Glow behind card */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 blur opacity-25" />

              {/* Glassmorphism Interactive Portal */}
              <div className={`absolute inset-0 border shadow-2xl rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 ${isDark
                ? "bg-slate-900/85 backdrop-blur-xl border-slate-800"
                : "bg-white/70 backdrop-blur-xl border-white/80"
                }`}>

                {/* Card Header with Glowing Status */}
                <div className={`flex items-center justify-between pb-4 border-b transition-colors ${isDark ? "border-slate-800" : "border-slate-100"
                  }`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-200" : "text-slate-900"
                      }`}>
                      Gig Marketplace
                    </span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isDark ? "bg-emerald-950/50 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                    }`}>
                    99.9% Uptime
                  </span>
                </div>

                {/* Gig Platform Telemetry Area */}
                <div className={`flex-1 my-6 relative flex flex-col justify-between border rounded-xl overflow-hidden p-5 transition-colors duration-300 ${isDark
                  ? "bg-slate-950/40 border-slate-850"
                  : "bg-slate-50/50 border-slate-100"
                  }`}>

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">
                        Marketplace Roster
                      </span>
                      <p className={`mt-1 text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                        {brands.length > 0 ? `${brands.length} gig brands powered by live backend data` : brandsError ? "Marketplace feed offline" : "Fetching current brand roster..."}
                      </p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${brands.length > 0 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {brands.length > 0 ? `${liveCount} live` : "syncing"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {featuredBrands.length > 0 ? (
                      featuredBrands.map((brand) => (
                        <div key={brand.id} className={`rounded-3xl p-3 border ${isDark ? "border-slate-800 bg-slate-900/90" : "border-slate-200 bg-white/90"}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className={`font-semibold text-sm tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                                {brand.name}
                              </p>
                              <p className={`text-[11px] leading-snug ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                {brand.industry || brand.desc}
                              </p>
                            </div>
                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${brand.status?.toLowerCase().includes("live") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
                              {brand.status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={`rounded-3xl p-4 border ${isDark ? "border-slate-800 bg-slate-900/80 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-500"}`}>
                        {brandsError
                          ? "Unable to display live marketplace brands right now. Please refresh later."
                          : "No marketplace brand data available yet. New listings will appear here once the backend is synced."
                        }
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t text-[11px] text-slate-400">
                    {brands.length > 0
                      ? `${liveCount} live brands · ${Math.max(0, brands.length - liveCount)} beta / preview partners · synced from backend.`
                      : "Market data is being loaded from the backend API."
                    }
                  </div>
                </div>

                {/* Live Transaction Ticker */}
                <div className={`rounded-xl p-3 flex flex-col space-y-1 border transition-colors ${isDark ? "bg-slate-950 text-slate-100 border-slate-800" : "bg-slate-900 text-white border-transparent"
                  }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      System Feed
                    </span>
                    <span className="text-[9px] text-green-400 font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                      LIVE STREAM
                    </span>
                  </div>
                  <p className="text-[11px] font-medium font-mono text-slate-200 truncate">
                    &gt; Patna Hub: Match successful for Gig #824
                  </p>
                  <p className="text-[9px] font-mono text-slate-400">
                    Response: 12ms | Match Rate: 99.4%
                  </p>
                </div>
              </div>

              {/* Orbiting abstract dots */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600/10 rounded-full border border-blue-500/20 flex items-center justify-center text-blue-600 animate-bounce">
                ⚡
              </div>
              <div className="absolute -bottom-2 -right-4 w-16 h-16 bg-indigo-600/10 rounded-full border border-indigo-500/20 flex items-center justify-center text-indigo-600 animate-pulse">
                💼
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
