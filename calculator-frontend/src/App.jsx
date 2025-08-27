import './App.css'
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    if (num1 === "" || num2 === "") {
      setError("Please enter both numbers");
      return;
    }
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/calculator/calculate", {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
        operation,
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">🧮 Calculator</h1>

        <div className="mb-3">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
            className="w-full px-3 py-2 rounded-lg bg-gray-700 focus:outline-none"
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
            className="w-full px-3 py-2 rounded-lg bg-gray-700 focus:outline-none"
          />
        </div>

        <div className="mb-3">
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 focus:outline-none"
          >
            <option value="add">➕ Add</option>
            <option value="subtract">➖ Subtract</option>
            <option value="multiply">✖ Multiply</option>
            <option value="divide">➗ Divide</option>
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 hover:bg-blue-600 transition rounded-lg py-2 font-semibold"
        >
          Calculate
        </button>

        {error && <p className="text-red-400 mt-3 text-center">{error}</p>}

        {result !== null && !error && (
          <p className="text-green-400 text-xl text-center mt-4">
            Result: {result}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
