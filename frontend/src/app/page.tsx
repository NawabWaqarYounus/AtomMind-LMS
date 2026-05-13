"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Users, 
  Globe, 
  Cpu, 
  Layers,
  ChevronRight,
  MessageSquare,
  BarChart3,
  Star
} from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <CourseCatalogPreview />
        <HowItWorks />
        <FeatureSection />
        <AITutorShowcase />
        <AnalyticsShowcase />
        <RoadmapShowcase />
        <Testimonials />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-slate-950/80 backdrop-blur-xl border-white/5 py-4" : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">AtomMind <span className="text-blue-500">LMS</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#catalog" className="hover:text-white transition-colors">Catalog</Link>
          <Link href="#process" className="hover:text-white transition-colors">Process</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-400 transition-colors">Sign In</Link>
          <Link href="/signup" className="px-5 py-2.5 bg-white text-black hover:bg-slate-200 rounded-full text-sm font-bold transition-all shadow-lg shadow-white/10">
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-4 h-4" /> The Future of Learning is Here
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent leading-[1.05]"
          >
            The Future of <br className="hidden lg:block" /> Learning is <span className="text-blue-500 italic">Adaptive</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            AtomMind LMS isn&apos;t just a platform. It&apos;s a cognitive ecosystem that evolves with you. Powered by real-time neural mapping to maximize your potential.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:row items-center justify-center gap-6"
          >
            <Link href="/signup" className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-bold transition-all shadow-2xl shadow-blue-500/40 flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 glass border border-white/10 hover:bg-white/5 rounded-full text-lg font-bold transition-all flex items-center gap-2">
              <Play className="w-5 h-5 fill-current" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Floating UI Elements */}
        <div className="mt-24 relative max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="glass p-4 rounded-[40px] border border-white/10 shadow-2xl bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px]" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
              alt="Dashboard Preview" 
              className="rounded-[32px] w-full border border-white/5 shadow-2xl"
            />
          </motion.div>

          {/* Floating Cards */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-12 hidden lg:block glass p-6 rounded-3xl border border-white/10 shadow-2xl max-w-[240px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Mastery Level</p>
                <p className="text-lg font-bold text-emerald-400">89% Advanced</p>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-[89%] h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-8 -right-12 hidden lg:block glass p-6 rounded-3xl border border-white/10 shadow-2xl max-w-[280px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="font-bold">AI Tutor Insight</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "I've detected you learn better with visual metaphors. I've updated your next lesson on Neural Networks."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { label: "Active Learners", value: "125k+", icon: <Users /> },
    { label: "AI Conversations", value: "4.2M", icon: <MessageSquare /> },
    { label: "Success Rate", value: "94%", icon: <TrendingUp /> },
    { label: "Cloud Regions", value: "12", icon: <Globe /> }
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 text-blue-500 mb-4">
              {stat.icon}
            </div>
            <h4 className="text-4xl font-bold mb-1 tracking-tight">{stat.value}</h4>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeatureSection() {
  const features = [
    {
      title: "Real-time Adaptation",
      desc: "Our engine analyzes your response patterns and difficulty curves to rebuild your roadmap every second.",
      icon: <Zap />,
      color: "blue"
    },
    {
      title: "Predictive Analytics",
      desc: "Identify potential struggle areas before they happen. AI warns you about future knowledge gaps.",
      icon: <BarChart3 />,
      color: "purple"
    },
    {
      title: "Knowledge Graphing",
      desc: "Visualize your progress in a 3D semantic graph. See how concepts connect and cross-pollinate.",
      icon: <Layers />,
      color: "emerald"
    },
    {
      title: "24/7 Contextual Tutor",
      desc: "An AI tutor that knows exactly what lesson you're on, your past mistakes, and your current mood.",
      icon: <Cpu />,
      color: "orange"
    }
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Engineered for <span className="text-blue-500">Peak Performance</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Traditional LMS systems are linear and rigid. AtomLearn is fluid and intelligent.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110",
                f.color === "blue" ? "bg-blue-600/20 text-blue-500" : 
                f.color === "purple" ? "bg-purple-600/20 text-purple-500" : 
                f.color === "emerald" ? "bg-emerald-600/20 text-emerald-500" : "bg-orange-600/20 text-orange-500"
              )}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AITutorShowcase() {
  return (
    <section id="ai-tutor" className="py-32 relative overflow-hidden">
       <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <div className="glass-card p-1 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden bg-slate-900/50">
            <div className="bg-slate-950 p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-sm">AtomAI Assistant</span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
              </div>
            </div>
            <div className="p-8 space-y-6 bg-gradient-to-b from-slate-900/50 to-transparent min-h-[400px]">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="glass p-4 rounded-2xl rounded-tl-none border border-white/5 text-sm max-w-[80%]">
                  Hey there! I noticed you&apos;re struggling with the **Asynchronous JavaScript** quiz. Would you like a real-world analogy to help explain it?
                </div>
              </div>
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-white">
                  A
                </div>
                <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                  Yes please! I can&apos;t wrap my head around Promises.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="glass p-4 rounded-2xl rounded-tl-none border border-white/5 text-sm max-w-[80%]">
                  Think of it like ordering a burger. You get a buzzer (the Promise). It doesn&apos;t have the burger yet, but it&apos;s a **commitment** that you will get one soon...
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-950/50 border-t border-white/5">
              <div className="flex gap-3 px-4 py-3 bg-slate-900 rounded-2xl border border-white/5">
                <div className="flex-1 text-slate-500 text-sm italic">Type your question...</div>
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 mb-6">
              <Cpu className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Your AI Peer, <br /><span className="text-blue-500">Not Just a Bot</span></h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Unlike static chatbots, our AI understands your entire learning context. It knows which videos you skipped, which docs you bookmarked, and exactly where you got stuck.
            </p>
            <ul className="space-y-4">
              {[
                "Context-aware code debugging",
                "Instant analogy generation",
                "Personalized practice quizzes",
                "Voice-to-Knowledge interaction"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnalyticsShowcase() {
  return (
    <section id="analytics" className="py-32 bg-slate-950/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
           <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-500 mb-6">
              <BarChart3 className="w-10 h-10" />
            </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">Insight-Driven <br /><span className="text-purple-500">Learning Mastery</span></h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Stop guessing your progress. Get deep physiological and cognitive insights into your learning behavior.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <h4 className="text-3xl font-bold text-white mb-1">98.2%</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Prediction Accuracy</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <h4 className="text-3xl font-bold text-white mb-1">4.2x</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Retention Speed</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="glass-card p-8 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h4 className="font-bold">Knowledge Retention Curve</h4>
                <p className="text-xs text-slate-500">Predicted memory decay over time</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-[10px] font-bold">
                <Sparkles className="w-3 h-3" /> AI OPTIMIZED
              </div>
            </div>
            {/* Mock Chart UI */}
            <div className="relative h-64 flex items-end gap-3">
              {[60, 80, 45, 90, 70, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-xl relative group"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {h}%
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">W{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapShowcase() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The Infinite <span className="text-blue-500">Roadmap</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Your journey isn&apos;t a straight line. It&apos;s a living map that shifts as you grow.</p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              { status: "done", title: "Foundations", label: "COMPLETED" },
              { status: "active", title: "Core Architecture", label: "CURRENT" },
              { status: "next", title: "Advanced Patterns", label: "NEXT UP" },
              { status: "locked", title: "Scale & Deployment", label: "LOCKED" }
            ].map((node, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "glass-card p-8 rounded-3xl border transition-all relative text-center",
                  node.status === "active" ? "border-blue-500 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.2)]" : "border-white/5"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full mx-auto mb-6 flex items-center justify-center text-white",
                  node.status === "done" ? "bg-emerald-500 shadow-[0_0_20px_#10b981]" : 
                  node.status === "active" ? "bg-blue-600 shadow-[0_0_20px_#3b82f6] animate-pulse" : 
                  "bg-slate-800"
                )}>
                  {node.status === "done" ? <ShieldCheck className="w-6 h-6" /> : i+1}
                </div>
                <span className={cn(
                  "text-[10px] font-bold tracking-widest uppercase mb-2 block",
                  node.status === "active" ? "text-blue-400" : "text-slate-500"
                )}>{node.label}</span>
                <h4 className="text-xl font-bold">{node.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Loved by <span className="text-blue-500">Thousands</span></h2>
          <p className="text-slate-400">Join the next generation of engineers and creators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Jenkins", role: "Dev at Google", content: "The AI tutor feels like a senior dev sitting next to me. My productivity tripled in weeks." },
            { name: "Michael Chen", role: "Student at MIT", content: "Finally an LMS that doesn't feel like a dusty textbook from 2005. The UX is incredible." },
            { name: "Priya Rao", role: "Full Stack Engineer", content: "The adaptive roadmap saved me from burnout by adjusting difficulty when I was overwhelmed." }
          ].map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-8 rounded-3xl border border-white/5 relative"
            >
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-300 italic mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <h5 className="font-bold">{t.name}</h5>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    { name: "Explorer", price: "Free", desc: "Basic adaptive pathing", features: ["1 Active Course", "Standard AI Tutor", "Community Access"] },
    { name: "Pro", price: "$29", desc: "Full neural mapping", features: ["Unlimited Courses", "Priority AI Inference", "Advanced Analytics", "Offline Access"], popular: true },
    { name: "Enterprise", price: "Custom", desc: "Team cognitive intelligence", features: ["Team Dashboard", "Custom AI Training", "API Access", "Dedicated Support"] }
  ];

  return (
    <section id="pricing" className="py-32 bg-slate-950/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Simple <span className="text-blue-500">Pricing</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={cn(
              "glass-card p-10 rounded-[40px] border relative",
              plan.popular ? "border-blue-500 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.1)]" : "border-white/5"
            )}>
              {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Most Popular</span>}
              <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-slate-500 text-sm">/mo</span>}
              </div>
              <p className="text-sm text-slate-400 mb-8">{plan.desc}</p>
              <ul className="space-y-4 mb-10">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className={cn(
                "w-full py-4 rounded-2xl text-sm font-bold transition-all",
                plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20" : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              )}>Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "How does the adaptive learning work?",
      a: "Our AI engine analyzes your response speed, accuracy, and engagement patterns in real-time. If you struggle with a concept, it instantly adds bridge modules to your roadmap to fill the gap."
    },
    {
      q: "Can I use AtomMind for my team?",
      a: "Yes! We offer enterprise-grade team management, collaborative learning rooms, and advanced skill-gap reporting for organizations."
    },
    {
      q: "Is the AI tutor available 24/7?",
      a: "Absolutely. Our neural-inference models are available around the clock, providing context-aware help whenever you need it."
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Common <span className="text-blue-500">Questions</span></h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-white/5">
              <h4 className="text-lg font-bold mb-4">{faq.q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCatalogPreview() {
  const courses = [
    { title: "Full-Stack Neuro-Engineering", category: "Advanced", students: "2.4k", rating: "4.9", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" },
    { title: "Adaptive UI/UX Design", category: "Design", students: "1.8k", rating: "4.8", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600" },
    { title: "AI-First Development", category: "Programming", students: "3.2k", rating: "4.9", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <section id="catalog" className="py-32 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Trending <span className="text-blue-500">Pathways</span></h2>
            <p className="text-slate-400">Discover professional courses designed for the AI era.</p>
          </div>
          <button className="px-6 py-3 glass border border-white/10 rounded-full text-sm font-bold hover:bg-white/5 transition-all">Explore Catalog</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card rounded-[32px] border border-white/5 overflow-hidden group"
            >
              <div className="h-48 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">{course.category}</span>
                  <div className="flex items-center gap-1 text-xs text-yellow-500">
                    <Star className="w-3 h-3 fill-current" /> {course.rating}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-xs text-slate-500 font-medium">{course.students} Learners</span>
                  <Link href="/signup" className="text-sm font-bold text-white flex items-center gap-2 group/btn">
                    Enroll Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Neural Assessment", desc: "Identify your base knowledge and learning speed.", icon: <Brain /> },
    { title: "Adaptive Pathing", desc: "Our AI builds a custom curriculum for your goals.", icon: <Target /> },
    { title: "Dynamic Sync", desc: "The roadmap adjusts with every click and quiz.", icon: <Sparkles /> }
  ];

  return (
    <section id="process" className="py-32 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold mb-4">The <span className="text-blue-500">Mind Sync</span> Protocol</h2>
          <p className="text-slate-400">How we accelerate your learning velocity by 400%.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2 hidden md:block" />
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 bg-blue-600 rounded-[30px] mx-auto flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                {step.icon}
              </div>
              <h4 className="text-2xl font-bold">{step.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[240px] mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="glass-card p-16 rounded-[60px] border border-white/10 relative overflow-hidden text-center bg-gradient-to-br from-blue-600/20 to-purple-600/10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Ready to Evolve?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join 12,000+ learners who are mastering skills 4x faster with AtomLearn AI.
          </p>
          <div className="flex flex-col sm:row items-center justify-center gap-6">
            <Link href="/signup" className="px-10 py-5 bg-white text-black hover:bg-slate-200 rounded-full text-lg font-bold transition-all shadow-2xl shadow-white/10">
              Start Your Journey
            </Link>
            <Link href="#pricing" className="px-10 py-5 glass border border-white/10 hover:bg-white/5 rounded-full text-lg font-bold transition-all">
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">AtomMind <span className="text-blue-500">LMS</span></span>
          </Link>
          <p className="text-slate-500 max-w-xs leading-relaxed mb-8">
            The world&apos;s first truly adaptive learning management system powered by cognitive intelligence.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'GitHub', 'Discord', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h5 className="font-bold mb-6">Product</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="#" className="hover:text-blue-400">Features</Link></li>
            <li><Link href="#" className="hover:text-blue-400">AI Tutor</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Adaptive Path</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Enterprise</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6">Company</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="#" className="hover:text-blue-400">About</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Careers</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Blog</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6">Legal</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="#" className="hover:text-blue-400">Privacy</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Terms</Link></li>
            <li><Link href="#" className="hover:text-blue-400">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 text-center text-slate-600 text-sm">
        © 2026 AtomMind LMS. All rights reserved. Built for the next generation.
      </div>
    </footer>
  );
}
