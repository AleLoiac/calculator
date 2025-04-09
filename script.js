const numbersContainer = document.querySelector(".numbers-container");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");

const firstOperand = [];
const secondOperand = [];
let operator;

const add = (a, b) => a + b;

const substract = (a, b) => a - b;

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
    firstOperand.splice(0, firstOperand.length);
    secondOperand.splice(0, secondOperand.length);
    operator = "";
}

clearBtn.addEventListener("click", () => {
    clear();
    updateDisplay(0);
})

numbersContainer.addEventListener("click", (e) => {
    if (e.target.classList.value === "num" || e.target.classList.value === "num zero") {
        firstOperand.push(e.target.textContent);
        updateDisplay(firstOperand.join(""));
    }
})