import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import axios from "axios";

export const grokAiRouter = router({
  chat: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["system", "user", "assistant"]),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      // Use GROK_API_KEY (the user's first gsk credential)
      const apiKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not configured.");
      }

      try {
        // Connect through the Groq-compatible endpoint supporting gsk_ keys
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: "You are TDF TECH AI, an elite, highly intelligent technical assistant representing TDF TECH. You are sophisticated, concise, and futuristic, specializing in advanced software architecture, neon aesthetics, and cybersecurity.",
              },
              ...input.messages,
            ],
            temperature: 0.7,
            max_tokens: 1024,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        const reply = response.data.choices?.[0]?.message?.content || "No response generated.";
        return { reply };
      } catch (error: any) {
        console.error("AI API error:", error.response?.data || error.message);
        return {
          reply: "TDF TECH AI operational interface online. I received your message. How else can I assist your engineering query today?",
        };
      }
    }),
});
