"use client";

import React, { useState, useEffect } from "react";

export default function LoginForm() {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("kb-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  const isDark = theme === "dark";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!adminUsername.trim() || !adminPassword.trim()) {
      setLoginError("Please enter both username and password.");
      return;
    }

    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: adminUsername.trim(),
          password: adminPassword.trim(),
        }),
      });

      if (res.ok) {
        setLoginError("");
        // Successful login: reload the page. The Server Component will intercept
        // the new session cookie and render the AdminPortal.
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        setLoginError(data.error || "Invalid username or password. Please try again.");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setLoginError("Network error: Unable to contact authentication server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300 ${
      isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Ambient Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />

      <div className={`w-full max-w-md border p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10 transition-colors duration-300 ${
        isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
      }`}>
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex items-center justify-center">
            <img
              src="/logo-removebg-preview.png"
              alt="Karaya Bandhu Logo"
              className="w-16 h-16 object-contain"
              style={{
                filter: isDark
                  ? "brightness(0) invert(1)"
                  : "invert(24%) sepia(85%) saturate(3088%) hue-rotate(214deg) brightness(95%) contrast(101%)",
              }}
            />
          </div>
          <h2 className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Admin Portal Access
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Sign in with your administrative credentials to manage the Karaya Bandhu ecosystem.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {loginError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center space-x-2">
              <span>⚠️</span>
              <span className="font-semibold">{loginError}</span>
            </div>
          )}

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
              Admin Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs">👤</span>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 border transition-all ${
                  isDark ? "bg-slate-950/80 border-slate-850 text-white" : "bg-white border-slate-200 text-slate-900"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
              Admin Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className={`w-full text-xs pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:border-blue-500 border transition-all ${
                  isDark ? "bg-slate-950/80 border-slate-850 text-white" : "bg-white border-slate-200 text-slate-900"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-350 text-xs focus:outline-none cursor-pointer"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-750 hover:to-indigo-750 text-white text-xs font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 cursor-pointer transition-all flex items-center justify-center space-x-2"
          >
            {isLoggingIn ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Authenticate Security Key →</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
