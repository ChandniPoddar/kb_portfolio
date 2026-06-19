"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Script from "next/script";

export default function Academy({ isDark }) {
  const [mounted, setMounted] = useState(false);
  const [academyModules, setAcademyModules] = useState([]);
  const [isLoadingModules, setIsLoadingModules] = useState(true);

  // Authentication & Verification States
  const [isProviderVerified, setIsProviderVerified] = useState(false);
  const [providerMobile, setProviderMobile] = useState("");
  const [providerPasskey, setProviderPasskey] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");

  // Custom dynamic partner information
  const [loggedInPartnerName, setLoggedInPartnerName] = useState("Verified Bandhu Partner");
  const [loggedInPartnerMobile, setLoggedInPartnerMobile] = useState("9876543210");

  // Academy Interactive States
  const [activeStep, setActiveStep] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isConductChecked, setIsConductChecked] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [unlockedSteps, setUnlockedSteps] = useState([1]);
  const [certGenerateAnimation, setCertGenerateAnimation] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [maxTime, setMaxTime] = useState(0);

  useEffect(() => {
    // Check if provider session was previously verified
    const savedAuth = localStorage.getItem("kb-provider-auth");
    if (savedAuth === "true") {
      setIsProviderVerified(true);
      const savedName = localStorage.getItem("kb-provider-partner-name");
      if (savedName) setLoggedInPartnerName(savedName);
      const savedMobile = localStorage.getItem("kb-provider-partner-mobile");
      if (savedMobile) setLoggedInPartnerMobile(savedMobile);
      const savedPasscode = localStorage.getItem("kb-provider-partner-passcode");
      if (savedPasscode) setProviderPasskey(savedPasscode);
    }

    // Set today's date for certificate
    const today = new Date();
    const formatted = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    setCurrentDate(formatted);

    // Load academy modules from database api
    const loadAcademyModules = async () => {
      try {
        const res = await fetch("/api/academy");
        if (res.ok) {
          const data = await res.json();
          setAcademyModules(data);
        }
      } catch (err) {
        console.error("Failed to load academy modules:", err);
      } finally {
        setIsLoadingModules(false);
      }
    };
    loadAcademyModules();

    setMounted(true);
  }, []);

  // PostMessage Event Listener for YouTube embed player states
  useEffect(() => {
    const handleYoutubeMessage = (event) => {
      if (event.origin.includes("youtube.com")) {
        try {
          const data = JSON.parse(event.data);
          // playerState === 0 is YouTube API signal for ended video
          if (data.event === "info_delivery" && data.info?.playerState === 0) {
            handleVideoEnded();
          }
        } catch (e) {
          // ignore non-JSON messages
        }
      }
    };
    window.addEventListener("message", handleYoutubeMessage);
    return () => window.removeEventListener("message", handleYoutubeMessage);
  }, [activeStep, academyModules]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    // Form verification
    if (!providerMobile.trim() || !providerPasskey.trim()) {
      setAuthError("Please fill in both fields.");
      return;
    }

    setIsAuthenticating(true);

    try {
      const res = await fetch("/api/credentials/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: providerMobile.trim(),
          passcode: providerPasskey.trim(),
        })
      });

      if (res.ok) {
        const data = await res.json();
        const nameToSave = data.name || "Verified Bandhu Partner";
        const mobileToSave = providerMobile.trim();
        const passcodeToSave = providerPasskey.trim();

        setLoggedInPartnerName(nameToSave);
        setLoggedInPartnerMobile(mobileToSave);
        setProviderPasskey(passcodeToSave);

        localStorage.setItem("kb-provider-partner-name", nameToSave);
        localStorage.setItem("kb-provider-partner-mobile", mobileToSave);
        localStorage.setItem("kb-provider-partner-passcode", passcodeToSave);
        localStorage.setItem("kb-provider-auth", "true");

        setIsProviderVerified(true);
        setAuthError("");
      } else {
        const data = await res.json().catch(() => ({}));
        setAuthError(data.error || "Invalid credentials. Verify your registered mobile and passkey.");
      }
    } catch (err) {
      console.error(err);
      setAuthError("Network error contacting credentials server.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogOut = () => {
    setIsProviderVerified(false);
    localStorage.removeItem("kb-provider-auth");
    localStorage.removeItem("kb-provider-partner-name");
    localStorage.removeItem("kb-provider-partner-mobile");
    localStorage.removeItem("kb-provider-partner-passcode");
    setProviderMobile("");
    setProviderPasskey("");
    setLoggedInPartnerName("Verified Bandhu Partner");
    setLoggedInPartnerMobile("9876543210");
    setIsVideoPlaying(false);
    setIsConductChecked(false);
    setCompletedSteps([]);
    setUnlockedSteps([1]);
    setActiveStep(1);
  };

  const handleStepClick = (stepId) => {
    if (unlockedSteps.includes(stepId)) {
      setActiveStep(stepId);
      setIsVideoPlaying(false);
      setMaxTime(0);
    }
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    setMaxTime(0);
  };

  const handleTimeUpdate = (e) => {
    const video = e.target;
    // Strict no-skipping forward check (allow up to 2 seconds buffer)
    if (video.currentTime > maxTime + 2.0) {
      video.currentTime = maxTime;
    } else {
      setMaxTime(video.currentTime);
    }
  };

  const handleVideoEnded = () => {
    setCompletedSteps((prevCompleted) => {
      if (prevCompleted.includes(activeStep)) return prevCompleted;
      const nextCompleted = [...prevCompleted, activeStep];

      const nextStepId = activeStep + 1;
      if (nextStepId <= academyModules.length) {
        setUnlockedSteps((prevUnlocked) =>
          prevUnlocked.includes(nextStepId) ? prevUnlocked : [...prevUnlocked, nextStepId]
        );

        // Auto-advance to the next video after 1 second delay
        setTimeout(() => {
          setActiveStep(nextStepId);
          setIsVideoPlaying(true);
          setMaxTime(0);
        }, 1000);
      }
      return nextCompleted;
    });
  };

  const triggerCertificateGeneration = async () => {
    setCertGenerateAnimation(true);

    // Construct the certificate claim payload
    const claimPayload = {
      id: "cert-" + Date.now(),
      name: loggedInPartnerName,
      mobile: loggedInPartnerMobile,
      passcode: providerPasskey || "KB-BANDHU-2026", // Fallback to default passkey
      claimedAt: currentDate
    };

    try {
      // POST the claim to the backend database!
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(claimPayload)
      });
      if (res.ok) {
        // Dispatch a custom event to notify other components (like Hero) that a certificate has been claimed!
        window.dispatchEvent(new Event("certificate-claimed"));
      }
    } catch (err) {
      console.error("Failed to save certificate claim to database:", err);
    }

    setTimeout(() => {
      setCertGenerateAnimation(false);
      setShowCertModal(true);
    }, 1500); // Premium animation delay
  };

  const downloadPDF = () => {
    if (typeof window === "undefined") return;

    const runDownload = (html2pdfLib) => {
      const element = document.getElementById("compliance-certificate");
      if (!element) {
        alert("Certificate element not found in viewport.");
        return;
      }

      console.log("Triggering PDF generation for partner:", loggedInPartnerName);
      try {
        const opt = {
          margin: 0.1,
          filename: `KB-Compliance-${loggedInPartnerName.replace(/\s+/g, "-")}.pdf`,
          image: { type: 'jpeg', quality: 1.0 },
          html2canvas: { scale: 2.5, useCORS: true, letterRendering: true, logging: false },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        };

        html2pdfLib().set(opt).from(element).save();
        console.log("PDF download started successfully.");
      } catch (error) {
        console.error("PDF generation failed:", error);
        alert("PDF download failed. Please click 'Print' and select 'Save as PDF' instead!");
      }
    };

    if (window.html2pdf) {
      runDownload(window.html2pdf);
    } else {
      console.log("html2pdf library not loaded yet. Dynamically loading now...");
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (window.html2pdf) {
          runDownload(window.html2pdf);
        } else {
          alert("Unable to initialize PDF engine. Please try again.");
        }
      };
      script.onerror = () => {
        alert("Failed to load PDF engine from CDN. Please check your network connection.");
      };
      document.head.appendChild(script);
    }
  };

  const renderVideoPlayer = () => {
    if (!currentModule || !currentModule.videoUrl) return null;
    const url = currentModule.videoUrl;

    // Check if YouTube URL
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

    let embedUrl = url;
    if (isYouTube) {
      if (url.includes("watch?v=")) {
        const videoId = url.split("watch?v=")[1]?.split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      const originParam = typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";

      return (
        <iframe
          src={`${embedUrl}?enablejsapi=1&origin=${originParam}`}
          title={currentModule.moduleTitle}
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }

    // Fallback: assume direct video file (like MP4)
    return (
      <video
        src={url}
        controls
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover absolute inset-0"
      />
    );
  };

  const currentModule = academyModules.find((m) => m.id === activeStep) || academyModules[0] || {};
  const progressPercent = academyModules.length > 0 ? Math.round((completedSteps.length / academyModules.length) * 100) : 0;

  return (
    <section id="academy" className="bg-slate-900 py-20 border-t border-slate-800 text-white relative overflow-hidden">
      {/* 🚀 External PDF Exporter Engine */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
        strategy="lazyOnload"
      />

      {/* Aesthetic background glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-indigo-900/15 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60">
            Partner Academy & Certification
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-4">
            Karaya Bandhu Training Academy
          </h2>
          <p className="text-slate-400 mt-3 text-sm">
            Access to our specialized LMS modules and digital compliance verification is strictly reserved for authenticated service partners ("Bandhus").
          </p>

          {/* Connected Provider Profile Badge */}
          {isProviderVerified && (
            <div className="mt-6 inline-flex items-center gap-3 bg-slate-800 border border-slate-750 px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-slate-350">Verified Partner:</span>
              <span className="text-white font-mono">{loggedInPartnerName} (+91 {loggedInPartnerMobile})</span>
              <div className="w-px h-4 bg-slate-700" />
              <button
                onClick={handleLogOut}
                className="text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
              >
                Log Out & Lock
              </button>
            </div>
          )}
        </div>

        {/* CONDITION 1: Access Gated (Lock Overlay Renders) */}
        {!isProviderVerified ? (
          <div className="max-w-[500px] mx-auto relative z-10">

            {/* Visual Glassmorphism Security Lock Card */}
            <div className="relative border border-slate-800 bg-slate-950/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex flex-col items-center">

              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 blur opacity-15 -z-10" />

              {/* Shield Icon Lock */}
              <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/35 flex items-center justify-center text-blue-500 mb-6 shadow-lg shadow-blue-500/5">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white mb-2 text-center">
                Provider Gateway Lock
              </h3>
              <p className="text-xs text-slate-400 text-center leading-relaxed mb-6">
                Please enter your registered mobile credentials and secure passkey to unlock the onboarding video timeline and generate your certificate.
              </p>

              {/* Error Alert Box */}
              {authError && (
                <div className="w-full mb-4 px-4 py-2.5 rounded-lg border border-red-900/35 bg-red-950/20 text-red-400 text-xs font-bold text-center animate-[shake_0.4s_ease-in-out]">
                  ⚠️ {authError}
                </div>
              )}

              {/* Access Form */}
              <form onSubmit={handleAuthSubmit} className="w-full space-y-4">

                {/* Mobile Input */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      maxLength={10}
                      value={providerMobile}
                      onChange={(e) => setProviderMobile(e.target.value.replace(/\D/g, ""))}
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Passkey Input */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                    Secure Access Passkey
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={providerPasskey}
                    onChange={(e) => setProviderPasskey(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full mt-2 inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  {isAuthenticating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying Partner Credentials...
                    </>
                  ) : (
                    "Verify Access & Unlock Academy"
                  )}
                </button>

              </form>



            </div>

            {/* Support Onboarding Trigger */}
            {/* <div className="text-center mt-6">
              <span className="text-xs text-slate-500">Not a registered Provider yet? </span>
              <a href="mailto:partners@karayabandhu.com?subject=Inquiry for Partner Onboarding" className="text-xs font-bold text-blue-500 hover:underline">
                Apply for Onboarding →
              </a>
            </div> */}

          </div>
        ) : isLoadingModules ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-pulse">
            {/* Left Sidebar Skeleton */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className={`h-4.5 w-1/3 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-700"}`} />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-16 rounded-xl border flex items-center p-4 ${isDark ? "bg-slate-800/30 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
                    <div className={`w-5 h-5 rounded-full mr-3 ${isDark ? "bg-slate-800" : "bg-slate-250"}`} />
                    <div className="space-y-2 flex-1">
                      <div className={`h-3 w-1/4 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-250"}`} />
                      <div className={`h-4 w-3/4 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-250"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Video Container Skeleton */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              <div className={`aspect-video w-full rounded-2xl ${isDark ? "bg-slate-800/80" : "bg-slate-200"}`} />
              <div className="space-y-3">
                <div className={`h-6 w-1/2 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
                <div className={`h-3.5 w-full rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
                <div className={`h-3.5 w-5/6 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
              </div>
            </div>
          </div>
        ) : academyModules.length === 0 ? (
          <div className="border border-dashed border-slate-800 rounded-3xl p-16 text-center">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-slate-500 mx-auto mb-4">
              🎥
            </div>
            <h3 className="text-sm font-bold text-slate-350">No Course Modules Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Please contact the platform administrator to set up your training curriculum course.
            </p>
          </div>
        ) : (

          /* CONDITION 2: Verified Partner (LMS Modules Render) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">

            {/* Left Sidebar (Width 1/3) */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">
                Training Milestones
              </span>

              <div className="space-y-3">
                {academyModules.map((mod) => {
                  const isCompleted = completedSteps.includes(mod.id);
                  const isCurrentActive = activeStep === mod.id;
                  const isLocked = !unlockedSteps.includes(mod.id);

                  return (
                    <button
                      key={mod.id}
                      disabled={isLocked}
                      onClick={() => handleStepClick(mod.id)}
                      className={`w-full flex items-start text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${isCurrentActive
                          ? "bg-slate-800/90 border-blue-500 shadow-md text-white border-l-4"
                          : isLocked
                            ? "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed"
                            : "bg-slate-800/30 border-slate-800 hover:bg-slate-855 text-slate-300 hover:text-white"
                        }`}
                    >
                      {/* Step Indicator Status Icon */}
                      <div className="mt-0.5 mr-3 flex-shrink-0">
                        {isCompleted ? (
                          // Checked Green Icon
                          <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : isLocked ? (
                          // Locked State Icon
                          <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        ) : (
                          // Active/Pending Icon
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] ${isCurrentActive ? "border-blue-400 bg-blue-500/10 text-blue-400" : "border-slate-600 text-slate-400"
                            }`}>
                            {mod.id}
                          </div>
                        )}
                      </div>

                      {/* Step Text Info */}
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider block ${isCurrentActive ? "text-blue-400" : "text-slate-400"
                          }`}>
                          Step {mod.id} {isCompleted && "(Completed)"}
                        </span>
                        <h4 className={`text-sm font-semibold tracking-tight ${isCurrentActive ? "text-white" : isLocked ? "text-slate-500 font-medium" : "text-slate-300"
                          }`}>
                          {mod.stepTitle}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Training Progress Bar */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 mt-2">
                <div className="flex items-center justify-between text-xs mb-1.5 text-slate-400">
                  <span>Course Progress</span>
                  <span className="font-bold text-white">
                    {Math.round((completedSteps.length / academyModules.length) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${(completedSteps.length / academyModules.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right Video Container (Width 2/3) */}
            <div className="lg:col-span-8 flex flex-col space-y-6">

              {/* Video Player Box */}
              <div className="relative aspect-video w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group">

                {isVideoPlaying ? (
                  // Real Interactive Video Player Container
                  <div className="absolute inset-0 bg-black">
                    {renderVideoPlayer()}
                    <button
                      onClick={() => setIsVideoPlaying(false)}
                      className="absolute top-4 right-4 z-20 bg-slate-950/85 hover:bg-slate-900 text-white rounded-full px-3 py-1.5 border border-white/10 hover:scale-105 active:scale-95 transition-all text-[11px] font-bold flex items-center gap-1 cursor-pointer shadow-lg"
                      title="Close Video Player"
                    >
                      ✕ Close Video
                    </button>
                  </div>
                ) : (
                  // Initial Video Thumbnail Overlay with Play Button
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentModule.bgTheme || "from-blue-900 to-indigo-950"} opacity-40`} />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.6)_100%)]" />

                    {/* Header info inside thumbnail */}
                    <div className="relative z-10 p-6 flex justify-between items-start">
                      <div className="px-2.5 py-0.5 rounded bg-blue-600/90 text-[10px] font-bold uppercase tracking-wider">
                        Next Module
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-300 text-xs bg-slate-900/80 px-2 py-1 rounded border border-slate-700/50">
                        <span>⌛</span>
                        <span className="font-semibold">{currentModule.duration}</span>
                      </div>
                    </div>

                    {/* Central Play Button */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                      <button
                        onClick={handlePlayVideo}
                        className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-115 active:scale-95 transition-all duration-300 group/btn"
                        aria-label="Play video"
                      >
                        <svg className="w-6 h-6 fill-white translate-x-0.5 group-hover/btn:scale-105 transition-transform" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <span className="text-xs font-semibold text-slate-300 mt-3 tracking-wide">
                        Click to Stream Module
                      </span>
                    </div>

                    {/* Title inside thumbnail */}
                    <div className="relative z-10 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                      <h4 className="text-lg font-bold text-white tracking-tight leading-snug">
                        {currentModule.moduleTitle}
                      </h4>
                      <p className="text-slate-400 text-xs font-normal mt-1.5 line-clamp-2 max-w-2xl">
                        {currentModule.desc}
                      </p>
                    </div>
                  </>
                )}

              </div>

              {/* Interactive Action Box directly below the video - only shown on the final module after the video is played */}
              {academyModules.length > 0 && activeStep === academyModules.length && completedSteps.includes(academyModules.length) && (
                <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in">
                  <div className="flex flex-col space-y-1">
                    <label className="inline-flex items-start gap-3 cursor-pointer text-slate-200 hover:text-white select-none">
                      <input
                        type="checkbox"
                        checked={isConductChecked}
                        onChange={(e) => setIsConductChecked(e.target.checked)}
                        className="mt-1 w-4.5 h-4.5 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500/20"
                      />
                      <span className="text-xs font-semibold leading-relaxed">
                        I agree to the Karaya Bandhu Code of Conduct and platform rules.
                      </span>
                    </label>
                    <p className="text-[10px] text-slate-500 pl-7.5">
                      Required to finalize partner compliance verification and activate your digital certificate portal.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      disabled={!isConductChecked || certGenerateAnimation}
                      onClick={triggerCertificateGeneration}
                      className={`w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${isConductChecked && !certGenerateAnimation
                          ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
                          : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                        }`}
                    >
                      {certGenerateAnimation ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying Modules...
                        </>
                      ) : (
                        "Generate My Official Certificate"
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}
      </div>

      {/* [Premium Certificate Modal - Rendered via React Portal directly into body to bypass nested container stacking limitations] */}
      {showCertModal && mounted && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in pointer-events-auto">
          {/* Custom style for high fidelity browser printing/vector PDF saving */}
          <style>{`
            @media print {
              body * {
                visibility: hidden !important;
              }
              #compliance-certificate, #compliance-certificate * {
                visibility: visible !important;
              }
              /* Hide close button and action buttons container during print */
              [data-html2canvas-ignore="true"], [data-html2canvas-ignore="true"] * {
                visibility: hidden !important;
                display: none !important;
              }
              #compliance-certificate {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                margin: 0 !important;
                padding: 3rem !important;
                border: 12px double #78350f !important;
                background-color: #fffbeb !important;
                box-shadow: none !important;
                transform: none !important;
              }
            }
          `}</style>

          {/* Certificate Container */}
          <div id="compliance-certificate" className="relative w-full max-w-[800px] bg-amber-50/95 border-[16px] border-amber-900/80 rounded-2xl shadow-2xl p-8 sm:p-12 text-slate-900 overflow-hidden transform scale-100 transition-all duration-300 animate-scale-up pointer-events-auto">

            {/* Ornamental Background Accents */}
            <div className="absolute inset-4 border border-amber-800/25 pointer-events-none" />
            <div className="absolute inset-8 border border-amber-800/10 pointer-events-none" />

            {/* Watermark in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03]">
              <svg width="400" height="400" className="w-[400px] h-[400px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.78-8.006-2.141" />
              </svg>
            </div>

            {/* Close Button */}
            <button
              data-html2canvas-ignore="true"
              onClick={() => setShowCertModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200/50 transition-colors z-20 cursor-pointer pointer-events-auto"
              aria-label="Close modal"
            >
              <svg width="20" height="20" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Certificate Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-6 pointer-events-auto">

              {/* Small Header */}
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-widest">
                Karaya Bandhu Training Academy
              </span>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-950 tracking-tight">
                Certificate of Platform Compliance
              </h2>

              <p className="text-xs italic text-slate-500 font-serif max-w-md">
                This is to officially recognize that the candidate has successfully completed all operational protocols, safety suites, and regulatory check-lists.
              </p>

              {/* Awardee Name */}
              <div className="w-full py-4 border-b border-amber-850/20 max-w-lg">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-900/65 block mb-1">
                  PROUDLY PRESENTED TO
                </span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 italic block">
                  {loggedInPartnerName}
                </span>
                <span className="inline-block text-[11px] font-mono font-bold text-amber-900/80 mt-2 bg-amber-900/5 px-3 py-1 rounded-md border border-amber-900/15">
                  Mobile Credential: +91 {loggedInPartnerMobile}
                </span>
              </div>

              {/* Subject Description */}
              <p className="text-sm font-medium text-slate-700 max-w-lg leading-relaxed">
                For successfully qualifying the platform standard training module, demonstrating alignment with the{" "}
                <span className="font-semibold text-slate-950">Karaya Bandhu Code of Conduct</span>, and proving core gig-work compliance.
              </p>

              {/* Date & Signatures Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center w-full pt-6 max-w-xl">

                {/* Date */}
                <div className="flex flex-col text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Issue Date
                  </span>
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    {currentDate}
                  </span>
                </div>

                {/* Seal Image (SVG Gold Seal & Company Stamp) */}
                <div className="flex justify-center my-2 sm:my-0 relative">
                  {/* Company Stamp Overlay */}
                  <img
                    src="/stamp.png"
                    alt="Company Stamp"
                    className="absolute w-28 h-auto object-contain opacity-[0.80] transform -rotate-[12deg] -translate-x-10 -translate-y-3 pointer-events-none select-none z-10"
                  />

                  <div className="relative w-18 h-18 bg-amber-600 rounded-full border-[3px] border-amber-300 flex items-center justify-center shadow-lg transform rotate-12 z-0">
                    <svg width="40" height="40" className="w-10 h-10 text-amber-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {/* Ribbon tails */}
                    <div className="absolute -bottom-2 -left-1 w-4 h-6 bg-amber-700/80 transform rotate-12 origin-top -z-10 rounded-b-sm" />
                    <div className="absolute -bottom-2 -right-1 w-4 h-6 bg-amber-700/80 transform -rotate-12 origin-top -z-10 rounded-b-sm" />
                  </div>
                </div>

                {/* Board Signature */}
                <div className="flex flex-col text-center sm:text-right space-y-1 relative items-center sm:items-end">
                  {/* Director Signature Image */}
                  <div className="h-12 w-32 flex items-center justify-center sm:justify-end mb-1">
                    <img
                      src="/signature.png"
                      alt="Director Signature"
                      className="h-12 w-auto object-contain pointer-events-none select-none"
                    />
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Authorized Signatory
                  </span>
                  <span className="text-xs font-serif font-bold text-amber-950 italic">
                    Board of Directors
                  </span>
                  <span className="text-[8px] text-slate-400 uppercase tracking-wider leading-none">
                    Karaya Bandhu Pvt. Ltd.
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div data-html2canvas-ignore="true" className="relative z-20 flex flex-col gap-4 items-center pt-6 select-none pointer-events-auto w-full">

                {/* Primary CTA — Proceed to Subscription */}
                <button
                  onClick={() => {
                    setShowCertModal(false);
                    window.dispatchEvent(new CustomEvent("proceed-to-subscription"));
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-95 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer pointer-events-auto"
                >
                  <span>🚀</span>
                  <span>Proceed to Subscription Plans</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                {/* Secondary actions */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={downloadPDF}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-1.5 pointer-events-auto"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold text-amber-900 bg-amber-900/10 hover:bg-amber-950/20 transition-colors cursor-pointer flex items-center gap-1.5 pointer-events-auto"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => setShowCertModal(false)}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer pointer-events-auto"
                  >
                    Close Window
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
