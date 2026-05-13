"use client";

import Link from "next/link";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Atom<span className="text-blue-500">Mind</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</Link>
          <Link href="#ai-tutor" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">AI Tutor</Link>
          <Link href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Login</Link>
          <Link href="/signup">
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all">
              Join Now
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 glass border-b border-white/10 p-6 flex flex-col gap-4">
          <Link href="#features" className="text-lg font-medium text-slate-300">Features</Link>
          <Link href="#ai-tutor" className="text-lg font-medium text-slate-300">AI Tutor</Link>
          <Link href="#pricing" className="text-lg font-medium text-slate-300">Pricing</Link>
          <hr className="border-white/5" />
          <Link href="/login" className="text-lg font-medium text-slate-300">Login</Link>
          <Link href="/signup" className="w-full">
            <button className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold">Join Now</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
