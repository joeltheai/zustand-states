"use client";

import { usePersistentTextStore } from "@/app/stores/persistentTextStore";

export default function Page() {
  const { text, setText, _hasHydrated } = usePersistentTextStore();

  if (!_hasHydrated) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="p-6 max-w-sm mx-auto rounded-xl shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-center">Persistent Text (IndexedDB)</h2>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"></div>
              <p className="mt-2">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="p-6 max-w-sm mx-auto rounded-xl shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-center">Persistent Text (IndexedDB)</h2>
          <p className="text-sm text-center">This text persists via IndexedDB.</p>
          <input
            className=" p-2 border border-gray-300 rounded-md w-full"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
          />
        </div>
      </div>
    </div>
  );
}


