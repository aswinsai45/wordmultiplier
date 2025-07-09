"use client";

import React, { useState } from "react";

export default function WordMultiplier() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [mode, setMode] = useState("decimal"); // 'decimal' or 'binary'
  const [error, setError] = useState("");

  const isBinary = (str) => /^[01]+$/.test(str);

  const multiply = (num1, num2) => {
    let x, y;
    if (mode === "binary") {
      x = parseInt(num1, 2);
      y = parseInt(num2, 2);
    } else {
      x = parseInt(num1);
      y = parseInt(num2);
    }
    let res = 0;
    let shift = 0;
    let trace = [];

    while (y !== 0) {
      if ((y & 1) === 1) {
        let partial = x << shift;
        res += partial;
        trace.push(`+ ${x} << ${shift} = ${partial}`);
      } else {
        trace.push(`Skipped: ${x} << ${shift} (bit was 0)`);
      }
      shift++;
      y >>= 1;
    }

    setSteps(trace);
    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (mode === "binary") {
      if (!isBinary(a) || !isBinary(b)) {
        setError("Please enter valid binary numbers (0 or 1 only).");
        setResult(null);
        setSteps([]);
        return;
      }
    }
    const product = multiply(a, b);
    setResult(product);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200-100 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-blue-100 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-blue-700 text-center tracking-tight mb-2">
          Word Multiplier
        </h1>
        <p className="text-base text-gray-600 text-center mb-6">
          Multiply two numbers using binary shifts (no{" "}
          <span className="font-mono">*</span>)
        </p>
        {/* Mode Toggle */}
        <div className="flex justify-center mb-6 w-full">
          <button
            type="button"
            className={`px-4 py-1 rounded-l-lg border border-blue-300 font-semibold focus:outline-none transition-colors duration-150 ${
              mode === "decimal"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700"
            }`}
            onClick={() => setMode("decimal")}
          >
            Decimal
          </button>
          <button
            type="button"
            className={`px-4 py-1 rounded-r-lg border-t border-b border-r border-blue-300 font-semibold focus:outline-none transition-colors duration-150 ${
              mode === "binary"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700"
            }`}
            onClick={() => setMode("binary")}
          >
            Binary
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="flex gap-3 w-full">
            <input
              type="text"
              value={a}
              onChange={(e) => {
                if (mode === "binary") {
                  if (e.target.value === "" || isBinary(e.target.value))
                    setA(e.target.value);
                } else {
                  setA(e.target.value);
                }
              }}
              placeholder={
                mode === "binary" ? "First number (binary)" : "First number"
              }
              className="w-1/2 px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-lg shadow-sm"
              required
              inputMode={mode === "binary" ? "numeric" : "decimal"}
              pattern={mode === "binary" ? "[01]*" : undefined}
            />
            <input
              type="text"
              value={b}
              onChange={(e) => {
                if (mode === "binary") {
                  if (e.target.value === "" || isBinary(e.target.value))
                    setB(e.target.value);
                } else {
                  setB(e.target.value);
                }
              }}
              placeholder={
                mode === "binary" ? "Second number (binary)" : "Second number"
              }
              className="w-1/2 px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-800 text-lg shadow-sm"
              required
              inputMode={mode === "binary" ? "numeric" : "decimal"}
              pattern={mode === "binary" ? "[01]*" : undefined}
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl font-semibold text-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Multiply
          </button>
        </form>

        {result !== null && (
          <div className="mt-8 bg-white/80 rounded-2xl p-6 shadow-inner border border-blue-100 w-full">
            <h2 className="text-xl font-bold text-purple-700 mb-2">
              Result: <span className="text-blue-700">{result}</span>
              {mode === "binary" && (
                <span className="ml-2 text-gray-500 text-base">
                  (binary:{" "}
                  <span className="font-mono">{result.toString(2)}</span>)
                </span>
              )}
            </h2>
            <h3 className="font-semibold text-gray-700 mb-2">Binary Steps:</h3>
            <ul className="list-decimal list-inside text-sm text-gray-700 space-y-1 pl-2">
              {steps.map((step, index) => (
                <li key={index} className="pl-1">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
