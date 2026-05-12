"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PhonePage() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const codeInputRef = useRef<HTMLInputElement>(null);

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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {sent ? "Enter your code" : "What's your number?"}
        </h2>
        <p className="text-gray-500 mb-8">
          {sent
            ? `We sent a 6-digit code to ${phone}`
            : "We'll send a quick verification code. No spam, ever."}
        </p>

        {!sent ? (
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
        ) : (
          <div className="space-y-4">
            {/* Digit display — tapping focuses the real input */}
            <button
              type="button"
              onClick={() => codeInputRef.current?.focus()}
              className="flex gap-3 justify-center w-full"
            >
              {[0,1,2,3,4,5].map((i) => (
                <div
                  key={i}
                  className={`w-11 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold text-gray-900 transition-colors ${
                    code[i] ? "border-violet-500 bg-violet-50" : "border-gray-200"
                  }`}
                >
                  {code[i] || ""}
                </div>
              ))}
            </button>

            {/* Visible input — styled to be minimal but fully tappable */}
            <input
              ref={codeInputRef}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              autoFocus
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-center text-lg font-bold tracking-[0.5em] text-gray-900 outline-none focus:border-violet-500 transition-colors"
              placeholder="000000"
            />

            <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-2.5 text-center">
              <p className="text-violet-700 text-sm font-medium">Demo code: <span className="font-bold tracking-widest">000000</span></p>
            </div>
            <p className="text-center text-sm text-gray-400">
              Didn't get it?{" "}
              <button className="text-violet-600 font-medium" onClick={() => setCode("")}>
                Resend code
              </button>
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 pb-10">
        {!sent ? (
          <button
            onClick={() => phone.length >= 14 && setSent(true)}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-colors ${phone.length >= 14 ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-400"}`}
          >
            Send Code
          </button>
        ) : (
          <button
            onClick={() => code === "000000" && router.push("/onboarding/interests")}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-colors ${code === "000000" ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-400"}`}
          >
            {code.length === 6 && code !== "000000" ? "Incorrect code" : "Verify & Continue"}
          </button>
        )}
      </div>
    </div>
  );
}
