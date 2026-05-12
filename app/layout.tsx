import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Gather",
  description: "Find plans, meet people, and explore Chicago without overthinking it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen flex items-start justify-center py-0 sm:py-8">
        <div className="w-full max-w-[390px] min-h-screen sm:min-h-0 sm:h-[844px] bg-white relative overflow-x-hidden overflow-y-auto sm:rounded-[2.5rem] sm:shadow-2xl flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
