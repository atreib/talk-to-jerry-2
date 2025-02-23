import "server-only";

import { Answer, Message } from "./types";
import * as prompts from "./prompts";

type AskProps = {
  question: string;
  injectedApiKey?: string;
  history: Message[];
};

export async function ask({ question, history }: AskProps): Promise<Answer> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  try {
    const messages = [
      { role: "system", content: prompts.jerryIntroduction },
      ...history,
      { role: "user", content: question },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.error?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    const content = String(
      data.choices[0]?.message?.content ??
        "Sorry, I could not generate a response."
    );

    return {
      content,
    };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to get response from AI");
  }
}
