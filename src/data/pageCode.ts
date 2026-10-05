export const pageCode = `"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Building2,
  Bot,
  User,
  Sparkles,
  Calendar,
  DollarSign,
  BedDouble,
  PawPrint,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Hi! I'm looking for a 2-bedroom apartment under $2,400/month.",
  "Do you allow dogs? Looking to move in around July 1st.",
  "What are your income requirements and deposit amounts?",
  "I'd like to schedule an in-person tour for this coming weekend.",
];

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Hello and welcome to Oakwood Premier Apartments! I'm LeaseBot, your leasing guide. Are you looking to move soon, or is there a specific floor plan and price range you have in mind?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    setErrorMessage(null);
    const userMsg: Message = {
      id: "user-" + Date.now(),
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/qualify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageContent,
          messages: updatedMessages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      const botReply: Message = {
        id: "bot-" + Date.now(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        role: "assistant",
        content:
          "Hello and welcome to Oakwood Premier Apartments! I'm LeaseBot, your leasing guide. Are you looking to move soon, or is there a specific floor plan and price range you have in mind?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setErrorMessage(null);
    setInput("");
  };

  return (
    <div className=\\"flex h-screen bg-slate-900 text-slate-100 antialiased overflow-hidden font-sans\\">
      {/* Sidebar */}
      <aside className=\\"hidden md:flex flex-col w-80 border-r border-slate-800 bg-slate-950/70 p-6 justify-between\\">
        <div className=\\"space-y-6\\">
          <div className=\\"flex items-center space-x-3\\">
            <div className=\\"p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400\\">
              <Building2 className=\\"w-6 h-6\\" />
            </div>
            <div>
              <h1 className=\\"font-semibold text-base tracking-tight text-white\\">
                Oakwood Living
              </h1>
              <p className=\\"text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5\\">
                <span className=\\"w-2 h-2 rounded-full bg-emerald-500 animate-pulse\\" />
                AI Qualification Active
              </p>
            </div>
          </div>

          <div className=\\"rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5\\">
            <div className=\\"flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400\\">
              <Sparkles className=\\"w-3.5 h-3.5 text-amber-400\\" />
              <span>Lead Qualification Engine</span>
            </div>
            <p className=\\"text-xs text-slate-400 leading-relaxed\\">
              Powered by <span className=\\"text-slate-200 font-medium\\">gemini-2.5-flash</span> via @google/genai SDK.
            </p>
          </div>

          <div className=\\"space-y-3\\">
            <h2 className=\\"text-xs font-semibold uppercase tracking-wider text-slate-400\\">
              Criteria Tracked
            </h2>
            <div className=\\"space-y-2 text-xs\\">
              <div className=\\"flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/80 text-slate-300\\">
                <Calendar className=\\"w-4 h-4 text-emerald-400 shrink-0\\" />
                <span>Move-in Timeline</span>
              </div>
              <div className=\\"flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/80 text-slate-300\\">
                <DollarSign className=\\"w-4 h-4 text-emerald-400 shrink-0\\" />
                <span>Monthly Budget</span>
              </div>
              <div className=\\"flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/80 text-slate-300\\">
                <BedDouble className=\\"w-4 h-4 text-emerald-400 shrink-0\\" />
                <span>Bed / Bath Layout</span>
              </div>
              <div className=\\"flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/80 text-slate-300\\">
                <PawPrint className=\\"w-4 h-4 text-emerald-400 shrink-0\\" />
                <span>Pet Policies</span>
              </div>
              <div className=\\"flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/80 text-slate-300\\">
                <CheckCircle2 className=\\"w-4 h-4 text-emerald-400 shrink-0\\" />
                <span>Tour Booking</span>
              </div>
            </div>
          </div>
        </div>

        <div className=\\"pt-4 border-t border-slate-800/80\\">
          <button
            onClick={handleResetChat}
            className=\\"w-full flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white py-2 px-3 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors\\"
          >
            <RefreshCw className=\\"w-3.5 h-3.5\\" />
            Restart Conversation
          </button>
        </div>
      </aside>

      {/* Main Chat */}
      <main className=\\"flex-1 flex flex-col h-full bg-slate-900 overflow-hidden\\">
        <header className=\\"flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80 md:hidden\\">
          <div className=\\"flex items-center gap-2\\">
            <Building2 className=\\"w-5 h-5 text-emerald-400\\" />
            <span className=\\"font-semibold text-sm text-white\\">Oakwood Leasing</span>
          </div>
          <button
            onClick={handleResetChat}
            className=\\"p-1.5 text-slate-400 hover:text-white rounded-lg border border-slate-800\\"
          >
            <RefreshCw className=\\"w-4 h-4\\" />
          </button>
        </header>

        {errorMessage && (
          <div className=\\"bg-rose-950/80 border-b border-rose-800/60 px-4 py-3 text-rose-200 text-xs flex items-center justify-between gap-3\\">
            <div className=\\"flex items-center gap-2\\">
              <AlertCircle className=\\"w-4 h-4 text-rose-400 shrink-0\\" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => handleSendMessage()}
              className=\\"px-2.5 py-1 bg-rose-800/80 hover:bg-rose-700 text-white rounded font-medium text-xs transition-colors shrink-0\\"
            >
              Retry
            </button>
          </div>
        )}

        <div className=\\"flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6\\">
          {messages.map((msg) => {
            const isBot = msg.role === "assistant";
            return (
              <div
                key={msg.id}
                className={"flex gap-3 max-w-3xl " + (isBot ? "mr-auto" : "ml-auto flex-row-reverse")}
              >
                <div
                  className={"w-8 h-8 rounded-full flex items-center justify-center shrink-0 " +
                    (isBot
                      ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-blue-600/20 text-blue-400 border border-blue-500/30")
                  }
                >
                  {isBot ? <Bot className=\\"w-4 h-4\\" /> : <User className=\\"w-4 h-4\\" />}
                </div>

                <div className={"space-y-1 " + (isBot ? "text-left" : "text-right")}>
                  <div className=\\"flex items-center gap-2 text-[11px] text-slate-500 px-1\\">
                    <span className=\\"font-medium text-slate-400\\">
                      {isBot ? "Oakwood LeaseBot" : "Prospective Renter"}
                    </span>
                    <span>•</span>
                    <span className=\\"flex items-center gap-1\\">
                      <Clock className=\\"w-3 h-3 inline\\" />
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={"rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap " +
                      (isBot
                        ? "bg-slate-800/90 border border-slate-700/60 text-slate-100 shadow-sm"
                        : "bg-emerald-600 text-white rounded-br-sm")
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className=\\"flex gap-3 max-w-3xl mr-auto items-center\\">
              <div className=\\"w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0\\">
                <Bot className=\\"w-4 h-4\\" />
              </div>
              <div className=\\"bg-slate-800/90 border border-slate-700/60 rounded-2xl px-4 py-3 flex items-center gap-1.5\\">
                <span className=\\"w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]\\" />
                <span className=\\"w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]\\" />
                <span className=\\"w-2 h-2 rounded-full bg-emerald-400 animate-bounce\\" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested chips */}
        <div className=\\"px-4 md:px-8 py-2 bg-slate-950/40 border-t border-slate-800/50\\">
          <p className=\\"text-[11px] text-slate-500 uppercase tracking-wider mb-2 font-medium\\">
            Suggested questions
          </p>
          <div className=\\"flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar\\">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className=\\"text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 transition-colors disabled:opacity-50\\"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat input form */}
        <div className=\\"p-4 md:p-6 bg-slate-950/90 border-t border-slate-800\\">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className=\\"flex items-center gap-2 max-w-4xl mx-auto\\"
          >
            <input
              ref={inputRef}
              type=\\"text\\"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder=\\"Ask about floor plans, pricing, move-in dates, or request a tour...\\"
              disabled={isLoading}
              className=\\"flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-50\\"
            />
            <button
              type=\\"submit\\"
              disabled={isLoading || !input.trim()}
              className=\\"p-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:cursor-not-allowed\\"
            >
              <Send className=\\"w-4 h-4\\" />
            </button>
          </form>
          <p className=\\"text-center text-[11px] text-slate-500 mt-2\\">
            Oakwood Leasing AI qualifies leads and answers resident inquiries 24/7.
          </p>
        </div>
      </main>
    </div>
  );
}
`;
