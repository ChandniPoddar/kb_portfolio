// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

export const metadata = {
  title: "Karaya Bandhu Pvt. Ltd. | Incubating India's Gig Economy Ecosystems",
  description: "Karaya Bandhu Pvt. Ltd. is a premium parent holding company and digital brand incubator. We build cutting-edge gig economy platforms, regional micro-fintech, SaaS-enabled logistics, and corporate workforce infrastructure to empower Tier-2 and Tier-3 cities in India.",
  keywords: ["Karaya Bandhu", "Gig Economy India", "Digital Brand Incubator", "KB FinTech", "KB Logistics", "Workforce Certification", "Patna Startup"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`font-sans h-full scroll-smooth antialiased dark`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 transition-colors duration-300">{children}</body>
    </html>
  );
}

