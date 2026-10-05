import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Ensure this route runs dynamically on Node.js runtime where process.env is accessible
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const LEASING_SYSTEM_INSTRUCTION = `You are "LeaseBot", an expert, friendly property leasing assistant for Oakwood Premier Apartments & Rental Communities.

YOUR OBJECTIVE:
Qualify prospective tenant leads naturally and conversationally, answering their questions about the property while collecting key rental qualification details.

ESSENTIAL QUALIFICATION DETAILS TO DISCOVER NATURALLY:
1. Target Move-in Date (When are they planning to move?)
2. Desired Bedroom/Bathroom Layout & Monthly Budget (e.g., 1-bed under $1,900, 2-bed under $2,600)
3. Household Size (Number of adults and children)
4. Pets (Types, breeds, weight - Oakwood is pet-friendly with up to 2 pets under 60 lbs)
5. Employment & Income Status (General standard is gross income equal to ~2.5x-3x monthly rent)
6. Tour Scheduling (Offer an in-person or virtual walkthrough when interested)

CONVERSATIONAL RULES:
- Be warm, helpful, and professional (1 to 2 short paragraphs max per response).
- NEVER ask all 6 questions at once! Ask only 1 or 2 relevant follow-up questions at a time.
- Acknowledge and validate whatever information the user provides.
- If the user asks about amenities (pool, gym, high-speed fiber, in-unit washer/dryer, assigned parking), answer enthusiastically.
- Once move-in date and budget are shared, proactively invite them to schedule a tour.`;

interface ChatMessage {
  role: "user" | "model" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Verify API Key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not set. Please add GEMINI_API_KEY to your .env.local file and restart the Next.js server.",
        },
        { status: 500 }
      );
    }

    // 2. Parse and validate request body
    let body: { message?: string; messages?: ChatMessage[] };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const { message, messages } = body;

    if (!message && (!messages || messages.length === 0)) {
      return NextResponse.json(
        { error: "A 'message' string or 'messages' history array is required." },
        { status: 400 }
      );
    }

    // 3. Initialize GoogleGenAI SDK correctly with named apiKey parameter
    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    // 4. Construct conversation contents for Gemini
    // @google/genai accepts contents as string, Content object, or Array<Content>
    // Supported roles are 'user' and 'model' (map 'assistant' -> 'model')
    const contents: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];

    if (messages && Array.isArray(messages)) {
      for (const msg of messages) {
        if (!msg.content || typeof msg.content !== "string") continue;
        const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
        contents.push({
          role: role,
          parts: [{ text: msg.content }],
        });
      }
    }

    // If a standalone 'message' string was provided and not yet appended:
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
      return NextResponse.json(
        { error: "No valid message content provided." },
        { status: 400 }
      );
    }

    // 5. Call Gemini using gemini-2.5-flash with system instructions in config
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: LEASING_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    // 6. Access text via getter property (response.text - NOT response.text())
    const reply =
      response.text ||
      "Thank you for contacting Oakwood Living! How can I help you find your ideal home?";

    return NextResponse.json({
      reply,
      status: "success",
    });
  } catch (error: unknown) {
    console.error("Error in /api/qualify route:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      {
        error: `Leasing assistant encountered an error: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
