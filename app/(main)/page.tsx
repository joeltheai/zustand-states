"use client";
import Counter from "../components/Counter";
import PersistentCounter from "../components/PersistentCounter";
import TextStuff from "../components/TextStuff";
import { useTextStore } from "../stores/textStore";
import { usePersistentTextStore } from "../stores/persistentTextStore";

export default function Home() {
  const text = useTextStore((state) => state.text);
  const persistentText = usePersistentTextStore((state) => state.text);
  const hydrated = usePersistentTextStore((state) => state._hasHydrated);
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Zustand Learning Demo
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Counter />
          <PersistentCounter />
        </div>
      </div>
      <TextStuff />

      <p className="text-4xl italic font-thin font-serif text-center mt-8">
        {text}
      </p>

      <div className="text-center mt-4">
        {!hydrated ? (
          <p className="text-sm opacity-70">Loading persistent text…</p>
        ) : (
          <p className="text-2xl font-light">{persistentText}</p>
        )}
      </div>
    </div>
  );
}
