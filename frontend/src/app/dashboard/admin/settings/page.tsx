"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  Settings, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Database, 
  Server, 
  Lock, 
  Cpu,
  Save,
  RefreshCw,
  Bell,
  Mail
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("platform");

  const tabs = [
    { id: "platform", label: "Global Protocols", icon: Globe },
    { id: "ai-core", label: "AI Core Config", icon: Cpu },
    { id: "security", label: "Security Uplink", icon: Lock },
    { id: "database", label: "Neural DB", icon: Database },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 text-white">Platform <span className="text-blue-500">Settings</span></h1>
            <p className="text-slate-500 font-medium">Configure platform-wide settings and system preferences.</p>
          </div>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 group">
            <Save className="w-5 h-5 group-hover:scale-110 transition-transform" /> Save System Settings
          </button>
        </div>

        {/* Sub-navigation for Admin */}
        <div className="flex gap-6 border-b border-white/5 pb-6">
           <Link href="/dashboard/admin" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Overview</Link>
           <Link href="/dashboard/admin/users" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">User Management</Link>
           <Link href="/dashboard/admin/courses" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Course Management</Link>
           <Link href="/dashboard/admin/settings" className="text-sm font-bold text-blue-400 border-b-2 border-blue-500 pb-6 -mb-[26px] z-10">Settings</Link>
        </div>

        <div className="flex gap-10 mt-10">
           
           {/* Sidebar Tabs */}
           <div className="w-80 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all border text-left",
                    activeTab === tab.id 
                      ? "bg-blue-600/10 border-blue-500/20 text-blue-400" 
                      : "text-slate-500 border-transparent hover:bg-white/5 hover:text-slate-300"
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
           </div>

           {/* Content Area */}
           <div className="flex-1 glass-card border border-white/5 rounded-[40px] p-12 bg-slate-950/20 shadow-2xl">
              {activeTab === "platform" && (
                <div className="space-y-10">
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Platform Identity</label>
                         <input type="text" defaultValue="AtomLearn AI" className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500/50 transition-all text-white" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Governance Mode</label>
                         <select className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500/50 transition-all text-white appearance-none">
                            <option>Decentralized Adaptive</option>
                            <option>Strict Pedagogical</option>
                            <option>Open Research</option>
                         </select>
                      </div>
                      <div className="space-y-3 col-span-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">System Broadcast Notice</label>
                         <textarea rows={3} defaultValue="Platform maintenance scheduled for May 15th at 02:00 UTC. Neural links may experience brief latency." className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500/50 transition-all text-white resize-none" />
                      </div>
                   </div>

                   <div className="pt-10 border-t border-white/5 grid grid-cols-3 gap-6">
                      <ConfigToggle label="Allow Instructor Signups" active={true} />
                      <ConfigToggle label="AI Tutor Auto-Enable" active={true} />
                      <ConfigToggle label="Maintenance Mode" active={false} />
                   </div>
                </div>
              )}

              {activeTab !== "platform" && (
                <div className="h-[400px] flex flex-col items-center justify-center text-center">
                   <RefreshCw className="w-12 h-12 text-slate-700 animate-spin-slow mb-6" />
                   <h3 className="text-xl font-bold mb-2 text-white">Synchronizing Node</h3>
                   <p className="text-sm text-slate-500 max-w-xs">Initializing administrative protocols for this governance sector.</p>
                </div>
              )}
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

function ConfigToggle({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-blue-500/20 transition-all">
       <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{label}</span>
       <div className={cn(
         "w-10 h-5 rounded-full relative transition-colors",
         active ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" : "bg-slate-800"
       )}>
          <div className={cn(
            "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
            active ? "right-1" : "left-1"
          )} />
       </div>
    </div>
  );
}
