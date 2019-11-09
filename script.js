// Operations

function add (a, b) {
	return parseInt(a) + parseInt(b);
};

function subtract (a, b) {
  return parseInt(a) - parseInt(b);
};

function multiply (a, b) {
  return parseInt(a) * parseInt(b);
};

function divide (a, b) {
  return parseInt(a) / parseInt(b);
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

// DISPLAY

var displayValue;
var operator;

// select all number buttons
var container = document.querySelector(".container");
var numbers = document.querySelectorAll(".number");
var display = document.querySelector(".display")
// function
var renderNum = function (e) {
  var num = e.target.getAttribute('id');
  if (display.textContent === "NUMBERS") {
    display.textContent = "";
  }
  display.textContent = display.textContent + " " + num;
  displayValue = display.textContent;
}
// set to buttons
numbers.forEach(button => 
  button.addEventListener("click", renderNum)
);

// CALCULATE

var calculate = function (string) {
  var displayArr = string.split(' ');
  while(
    displayArr.some( element => {
	    if (element === "*" || element === "/") {
	      return true;
	    }
    })
  ) {
	var index = displayArr.findIndex(element => {
		if (element === "*" || element === "/") {
	  return true;	
		}
})
	var result = operate(displayArr[index], displayArr[index - 1], displayArr[index + 1]);
	displayArr.splice(index - 1, 3, result);
  }

	while(displayArr.length > 1) {

var simpleResult = operate(displayArr[1], displayArr[0], displayArr[2]);
displayArr.splice(0, 3, simpleResult);
}
return displayArr[0];

}


calculate("1 - 2 * 3")