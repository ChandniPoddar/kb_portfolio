"use client";

import React, { useState, useEffect } from "react";

const deptStyles = {
  "Engineering & Product": {
    color: "blue",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description: "Architect modern React/Next.js/Node systems. Scalable distributed service APIs, offline sync databases, and telemetry tools."
  },
  "City Operations": {
    color: "indigo",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: "Oversee hyper-local logistics hubs, support operations, manage regional supply chain networks and local vendor relationships."
  },
  "Growth & Strategy": {
    color: "purple",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    description: "Run targeted multi-channel campaigns, lead field onboarding protocols, and direct regional strategic alliances."
  }
};

const getDeptStyle = (dept) => {
  if (deptStyles[dept]) return deptStyles[dept];
  return {
    color: "emerald",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description: `Scale operations, manage cross-functional strategic integrations, and drive local partner growth inside the ${dept} division.`
  };
};

const colorClasses = {
  blue: {
    borderLight: "hover:border-blue-200",
    borderDark: "hover:border-blue-900/30",
    iconBgLight: "bg-blue-50 text-blue-600",
    btnLight: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    btnDark: "bg-blue-950/40 text-blue-400 hover:bg-blue-950/70"
  },
  indigo: {
    borderLight: "hover:border-indigo-200",
    borderDark: "hover:border-indigo-900/30",
    iconBgLight: "bg-indigo-50 text-indigo-600",
    btnLight: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
    btnDark: "bg-indigo-950/40 text-indigo-400 hover:bg-indigo-950/70"
  },
  purple: {
    borderLight: "hover:border-purple-200",
    borderDark: "hover:border-purple-900/30",
    iconBgLight: "bg-purple-50 text-purple-600",
    btnLight: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    btnDark: "bg-purple-950/40 text-purple-400 hover:bg-purple-950/70"
  },
  emerald: {
    borderLight: "hover:border-emerald-200",
    borderDark: "hover:border-emerald-900/30",
    iconBgLight: "bg-emerald-50 text-emerald-600",
    btnLight: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
    btnDark: "bg-emerald-950/40 text-emerald-400 hover:bg-emerald-950/70"
  }
};

export default function Careers({ isDark }) {
  // Modal toggle & Active category
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "kb-job-openings" && e.newValue) {
        setJobsList(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setJobsList(data);
          localStorage.setItem("kb-job-openings", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to load jobs from backend API:", err);
        // Fallback to local storage
        const saved = localStorage.getItem("kb-job-openings");
        if (saved) setJobsList(JSON.parse(saved));
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  // Step 1: Personal Details
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");

  // Step 2: Professional Details
  const [currentTitle, setCurrentTitle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("1-3 Years");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("Immediate");

  // Step 3: Qualifications & Links
  const [skillsList, setSkillsList] = useState("");
  const [applicantLink, setApplicantLink] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Step 4: Statement of Purpose
  const [applicantPitch, setApplicantPitch] = useState("");
  const [complexProject, setComplexProject] = useState("");

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleApplyClick = (category) => {
    setSelectedCategory(category);
    setShowApplyModal(true);
    setIsSubmitted(false);
    setFormError("");
    
    // Clear inputs
    setApplicantName("");
    setApplicantEmail("");
    setApplicantPhone("");
    setCurrentTitle("");
    setExperienceLevel("1-3 Years");
    setExpectedCtc("");
    setNoticePeriod("Immediate");
    setSkillsList("");
    setApplicantLink("");
    setUploadedFileName("");
    setSelectedFile(null);
    setApplicantPitch("");
    setComplexProject("");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Form validations (Required fields)
    if (
      !applicantName.trim() ||
      !applicantEmail.trim() ||
      !applicantPhone.trim() ||
      !currentTitle.trim() ||
      !expectedCtc.trim() ||
      !skillsList.trim() ||
      !applicantPitch.trim() ||
      !complexProject.trim()
    ) {
      setFormError("Please fill in all required fields indicated with *.");
      return;
    }

    // Phone number validation: must be exactly 10 digits
    if (applicantPhone.trim().length !== 10) {
      setFormError("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    setIsSubmitting(true);

    let finalFileUrl = "";
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const uploadRes = await fetch("/api/upload-resume", {
          method: "POST",
          body: formData
        });
        if (!uploadRes.ok) {
          const errData = await uploadRes.json().catch(() => ({}));
          setFormError(errData.error || "Failed to upload resume file.");
          setIsSubmitting(false);
          return;
        }
        const uploadData = await uploadRes.json();
        finalFileUrl = uploadData.url;
      } catch (err) {
        console.error("Resume file upload error:", err);
        setFormError("Network error uploading resume file.");
        setIsSubmitting(false);
        return;
      }
    }

    const newApp = {
      category: selectedCategory,
      personal: {
        name: applicantName,
        email: applicantEmail,
        phone: "+91 " + applicantPhone
      },
      professional: {
        currentTitle: currentTitle,
        experience: experienceLevel,
        expectedCtc: expectedCtc + " LPA",
        noticePeriod: noticePeriod
      },
      credentials: {
        skills: skillsList.split(",").map(s => s.trim()),
        portfolio: applicantLink,
        fileName: uploadedFileName || "None provided",
        fileUrl: finalFileUrl
      },
      statement: {
        pitch: applicantPitch,
        project: complexProject
      },
      read: false
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApp)
      });
      if (res.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Save locally for instant tab sync
        const existingApps = localStorage.getItem("kb-careers-applications");
        const appArray = existingApps ? JSON.parse(existingApps) : [];
        appArray.push(newApp);
        localStorage.setItem("kb-careers-applications", JSON.stringify(appArray));
      } else {
        const errData = await res.json().catch(() => ({}));
        setFormError(errData.error || "Failed to submit application to database.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setFormError("Network error contacting application database.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="careers" className={`py-20 border-t transition-all duration-300 ${
      isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100"
    }`}>
      {/* Scrollbar-hide utility styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Copy Layout */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/30 dark:text-blue-400">
            Hiring Core Talent
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mt-4 transition-colors ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Join the Core Team
          </h2>
          <p className={`mt-4 text-base max-w-2xl mx-auto transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            We are actively seeking developers, operators, and visionary interns to scale our tech platforms from regional hubs like Patna, Chandigarh, and Mohali.
          </p>
        </div>
 
        {/* Dynamic Categorized Categories Grid */}
        {loading ? (
          <div className="flex flex-row overflow-x-auto gap-8 pb-4 no-scrollbar">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`border rounded-2xl p-6 w-[290px] sm:w-[365px] flex-shrink-0 animate-pulse flex flex-col justify-between min-h-[300px] ${
                  isDark ? "bg-slate-900/40 border-slate-800" : "bg-slate-50/50 border-slate-100"
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl mb-6 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
                  <div className={`h-6 w-3/4 rounded-md mb-3 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
                  <div className={`h-3 w-5/6 rounded-md mb-6 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
                  <div className="space-y-3 pt-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-dashed border-slate-800/10">
                        <div className={`h-3.5 w-1/2 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
                        <div className={`h-3.5 w-1/4 rounded-md ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`w-full h-10 rounded-xl mt-8 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-row overflow-x-auto gap-8 pb-4 no-scrollbar snap-x snap-mandatory">
            {Object.keys(
              jobsList.reduce((acc, job) => {
                const dept = job.department || "Other Division";
                if (!acc[dept]) acc[dept] = [];
                acc[dept].push(job);
                return acc;
              }, {})
            ).map((deptName) => {
              const deptJobs = jobsList.filter((j) => (j.department || "Other Division") === deptName);
              const style = getDeptStyle(deptName);
              const cc = colorClasses[style.color];

              return (
                <div
                  key={deptName}
                  className={`border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl w-[290px] sm:w-[365px] flex-shrink-0 snap-start ${
                    isDark
                      ? `bg-slate-900/40 hover:bg-slate-900 border-slate-800 ${cc.borderDark}`
                      : `bg-slate-50/50 hover:bg-white border-slate-100 ${cc.borderLight}`
                  }`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${cc.iconBgLight}`}>
                      {style.icon}
                    </div>
                    <h3 className={`text-lg font-bold mb-2 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
                      {deptName}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">{style.description}</p>
                    <div className="space-y-2.5">
                      {deptJobs.map((j) => (
                        <div
                          key={j.id}
                          className={`flex items-center justify-between text-xs py-1 border-b transition-colors ${
                            isDark ? "border-slate-800" : "border-slate-100"
                          }`}
                        >
                          <span className={`font-semibold transition-colors ${isDark ? "text-slate-355" : "text-slate-700"}`}>
                            {j.title}
                          </span>
                          <span className="text-slate-400 font-medium">{j.location}</span>
                        </div>
                      ))}
                      {deptJobs.length === 0 && (
                        <span className="text-[10px] text-slate-500 italic">No open positions</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={() => handleApplyClick(deptName)}
                      className={`w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        isDark ? cc.btnDark : cc.btnLight
                      }`}
                    >
                      Apply for {deptName.split(" ")[0]} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick hiring alert footer link */}
        <div className={`mt-12 text-center text-xs font-semibold border rounded-xl py-3 px-6 inline-block mx-auto left-1/2 relative -translate-x-1/2 transition-colors ${
          isDark 
            ? "bg-slate-900 border-slate-800 text-slate-400" 
            : "bg-slate-50 border-slate-100 text-slate-400"
        }`}>
          ✉️ Don't see an exact match? We are always seeking high-energy builders. Send your portfolio directly to{" "}
          <a href="mailto:careers@karayabandhu.com" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">
            careers@karayabandhu.com
          </a>
        </div>

      </div>

      {/* [Premium Application Modal Popup] */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          
          {/* Foolproof Local Styles Injector */}
          <style dangerouslySetInnerHTML={{__html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
            }
            .no-scrollbar {
              -ms-overflow-style: none !important;
              scrollbar-width: none !important;
            }
          `}} />

          <div className={`relative w-full max-w-[620px] rounded-3xl border shadow-2xl overflow-hidden p-8 transition-all duration-300 flex flex-col justify-between ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-150 text-slate-900"
          }`}>
            
            {/* Close Button */}
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* CASE 1: Form Submitted Successfully */}
            {isSubmitted ? (
              <div className="flex flex-col items-center text-center space-y-5 py-6">
                
                {/* Glowing Success Ring */}
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 animate-bounce">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold tracking-tight">
                  Application Logged!
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                  Thank you, <span className="font-semibold text-blue-500">{applicantName}</span>. Your professional parameters for the <span className="font-semibold text-white bg-blue-600 px-2 py-0.5 rounded text-[10px]">{selectedCategory}</span> division have been registered in our system.
                </p>

                <div className={`p-4 rounded-xl border w-full text-xs transition-colors space-y-1 text-left ${
                  isDark ? "bg-slate-950 border-slate-850 text-slate-350" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}>
                  <p>• <strong className="text-slate-200 dark:text-white">Registered Email:</strong> {applicantEmail}</p>
                  <p>• <strong className="text-slate-200 dark:text-white">Relevant Experience:</strong> {experienceLevel}</p>
                  <p>• <strong className="text-slate-200 dark:text-white">Expected Salary (CTC):</strong> {expectedCtc} LPA</p>
                  {uploadedFileName && (
                    <p>• <strong className="text-slate-200 dark:text-white">Document CV:</strong> 📄 {uploadedFileName}</p>
                  )}
                </div>

                <p className="text-[11px] text-slate-500">
                  Our talent acquisition board in Patna/Mohali will review your resume and contact you within 48 hours.
                </p>

                <div className="flex space-x-3 w-full pt-4">
                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>

              </div>
            ) : (
              
              /* CASE 2: Active Expanded Submission Form */
              <div>
                
                {/* Header info */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                    Onboarding Portal
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mt-3">
                    Submit Core Application
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Selected Division: <span className="font-bold text-blue-600 dark:text-blue-400">{selectedCategory}</span>
                  </p>
                </div>

                {/* Error Box */}
                {formError && (
                  <div className="mb-4 px-4 py-2.5 rounded-lg border border-red-900/35 bg-red-950/20 text-red-400 text-xs font-bold text-center">
                    ⚠️ {formError}
                  </div>
                )}

                {/* Main Scrollable Inputs Form */}
                <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
                  
                  {/* Category Group 1: Personal Details */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1">
                      1. Personal Information
                    </h4>
                    
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                          Phone Number *
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-4 text-xs font-bold text-slate-400 select-none border-r border-slate-800 pr-2.5 mr-2.5">
                            +91
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            required
                            placeholder="9876543210"
                            value={applicantPhone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              if (val.length <= 10) {
                                setApplicantPhone(val);
                              }
                            }}
                            className="w-full pl-15 pr-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        {applicantPhone && applicantPhone.length !== 10 && (
                          <p className="text-[10px] text-red-500 mt-1 font-semibold pl-1">
                            Phone number must be exactly 10 digits.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category Group 2: Professional Details */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1">
                      2. Professional Profile
                    </h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                          Current Job Title / Status *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Software Engineer"
                          value={currentTitle}
                          onChange={(e) => setCurrentTitle(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                          Relevant Experience *
                        </label>
                        <select
                          value={experienceLevel}
                          onChange={(e) => setExperienceLevel(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors dark:bg-slate-900"
                        >
                          <option value="Entry-Level">Entry-Level / Student</option>
                          <option value="1-3 Years">1 - 3 Years</option>
                          <option value="3-5 Years">3 - 5 Years</option>
                          <option value="5+ Years">5+ Years (Senior)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                          Expected CTC (LPA in INR) *
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required
                          placeholder="e.g. 8"
                          value={expectedCtc}
                          onChange={(e) => setExpectedCtc(e.target.value.replace(/\D/g, ""))}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                          Notice Period *
                        </label>
                        <select
                          value={noticePeriod}
                          onChange={(e) => setNoticePeriod(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors dark:bg-slate-900"
                        >
                          <option value="Immediate">Immediate / 0 Days</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60+ Days">60+ Days</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Category Group 3: Qualifications & CV Upload */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1">
                      3. Credentials & Attachments
                    </h4>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Core Technical Skills (Comma-separated) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Next.js, React, Node.js, Tailwind"
                        value={skillsList}
                        onChange={(e) => setSkillsList(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Portfolio / CV / LinkedIn URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={applicantLink}
                        onChange={(e) => setApplicantLink(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Simulation File Upload */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Upload PDF Resume/CV
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-750 transition-colors cursor-pointer border border-slate-700/60 shadow-sm select-none">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          Choose Resume File
                        </label>
                        <span className="text-xs font-mono font-bold text-slate-400 truncate max-w-xs">
                          {uploadedFileName ? (
                            <span className="text-green-400 flex items-center gap-1.5">
                              ✓ {uploadedFileName}
                            </span>
                          ) : (
                            "No file selected (.pdf, .doc, .docx)"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category Group 4: Statement of Purpose */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1">
                      4. Professional Cover Details
                    </h4>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Why Karaya Bandhu? (Brief Pitch) *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Briefly explain your key motivations..."
                        value={applicantPitch}
                        onChange={(e) => setApplicantPitch(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Tell us about a complex project you built or led *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Detail the technical challenges, architecture, and outcomes..."
                        value={complexProject}
                        onChange={(e) => setComplexProject(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submitting Actions Buttons */}
                  <div className="flex space-x-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(false)}
                      className="flex-1 py-3 rounded-xl text-xs font-bold bg-slate-800 text-slate-350 hover:bg-slate-750 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting Application...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>

                </form>

              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}
