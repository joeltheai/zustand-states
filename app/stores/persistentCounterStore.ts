import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementBy: (amount: number) => void
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const usePersistentCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      _hasHydrated: false,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'counter-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
