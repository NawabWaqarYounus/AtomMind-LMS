"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Play, 
  BookOpen, 
  Clock, 
  Trophy, 
  Sparkles,
  ChevronRight,
  ArrowRight,
  Zap,
  Target
} from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Foundations of Neural Networks",
    status: "completed",
    lessons: [
      { id: 101, title: "Introduction to Perceptrons", duration: "15m", completed: true },
      { id: 102, title: "Activation Functions Explained", duration: "20m", completed: true },
      { id: 103, title: "Forward Propagation Basics", duration: "25m", completed: true },
    ],
    xp: 500,
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    status: "active",
    lessons: [
      { id: 201, title: "Higher Order Components", duration: "30m", completed: true },
      { id: 202, title: "Render Props vs Hooks", duration: "35m", completed: false },
      { id: 203, title: "Compound Components Mastery", duration: "40m", completed: false },
    ],
    xp: 800,
  },
  {
    id: 3,
    title: "System Design for AI Scale",
    status: "locked",
    lessons: [
      { id: 301, title: "Distributed Inference", duration: "45m", completed: false },
      { id: 302, title: "Vector Database Architecture", duration: "50m", completed: false },
      { id: 303, title: "Model Quantization", duration: "55m", completed: false },
    ],
    xp: 1200,
  }
];

export default function LearningPathPage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        {/* Header */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4"
          >
            <Zap className="w-4 h-4" /> Adaptive Curriculum v2.0
          </motion.div>
          <h1 className="text-4xl font-black mb-4 tracking-tight">Your Adaptive <span className="text-blue-500">Path</span></h1>
          <p className="text-slate-400 leading-relaxed max-w-2xl">
            This roadmap is dynamically generated based on your performance in previous quizzes and engagement with video content.
          </p>
        </div>

        {/* Current Module Focus */}
        <div className="glass-card p-1 rounded-[40px] border border-blue-500/30 bg-blue-600/5 relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)]">
           <div className="p-10">
             <div className="flex flex-col md:flex-row gap-10">
               <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-blue-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest">In Progress</div>
                    <span className="text-slate-500 text-sm font-medium">Module 2 of 12</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Advanced React Patterns</h2>
                  <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                    Master complex UI patterns and state management strategies used in large-scale enterprise applications.
                  </p>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-bold">800 XP Reward</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-bold">105m Total</span>
                    </div>
                  </div>
                  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-2xl shadow-blue-500/40 flex items-center gap-2 transition-all group">
                    Continue Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
               <div className="w-full md:w-80 h-48 md:h-auto rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform" alt="React" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-all cursor-pointer">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
               </div>
             </div>
           </div>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-12 relative pt-10">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-slate-800 rounded-full opacity-20" />
          
          {modules.map((module, index) => (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              <div className={cn(
                "absolute left-2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#020617] z-10",
                module.status === 'completed' ? "bg-emerald-500" : 
                module.status === 'active' ? "bg-blue-600 animate-pulse shadow-[0_0_15px_#3b82f6]" : "bg-slate-800"
              )}>
                {module.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-white" /> : 
                 module.status === 'active' ? <Sparkles className="w-5 h-5 text-white" /> : <Lock className="w-5 h-5 text-slate-500" />}
              </div>

              <div className={cn(
                "glass-card p-8 rounded-[32px] border transition-all",
                module.status === 'active' ? "border-blue-500/20 bg-blue-500/5 shadow-xl shadow-blue-500/5" : "border-white/5"
              )}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{module.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span>{module.lessons.length} Lessons</span>
                      <span className="text-blue-500/70 font-bold tracking-widest">+{module.xp} XP</span>
                    </div>
                  </div>
                  {module.status !== 'locked' && (
                    <div className="w-full md:w-48 h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div className={cn("h-full", module.status === 'completed' ? "bg-emerald-500" : "bg-blue-600")} style={{ width: module.status === 'completed' ? '100%' : '33%' }} />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {module.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className={cn(
                        "p-4 rounded-2xl border transition-all flex items-center justify-between group",
                        module.status === 'locked' ? "bg-slate-900/30 border-white/5 opacity-50" : 
                        lesson.completed ? "bg-emerald-500/5 border-emerald-500/10" : "bg-white/5 border-white/10 hover:border-blue-500/30 cursor-pointer"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : module.status === 'locked' ? (
                          <Lock className="w-4 h-4 text-slate-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 group-hover:text-blue-400" />
                        )}
                        <div>
                          <p className={cn("text-xs font-bold truncate max-w-[120px]", lesson.completed ? "text-emerald-500" : "text-slate-300")}>{lesson.title}</p>
                          <p className="text-[10px] text-slate-500">{lesson.duration}</p>
                        </div>
                      </div>
                      {!lesson.completed && module.status !== 'locked' && <Play className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestone Achievement */}
        <div className="glass-card p-10 rounded-[40px] border border-purple-500/20 bg-purple-600/5 flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 rounded-3xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <Trophy className="w-12 h-12 text-purple-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Next Major Milestone: Senior Architect</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Complete the next 3 modules to unlock the "System Design Pro" badge and exclusive networking events.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Target className="w-3 h-3" /> 12 Modules Remaining
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> 42 Lessons Left
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
