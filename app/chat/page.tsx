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

const attendees = [
  { name: "Priya", initials: "P", tag: "Soft host · Regular gatherer", stars: 12 },
  { name: "Maya", initials: "M", tag: "Going solo · Music lover", stars: 8 },
  { name: "Sam", initials: "S", tag: "Musician · Jazz fan", stars: 9 },
  { name: "Jordan", initials: "J", tag: "First time · Newcomer-friendly", stars: 3 },
];

const vibeEmojis = ["😐", "🙂", "😊", "🤩"];
const vibeLabels = ["Not my scene", "It was okay", "I had fun!", "Absolutely loved it"];

function EventEndedModal({ eventTitle, onClose }: { eventTitle: string; onClose: () => void }) {
  const router = useRouter();
  const [vibe, setVibe] = useState<number | null>(null);
  const [hangAgain, setHangAgain] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggleHang = (name: string) =>
    setHangAgain((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative w-full max-w-[390px] bg-white rounded-t-3xl px-6 pt-6 pb-12 z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center text-3xl mx-auto mb-4">✨</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thanks for gathering!</h3>
          <p className="text-gray-500 text-sm mb-2">You earned a ⭐ star for attending.</p>
          {hangAgain.size > 0 && (
            <p className="text-violet-600 font-medium text-sm mb-6">
              Connection requests sent to {Array.from(hangAgain).join(" & ")} 🎉
            </p>
          )}
          <button
            onClick={() => router.push("/suggestions")}
            className="w-full bg-violet-600 text-white py-4 rounded-2xl font-semibold text-lg"
          >
            Find your next Gather
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[390px] bg-white rounded-t-3xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Pull handle */}
        <div className="sticky top-0 bg-white pt-4 pb-2 px-6 rounded-t-3xl">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl px-4 py-4 mb-5 text-center">
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">Event ended</p>
            <h3 className="text-white font-bold text-lg leading-tight">{eventTitle}</h3>
            <p className="text-white/70 text-xs mt-1">Tonight · River North · You attended ⭐</p>
          </div>
        </div>

        <div className="px-6 pb-10 space-y-6">
          {/* Who attended */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Everyone who attended</h4>
            <div className="flex flex-col gap-2">
              {attendees.map(({ name, initials, tag, stars }) => (
                <div key={name} className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{name}</p>
                    <p className="text-gray-400 text-xs">{tag}</p>
                  </div>
                  <span className="text-yellow-500 text-xs font-medium">⭐ {stars}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rate the vibe */}
          <div>
            <h4 className="font-bold text-gray-900 mb-1">How was the vibe?</h4>
            <p className="text-gray-400 text-sm mb-4">Tap to rate the event</p>
            <div className="flex gap-3 justify-center">
              {vibeEmojis.map((emoji, i) => (
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
              <p className="text-center text-violet-600 text-sm font-medium mt-3">{vibeLabels[vibe]}</p>
            )}
          </div>

          {/* Hang again */}
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Would you hang out with anyone again?</h4>
            <p className="text-gray-400 text-sm mb-3">Mutual interest connects you both</p>
            <div className="flex flex-col gap-2">
              {attendees.map(({ name, initials, tag }) => {
                const on = hangAgain.has(name);
                return (
                  <button
                    key={name}
                    onClick={() => toggleHang(name)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all ${
                      on ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${on ? "text-violet-900" : "text-gray-900"}`}>{name}</p>
                      <p className="text-gray-400 text-xs">{tag}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
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

          {/* Submit */}
          <button
            onClick={() => setSubmitted(true)}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-colors ${
              vibe !== null ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            Submit & Earn Your ⭐
          </button>
          <button onClick={onClose} className="w-full text-center text-gray-400 text-sm py-1">
            Remind me later
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [showEndModal, setShowEndModal] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);
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

    // Trigger event-ended modal after first manual message
    if (!hasSentMessage) {
      setHasSentMessage(true);
      setTimeout(() => setShowEndModal(true), 1500);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50 min-h-screen">
      {showEndModal && (
        <EventEndedModal
          eventTitle={event.title}
          onClose={() => setShowEndModal(false)}
        />
      )}

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

          <button
            onClick={() => setShowEndModal(true)}
            className="flex-shrink-0 w-9 h-9 bg-violet-50 rounded-full flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="#7c3aed" strokeWidth="1.5"/>
              <path d="M9 6v4M9 12v.5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
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

        {/* "Event has ended" system message shown after first send */}
        {hasSentMessage && (
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-violet-200" />
            <span className="text-xs text-violet-500 font-medium">Event ended</span>
            <div className="flex-1 h-px bg-violet-200" />
          </div>
        )}

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
