'use client'

import { useCounterStore } from '../store/useCounterStore'

export default function Counter() {
  const { count, increment, decrement, reset, setCount } = useCounterStore()

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Counter</h2>
      <div className="text-4xl font-bold text-blue-600">{count}</div>
      
      <div className="flex space-x-2">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(10)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Set to 10
        </button>
      </div>
    </div>
  )
} 