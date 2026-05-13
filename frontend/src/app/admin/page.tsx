"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  DollarSign, 
  Settings, 
  TrendingUp, 
  Activity,
  Globe,
  Database,
  Cpu
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const growthData = [
  { month: 'Jan', users: 1200, revenue: 15000 },
  { month: 'Feb', users: 2100, revenue: 28000 },
  { month: 'Mar', users: 3800, revenue: 45000 },
  { month: 'Apr', users: 5100, revenue: 62000 },
  { month: 'May', users: 7400, revenue: 89000 },
  { month: 'Jun', users: 9800, revenue: 110000 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Platform Administration</h1>
            <p className="text-slate-400">Overview of global platform health, revenue, and infrastructure.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 glass border border-white/5 rounded-xl text-sm font-medium flex items-center gap-2">
              <Database className="w-4 h-4" /> System Logs
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium flex items-center gap-2">
              <Settings className="w-4 h-4" /> Configure Platform
            </button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard icon={<Users className="text-blue-500" />} label="Total Registered" value="12,450" subValue="+2.4k this month" color="blue" />
          <AdminStatCard icon={<BookOpen className="text-purple-500" />} label="Active Courses" value="142" subValue="12 pending review" color="purple" />
          <AdminStatCard icon={<DollarSign className="text-emerald-500" />} label="Total Revenue" value="$110,400" subValue="+18% growth" color="emerald" />
          <AdminStatCard icon={<Cpu className="text-orange-500" />} label="AI API Usage" value="840k ops" subValue="72% efficiency" color="orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="glass-card p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="text-emerald-500 w-5 h-5" /> Financial Growth
              </h3>
              <select className="bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 text-sm outline-none">
                <option>Monthly View</option>
                <option>Quarterly View</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Acquisition */}
          <div className="glass-card p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Users className="text-blue-500 w-5 h-5" /> User Acquisition
              </h3>
              <button className="text-xs text-slate-500 hover:text-white">View Details</button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Infrastructure Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Activity className="w-7 h-7 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Platform Uptime</p>
              <h4 className="text-2xl font-bold text-emerald-400">99.98%</h4>
              <p className="text-[10px] text-slate-500">Last 30 days stable</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Globe className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Regions</p>
              <h4 className="text-2xl font-bold">14 Active</h4>
              <p className="text-[10px] text-slate-500">Latency: 42ms avg</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-purple-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Security Status</p>
              <h4 className="text-2xl font-bold text-purple-400">Optimized</h4>
              <p className="text-[10px] text-slate-500">0 critical vulnerabilities</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AdminStatCard({ icon, label, value, subValue, color }: { icon: React.ReactNode, label: string, value: string, subValue: string, color: string }) {
  return (
    <div className="glass-card p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition-all">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className={cn(
        "text-xs font-bold",
        color === 'blue' ? "text-blue-400" : 
        color === 'purple' ? "text-purple-400" : 
        color === 'emerald' ? "text-emerald-400" : "text-orange-400"
      )}>{subValue}</p>
    </div>
  );
}


