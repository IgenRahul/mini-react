import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="flex flex-col items-center bg-gray-800 p-8 shadow-2xl rounded-xl">
        <h1 className="text-4xl font-bold text-indigo-400 mb-6">Stop Watch</h1>
        <div className="font-mono text-6xl mb-8 text-white tracking-wider">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
          <span className="text-indigo-400">:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
          <span className="text-indigo-400">:</span>
          <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="flex gap-4 justify-center text-white">
          <button
            className={`min-w-32 px-6 py-2 rounded-lg font-semibold transition-colors ${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={startStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button className="min-w-32 bg-gray-600 hover:bg-gray-700  px-6 py-2 rounded-lg font-semibold" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
