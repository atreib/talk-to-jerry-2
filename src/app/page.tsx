"use client";

import { BeginButton } from "./components/begin";
import dynamic from "next/dynamic";

const JerryScene = dynamic(
  () => import("./components/jerry/scene").then((mod) => mod.JerryScene),
  {
    ssr: false,
    loading: () => null,
  }
);

const welcomeMessage = "Hey, I'm Jerry. Nice to meet you!";

export default function Home() {
  return (
    <>
      <BeginButton welcomeMessage={welcomeMessage} />
      <JerryScene welcomeMessage={welcomeMessage} />
    </>
  );
}
