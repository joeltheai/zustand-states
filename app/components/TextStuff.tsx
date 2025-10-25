'use client'
import { useTextStore } from "../stores/textStore";

export default function TextStuff() {
  const { text, setText } = useTextStore();

  return (
    <div className="p-6 max-w-sm mx-auto rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Text Stuff</h2>
      <input
        className=" p-2 border border-gray-300 rounded-md w-full"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
