import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Building2,
  Bot,
  User,
  Sparkles,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  Code2,
  MessageSquare,
  Copy,
  Check,
  FileCode,
  KeyRound,
  ShieldAlert,
  Briefcase,
  Stethoscope,
  Wrench,
  Compass,
  Mail,
  Zap,
  ChevronRight,
  ExternalLink,
  Users,
  Settings2,
  Layers,
  ArrowRight,
  Database,
  Terminal,
  SendHorizontal,
  Play,
  Video,
  Flame,
  Calculator,
  FileSignature
} from "lucide-react";
import ViralReelsStudio from "./components/ViralReelsStudio";
import FinancialCalculator from "./components/FinancialCalculator";
import LeaseGeneratorAndSeller from "./components/LeaseGeneratorAndSeller";
import { pageCode } from "./data/pageCode";
import {
  SUPPORTED_INDUSTRIES,
  AUTOMATION_BLUEPRINT,
  IndustryConfig
} from "./data/industryConfig";
import { EMBED_SNIPPET } from "./data/embedSnippet";
import {
  VERIFIED_SEED_PROSPECTS,
  GOOGLE_APPS_SCRIPT_AUTOMATOR,
  AutomatedLeadProspect
} from "./data/automatedProspects";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<
    | "lease_generator"
    | "financial_calculator"
    | "viral_studio"
    | "lead_database"
    | "email_automator"
    | "pitch_scripts"
    | "embed_widget"
    | "chat"
    | "client_finder"
    | "route_code"
    | "env_guide"
  >("lease_generator");

  const [selectedIndustryId, setSelectedIndustryId] = useState<string>("property_leasing");
  const [customBusinessName, setCustomBusinessName] = useState<string>("");
  const [customBotName, setCustomBotName] = useState<string>("");

  // Lead Database State
  const [prospects, setProspects] = useState<AutomatedLeadProspect[]>(VERIFIED_SEED_PROSPECTS);
  const [selectedProspect, setSelectedProspect] = useState<AutomatedLeadProspect | null>(
    VERIFIED_SEED_PROSPECTS[0]
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // New Lead Form State
  const [newBizName, setNewBizName] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCategory, setNewCategory] = useState<AutomatedLeadProspect["category"]>("Property Management");
  const [newCity, setNewCity] = useState("");
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  const currentIndustry: IndustryConfig =
    SUPPORTED_INDUSTRIES.find((ind) => ind.id === selectedIndustryId) ||
    SUPPORTED_INDUSTRIES[0];

  const activeBusinessName = customBusinessName.trim() || currentIndustry.sampleBusinessName;
  const activeBotName = customBotName.trim() || currentIndustry.assistantName;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: currentIndustry.welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Client finder inputs for outreach generator
  const [targetLeadName, setTargetLeadName] = useState("Marcus Vance");
  const [targetCompanyName, setTargetCompanyName] = useState("Skyline Living Rentals");
  const [targetCompanyUrl, setTargetCompanyUrl] = useState("https://skylinelivingdallas.com");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === "chat") {
      scrollToBottom();
    }
  }, [messages, isLoading, activeTab]);

  const handleSelectIndustry = (indId: string) => {
    setSelectedIndustryId(indId);
    const ind = SUPPORTED_INDUSTRIES.find((i) => i.id === indId) || SUPPORTED_INDUSTRIES[0];
    setCustomBusinessName("");
    setCustomBotName("");
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: ind.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      }
    ]);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    setErrorMessage(null);
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/qualify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageContent,
          messages: updatedMessages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content
          })),
          businessType: currentIndustry.id,
          businessName: activeBusinessName,
          qualificationFields: currentIndustry.qualificationCriteria
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      const botReply: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: currentIndustry.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      }
    ]);
    setErrorMessage(null);
    setInput("");
  };

  const handleAddProspect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName || !newEmail) return;

    const newEntry: AutomatedLeadProspect = {
      id: `lead-${Date.now()}`,
      businessName: newBizName,
      contactName: newContactName || "Business Owner",
      email: newEmail,
      category: newCategory,
      city: newCity || "Metro Area",
      website: `https://${newBizName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      role: "Owner / Operations Head",
      source: "Manual Free Finder",
      status: "new",
      customHook: "Captured via free automation lead list."
    };

    setProspects([newEntry, ...prospects]);
    setNewBizName("");
    setNewContactName("");
    setNewEmail("");
    setNewCity("");
    setShowAddLeadModal(false);
  };

  const handleUpdateStatus = (id: string, status: AutomatedLeadProspect["status"]) => {
    setProspects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const renderIndustryIcon = (iconName: string, className: string = "w-4 h-4") => {
    switch (iconName) {
      case "Building2":
        return <Building2 className={className} />;
      case "Stethoscope":
        return <Stethoscope className={className} />;
      case "Wrench":
        return <Wrench className={className} />;
      case "Briefcase":
        return <Briefcase className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  const currentEmbedCode = EMBED_SNIPPET(
    activeBusinessName,
    activeBotName,
    selectedIndustryId === "dental_medical"
      ? "#0284c7"
      : selectedIndustryId === "roofing_hvac"
      ? "#ea580c"
      : selectedIndustryId === "web_agency"
      ? "#8b5cf6"
      : "#10b981"
  );

  const personalizedPitch = currentIndustry.clientOutreachPitch.coldEmailBody
    .replace(/{{Name}}/g, targetLeadName)
    .replace(/{{Company}}/g, targetCompanyName)
    .replace(/{{DemoLink}}/g, "https://rental-lead-ai.vercel.app");

  const personalizedLinkedIn = currentIndustry.clientOutreachPitch.linkedInDm
    .replace(/{{Name}}/g, targetLeadName)
    .replace(/{{Company}}/g, targetCompanyName)
    .replace(/{{DemoLink}}/g, "https://rental-lead-ai.vercel.app");

  const personalizedFollowUp = currentIndustry.clientOutreachPitch.followUp3Days
    .replace(/{{Name}}/g, targetLeadName)
    .replace(/{{Company}}/g, targetCompanyName)
    .replace(/{{DemoLink}}/g, "https://rental-lead-ai.vercel.app");

  const filteredProspects =
    filterCategory === "all"
      ? prospects
      : prospects.filter((p) => p.category === filterCategory);

  return (
    <div id="rental-app" className="flex h-screen bg-slate-900 text-slate-100 antialiased overflow-hidden font-sans">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 border-r border-slate-800 bg-slate-950/90 p-5 justify-between shrink-0">
        <div className="space-y-4 overflow-y-auto pr-1">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
                Client Automation Hub
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  PRO
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                100% Free Automated Client Pipeline
              </p>
            </div>
          </div>

          {/* Quick Stats / Revenue Target */}
          <div className="p-3 bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-xl space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Verified Prospects Ready</span>
              <span className="text-emerald-400 font-semibold">{prospects.length} Businesses</span>
            </div>
            <div className="text-[11px] text-slate-300">
              Target Value: <strong className="text-white">$300 - $750/client</strong> setup + retainers
            </div>
          </div>

          {/* Viral Traffic & Content Engine */}
          <div className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 px-1 mb-1.5 flex items-center justify-between">
              <span>Turnkey Tools & Sales</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                $79 - $299
              </span>
            </div>
            <button
              id="tab-lease-generator"
              onClick={() => setActiveTab("lease_generator")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "lease_generator"
                  ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileSignature className="w-4 h-4 text-blue-400" />
                <span>AI Lease Gen & Code Seller</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-200">
                Turnkey
              </span>
            </button>
            <button
              id="tab-financial-calc"
              onClick={() => setActiveTab("financial_calculator")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "financial_calculator"
                  ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>US Mortgage & ROI Calc</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-900/60 text-emerald-200">
                High RPM
              </span>
            </button>
            <button
              id="tab-viral-studio"
              onClick={() => setActiveTab("viral_studio")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "viral_studio"
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-purple-400" />
                <span>Viral Reels Studio (US/UK)</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-200">
                30 Days
              </span>
            </button>
          </div>

          {/* Automation Navigation */}
          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1 mb-1.5">
              Client Acquisition Tools
            </div>
            <button
              id="tab-lead-db"
              onClick={() => setActiveTab("lead_database")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "lead_database"
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Verified Leads CRM</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {prospects.length}
              </span>
            </button>
            <button
              id="tab-email-auto"
              onClick={() => setActiveTab("email_automator")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "email_automator"
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>Google Sheets Auto-Sender</span>
            </button>
            <button
              id="tab-pitch"
              onClick={() => setActiveTab("pitch_scripts")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "pitch_scripts"
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>1-Click Email & DM Generator</span>
            </button>
            <button
              id="tab-embed"
              onClick={() => setActiveTab("embed_widget")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "embed_widget"
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Client Embed Widget Code</span>
            </button>
            <button
              id="tab-chat"
              onClick={() => setActiveTab("chat")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "chat"
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Live Bot Qualification Demo</span>
            </button>
            <button
              id="tab-client-finder"
              onClick={() => setActiveTab("client_finder")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "client_finder"
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Free Scraping Strategy Guide</span>
            </button>
          </div>

          {/* Industry Preset Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1">
              Select Client Niche
            </h2>
            <div className="space-y-1.5">
              {SUPPORTED_INDUSTRIES.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => handleSelectIndustry(ind.id)}
                  className={`w-full text-left p-2 rounded-lg border text-xs transition-all flex items-start gap-2 ${
                    selectedIndustryId === ind.id
                      ? "bg-slate-800 border-emerald-500/50 text-white shadow-sm"
                      : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-md mt-0.5 shrink-0 ${
                      selectedIndustryId === ind.id
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {renderIndustryIcon(ind.iconName, "w-3.5 h-3.5")}
                  </div>
                  <div>
                    <div className="font-medium text-[11px]">{ind.name}</div>
                    <div className="text-[10px] text-slate-500">
                      Charge: {ind.pricingSuggestion.setupFee}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Developer Code Export */}
          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1 mb-1">
              Developer Code Export
            </div>
            <button
              onClick={() => setActiveTab("route_code")}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "route_code"
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>app/api/qualify/route.ts</span>
            </button>
            <button
              onClick={() => setActiveTab("env_guide")}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "env_guide"
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>.env.local Setup</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800/80">
          <button
            id="reset-chat-btn"
            onClick={handleResetChat}
            className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white py-2 px-3 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Bot Conversation
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-hidden">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              id="top-nav-lease-gen"
              onClick={() => setActiveTab("lease_generator")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "lease_generator"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-blue-300 hover:text-white hover:bg-blue-950/60 border border-blue-500/30"
              }`}
            >
              <FileSignature className="w-3.5 h-3.5 text-blue-300" />
              AI Lease Agreement Generator ($79)
            </button>
            <button
              id="top-nav-financial-calc"
              onClick={() => setActiveTab("financial_calculator")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "financial_calculator"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-emerald-300 hover:text-white hover:bg-emerald-950/60 border border-emerald-500/30"
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-300" />
              US Mortgage & ROI Calculator
            </button>
            <button
              id="top-nav-viral-studio"
              onClick={() => setActiveTab("viral_studio")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "viral_studio"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-purple-300 hover:text-white hover:bg-purple-950/60 border border-purple-500/30"
              }`}
            >
              <Video className="w-3.5 h-3.5 text-purple-300" />
              Viral Reels Studio (30 Days)
            </button>
            <button
              onClick={() => setActiveTab("lead_database")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "lead_database"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Verified Leads CRM ({prospects.length})
            </button>
            <button
              onClick={() => setActiveTab("email_automator")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "email_automator"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Google Sheets Auto-Sender
            </button>
            <button
              onClick={() => setActiveTab("pitch_scripts")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "pitch_scripts"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Outreach Pitches
            </button>
            <button
              onClick={() => setActiveTab("embed_widget")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "embed_widget"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Embed Widget Snippet
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "chat"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Live Demo ({activeBotName})
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              100% Free Automation
            </span>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* TAB: AI LEASE GENERATOR & TURNKEY CODE SELLER HUB                         */}
        {/* ========================================================================= */}
        {activeTab === "lease_generator" && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-6xl">
            <LeaseGeneratorAndSeller />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: FINANCIAL CALCULATOR (US Mortgage & Rental ROI with AdSense Preview) */}
        {/* ========================================================================= */}
        {activeTab === "financial_calculator" && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-6xl">
            <FinancialCalculator />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: VIRAL REELS STUDIO (30-Day Content Calendar & AI Script Engine)      */}
        {/* ========================================================================= */}
        {activeTab === "viral_studio" && <ViralReelsStudio />}

        {/* ========================================================================= */}
        {/* TAB: VERIFIED LEADS CRM (The actual businesses you can pitch immediately) */}
        {/* ========================================================================= */}
        {activeTab === "lead_database" && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-6xl">
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  Pre-Verified Business Prospects Ready for Outreach
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  These verified decision-makers have high-intent websites without 24/7 lead bots. Click any prospect to populate instant pitches or launch an email.
                </p>
              </div>
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                + Add Custom Prospect
              </button>
            </div>

            {/* Filter Pill Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {["all", "Property Management", "Dental Clinic", "Roofing & HVAC", "Web Agency"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filterCategory === cat
                      ? "bg-slate-800 text-emerald-400 border border-emerald-500/40"
                      : "text-slate-400 hover:text-white bg-slate-950/60 border border-slate-800"
                  }`}
                >
                  {cat === "all" ? "All Niches" : cat}
                </button>
              ))}
            </div>

            {/* Prospects Table / Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProspects.map((prospect) => (
                <div
                  key={prospect.id}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedProspect?.id === prospect.id
                      ? "bg-slate-800/90 border-emerald-500/60 shadow-lg"
                      : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                  }`}
                  onClick={() => {
                    setSelectedProspect(prospect);
                    setTargetLeadName(prospect.contactName);
                    setTargetCompanyName(prospect.businessName);
                    setTargetCompanyUrl(prospect.website);
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {prospect.category}
                      </span>
                      <select
                        value={prospect.status}
                        onChange={(e) =>
                          handleUpdateStatus(
                            prospect.id,
                            e.target.value as AutomatedLeadProspect["status"]
                          )
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 rounded px-1.5 py-0.5 outline-none"
                      >
                        <option value="new">New</option>
                        <option value="emailed">Emailed</option>
                        <option value="replied">Replied</option>
                        <option value="meeting_booked">Demo Booked</option>
                      </select>
                    </div>

                    <h3 className="font-semibold text-sm text-white mt-2">
                      {prospect.businessName}
                    </h3>
                    <div className="text-xs text-slate-400">{prospect.city}</div>

                    <div className="mt-3 p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-1 text-xs">
                      <div className="text-slate-200 font-medium flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {prospect.contactName} ({prospect.role})
                      </div>
                      <div className="text-emerald-400 font-mono text-[11px] flex items-center gap-1.5 truncate">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        {prospect.email}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      💡 <strong>Opportunity:</strong> {prospect.customHook}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTargetLeadName(prospect.contactName);
                        setTargetCompanyName(prospect.businessName);
                        setTargetCompanyUrl(prospect.website);
                        setActiveTab("pitch_scripts");
                      }}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                    >
                      Generate Pitch <ArrowRight className="w-3 h-3" />
                    </button>
                    <a
                      href={`mailto:${prospect.email}?subject=Quick question regarding ${encodeURIComponent(
                        prospect.businessName
                      )} weekend client inquiries`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded text-[11px] font-medium flex items-center gap-1"
                    >
                      <SendHorizontal className="w-3 h-3" /> Open Gmail
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for adding custom lead */}
            {showAddLeadModal && (
              <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
                  <h3 className="text-base font-semibold text-white">Add New Business Prospect</h3>
                  <form onSubmit={handleAddProspect} className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Business Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Property Rentals"
                        value={newBizName}
                        onChange={(e) => setNewBizName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Decision Maker Name</label>
                      <input
                        type="text"
                        placeholder="e.g. John Henderson"
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Verified Email</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. jhenderson@apexrentals.com"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-slate-400 block mb-1">Niche Category</label>
                        <select
                          value={newCategory}
                          onChange={(e) =>
                            setNewCategory(e.target.value as AutomatedLeadProspect["category"])
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white outline-none"
                        >
                          <option value="Property Management">Property Management</option>
                          <option value="Dental Clinic">Dental Clinic</option>
                          <option value="Roofing & HVAC">Roofing & HVAC</option>
                          <option value="Web Agency">Web Agency</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">City / State</label>
                        <input
                          type="text"
                          placeholder="e.g. Austin, TX"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddLeadModal(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg"
                      >
                        Save Prospect
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: GOOGLE SHEETS / GMAIL AUTO-SENDER (100% Free Automated Outreach)     */}
        {/* ========================================================================= */}
        {activeTab === "email_automator" && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-5xl">
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-purple-400" />
                    Automated Outreach via Free Google Apps Script
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    This free script turns your Google Sheet into an automated outreach bot. It sends personalized emails directly from your Gmail account without paying a penny for email blast tools.
                  </p>
                </div>
                <div className="px-3 py-1 bg-purple-500/20 text-purple-300 font-semibold rounded-lg text-xs border border-purple-500/30">
                  Zero Paid Software Needed
                </div>
              </div>
            </div>

            {/* How to setup in 2 minutes */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" />
                How to Run It in 2 Minutes:
              </h3>
              <ol className="list-decimal list-inside text-xs text-slate-300 space-y-2 leading-relaxed">
                <li>
                  Open a new free Google Sheet at <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-mono">sheets.new</a>.
                </li>
                <li>
                  Put these 6 column titles in Row 1: <code className="bg-slate-900 px-1 py-0.5 text-emerald-300 font-mono">Business Name | Contact Name | Email | Website | Status | Date Sent</code>.
                </li>
                <li>
                  Copy the prospects from the <strong>Verified Leads CRM</strong> tab into your sheet.
                </li>
                <li>
                  Click <strong>Extensions &gt; Apps Script</strong> at the top of your Google Sheet.
                </li>
                <li>
                  Delete the existing code, paste the script below, and click <strong>Save</strong> then <strong>Run</strong>!
                </li>
              </ol>
            </div>

            {/* Script Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  GoogleAppsScript_Outreach_Automator.gs
                </span>
                <button
                  onClick={() => handleCopy(GOOGLE_APPS_SCRIPT_AUTOMATOR, "gas_script")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  {copiedSection === "gas_script" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied Script!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Automated Script
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-purple-300 font-mono overflow-x-auto leading-relaxed max-h-[380px]">
                <code>{GOOGLE_APPS_SCRIPT_AUTOMATOR}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab: Copy-Paste Outreach Pitches */}
        {activeTab === "pitch_scripts" && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-5xl">
            {/* Customizer */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-400" />
                Personalized Pitch Generator ({currentIndustry.name})
              </h2>
              <p className="text-xs text-slate-300">
                Loaded prospect details. Copy or open directly in your email client:
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Prospect Name</label>
                  <input
                    type="text"
                    value={targetLeadName}
                    onChange={(e) => setTargetLeadName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    value={targetCompanyName}
                    onChange={(e) => setTargetCompanyName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Their Website URL</label>
                  <input
                    type="text"
                    value={targetCompanyUrl}
                    onChange={(e) => setTargetCompanyUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Pitch 1: Cold Email */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-400">Step 1: First Cold Email</span>
                  <span className="text-xs text-slate-400 ml-2">
                    Subject: {currentIndustry.clientOutreachPitch.emailSubject.replace(/{{Company}}/g, targetCompanyName)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(personalizedPitch, "email")}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                  >
                    {copiedSection === "email" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Email
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      currentIndustry.clientOutreachPitch.emailSubject.replace(/{{Company}}/g, targetCompanyName)
                    )}&body=${encodeURIComponent(personalizedPitch)}`}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <SendHorizontal className="w-3.5 h-3.5" /> Send in Email App
                  </a>
                </div>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                <code>{personalizedPitch}</code>
              </pre>
            </div>

            {/* Pitch 2: LinkedIn Message */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">Step 2: LinkedIn Direct Message (or Connection Note)</span>
                <button
                  onClick={() => handleCopy(personalizedLinkedIn, "linkedin")}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                >
                  {copiedSection === "linkedin" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy LinkedIn Note
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                <code>{personalizedLinkedIn}</code>
              </pre>
            </div>

            {/* Pitch 3: Automated 3-Day Follow-Up */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">Step 3: 3-Day Follow-Up (Sent if no reply to first email)</span>
                <button
                  onClick={() => handleCopy(personalizedFollowUp, "followup")}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                >
                  {copiedSection === "followup" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Follow-Up
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                <code>{personalizedFollowUp}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab: Client Embed Widget Snippet */}
        {activeTab === "embed_widget" && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-5xl">
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-400" />
                    1-Click Embed Snippet (Sell to Any Client)
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Copy and paste this single HTML block before the closing <code className="text-emerald-400 font-mono">&lt;/body&gt;</code> tag of your client's website (WordPress, Webflow, Shopify, Squarespace, or custom HTML).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Target Value:</span>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-semibold rounded text-xs">
                    {currentIndustry.pricingSuggestion.setupFee} setup + {currentIndustry.pricingSuggestion.monthlyRetainer}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Embed Code for: {activeBusinessName} ({activeBotName})
                </span>
                <button
                  onClick={() => handleCopy(currentEmbedCode, "embed")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  {copiedSection === "embed" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied Snippet!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Embed Snippet
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed max-h-[420px]">
                <code>{currentEmbedCode}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab: Live Interactive Chat Demo */}
        {activeTab === "chat" && (
          <main className="flex-1 flex flex-col h-[calc(100vh-53px)] overflow-hidden">
            <div className="bg-slate-950/70 border-b border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Client Brand:</span>
                <input
                  type="text"
                  placeholder={currentIndustry.sampleBusinessName}
                  value={customBusinessName}
                  onChange={(e) => setCustomBusinessName(e.target.value)}
                  className="bg-slate-900 border border-slate-700/80 rounded-md px-2.5 py-1 text-white text-xs w-48 focus:border-emerald-500 focus:outline-none"
                />
                <span className="text-slate-400 font-medium ml-2">Bot Name:</span>
                <input
                  type="text"
                  placeholder={currentIndustry.assistantName}
                  value={customBotName}
                  onChange={(e) => setCustomBotName(e.target.value)}
                  className="bg-slate-900 border border-slate-700/80 rounded-md px-2.5 py-1 text-white text-xs w-28 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div className="text-[11px] text-slate-400">
                Qualifies leads 24/7 & collects contact details for your client.
              </div>
            </div>

            {errorMessage && (
              <div className="bg-rose-950/90 border-b border-rose-800/80 px-4 py-3 text-rose-200 text-xs flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  className="px-2.5 py-1 bg-rose-800/80 hover:bg-rose-700 text-white rounded font-medium text-xs transition-colors shrink-0"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-5">
              {messages.map((msg) => {
                const isBot = msg.role === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-3xl ${
                      isBot ? "mr-auto" : "ml-auto flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isBot
                          ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className={`space-y-1 ${isBot ? "text-left" : "text-right"}`}>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 px-1">
                        <span className="font-medium text-slate-400">
                          {isBot ? `${activeBotName} (${activeBusinessName})` : "Website Lead"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 inline" />
                          {msg.timestamp}
                        </span>
                      </div>

                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                          isBot
                            ? "bg-slate-800/90 border border-slate-700/60 text-slate-100 shadow-sm"
                            : "bg-emerald-600 text-white rounded-br-xs"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-3 max-w-3xl mr-auto items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-800/90 border border-slate-700/60 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 md:px-8 py-2 bg-slate-950/50 border-t border-slate-800/60 shrink-0">
              <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2 font-medium">
                Simulate Customer Inquiries for {currentIndustry.name}:
              </p>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {currentIndustry.quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 transition-colors disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 md:p-6 bg-slate-950/90 border-t border-slate-800 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 max-w-4xl mx-auto"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask a question or test qualification for ${activeBusinessName}...`}
                  disabled={isLoading}
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </main>
        )}

        {/* Tab: Free Scraping Strategy Guide */}
        {activeTab === "client_finder" && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-5xl">
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                Zero-Cost Client Acquisition Strategy
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Step-by-step instructions to pull 20 new high-value business leads every single week without paying for database subscriptions:
              </p>
            </div>

            <div className="space-y-4">
              {AUTOMATION_BLUEPRINT.freeScrapingStack.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 relative overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                      {step.step}
                    </span>
                    <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300 ml-10 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="ml-10 p-3 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-emerald-400 font-medium">
                    👉 Action: {step.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Next.js API Route Code */}
        {activeTab === "route_code" && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl">
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" />
                Backend Endpoint: app/api/qualify/route.ts
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Production-ready Next.js 15 App Router POST handler using <code className="text-emerald-400 font-mono">@google/genai</code> and <code className="text-emerald-400 font-mono">gemini-2.5-flash</code>.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">app/api/qualify/route.ts</span>
                <button
                  onClick={() => handleCopy(routeCode, "route")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  {copiedSection === "route" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Route Code
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed max-h-[500px]">
                <code>{routeCode}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab: .env.local Setup */}
        {activeTab === "env_guide" && (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl">
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-400" />
                Formatting .env.local for GEMINI_API_KEY
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Configure your key in <code className="text-emerald-300 font-mono">.env.local</code>. Never add <code className="text-rose-400 font-mono">NEXT_PUBLIC_</code> to keep your key secure.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">.env.local</span>
                <button
                  onClick={() => handleCopy(envCode, "env")}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                >
                  {copiedSection === "env" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Format
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">
                <code>{envCode}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const envCode = `# .env.local
# Place this file in the root of your Next.js 15 project (rental-lead-ai)
GEMINI_API_KEY=AIzaSyYourActualKeyHere123456789
`;

const routeCode = `import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set." },
        { status: 500 }
      );
    }

    const { message, messages, businessType, businessName, qualificationFields } = await req.json();

    const activeBusiness = businessName || "Oakwood Premier Apartments";
    const activeType = businessType || "property_leasing";

    let dynamicInstruction = \`You are a high-converting, friendly 24/7 AI Lead Assistant for "\${activeBusiness}" (\${activeType.replace(/_/g, " ")}).
YOUR OBJECTIVE:
Greet potential clients warmly, answer questions accurately, and collect key qualification details:
\${qualificationFields ? qualificationFields.join("\\n") : "- Contact name, phone, email\\n- Project scope\\n- Ideal timeline"}

RULES:
- Keep answers concise (1-2 short friendly paragraphs).
- Ask 1 follow-up at a time to maximize lead conversion.
- Proactively invite them to schedule a free appointment or tour.\`;

    const ai = new GoogleGenAI({ apiKey });

    const contents: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];
    if (messages && Array.isArray(messages)) {
      for (const msg of messages) {
        if (!msg.content) continue;
        const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
        contents.push({ role, parts: [{ text: msg.content }] });
      }
    }

    if (message && typeof message === "string") {
      const last = contents[contents.length - 1];
      if (!last || last.role !== "user" || last.parts[0].text !== message) {
        contents.push({ role: "user", parts: [{ text: message }] });
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: dynamicInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      reply: response.text || "Thank you! How can we assist you today?",
      status: "success",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
`;
