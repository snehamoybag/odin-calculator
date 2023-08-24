function DisplayConstructor() {
  const equation = document.querySelector("#display-equation");
  const result = document.querySelector("#display-result");

  this.updateEquation = (value) => {
    equation.value = value === "" ? value : equation.value + value;
  };
  this.getEquation = () => equation.value;

  this.updateResult = (value) => (result.value = value);
  this.getResult = () => result.value;
}

const display = new DisplayConstructor();

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
  let result = null;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = substract(num1, num2);
      break;
    case "*":
      result = mulitply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      result = "Error!";
  }

  return result;
};

const buttons = {
  numbers: document.querySelectorAll("button[data-type=number]"),
  operators: document.querySelectorAll("button[data-type=operator]"),
  equal: document.querySelector("#equal"),
  undo: document.querySelector("#undo"),
  clear: document.querySelector("#clear"),
};

// update display equation on button clicks
buttons.numbers.forEach((button) => {
  button.addEventListener("click", () => display.updateEquation(button.value));
});

buttons.operators.forEach((button) => {
  button.addEventListener("click", () => display.updateEquation(button.value));
});

buttons.clear.addEventListener("click", () => display.updateEquation(""));
