let input; //calculator input
let numberButtonList; //list that contains number buttons

let operationButtonList; //list that contaions operation buttons
let resultString; //result value
let firstValue = ""; //first value added to calcualtor
let secondValue = ""; // second value added to calcualator
let ansValue = "";
let operationValue;
let pressedOperation = false; //checks if operation was pressed by user
let clearButton;
let deleteButton;
let ansButton;
let sqrtButton;
let dotButton;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	input = document.querySelector("input");
	numberButtonList = document.querySelectorAll(".number");
	specialButtonList = document.querySelectorAll(".special");
	operationButtonList = document.querySelectorAll(".operation");

	resultButton = document.querySelector(".result");
	clearButton = document.querySelector(".clear");
	deleteButton = document.querySelector(".delete");
	ansButton = document.querySelector(".ans");
	sqrtButton = document.querySelector(".sqrt");
	dotButton = document.querySelector(".dot");
};

const prepareDOMEvents = () => {
	input.addEventListener("keyup", updateValues);
	numberButtonList.forEach((button) => button.addEventListener("click", getNumberValue));
	operationButtonList.forEach((button) => button.addEventListener("click", getOperationValue));
	clearButton.addEventListener("click", clearValues);
	deleteButton.addEventListener("click", deleteValue);
	ansButton.addEventListener("click", setAnsValue);
	resultButton.addEventListener("click", getResultValue);
	dotButton.addEventListener("click", getDot);
	sqrtButton.addEventListener("click", sqrtResult);
};
const getNumberValue = (e) => {
	if (pressedOperation === false) {
		firstValue += e.target.textContent;
		input.value = firstValue;
	} else {
		secondValue += e.target.textContent;
		input.value = secondValue;
	}
};

const getDot = () => {
	if (pressedOperation === false) {
		if (firstValue === "") {
			firstValue = "0.";
			input.value = "0.";
		} else {
			if (firstValue.includes(".") === false) {
				firstValue += ".";
				input.value += ".";
			}
		}
	} else {
		if (secondValue === "") {
			secondValue = "0.";
			input.value = "0.";
		} else {
			if (secondValue.includes(".") === false) {
				secondValue += ".";
				input.value += ".";
			}
		}
	}
};

const getOperationValue = (e) => {
	if (pressedOperation === false) {
		operationValue = e.target.textContent;
		pressedOperation = true;
		input.value = "";
	}
};

const sqrtResult = () => {
	if (pressedOperation === false) {
		if (firstValue === "" || parseFloat(firstValue) < 0) {
			return;
		}
		result = Math.sqrt(parseFloat(firstValue)).toFixed(2);
		firstValue = String(result);
		input.value = firstValue;
	} else {
		if (secondValue === "" || parseFloat(secondValue) < 0) {
			return;
		}
		result = Math.sqrt(parseFloat(secondValue)).toFixed(2);
		secondValue = String(result);
		input.value = secondValue;
	}
};

const returnError = () => {
	input.value = "";
	input.placeholder = "ERROR";
	firstValue = "";
	secondValue = "";
	operationValue = "";
	pressedOperation = false;
	ansValue = "";
	setTimeout(() => {
		input.placeholder = "";
	}, 2000);
};
const getResultValue = () => {
	if (firstValue === "" || secondValue === "") {
		return returnError();
	}
	if (pressedOperation === true) {
		if (operationValue === "+") {
			resultString = parseFloat(firstValue) + parseFloat(secondValue);
		} else if (operationValue === "-") {
			resultString = parseFloat(firstValue) - parseFloat(secondValue);
		} else if (operationValue === "*") {
			resultString = parseFloat(firstValue) * parseFloat(secondValue);
		} else if (operationValue === "/") {
			if (parseFloat(secondValue) != 0 || parseFloat(secondValue) != 0.0) {
				console.log("1");
				resultString = parseFloat(firstValue) / parseFloat(secondValue);
			} else {
				return returnError();
			}
		}
	}
	resultString = resultString.toFixed(2);
	resultString = String(resultString);
	pressedOperation = false;
	ansValue = resultString;
	input.value = resultString;
	firstValue = resultString;
	secondValue = "";
	operationValue = "";
};

const clearValues = () => {
	firstValue = "";
	secondValue = "";
	operationValue = "";
	ansValue = "";
	pressedOperation = false;
	input.value = "";
};

const updateValues = () => {
	if (pressedOperation === false) {
		firstValue = input.value;
	} else {
		secondValue = input.value;
	}
};

const deleteValue = () => {
	if (pressedOperation === false) {
		firstValue = firstValue.slice(0, -1);
		input.value = firstValue;
	} else {
		firstValue = firstValue.slice(0, -1);
		input.value = firstValue;
	}
};

const setAnsValue = () => {
	if (ansValue !== "") {
		if (pressedOperation === false) {
			firstValue = ansValue;
		} else {
			secondValue = ansValue;
		}
		input.value = ansValue;
	}
};
document.addEventListener("DOMContentLoaded", main);
