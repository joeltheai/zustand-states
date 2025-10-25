'use client'

import { useCounterStore } from '../stores/counterStore'

export default function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="p-6 max-w-sm mx-auto rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Counter Example</h2>
      <div className="text-center">
        <div className="text-4xl font-bold mb-4">{count}</div>
        <div className="space-x-2">
          <button
            onClick={decrement}
            className="px-4 py-2 rounded"
          >
            -
          </button>
          <button
            onClick={increment}
            className="px-4 py-2 rounded"
          >
            +
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
