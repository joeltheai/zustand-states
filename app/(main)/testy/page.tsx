"use client";
import { useCounterStore } from "../../stores/counterStore";
import { useTextStore } from "../../stores/textStore";
import TextStuff from "@/app/components/TextStuff";

export default function Page() {
  const { count } = useCounterStore();

  const { text } = useTextStore();
  return (
    <div>
      <div
        className="text-6xl font-extrabold text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #9900ff, #ff00cc, #ff0000)",
        }}
      >
        {text}
      </div>
      <h1
        className="text-6xl font-extrabold text-transparent bg-clip-text mt-4"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #9900ff, #ff00cc, #ff0000)",
        }}
      ></h1>
      Count: {count}
      <TextStuff />
    </div>
  );
}
