"use client";

import * as React from "react";
import { Message } from "./types";

export function useChat() {
  const [messages, setMessages] = React.useState<Array<Message>>([
    {
      text: "Welcome! I'm Jerry. How can I help you today?",
      sender: "jerry",
      timestamp: new Date(),
    },
  ]);

  async function sendMessage(props: {
    message: Message["text"];
    sender: Message["sender"];
  }) {
    setMessages((prev) => [
      ...prev,
      { text: props.message, sender: props.sender, timestamp: new Date() },
    ]);
  }

  return { messages, sendMessage };
}
