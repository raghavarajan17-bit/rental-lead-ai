import React, { useState } from "react";
import {
  Video,
  Sparkles,
  Flame,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Clock,
  PlayCircle,
  HelpCircle,
  Calendar,
  Layers,
  Share2,
  CheckSquare,
  Square,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Compass
} from "lucide-react";
import {
  VIRAL_REEL_SCRIPTS,
  ZERO_EDITING_WORKFLOW,
  REVENUE_MILESTONES,
  ReelScriptItem
} from "../data/viralReelsData";

export default function ViralReelsStudio() {
  const [subTab, setSubTab] = useState<"calendar" | "generator" | "guide" | "timeline">("calendar");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([1]);
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // AI Generator state
  const [customTopic, setCustomTopic] = useState("");
  const [customNiche, setCustomNiche] = useState<"ai_money_hacks" | "stoic_motivation" | "tech_life_hacks" | "wealth_facts">("ai_money_hacks");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReel, setGeneratedReel] = useState<ReelScriptItem | null>(null);
  const [genError, setGenError] = useState<string | null>(null);

  const activeReel: ReelScriptItem =
    VIRAL_REEL_SCRIPTS.find((r) => r.day === selectedDay) || VIRAL_REEL_SCRIPTS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleDayStatus = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const filteredReels =
    nicheFilter === "all"
      ? VIRAL_REEL_SCRIPTS
      : VIRAL_REEL_SCRIPTS.filter((r) => r.niche === nicheFilter);

  const handleGenerateCustomReel = async (topicToUse?: string) => {
    const finalTopic = topicToUse || customTopic;
    if (!finalTopic.trim()) return;
    setIsGenerating(true);
    setGenError(null);

    try {
      const response = await fetch("/api/generate-reel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: finalTopic.trim(),
          niche: customNiche,
        }),
      });

      const data = await response.json();
      if (data.success && data.reel) {
        setGeneratedReel({
          id: `custom-${Date.now()}`,
          day: 0,
          niche: customNiche,
          nicheLabel: customNiche.replace(/_/g, " ").toUpperCase(),
          targetAudience: "US & UK High-Intent Audience",
          ...data.reel,
        });
      } else {
        setGenError(data.error || "Failed to generate viral script. Please try again.");
      }
    } catch (err: unknown) {
      setGenError(err instanceof Error ? err.message : "Error connecting to AI generator");
    } finally {
      setIsGenerating(false);
    }
  };

  const QUICK_TOPIC_IDEAS = [
    { title: "Websites That Feel Illegal", niche: "ai_money_hacks" as const },
    { title: "How to Save $300 a Month", niche: "wealth_facts" as const },
    { title: "The 5-Second Stoic Morning Rule", niche: "stoic_motivation" as const },
    { title: "Secret iPhone & Android Battery Hack", niche: "tech_life_hacks" as const },
    { title: "How to Make $50/Day with Free AI", niche: "ai_money_hacks" as const },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 p-6 rounded-2xl border border-purple-500/30 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-semibold uppercase tracking-wider border border-purple-500/30 flex items-center gap-1">
              <Flame className="w-3 h-3 text-purple-400" />
              US & UK Audience Traffic Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
              100% Free Production ($0 Cost)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
            <Video className="w-6 h-6 text-purple-400" />
            Viral Faceless Reels & Shorts Studio
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Publish 1 high-converting faceless reel every day in under 5 minutes with <strong>zero video editing skills</strong>. Reach high-paying US & UK viewers to earn from Facebook creator bonuses and affiliate commissions without showing your face.
          </p>
        </div>

        {/* Quick Progress Card */}
        <div className="bg-slate-900/90 border border-purple-500/20 rounded-xl p-3.5 flex items-center gap-4 text-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">30-Day Challenge</div>
            <div className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
              <span>{completedDays.length}</span>
              <span className="text-slate-500 text-sm font-normal">/ 30 Days Posted</span>
            </div>
            <div className="w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (completedDays.length / 30) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab("calendar")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
            subTab === "calendar"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          30-Day Ready-to-Post Calendar
        </button>

        <button
          onClick={() => setSubTab("generator")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
            subTab === "generator"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          AI Script & Hook Generator
        </button>

        <button
          onClick={() => setSubTab("guide")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
            subTab === "guide"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
          Zero-Editing Video Guide (Step-by-Step)
        </button>

        <button
          onClick={() => setSubTab("timeline")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
            subTab === "timeline"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          When Will I Get Revenue? (Timeline)
        </button>
      </div>

      {/* ===================================================================== */}
      {/* SUB-TAB 1: 30-DAY CONTENT CALENDAR */}
      {/* ===================================================================== */}
      {subTab === "calendar" && (
        <div className="space-y-6">
          {/* Niche Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: "all", label: "All 30 Days" },
                { id: "ai_money_hacks", label: "🤖 AI & Money Websites" },
                { id: "stoic_motivation", label: "🏛️ Stoic Mindset & Discipline" },
                { id: "tech_life_hacks", label: "⚡ Everyday Tech Hacks" },
                { id: "wealth_facts", label: "💰 Real Estate & Wealth" },
              ].map((n) => (
                <button
                  key={n.id}
                  onClick={() => setNicheFilter(n.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    nicheFilter === n.id
                      ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-slate-400">
              Showing <span className="text-white font-semibold">{filteredReels.length}</span> scripts
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Day List Selector */}
            <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2 max-h-[750px] overflow-y-auto">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                Select Day to View Script
              </div>
              <div className="space-y-1.5">
                {filteredReels.map((r) => {
                  const isSelected = selectedDay === r.day;
                  const isDone = completedDays.includes(r.day);
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedDay(r.day)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? "bg-purple-950/40 border-purple-500/60 text-white shadow-sm"
                          : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="pt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[9px] text-slate-400">
                            {r.day}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-semibold text-white truncate">
                            Day {r.day}: {r.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-purple-300">
                            {r.nicheLabel}
                          </span>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">{r.estimatedRpm}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Day Script & Video Blueprint */}
            <div className="lg:col-span-8 space-y-5">
              {/* Day Header */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold">
                        DAY {activeReel.day} OF 30
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {activeReel.nicheLabel}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1.5">{activeReel.title}</h2>
                  </div>

                  <button
                    onClick={() => toggleDayStatus(activeReel.day)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                      completedDays.includes(activeReel.day)
                        ? "bg-emerald-600/20 border-emerald-500/40 text-emerald-300"
                        : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
                    }`}
                  >
                    {completedDays.includes(activeReel.day) ? (
                      <>
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                        Marked as Posted
                      </>
                    ) : (
                      <>
                        <Square className="w-3.5 h-3.5" />
                        Mark as Posted
                      </>
                    )}
                  </button>
                </div>

                {/* 1. The 3-Second Visual Hook */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      1. The 3-Second Visual Hook (Put in Bold Yellow Text on Top of Video)
                    </span>
                    <button
                      onClick={() => handleCopy(activeReel.visualHook, "hook")}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-800"
                    >
                      {copiedKey === "hook" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied Hook
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Hook
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-sm tracking-wide">
                    {activeReel.visualHook}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    💡 This text stays at the top of the video for the entire 30 seconds so scrolling US viewers stop instantly.
                  </p>
                </div>

                {/* 2. Spoken Voiceover Script */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-purple-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-400" />
                      2. Spoken Voiceover Script (Takes 25–30 Seconds to Read)
                    </span>
                    <button
                      onClick={() => handleCopy(activeReel.voiceoverScript, "voiceover")}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
                    >
                      {copiedKey === "voiceover" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied Voiceover
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Voiceover Script
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs md:text-sm leading-relaxed font-sans select-all">
                    "{activeReel.voiceoverScript}"
                  </div>
                  <p className="text-[11px] text-slate-400">
                    💡 You don't need a microphone: Paste this directly into CapCut’s free <strong>"Text to Speech"</strong> and choose the <strong>"Adam"</strong> voice.
                  </p>
                </div>

                {/* 3. Free 4K B-Roll Video Asset */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <PlayCircle className="w-4 h-4 text-sky-400" />
                      3. Free 4K Vertical B-Roll Video
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Recommended search: <span className="text-sky-300 font-mono">"{activeReel.brollKeyword}"</span>
                    </div>
                  </div>

                  <a
                    href={activeReel.brollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    Open Free Videos on Pexels
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 4. Caption & Viral US/UK Hashtags */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-emerald-400" />
                      4. Caption & Viral Hashtags (Ready to Paste)
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          `${activeReel.caption}\n\n${activeReel.hashtags.join(" ")}`,
                          "caption"
                        )
                      }
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
                    >
                      {copiedKey === "caption" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied Caption
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Caption & Tags
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                    <p>{activeReel.caption}</p>
                    <p className="text-purple-400 font-mono text-[11px]">
                      {activeReel.hashtags.join(" ")}
                    </p>
                  </div>
                </div>

                {/* 5. How to Monetize This Reel (The Income Blueprint) */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    How to Earn Money From This Reel
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeReel.affiliateTip}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                    <span>
                      Target Audience: <strong className="text-white">{activeReel.targetAudience}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Estimated US/UK Ad RPM: <strong className="text-emerald-400">{activeReel.estimatedRpm}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUB-TAB 2: AI SCRIPT & HOOK GENERATOR */}
      {/* ===================================================================== */}
      {subTab === "generator" && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                AI Viral Reel Script & Hook Generator (Gemini 2.5 Flash)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Type any topic or question, and the AI will craft a high-retention 3-second hook, word-for-word voiceover script, free b-roll keyword, and monetization strategy tailored for US/UK viewers.
              </p>
            </div>

            {/* Quick Ideas */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">
                Quick 1-Click Ideas:
              </span>
              <div className="flex flex-wrap gap-2">
                {QUICK_TOPIC_IDEAS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCustomTopic(item.title);
                      setCustomNiche(item.niche);
                      handleGenerateCustomReel(item.title);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors"
                  >
                    + {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Topic / Idea to create a Reel about:
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g. 3 free websites to make passive income from home..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Niche Category:</label>
                <select
                  value={customNiche}
                  onChange={(e) => setCustomNiche(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="ai_money_hacks">AI & Money Websites</option>
                  <option value="stoic_motivation">Stoic Discipline & Wealth</option>
                  <option value="tech_life_hacks">Everyday Tech Hacks</option>
                  <option value="wealth_facts">Real Estate & Wealth Truths</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleGenerateCustomReel()}
                disabled={isGenerating || !customTopic.trim()}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-purple-600/20"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    Generating Viral Script with Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Generate Viral Script & Hook
                  </>
                )}
              </button>

              <span className="text-[11px] text-slate-500">
                Server-side powered by Gemini 2.5 Flash
              </span>
            </div>

            {genError && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 rounded-xl text-xs">
                {genError}
              </div>
            )}
          </div>

          {/* Generated Result Card */}
          {generatedReel && (
            <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-6 space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                    Custom Script Generated
                  </span>
                  <span className="text-xs text-white font-semibold">{generatedReel.title}</span>
                </div>
                <span className="text-xs text-emerald-400 font-semibold">
                  Est. US/UK RPM: {generatedReel.estimatedRpm}
                </span>
              </div>

              {/* Visual Hook */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-400 flex items-center gap-1">
                    <Flame className="w-4 h-4" /> 3-Second Text Hook (Yellow Text on Top)
                  </span>
                  <button
                    onClick={() => handleCopy(generatedReel.visualHook, "gen-hook")}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
                  >
                    {copiedKey === "gen-hook" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Hook
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-sm">
                  {generatedReel.visualHook}
                </div>
              </div>

              {/* Voiceover */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-purple-300 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 25-30s Voiceover Script
                  </span>
                  <button
                    onClick={() => handleCopy(generatedReel.voiceoverScript, "gen-voice")}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
                  >
                    {copiedKey === "gen-voice" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Voiceover
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs md:text-sm leading-relaxed">
                  "{generatedReel.voiceoverScript}"
                </div>
              </div>

              {/* B-Roll & Caption */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-white">Free B-Roll Keyword:</div>
                  <div className="text-xs text-sky-400 font-mono">
                    "{generatedReel.brollKeyword}"
                  </div>
                  <a
                    href={generatedReel.brollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    Download from Pexels <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <div className="text-xs font-bold text-emerald-400">Monetization Strategy:</div>
                  <p className="text-xs text-slate-300">{generatedReel.affiliateTip}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUB-TAB 3: ZERO-EDITING VIDEO GUIDE */}
      {/* ===================================================================== */}
      {subTab === "guide" && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-emerald-400" />
              How to Create 30-Second Faceless Reels (Even If You Don't Know Video Editing)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              You do <strong>not</strong> need expensive software, a camera, or a microphone. Using the 100% free CapCut app and free Pexels clips, you can assemble a professional reel in less than 5 minutes. Here is the exact 4-step workflow:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ZERO_EDITING_WORKFLOW.map((step) => (
              <div
                key={step.step}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {step.step}
                    </span>
                    <h3 className="font-bold text-sm text-white">{step.title}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-purple-300 text-[10px] font-semibold border border-slate-800">
                    ⏱️ {step.duration}
                  </span>
                </div>

                <p className="text-xs text-slate-400">{step.description}</p>

                <div className="space-y-2 pt-1">
                  {step.actionItems.map((act, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-purple-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-[11px] text-purple-300 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pro-Tip:</strong> {step.proTip}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Golden Rules for US/UK Viewers */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              The 3 Golden Rules to Reach US & UK Viewers from Anywhere in the World:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-white">1. Native English Audio Only</div>
                <p className="text-slate-400 text-[11px]">
                  Never use broken English. Use CapCut’s native "Adam" or "American Male" voice so US/UK algorithms categorize your video correctly.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-white">2. Post at US Peak Hours</div>
                <p className="text-slate-400 text-[11px]">
                  Post between <strong>6:00 PM and 9:00 PM US Eastern Time</strong>. This is when American viewers are relaxing and scrolling after work.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-white">3. Pinned Comment Call-to-Action</div>
                <p className="text-slate-400 text-[11px]">
                  Immediately after posting, write a comment: <em>"Link in bio for the free starter guide!"</em> and click <strong>Pin Comment</strong> so it stays at the top.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUB-TAB 4: REVENUE TIMELINE & MONETIZATION */}
      {/* ===================================================================== */}
      {subTab === "timeline" && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Realistic Revenue Timeline: When & How Do You Get Paid?
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Social media algorithms don't pay you on Day 1. Instead, they compound. Here is the realistic timeline of view growth and how cash actually reaches your bank account:
            </p>
          </div>

          <div className="space-y-4">
            {REVENUE_MILESTONES.map((mile, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold">
                      {mile.phase}
                    </span>
                    <h3 className="font-bold text-sm text-white">{mile.title}</h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-400">Views: </span>
                      <strong className="text-sky-300">{mile.viewsExpected}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Est. Income: </span>
                      <strong className="text-emerald-400">{mile.revenueExpected}</strong>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{mile.whatHappens}</p>
              </div>
            ))}
          </div>

          {/* Income Math Breakdown */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              The Math: How 1 Viral Reel Can Pay You $200+
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="space-y-1.5 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="font-semibold text-white">Stream 1: Facebook Creator Bonus</div>
                <p className="text-slate-400 text-[11px]">
                  150,000 views from US viewers @ $1.20 RPM = <strong>$180 directly deposited to your bank</strong> from Meta.
                </p>
              </div>
              <div className="space-y-1.5 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="font-semibold text-white">Stream 2: Pinned Affiliate Tool</div>
                <p className="text-slate-400 text-[11px]">
                  150,000 views ➔ 300 clicks to bio ➔ 4 people sign up for a recommended tool @ $20 commission = <strong>$80 extra</strong>.
                </p>
              </div>
            </div>
            <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Total from ONE reel = <strong>$260</strong>. Once you have 30 reels posted, multiple videos compound traffic concurrently.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
