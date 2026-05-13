"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Brain, 
  ArrowRight, 
  GitBranch, 
  Globe, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: formData.role,
          }
        }
      });

      if (error) throw error;

      toast.success("Identity initialized! Welcome to the ecosystem.");
      
      if (formData.role === 'instructor') router.push("/dashboard/instructor");
      else router.push("/dashboard");

    } catch (error: any) {
      toast.error(error.message || "Authorization initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 group-hover:rotate-6 transition-transform">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl font-black tracking-tighter text-white">AtomMind <span className="text-blue-500">LMS</span></span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join the world's most advanced learning platform</p>
        </div>

        <div className="glass-card p-10 rounded-[40px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'student'})}
                className={cn(
                  "py-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3",
                  formData.role === 'student' ? "bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-500/20" : "glass border-white/5 text-slate-500 hover:text-white"
                )}
              >
                <User className="w-4 h-4" /> Student
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'instructor'})}
                className={cn(
                  "py-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3",
                  formData.role === 'instructor' ? "bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-500/20" : "glass border-white/5 text-slate-500 hover:text-white"
                )}
              >
                <ShieldCheck className="w-4 h-4" /> Instructor
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-white">Full Name</label>
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-white">Email Address</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-white">Password</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed text-center px-6 font-medium">
              By creating an account, you agree to the <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
            </p>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-blue-500/40 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                   <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-white">
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Initializing...
                   </motion.div>
                ) : (
                   <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-white">
                     Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="px-4 bg-[#020617] text-slate-500 text-white">Cross-Platform Sync</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 glass border border-white/5 hover:bg-white/5 rounded-2xl transition-all text-sm font-bold text-white">
              <Globe className="w-5 h-5 text-blue-400" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 glass border border-white/5 hover:bg-white/5 rounded-2xl transition-all text-sm font-bold text-white">
              <GitBranch className="w-5 h-5 text-purple-400" /> GitHub
            </button>
          </div>
        </div>

        <p className="text-center mt-10 text-slate-500 text-sm">
          Already have an account? <Link href="/login" className="text-blue-400 font-bold hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}



