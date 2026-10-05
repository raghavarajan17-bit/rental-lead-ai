import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEASING_SYSTEM_INSTRUCTION = `You are "LeaseBot", a compliant, professional 24/7 AI property leasing assistant for Oakwood Premier Apartments & Rental Communities.

AI DISCLOSURE:
You are an automated artificial intelligence leasing assistant. You are transparent about being an AI designed to assist prospective tenants 24/7.

FAIR HOUSING ACT (FHA) COMPLIANCE GUARDRAIL (CRITICAL):
- You must strictly comply with the US Fair Housing Act (Title VIII of the Civil Rights Act of 1968, 42 U.S.C. 3601+).
- NEVER discriminate, screen, steer, or inquire about protected classes: Race, Color, National Origin, Religion, Sex, Familial Status (presence of children, pregnancy, marital status), or Disability.
- Do NOT ask if the applicant has children, is married, or where they were born.
- Screen and qualify prospects SOLELY on objective, non-discriminatory property criteria: Desired move-in date, bedroom/bathroom layout needs, stated monthly budget, pet policy compatibility, and standard gross income requirements (e.g. 2.5x to 3x monthly rent).

OBJECTIVE QUALIFICATION CRITERIA TO GATHER NATURALLY:
1. Target Move-in Date (When are they planning to move?)
2. Desired Bedroom/Bathroom Layout & Monthly Budget (e.g., 1-bed under $1,900, 2-bed under $2,600)
3. Total Number of Intended Occupants (Objective occupancy limits, standard Keating memo guidance)
4. Pets (Types, breeds, weight - Oakwood is pet-friendly with up to 2 pets under 60 lbs)
5. Verifiable Gross Income Standard (~2.5x-3x monthly rent)
6. Tour Scheduling (Offer an in-person walkthrough or live virtual tour)

ANTI-HALLUCINATION & HUMAN ESCALATION RULE:
- Do NOT guess or invent property specifications that are not established.
- If a prospect asks about specific custom requests (e.g., exact storage unit dimensions, EV charger electrical amperages, ADA accommodation modifications, or unlisted rent discounts), do NOT invent details.
- Respond politely: "That is a specific detail our on-site leasing manager will be delighted to confirm for you. Let me take your contact info so they can follow up immediately, or we can schedule an in-person walkthrough!"

CONVERSATIONAL RULES:
- Keep responses friendly, warm, and concise (1 to 2 short paragraphs max).
- Ask only 1 or 2 relevant follow-up questions at a time.
- Validate whatever details the prospect shares.
- Proactively invite them to book a tour once move-in date and layout/budget are provided.`;

interface ChatMessage {
  role: "user" | "model" | "assistant";
  content: string;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "rental-lead-ai" });
  });

  // Next.js equivalent POST /api/qualify endpoint
  app.post("/api/qualify", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey.trim() === "") {
        res.status(500).json({
          error:
            "GEMINI_API_KEY is not set. Please configure GEMINI_API_KEY in your environment or .env file.",
        });
        return;
      }

      const { message, messages, businessType, businessName, qualificationFields } = req.body || {};

      if (!message && (!messages || !Array.isArray(messages) || messages.length === 0)) {
        res.status(400).json({
          error: "A 'message' string or 'messages' history array is required.",
        });
        return;
      }

      // Customize system instruction based on client business type
      const activeBusiness = businessName || "Oakwood Premier Apartments";
      const activeType = businessType || "property_leasing";
      
      let dynamicInstruction = LEASING_SYSTEM_INSTRUCTION;
      if (businessType && businessType !== "property_leasing") {
        dynamicInstruction = `You are a high-converting, friendly 24/7 AI Lead Assistant for "${activeBusiness}" (${activeType.replace(/_/g, " ")}).
YOUR OBJECTIVE:
Greet potential clients warmly, answer their questions accurately and concisely, and capture their qualification details:
${qualificationFields ? qualificationFields.join("\n") : "- Contact information (Name, Email/Phone)\n- Specific service or needs\n- Ideal timeline\n- Budget or project scope"}

RULES:
- Keep answers concise (1-2 short friendly paragraphs).
- Ask 1 gentle follow-up at a time to keep conversion high.
- Proactively invite them to schedule a free consultation or appointment once their need is clear.`;
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Prepare contents in @google/genai format
      const contents: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];

      if (messages && Array.isArray(messages)) {
        for (const msg of messages as ChatMessage[]) {
          if (!msg.content || typeof msg.content !== "string") continue;
          const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
          contents.push({
            role: role,
            parts: [{ text: msg.content }],
          });
        }
      }

      if (message && typeof message === "string" && message.trim() !== "") {
        const lastMsg = contents[contents.length - 1];
        if (!lastMsg || lastMsg.role !== "user" || lastMsg.parts[0].text !== message) {
          contents.push({
            role: "user",
            parts: [{ text: message.trim() }],
          });
        }
      }

      if (contents.length === 0) {
        res.status(400).json({ error: "No valid messages provided." });
        return;
      }

      // Generate response using gemini-2.5-flash
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: dynamicInstruction,
          temperature: 0.7,
        },
      });

      // Crucial: response.text is a GETTER, not a function!
      const reply =
        response.text ||
        "Thank you for contacting Oakwood Living! How can I assist you with your rental search today?";

      res.json({
        reply,
        status: "success",
      });
    } catch (error: unknown) {
      console.error("Error in /api/qualify:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({
        error: `Failed to process message: ${errorMessage}`,
      });
    }
  });

  // AI Viral Reel Generator Endpoint
  app.post("/api/generate-reel", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({
          error: "GEMINI_API_KEY environment variable is not configured.",
        });
        return;
      }

      const { topic, niche } = req.body || {};
      const userTopic = topic || "Secret AI tools that save 10 hours a week";
      const selectedNiche = niche || "ai_money_hacks";

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `You are an elite short-form video strategist creating viral Facebook Reels and YouTube Shorts specifically targeted at US and UK audiences (high CPM, high engagement).
You output ONLY a valid JSON object with no markdown backticks and no extra commentary.
The JSON must follow this exact schema:
{
  "title": "Short punchy title",
  "visualHook": "BOLD ALL-CAPS 3-SECOND TEXT OVERLAY WITH EMOJI (e.g., 3 WEBSITES THAT FEEL ILLEGAL TO KNOW IN 2026 🤫)",
  "voiceoverScript": "Word-for-word spoken voiceover script that takes exactly 25-35 seconds to read. Hook immediately in first sentence, deliver 3 rapid value points, and end with a call to save/comment.",
  "brollKeyword": "Search keywords for free video on Pexels (e.g., dark aesthetic laptop neon)",
  "caption": "High-converting Facebook Reel caption with conversational call-to-action.",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "affiliateTip": "Specific monetizing tip: what digital product, free tool, or affiliate link to pin in the comments to make money.",
  "estimatedRpm": "$5.00 - $12.00 / 1,000 views"
}`;

      const prompt = `Generate a viral, high-retention reel script for the topic: "${userTopic}" in the niche: "${selectedNiche}".
Target audience: United States and United Kingdom viewers.
Ensure the hook stops scrolling in under 3 seconds.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.75,
        },
      });

      const responseText = response.text || "{}";
      const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      const brollSearchUrl = `https://www.pexels.com/search/videos/${encodeURIComponent(
        parsed.brollKeyword || "dark aesthetic"
      )}/`;

      res.json({
        success: true,
        reel: {
          ...parsed,
          brollUrl: brollSearchUrl,
        },
      });
    } catch (error: unknown) {
      console.error("Error in /api/generate-reel:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({
        error: `Failed to generate reel script: ${errorMessage}`,
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Rental Lead AI server running on port ${PORT}`);
  });
}

startServer();
