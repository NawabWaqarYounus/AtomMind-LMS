"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { User, Mail, Shield, Award, Edit2, Camera, MapPin, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative">
          {/* Cover Image */}
          <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl" />
          
          {/* Profile Header */}
          <div className="px-8 -mt-12 flex flex-col md:row items-end justify-between gap-6">
            <div className="flex flex-col md:row items-end gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-slate-900 border-4 border-[#020617] flex items-center justify-center font-bold text-4xl text-white shadow-xl overflow-hidden">
                  AJ
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <h1 className="text-3xl font-bold">Alex Johnson</h1>
                <p className="text-slate-400 flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Stack Student • Level 12
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-white/5">
              <h3 className="font-bold mb-4">Personal Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">alex.j@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <LinkIcon className="w-4 h-4 text-slate-500" />
                  <a href="#" className="text-blue-400 hover:underline">alexjohnson.dev</a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-white/5">
              <h3 className="font-bold mb-4">Achievements</h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group hover:border-blue-500/30 transition-all cursor-help">
                    <Award className={cn(
                      "w-8 h-8",
                      i <= 3 ? "text-yellow-500" : "text-slate-600"
                    )} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="glass-card p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold mb-6">Learning Goals</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Mastering React & Next.js</span>
                    <span className="text-blue-400 font-bold">85%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Python for Data Science</span>
                    <span className="text-purple-400 font-bold">42%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600" style={{ width: '42%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold mb-6">Bio</h3>
              <p className="text-slate-400 leading-relaxed">
                Passionate software engineering student focused on building intelligent web applications. 
                Currently exploring the intersection of AI and EdTech to create better learning experiences. 
                Always looking for new challenges and collaborative projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


