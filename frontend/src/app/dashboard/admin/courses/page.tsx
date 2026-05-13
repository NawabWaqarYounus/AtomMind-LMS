"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Users, 
  Layers,
  Eye,
  AlertCircle,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", category: "Web Development", difficulty: "Beginner" });
  const [newLesson, setNewLesson] = useState({ title: "", video_url: "", content: "" });
  const [lessonSubmitting, setLessonSubmitting] = useState(false);
  const supabase = createClient();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setCourses(data);
    } catch (error: any) {
      console.error("Error fetching admin courses:", error);
      toast.error("Failed to load platform courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchLessons = async (courseId: string) => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order', { ascending: true });
      if (error) throw error;
      if (data) setLessons(data);
    } catch (error: any) {
      console.error("Error fetching admin lessons:", error);
      toast.error("Failed to load videos");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [supabase]);

  const handleCreateCourse = async () => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from('courses').insert([
        { 
          title: newCourse.title, 
          category: newCourse.category, 
          difficulty: newCourse.difficulty,
          instructor_id: user.id,
          is_published: true
        }
      ]);

      if (error) throw error;

      toast.success("Platform course created!");
      setIsModalOpen(false);
      setNewCourse({ title: "", category: "Web Development", difficulty: "Beginner" });
      fetchCourses();
    } catch (error: any) {
      console.error("Error creating admin course:", error);
      toast.error(error.message || "Failed to create platform course");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddLesson = async () => {
    setLessonSubmitting(true);
    try {
      const { error } = await supabase.from('lessons').insert([
        { 
          course_id: selectedCourse.id,
          title: newLesson.title,
          video_url: newLesson.video_url,
          content: newLesson.content,
          order: lessons.length + 1
        }
      ]);

      if (error) throw error;

      toast.success("Video added to course metadata!");
      setNewLesson({ title: "", video_url: "", content: "" });
      fetchLessons(selectedCourse.id);
    } catch (error: any) {
      console.error("Error adding admin video:", error);
      toast.error(error.message || "Failed to add video");
    } finally {
      setLessonSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 text-white">Course <span className="text-blue-500">Management</span></h1>
            <p className="text-slate-500 font-medium">Oversee all platform courses and instructional quality.</p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 text-white">
                <AlertCircle className="w-5 h-5 text-rose-500" /> Pending Review
             </button>
             <button 
               onClick={() => setIsModalOpen(true)}
               className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
             >
                <Plus className="w-5 h-5" /> Add New Course
             </button>
          </div>
        </div>

        {/* Create Course Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm text-white">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md glass-card bg-slate-900 border border-white/10 rounded-[40px] p-10 space-y-6"
            >
              <h2 className="text-2xl font-bold">Create New Course</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Course Title</label>
                  <input 
                    type="text" 
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="Enter course title..."
                    className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Category</label>
                    <select 
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all appearance-none"
                    >
                      <option>Web Development</option>
                      <option>AI & Machine Learning</option>
                      <option>Data Science</option>
                      <option>Design</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Difficulty</label>
                    <select 
                      value={newCourse.difficulty}
                      onChange={(e) => setNewCourse({...newCourse, difficulty: e.target.value})}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all appearance-none"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-slate-400 hover:text-white transition-all">Cancel</button>
                <button onClick={handleCreateCourse} disabled={submitting || !newCourse.title} className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                  {submitting ? "Creating..." : "Create Course"}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Video Management Modal */}
        {isLessonModalOpen && selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm text-white">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-4xl glass-card bg-slate-900 border border-white/10 rounded-[40px] p-12 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-start mb-10 text-white">
                <div>
                   <h2 className="text-3xl font-bold mb-2">Video Management</h2>
                   <p className="text-slate-500 font-medium">Admin Oversight: <span className="text-blue-400">{selectedCourse.title}</span></p>
                </div>
                <button onClick={() => setIsLessonModalOpen(false)} className="p-3 bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
                 <div className="space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Plus className="w-5 h-5 text-blue-500" /> Add New Video</h3>
                    <div className="space-y-4">
                       <input type="text" value={newLesson.title} onChange={(e) => setNewLesson({...newLesson, title: e.target.value})} placeholder="Video Title" className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all" />
                       <input type="text" value={newLesson.video_url} onChange={(e) => setNewLesson({...newLesson, video_url: e.target.value})} placeholder="Video URL" className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all" />
                       <textarea value={newLesson.content} onChange={(e) => setNewLesson({...newLesson, content: e.target.value})} rows={3} placeholder="Description" className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 outline-none transition-all resize-none" />
                       <button onClick={handleAddLesson} disabled={lessonSubmitting || !newLesson.title || !newLesson.video_url} className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                         {lessonSubmitting ? "Adding..." : "Add Video"}
                       </button>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Recorded Content ({lessons.length})</h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                       {lessons.map((lesson, idx) => (
                         <div key={lesson.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-xs font-bold text-slate-500">{idx + 1}</div>
                               <p className="text-sm font-bold line-clamp-1">{lesson.title}</p>
                            </div>
                         </div>
                       ))}
                       {lessons.length === 0 && <div className="py-12 text-center border border-dashed border-white/10 rounded-[40px] text-slate-500">No videos yet.</div>}
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Sub-navigation for Admin */}
        <div className="flex gap-6 border-b border-white/5 pb-6">
           <Link href="/dashboard/admin" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Overview</Link>
           <Link href="/dashboard/admin/users" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">User Management</Link>
           <Link href="/dashboard/admin/courses" className="text-sm font-bold text-blue-400 border-b-2 border-blue-500 pb-6 -mb-[26px] z-10">Course Management</Link>
           <Link href="/dashboard/admin/settings" className="text-sm font-bold text-slate-500 hover:text-white transition-all pb-6">Settings</Link>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
           {loading ? (
             Array(3).fill(0).map((_, i) => (
               <div key={i} className="h-[300px] bg-white/[0.02] rounded-[40px] animate-pulse" />
             ))
           ) : courses.map((course) => (
             <motion.div 
               key={course.id}
               whileHover={{ y: -5 }}
               className="glass-card border border-white/5 rounded-[40px] p-8 bg-slate-950/20 group relative overflow-hidden text-white"
             >
                <div className="absolute top-0 right-0 p-6">
                   <button className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                      <MoreVertical className="w-5 h-5" />
                   </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                   <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest">
                      {course.category}
                   </div>
                   <div className={cn(
                     "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                     course.is_published ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-slate-500/10 border-slate-500/20 text-slate-500"
                   )}>
                     {course.is_published ? "Live" : "Review"}
                   </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">{course.title}</h3>
                <p className="text-xs text-slate-500 font-medium mb-6">Instructor: {course.profiles?.full_name || "System"}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="flex items-center gap-3 text-slate-400">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-bold">0 Enrolled</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-400">
                      <Layers className="w-4 h-4 text-purple-500" />
                      <span className="text-xs font-bold">{course.difficulty}</span>
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5" /> Created {new Date(course.created_at).toLocaleDateString()}
                   </div>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsLessonModalOpen(true);
                          fetchLessons(course.id);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
                      >
                         Manage Videos
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
           {courses.length === 0 && !loading && (
             <div className="col-span-full py-20 text-center glass-card border border-white/5 rounded-[40px] bg-slate-950/20 text-white">
                <BookOpen className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400">No courses found</h3>
                <p className="text-slate-500">Admins can create courses or manage existing ones.</p>
             </div>
           )}
        </div>

      </div>
    </DashboardLayout>
  );
}

