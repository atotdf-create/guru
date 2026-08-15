import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Zap, 
  MessageSquare, 
  Send, 
  X, 
  ChevronRight, 
  Lock, 
  Globe, 
  Activity, 
  Sparkles,
  Github,
  Mail,
  MapPin,
  Phone,
  Layers,
  Flame,
  CheckCircle2
} from "lucide-react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Greetings. I am TDF TECH AI, powered by Grok. How may I assist your high-performance architecture today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.grok.chat.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userText = inputMessage.trim();
    setInputMessage("");
    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setIsSending(true);

    try {
      const res = await chatMutation.mutateAsync({
        messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
      });
      setMessages([...newMessages, { role: "assistant", content: res.reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Neural transmission error encountered. Please verify network connectivity or try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b10] text-[#e2e8f0] font-sans selection:bg-green-500 selection:text-black overflow-x-hidden relative">
      {/* Background Neon Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0b10]/80 border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-green-500 p-[2px] tdf-interactive-glow tdf-double-border">
              <div className="w-full h-full bg-[#0a0b10] rounded-[6px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-red-500 via-white to-green-500 bg-clip-text text-transparent">
              TDF TECH
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <a href="#services" className="hover:text-green-400 transition-colors">Services</a>
            <a href="#about" className="hover:text-green-400 transition-colors">About</a>
            <a href="#ecosystem" className="hover:text-green-400 transition-colors">Ecosystem</a>
            <a href="#contact" className="hover:text-green-400 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsChatOpen(true)}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600/20 to-green-600/20 border border-green-500/40 text-green-400 hover:border-red-500 hover:text-red-400 transition-all duration-300 tdf-interactive-glow tdf-double-border text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 text-green-400" />
              <span>TDF Assistant</span>
            </button>
            <a
              href="https://github.com/guru"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-green-500 transition-colors tdf-interactive-glow tdf-double-border"
              title="GitHub Repository: guru"
            >
              <Github className="w-5 h-5 text-gray-300" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Bold Asymmetric Layout */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Asymmetric Wide) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>Next-Gen Cyber & AI Systems</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none">
                ENGINEERING <br />
                <span className="bg-gradient-to-r from-red-500 via-green-400 to-green-600 bg-clip-text text-transparent">
                  THE FUTURE
                </span> <br />
                OF DIGITAL REALMS
              </h1>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                Welcome to <strong className="text-white">TDF TECH</strong>. We architect elite, high-performance web infrastructures, decentralized systems, and autonomous AI pipelines engineered for absolute superiority.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#services"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-black font-bold tracking-wide hover:brightness-110 transition-all duration-300 tdf-interactive-glow tdf-double-border shadow-[0_0_25px_rgba(34,197,94,0.4)] flex items-center space-x-2"
                >
                  <span>Explore Capabilities</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-8 py-4 rounded-xl bg-[#12141c] border-2 border-red-500/50 text-red-400 font-bold tracking-wide hover:bg-red-500/10 transition-all duration-300 tdf-interactive-glow tdf-double-border flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Launch TDF Assistant</span>
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div className="tdf-interactive-glow tdf-double-border p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-3xl font-black text-green-400">99.9%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Uptime SLA</div>
                </div>
                <div className="tdf-interactive-glow tdf-double-border p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-3xl font-black text-red-400">&lt;12ms</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Response Latency</div>
                </div>
                <div className="tdf-interactive-glow tdf-double-border p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-3xl font-black text-emerald-400">256-bit</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Encrypted Core</div>
                </div>
              </div>
            </div>

            {/* Right Column (Interactive Holographic Card / Terminal Showcase) */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Glowing border wrapper */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-green-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt"></div>
                
                <div className="relative bg-[#11131c] border-2 border-green-500/30 rounded-2xl p-6 shadow-2xl tdf-interactive-glow tdf-double-border space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs font-mono text-gray-400">tdf-core-v4.9.sh</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center space-x-2 text-green-400">
                      <span>$</span>
                      <span>tdf-init --secure --accelerate</span>
                    </div>
                    <div className="text-gray-400">
                      [INFO] Initializing TDF TECH neural engine... <br />
                      [SUCCESS] TDF Assistant integration locked &amp; active. <br />
                      [SUCCESS] Red/Green doubled border telemetry online. <br />
                      [READY] Repository 'guru' synchronized with GitHub.
                    </div>
                    <div className="p-3 rounded bg-black/40 border border-green-500/20 text-gray-300 flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                        <span>System Status: Optimal</span>
                      </span>
                      <span className="text-green-400 font-bold">SECURE</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-red-500/20 border border-green-500 hover:border-red-500 text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 tdf-interactive-glow tdf-double-border"
                    >
                      <Sparkles className="w-4 h-4 text-green-400" />
                      <span>Consult TDF Assistant</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 border-t border-white/10 bg-[#0c0e15]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-mono text-green-400 uppercase tracking-widest">Our Capabilities</h2>
            <h3 className="text-4xl font-extrabold tracking-tight">
              PIONEERING SOLUTIONS FOR DIGITAL LEADERS
            </h3>
            <p className="text-gray-400">
              Every system built by <strong className="text-white">TDF TECH</strong> undergoes rigorous edge-coloring and dual-state telemetry validation to ensure flawless execution under extreme scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="tdf-interactive-glow tdf-double-border bg-[#121520] border border-white/10 rounded-2xl p-8 space-y-6 group hover:border-red-500 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold">Autonomous Security</h4>
              <p className="text-gray-400 leading-relaxed">
                Military-grade encryption and real-time behavioral intrusion detection systems safeguarding mission-critical cloud infrastructure.
              </p>
              <ul className="space-y-2 text-sm text-gray-300 font-mono">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Zero-trust architecture</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Automated threat mitigation</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="tdf-interactive-glow tdf-double-border bg-[#121520] border border-white/10 rounded-2xl p-8 space-y-6 group hover:border-green-500 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold">Grok Neural Pipelines</h4>
              <p className="text-gray-400 leading-relaxed">
                Deep integration with xAI Grok models for real-time automated reasoning, predictive coding, and hyper-personalized user agents.
              </p>
              <ul className="space-y-2 text-sm text-gray-300 font-mono">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Low-latency token streaming</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Custom fine-tuned workflows</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="tdf-interactive-glow tdf-double-border bg-[#121520] border border-white/10 rounded-2xl p-8 space-y-6 group hover:border-blue-500 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold">High-Speed Web Apps</h4>
              <p className="text-gray-400 leading-relaxed">
                Hyper-responsive React and tRPC web applications featuring asymmetric layouts, glowing edge borders, and butter-smooth transitions.
              </p>
              <ul className="space-y-2 text-sm text-gray-300 font-mono">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Sub-second load metrics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Red/green interactive feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-xs font-mono text-red-500 uppercase tracking-widest">About TDF TECH</h2>
              <h3 className="text-4xl font-extrabold tracking-tight">
                UNCOMPROMISING PRECISION IN EVERY LINE OF CODE
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Founded on principles of extreme engineering and uncompromising aesthetics, <strong className="text-white">TDF TECH</strong> bridges the gap between raw computing power and intuitive human design. Our systems are engineered to withstand the most demanding enterprise workloads while delivering breathtaking visual experiences.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="tdf-interactive-glow tdf-double-border p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-2xl font-black text-green-400">100+</div>
                  <div className="text-sm text-gray-400 mt-1">Enterprise Deployments</div>
                </div>
                <div className="tdf-interactive-glow tdf-double-border p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-2xl font-black text-red-400">24/7</div>
                  <div className="text-sm text-gray-400 mt-1">Autonomous Monitoring</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-red-600 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-[#121520] border-2 border-white/10 rounded-3xl p-8 space-y-6 tdf-interactive-glow tdf-double-border">
                <h4 className="text-xl font-bold flex items-center space-x-3">
                  <Terminal className="w-6 h-6 text-green-400" />
                  <span>The 'guru' Repository Architecture</span>
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Our flagship codebase is fully version-controlled under the GitHub repository <strong className="text-white">guru</strong>. Every update incorporates strict TypeScript validation, tRPC end-to-end type safety, and real-time AI capabilities via Grok.
                </p>
                <div className="p-4 rounded-xl bg-black/60 border border-green-500/30 font-mono text-xs text-green-400 space-y-2">
                  <div>&gt; git remote add origin https://github.com/guru/tdf-tech.git</div>
                  <div>&gt; git push origin main --force-secure</div>
                  <div className="text-gray-400">[OK] Repository successfully synchronized.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-24 border-t border-white/10 bg-[#0c0e15]">
        <div className="container mx-auto px-6 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs font-mono text-green-400 uppercase tracking-widest">Global Ecosystem</h2>
            <h3 className="text-4xl font-extrabold tracking-tight">POWERED BY ELITE INTEGRATIONS</h3>
            <p className="text-gray-400">Seamlessly connected with xAI Grok, GitHub version control, and high-availability cloud nodes.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="tdf-interactive-glow tdf-double-border p-6 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col items-center space-y-3">
              <Sparkles className="w-8 h-8 text-green-400" />
              <span className="font-bold text-lg">xAI Grok API</span>
              <span className="text-xs text-gray-400">Active neural model</span>
            </div>
            <div className="tdf-interactive-glow tdf-double-border p-6 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col items-center space-y-3">
              <Github className="w-8 h-8 text-white" />
              <span className="font-bold text-lg">GitHub 'guru'</span>
              <span className="text-xs text-gray-400">Repository sync</span>
            </div>
            <div className="tdf-interactive-glow tdf-double-border p-6 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col items-center space-y-3">
              <Layers className="w-8 h-8 text-red-500" />
              <span className="font-bold text-lg">React 19 &amp; tRPC</span>
              <span className="text-xs text-gray-400">End-to-end typed</span>
            </div>
            <div className="tdf-interactive-glow tdf-double-border p-6 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col items-center space-y-3">
              <Activity className="w-8 h-8 text-blue-400" />
              <span className="font-bold text-lg">Tailwind 4 Neon</span>
              <span className="text-xs text-gray-400">Interactive glow</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-xs font-mono text-green-400 uppercase tracking-widest">Initiate Contact</h2>
              <h3 className="text-4xl font-extrabold tracking-tight">CONNECT WITH TDF TECH</h3>
              <p className="text-gray-400 leading-relaxed">
                Ready to elevate your digital architecture? Reach out to our engineering directors or launch our Grok AI assistant for immediate technical consultation.
              </p>
              <div className="space-y-4 pt-4 font-mono text-sm">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 tdf-interactive-glow tdf-double-border">
                  <Mail className="w-5 h-5 text-green-400" />
                  <span>secure@tdftech.io</span>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 tdf-interactive-glow tdf-double-border">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>Silicon Valley &amp; Global Neural Nodes</span>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 tdf-interactive-glow tdf-double-border">
                  <Github className="w-5 h-5 text-white" />
                  <span>github.com/guru</span>
                </div>
              </div>
            </div>

            <div className="bg-[#121520] border border-white/10 rounded-3xl p-8 tdf-interactive-glow tdf-double-border space-y-6">
              <h4 className="text-2xl font-bold">Send Secure Transmission</h4>
              <form onSubmit={(e) => { e.preventDefault(); alert("Transmission received by TDF TECH communications relay."); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2">IDENTIFIER / NAME</label>
                  <input type="text" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors" placeholder="e.g. Commander Shepard" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2">SECURE EMAIL</label>
                  <input type="email" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors" placeholder="shepard@N7.org" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2">TRANSMISSION MESSAGE</label>
                  <textarea rows={4} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors" placeholder="Describe your architectural requirements..." />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-green-600 text-white font-bold tracking-wider hover:brightness-110 transition-all duration-300 tdf-interactive-glow tdf-double-border shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  Transmit Securely
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#08090e]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-red-500 to-green-500 p-[2px]">
              <div className="w-full h-full bg-[#0a0b10] rounded flex items-center justify-center">
                <Terminal className="w-4 h-4 text-green-400" />
              </div>
            </div>
            <span className="text-lg font-bold tracking-wider">TDF TECH</span>
          </div>
          <div className="text-xs text-gray-500 font-mono">
            © 2026 TDF TECH. All rights reserved. GitHub repository: <span className="text-green-400">guru</span>.
          </div>
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <a href="#services" className="hover:text-green-400 transition-colors">Services</a>
            <a href="#about" className="hover:text-green-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-green-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-red-600 to-green-600 text-white shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-110 transition-all duration-300 tdf-interactive-glow tdf-double-border flex items-center justify-center"
          title="Toggle TDF Assistant"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-red-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300 animate-spin-slow"></div>
          <Sparkles className="relative w-6 h-6 text-white" />
        </button>
      </div>

      {/* Grok AI Chat Modal / Panel */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full sm:w-[420px] bg-[#11131c] border-2 border-green-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] tdf-interactive-glow tdf-double-border animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-[#181b28] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <div>
                <h3 className="font-bold text-sm tracking-wide text-white">TDF Assistant</h3>
                <p className="text-[10px] text-gray-400 font-mono">Powered by xAI Grok API</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-black font-medium rounded-br-none"
                      : "bg-[#181b28] border border-white/10 text-gray-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-[#181b28] border border-white/10 p-3.5 rounded-2xl text-gray-400 text-xs font-mono animate-pulse">
                  TDF Assistant is computing neural response...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#181b28] border-t border-white/10 flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask TDF Assistant..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-green-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isSending || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-green-600 text-white disabled:opacity-50 hover:brightness-110 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
