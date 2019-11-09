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

// BUTTON DISPLAY

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

// Count Decimals

Number.prototype.countDecimals = function () {
  if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0; 
}

// OPERATOR DISPLAY

var operators = document.querySelectorAll(".operator");

var renderOpp = function (e) {
  var opp = e.target.textContent;
  if (display.textContent === "NUMBERS") {
    return;
  }
  display.textContent = display.textContent + " " + opp;
  displayValue = display.textContent;
}

operators.forEach(button => 
  button.addEventListener("click", renderOpp)
);

// CALCULATE

var calculate = function (string) {
  var displayArr = string.split(' ');

  if (divideByZero(displayArr)) {
    return "NICE TRY!"
  };

  if (syntaxOk(!displayArr)) {
    return "Syntax Error!"
  };


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

var finalAnswer = displayArr[0];
if(finalAnswer.countDecimals() > 4) {
  finalAnswer = finalAnswer.toFixed(3) + "...";
}
return finalAnswer;

}

function divideByZero(arr) {
  // returns true if / is followed by 0 in the array.
  var dividePresent = arr.some( element => {
    if (element === "/") {
      return true;
    }
  });
  if (!dividePresent) {
    return false;
  }
  for (var i = 0; i< arr.length; i++) {
    if (arr[i] === "/" && parseInt(arr[i + 1]) === 0) {
      return true;
    }
  }
  return false;
}

function syntaxOk(arr) {
	var last = arr[arr.length - 1];
	if (last === "+" || last === "-" || 
			last === "/" || last === "*") {
		return false;
	} else {
		return true;
	}
}


calculate("1 - 2 * 3")