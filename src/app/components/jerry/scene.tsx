"use client";

import "regenerator-runtime/runtime";
import * as React from "react";
import { CameraProps, Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { BackgroundColorPicker } from "../bg-color-picker/component";
import { useBgColor } from "../bg-color-picker/hook";
import { useJerry } from "./hook";
import { DesktopChat } from "../chat/desktop-chat";
import { useChat } from "../chat/hook";
import { getAnswer } from "../chat/actions";
import { Microphone } from "../chat/microphone";
import { MobileCaption } from "../chat/mobile-caption";
import { JerryModel } from "./model";

type Props = {
  welcomeMessage: string;
};

export function JerryScene({ welcomeMessage }: Props) {
  const { bgColor, changeBgColor } = useBgColor();
  const jerryController = useJerry();
  const { messages, sendMessage } = useChat({ welcomeMessage });

  const initialCamera = {
    position: [0, 1, 3],
    fov: 40,
  } as CameraProps;

  const askToJerry = async (userMessage: string) => {
    jerryController.setAnimationState("thinking");

    try {
      sendMessage({
        message: userMessage,
        sender: "you",
      });

      const answer = await getAnswer({
        question: userMessage,
        messageHistory: messages,
      });

      // Handle Jerry answer
      jerryController.setAnimationState("talking");
      const utterance = new window.SpeechSynthesisUtterance(answer.content);
      window.speechSynthesis.speak(utterance);
      sendMessage({
        message: answer.content,
        sender: "jerry",
      });

      // Keep on talking animation for a time based on answer size
      await new Promise((resolve) => setTimeout(resolve, answer.speechTime));
    } catch (error) {
      console.error("Jerry can't talk right now... ", { error });
    } finally {
      jerryController.setAnimationState("idle");
    }
  };

  return (
    <div className="w-screen h-screen">
      <BackgroundColorPicker bgColor={bgColor} changeBgColor={changeBgColor} />
      <Canvas camera={initialCamera}>
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <JerryModel
          animationState={jerryController.animationState}
          group={jerryController.group}
          scene={jerryController.scene}
          animations={jerryController.animations}
        />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          maxDistance={10}
          minDistance={1}
          target={[0, 1.5, 0]}
        />
      </Canvas>
      <DesktopChat messages={messages} onMessageSend={askToJerry} />
      <MobileCaption
        lastMessage={messages.filter((x) => x.sender === "jerry").at(-1)}
      />
      <Microphone onMessageSend={askToJerry} />
    </div>
  );
}
