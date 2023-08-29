function Caluclator() {
  let prevEquationEl = document.querySelector("#prev-equation");
  let currentEquationEl = document.querySelector("#current-equation");
  let prevOperand = "";
  let currentOperand = "";
  let operator = "";
  const throwDivisonError = () => {
    alert("Error! 0 cannot be a divisor");
  };

  this.operate = () => {
    const leftSideOperandNum = parseFloat(prevOperand);
    const rigthSideOperandNum = parseFloat(currentOperand);
    if (isNaN(leftSideOperandNum) || isNaN(rigthSideOperandNum)) return;
    if (operator === "÷" && rigthSideOperandNum === 0) {
      throwDivisonError();
      return;
    }
    let result;
    switch (operator) {
      case "+":
        result = leftSideOperandNum + rigthSideOperandNum;
        break;
      case "-":
        result = leftSideOperandNum - rigthSideOperandNum;
        break;
      case "×":
        result = leftSideOperandNum * rigthSideOperandNum;
        break;
      case "÷":
        result = leftSideOperandNum / rigthSideOperandNum;
        break;
      default:
        return;
    }
    currentOperand = result.toString().includes(".") // check if result is a float
      ? (Math.trunc(result * 100) / 100).toString() // rounds the result to 2 deciamal places
      : result.toString();
    prevOperand = "";
    operator = "";
  };

  this.updateDisplay = () => {
    currentEquationEl.value = currentOperand;
    if (operator !== "") {
      prevEquationEl.value = prevOperand + operator;
    } else {
      prevEquationEl.value = prevOperand;
    }
  };

  this.appendNumber = (num) => {
    if (num === "." && currentOperand.includes(num)) return;
    currentOperand = currentOperand.toString() + num.toString();
  };

  this.appendOperator = (operatorValue) => {
    if (currentOperand === "" && operatorValue === "-") {
      currentOperand = operatorValue;
      return;
    } else if (currentOperand === "" && operatorValue !== "-") {
      return;
    }
    if (currentOperand === "." || currentOperand === "-") return;
    if (
      prevOperand !== "" &&
      operator === "÷" &&
      parseFloat(currentOperand) === 0
    ) {
      throwDivisonError();
      return;
    }
    this.operate();
    operator = operatorValue;
    prevOperand = currentOperand;
    currentOperand = "";
  };

  this.delete = () => {
    if (currentOperand === "" && prevOperand === "" && operator === "") return;
    if (currentOperand === "" && prevOperand !== "" && operator !== "") {
      currentOperand = prevOperand + operator;
      prevOperand = "";
      operator = "";
    }
    currentOperand = currentOperand.toString().slice(0, -1);
  };

  this.allClear = () => {
    currentOperand = "";
    prevOperand = "";
    operator = "";
  };
}

const buttons = {
  numbers: document.querySelectorAll("button[data-type=number]"),
  operators: document.querySelectorAll("button[data-type=operator]"),
  equal: document.querySelector("#equal"),
  allClear: document.querySelector("#all-clear"),
  delete: document.querySelector("#delete"),
};

const calculator = new Caluclator();

buttons.numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.value);
    calculator.updateDisplay();
  });
});

buttons.operators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendOperator(button.value);
    calculator.updateDisplay();
  });
});

buttons.equal.addEventListener("click", () => {
  const resultEl = document.querySelector("#current-equation");
  calculator.operate();
  calculator.updateDisplay();
  if (resultEl.value === "") return;
  resultEl.focus(); // switches focus to the result
});

buttons.delete.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

buttons.allClear.addEventListener("click", () => {
  calculator.allClear();
  calculator.updateDisplay();
});
