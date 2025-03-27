import React from "react";
import "./App.css"

const CalculationComponent = () => {
  const num1 = 167;
  const num2 = 256;
  const result = num1 + num2; // Perform calculation

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-black-800">Calculation Result</h1>
        <p className="text-lg text-gray-600 mt-4">
          The sum of {num1} and {num2} is: <span className="font-semibold text-blue-500">{result}</span>
        </p>
      </div>
    </div>
  );
};

export default CalculationComponent;
