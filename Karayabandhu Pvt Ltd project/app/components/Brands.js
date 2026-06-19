"use client";

import React from "react";



export default function Brands({ isDark }) {
  const [brandsList, setBrandsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "kb-portfolio-brands" && e.newValue) {
        const parsed = JSON.parse(e.newValue).map((b) => ({
          id: b.id,
          name: b.name,
          desc: b.desc,
          status: b.status,
          statusType: b.status.includes("Live") ? "success" : "muted",
          customerLink: b.id === "marketplace" ? "#portfolio" : null,
          partnerLink: b.id === "marketplace" ? "#academy" : null
        }));
        setBrandsList(parsed);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  React.useEffect(() => {
    const loadBrands = async () => {
      try {
        const res = await fetch("/api/brands");
        if (res.ok) {
          const data = await res.json();
          const parsed = data.map((b) => ({
            id: b.id,
            name: b.name,
            desc: b.desc,
            status: b.status,
            statusType: b.status.includes("Live") ? "success" : "muted",
            customerLink: b.id === "marketplace" ? "#portfolio" : null,
            partnerLink: b.id === "marketplace" ? "#academy" : null
          }));
          setBrandsList(parsed);
          localStorage.setItem("kb-portfolio-brands", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to load brands from API:", err);
        // Fallback to local storage
        const saved = localStorage.getItem("kb-portfolio-brands");
        if (saved) {
          const parsed = JSON.parse(saved).map((b) => ({
            id: b.id,
            name: b.name,
            desc: b.desc,
            status: b.status,
            statusType: b.status.includes("Live") ? "success" : "muted",
            customerLink: b.id === "marketplace" ? "#portfolio" : null,
            partnerLink: b.id === "marketplace" ? "#academy" : null
          }));
          setBrandsList(parsed);
        }
      } finally {
        setLoading(false);
      }
    };
    loadBrands();
  }, []);

  return (
    <section id="portfolio" className={`py-20 border-t transition-all duration-300 ${
      isDark ? "bg-slate-900 border-slate-905" : "bg-slate-50 border-slate-100"
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/30 dark:text-blue-400">
            Enterprise Brands
          </span>
          <h2 className={`text-3xl font-semibold mt-4 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
            Our Portfolio Brands
          </h2>
          <p className={`mt-3 text-sm transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            We incubate and develop targeted tech products designed to address key gaps in regional logistics, commerce, and digital financing.
          </p>
        </div>

        {/* Horizontal scroll layout on mobile, 3-Column Grid on desktop */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`p-6 min-h-[300px] border rounded-xl animate-pulse flex flex-col justify-between ${
                  isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-3.5 w-20 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`}></div>
                  <div className={`h-6 w-24 rounded-full ${isDark ? "bg-slate-800" : "bg-slate-200"}`}></div>
                </div>
                <div className="flex-1 flex flex-col justify-start space-y-3 mt-4">
                  <div className={`h-6 w-3/4 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`}></div>
                  <div className="space-y-2 pt-2">
                    <div className={`h-3.5 w-full rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`}></div>
                    <div className={`h-3.5 w-5/6 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`}></div>
                  </div>
                </div>
                <div className={`mt-6 pt-4 border-t flex justify-between ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                  <div className={`h-3.5 w-16 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`}></div>
                  <div className={`h-3.5 w-20 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-3 gap-6 md:gap-8 snap-x snap-mandatory scrollbar-none px-4 -mx-4 md:px-0 md:mx-0">
            {brandsList.map((brand) => {
              const isActive = brand.statusType === "success";

              return (
                <div
                  key={brand.id}
                  className={`relative flex flex-col justify-between p-6 min-h-[300px] w-[82vw] max-w-[310px] md:w-auto flex-shrink-0 md:flex-shrink snap-center rounded-xl transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? "bg-slate-950 border border-slate-850 hover:border-blue-900/50 shadow-md hover:shadow-2xl hover:shadow-blue-950/20 hover:-translate-y-1"
                        : "bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-1"
                      : isDark
                      ? "bg-slate-950/30 border-2 border-dashed border-slate-800 hover:bg-slate-950/50"
                      : "bg-slate-50/50 border-2 border-dashed border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      ID: {brand.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : isDark
                          ? "bg-slate-900 text-slate-400 border border-slate-800"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                      {brand.status}
                    </span>
                  </div>

                  {/* Brand Content */}
                  <div className="flex-1 flex flex-col justify-start">
                    <h3
                      className={`text-xl font-bold tracking-tight mb-2 transition-colors ${
                        isActive 
                          ? isDark ? "text-white" : "text-slate-900" 
                          : isDark ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {brand.name}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed transition-colors ${
                        isActive 
                          ? isDark ? "text-slate-400" : "text-slate-500" 
                          : isDark ? "text-slate-650" : "text-slate-400"
                      }`}
                    >
                      {brand.desc}
                    </p>
                  </div>

                  {/* Active Card Footer with Anchor Links */}
                  {isActive ? (
                    <div className={`mt-6 pt-4 border-t flex flex-wrap gap-x-6 gap-y-2 items-center justify-between text-xs transition-colors ${
                      isDark ? "border-slate-855" : "border-slate-100"
                    }`}>
                      {Array.isArray(brand.links) && brand.links.length > 0 ? (
                        brand.links.map((link, linkIdx) => (
                          <a
                            key={linkIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 group"
                          >
                            {link.name}
                            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                          </a>
                        ))
                      ) : (
                        <span className="text-slate-500 italic text-[10px]">No links configured</span>
                      )}
                    </div>
                  ) : (
                    // Under Development Cards Footer Placeholder
                    <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold select-none transition-colors ${
                      isDark ? "border-slate-855/60 text-slate-500" : "border-slate-100/60 text-slate-400"
                    }`}>
                      <span>Platform Locked</span>
                      <span>Coming Soon</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
