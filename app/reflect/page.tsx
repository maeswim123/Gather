"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const vibeRatings = ["😐", "🙂", "😊", "🤩"];
const worthItOptions = [
  { id: "yes", label: "100% worth it", emoji: "✨" },
  { id: "mostly", label: "Mostly yes", emoji: "👍" },
  { id: "maybe", label: "Eh, maybe", emoji: "🤷" },
  { id: "no", label: "Not for me", emoji: "😬" },
];

const members = [
  { name: "Maya", emoji: "👩🏽", interest: "Also loves live music" },
  { name: "Priya", emoji: "👩🏾", interest: "Soft host · Regular gatherer" },
  { name: "Sam", emoji: "🧑🏿", interest: "Musician · Jazz fan" },
];

export default function ReflectPage() {
  const [vibe, setVibe] = useState<number | null>(null);
  const [worthIt, setWorthIt] = useState<string | null>(null);
  const [hangAgain, setHangAgain] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);
  const router = useRouter();

  const toggleHang = (name: string) => {
    setHangAgain((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  if (done) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-white px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center text-4xl mb-6">✨</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Thanks for gathering!</h2>
        <p className="text-gray-500 mb-2">Your feedback helps us find better plans for next time.</p>
        {hangAgain.size > 0 && (
          <p className="text-violet-600 font-medium text-sm mb-8">
            Connection requests sent to {Array.from(hangAgain).join(" & ")} 🎉
          </p>
        )}
        <Link
          href="/"
          className="w-full bg-violet-600 text-white py-4 rounded-2xl font-semibold text-lg"
        >
          Back to Gather
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Header */}
      <div className="px-5 pt-14 pb-6 border-b border-gray-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-lg">🎵</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Rooftop Happy Hour + Live Jazz</h3>
            <p className="text-gray-400 text-xs">Tonight · River North</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">How was your Gather?</h2>
        <p className="text-gray-500 text-sm mt-1">This helps us find you better plans next time.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
        {/* Vibe rating */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Did you enjoy the vibe?</h3>
          <p className="text-gray-400 text-sm mb-4">Be honest — it all helps.</p>
          <div className="flex gap-3 justify-center">
            {vibeRatings.map((emoji, i) => (
              <button
                key={i}
                onClick={() => setVibe(i)}
                className={`w-16 h-16 rounded-2xl text-3xl flex items-center justify-center transition-all border-2 ${
                  vibe === i ? "border-violet-500 bg-violet-50 scale-110" : "border-gray-100 bg-gray-50"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          {vibe !== null && (
            <p className="text-center text-violet-600 text-sm font-medium mt-3">
              {["Not really my scene", "It was okay", "I had fun!", "Absolutely loved it"][vibe]}
            </p>
          )}
        </div>

        {/* Worth leaving the house */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Was it worth leaving the house?</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {worthItOptions.map(({ id, label, emoji }) => {
              const on = worthIt === id;
              return (
                <button
                  key={id}
                  onClick={() => setWorthIt(id)}
                  className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                    on ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className={`text-sm font-medium ${on ? "text-violet-800" : "text-gray-700"}`}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hang again */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Would you hang out with anyone again?</h3>
          <p className="text-gray-400 text-sm mb-4">Mutual interest means both of you want to connect.</p>
          <div className="flex flex-col gap-2.5">
            {members.map(({ name, emoji, interest }) => {
              const on = hangAgain.has(name);
              return (
                <button
                  key={name}
                  onClick={() => toggleHang(name)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all ${
                    on ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-xl">
                    {emoji}
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`font-semibold text-sm ${on ? "text-violet-900" : "text-gray-900"}`}>{name}</div>
                    <div className="text-gray-400 text-xs">{interest}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
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
        </div>

        {/* Feedback note */}
        <div className="bg-gray-50 rounded-2xl px-4 py-3">
          <p className="text-gray-500 text-sm">
            <span className="font-medium text-gray-700">Your next Gather is already better.</span>{" "}
            We use your answers to refine your future matches and recommendations.
          </p>
        </div>
      </div>

      <div className="px-6 pb-10 pt-4 border-t border-gray-50">
        <button
          onClick={() => setDone(true)}
          className="w-full py-4 rounded-2xl font-semibold text-lg bg-violet-600 text-white"
        >
          Submit & Finish ✓
        </button>
        <button
          onClick={() => router.push("/suggestions")}
          className="w-full py-3 text-gray-400 text-sm mt-2"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
