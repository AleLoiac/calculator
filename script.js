const numbersContainer = document.querySelector(".numbers-container");
const operatorsContainer = document.querySelector(".operators-container");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");

const displayTemp = [];
let firstOperand = "";
let secondOperand = "";
let operator = "";
let resultDisplayed = false;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => b === 0 ? "ERROR" : a / b;

function operate (a, b, symbol) {
    switch (symbol) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            console.log("Invalid operation");
            break;
    }
}

const updateDisplay = (num) => {
    display.textContent = num;
}

const clear = () => {
    displayTemp.splice(0, displayTemp.length);
    firstOperand = "";
    secondOperand = "";
    operator = "";
    updateDisplay(0);
}

const registerNumbers = (e) => {
    if (resultDisplayed) {
        clear();
        resultDisplayed = false;
    }
    if (e.target.classList.contains("num")) {
        displayTemp.push(e.target.textContent);
        updateDisplay(displayTemp.join(""));
    }
}

const compute = () => {
    secondOperand = Number(displayTemp.join(""));
    displayTemp.splice(0, displayTemp.length);
    let result = operate (firstOperand, secondOperand, operator);
    updateDisplay(result);
    firstOperand = result;
    secondOperand = "";
}

const registerOperator = (e) => {
    if (e.target.classList.contains("operator")) {
        resultDisplayed = false;
        if (displayTemp.length !== 0 && operator === "" && firstOperand === "") { // clicked an operator for the first time, or after clear()
            firstOperand = Number(displayTemp.join(""));
            operator = e.target.textContent;
            displayTemp.splice(0, displayTemp.length);
        } else if (displayTemp.length === 0 && operator !== "" && firstOperand !== "") { // operator clicked after equal sign
            operator = e.target.textContent;
        } else if (displayTemp.length !== 0 && operator !== "" && firstOperand !== "") { // operator clicked instead of equal sign to make consecutive operations
            compute();
            operator = e.target.textContent;
        }
    }
}

const registerEqual = () => {
    if (firstOperand !== "" && operator !== "" && displayTemp.length !== 0) {
        compute();
        resultDisplayed = true;
    }
}

numbersContainer.addEventListener("click", registerNumbers);
operatorsContainer.addEventListener("click", registerOperator);
clearBtn.addEventListener("click", clear);
equalBtn.addEventListener("click", registerEqual);