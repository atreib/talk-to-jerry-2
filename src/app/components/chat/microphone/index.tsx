"use cilent";

import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { MicIcon } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type Props = {
  onMessageSend: (message: string) => Promise<void>;
};

export function Microphone({ onMessageSend }: Props) {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const variant: ButtonProps["variant"] = listening ? "destructive" : "default";

  const handleMicClick = () => {
    if (listening) {
      stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const stopListening = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // Add a small delay to ensure we get the complete transcript
    await new Promise((resolve) => setTimeout(resolve, 1500));
    SpeechRecognition.stopListening();

    if (transcript.trim()) {
      const userMessage = transcript.trim();
      await onMessageSend(userMessage);
      resetTranscript();
    }

    setIsProcessing(false);
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 items-center justify-end">
      <span className="md:hidden block bg-muted text-muted-foreground text-xs h-min p-2 rounded break-word m-2 w-full md:w-1/3 lg:w-1/2">
        Tap to talk and tap again to stop
      </span>
      <Button
        size="microphone"
        className="rounded-full aspect-square"
        variant={variant}
        disabled={!browserSupportsSpeechRecognition || isProcessing}
        onClick={handleMicClick}
      >
        <MicIcon className="!h-8 !w-8" />
      </Button>
    </div>
  );
}
