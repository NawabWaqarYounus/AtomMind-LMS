"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Target, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Brain, 
  ShieldAlert,
  ChevronRight,
  Monitor,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Search,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', active: 850, risk: 12 },
  { name: 'Tue', active: 920, risk: 10 },
  { name: 'Wed', active: 1100, risk: 15 },
  { name: 'Thu', active: 1050, risk: 22 },
  { name: 'Fri', active: 1300, risk: 14 },
  { name: 'Sat', active: 950, risk: 8 },
  { name: 'Sun', active: 800, risk: 11 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function InstructorDashboard() {
  const [stats, setStats] = useState({
    enrolled: "4,248",
    completion: "76%",
    atRisk: "14",
    engagement: "92.4"
  });

  return (
    <DashboardLayout>
      <div className="space-y-10">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Instructor <span className="text-blue-500">Dashboard</span></h1>
            <p className="text-slate-500 font-medium">Monitor student progress and platform engagement.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/5 border border-white/5 hover:border-white/20 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 text-white">
              <Clock className="w-4 h-4 text-blue-400" /> Session Active
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
              <Zap className="w-4 h-4" /> Take Action
            </button>
          </div>
        </div>

        {/* Sub-navigation */}
        <div className="flex gap-6 border-b border-white/5 pb-6">
           <Link href="/dashboard/instructor" className="text-sm font-bold text-blue-400 border-b-2 border-blue-500 pb-6 -mb-[26px] z-10">Overview</Link>
           <Link href="/dashboard/instructor/courses" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Course Management</Link>
           <Link href="/dashboard/instructor/students" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Student Management</Link>
           <Link href="/dashboard/instructor/settings" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Settings</Link>
        </div>

        {/* Neural Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Total Enrollment" 
            value={stats.enrolled} 
            trend="+12.4%" 
            icon={<Users className="w-6 h-6" />}
            color="blue"
          />
          <StatCard 
            label="Completion Rate" 
            value={stats.completion} 
            trend="+5.2%" 
            icon={<Target className="w-6 h-6" />}
            color="purple"
          />
          <StatCard 
            label="At-Risk Students" 
            value={stats.atRisk} 
            trend="-2.1%" 
            icon={<AlertTriangle className="w-6 h-6" />}
            color="rose"
            warning={true}
          />
          <StatCard 
            label="Engagement Score" 
            value={stats.engagement} 
            trend="+1.8%" 
            icon={<TrendingUp className="w-6 h-6" />}
            color="emerald"
          />
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Active Engagement Area */}
          <div className="xl:col-span-2 glass-card border border-white/5 rounded-[40px] p-10 bg-slate-950/20 relative overflow-hidden">
             <div className="flex items-center justify-between mb-10 relative z-10">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    Neural Engagement 
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  </h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Global activity monitoring</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-white transition-all">Week</button>
                  <button className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-xl text-[10px] font-black uppercase text-blue-400 transition-all">Month</button>
                </div>
             </div>

             <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} 
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px' }}
                      itemStyle={{ color: '#60a5fa' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#3b82f6" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorActive)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* AI Insights & Predictive Risk */}
          <div className="glass-card border border-white/5 rounded-[40px] p-8 bg-slate-950/40 space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Neural Insights</h3>
                  <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest">Generative Intelligence</p>
                </div>
             </div>

             <div className="space-y-4">
                <InsightItem 
                  text="34% drop in 'Python Patterns' engagement detected in Cohort-B." 
                  type="warning"
                />
                <InsightItem 
                  text="Predictive model suggests 4 students require immediate intervention." 
                  type="critical"
                />
                <InsightItem 
                  text="Learning efficiency increased by 12% after Neural Labs integration." 
                  type="success"
                />
             </div>

             <div className="pt-6 border-t border-white/5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Risk Priority Queue</h4>
                <div className="space-y-4">
                  <RiskCard name="Sarah Miller" risk="High" score={88} icon="SM" />
                  <RiskCard name="James Wilson" risk="High" score={82} icon="JW" />
                  <RiskCard name="Elena Rodriguez" risk="Medium" score={45} icon="ER" />
                </div>
             </div>
          </div>

        </div>

        {/* Bottom Monitoring Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           
           {/* Student Activity Stream */}
           <div className="glass-card border border-white/5 rounded-[40px] p-8 bg-slate-950/20">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="font-bold flex items-center gap-3">
                   <Activity className="w-5 h-5 text-blue-500" />
                   Activity Stream
                 </h3>
                 <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300">Live View</button>
              </div>

              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                      {String.fromCharCode(64 + i)}{String.fromCharCode(74 + i)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-200">Alex Johnson <span className="text-slate-500 font-medium">completed</span> Neural Interface Lab</p>
                      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">2 mins ago • Module 4</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-blue-400 transition-colors" />
                  </div>
                ))}
              </div>
           </div>

           {/* Performance Distribution */}
           <div className="glass-card border border-white/5 rounded-[40px] p-8 bg-slate-950/20">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="font-bold flex items-center gap-3">
                   <Target className="w-5 h-5 text-purple-500" />
                   Distribution
                 </h3>
                 <div className="flex gap-2">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                     <div className="w-2 h-2 bg-blue-500 rounded-full" /> Advanced
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                     <div className="w-2 h-2 bg-purple-500 rounded-full" /> Normal
                   </div>
                 </div>
              </div>

              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.slice(0, 5)}>
                    <Bar dataKey="active" radius={[10, 10, 10, 10]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'} fillOpacity={0.6} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, trend, icon, color, warning }: any) {
  const colors: any = {
    blue: "from-blue-600/20 to-blue-600/5 text-blue-400 border-blue-500/20",
    purple: "from-purple-600/20 to-purple-600/5 text-purple-400 border-purple-500/20",
    rose: "from-rose-600/20 to-rose-600/5 text-rose-400 border-rose-500/20",
    emerald: "from-emerald-600/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20"
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn(
        "glass-card border rounded-[32px] p-8 bg-gradient-to-br relative overflow-hidden group",
        colors[color]
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] blur-3xl -mr-16 -mt-16 group-hover:opacity-[0.05] transition-opacity" />
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/5",
          trend.startsWith('+') ? "text-emerald-400" : "text-rose-400"
        )}>
          {trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
      <h4 className="text-3xl font-black text-white">{value}</h4>
      {warning && (
        <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
           <ShieldAlert className="w-4 h-4 text-rose-500" />
           <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Neural Alert Active</span>
        </div>
      )}
    </motion.div>
  );
}

function InsightItem({ text, type }: any) {
  const styles: any = {
    warning: "border-amber-500/20 bg-amber-500/5 text-amber-200",
    critical: "border-rose-500/20 bg-rose-500/5 text-rose-200",
    success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-200"
  };

  return (
    <div className={cn("px-5 py-4 rounded-2xl border text-xs font-medium leading-relaxed", styles[type])}>
      {text}
    </div>
  );
}

function RiskCard({ name, risk, score, icon }: any) {
  return (
    <div className="flex items-center gap-4 group p-3 hover:bg-white/5 rounded-2xl transition-all">
       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center font-bold text-xs text-white">
         {icon}
       </div>
       <div className="flex-1">
         <div className="flex items-center justify-between">
           <p className="text-sm font-bold">{name}</p>
           <span className={cn(
             "text-[10px] font-black uppercase tracking-widest",
             risk === "High" ? "text-rose-500" : "text-amber-500"
           )}>{risk} Risk</span>
         </div>
         <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
            <div 
              className={cn("h-full rounded-full transition-all duration-1000", risk === "High" ? "bg-rose-500" : "bg-amber-500")}
              style={{ width: `${score}%` }}
            />
         </div>
       </div>
    </div>
  );
}
