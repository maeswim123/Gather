"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Rooftop Jazz Night",
    location: "River North",
    attendees: 18,
    date: "May 3",
    gradient: "from-violet-600 via-indigo-700 to-violet-900",
    tag: "🎵 Live music",
    community: "All welcome",
  },
  {
    title: "Women's Creative Workshop",
    location: "Wicker Park",
    attendees: 12,
    date: "Apr 27",
    gradient: "from-pink-500 via-rose-600 to-pink-800",
    tag: "🎨 Creative",
    community: "Women-only",
  },
  {
    title: "LGBTQ+ Game Night",
    location: "Boystown",
    attendees: 22,
    date: "Apr 19",
    gradient: "from-purple-500 via-fuchsia-600 to-purple-900",
    tag: "🏳️‍🌈 Community",
    community: "LGBTQ+ inclusive",
  },
  {
    title: "Logan Square Food Crawl",
    location: "Logan Square",
    attendees: 14,
    date: "May 8",
    gradient: "from-amber-500 via-orange-600 to-amber-800",
    tag: "🍜 Food & drinks",
    community: "All welcome",
  },
  {
    title: "Men's Networking Mixer",
    location: "West Loop",
    attendees: 16,
    date: "Apr 25",
    gradient: "from-teal-500 via-cyan-600 to-teal-800",
    tag: "🤝 Networking",
    community: "Men-only",
  },
  {
    title: "Lakefront Sunrise Walk",
    location: "Hyde Park",
    attendees: 9,
    date: "May 10",
    gradient: "from-emerald-500 via-green-600 to-emerald-800",
    tag: "🌿 Outdoor",
    community: "All welcome",
  },
];

export default function WelcomePage() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 400);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="flex flex-col flex-1 min-h-screen relative overflow-hidden">
      {/* Slideshow background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${slide.gradient} transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 0.4s ease" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Slide content — ghost card showing past event */}
      <div
        className={`absolute inset-x-6 top-16 transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 0.4s ease" }}
      >
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Past event</span>
            <span className="bg-white/15 text-white text-xs px-2.5 py-1 rounded-full">{slide.community}</span>
          </div>
          <h3 className="text-white font-bold text-xl mb-1">{slide.title}</h3>
          <p className="text-white/70 text-sm mb-3">📍 {slide.location} · {slide.date}</p>
          <div className="flex items-center justify-between">
            <span className="bg-white/15 text-white text-xs px-2.5 py-1 rounded-full">{slide.tag}</span>
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                {[...Array(Math.min(slide.attendees, 5))].map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-white/30 border border-white/40" />
                ))}
              </div>
              <span className="text-white/70 text-xs">{slide.attendees} attended</span>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 300); }}
              className={`rounded-full transition-all ${i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 flex flex-col flex-1 justify-end pb-12 px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-xs font-medium">Live in Chicago</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight mb-3">gather</h1>
          <p className="text-white/70 text-base leading-relaxed max-w-[260px] mx-auto">
            Find plans, meet people, and explore Chicago without overthinking it.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/onboarding/phone"
            className="block w-full bg-white text-violet-800 text-center py-4 rounded-2xl font-bold text-lg shadow-lg"
          >
            Create Account
          </Link>
          <Link
            href="/suggestions"
            className="block w-full border border-white/30 text-white text-center py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
