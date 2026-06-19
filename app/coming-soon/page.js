"use client";

import { useEffect, useState, useRef } from "react";

// ─── Must match the date in middleware.js exactly ────────────────────────────
const LAUNCH_DATE = new Date("2026-06-19T12:35:00+05:30");

function useCountdown(target) {
  // Start as null so server and client render identical initial HTML
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    function getTimeLeft(t) {
      const diff = Math.max(0, t - Date.now());
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        total: diff,
      };
    }
    // Populate immediately on mount, then every second
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

// Animated particle canvas background
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const PARTICLE_COUNT = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 179, 237, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      // Draw faint connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 179, 237, ${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

function CountdownUnit({ value, label }) {
  // value is null during SSR — render "--" so server/client HTML matches
  const display = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="countdown-unit">
      <div className="countdown-box">
        <span className="countdown-number" suppressHydrationWarning>
          {display}
        </span>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function ComingSoon() {
  const timeLeft = useCountdown(LAUNCH_DATE);
  // timeLeft is null on the server; treat as "not yet launched" until mounted
  const { days = null, hours = null, minutes = null, seconds = null, total = 1 } = timeLeft ?? {};
  const launched = timeLeft !== null && total === 0;

  // Pulse the glow ring every second
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cs-root {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 60% 20%, #0f1f3d 0%, #020617 55%, #000 100%);
          font-family: 'Inter', sans-serif;
          color: #f1f5f9;
          overflow: hidden;
          position: relative;
          padding: 2rem 1rem;
        }

        .cs-card {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 780px;
          width: 100%;
          animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Brand badge ── */
        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 0.35rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #93c5fd;
          margin-bottom: 2.5rem;
          backdrop-filter: blur(8px);
        }

        .brand-badge .dot {
          width: 7px; height: 7px;
          background: #3b82f6;
          border-radius: 50%;
          animation: blink 1.2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        /* ── Logo ring ── */
        .logo-ring {
          width: 90px; height: 90px;
          margin: 0 auto 2rem;
          border-radius: 50%;
          border: 2px solid rgba(59,130,246,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59,130,246,0.08);
          transition: box-shadow 0.5s ease;
        }

        .logo-ring.glow {
          box-shadow: 0 0 28px 6px rgba(59,130,246,0.35);
        }

        /* ── Headline ── */
        .cs-headline {
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffffff 30%, #93c5fd 70%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.25rem;
        }

        .cs-subline {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #94a3b8;
          font-weight: 400;
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto 3rem;
        }

        /* ── Divider ── */
        .cs-divider {
          width: 60px; height: 2px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          margin: 0 auto 3rem;
        }

        /* ── Countdown ── */
        .countdown-row {
          display: flex;
          justify-content: center;
          gap: clamp(0.75rem, 3vw, 2rem);
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }

        .countdown-box {
          width: clamp(72px, 14vw, 110px);
          height: clamp(72px, 14vw, 110px);
          background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: transform 0.2s ease;
        }

        .countdown-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(147,197,253,0.4), transparent);
        }

        .countdown-number {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          color: #e2e8f0;
          letter-spacing: -0.02em;
        }

        .countdown-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #475569;
        }

        /* Separator dots */
        .countdown-sep {
          font-size: 2rem;
          font-weight: 800;
          color: #334155;
          align-self: center;
          padding-bottom: 1.6rem;
        }

        /* ── Launch bar ── */
        .launch-bar-wrap {
          margin-bottom: 3rem;
        }

        .launch-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #475569;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .launch-bar {
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
          height: 4px;
          background: rgba(255,255,255,0.07);
          border-radius: 999px;
          overflow: hidden;
        }

        .launch-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #2563eb, #60a5fa);
          transition: width 1s linear;
          box-shadow: 0 0 10px rgba(96,165,250,0.6);
        }

        /* ── Notify form ── */
        .notify-form {
          display: flex;
          gap: 0.6rem;
          max-width: 420px;
          margin: 0 auto 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .notify-input {
          flex: 1 1 220px;
          padding: 0.75rem 1.1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #f1f5f9;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .notify-input::placeholder { color: #475569; }

        .notify-input:focus {
          border-color: rgba(59,130,246,0.5);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }

        .notify-btn {
          padding: 0.75rem 1.4rem;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s;
          box-shadow: 0 4px 16px rgba(37,99,235,0.4);
        }

        .notify-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.5);
        }

        .notify-btn:active { transform: translateY(0); }

        .notify-success {
          font-size: 0.82rem;
          color: #4ade80;
          margin-top: 0.5rem;
          animation: fadeUp 0.4s ease both;
        }

        /* ── Social links ── */
        .social-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .social-link {
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
        }

        .social-link:hover {
          background: rgba(59,130,246,0.15);
          border-color: rgba(59,130,246,0.4);
          color: #93c5fd;
          transform: translateY(-2px);
        }

        /* ── Footer note ── */
        .cs-footer {
          font-size: 0.72rem;
          color: #334155;
          letter-spacing: 0.06em;
        }

        /* ── Launched state ── */
        .launched-msg {
          font-size: 1.4rem;
          color: #4ade80;
          font-weight: 700;
          margin-bottom: 2rem;
          animation: fadeUp 0.6s ease both;
        }
      `}</style>

      <ParticleCanvas />

      <main className="cs-root">
        <div className="cs-card">

          {/* Live badge */}
          <div className="brand-badge">
            <span className="dot" />
            Karaya Bandhu Pvt. Ltd.
          </div>

          {/* Logo ring */}
          {/* KB monogram logo */}
          <div className={`logo-ring ${pulse ? "glow" : ""}`}>
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="KB"
            >
              <defs>
                <linearGradient id="kb-grad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              {/* K */}
              <text
                x="3"
                y="33"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="800"
                fontSize="30"
                fill="url(#kb-grad)"
                letterSpacing="-1"
              >K</text>
              {/* B — slightly overlapping for a compact monogram */}
              <text
                x="22"
                y="33"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="800"
                fontSize="30"
                fill="url(#kb-grad)"
                opacity="0.85"
              >B</text>
            </svg>
          </div>

          {/* Headline */}
          <h1 className="cs-headline">
            {launched ? "We're Live!" : "Something Big\nIs Coming"}
          </h1>

          {/* Subline */}
          <p className="cs-subline">
            {launched
              ? "The wait is over — welcome to the future of India's gig economy."
              : "We're building the future of India's gig economy ecosystem. Our platform launches very soon — join the waitlist to be first in line."}
          </p>

          <div className="cs-divider" />

          {/* Countdown / launched */}
          {!launched ? (
            <>
              {/* Countdown clock */}
              <div className="countdown-row">
                <CountdownUnit value={days} label="Days" />
                <span className="countdown-sep">:</span>
                <CountdownUnit value={hours} label="Hours" />
                <span className="countdown-sep">:</span>
                <CountdownUnit value={minutes} label="Minutes" />
                <span className="countdown-sep">:</span>
                <CountdownUnit value={seconds} label="Seconds" />
              </div>

              {/* Progress bar */}
              <ProgressBar target={LAUNCH_DATE} />

              {/* Email notify */}
              <NotifyForm />
            </>
          ) : (
            <div className="launched-msg">🎉 The site is now live!</div>
          )}

          {/* Social links */}
          <div className="social-row">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">in</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">𝕏</a>
            <a href="mailto:hello@karayabandhu.in" aria-label="Email" className="social-link">✉</a>
          </div>

          {/* Footer */}
          <p className="cs-footer">
            © {new Date().getFullYear()} Karaya Bandhu Pvt. Ltd. · All rights reserved.
          </p>

        </div>
      </main>
    </>
  );
}

// ── Progress bar: fills from site-creation date → launch date ────────────────
const CREATION_DATE = new Date("2026-06-01T00:00:00+05:30");

function ProgressBar({ target }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const calc = () => {
      const total = target - CREATION_DATE;
      const elapsed = Date.now() - CREATION_DATE;
      setPct(Math.min(100, Math.max(0, (elapsed / total) * 100)));
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="launch-bar-wrap">
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <div className="launch-bar-label">
          <span>Launch progress</span>
          <span>{pct.toFixed(1)}%</span>
        </div>
        <div className="launch-bar">
          <div className="launch-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

// ── Email notify form (client-only, no backend wired yet) ─────────────────────
function NotifyForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire up to your email service (Resend, Mailchimp, etc.)
    console.log("Waitlist email:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <form className="notify-form" onSubmit={handleSubmit} noValidate>
      {!submitted ? (
        <>
          <input
            id="notify-email"
            type="email"
            className="notify-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="notify-btn">
            Notify Me
          </button>
        </>
      ) : (
        <p className="notify-success">
          ✓ You&apos;re on the list! We&apos;ll notify you at launch.
        </p>
      )}
    </form>
  );
}
