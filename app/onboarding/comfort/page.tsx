"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const settings = [
  { id: "small", label: "Small intimate group", emoji: "🫂", desc: "4–8 people" },
  { id: "larger", label: "Larger social group", emoji: "👥", desc: "10–20 people" },
  { id: "structured", label: "Structured interaction", emoji: "🗂️", desc: "Guided activities or games" },
  { id: "strangers", label: "Okay talking to strangers", emoji: "💬", desc: "I'll spark conversations" },
  { id: "low-pressure", label: "Low-pressure conversation", emoji: "🌸", desc: "No forced mingling" },
  { id: "first-time", label: "First time going alone", emoji: "🦊", desc: "New to this — be gentle" },
];

const energyLevels = [
  { id: "low", label: "Low energy", sub: "Quiet night, no pressure" },
  { id: "open", label: "Open to conversation", sub: "I'll chat if it flows" },
  { id: "ready", label: "Ready to meet everyone", sub: "Let's go all in" },
];

export default function ComfortPage() {
  const [setting, setSetting] = useState<string | null>(null);
  const [energy, setEnergy] = useState(1);
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex items-center px-5 pt-14 pb-4">
        <Link href="/onboarding/intention" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 mr-4">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <span className="text-sm text-gray-400 font-medium">Step 5 of 7</span>
      </div>

      <div className="px-5 mb-8">
        <div className="flex gap-1.5">
          {[0,1,2,3,4,5,6].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? "bg-violet-600" : "bg-gray-100"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">Comfort level</h2>
        <p className="text-gray-500 mb-6">How do you want the experience to feel?</p>

        <div className="flex flex-col gap-2 mb-8">
          {settings.map(({ id, label, emoji, desc }) => {
            const on = setting === id;
            return (
              <button
                key={id}
                onClick={() => setSetting(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                  on ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-gray-50"
                }`}
              >
                <span className="text-xl">{emoji}</span>
                <div>
                  <div className={`font-medium text-sm ${on ? "text-violet-900" : "text-gray-800"}`}>{label}</div>
                  <div className="text-gray-400 text-xs">{desc}</div>
                </div>
                <div className={`ml-auto w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${on ? "border-violet-600 bg-violet-600" : "border-gray-300"}`}>
                  {on && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-1">Social energy</h3>
          <p className="text-gray-400 text-sm mb-4">Slide to set your level for the night</p>
          
          <div className="flex gap-2">
            {energyLevels.map(({ id, label, sub }, i) => {
              const on = energy === i;
              return (
                <button
                  key={id}
                  onClick={() => setEnergy(i)}
                  className={`flex-1 py-3 px-2 rounded-xl border-2 text-center transition-all ${
                    on ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <div className={`text-xs font-semibold mb-0.5 leading-tight ${on ? "text-violet-800" : "text-gray-700"}`}>{label}</div>
                  <div className="text-gray-400 text-[10px] leading-tight">{sub}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-gray-400">🔋</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-all duration-300"
                style={{ width: `${((energy + 1) / 3) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">⚡</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 pt-4 bg-white">
        <button
          onClick={() => router.push("/onboarding/community")}
          className="w-full py-4 rounded-2xl font-semibold text-lg bg-violet-600 text-white transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
