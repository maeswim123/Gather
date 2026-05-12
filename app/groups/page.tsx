"use client";

import Link from "next/link";

const joinedGroups = [
  {
    id: 1,
    title: "Rooftop Happy Hour + Live Jazz",
    location: "Raised Bar, River North",
    date: "Tonight · 6:00 PM",
    gradient: "from-violet-500 to-indigo-600",
    status: "Tonight",
    statusColor: "bg-rose-100 text-rose-600",
    price: "$12",
    attendees: 14,
    maxAttendees: 20,
    community: "All welcome",
    communityIcon: "🌍",
    members: ["M", "J", "P", "A", "S"],
    icebreaker: "What's the best live show you've ever been to?",
    chatPreview: "Priya: Can't wait for tonight! 🎵",
    chatTime: "2m ago",
  },
  {
    id: 2,
    title: "Women's Creative Workshop",
    location: "Wicker Park",
    date: "Sat, May 16 · 2:00 PM",
    gradient: "from-pink-500 to-rose-600",
    status: "This Weekend",
    statusColor: "bg-violet-100 text-violet-600",
    price: "Free",
    attendees: 9,
    maxAttendees: 14,
    community: "Women-only",
    communityIcon: "♀",
    members: ["L", "K", "R", "T"],
    icebreaker: "What's a creative project you've been putting off?",
    chatPreview: "Kezia: Anyone bringing supplies? 🎨",
    chatTime: "1h ago",
  },
];

const pastGroups = [
  {
    id: "past1",
    title: "Logan Square Food Crawl",
    date: "May 8",
    gradient: "from-amber-500 to-orange-600",
    members: ["D", "N", "C"],
    starred: true,
  },
];

export default function GroupsPage() {
  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">My Groups</h1>
        <p className="text-gray-500 text-sm">{joinedGroups.length} upcoming · {pastGroups.length} past</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-24 space-y-6">

        {/* Upcoming */}
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Upcoming</p>
          <div className="space-y-4">
            {joinedGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                {/* Gradient banner */}
                <div className={`h-28 bg-gradient-to-br ${group.gradient} relative`}>
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${group.statusColor}`}>
                      {group.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="bg-black/30 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                      {group.communityIcon} {group.community}
                    </span>
                    <span className="bg-black/25 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                      {group.price}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="px-4 pt-3.5 pb-2">
                  <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{group.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>📍 {group.location}</span>
                    <span>·</span>
                    <span>{group.date}</span>
                  </div>

                  {/* Members row */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-2">
                      {group.members.map((initial, i) => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                          {initial}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{group.attendees}/{group.maxAttendees} going</span>
                  </div>

                  {/* Icebreaker */}
                  <div className="bg-violet-50 border border-violet-100 rounded-xl px-3 py-2 mb-3">
                    <p className="text-violet-500 text-[10px] font-semibold uppercase tracking-wider mb-0.5">💬 Icebreaker</p>
                    <p className="text-violet-800 text-xs font-medium">"{group.icebreaker}"</p>
                  </div>

                  {/* Chat preview + actions */}
                  <div className="flex items-center gap-2 pt-1 pb-1 border-t border-gray-50">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 truncate">{group.chatPreview}</p>
                      <p className="text-[10px] text-gray-400">{group.chatTime}</p>
                    </div>
                    <Link
                      href={`/chat?id=${group.id}`}
                      className="flex-shrink-0 bg-violet-600 text-white text-xs font-semibold px-3 py-2 rounded-xl"
                    >
                      Open Chat
                    </Link>
                    <Link
                      href={`/group?id=${group.id}`}
                      className="flex-shrink-0 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-xl"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past */}
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Past</p>
          <div className="space-y-3">
            {pastGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex items-center gap-3 px-4 py-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.gradient} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{group.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex -space-x-1.5">
                      {group.members.map((initial, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border border-white bg-violet-300 flex items-center justify-center text-white text-[9px] font-bold">
                          {initial}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{group.date}</p>
                  </div>
                </div>
                {group.starred && (
                  <div className="flex-shrink-0 text-right">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <p className="text-[10px] text-gray-400">+1 star earned</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Explore CTA */}
        <div className="bg-violet-50 border border-violet-100 rounded-2xl px-5 py-5 text-center">
          <p className="text-2xl mb-2">🗓️</p>
          <p className="font-semibold text-violet-900 text-sm mb-1">Find your next Gather</p>
          <p className="text-violet-500 text-xs mb-4">New events drop every week in Chicago</p>
          <Link
            href="/suggestions"
            className="inline-block bg-violet-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
          >
            Browse Events
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-6 py-3 pb-6 flex justify-around">
        {[
          { icon: "🔍", label: "Explore", href: "/suggestions", active: false },
          { icon: "🔖", label: "Saved", href: "/saved", active: false },
          { icon: "👥", label: "Groups", href: "/groups", active: true },
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
