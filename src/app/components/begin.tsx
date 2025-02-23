"use client";

import { Button } from "@/components/ui/button";
import { MessageCircleHeartIcon } from "lucide-react";
import * as React from "react";

export function BeginButton() {
  const [hasBegun, setHasBegun] = React.useState(false);

  const handleBegin = () => {
    const utterance = new window.SpeechSynthesisUtterance("welcome");
    window.speechSynthesis.speak(utterance);
    setHasBegun(true);
    sessionStorage.setItem("hasBegun", "true");
  };

  if (hasBegun) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-white">
          Enable your sound before continuing...
        </p>
        <Button size="lg" onClick={handleBegin}>
          <MessageCircleHeartIcon className="w-4 h-4 mr-2" />
          Click here to talk to Jerry
        </Button>
      </div>
    </div>
  );
}
