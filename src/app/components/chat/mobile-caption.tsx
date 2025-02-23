"use client";

import { Message } from "./types";

type Props = {
  lastMessage?: Message;
};

export function MobileCaption({ lastMessage }: Props) {
  if (!lastMessage) return null;
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 w-full z-10 p-4">
      <p className="bg-background text-foreground h-min p-2 rounded break-word m-4 text-center">
        {lastMessage?.text}
      </p>
    </div>
  );
}
