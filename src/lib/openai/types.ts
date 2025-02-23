export type Answer = {
  content: string;
};

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};
