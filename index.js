function Caluclator() {
  let prevEquationEl = document.querySelector("#prev-equation");
  let currentEquationEl = document.querySelector("#current-equation");
  let prevOperand = "";
  let currentOperand = "";
  let operator = "";

  this.operate = () => {
    const leftSideOperandNum = parseFloat(prevOperand);
    const rigthSideOperandNum = parseFloat(currentOperand);

    if (isNaN(leftSideOperandNum) || isNaN(rigthSideOperandNum)) return;

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
        if (leftSideOperandNum === 0 && rigthSideOperandNum === 0) {
          alert("Error! 0 can not be devided by 0");
          result = 0; // 0/0 = NaN
        } else if (leftSideOperandNum !== 0 && rigthSideOperandNum === 0) {
          alert("Error! 0 cannot be the divisor.");
          result = 0; // 1/0 = infinity
        } else {
          result = leftSideOperandNum / rigthSideOperandNum;
        }
        break;
      default:
        return;
    }
    currentOperand = result;
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

  this.appendOperator = (currentOperator) => {
    if (currentOperand === "") return;
    if (prevOperand !== "") {
      this.operate();
    }
    operator = currentOperator;
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
  calculator.operate();
  calculator.updateDisplay();
});

buttons.delete.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

buttons.allClear.addEventListener("click", () => {
  calculator.allClear();
  calculator.updateDisplay();
});
