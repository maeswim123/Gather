"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const intentions = [
  { id: "friends", label: "Meet new friends", emoji: "🤝", desc: "I want to expand my social circle" },
  { id: "explore", label: "Explore Chicago", emoji: "🏙️", desc: "Show me what the city has to offer" },
  { id: "new", label: "Try something new", emoji: "🚀", desc: "Get me out of my routine" },
  { id: "out", label: "Just get out of the house", emoji: "🚪", desc: "Any reason to leave is a good one" },
  { id: "community", label: "Find community", emoji: "🫂", desc: "Connect with people who get me" },
  { id: "solo", label: "Solo but social", emoji: "🦋", desc: "Going alone, open to connecting" },
  { id: "celebrate", label: "Celebrate something", emoji: "🎊", desc: "Big or small, I want to mark it" },
  { id: "dating", label: "Dating without pressure", emoji: "💫", desc: "Organic connections only" },
];

export default function IntentionPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex items-center px-5 pt-14 pb-4">
        <Link href="/onboarding/vibe" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 mr-4">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <span className="text-sm text-gray-400 font-medium">Step 4 of 7</span>
      </div>

      <div className="px-5 mb-8">
        <div className="flex gap-1.5">
          {[0,1,2,3,4,5,6].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= 3 ? "bg-violet-600" : "bg-gray-100"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">What are you hoping for?</h2>
        <p className="text-gray-500 mb-6">Pick all that apply.</p>

        <div className="flex flex-col gap-2.5 pb-4">
          {intentions.map(({ id, label, emoji, desc }) => {
            const on = selected.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${
                  on
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <div className="flex-1">
                  <div className={`font-semibold text-base ${on ? "text-violet-900" : "text-gray-900"}`}>{label}</div>
                  <div className="text-gray-400 text-sm">{desc}</div>
                </div>
                <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center ${on ? "border-violet-600 bg-violet-600" : "border-gray-300"}`}>
                  {on && (
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4l3 3.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-10 pt-4 bg-white">
        <button
          onClick={() => router.push("/onboarding/comfort")}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-colors ${selected.length > 0 ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-400"}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
