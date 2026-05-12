"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PhonePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const router = useRouter();

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const canContinue = firstName.trim().length > 0 && lastName.trim().length > 0 && phone.length >= 14 && ageConfirmed;

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
      <div className="flex-1 px-6 pb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
        <p className="text-gray-500 mb-8">Let's get you set up. This takes less than a minute.</p>

        <div className="space-y-4">
          {/* Name row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Mae"
                autoCapitalize="words"
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-gray-900 text-base outline-none focus:border-violet-500 transition-colors placeholder:text-gray-300"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Moore"
                autoCapitalize="words"
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-gray-900 text-base outline-none focus:border-violet-500 transition-colors placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Phone number</label>
            <div className="flex items-center border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-violet-500 transition-colors">
              <span className="text-gray-400 text-lg mr-2">🇺🇸</span>
              <span className="text-gray-500 mr-2 text-base">+1</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(312) 555-0100"
                className="flex-1 text-gray-900 text-base outline-none placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Age certification */}
          <button
            type="button"
            onClick={() => setAgeConfirmed(!ageConfirmed)}
            className={`w-full flex items-start gap-3 px-4 py-4 rounded-2xl border-2 text-left transition-all ${
              ageConfirmed ? "border-violet-500 bg-violet-50" : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
              ageConfirmed ? "border-violet-600 bg-violet-600" : "border-gray-300"
            }`}>
              {ageConfirmed && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <p className={`text-sm leading-relaxed ${ageConfirmed ? "text-violet-900" : "text-gray-600"}`}>
              I confirm that I am <span className="font-bold">18 years of age or older</span>. I agree to Gather's Terms of Service and Privacy Policy.
            </p>
          </button>

          <p className="text-xs text-gray-400 text-center px-2">
            Your phone number is used for account security only and is never shared publicly.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10">
        <button
          onClick={() => canContinue && router.push("/onboarding/interests")}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-colors ${
            canContinue ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-400"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
