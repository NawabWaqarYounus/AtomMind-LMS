"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  User, 
  Shield, 
  Bell, 
  Cpu, 
  Globe, 
  Moon, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Camera,
  Mail,
  Lock,
  Smartphone,
  Eye,
  Settings as SettingsIcon,
  Trash2
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai', label: 'AI Preferences', icon: Cpu },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Ecosystem <span className="text-blue-500">Settings</span></h1>
          <p className="text-slate-400">Configure your neural identity and platform preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all",
                  activeTab === tab.id 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" 
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
            <div className="pt-10">
              <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-500/5 transition-all">
                <LogOut className="w-5 h-5" /> Terminate Session
              </button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-9 space-y-8">
            {activeTab === 'profile' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                {/* Profile Header */}
                <div className="glass-card p-10 rounded-[40px] border border-white/5 flex flex-col md:flex-row items-center gap-10">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-black shadow-2xl shadow-blue-500/20">
                      AJ
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-blue-600 rounded-2xl border-4 border-[#020617] text-white hover:scale-110 transition-all">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-1">Alex Johnson</h3>
                    <p className="text-slate-500 mb-6 font-medium">Master Learner • Member since May 2026</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                       <span className="px-4 py-2 bg-blue-600/10 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20">Student Account</span>
                       <span className="px-4 py-2 bg-emerald-600/10 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Verified Identity</span>
                    </div>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="glass-card p-10 rounded-[40px] border border-white/5 space-y-8">
                   <h3 className="text-xl font-bold flex items-center gap-3">
                     <User className="w-5 h-5 text-blue-400" /> Neural Identity Details
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                        <div className="relative">
                          <input type="text" defaultValue="Alex Johnson" className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Axis</label>
                        <div className="relative">
                          <input type="email" defaultValue="alex@nexus.com" className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Primary Discipline</label>
                        <select className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm appearance-none">
                           <option>Full Stack Engineering</option>
                           <option>Artificial Intelligence</option>
                           <option>System Design</option>
                           <option>Data Science</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Time Zone</label>
                        <select className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm appearance-none">
                           <option>Universal Coordinated Time (UTC)</option>
                           <option>Pacific Standard Time (PST)</option>
                           <option>Eastern Standard Time (EST)</option>
                        </select>
                      </div>
                   </div>
                   <div className="flex justify-end pt-4">
                      <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">Save Synchronization</button>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="glass-card p-10 rounded-[40px] border border-white/5 space-y-10">
                   <div>
                     <h3 className="text-xl font-bold flex items-center gap-3 mb-2">
                       <Shield className="w-5 h-5 text-emerald-400" /> Encryption & Guard
                     </h3>
                     <p className="text-sm text-slate-500">Protect your neural data and access points.</p>
                   </div>

                   <div className="space-y-6">
                      <SecurityOption 
                        icon={<Lock />} 
                        title="Two-Factor Authentication" 
                        desc="Add an extra layer of security to your account sync." 
                        enabled={true}
                      />
                      <SecurityOption 
                        icon={<Smartphone />} 
                        title="Authorized Devices" 
                        desc="Manage devices currently synchronized with your identity." 
                        enabled={false}
                      />
                      <SecurityOption 
                        icon={<Eye />} 
                        title="Advanced Visibility" 
                        desc="Control who can see your learning progress and XP." 
                        enabled={true}
                      />
                   </div>

                   <div className="pt-10 border-t border-white/5">
                      <button className="px-6 py-3 border border-rose-500/30 text-rose-500 rounded-xl text-xs font-bold hover:bg-rose-500/5 transition-all flex items-center gap-2">
                        <Trash2 className="w-4 h-4" /> Deactivate Neural Identity
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SecurityOption({ icon, title, desc, enabled }: { icon: React.ReactNode, title: string, desc: string, enabled: boolean }) {
  return (
    <div className="flex items-center justify-between gap-6 p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition-all">
       <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400">
             {icon}
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">{title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">{desc}</p>
          </div>
       </div>
       <button className={cn(
         "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
         enabled ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-slate-800 text-slate-500"
       )}>
         {enabled ? "Active" : "Configure"}
       </button>
    </div>
  );
}
