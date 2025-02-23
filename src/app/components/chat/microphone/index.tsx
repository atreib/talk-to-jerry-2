"use cilent";

import { Button } from "@/components/ui/button";
import { MicIcon } from "lucide-react";

export function Microphone() {
  return (
    <div className="fixed bottom-4 right-4">
      <Button size="microphone" className="rounded-full">
        <MicIcon className="!h-8 !w-8" />
      </Button>
    </div>
  );
}
