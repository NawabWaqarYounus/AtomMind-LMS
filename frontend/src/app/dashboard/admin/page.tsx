"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Globe, 
  Server, 
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  MoreVertical,
  Bell,
  RefreshCw
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
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function AdminMissionControl() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/dashboard');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Admin data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <DashboardLayout>
      <div className="h-full flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-blue-400 font-black uppercase tracking-[0.3em] animate-pulse">Initializing Global Command...</p>
      </div>
    </DashboardLayout>
  );

  const stats = data?.platformMetrics || {};

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-3"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" /> Oversight Active
            </motion.div>
            <h1 className="text-5xl font-black mb-2 tracking-tighter text-white">Admin <span className="text-blue-500">Overview</span></h1>
            <p className="text-slate-500 font-medium max-w-xl leading-relaxed">
              Global command center for platform administration. Monitoring <span className="text-blue-400 font-bold">{stats.totalUsers}</span> active users across the platform.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-4 bg-white/5 border border-white/5 hover:border-white/20 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 text-white">
              <RefreshCw className="w-4 h-4 text-blue-400" /> Refresh Data
            </button>
            <button className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> System Governance
            </button>
          </div>
        </div>

        {/* Sub-navigation for Admin */}
        <div className="flex gap-6 border-b border-white/5 pb-6">
           <Link href="/dashboard/admin" className="text-sm font-bold text-blue-400 border-b-2 border-blue-500 pb-6 -mb-[26px] z-10">Overview</Link>
           <Link href="/dashboard/admin/users" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">User Management</Link>
           <Link href="/dashboard/admin/courses" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Course Management</Link>
           <Link href="/dashboard/admin/settings" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Settings</Link>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard label="Platform Revenue" value={`$${(data?.revenueData?.reduce((acc: any, curr: any) => acc + curr.amount, 0) / 1000).toFixed(1)}K`} growth="+14.2%" trend="up" icon={<DollarSign className="text-emerald-400" />} color="emerald" />
          <AdminStatCard label="Neural Identities" value={stats.totalUsers} growth="+8.4%" trend="up" icon={<Users className="text-blue-400" />} color="blue" />
          <AdminStatCard label="Global Completion" value={`${stats.avgCompletion}%`} growth="+2.1%" trend="up" icon={<Activity className="text-purple-400" />} color="purple" />
          <AdminStatCard label="Active Nodes" value={stats.activeBootcamps} growth="-1" trend="down" icon={<Globe className="text-amber-400" />} color="amber" />
        </div>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Revenue & User Growth Chart */}
          <div className="xl:col-span-8 glass-card border border-white/5 rounded-[40px] p-10 bg-slate-950/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10">
                <BarChart3 className="w-12 h-12 text-blue-500/10" />
             </div>
             <div className="flex items-center justify-between mb-10">
                <div>
                   <h3 className="text-2xl font-bold">Financial Velocity</h3>
                   <p className="text-sm text-slate-500 font-medium">Monthly revenue and identity acquisition trends</p>
                </div>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Revenue</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">User Growth</span>
                   </div>
                </div>
             </div>

             <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={data?.revenueData}>
                      <defs>
                         <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                         </linearGradient>
                         <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px' }}
                         itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                      <Area type="monotone" dataKey="users" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Platform Health Snapshot */}
          <div className="xl:col-span-4 space-y-8">
             
             {/* System Performance */}
             <div className="glass-card border border-white/5 rounded-[40px] p-8 bg-blue-600/5 relative overflow-hidden group">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                   <Server className="w-5 h-5 text-blue-400" /> Core Infrastructure
                </h3>
                <div className="space-y-6">
                   <MetricBar label="AI Compute Load" value={stats.aiComputeLoad} color="blue" />
                   <MetricBar label="Database Latency" value="12ms" color="emerald" />
                   <MetricBar label="Neural Sync Rate" value="98.2%" color="purple" />
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Uptime</div>
                   <div className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> {stats.systemUptime}
                   </div>
                </div>
             </div>

             {/* Distribution Pie */}
             <div className="glass-card border border-white/5 rounded-[40px] p-8 bg-slate-950/20">
                <h3 className="text-lg font-bold mb-6">User Distribution</h3>
                <div className="h-[200px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={[
                               { name: 'Learners', value: stats.studentCount },
                               { name: 'Architects', value: stats.instructorCount }
                            ]}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                         >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#8b5cf6" />
                         </Pie>
                         <Tooltip />
                      </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Learners</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Architects</span>
                   </div>
                </div>
             </div>

          </div>

        </div>

        {/* Global Activity Feed */}
        <div className="glass-card border border-white/5 rounded-[40px] overflow-hidden bg-slate-950/20">
           <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
              <div>
                 <h3 className="text-xl font-bold">Global Neural Feed</h3>
                 <p className="text-xs text-slate-500 font-medium">Real-time platform events and governance alerts</p>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">View All Protocols</button>
           </div>
           <div className="divide-y divide-white/5">
              {data?.activityFeed?.map((item: any) => (
                <div key={item.id} className="px-10 py-6 hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
                   <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
                        item.type === 'signup' ? "bg-blue-500/10 text-blue-400" :
                        item.type === 'revenue' ? "bg-emerald-500/10 text-emerald-400" :
                        "bg-rose-500/10 text-rose-400"
                      )}>
                         {item.type === 'signup' ? <Users className="w-6 h-6" /> :
                          item.type === 'revenue' ? <DollarSign className="w-6 h-6" /> :
                          <Activity className="w-6 h-6" />}
                      </div>
                      <div>
                         <p className="font-bold text-slate-200 group-hover:text-white transition-colors">{item.detail}</p>
                         <p className="text-xs text-slate-500 font-medium">{item.user}</p>
                      </div>
                   </div>
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                      {item.time}
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

function AdminStatCard({ label, value, growth, trend, icon, color }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-8 rounded-[40px] border border-white/5 bg-slate-950/20 group relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className={cn(
          "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5",
          trend === 'up' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        )}>
          {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {growth}
        </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{label}</p>
      <h3 className="text-3xl font-black text-white">{value}</h3>
      <div className={cn(
        "absolute bottom-0 left-0 h-1 transition-all group-hover:w-full",
        color === 'blue' ? "bg-blue-500 w-12 shadow-[0_0_20px_#3b82f6]" :
        color === 'emerald' ? "bg-emerald-500 w-12 shadow-[0_0_20px_#10b981]" :
        color === 'purple' ? "bg-purple-500 w-12 shadow-[0_0_20px_#8b5cf6]" :
        "bg-amber-500 w-12 shadow-[0_0_20px_#f59e0b]"
      )} />
    </motion.div>
  );
}

function MetricBar({ label, value, color }: any) {
  return (
    <div className="space-y-3">
       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>{label}</span>
          <span className={cn(
            color === 'blue' ? "text-blue-400" :
            color === 'emerald' ? "text-emerald-400" :
            "text-purple-400"
          )}>{value}</span>
       </div>
       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: value.includes('%') ? value : '45%' }}
            className={cn(
              "h-full rounded-full",
              color === 'blue' ? "bg-blue-500 shadow-[0_0_10px_#3b82f6]" :
              color === 'emerald' ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" :
              "bg-purple-500 shadow-[0_0_10px_#8b5cf6]"
            )}
          />
       </div>
    </div>
  );
}
