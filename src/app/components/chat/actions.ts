"use server";

import { ask } from "@/lib/openai";
import { Message } from "./types";

type GetAnswerProps = {
  question: string;
  messageHistory: Message[];
};

export async function getAnswer(props: GetAnswerProps) {
  const answer = await ask({
    question: props.question,
    history: props.messageHistory.map((msg) => ({
      role: msg.sender === "you" ? ("user" as const) : ("assistant" as const),
      content: msg.text,
    })),
  });
  return {
    content: answer.content,
    speechTime: answer.content.length * 90,
  };
}
