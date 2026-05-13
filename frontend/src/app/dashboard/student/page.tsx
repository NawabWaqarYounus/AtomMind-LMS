"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { 
  Zap, 
  Target, 
  Flame, 
  TrendingUp, 
  Clock, 
  Brain, 
  ChevronRight,
  ArrowRight,
  BookOpen,
  Trophy,
  AlertCircle,
  Sparkles,
  Activity,
  Award,
  ZapOff,
  Code,
  Layers,
  Search
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
  PieChart,
  Pie,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const activityData = [
  { name: 'Mon', xp: 400, engagement: 65 },
  { name: 'Tue', xp: 300, engagement: 50 },
  { name: 'Wed', xp: 600, engagement: 80 },
  { name: 'Thu', xp: 800, engagement: 95 },
  { name: 'Fri', xp: 500, engagement: 70 },
  { name: 'Sat', xp: 900, engagement: 100 },
  { name: 'Sun', xp: 700, engagement: 85 },
];

const skillData = [
  { subject: 'Python', A: 120, fullMark: 150 },
  { subject: 'React', A: 98, fullMark: 150 },
  { subject: 'AI/ML', A: 86, fullMark: 150 },
  { subject: 'Algorithms', A: 99, fullMark: 150 },
  { subject: 'System Design', A: 85, fullMark: 150 },
  { subject: 'Databases', A: 65, fullMark: 150 },
];

const recommendations = [
  { id: 1, title: "Deep Dive: React Server Components", duration: "12m", xp: "+250", type: "Video" },
  { id: 2, title: "Practice: Asynchronous Logic Quiz", duration: "5m", xp: "+500", type: "Quiz" },
  { id: 3, title: "Reading: Why HSL is better for UI", duration: "4m", xp: "+100", type: "Article" },
];

export default function StudentDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) setProfile(data);
      }
    };
    fetchProfile();
  }, [supabase]);

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Welcome Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em]">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" /> Learning Hub Active
              </div>
              <h1 className="text-6xl font-black tracking-tight leading-tight text-white">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{profile?.full_name?.split(' ')[0] || "Learner"}</span> 👋
              </h1>
              <p className="text-slate-500 text-lg font-medium max-w-xl leading-relaxed">
                Your learning activity is up <span className="text-emerald-400 font-bold">14%</span> today. You're currently in the top <span className="text-blue-400 font-bold">2%</span> of developers in your region.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 md:flex items-center gap-4 w-full lg:w-auto">
            <QuickStat icon={<Flame className="text-orange-500" />} label="Streak" value="14 Days" />
            <QuickStat icon={<Trophy className="text-yellow-500" />} label="XP" value="12,450" />
            <QuickStat icon={<Target className="text-blue-500" />} label="Focus" value="92%" />
            <QuickStat icon={<Zap className="text-purple-500" />} label="Rank" value="#42" />
          </div>
        </div>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Activity Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 glass-card p-8 rounded-[40px] border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-bold">Cognitive Performance</h3>
                <p className="text-sm text-slate-500">Your learning velocity over the past cycle</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20">7 Days</button>
                <button className="px-4 py-2 glass border border-white/5 text-slate-400 rounded-xl text-xs font-bold hover:bg-white/5">30 Days</button>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="xp" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorXp)" animationDuration={2000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AI Tutor Snapshot */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="glass-card p-8 rounded-[40px] border border-white/5 bg-blue-600/5 relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center shadow-inner">
                  <Brain className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Tutor Active</h3>
                  <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Ready to assist</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-8 leading-relaxed italic">
                &quot;I&apos;ve analyzed your recent React session. You seem to be over-complicating `useEffect`. Want to see a 2-minute visual breakdown?&quot;
              </p>
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                Begin Mini-Session <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="glass-card p-8 rounded-[40px] border border-white/5 bg-emerald-500/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Next Recommendations</h3>
                <Sparkles className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white mb-0.5">{rec.title}</p>
                        <p className="text-[10px] text-slate-500">{rec.type} • {rec.duration}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-emerald-400">{rec.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skill Matrix & Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Radar Chart */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="glass-card p-8 rounded-[40px] border border-white/5"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold">Skill Matrix</h3>
                <p className="text-sm text-slate-500">Your cognitive profile breakdown</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <div className="h-[350px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.4}
                    animationDuration={2000}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Weak Area Detection */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="glass-card p-8 rounded-[40px] border border-white/5 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center shadow-inner">
                <AlertCircle className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Weakness Detection</h3>
                <p className="text-sm text-slate-500">AI pinpointed focus areas</p>
              </div>
            </div>
            
            <div className="space-y-8 flex-1">
              <WeakAreaItem label="Redux State Management" progress={32} color="amber" status="Critical" />
              <WeakAreaItem label="PostgreSQL Indexing" progress={58} color="blue" status="Moderate" />
              <WeakAreaItem label="Python Decorators" progress={45} color="purple" status="High Priority" />
            </div>

            <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-center gap-4">
              <ZapOff className="w-6 h-6 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-200/70 leading-relaxed">
                <span className="font-bold text-amber-400">Optimization Required:</span> Your scores in State Management have dropped 12% since the last module. I recommend the "Redux Refresher" lab.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Learning Roadmap */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold">Personalized Roadmap</h2>
              <p className="text-sm text-slate-500">AI-generated path based on your current trajectory</p>
            </div>
            <button className="text-sm font-bold text-blue-400 hover:underline flex items-center gap-1">
              Manage Learning Path <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RoadmapCard status="completed" title="Advanced CSS" xp="1500 XP" lessons="12" icon={<Layers />} />
            <RoadmapCard status="active" title="Next.js Mastering" xp="2500 XP" lessons="8" progress={65} icon={<Zap />} />
            <RoadmapCard status="locked" title="AI Engineering" xp="5000 XP" lessons="24" icon={<Brain />} />
            <RoadmapCard status="locked" title="Cloud Ops" xp="3000 XP" lessons="15" icon={<TrendingUp />} />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}

function QuickStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glass-card px-5 py-4 rounded-[24px] border border-white/5 flex items-center gap-4 flex-1 lg:min-w-[160px] hover:bg-white/5 transition-all cursor-default group">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-0.5">{label}</p>
        <p className="text-xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function WeakAreaItem({ label, progress, color, status }: { label: string, progress: number, color: string, status: string }) {
  const colorMap: Record<string, string> = {
    amber: "bg-amber-500 shadow-[0_0_15px_#f59e0b]",
    blue: "bg-blue-500 shadow-[0_0_15px_#3b82f6]",
    purple: "bg-purple-500 shadow-[0_0_15px_#8b5cf6]",
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-slate-300">{label}</span>
        <span className={cn(
          "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider",
          color === 'amber' ? "bg-amber-500/10 text-amber-500" : 
          color === 'blue' ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"
        )}>{status}</span>
      </div>
      <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={cn("absolute inset-0 rounded-full", colorMap[color])} 
        />
      </div>
      <div className="flex justify-between text-[10px] font-bold text-slate-500">
        <span>Current Proficiency: {progress}%</span>
        <span>Goal: 90%</span>
      </div>
    </div>
  );
}

function RoadmapCard({ status, title, xp, lessons, progress, icon }: { status: 'completed' | 'active' | 'locked', title: string, xp: string, lessons: string, progress?: number, icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn(
        "glass-card p-8 rounded-[40px] border transition-all relative group",
        status === 'active' ? "border-blue-500/30 bg-blue-600/5 shadow-[0_0_40px_rgba(59,130,246,0.1)]" : "border-white/5 opacity-80 hover:opacity-100"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-inner",
        status === 'completed' ? "bg-emerald-500/10 text-emerald-500" : 
        status === 'active' ? "bg-blue-500 text-white shadow-xl shadow-blue-500/30" : 
        "bg-slate-800 text-slate-500"
      )}>
        {icon}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-bold mb-1 leading-tight group-hover:text-blue-400 transition-colors">{title}</h4>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> {lessons} Modules</span>
            <span className="flex items-center gap-1.5 font-bold text-blue-500/70 tracking-widest">{xp}</span>
          </div>
        </div>

        {status === 'active' && (
          <div className="pt-4">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-2">
              <span className="text-blue-400">{progress}% Optimized</span>
              <span className="text-slate-500">Accelerating</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 shadow-[0_0_10px_#3b82f6]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {status === 'locked' && (
          <div className="pt-4">
            <button className="w-full py-3 bg-slate-900 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] cursor-not-allowed">
              Locked Cycle
            </button>
          </div>
        )}

        {status === 'completed' && (
          <div className="pt-4">
            <button className="w-full py-3 bg-emerald-500/10 text-emerald-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-500/20 transition-all">
              Review Mastery
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
