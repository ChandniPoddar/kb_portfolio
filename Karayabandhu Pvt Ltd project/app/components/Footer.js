"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 mb-12">

          {/* Col 1: Logo & Company Desc */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <a href="/" className="flex items-center space-x-3 group">
              <img
                src="/logo-removebg-preview.png"
                alt="Karaya Bandhu Logo"
                className="w-15 h-15 object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="font-bold text-base text-white tracking-tight">
                Karaya Bandhu Pvt. Ltd.
              </span>
            </a>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              An enterprise-level digital brand operator and startup incubator architecting hyper-local gig economy tools, SaaS integrations, and micro-financing rails across Indian regional centers.
            </p>

            {/* Social Media Placeholders */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.linkedin.com/company/karaya-bandhu-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-350"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">in</span>
              </a>
              <a
                href="https://x.com/karayabandhu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-400 hover:border-blue-400 transition-all duration-350"
                aria-label="Twitter"
              >
                <span className="text-xs font-bold">𝕏</span>
              </a>
              <a
                href="https://www.facebook.com/share/18UGZu19qs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-800 hover:border-blue-800 transition-all duration-350"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">f</span>
              </a>
            </div>
          </div>

          {/* Col 2: Ecosystem */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="/#portfolio" className="hover:text-blue-500 transition-colors">Consumer Platform</a>
              </li>
              <li>
                <a href="/#academy" className="hover:text-blue-500 transition-colors">Partner Academy</a>
              </li>
              <li>
                <a href="/#portfolio" className="hover:text-blue-500 transition-colors">Future Tech</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="/#about" className="hover:text-blue-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/#careers" className="hover:text-blue-500 transition-colors">Careers</a>
              </li>
              <li>
                <a href="/press" className="hover:text-blue-500 transition-colors">Press & Media</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Inquiries */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Official Inquiries
            </h4>

            <div className="space-y-3">
              {/* <div className="bg-slate-900/60 border border-slate-850 p-2.5 rounded-lg flex flex-col space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Corporate Partnerships
                </span>
                <a href="mailto:partners@karayabandhu.com" className="text-xs font-mono text-slate-300 hover:text-blue-400 truncate">
                  partners@karayabandhu.com
                </a>
              </div> */}

              <div className="bg-slate-900/60 border border-slate-850 p-2.5 rounded-lg flex flex-col space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Talent Acquisition
                </span>
                <a href="mailto:careers@karayabandhu.com" className="text-xs font-mono text-slate-300 hover:text-blue-400 truncate">
                  careers@karayabandhu.com
                </a>
              </div>

              <div className="bg-slate-900/60 border border-slate-850 p-2.5 rounded-lg flex flex-col space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  General Relations
                </span>
                <a href="mailto:info@karayabandhu.com" className="text-xs font-mono text-slate-300 hover:text-blue-400 truncate">
                  info@karayabandhu.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
          {/* Left aligned CIN & Address */}
          <div className="text-center md:text-left leading-relaxed">
            © 2026 Karaya Bandhu Pvt. Ltd. | CIN: U96908BR2026PTC083717 | Registered Office: Patna, Bihar, India.
          </div>

          {/* Right aligned Legal links */}
          <div className="flex space-x-6 text-center items-center">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
