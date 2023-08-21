let firstNumber = 0;
let secondNumber = 0;
let operator = "";

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
