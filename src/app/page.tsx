import { BeginButton } from "./components/begin";
import { JerryScene } from "./components/jerry/scene";

const welcomeMessage = "Hey, I'm Jerry. Nice to meet you!";

export default function Home() {
  return (
    <>
      <BeginButton welcomeMessage={welcomeMessage} />
      <JerryScene welcomeMessage={welcomeMessage} />
    </>
  );
}
