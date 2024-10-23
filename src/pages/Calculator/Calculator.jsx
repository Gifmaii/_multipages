import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [obj, setObj] = useState({ val1: "", val2: "", op: "", step: 1 });

  const number = (num) => {
    const val = obj.step === 1 ? obj.val1 + num : obj.val2 + num;
    setObj({ ...obj, [obj.step === 1 ? "val1" : "val2"]: val });
  };

  const operator = (op) => {
    if (obj.step === 1 && obj.val1) {
      setObj({ ...obj, op, step: 2 });
    } else if (obj.step === 2) {
      setObj({ ...obj, op }); // Allow changing operator
    }
  };

  const sum = () => {
    const { val1, val2, op } = obj;
    let result;

    // Parse float and handle potential NaN
    const num1 = parseFloat(val1) || 0;
    const num2 = parseFloat(val2) || 0;

    switch (op) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : "Error"; // Handle division by zero
        break;
      default:
        return;
    }

    setObj({ val1: String(result), val2: "", op: "", step: 1 });
  };

  const clear = () => setObj({ val1: "", val2: "", op: "", step: 1 });

  const handleClick = (btn) => {
    if (btn === "AC") clear();
    else if (btn === "=") sum();
    else if (["/", "*", "-", "+"].includes(btn)) operator(btn);
    else number(btn);
  };

  return (
    <div className="box">
      <div className="number">
        <span>{obj.val2 || obj.val1 || "0"}</span>
      </div>
      <div className="number-container">
        {[
          "AC",
          ">",
          "/",
          "*",
          "7",
          "8",
          "9",
          "-",
          "4",
          "5",
          "6",
          "+",
          "1",
          "2",
          "3",
          "=",
          "0",
        ].map((btn, i) => (
          <div key={i} className="btn" onClick={() => handleClick(btn)}>
            {btn}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
