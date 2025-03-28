// app/page.tsx (Next.js 13+)
'use client';

import { useState } from 'react';

const buttons = [
  'C', '(', ')', '^',
  'sin', 'cos', 'tan', 'log',
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', 'exp', '+',
  '='
];

function getColorClass(type : string) {
  if (type === 'C') return 'w-18 red-btn';
  if (['(', ')', '^', '*', '/', '-', '+', 'sin', 'cos', 'tan', 'log',].includes(type))
    return 'w-18 white-btn';
  if (type === '=') return 'blue-btn w-full col-span-full';
  return 'w-18 btn';
}

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = async (value: string) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
      return;
    }

    if (value === '=') {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression }),
      });
      const data = await res.json();
      setResult(data.result || 'Error');
      return;
    }

    setExpression(prev => prev + value);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4">
        <div className="h-20 bg-gray-200 text-right p-4 rounded text-4xl mb-2 min-h-[3rem]">
          {expression || '0'}
        </div>
        <div className="h-20 bg-gray-100 text-right text-4xl p-4 text-green-600 font-semibold min-h-[2rem]">
          {result}
        </div>
        <div className="grid grid-cols-4 gap-2 my-12 place-items-center px-10">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(btn)}
              className={` h-16 text-white font-bold rounded-lg text-center transition-all active:translate-y-[2px] active:shadow-inner 
                ${getColorClass(btn)}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
