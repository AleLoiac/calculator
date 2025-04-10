const numbersContainer = document.querySelector(".numbers-container");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const operatorsContainer = document.querySelector(".operators-container");

const displayTemp = [];
let firstOperand;
let secondOperand;
let operator;

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
    if (e.target.classList.contains("num")) {
        displayTemp.push(e.target.textContent);
        updateDisplay(displayTemp.join(""));
    }
}

const registerOperator = (e) => {
    if (e.target.classList.contains("operator") && displayTemp && firstOperand) {
        secondOperand = Number(displayTemp.join(""));
        displayTemp.splice(0, displayTemp.length);
        let result = operate(firstOperand, secondOperand, operator)
        updateDisplay(result);
        firstOperand = result;
        operator = e.target.textContent;
    } else if (e.target.classList.contains("operator") && displayTemp) {
        operator = e.target.textContent;
        firstOperand = Number(displayTemp.join(""));
        displayTemp.splice(0, displayTemp.length);
    }
}

numbersContainer.addEventListener("click", registerNumbers);
operatorsContainer.addEventListener("click", registerOperator);
clearBtn.addEventListener("click", clear);