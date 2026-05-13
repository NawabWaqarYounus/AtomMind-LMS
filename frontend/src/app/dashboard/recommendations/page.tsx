"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { Sparkles, Play, BookOpen, Star, Clock, Filter, Brain, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const recommendations = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    type: 'Course',
    duration: '6h 45m',
    rating: 4.9,
    reason: 'Because you mastered React Hooks early',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
    color: 'blue'
  },
  {
    id: '2',
    title: 'Data Visualization with D3.js',
    type: 'Module',
    duration: '3h 20m',
    rating: 4.8,
    reason: 'Matches your interest in Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    color: 'purple'
  },
  {
    id: '3',
    title: 'TypeScript for Enterprise',
    type: 'Practice',
    duration: '2h 15m',
    rating: 4.7,
    reason: 'Recommended for your skill level',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400',
    color: 'emerald'
  },
  {
    id: '4',
    title: 'System Design Interview Prep',
    type: 'Guide',
    duration: '12h 00m',
    rating: 4.9,
    reason: 'Trending in your career path',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=400',
    color: 'orange'
  }
];

export default function RecommendationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:row items-start lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="text-blue-500" /> AI Recommendations
            </h1>
            <p className="text-slate-400">Personalized content curated by our adaptive intelligence engine.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/50 p-1.5 rounded-2xl border border-white/5">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20">All</button>
            <button className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">Courses</button>
            <button className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">Resources</button>
            <button className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">Projects</button>
          </div>
        </div>

        {/* Featured Recommendation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-80 rounded-[40px] overflow-hidden group cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1200" 
            alt="AI Suggestion" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Next Best Step</span>
              <span className="flex items-center gap-1 text-blue-400 text-sm font-bold">
                <Brain className="w-4 h-4" /> 98% Match Rate
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Mastering Large Language Models</h2>
            <p className="text-slate-300 max-w-2xl mb-8 leading-relaxed">
              Based on your progress in Python and Data Analysis, you&apos;re ready to dive into the architecture of LLMs. 
              This course covers Transformers, Fine-tuning, and RLSF.
            </p>
            <div className="flex items-center gap-6">
              <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2">
                Start Learning Now <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 18h 30m</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 24 Lessons</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
          {recommendations.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group cursor-pointer flex flex-col h-full overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                    item.color === 'blue' ? "bg-blue-600 text-white" : 
                    item.color === 'purple' ? "bg-purple-600 text-white" : 
                    item.color === 'emerald' ? "bg-emerald-600 text-white" : "bg-orange-600 text-white"
                  )}>
                    {item.type}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[10px] text-blue-500 font-bold mb-2 flex items-center gap-1">
                  <Brain className="w-3 h-3" /> {item.reason}
                </p>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight">{item.title}</h3>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-current" /> {item.rating}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}


