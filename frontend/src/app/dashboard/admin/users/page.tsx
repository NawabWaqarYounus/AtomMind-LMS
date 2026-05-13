"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  User, 
  Mail, 
  Clock, 
  Trash2, 
  ShieldAlert,
  Zap,
  CheckCircle2,
  XCircle,
  Eye
} from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, [supabase]);

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 text-white">User <span className="text-blue-500">Management</span></h1>
            <p className="text-slate-500 font-medium">Manage platform users, roles, and permissions.</p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 text-white">
                <ShieldAlert className="w-5 h-5 text-amber-500" /> Audit Logs
             </button>
             <button className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                <Zap className="w-5 h-5" /> Send Broadcast
             </button>
          </div>
        </div>

        {/* Sub-navigation for Admin */}
        <div className="flex gap-6 border-b border-white/5 pb-6">
           <Link href="/dashboard/admin" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Overview</Link>
           <Link href="/dashboard/admin/users" className="text-sm font-bold text-blue-400 border-b-2 border-blue-500 pb-6 -mb-[26px] z-10">User Management</Link>
           <Link href="/dashboard/admin/courses" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Course Management</Link>
           <Link href="/dashboard/admin/settings" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Settings</Link>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mt-10">
           <div className="flex-1 bg-slate-900/50 px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-4 group focus-within:border-blue-500/50 transition-all">
              <Search className="w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search users by name, email, or role..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-700 text-white"
              />
           </div>
           <button className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all flex items-center gap-2">
              <Filter className="w-5 h-5" /> Filters
           </button>
        </div>

        {/* User Table */}
        <div className="glass-card border border-white/5 rounded-[40px] overflow-hidden bg-slate-950/20 shadow-2xl">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">User Details</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Role</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Activity Level</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {loading ? (
                   Array(5).fill(0).map((_, i) => (
                     <tr key={i} className="animate-pulse">
                       <td colSpan={5} className="px-8 py-6 h-20 bg-white/[0.01]" />
                     </tr>
                   ))
                 ) : users.map((user) => (
                   <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
                               {user.full_name?.split(' ').map((n: any) => n[0]).join('') || 'U'}
                            </div>
                            <div>
                               <p className="font-bold text-slate-200 group-hover:text-white transition-colors">{user.full_name}</p>
                               <p className="text-xs text-slate-500 font-medium">ID: {user.id.slice(0, 8)}...</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className={cn(
                           "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                           user.role === 'admin' ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
                           user.role === 'instructor' ? "bg-purple-500/10 border-purple-500/20 text-purple-400" :
                           "bg-blue-500/10 border-blue-500/20 text-blue-400"
                         )}>
                           {user.role === 'admin' ? <ShieldAlert className="w-3.5 h-3.5" /> :
                            user.role === 'instructor' ? <ShieldCheck className="w-3.5 h-3.5" /> :
                            <User className="w-3.5 h-3.5" />}
                           {user.role}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <div className="text-xs font-black text-slate-400">LVL {Math.floor(user.xp / 1000) || 1}</div>
                            <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-500" style={{ width: `${(user.xp % 1000) / 10}%` }} />
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active</span>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex gap-2">
                            <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 hover:text-blue-400 transition-all" title="View Profile"><Eye className="w-5 h-5" /></button>
                            <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 hover:text-rose-400 transition-all" title="Delete User"><Trash2 className="w-5 h-5" /></button>
                            <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all" title="More Options"><MoreVertical className="w-5 h-5" /></button>
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

// Helper to keep Link working
import Link from "next/link";
