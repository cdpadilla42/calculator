// Operations

function add (a, b) {
	return a + b;
};

function subtract (a, b) {
  return a - b;
};

function multiply (a, b) {
  return a * b;
};

function divide (a, b) {
  return a / b;
};

// Operate

function operate(operator, a, b) {
	if (operator === "+") {
		return add(a, b);
  };
  if (operator === "-") {
    return subtract(a, b);
  };
  if (operator === "*") {
    return multiply(a, b);
  };
  if (operator === "/") {
    return divide(a, b);
  };
}

// Display

// DEBUG TIME!!

var a;
var b;
var operator;

// select all number buttons
var container = document.querySelector(".container");
var numbers = document.querySelectorAll(".number");
var display = document.querySelector(".display")
// function
var display = function (e) {
  var num = e.target.getAttribute('id');
  if (!a) {
    a = num;
  }
  if (!b) {
    b = num;
  }
display.textContent = display.textContent + " " + num;
}
// set to buttons
numbers.addEventListener("click", display);