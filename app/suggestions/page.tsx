"use client";

import { useState } from "react";
import Link from "next/link";

const topFilters = ["All", "Tonight", "This Weekend", "Music", "Food", "Outdoors", "Creative"];
const communityFilters = ["All communities", "LGBTQ+", "Women-only", "Men-only", "Sober", "BIPOC"];

const events = [
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
    timeFilters: ["Tonight"],
  },
  {
    id: 2,
    title: "Women's Creative Workshop",
    location: "Wicker Park",
    date: "Sat, May 16 · 2:00 PM",
    price: "Free",
    attendees: 9,
    maxAttendees: 14,
    tags: ["🎨 Creative", "🤝 Connect"],
    gradient: "from-pink-500 to-rose-600",
    vibe: "Cozy",
    match: 94,
    community: "Women-only",
    communityIcon: "♀",
    timeFilters: ["This Weekend"],
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
    timeFilters: ["This Weekend"],
  },
  {
    id: 4,
    title: "Coffee Shop Meetup + Bookstore Crawl",
    location: "Wicker Park",
    date: "Sat, May 16 · 11:00 AM",
    price: "Free",
    attendees: 8,
    maxAttendees: 12,
    tags: ["☕ Coffee", "📚 Books"],
    gradient: "from-amber-400 to-orange-500",
    vibe: "Cozy",
    match: 91,
    community: "All welcome",
    communityIcon: "🌍",
    timeFilters: ["This Weekend"],
  },
  {
    id: 5,
    title: "Men's Networking Happy Hour",
    location: "West Loop",
    date: "Tonight · 6:30 PM",
    price: "$10",
    attendees: 13,
    maxAttendees: 20,
    tags: ["🤝 Networking", "🍸 Drinks"],
    gradient: "from-teal-500 to-cyan-600",
    vibe: "High energy",
    match: 88,
    community: "Men-only",
    communityIcon: "♂",
    timeFilters: ["Tonight"],
  },
  {
    id: 6,
    title: "Sober Farmers Market + Lakefront Walk",
    location: "Hyde Park",
    date: "Sun, May 17 · 10:00 AM",
    price: "Free",
    attendees: 11,
    maxAttendees: 16,
    tags: ["🌿 Outdoor", "🍓 Market"],
    gradient: "from-green-400 to-lime-500",
    vibe: "Chill",
    match: 85,
    community: "Sober & mindful",
    communityIcon: "🌿",
    timeFilters: ["This Weekend"],
  },
  {
    id: 7,
    title: "Open Mic Night at The Promontory",
    location: "Hyde Park",
    date: "Tonight · 8:00 PM",
    price: "$8",
    attendees: 22,
    maxAttendees: 40,
    tags: ["🎤 Open mic", "🎵 Music"],
    gradient: "from-rose-500 to-orange-500",
    vibe: "High energy",
    match: 83,
    community: "All welcome",
    communityIcon: "🌍",
    timeFilters: ["Tonight"],
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
    timeFilters: ["This Weekend"],
  },
  {
    id: 9,
    title: "BIPOC Wellness & Yoga Morning",
    location: "Pilsen",
    date: "Sat, May 16 · 9:00 AM",
    price: "Free",
    attendees: 10,
    maxAttendees: 18,
    tags: ["🧘 Wellness", "🌿 Outdoor"],
    gradient: "from-orange-400 to-red-500",
    vibe: "Chill",
    match: 79,
    community: "BIPOC community",
    communityIcon: "✊",
    timeFilters: ["This Weekend"],
  },
];

const communityMap: Record<string, string[]> = {
  "All communities": [],
  "LGBTQ+": ["LGBTQ+ inclusive"],
  "Women-only": ["Women-only"],
  "Men-only": ["Men-only"],
  "Sober": ["Sober & mindful"],
  "BIPOC": ["BIPOC community", "All welcome"],
};

export default function SuggestionsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [communityFilter, setCommunityFilter] = useState("All communities");
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const toggleSave = (id: number) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allowedCommunities = communityMap[communityFilter] ?? [];
  const filtered = events.filter((e) => {
    const communityMatch = allowedCommunities.length === 0 || allowedCommunities.includes(e.community);
    const timeMatch = activeFilter === "All" || activeFilter === "Music" || activeFilter === "Food" || activeFilter === "Outdoors" || activeFilter === "Creative"
      ? true
      : e.timeFilters.includes(activeFilter);
    return communityMatch && timeMatch;
  });

  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Gather</h1>
            <p className="text-gray-500 text-sm">Chicago · May 12–18</p>
          </div>
          <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-semibold text-sm">
            A
          </Link>
        </div>

        {/* Event type filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 mb-2">
          {topFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === f ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Community filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {communityFilters.map((f) => (
            <button
              key={f}
              onClick={() => setCommunityFilter(f)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                communityFilter === f
                  ? "bg-violet-100 text-violet-700 border-violet-300"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {f === "LGBTQ+" ? "🏳️‍🌈 " : f === "Women-only" ? "♀ " : f === "Men-only" ? "♂ " : ""}{f}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          {filtered.length} curated experiences for you
        </p>

        {filtered.map((event) => (
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
                <button
                  onClick={(e) => { e.preventDefault(); toggleSave(event.id); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill={saved.has(event.id) ? "white" : "none"} stroke="white" strokeWidth="1.5">
                    <path d="M8 13.5s-6-3.5-6-7.5a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4-6 7.5-6 7.5z" />
                  </svg>
                </button>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  {/* Community badge */}
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
                      {["violet", "indigo", "pink", "amber"].slice(0, Math.min(4, event.attendees)).map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-violet-300" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {event.attendees}/{event.maxAttendees} going
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      event.price === "Free" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                    }`}>
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

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-gray-700">No events found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your community filter</p>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-6 py-3 pb-6 flex justify-around">
        {[
          { icon: "🔍", label: "Explore", href: "/suggestions", active: true },
          { icon: "🔖", label: "Saved", href: "/suggestions", active: false },
          { icon: "👥", label: "Groups", href: "/suggestions", active: false },
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
