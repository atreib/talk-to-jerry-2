"use client";

import * as React from "react";
import { Message } from "./types";

type Props = {
  welcomeMessage: string;
};

export function useChat({ welcomeMessage }: Props) {
  const [messages, setMessages] = React.useState<Array<Message>>([
    {
      text: welcomeMessage,
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
