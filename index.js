function DisplayConstructor() {
  const equation = document.querySelector("#display-equation");
  const result = document.querySelector("#display-result");

  this.getEquation = () => equation.value;
  this.setEquation = (value) => (equation.value = value);
  this.updateEquation = (value) => (equation.value = equation.value + value);

  this.getResult = () => result.value;
  this.updateResult = (value) => (result.value = value);
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

// update display equation on button clicks
buttons.numbers.forEach((button) => {
  button.addEventListener("click", () => display.updateEquation(button.value));
});

buttons.operators.forEach((button) => {
  button.addEventListener("click", () => {
    const currentEquation = display.getEquation();
    const nonOperatorReg = /[0-9\.]/;

    // replace operator if user press operator buttons consecutively
    if (!nonOperatorReg.test(currentEquation[currentEquation.length - 1])) {
      const updatedEquation = currentEquation.slice(0, -1).concat(button.value);
      display.setEquation(updatedEquation);
    } else {
      display.updateEquation(button.value);
    }
  });
});

buttons.undo.addEventListener("click", () => {
  const currentEquation = display.getEquation();
  const prevEquation = currentEquation.slice(0, -1); // remove last item from equation
  display.setEquation(prevEquation);
});

buttons.clear.addEventListener("click", () => display.setEquation(""));
