"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  MessageSquare, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Activity,
  Zap,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const students = [
  { 
    id: "1", 
    name: "Alex Johnson", 
    email: "alex@example.com", 
    progress: 88, 
    status: "active", 
    risk: "low",
    lastActive: "10 mins ago"
  },
  { 
    id: "2", 
    name: "Sarah Miller", 
    email: "sarah@example.com", 
    progress: 42, 
    status: "active", 
    risk: "high",
    lastActive: "2 hours ago"
  },
  { 
    id: "3", 
    name: "James Wilson", 
    email: "james@example.com", 
    progress: 15, 
    status: "inactive", 
    risk: "high",
    lastActive: "3 days ago"
  }
];

export default function InstructorStudents() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 text-white">Student <span className="text-blue-500">Management</span></h1>
            <p className="text-slate-500 font-medium">Monitor engagement and manage student progress.</p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 text-white">
                <Mail className="w-5 h-5 text-blue-400" /> Send Broadcast
             </button>
             <button className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                <Zap className="w-5 h-5" /> Take Action
             </button>
          </div>
        </div>

        {/* Sub-navigation */}
        <div className="flex gap-6 border-b border-white/5 pb-6">
           <Link href="/dashboard/instructor" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Overview</Link>
           <Link href="/dashboard/instructor/courses" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Course Management</Link>
           <Link href="/dashboard/instructor/students" className="text-sm font-bold text-blue-400 border-b-2 border-blue-500 pb-6 -mb-[26px] z-10">Student Management</Link>
           <Link href="/dashboard/instructor/settings" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Settings</Link>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mt-10">
           <div className="flex-1 bg-slate-900/50 px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-4 group focus-within:border-blue-500/50 transition-all">
              <Search className="w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search students by name or email..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600 text-white"
              />
           </div>
           <button className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all flex items-center gap-2">
              <Filter className="w-5 h-5" /> Filters
           </button>
        </div>

        {/* Student Table / List */}
        <div className="glass-card border border-white/5 rounded-[40px] overflow-hidden bg-slate-950/20 shadow-2xl mt-10">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Student Name</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Course Progress</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Risk Level</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {students.map((student) => (
                   <tr key={student.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
                               {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                               <p className="font-bold text-slate-200">{student.name}</p>
                               <p className="text-xs text-slate-500 font-medium">{student.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="w-full max-w-[140px]">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                               <span className="text-blue-400">{student.progress}% Progress</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${student.progress}%` }}
                                 className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" 
                               />
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className={cn(
                           "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                           student.risk === "low" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                         )}>
                           {student.risk === "low" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                           {student.risk} Risk
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full", student.status === "active" ? "bg-emerald-500" : "bg-slate-700")} />
                            <div>
                               <p className="text-xs font-bold text-slate-300">{student.status === "active" ? "Online" : "Offline"}</p>
                               <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{student.lastActive}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex gap-2">
                            <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"><MessageSquare className="w-5 h-5" /></button>
                            <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"><MoreVertical className="w-5 h-5" /></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

      </div>
    </DashboardLayout>
  );
}
