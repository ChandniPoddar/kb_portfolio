"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const PLAN_FEATURES = [
  "Skilled Ustaad Verified Certificate",
  "Verified Provider Badge on Your Profile",
  "Listed on the Platform",
  "Access to Customer Booking Requests",
  "Digital Work History Record",
  "Profile Visibility Across All Zones",
  "Guaranteed Digital Payments",
  "Priority Customer Support",
  "Free Training Updates",
];

const PLANS = [
  {
    id: "plan-1yr",
    duration: "1-Year Verification Plan",
    price: 99,
    label: "POPULAR",
    labelColor: "bg-blue-500",
    period: "per year",
    highlight: false,
    description:
      "Perfect for getting started. Build your reputation, receive booking requests in your zone, and grow your income steadily.",
    gradient: "from-blue-600 to-indigo-600",
    shadow: "shadow-blue-500/20",
    border: "border-blue-500/40",
    ring: "ring-blue-500/30",
  },
  {
    id: "plan-3yr",
    duration: "3-Year Verification Plan",
    price: 199,
    label: "BEST VALUE",
    labelColor: "bg-emerald-500",
    period: "for 3 years",
    highlight: true,
    description:
      "Maximum value. Lock in your verified status for 3 years, get more customers, and build a long-term digital reputation.",
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    border: "border-emerald-500/40",
    ring: "ring-emerald-500/30",
  },
];

export default function Subscription({ isDark, isUnlocked }) {
  const [mounted, setMounted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState("select"); // select | processing | awaiting
  const [providerInfo, setProviderInfo] = useState({ name: "", mobile: "" });
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Read provider info from localStorage (saved during Academy auth)
    const name = localStorage.getItem("kb-provider-partner-name") || "Verified Partner";
    const mobile = localStorage.getItem("kb-provider-partner-mobile") || "";
    setProviderInfo({ name, mobile });
  }, []);

  // When isUnlocked becomes true, scroll into view
  useEffect(() => {
    if (isUnlocked && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [isUnlocked]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setPaymentStep("select");
    setShowPayModal(true);
  };

  const handleConfirmPayment = () => {
    setPaymentStep("processing");
    setTimeout(() => {
      setPaymentStep("awaiting");
    }, 2200);
  };

  const handleCloseModal = () => {
    if (paymentStep === "awaiting") return; // Prevent closing on awaiting state
    setShowPayModal(false);
    setSelectedPlan(null);
    setPaymentStep("select");
  };

  if (!isUnlocked) return null;

  return (
    <section
      id="subscription"
      ref={sectionRef}
      className="bg-slate-950 py-24 border-t border-slate-800/60 text-white relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Congratulations Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">

          {/* Trophy / Celebration Badge */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 animate-[bounce_2s_ease-in-out_infinite]">
                <span className="text-4xl select-none">🏆</span>
              </div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 blur opacity-25 -z-10" />
              {/* Sparkle dots */}
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-300 animate-ping opacity-70" />
              <span className="absolute bottom-0 -left-2 w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
            🎉 Certification Complete
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-5 leading-tight">
            Congratulations,{" "}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              {providerInfo.name}!
            </span>
          </h2>

          <p className="text-slate-300 mt-4 text-base leading-relaxed max-w-2xl mx-auto">
            You have successfully completed the{" "}
            <span className="text-white font-semibold">Provider Learning Program</span> and passed the certification assessment.
          </p>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-xl mx-auto">
            To activate your <span className="text-emerald-400 font-semibold">Verified Provider</span> status and start receiving customer requests, please select a Platform Verification Plan.
          </p>
        </div>

        {/* ─── What's Included ─── */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 sm:p-8 mb-12 backdrop-blur-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5">
            ✦ What&apos;s Included in Every Plan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PLAN_FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3 hover:border-emerald-500/30 hover:bg-slate-800/70 transition-all duration-200 group"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-200 leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Plan Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 group cursor-pointer
                ${plan.highlight
                  ? "bg-gradient-to-br from-slate-900 to-slate-900 border-emerald-500/50 ring-1 " + plan.ring + " shadow-2xl " + plan.shadow
                  : "bg-slate-900/60 border-slate-700/60 hover:border-blue-500/40 shadow-xl"
                }`}
              onClick={() => handleSelectPlan(plan)}
            >
              {/* Label Badge */}
              <div className={`absolute -top-3 left-6 ${plan.labelColor} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg`}>
                {plan.label}
              </div>

              {/* Glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

              <div className="flex-1">
                <h3 className="text-base font-bold text-white tracking-tight mb-1">{plan.duration}</h3>

                <div className="flex items-end gap-1.5 mt-4 mb-5">
                  <span className="text-slate-400 text-lg font-bold">₹</span>
                  <span className={`text-5xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent leading-none`}>
                    {plan.price}
                  </span>
                  <span className="text-slate-400 text-sm font-medium self-end mb-1">{plan.period}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">What you get</p>
                  {["Certificate & Verified Badge", "Booking Requests in Your Zone", "Digital Profile Listing", "Guaranteed Payments"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <svg className={`w-3.5 h-3.5 flex-shrink-0 ${plan.highlight ? "text-emerald-400" : "text-blue-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleSelectPlan(plan); }}
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 
                  bg-gradient-to-r ${plan.gradient} text-white 
                  hover:opacity-90 hover:shadow-lg hover:${plan.shadow} 
                  active:scale-95 cursor-pointer group-hover:shadow-lg`}
              >
                Select This Plan — ₹{plan.price}
              </button>

              {/* Platform fee note */}
              <p className="text-[10px] text-slate-500 text-center mt-3">
                One-time platform verification fee. No recurring charges.
              </p>
            </div>
          ))}
        </div>

        {/* ─── Bottom Trust Indicators ─── */}
        <div className="text-center space-y-3">
          <p className="text-xs text-slate-500">
            🔒 Secure payment &nbsp;·&nbsp; ✅ Instant verification badge &nbsp;·&nbsp; 📄 Certificate issued immediately after payment
          </p>
          <p className="text-[11px] text-slate-600">
            After payment, your account will be reviewed by our admin team for final activation.
          </p>
        </div>
      </div>

      {/* ─── Payment Confirmation Modal ─── */}
      {mounted && showPayModal && selectedPlan && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-[480px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

            {/* Top gradient accent */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${selectedPlan.gradient}`} />

            <div className="p-8">
              {paymentStep === "select" && (
                <>
                  <div className="text-center mb-7">
                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${selectedPlan.gradient} flex items-center justify-center shadow-lg mb-4`}>
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Confirm Your Plan</h3>
                    <p className="text-sm text-slate-400 mt-1">Review your selection before proceeding to payment</p>
                  </div>

                  {/* Order summary */}
                  <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 mb-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Plan</span>
                      <span className="text-white font-bold">{selectedPlan.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Provider</span>
                      <span className="text-white font-mono text-xs">{providerInfo.name}</span>
                    </div>
                    {providerInfo.mobile && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-medium">Mobile</span>
                        <span className="text-white font-mono text-xs">+91 {providerInfo.mobile}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
                      <span className="text-slate-300 font-bold">Platform Fee</span>
                      <span className={`text-2xl font-black bg-gradient-to-r ${selectedPlan.gradient} bg-clip-text text-transparent`}>
                        ₹{selectedPlan.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center mb-5">
                    After payment, your certificate and verification badge will be issued. Your account will be activated after admin review.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirmPayment}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${selectedPlan.gradient} hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg`}
                    >
                      Pay ₹{selectedPlan.price} Now →
                    </button>
                  </div>
                </>
              )}

              {paymentStep === "processing" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin mb-6" />
                  <h3 className="text-lg font-bold text-white">Processing Payment…</h3>
                  <p className="text-sm text-slate-400 mt-2">Please wait, do not close this window.</p>
                </div>
              )}

              {paymentStep === "awaiting" && (
                <div className="text-center py-6">
                  {/* Success animation */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 blur opacity-30 animate-pulse -z-10" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">Payment Received! 🎉</h3>
                  <p className="text-sm text-slate-300 mb-4">
                    You have selected the{" "}
                    <span className="font-bold text-white">{selectedPlan.duration}</span> for{" "}
                    <span className={`font-black bg-gradient-to-r ${selectedPlan.gradient} bg-clip-text text-transparent`}>₹{selectedPlan.price}</span>.
                  </p>

                  {/* Awaiting Admin Approval Banner */}
                  <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl px-5 py-4 mb-6 text-left">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
                      <span className="text-sm font-bold text-amber-300">Awaiting Admin Approval</span>
                    </div>
                    <p className="text-xs text-amber-400/80 leading-relaxed">
                      Your registration is under review by the Karaya Bandhu admin team. Once approved, your <strong className="text-amber-300">Verified Provider Badge</strong> and full platform access will be activated automatically.
                    </p>
                    <p className="text-[11px] text-amber-500/60 mt-2">
                      You will be notified on your registered mobile number (+91 {providerInfo.mobile}) upon approval.
                    </p>
                  </div>

                  {/* What happens next */}
                  <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl px-5 py-4 text-left mb-6 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">What Happens Next</p>
                    {[
                      { icon: "✅", text: "Payment confirmed & recorded" },
                      { icon: "🔍", text: "Admin reviews your profile (24-48 hrs)" },
                      { icon: "🏅", text: "Verified badge activated on approval" },
                      { icon: "📲", text: "SMS notification sent to your mobile" },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-xs text-slate-300">
                        <span className="text-base">{icon}</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-600">
                    For support, contact us at{" "}
                    <a href="mailto:support@karayabandhu.com" className="text-blue-500 hover:underline">
                      support@karayabandhu.com
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
