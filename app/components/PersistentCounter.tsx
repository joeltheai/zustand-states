"use client";

import { usePersistentCounterStore } from "../stores/persistentCounterStore";

export default function PersistentCounter() {
  const { count, increment, decrement, reset, incrementBy, _hasHydrated } =
    usePersistentCounterStore();

  // Show loading state until store is hydrated
  if (!_hasHydrated) {
    return (
      <div className="p-6 max-w-sm mx-auto rounded-xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Persistent Counter</h2>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-sm mx-auto rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Persistent Counter</h2>
      <p className="text-sm text-center">
        This data persists across page refreshes!
      </p>
      <div className="text-center">
        <div className="text-4xl font-bold mb-4">{count}</div>
        <div className="space-x-2">
          <button onClick={decrement} className="px-4 py-2 rounded">
            -
          </button>
          <button onClick={increment} className="px-4 py-2 rounded">
            +
          </button>
          <button onClick={() => incrementBy(5)} className="px-4 py-2 rounded">
            +5
          </button>
          <button onClick={reset} className="px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
