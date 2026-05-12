"use client";

import { useState } from "react";
import Link from "next/link";

const savedEvents = [
  {
    id: 1,
    title: "Rooftop Happy Hour + Live Jazz",
    location: "River North",
    date: "Tonight · 6:00 PM",
    price: "$12",
    attendees: 14,
    maxAttendees: 20,
    tags: ["🎵 Live music", "🍹 Drinks"],
    gradient: "from-violet-500 to-indigo-600",
    vibe: "High energy",
    match: 97,
    community: "All welcome",
    communityIcon: "🌍",
  },
  {
    id: 3,
    title: "LGBTQ+ Game Night",
    location: "Boystown",
    date: "Fri, May 15 · 7:00 PM",
    price: "$5",
    attendees: 17,
    maxAttendees: 25,
    tags: ["🏳️‍🌈 Community", "🎮 Games"],
    gradient: "from-purple-500 to-fuchsia-600",
    vibe: "Low-pressure social",
    match: 92,
    community: "LGBTQ+ inclusive",
    communityIcon: "🏳️‍🌈",
  },
  {
    id: 8,
    title: "Sunday Brunch Collective",
    location: "Logan Square",
    date: "Sun, May 17 · 11:30 AM",
    price: "Free",
    attendees: 7,
    maxAttendees: 12,
    tags: ["🍳 Brunch", "☕ Coffee"],
    gradient: "from-yellow-400 to-amber-500",
    vibe: "Cozy",
    match: 81,
    community: "All welcome",
    communityIcon: "🌍",
  },
];

export default function SavedPage() {
  const [unsaved, setUnsaved] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setUnsaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visible = savedEvents.filter((e) => !unsaved.has(e.id));

  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Saved</h1>
        <p className="text-gray-500 text-sm">{visible.length} event{visible.length !== 1 ? "s" : ""} bookmarked</p>
      </div>

      {/* Events */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4">
        {visible.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔖</p>
            <p className="font-semibold text-gray-700 text-lg">No saved events</p>
            <p className="text-gray-400 text-sm mt-1">Bookmark events from the Explore tab</p>
            <Link
              href="/suggestions"
              className="inline-block mt-5 bg-violet-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm"
            >
              Browse Events
            </Link>
          </div>
        )}

        {visible.map((event) => (
          <Link key={event.id} href={`/group?id=${event.id}`} className="block">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform">
              {/* Image area */}
              <div className={`h-44 bg-gradient-to-br ${event.gradient} relative`}>
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap max-w-[200px]">
                  {event.tags.map((tag) => (
                    <span key={tag} className="bg-black/25 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Unsave button */}
                <button
                  onClick={(e) => { e.preventDefault(); toggle(event.id); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="white" stroke="white" strokeWidth="1.5">
                    <path d="M8 13.5s-6-3.5-6-7.5a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4-6 7.5-6 7.5z" />
                  </svg>
                </button>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/30 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {event.communityIcon} {event.community}
                  </span>
                  <span className="bg-black/25 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {event.match}% match
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="px-4 py-3.5">
                <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{event.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span>📍 {event.location}</span>
                  <span>·</span>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(4, event.attendees))].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-violet-300" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{event.attendees}/{event.maxAttendees} going</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${event.price === "Free" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                      {event.price}
                    </span>
                    <span className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full font-medium">
                      {event.vibe}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-6 py-3 pb-6 flex justify-around">
        {[
          { icon: "🔍", label: "Explore", href: "/suggestions", active: false },
          { icon: "🔖", label: "Saved", href: "/saved", active: true },
          { icon: "👥", label: "Groups", href: "/groups", active: false },
          { icon: "👤", label: "Profile", href: "/profile", active: false },
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
