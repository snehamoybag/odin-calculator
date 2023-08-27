let leftSideNumberStr = "";
let rightSideNumberStr = "";
let operator;
let isModeLeftSideNumber = true;

function DisplayConstructor() {
  this.equationEl = document.querySelector("#display-equation");
  this.getEquation = () => this.equationEl.value;
  this.setEquation = (value) => {
    this.equationEl.value = value;
  };
  this.updateEquation = (value) => {
    this.equationEl.value = this.equationEl.value + value;
  };

  this.resultEl = document.querySelector("#display-result");
  this.getResult = () => this.resultEl.value;
  this.setResult = (value) => {
    this.resultEl.value = value;
  };
}

const display = new DisplayConstructor();

const buttons = {
  numbers: document.querySelectorAll("button[data-type=number]"),
  operators: document.querySelectorAll("button[data-type=operator]"),
  equal: document.querySelector("#equal"),
  undo: document.querySelector("#undo"),
  clear: document.querySelector("#clear"),
};

const add = function(num1, num2) {
  return num1 + num2;
};

const substract = function(num1, num2) {
  return num1 - num2;
};

const mulitply = function(num1, num2) {
  return num1 * num2;
};

const divide = function(num1, num2) {
  return num1 / num2;
};

const operate = function(num1, num2, operator) {
  // turn to number just in case a string is passed
  num1 = parseInt(num1);
  num2 = parseInt(num2);

  if (isNaN(num1) || isNaN(num2) || !operator) return "Error";

  let result = null;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = substract(num1, num2);
      break;
    case "×":
      result = mulitply(num1, num2);
      break;
    case "÷":
      result = divide(num1, num2);
      break;
    default:
      result = "Error";
  }
  return result;
};

// click events
buttons.numbers.forEach((button) => {
  button.addEventListener("click", () => { });
});

buttons.operators.forEach((button) => {
  button.addEventListener("click", () => {
    display.updateEquation(button.value);
  });
});

buttons.undo.addEventListener("click", () => {
  const currentEquation = display.getEquation();
  const prevEquation = currentEquation.slice(0, -1); // remove last item from equation
  display.setEquation(prevEquation);
});

buttons.clear.addEventListener("click", () => display.setEquation(""));

buttons.equal.addEventListener("click", () => {
  console.log("equal");
});
