// To-Do:
// Next: Add functionality to the clear button, be sure to clear the array as well.
//Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”

/*
EXTRA CREDIT: Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
EXTRA CREDIT: Make it look nice! This can be a good portfolio project… but not if it’s UGLY. At least make the operations a different color from the keypad buttons.
EXTRA CREDIT: Add a “backspace” button, so the user can undo if they click the wrong number.
EXTRA CREDIT: Add keyboard support!
*/

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

var displayValue = "NUMBERS";
var operator;

// select all number buttons
var container = document.querySelector(".container");
var numbers = document.querySelectorAll(".number");
var display = document.querySelector(".display")
// function
var renderNum = function (e) {
  var num = e.target.getAttribute('id');
  if (display.textContent === "NUMBERS" || display.textContent === "") {
    display.textContent = num;
  } else {
  display.textContent = display.textContent + " " + num;
  displayValue = display.textContent;
  }
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
  var displayArr = string.split(" ");

  if (divideByZero(displayArr)) {
    return "NICE TRY!"
  };

  if (!syntaxOk(displayArr)) {
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

function renderAnswer(){
  // displays answer on the calc
  var answer = calculate(displayValue);
  display.textContent = answer;
  return;
}


var equalsButton = document.querySelector("#equal");
equalsButton.addEventListener("click", renderAnswer);

// CLEAR INPUTS

var clearButton = document.querySelector("#AC");

function clearDisplay() {
  display.textContent = "";

}

clearButton.addEventListener("click", clearDisplay);