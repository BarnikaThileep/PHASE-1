import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [prevInput, setPrevInput] = useState(null);
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);

  const handleNumberClick = (number) => {
    setInput((prev) => prev + number);
  };

  const handleOperatorClick = (op) => {
    if (input === "") return;
    setPrevInput(input);
    setOperator(op);
    setInput("");
  };

  const handleEqualsClick = () => {
    if (prevInput === null || input === "" || operator === null) return;

    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(input);
    let calcResult;

    switch (operator) {
      case "+":
        calcResult = num1 + num2;
        break;
      case "-":
        calcResult = num1 - num2;
        break;
      case "*":
        calcResult = num1 * num2;
        break;
      case "/":
        calcResult = num2 !== 0 ? num1 / num2 : "Error";
        break;
      default:
        return;
    }

    setResult(calcResult);
    setInput("");
    setPrevInput(null);
    setOperator(null);
  };

  const handleClearClick = () => {
    setInput("");
    setPrevInput(null);
    setOperator(null);
    setResult(null);
  };

  return (
    <div className="calculator-container">
      <div className="display">{result !== null ? result : input || "0"}</div>
      <div className="buttons">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
          <button
            key={btn}
            className="btn"
            onClick={() =>
              btn === "="
                ? handleEqualsClick()
                : ["+", "-", "*", "/"].includes(btn)
                ? handleOperatorClick(btn)
                : handleNumberClick(btn)
            }
          >
            {btn}
          </button>
        ))}
        <button className="btn clear" onClick={handleClearClick}>C</button>
      </div>
    </div>
  );
};

export default Calculator;
