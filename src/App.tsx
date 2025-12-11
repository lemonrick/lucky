import { useState, useEffect  } from 'react';
import { Sparkles } from 'lucide-react';

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);

  const generateNumbers = () => {
    // Create array 1–35
    const pool = Array.from({ length: 35 }, (_, i) => i + 1);

    // Fisher–Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Take first 5 and sort them ascending
    const newNumbers = pool.slice(0, 5).sort((a, b) => a - b);

    setNumbers(newNumbers);
  };

  // Generate numbers on initial page load
  useEffect(() => {
    generateNumbers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <Sparkles className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Lucky Numbers</h1>
          <p className="text-gray-600">Your lucky 6-digit code generator</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex justify-center gap-3 md:gap-4 mb-10">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="relative w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1), inset 0 -2px 8px rgba(0,0,0,0.2), inset 0 2px 8px rgba(255,255,255,0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl" />
                <span className="relative text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {num}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={generateNumbers}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-xl py-5 px-8 rounded-2xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-6 h-6" />
            Generate
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Click the button to generate your lucky numbers
        </p>
      </div>
    </div>
  );
}

export default App;
