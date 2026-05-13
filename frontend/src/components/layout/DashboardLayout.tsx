"use client";

import { 
  Brain, 
  LayoutDashboard, 
  Compass, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Command,
  Users,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Compass, label: "Learning Path", href: "/dashboard/path" },
  { icon: Users, label: "Instructor Panel", href: "/dashboard/instructor" },
  { icon: ShieldCheck, label: "Admin Panel", href: "/dashboard/admin" },
  { icon: MessageSquare, label: "AI Tutor", href: "/dashboard/ai-tutor" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [role, setRole] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setRole(user.user_metadata?.role || 'student');
        
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileData) setProfile(profileData);
      }
    };
    fetchProfile();
  }, [supabase]);

  const handleLogout = async () => {
    try {
      console.log("Terminating session...");
      await supabase.auth.signOut();
      toast.success("Neural link terminated safely.");
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback redirect
      router.replace("/login");
    }
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (role === 'admin') {
      // Admins see everything except "Learning Path"
      if (item.label === "Learning Path") return false;
      return true;
    }
    if (role === 'instructor') {
      // Instructors see their panel and core tools
      if (item.label === "Learning Path" || item.label === "Admin Panel") return false;
      return true;
    }
    // Students don't see Admin or Instructor panels
    if (item.label === "Instructor Panel" || item.label === "Admin Panel") return false;
    return true;
  });

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const getRoleLabel = () => {
    if (role === 'admin') return "System Governance • Root Access";
    if (role === 'instructor') return "Architect • Neural Node Active";
    return `Master Learner • LVL ${Math.floor((profile?.xp || 0) / 1000) + 1}`;
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="relative border-r border-white/5 bg-slate-950/50 flex flex-col z-30"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-bold tracking-tight whitespace-nowrap"
              >
                AtomMind <span className="text-blue-500">LMS</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          {filteredMenuItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all group relative overflow-hidden",
                pathname === item.href 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-transform group-hover:scale-110", 
                pathname === item.href ? "text-blue-400" : "text-slate-500 group-hover:text-white"
              )} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {item.label}
                </motion.span>
              )}
              {pathname === item.href && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                />
              )}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <button 
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3.5 w-full text-slate-500 hover:text-rose-400 transition-all rounded-2xl hover:bg-rose-500/5 group"
          >
            <LogOut className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && <span className="text-sm font-medium">Terminate Session</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-[#020617] hover:scale-110 transition-transform z-40"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="h-24 border-b border-white/5 px-8 flex items-center justify-between bg-slate-950/20 backdrop-blur-xl relative z-20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 bg-slate-900/50 px-5 py-3 rounded-2xl border border-white/5 w-[400px] group focus-within:border-blue-500/50 transition-all">
              <Search className="w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search resources, lessons, or AI help..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600"
              />
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-500 font-bold">
                <Command className="w-2.5 h-2.5" /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">AI Agent Online</span>
            </div>

            <button className="p-3 rounded-2xl hover:bg-white/5 text-slate-400 relative transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617] shadow-[0_0_10px_#3b82f6]" />
            </button>
            
            <div className="h-8 w-[1px] bg-white/10" />
            
            <div className="flex items-center gap-4 group cursor-pointer relative">
              <div className="text-right">
                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{profile?.full_name || "Neural Identity"}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{getRoleLabel()}</p>
              </div>
              <div 
                className="relative"
                onClick={handleLogout}
                title="Click to Terminate Session"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform">
                  {profile?.full_name ? getInitials(profile.full_name) : "?"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#020617] rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Pages */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
