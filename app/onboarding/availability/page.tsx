"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// May 2026: starts on Friday (index 5)
const MAY_START = 5;
const MAY_DAYS = 31;

const times = [
  { id: "morning", label: "Morning", sub: "8am–12pm", emoji: "🌅" },
  { id: "afternoon", label: "Afternoon", sub: "12pm–5pm", emoji: "☀️" },
  { id: "evening", label: "Evening", sub: "5pm–9pm", emoji: "🌆" },
  { id: "night", label: "Late night", sub: "9pm–late", emoji: "🌙" },
];

const budgets = ["Free", "Under $20", "$20–$50", "$50+", "Flexible"];
const neighborhoods = ["All Chicago", "Wicker Park", "Logan Square", "River North", "Hyde Park", "West Loop", "Lincoln Park", "Old Town", "Lake View", "Wrigleyville"];

export default function AvailabilityPage() {
  const [selectedDates, setSelectedDates] = useState<Set<number>>(new Set());
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());
  const [budgets, setBudgets] = useState<Set<string>>(new Set());
  const [neighborhood, setNeighborhood] = useState("All Chicago");

  const toggleBudget = (b: string) => {
    setBudgets((prev) => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
  };
  const router = useRouter();

  const toggleDate = (d: number) => {
    setSelectedDates((prev) => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });
  };

  const toggleTime = (id: string) => {
    setSelectedTimes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const today = 12; // May 12

  // Build calendar grid
  const cells: (number | null)[] = [
    ...Array(MAY_START).fill(null),
    ...Array.from({ length: MAY_DAYS }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex items-center px-5 pt-14 pb-4">
        <Link href="/onboarding/community" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 mr-4">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <span className="text-sm text-gray-400 font-medium">Step 7 of 7</span>
      </div>

      <div className="px-5 mb-6">
        <div className="flex gap-1.5">
          {[0,1,2,3,4,5,6].map((i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-violet-600" />
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">When are you free?</h2>
        <p className="text-gray-500 mb-5">Select dates that work for you this month.</p>

        {/* Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900">May 2026</span>
            <span className="text-sm text-gray-400">Chicago, IL</span>
          </div>
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {days.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const isPast = day < today;
              const isToday = day === today;
              const isSel = selectedDates.has(day);
              return (
                <button
                  key={i}
                  disabled={isPast}
                  onClick={() => toggleDate(day)}
                  className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                    isPast
                      ? "text-gray-200 cursor-default"
                      : isSel
                      ? "bg-violet-600 text-white"
                      : isToday
                      ? "border-2 border-violet-400 text-violet-700"
                      : "hover:bg-violet-50 text-gray-700"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time preferences */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Preferred times</h3>
          <div className="grid grid-cols-2 gap-2">
            {times.map(({ id, label, sub, emoji }) => {
              const on = selectedTimes.has(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleTime(id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left transition-all ${
                    on ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{emoji}</span>
                  <div>
                    <div className={`text-sm font-medium ${on ? "text-violet-900" : "text-gray-800"}`}>{label}</div>
                    <div className="text-xs text-gray-400">{sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-1">How much are you willing to spend?</h3>
          <p className="text-gray-400 text-sm mb-3">Pick all that work for you</p>
          <div className="flex flex-wrap gap-2">
            {["Free", "Under $20", "$20–$50", "$50+", "Flexible"].map((b) => {
              const on = budgets.has(b);
              return (
                <button
                  key={b}
                  onClick={() => toggleBudget(b)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium border-2 transition-all flex items-center gap-1.5 ${
                    on ? "border-violet-500 bg-violet-600 text-white" : "border-gray-200 bg-gray-50 text-gray-700"
                  }`}
                >
                  {on && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {b}
                </button>
              );
            })}
          </div>
          {budgets.size > 0 && (
            <p className="text-violet-600 text-xs font-medium mt-2">
              {budgets.size} {budgets.size === 1 ? "option" : "options"} selected
            </p>
          )}
        </div>

        {/* Neighborhood */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Neighborhood</h3>
          <div className="flex flex-wrap gap-2">
            {neighborhoods.map((n) => (
              <button
                key={n}
                onClick={() => setNeighborhood(n)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  neighborhood === n ? "border-violet-500 bg-violet-600 text-white" : "border-gray-200 bg-gray-50 text-gray-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 pt-4 bg-white border-t border-gray-50">
        <button
          onClick={() => router.push("/suggestions")}
          className="w-full py-4 rounded-2xl font-semibold text-lg bg-violet-600 text-white"
        >
          Find My Gather ✨
        </button>
      </div>
    </div>
  );
}
