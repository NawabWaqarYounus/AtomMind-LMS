"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Brain, 
  Code, 
  Lightbulb, 
  RotateCcw,
  Plus,
  MessageSquare,
  Search,
  ChevronLeft,
  ChevronRight,
  History,
  MoreVertical,
  Trash2,
  Share2,
  Zap,
  Globe,
  Layers,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  date: string;
}

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to your **Neural Workspace**, Alex. I've been monitoring your synaptic engagement across the **Python Ecosystem**. You've mastered **Basic Control Flow**, but your performance in **Asynchronous Logic** indicates a potential bottleneck. \n\nHow can I assist your cognitive expansion today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: '1', title: "Python Async Patterns", date: "Today" },
    { id: '2', title: "React Server Components", date: "Yesterday" },
    { id: '3', title: "PostgreSQL Indexing", date: "2 days ago" },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'mock-user-id', // In real app, get from auth
          message: input,
          sessionId: 'default'
        })
      });

      const data = await response.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      toast.error("Link to Neural Network lost. Retrying...");
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-160px)] flex gap-6 relative overflow-hidden">
        
        {/* Chat Sidebar (History) */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="glass-card border border-white/5 rounded-[32px] flex flex-col overflow-hidden bg-slate-950/40"
            >
              <div className="p-6 border-b border-white/5">
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20">
                  <Plus className="w-4 h-4" /> New Session
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-4 mb-4">Neural History</h3>
                  <div className="space-y-1">
                    {sessions.map((session) => (
                      <button 
                        key={session.id}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all group",
                          session.id === '1' ? "bg-blue-600/10 text-blue-400 border border-blue-500/10" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <MessageSquare className="w-4 h-4 shrink-0 opacity-50" />
                        <span className="truncate font-medium">{session.title}</span>
                        <MoreVertical className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 space-y-4">
                 <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-slate-400 text-xs font-bold cursor-help border border-transparent hover:border-white/10 transition-all">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span>Memory: 12.4 GB / 64 GB</span>
                 </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col glass-card border border-white/5 rounded-[40px] overflow-hidden bg-slate-950/20 relative">
          
          {/* Top Bar */}
          <div className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-slate-900/40 backdrop-blur-md z-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"
              >
                {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                   Python Async Patterns 
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                </h2>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                   Synchronized with Cloud Core
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10"><Share2 className="w-5 h-5" /></button>
              <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-400 hover:text-rose-400 transition-all border border-transparent hover:border-white/10"><Trash2 className="w-5 h-5" /></button>
              <div className="w-[1px] h-6 bg-white/10 mx-2" />
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                 <Sparkles className="w-4 h-4 text-blue-400" />
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Llama 3.3 Enhanced</span>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar relative"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-8 max-w-5xl mx-auto group",
                    msg.role === 'user' ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl relative transition-transform group-hover:scale-105",
                    msg.role === 'assistant' 
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white" 
                      : "bg-slate-800 border border-white/10 text-white"
                  )}>
                    {msg.role === 'assistant' ? <Bot className="w-7 h-7" /> : <User className="w-7 h-7" />}
                    {msg.role === 'assistant' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#020617] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                      </div>
                    )}
                  </div>
                  
                  <div className={cn(
                    "flex-1 space-y-2",
                    msg.role === 'user' ? "text-right" : ""
                  )}>
                    <div className={cn(
                      "inline-block px-6 py-4 rounded-3xl text-sm leading-relaxed relative overflow-hidden",
                      msg.role === 'assistant' 
                        ? "bg-white/5 border border-white/5 text-slate-200" 
                        : "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                    )}>
                      {msg.role === 'assistant' && <div className="absolute top-0 left-0 w-full h-full shimmer opacity-10 pointer-events-none" />}
                      <div className={cn(
                        "prose prose-invert max-w-none prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/5 prose-code:text-blue-400 prose-headings:text-white prose-strong:text-blue-400",
                        msg.role === 'assistant' ? "" : "text-white"
                      )}>
                        <ReactMarkdown
                          components={{
                            code({node, inline, className, children, ...props}: any) {
                              const match = /language-(\w+)/.exec(className || '')
                              return !inline && match ? (
                                <div className="relative group/code my-6">
                                  <div className="absolute -top-3 right-4 px-2 py-1 rounded bg-slate-800 border border-white/10 text-[10px] font-black uppercase text-slate-500 opacity-0 group-hover/code:opacity-100 transition-opacity z-10">
                                    {match[1]}
                                  </div>
                                  <SyntaxHighlighter
                                    style={vscDarkPlus as any}
                                    language={match[1]}
                                    PreTag="div"
                                    className="rounded-2xl border border-white/5 !bg-[#0d1117] custom-scrollbar !p-6"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                </div>
                              ) : (
                                <code className={cn("px-1.5 py-0.5 rounded bg-white/10 text-blue-300 font-medium", className)} {...props}>
                                  {children}
                                </code>
                              )
                            }
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                      
                      <div className={cn("text-[10px] mt-4 opacity-40 font-bold uppercase tracking-widest", msg.role === 'user' ? "text-right" : "")}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {msg.role === 'assistant' && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                        <ActionButton icon={<Globe className="w-4 h-4" />} />
                        <ActionButton icon={<Layers className="w-4 h-4" />} />
                        <ActionButton icon={<FileText className="w-4 h-4" />} />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-8 max-w-5xl mx-auto"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-7 h-7" />
                  </div>
                  <div className="flex items-center gap-2 p-6 bg-slate-900/50 border border-white/5 rounded-3xl">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Interaction Area */}
          <div className="p-10 pt-0 bg-gradient-to-t from-slate-950/80 to-transparent relative z-10">
            
            {/* Quick Suggestions */}
            <div className="flex gap-3 mb-6 overflow-x-auto custom-scrollbar pb-2 px-2">
              <SuggestionChip label="Explain Closures" icon={<Lightbulb className="w-3.5 h-3.5" />} onClick={() => setInput("Can you explain Javascript closures in 2 sentences?")} />
              <SuggestionChip label="Review Python Logic" icon={<Code className="w-3.5 h-3.5" />} onClick={() => setInput("Review my Python asynchronous logic patterns.")} />
              <SuggestionChip label="Next Learning Step" icon={<Search className="w-3.5 h-3.5" />} onClick={() => setInput("What should I learn after React Server Components?")} />
            </div>

            <div className="relative group px-2">
              <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative flex flex-col bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-[40px] overflow-hidden focus-within:border-blue-500/50 transition-all shadow-2xl">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask anything or search your learning path..." 
                  className="w-full bg-transparent p-8 pb-20 text-base outline-none resize-none min-h-[160px] placeholder:text-slate-600 scrollbar-hide font-medium"
                />
                
                <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between">
                  <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white/5 border border-white/5 hover:border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center gap-2 group/btn">
                       <Layers className="w-4 h-4 text-blue-500 group-hover/btn:scale-110 transition-transform" /> Attach Context
                    </button>
                    <button className="px-5 py-2.5 bg-white/5 border border-white/5 hover:border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center gap-2 group/btn">
                       <Globe className="w-4 h-4 text-indigo-500 group-hover/btn:scale-110 transition-transform" /> Web Research
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-14 h-14 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-2xl flex items-center justify-center transition-all shadow-2xl shadow-blue-500/40 group/send"
                  >
                    <Send className={cn("w-6 h-6 text-white transition-transform", !isTyping && "group-hover:translate-x-0.5 group-hover:-translate-y-0.5")} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-8">
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Powered by AtomLearn Core-1 (Llama 3.3)</p>
              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Neural Link Encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ActionButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2.5 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10">
      {icon}
    </button>
  );
}

function SuggestionChip({ label, icon, onClick }: { label: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-3 glass-card border border-white/5 rounded-2xl text-xs font-bold text-slate-400 hover:text-white hover:border-white/20 transition-all hover:bg-white/5 whitespace-nowrap shadow-xl"
    >
      <span className="text-blue-500">{icon}</span>
      {label}
    </button>
  );
}

