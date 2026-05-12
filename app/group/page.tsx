"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

const events = [
  {
    id: "1",
    title: "Rooftop Happy Hour + Live Jazz",
    location: "Raised Bar, River North",
    date: "Tonight · 6:00 PM",
    price: "$12",
    gradient: "from-violet-500 to-indigo-600",
    attendees: 14,
    maxAttendees: 20,
    spotsLeft: 6,
    community: "All welcome",
    communityIcon: "🌍",
    description: "Start with rooftop cocktails as the sun sets, then catch an intimate jazz set from local quartet Blue Current. Curated for people who love good music and better conversation.",
    sharedInterests: ["Live music", "Trying new restaurants", "Meeting new people"],
    icebreaker: "What's the best live show you've ever been to?",
    members: [
      { name: "Maya", initials: "M", tag: "Going solo · Music lover", mutual: true, stars: 8 },
      { name: "Jordan", initials: "J", tag: "Newcomer-friendly · First time", mutual: true, stars: 3 },
      { name: "Priya", initials: "P", tag: "Soft host · Regular gatherer", host: true, stars: 12 },
      { name: "Alex", initials: "A", tag: "Going solo · Foodie", mutual: false, stars: 6 },
      { name: "Sam", initials: "S", tag: "Musician · Jazz fan", mutual: true, stars: 9 },
    ],
  },
];

const fallbackEvent = events[0];

type ReportStep = "menu" | "category" | "submitted";

function ReportSheet({ name, onClose }: { name: string; onClose: () => void }) {
  const [step, setStep] = useState<ReportStep>("menu");
  const [category, setCategory] = useState("");

  const categories = [
    { id: "harassment", label: "Harassment or inappropriate behavior" },
    { id: "fake", label: "Fake or misleading profile" },
    { id: "safety", label: "Safety concern" },
    { id: "spam", label: "Spam or solicitation" },
    { id: "other", label: "Other" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[390px] bg-white rounded-t-3xl px-5 pt-5 pb-10 z-10">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />

        {step === "menu" && (
          <>
            <h3 className="font-bold text-gray-900 text-lg mb-1">More options</h3>
            <p className="text-gray-500 text-sm mb-5">What would you like to do?</p>
            <div className="space-y-2">
              <button
                onClick={() => setStep("category")}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-red-50 border border-red-100 text-left"
              >
                <span className="text-xl">🚩</span>
                <div>
                  <div className="font-semibold text-red-700 text-sm">Report {name}</div>
                  <div className="text-red-400 text-xs">Flag a safety or conduct concern</div>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-left">
                <span className="text-xl">🚫</span>
                <div>
                  <div className="font-semibold text-gray-700 text-sm">Block {name}</div>
                  <div className="text-gray-400 text-xs">They won't be matched with you again</div>
                </div>
              </button>
              <button onClick={onClose} className="w-full text-center py-3 text-gray-400 text-sm font-medium">
                Cancel
              </button>
            </div>
          </>
        )}

        {step === "category" && (
          <>
            <button onClick={() => setStep("menu")} className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Report {name}</h3>
            <p className="text-gray-500 text-sm mb-5">What's the issue? This is confidential.</p>
            <div className="space-y-2 mb-5">
              {categories.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setCategory(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm transition-all ${
                    category === id ? "border-red-400 bg-red-50 text-red-800" : "border-gray-100 text-gray-700"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${category === id ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                  {label}
                </button>
              ))}
            </div>
            <button
              disabled={!category}
              onClick={() => setStep("submitted")}
              className={`w-full py-4 rounded-2xl font-semibold text-base transition-colors ${
                category ? "bg-red-500 text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              Submit Report
            </button>
          </>
        )}

        {step === "submitted" && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
            <h3 className="font-bold text-gray-900 text-xl mb-2">Report submitted</h3>
            <p className="text-gray-500 text-sm mb-6">
              Thank you for keeping Gather safe. Our team will review this within 24 hours. {name} will not be notified.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function GroupContent() {
  const params = useSearchParams();
  const id = params.get("id") || "1";
  const event = events.find((e) => e.id === id) || fallbackEvent;
  const router = useRouter();
  const [reportTarget, setReportTarget] = useState<string | null>(null);

  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-screen">
      {reportTarget && (
        <ReportSheet name={reportTarget} onClose={() => setReportTarget(null)} />
      )}

      {/* Hero */}
      <div className={`h-56 bg-gradient-to-br ${event.gradient} relative`}>
        <button
          onClick={() => router.back()}
          className="absolute top-14 left-5 w-9 h-9 bg-black/25 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Community badge */}
        <div className="absolute top-14 right-5 bg-black/25 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
          {event.communityIcon} {event.community}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="text-white/80 text-sm mb-0.5">📍 {event.location}</p>
            <p className="text-white/80 text-sm">{event.date}</p>
          </div>
          <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-medium">
            {event.price}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Title */}
        <div className="bg-white px-5 pt-5 pb-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h1>
          <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
        </div>

        {/* Spots */}
        <div className="bg-white mx-5 mt-4 rounded-2xl px-4 py-3 flex items-center gap-3 border border-amber-100">
          <span className="text-xl">⏳</span>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Only {event.spotsLeft} spots left</p>
            <p className="text-gray-500 text-xs">{event.attendees} of {event.maxAttendees} confirmed</p>
          </div>
          <div className="ml-auto flex-shrink-0">
            <div className="h-1.5 w-20 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Shared interests */}
        <div className="px-5 mt-6">
          <h2 className="font-bold text-gray-900 mb-3">What this group shares</h2>
          <div className="flex flex-wrap gap-2 mb-1">
            {event.sharedInterests.map((interest) => (
              <span key={interest} className="bg-violet-50 text-violet-700 text-sm px-3 py-1.5 rounded-full font-medium border border-violet-100">
                ✓ {interest}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-2">3 people in this group also love live music and trying new restaurants.</p>
        </div>

        {/* Who's going */}
        <div className="px-5 mt-6">
          <h2 className="font-bold text-gray-900 mb-3">Who's going</h2>
          <div className="flex flex-col gap-2.5">
            {event.members.map(({ name, initials, tag, host, mutual, stars }) => (
              <div key={name} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-100">
                {/* Initials avatar — no photos */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{name}</span>
                    {host && (
                      <span className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded-full font-medium">Soft host</span>
                    )}
                    {mutual && !host && (
                      <span className="bg-violet-100 text-violet-700 text-[10px] px-1.5 py-0.5 rounded-full font-medium">Mutual interests</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-gray-400 text-xs">{tag}</span>
                    <span className="text-yellow-500 text-xs">⭐ {stars}</span>
                  </div>
                </div>
                {/* Report / more options */}
                <button
                  onClick={() => setReportTarget(name)}
                  className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="3" r="1" fill="#9ca3af" />
                    <circle cx="7" cy="7" r="1" fill="#9ca3af" />
                    <circle cx="7" cy="11" r="1" fill="#9ca3af" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-3 text-center">Tap ··· on any profile to report or block</p>
        </div>

        {/* Icebreaker */}
        <div className="px-5 mt-6">
          <div className="bg-violet-50 border border-violet-100 rounded-2xl px-4 py-4">
            <p className="text-violet-500 text-xs font-semibold uppercase tracking-wider mb-2">💬 Icebreaker prompt</p>
            <p className="text-violet-900 font-medium text-base">"{event.icebreaker}"</p>
            <p className="text-violet-400 text-xs mt-2">Shared with the group when you join</p>
          </div>
        </div>

        {/* Star incentive reminder */}
        <div className="px-5 mt-4">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-semibold text-amber-800 text-sm">Earn a star for attending</p>
              <p className="text-amber-600 text-xs">10 stars = free drink or merch at any event</p>
            </div>
          </div>
        </div>

        {/* Safety note */}
        <div className="px-5 mt-4 mb-6">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <span>🔒</span>
            <span>Phone verified · Community guidelines agreed · Curated group placement</span>
          </div>
        </div>
      </div>

      {/* Join button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-5 py-4 pb-8">
        <div className="flex gap-3">
          <button className="w-12 h-14 rounded-2xl border-2 border-gray-200 flex items-center justify-center text-gray-500 text-lg">
            🔖
          </button>
          <Link
            href="/reflect"
            className="flex-1 bg-violet-600 text-white text-center py-4 rounded-2xl font-semibold text-base"
          >
            Join this Gather →
          </Link>
        </div>
        <p className="text-center text-gray-400 text-xs mt-2">You can cancel up to 24 hours before · No-shows lose a ⭐</p>
      </div>
    </div>
  );
}

export default function GroupPage() {
  return (
    <Suspense>
      <GroupContent />
    </Suspense>
  );
}
