"use client";

type Props = {
  bgColor: string;
  changeBgColor: (color: string) => void;
};

export function BackgroundColorPicker({ bgColor, changeBgColor }: Props) {
  return (
    <div className="absolute top-0 right-0 m-2 bg-background/40 text-foregound rounded-lg p-2 z-10 shadow border border-border">
      <input
        type="color"
        value={bgColor}
        onChange={(e) => changeBgColor(e.target.value)}
        className="w-6 h-6 cursor-pointer rounded"
      />
    </div>
  );
}
