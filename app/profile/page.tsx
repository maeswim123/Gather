"use client";

import { useState } from "react";
import Link from "next/link";

const STARS = 7;
const GOAL = 10;

const starHistory = [
  { event: "Rooftop Jazz Night", type: "earned", date: "May 3", note: "Attended ✓" },
  { event: "Coffee & Bookstore Crawl", type: "earned", date: "Apr 27", note: "Attended ✓" },
  { event: "Pilates + Smoothie Run", type: "lost", date: "Apr 22", note: "No-show · No cancel" },
  { event: "Logan Square Food Crawl", type: "earned", date: "Apr 18", note: "Attended ✓" },
  { event: "LGBTQ+ Game Night", type: "earned", date: "Apr 12", note: "Attended ✓" },
  { event: "Farmers Market Walk", type: "earned", date: "Apr 6", note: "Attended ✓" },
  { event: "Creative Workshop", type: "earned", date: "Mar 29", note: "Attended ✓" },
  { event: "Networking Happy Hour", type: "earned", date: "Mar 22", note: "Attended ✓" },
];

const preferences = [
  { id: "music", label: "Live music", emoji: "🎵", on: true },
  { id: "food", label: "Trying new restaurants", emoji: "🍜", on: true },
  { id: "outdoor", label: "Outdoor activities", emoji: "🌿", on: true },
  { id: "coffee", label: "Coffee & casual hangs", emoji: "☕", on: false },
  { id: "creative", label: "Creative activities", emoji: "🎨", on: false },
  { id: "fitness", label: "Fitness & wellness", emoji: "🧘", on: true },
];

const communities = [
  { id: "all", label: "All welcome", emoji: "🌍", on: true },
  { id: "lgbtq", label: "LGBTQ+ inclusive", emoji: "🏳️‍🌈", on: true },
  { id: "sober", label: "Sober & mindful", emoji: "🌿", on: false },
];

type Tab = "stars" | "preferences" | "community" | "history";

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("stars");
  const [prefs, setPrefs] = useState(preferences.map((p) => ({ ...p })));
  const [comms, setComms] = useState(communities.map((c) => ({ ...c })));

  const togglePref = (id: string) =>
    setPrefs((prev) => prev.map((p) => (p.id === id ? { ...p, on: !p.on } : p)));

  const toggleComm = (id: string) =>
    setComms((prev) => prev.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));

  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-violet-700 to-violet-600 px-5 pt-14 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/suggestions" className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 14L6 9l5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="text-white font-semibold text-base">My Profile</span>
          <button className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white text-sm">
            ✏️
          </button>
        </div>

        {/* Avatar — initials only, no photo */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center mb-3">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h2 className="text-white font-bold text-xl">Alex M.</h2>
          <p className="text-white/70 text-sm">Member since March 2026 · Chicago, IL</p>

          {/* Community badges */}
          <div className="flex gap-2 mt-3 flex-wrap justify-center">
            {comms.filter((c) => c.on).map((c) => (
              <span key={c.id} className="bg-white/15 text-white text-xs px-2.5 py-1 rounded-full border border-white/20">
                {c.emoji} {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Star count summary */}
        <div className="mt-5 bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-300 text-lg">⭐</span>
              <span className="text-white font-bold text-lg">{STARS} stars</span>
            </div>
            <span className="text-white/70 text-sm">{GOAL - STARS} more to reward</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-300 rounded-full transition-all"
              style={{ width: `${(STARS / GOAL) * 100}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-1.5">🎁 10 stars = free drink or merch at any event</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 flex overflow-x-auto gap-1">
        {([
          { id: "stars", label: "Stars" },
          { id: "preferences", label: "Preferences" },
          { id: "community", label: "Community" },
          { id: "history", label: "History" },
        ] as { id: Tab; label: string }[]).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-shrink-0 py-3.5 px-3 text-sm font-medium border-b-2 transition-colors ${
              tab === id ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">

        {/* Stars tab */}
        {tab === "stars" && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-1">How Gather Stars work</h3>
              <div className="space-y-3 mt-4">
                {[
                  { icon: "✅", text: "Attend an event", change: "+1 star" , color: "text-emerald-600" },
                  { icon: "❌", text: "No-show without canceling", change: "−1 star", color: "text-red-500" },
                  { icon: "⏱️", text: "Cancel less than 24 hrs before", change: "−1 star", color: "text-red-500" },
                  { icon: "🎁", text: "Reach 10 stars", change: "Free reward!", color: "text-amber-600" },
                ].map(({ icon, text, change, color }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-xl w-8 text-center">{icon}</span>
                    <span className="flex-1 text-gray-700 text-sm">{text}</span>
                    <span className={`font-bold text-sm ${color}`}>{change}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Progress to reward</h3>
                <span className="text-violet-600 font-bold">{STARS}/{GOAL}</span>
              </div>
              <div className="flex gap-1.5 mb-3">
                {Array.from({ length: GOAL }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-7 rounded-lg flex items-center justify-center text-sm ${
                      i < STARS ? "bg-yellow-400 text-yellow-900" : "bg-gray-100 text-gray-300"
                    }`}
                  >
                    ⭐
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <p className="text-amber-800 text-sm font-medium">
                  🎁 {GOAL - STARS} more stars until your free drink or merch!
                </p>
                <p className="text-amber-600 text-xs mt-0.5">Redeemable at check-in at any Gather event</p>
              </div>
            </div>
          </div>
        )}

        {/* Preferences tab */}
        {tab === "preferences" && (
          <div className="space-y-3">
            <p className="text-gray-500 text-sm mb-4">Tap to toggle what kinds of events show up for you.</p>
            {prefs.map(({ id, label, emoji, on }) => (
              <button
                key={id}
                onClick={() => togglePref(id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${
                  on ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-white"
                }`}
              >
                <span className="text-2xl">{emoji}</span>
                <span className={`flex-1 font-medium text-base ${on ? "text-violet-900" : "text-gray-700"}`}>{label}</span>
                <div className={`w-11 h-6 rounded-full transition-all relative ${on ? "bg-violet-600" : "bg-gray-200"}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${on ? "left-5" : "left-0.5"}`} />
                </div>
              </button>
            ))}

            <div className="mt-6 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Event preferences</h4>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "Small groups", on: true },
                  { label: "Evening", on: true },
                  { label: "Budget-friendly", on: false },
                  { label: "Logan Square", on: true },
                ].map(({ label, on }) => (
                  <span key={label} className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
                    on ? "bg-violet-600 text-white border-violet-600" : "bg-white text-gray-500 border-gray-200"
                  }`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Community tab */}
        {tab === "community" && (
          <div className="space-y-3">
            <p className="text-gray-500 text-sm mb-1">Select the communities you want events from.</p>
            <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 mb-4">
              <p className="text-violet-700 text-xs">
                <span className="font-semibold">Private & protected.</span> Your community settings are never shown publicly.
              </p>
            </div>
            {comms.map(({ id, label, emoji, on }) => (
              <button
                key={id}
                onClick={() => toggleComm(id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${
                  on ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-white"
                }`}
              >
                <span className="text-2xl">{emoji}</span>
                <span className={`flex-1 font-medium text-base ${on ? "text-violet-900" : "text-gray-700"}`}>{label}</span>
                <div className={`w-11 h-6 rounded-full transition-all relative ${on ? "bg-violet-600" : "bg-gray-200"}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${on ? "left-5" : "left-0.5"}`} />
                </div>
              </button>
            ))}
            <Link
              href="/onboarding/community"
              className="block text-center text-violet-600 text-sm font-medium py-3"
            >
              + Add more communities
            </Link>
          </div>
        )}

        {/* History tab */}
        {tab === "history" && (
          <div className="space-y-2">
            <p className="text-gray-500 text-sm mb-4">Your last 8 events · Net: +{STARS} ⭐</p>
            {starHistory.map(({ event, type, date, note }) => (
              <div key={event + date} className="bg-white rounded-2xl px-4 py-3.5 border border-gray-100 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                  type === "earned" ? "bg-emerald-50" : "bg-red-50"
                }`}>
                  {type === "earned" ? "⭐" : "💫"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{event}</p>
                  <p className="text-gray-400 text-xs">{note} · {date}</p>
                </div>
                <span className={`font-bold text-sm ${type === "earned" ? "text-emerald-600" : "text-red-500"}`}>
                  {type === "earned" ? "+1" : "−1"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-6 py-3 pb-6 flex justify-around">
        {[
          { icon: "🔍", label: "Explore", href: "/suggestions", active: false },
          { icon: "🔖", label: "Saved", href: "/suggestions", active: false },
          { icon: "👥", label: "Groups", href: "/suggestions", active: false },
          { icon: "👤", label: "Profile", href: "/profile", active: true },
        ].map(({ icon, label, href, active }) => (
          <Link key={label} href={href} className="flex flex-col items-center gap-1">
            <span className="text-xl">{icon}</span>
            <span className={`text-xs font-medium ${active ? "text-violet-600" : "text-gray-400"}`}>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
