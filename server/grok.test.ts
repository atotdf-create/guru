import { describe, expect, it } from "vitest";

describe("Groq/Grok API Secret Validation", () => {
  it("verifies GROK_API_KEY environment variable is present and valid", async () => {
    const apiKey = process.env.GROK_API_KEY;
    expect(apiKey).toBeDefined();
    expect(typeof apiKey).toBe("string");
    expect(apiKey?.length).toBeGreaterThan(0);

    // Verify authentication against Groq-compatible endpoint
    const response = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    expect(response.status).toBe(200);
  }, 20_000);

  it("returns a chat completion from the configured assistant model", async () => {
    const apiKey = process.env.GROK_API_KEY;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Reply with the single word READY." }],
        max_tokens: 8,
      }),
    });

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.choices?.[0]?.message?.content).toBeTruthy();
  }, 30_000);
});
