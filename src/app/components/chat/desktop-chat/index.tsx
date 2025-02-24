"use client";

import * as React from "react";
import { Message } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  messages: Array<Message>;
  onMessageSend: (message: string) => Promise<void>;
};

export function DesktopChat({ messages, onMessageSend }: Props) {
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = React.useState("");

  const handleSubmit = async () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput) {
      setInputValue("");
      await onMessageSend(inputValue);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="hidden md:flex fixed bottom-4 left-4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-background/40 rounded overflow-hidden flex-col shadow-lg border border-border">
      <div
        ref={chatContainerRef}
        className="h-[30dvh] overflow-y-auto p-4 flex flex-col gap-2"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              msg.sender === "you" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[80%] ${
                msg.sender === "you"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <div className="text-sm">{msg.text}</div>
              <div className="text-xs mt-1">
                {msg.sender} • {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-border bg-background flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Type your message..."
        />
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    </div>
  );
}
