"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function PressPage() {
  const [theme, setTheme] = useState("dark");
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync theme
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

  // Fetch articles from database API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/press");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setArticles(data);
          } else {
            setArticles([]);
          }
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Failed to fetch press:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Filter based on search query
  const filteredArticles = articles.filter(art => {
    const query = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(query) ||
      (art.subTitle && art.subTitle.toLowerCase().includes(query)) ||
      art.content.toLowerCase().includes(query) ||
      (art.source && art.source.toLowerCase().includes(query))
    );
  });

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
      
      {/* 🏛️ Modular Navigation Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      {/* Spacer to push content below fixed header */}
      <div className="h-20" />

      {/* 📰 Hero Section */}
      <section className={`relative overflow-hidden py-16 sm:py-24 border-b transition-colors duration-300 ${
        isDark ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
      }`}>
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors ${
            isDark ? "bg-blue-950/30 border-blue-900/50 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-600"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Newsroom
          </div>

          <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-none ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Press & Media Center
          </h1>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            Stay up to date with the latest press releases, media coverage, and updates from the Karaya Bandhu network of Incubated Brands.
          </p>

          {/* Search Filtering Input */}
          <div className="max-w-md mx-auto pt-4 relative">
            <input
              type="text"
              placeholder="Search news, topics, or press sources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-5 py-3.5 pl-12 rounded-2xl border text-sm focus:outline-none transition-all duration-300 ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              }`}
            />
            <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
          </div>
        </div>
      </section>

      {/* 📚 Articles Listing */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Syncing Media feeds...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className={`border rounded-3xl p-16 text-center transition-colors ${
            isDark ? "bg-slate-900/30 border-slate-900" : "bg-white border-slate-200"
          }`}>
            <span className="text-4xl block mb-4">📰</span>
            <h3 className="text-lg font-bold">No press coverage posted yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Check back soon for the latest press releases and media updates from Karaya Bandhu.
            </p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className={`border rounded-3xl p-16 text-center transition-colors ${
            isDark ? "bg-slate-900/30 border-slate-900" : "bg-white border-slate-200"
          }`}>
            <span className="text-4xl block mb-4">🤷‍♂️</span>
            <h3 className="text-lg font-bold">No coverage matches found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any press articles matching "{searchQuery}". Try editing your query tags.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`group border rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 ${
                  isDark
                    ? "bg-slate-900/40 border-slate-850 hover:border-slate-800 hover:bg-slate-900/80 shadow-xl shadow-black/10"
                    : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
                }`}
              >
                {/* Image Cover */}
                <div className="aspect-video relative overflow-hidden bg-slate-950">
                  {art.imageUrl ? (
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-4xl">
                      📰
                    </div>
                  )}
                  {/* Source Tag */}
                  {art.source && (
                    <span className="absolute top-4 left-4 bg-blue-600 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                      {art.source}
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
                      {art.publishedDate}
                    </span>
                    <h3 className={`text-base font-bold leading-snug group-hover:text-blue-500 transition-colors ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}>
                      {art.title}
                    </h3>
                    {art.subTitle && (
                      <p className={`text-xs font-semibold leading-relaxed line-clamp-2 ${
                        isDark ? "text-slate-355" : "text-slate-650"
                      }`}>
                        {art.subTitle}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <p className={`text-xs font-normal leading-relaxed line-clamp-3 ${
                      isDark ? "text-slate-450" : "text-slate-500"
                    }`}>
                      {art.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dashed border-slate-800/20 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                    <span>Read Full Story</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* 📖 Interactive Full-Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className={`relative w-full max-w-[720px] rounded-3xl border shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto no-scrollbar ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-850 hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close reader"
            >
              ✕
            </button>

            {/* Modal Body */}
            <div className="space-y-6">
              
              {/* Header Info */}
              <div className="space-y-2 pt-2">
                <div className="flex flex-wrap gap-2 items-center">
                  {selectedArticle.source && (
                    <span className="bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                      {selectedArticle.source}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {selectedArticle.publishedDate}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black leading-tight">
                  {selectedArticle.title}
                </h2>
                {selectedArticle.subTitle && (
                  <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {selectedArticle.subTitle}
                  </p>
                )}
              </div>

              {/* Cover Image */}
              {selectedArticle.imageUrl && (
                <div className="aspect-video relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-850">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Rich Body Content */}
              <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal ${
                isDark ? "text-slate-300" : "text-slate-705"
              }`}>
                {selectedArticle.content}
              </div>

              {/* External source Link */}
              {selectedArticle.sourceUrl && (
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                  isDark ? "bg-slate-950/50 border-slate-850" : "bg-slate-50 border-slate-100"
                }`}>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Original Source Publication</span>
                    <span className="text-xs font-semibold truncate block mt-0.5">{selectedArticle.source}</span>
                  </div>
                  <a
                    href={selectedArticle.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex-shrink-0"
                  >
                    Visit Original Link ↗
                  </a>
                </div>
              )}

              {/* Modal Closing Actions */}
              <div className="pt-4 text-right">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer transition-colors border border-slate-700"
                >
                  Return to Newsroom
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 🏛️ Premium Bottom Footer */}
      <Footer />

    </div>
  );
}
