"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function DashboardSwitcher() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkRoleAndRedirect = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.replace("/login");
        return;
      }

      const role = user.user_metadata?.role || 'student';

      if (role === 'admin') {
        router.replace("/dashboard/admin");
      } else if (role === 'instructor') {
        router.replace("/dashboard/instructor");
      } else {
        router.replace("/dashboard/student");
      }
    };

    checkRoleAndRedirect();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-6">
      <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      <div className="text-center">
        <p className="text-blue-400 font-black uppercase tracking-[0.3em] animate-pulse mb-2">Secure Session Established</p>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Authenticating Profile...</p>
      </div>
    </div>
  );
}
