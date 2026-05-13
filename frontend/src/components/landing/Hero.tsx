"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">AI-Powered Learning Revolution</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Master Any Skill with <br />
            <span className="text-gradient">Adaptive Intelligence</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The first LMS that evolves with you. Personalized learning paths, AI tutoring, 
            and predictive analytics to help you learn 3x faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2">
                Get Started for Free <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="#demo">
              <button className="px-8 py-4 glass border border-white/10 hover:bg-white/5 text-white rounded-xl font-semibold transition-all">
                Watch Demo
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats / Features Row */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
        >
          {[
            { icon: Brain, title: "Adaptive Paths", desc: "Roadmaps that change based on your progress" },
            { icon: Zap, title: "Real-time Feedback", desc: "Instant AI analysis of your weak areas" },
            { icon: Sparkles, title: "AI Tutor 24/7", desc: "An intelligent companion for every question" }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 text-left group hover:border-blue-500/30 transition-all">
              <feature.icon className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
