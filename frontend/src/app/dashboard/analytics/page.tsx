"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Brain, 
  Clock, 
  Zap, 
  Target,
  Sparkles,
  Search,
  ChevronDown
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';

const masteryData = [
  { name: 'Mon', proficiency: 45, confidence: 40 },
  { name: 'Tue', proficiency: 52, confidence: 48 },
  { name: 'Wed', proficiency: 48, confidence: 55 },
  { name: 'Thu', proficiency: 61, confidence: 50 },
  { name: 'Fri', proficiency: 55, confidence: 62 },
  { name: 'Sat', proficiency: 67, confidence: 70 },
  { name: 'Sun', proficiency: 75, confidence: 72 },
];

const topicPerformance = [
  { topic: 'Data Types', score: 92 },
  { topic: 'Control Flow', score: 85 },
  { topic: 'OOP', score: 68 },
  { topic: 'Recursion', score: 42 },
  { topic: 'Dynamic Programming', score: 35 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">Intelligence <span className="text-blue-500">Analytics</span></h1>
            <p className="text-slate-400">Deep physiological and cognitive insights into your learning behavior.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs font-bold text-slate-400 cursor-pointer hover:bg-slate-800 transition-colors">
                <Calendar className="w-4 h-4" /> This Quarter <ChevronDown className="w-3 h-3 ml-2" />
             </div>
             <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20">Export PDF Report</button>
          </div>
        </div>

        {/* High Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Avg. Score" value="84.2%" trend="+5.4%" up icon={<Target className="text-blue-400" />} />
          <MetricCard title="Learning Vol." value="12.4h/w" trend="+1.2h" up icon={<Clock className="text-purple-400" />} />
          <MetricCard title="Cognitive Load" value="Optimal" trend="-12%" up={false} icon={<Brain className="text-emerald-400" />} />
          <MetricCard title="Retention Rate" value="91%" trend="+2.5%" up icon={<Zap className="text-amber-400" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Detailed Performance Chart */}
          <div className="lg:col-span-8 glass-card p-8 rounded-[40px] border border-white/5">
            <div className="flex items-center justify-between mb-10">
               <div>
                 <h3 className="text-xl font-bold">Mastery vs Confidence</h3>
                 <p className="text-sm text-slate-500">Correlation between your quiz scores and self-reported confidence.</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Mastery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Confidence</span>
                  </div>
               </div>
            </div>
            <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <ComposedChart data={masteryData}>
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                    />
                    <Area type="monotone" dataKey="proficiency" fill="#3b82f620" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="confidence" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} />
                 </ComposedChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Topic Breakdown */}
          <div className="lg:col-span-4 glass-card p-8 rounded-[40px] border border-white/5">
             <h3 className="text-xl font-bold mb-8">Concept Mastery</h3>
             <div className="space-y-6">
                {topicPerformance.map((topic, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">{topic.topic}</span>
                      <span className={cn(topic.score > 80 ? "text-emerald-400" : topic.score > 50 ? "text-amber-400" : "text-rose-500")}>
                        {topic.score}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${topic.score}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={cn("h-full", topic.score > 80 ? "bg-emerald-500" : topic.score > 50 ? "bg-amber-500" : "bg-rose-500")}
                       />
                    </div>
                  </div>
                ))}
             </div>
             
             <div className="mt-10 p-6 bg-blue-600/5 border border-blue-500/10 rounded-3xl">
                <div className="flex items-center gap-3 mb-3">
                   <Sparkles className="w-5 h-5 text-blue-400" />
                   <h4 className="text-sm font-bold">AI Insight</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                   Your scores in <span className="text-white font-bold">Recursion</span> suggest a struggle with Stack frames. I've updated your path with 2 visual logic puzzles.
                </p>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MetricCard({ title, value, trend, up, icon }: { title: string, value: string, trend: string, up: boolean, icon: React.ReactNode }) {
  return (
    <div className="glass-card p-6 rounded-[32px] border border-white/5 hover:bg-white/5 transition-all">
      <div className="flex items-center justify-between mb-4">
         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            {icon}
         </div>
         <div className={cn("flex items-center gap-1 text-[10px] font-black uppercase tracking-widest", up ? "text-emerald-400" : "text-rose-500")}>
            {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {trend}
         </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{title}</p>
      <h4 className="text-2xl font-black text-white">{value}</h4>
    </div>
  );
}
