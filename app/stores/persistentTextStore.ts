import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PersistentTextState {
  text: string;
  setText: (text: string) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

// Minimal IndexedDB storage implementing the interface expected by createJSONStorage
const dbName = "zustand-db";
const storeName = "zustand";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    // Guard for non-browser environments
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available"));
      return;
    }

    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbGetItem(key: string): Promise<string | null> {
  try {
    const db = await openDatabase();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as string) ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function idbSetItem(key: string, value: string): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Swallow errors to avoid breaking the app if IDB is unavailable
  }
}

async function idbRemoveItem(key: string): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Swallow errors
  }
}

const idbStorage = {
  getItem: (name: string) => idbGetItem(name),
  setItem: (name: string, value: string) => idbSetItem(name, value),
  removeItem: (name: string) => idbRemoveItem(name),
};

export const usePersistentTextStore = create<PersistentTextState>()(
  persist(
    (set) => ({
      text: "",
      _hasHydrated: false,
      setText: (text) => set({ text }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "text-storage",
      storage: createJSONStorage(() => idbStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);


