import React, { useEffect, useState } from 'react'

interface IProps {
  stocks: number
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const NumberPicker: React.FC<IProps> = ({stocks, count, setCount}) => {

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(Math.max(0, count - 1));
  };

  useEffect(() => {
    setCount(stocks);
  }, [stocks]);

  return (
    <div>
      <div className="inline-flex items-center border-2  mt-2 px-3 py-3 rounded-full">
      <button
        type="button"
        onClick={decrement}
        className="px-3 py-1 text-xl bg-white border-4 rounded-full border-gray-500 font-bold text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        -
      </button>
      <span className="px-3 text-lg font-bold">{count}</span>
      <button
        type="button"
        onClick={increment}
        className="px-3 py-1 bg-white border-4 border-gray-500 rounded-full text-xl text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        +
      </button>
    </div>
    </div>
  )
}

export default NumberPicker