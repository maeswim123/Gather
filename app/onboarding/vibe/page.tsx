"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const vibes = [
  { id: "chill", label: "Chill night", emoji: "🌙" },
  { id: "spontaneous", label: "Spontaneous", emoji: "⚡" },
  { id: "cozy", label: "Cozy", emoji: "🕯️" },
  { id: "creative", label: "Creative", emoji: "✨" },
  { id: "high-energy", label: "High energy", emoji: "🔥" },
  { id: "low-pressure", label: "Low-pressure social", emoji: "🌊" },
  { id: "outdoorsy", label: "Outdoorsy", emoji: "🌲" },
  { id: "luxury", label: "Luxury", emoji: "🥂" },
  { id: "budget", label: "Budget-friendly", emoji: "💚" },
];

export default function VibePage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const router = useRouter();

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex items-center px-5 pt-14 pb-4">
        <Link href="/onboarding/interests" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 mr-4">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <span className="text-sm text-gray-400 font-medium">Step 3 of 7</span>
      </div>

      <div className="px-5 mb-8">
        <div className="flex gap-1.5">
          {[0,1,2,3,4,5,6].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= 2 ? "bg-violet-600" : "bg-gray-100"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">Choose your vibe</h2>
        <p className="text-gray-500 mb-6">What kind of night are you looking for?</p>

        <div className="grid grid-cols-2 gap-2.5 pb-4">
          {vibes.map(({ id, label, emoji }) => {
            const on = selected.has(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={`flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-2xl border-2 text-center transition-all min-h-[90px] ${
                  on
                    ? "border-violet-500 bg-violet-50 text-violet-900"
                    : "border-gray-100 bg-gray-50 text-gray-800"
                }`}
              >
                <span className="text-3xl">{emoji}</span>
                <span className="font-medium text-sm leading-tight">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-10 pt-4 bg-white">
        <button
          onClick={() => router.push("/onboarding/intention")}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-colors ${selected.size > 0 ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-400"}`}
        >
          Continue {selected.size > 0 && `· ${selected.size} selected`}
        </button>
      </div>
    </div>
  );
}
