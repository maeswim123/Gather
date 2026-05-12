"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PhonePage() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Header */}
      <div className="flex items-center px-5 pt-14 pb-4">
        <Link href="/" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 mr-4">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <span className="text-sm text-gray-400 font-medium">Step 1 of 7</span>
      </div>

      {/* Progress */}
      <div className="px-5 mb-8">
        <div className="flex gap-1.5">
          {[0,1,2,3,4,5,6].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i === 0 ? "bg-violet-600" : "bg-gray-100"}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your number?</h2>
        <p className="text-gray-500 mb-8">We'll use this to keep your account secure. No spam, ever.</p>

        <div className="space-y-4">
          <div className="flex items-center border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-violet-500 transition-colors">
            <span className="text-gray-400 text-lg mr-2">🇺🇸</span>
            <span className="text-gray-500 mr-2 text-lg">+1</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(312) 555-0100"
              className="flex-1 text-gray-900 text-lg outline-none placeholder:text-gray-300"
            />
          </div>
          <p className="text-xs text-gray-400 text-center px-4">
            By continuing you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10">
        <button
          onClick={() => phone.length >= 14 && router.push("/onboarding/interests")}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-colors ${phone.length >= 14 ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-400"}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
