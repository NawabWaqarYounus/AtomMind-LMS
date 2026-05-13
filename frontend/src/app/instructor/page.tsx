"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { 
  Users, 
  UserMinus, 
  TrendingUp, 
  Clock, 
  Search, 
  Filter, 
  AlertTriangle,
  ChevronRight,
  MoreVertical,
  MessageCircle,
  BarChart2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const atRiskStudents = [
  { id: '1', name: 'Ahmed Khan', risk: 82, engagement: 24, lastActive: '3 days ago', status: 'critical' },
  { id: '2', name: 'Fatima Zahra', risk: 67, engagement: 45, lastActive: '1 day ago', status: 'high' },
  { id: '3', name: 'John Doe', risk: 45, engagement: 62, lastActive: '2 hours ago', status: 'medium' },
  { id: '4', name: 'Sarah Smith', risk: 38, engagement: 58, lastActive: '5 days ago', status: 'medium' },
];

const courseData = [
  { name: 'Python Basics', enrolled: 450, completion: 85 },
  { name: 'Data Science', enrolled: 320, completion: 72 },
  { name: 'Machine Learning', enrolled: 280, completion: 64 },
  { name: 'SQL Foundations', enrolled: 520, completion: 91 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];

export default function InstructorDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:row items-start lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Instructor Intelligence</h1>
            <p className="text-slate-400">Monitoring <span className="text-blue-400 font-bold">1,570 active students</span> across 4 courses.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
              Create New Course
            </button>
            <button className="px-5 py-2.5 glass border border-white/5 hover:bg-white/5 rounded-xl text-sm font-bold transition-all">
              Export Analytics
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatWidget icon={<Users className="text-blue-500" />} label="Total Students" value="1,572" trend="+12%" />
          <StatWidget icon={<BarChart2 className="text-purple-500" />} label="Avg. Engagement" value="78%" trend="+5.4%" />
          <StatWidget icon={<Clock className="text-emerald-500" />} label="Learning Time" value="4.2h/d" trend="+1.2%" />
          <StatWidget icon={<UserMinus className="text-rose-500" />} label="At-Risk" value="24" trend="-8%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Course Engagement Trends</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-2 text-xs text-slate-400"><div className="w-2 h-2 rounded-full bg-blue-500" /> Enrollment</span>
                <span className="flex items-center gap-2 text-xs text-slate-400"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Completion %</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Bar dataKey="enrolled" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completion" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* At-Risk Panel */}
          <div className="glass-card p-6 rounded-3xl border border-white/5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="text-rose-500 w-5 h-5" /> At-Risk Students
              </h3>
              <button className="text-xs text-blue-400 hover:underline">See all</button>
            </div>
            
            <div className="space-y-4 flex-1">
              {atRiskStudents.map((student) => (
                <div key={student.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center font-bold text-xs">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{student.name}</p>
                      <p className="text-[10px] text-slate-500">Risk Score: <span className={cn(
                        "font-bold",
                        student.status === 'critical' ? "text-rose-500" : "text-amber-500"
                      )}>{student.risk}%</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl">
                <p className="text-xs text-rose-200 leading-relaxed">
                  <span className="font-bold">AI Prediction:</span> Dropout risk increased by 14% this week. Suggested intervention: 1-on-1 sessions for the top 5 critical students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatWidget({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="glass-card p-6 rounded-3xl border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-lg",
          isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
        )}>
          {trend}
        </span>
      </div>
      <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
      <h4 className="text-3xl font-bold">{value}</h4>
    </div>
  );
}


