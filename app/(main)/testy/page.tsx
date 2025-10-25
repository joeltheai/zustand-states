"use client";
import { useCounterStore } from "../../stores/counterStore";

export default function Page() {
  const { count } = useCounterStore();

  return (
    <div>
      <h1>Count: {count}</h1>
    </div>
  );
}
