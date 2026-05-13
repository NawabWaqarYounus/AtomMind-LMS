"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Settings, 
  Bell, 
  Lock, 
  Globe, 
  Zap, 
  Brain, 
  ShieldCheck,
  Save,
  Camera
} from "lucide-react";
import { motion } from "framer-motion";

import { createClient } from "@/lib/supabase";

export default function InstructorSettings() {
  const [activeTab, setActiveTab] = useState("profile");
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

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Privacy", icon: Lock },
    { id: "ai-settings", label: "AI Assistant", icon: Brain },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 text-white">Account <span className="text-blue-500">Settings</span></h1>
            <p className="text-slate-500 font-medium">Manage your personal information and preferences.</p>
          </div>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 group">
            <Save className="w-5 h-5 group-hover:scale-110 transition-transform" /> Save Changes
          </button>
        </div>

        {/* Sub-navigation */}
        <div className="flex gap-6 border-b border-white/5 pb-6">
           <Link href="/dashboard/instructor" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Overview</Link>
           <Link href="/dashboard/instructor/courses" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Course Management</Link>
           <Link href="/dashboard/instructor/students" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Student Management</Link>
           <Link href="/dashboard/instructor/settings" className="text-sm font-bold text-blue-400 border-b-2 border-blue-500 pb-6 -mb-[26px] z-10">Settings</Link>
        </div>

        <div className="flex gap-10">
           
           {/* Navigation Tabs */}
           <div className="w-80 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all border",
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
           <div className="flex-1 glass-card border border-white/5 rounded-[40px] p-12 bg-slate-950/20">
              {activeTab === "profile" && (
                <div className="space-y-10">
                   <div className="flex items-center gap-8">
                      <div className="relative group cursor-pointer">
                         <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-black shadow-2xl">
                           {profile?.full_name ? profile.full_name.split(' ').map((n: any) => n[0]).join('') : "AJ"}
                         </div>
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-[32px] flex items-center justify-center transition-opacity">
                            <Camera className="w-6 h-6 text-white" />
                         </div>
                      </div>
                      <div>
                         <h3 className="text-xl font-bold mb-1 text-white">{profile?.full_name || "Instructor Name"}</h3>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Instructor ID: {profile?.id?.slice(0, 8) || "N/A"}</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
                         <input type="text" defaultValue={profile?.full_name || ""} className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500/50 transition-all text-white" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email Address</label>
                         <input type="email" defaultValue={profile?.email || ""} className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500/50 transition-all text-white" />
                      </div>
                      <div className="space-y-3 col-span-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Professional Bio</label>
                         <textarea rows={4} defaultValue="Experienced educator specializing in advanced technology and adaptive learning frameworks." className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500/50 transition-all resize-none text-white" />
                      </div>
                   </div>

                   <div className="pt-10 border-t border-white/5 grid grid-cols-2 gap-6">
                      <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                         <Zap className="w-8 h-8 text-blue-500" />
                         <div>
                            <p className="text-sm font-bold text-white">Advanced Analysis</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Powered by AI Core</p>
                         </div>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-4">
                         <Globe className="w-8 h-8 text-indigo-500" />
                         <div>
                            <p className="text-sm font-bold text-white">Public Profile</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Visible to all students</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab !== "profile" && (
                <div className="h-[400px] flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6">
                      <Settings className="w-8 h-8 text-slate-700 animate-spin-slow" />
                   </div>
                   <h3 className="text-lg font-bold mb-2 text-white">Syncing Settings</h3>
                   <p className="text-sm text-slate-500 max-w-xs">Connecting to the platform's central configuration hub.</p>
                </div>
              )}
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
