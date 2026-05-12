"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const communities = [
  {
    id: "all",
    label: "All welcome",
    emoji: "🌍",
    desc: "Open, mixed-gender, inclusive events",
    color: "from-violet-500 to-indigo-500",
  },
  {
    id: "lgbtq",
    label: "LGBTQ+ inclusive",
    emoji: "🏳️‍🌈",
    desc: "Safe, affirming, queer-friendly spaces",
    color: "from-pink-500 to-purple-500",
  },
  {
    id: "women",
    label: "Women & non-binary",
    emoji: "♀",
    desc: "Women-only and non-binary welcoming events",
    color: "from-rose-400 to-pink-500",
  },
  {
    id: "men",
    label: "Men's events",
    emoji: "♂",
    desc: "Social events for men",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "30plus",
    label: "30s & up",
    emoji: "✨",
    desc: "A more mature, settled crowd",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "newcomers",
    label: "New to Chicago",
    emoji: "📍",
    desc: "Fresh to the city, building roots",
    color: "from-teal-400 to-emerald-500",
  },
  {
    id: "poc",
    label: "BIPOC community",
    emoji: "✊",
    desc: "Culturally inclusive spaces",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "sober",
    label: "Sober & mindful",
    emoji: "🌿",
    desc: "Alcohol-free social events",
    color: "from-green-400 to-teal-500",
  },
];

export default function CommunityPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["all"]));
  const router = useRouter();

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (id === "all") {
        return new Set(["all"]);
      }
      next.delete("all");
      next.has(id) ? next.delete(id) : next.add(id);
      if (next.size === 0) next.add("all");
      return next;
    });
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex items-center px-5 pt-14 pb-4">
        <Link href="/onboarding/comfort" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 mr-4">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <span className="text-sm text-gray-400 font-medium">Step 6 of 7</span>
      </div>

      <div className="px-5 mb-8">
        <div className="flex gap-1.5">
          {[0,1,2,3,4,5,6].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= 5 ? "bg-violet-600" : "bg-gray-100"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">Your community</h2>
        <p className="text-gray-500 mb-1">Which spaces feel most like you?</p>
        <p className="text-xs text-gray-400 mb-6">Select all that apply. This shapes your event matches.</p>

        <div className="flex flex-col gap-2.5 pb-4">
          {communities.map(({ id, label, emoji, desc, color }) => {
            const on = selected.has(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${
                  on ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-lg flex-shrink-0 shadow-sm`}>
                  {emoji}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold text-base ${on ? "text-violet-900" : "text-gray-900"}`}>{label}</div>
                  <div className="text-gray-400 text-sm">{desc}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  on ? "border-violet-600 bg-violet-600" : "border-gray-300"
                }`}>
                  {on && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3 mb-6">
          <p className="text-violet-700 text-xs leading-relaxed">
            <span className="font-semibold">Your identity is yours.</span> These preferences only filter event suggestions — they're never shown on your public profile.
          </p>
        </div>
      </div>

      <div className="px-6 pb-10 pt-4 bg-white border-t border-gray-50">
        <button
          onClick={() => router.push("/onboarding/availability")}
          className="w-full py-4 rounded-2xl font-semibold text-lg bg-violet-600 text-white"
        >
          Continue · {selected.size} {selected.size === 1 ? "community" : "communities"} selected
        </button>
      </div>
    </div>
  );
}
