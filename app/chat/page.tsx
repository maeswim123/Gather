"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const events: Record<string, { title: string; short: string; emoji: string }> = {
  "1": { title: "Rooftop Happy Hour + Live Jazz", short: "tonight's event", emoji: "🎵" },
  "2": { title: "Women's Creative Workshop", short: "the workshop", emoji: "🎨" },
  "3": { title: "LGBTQ+ Game Night", short: "game night", emoji: "🏳️‍🌈" },
  "4": { title: "Coffee Shop Meetup + Bookstore Crawl", short: "the crawl", emoji: "☕" },
  "5": { title: "Men's Networking Happy Hour", short: "the mixer", emoji: "🤝" },
  "6": { title: "Sober Farmers Market + Lakefront Walk", short: "the walk", emoji: "🌿" },
};

const seedMessages = [
  { id: 1, name: "Priya", initials: "P", text: "Hey everyone! So excited for this 🙌", time: "5:42 PM", isMe: false },
  { id: 2, name: "Maya", initials: "M", text: "Same!! Been looking forward to this all week", time: "5:43 PM", isMe: false },
  { id: 3, name: "Sam", initials: "S", text: "Anyone need a good spot to park nearby?", time: "5:44 PM", isMe: false },
  { id: 4, name: "Jordan", initials: "J", text: "I'll be taking the Blue Line — anyone else?", time: "5:45 PM", isMe: false },
];

function ChatContent() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id") || "1";
  const event = events[id] || events["1"];

  const autoMessage = `Can't wait for ${event.title}! ${event.emoji}`;

  const [messages, setMessages] = useState([
    ...seedMessages,
    { id: 5, name: "You", initials: "A", text: autoMessage, time: "5:46 PM", isMe: true },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), name: "You", initials: "A", text: trimmed, time, isMe: true },
    ]);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-14 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 14L6 9l5-5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex -space-x-2 flex-shrink-0">
            {["P","M","S","J"].map((initial, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                {initial}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-violet-100 border-2 border-white flex items-center justify-center text-violet-600 text-xs font-bold">
              +1
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">{event.title}</p>
            <p className="text-gray-400 text-xs">5 members · Tonight</p>
          </div>

          <Link href="/reflect" className="flex-shrink-0">
            <div className="w-9 h-9 bg-violet-50 rounded-full flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#7c3aed" strokeWidth="1.5"/>
                <path d="M9 6v4M9 12v.5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Event reminder banner */}
      <div className="mx-4 mt-3 bg-violet-50 border border-violet-100 rounded-2xl px-4 py-2.5 flex items-center gap-2.5">
        <span className="text-lg">{event.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-violet-800 text-xs font-semibold truncate">{event.title}</p>
          <p className="text-violet-400 text-xs">Tonight · Remember: cancel 24 hrs early to keep your ⭐</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Date label */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">Today</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {messages.map((msg, i) => {
          const showName = !msg.isMe && (i === 0 || messages[i - 1]?.name !== msg.name);
          return (
            <div key={msg.id} className={`flex gap-2 ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
              {!msg.isMe && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-auto">
                  {msg.initials}
                </div>
              )}
              <div className={`max-w-[72%] ${msg.isMe ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                {showName && (
                  <span className="text-xs text-gray-400 font-medium px-1">{msg.name}</span>
                )}
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.isMe
                    ? "bg-violet-600 text-white rounded-br-sm"
                    : "bg-white text-gray-900 border border-gray-100 rounded-bl-sm shadow-sm"
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 pb-8">
        <div className="flex items-end gap-2">
          <div className="flex-1 border-2 border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-violet-500 transition-colors bg-white">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Message the group..."
              rows={1}
              className="w-full text-gray-900 text-sm outline-none resize-none placeholder:text-gray-300 max-h-24"
            />
          </div>
          <button
            onClick={send}
            disabled={!input.trim()}
            className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              input.trim() ? "bg-violet-600" : "bg-gray-100"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15 9L3 3l2 6-2 6 12-6z" fill={input.trim() ? "white" : "#d1d5db"} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatContent />
    </Suspense>
  );
}
