function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERROR: DIV BY 0";
    } else {
    return a / b;
    }
}

function operate(operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else {
        return divide(a, b);
    }
}

// create functions to display number button clicks
const numBtns = document.querySelectorAll(".digits > button");
const display = document.querySelector(".display");

// initialize displayVal var to store number that is created through clicks
let displayVal;

numBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const val = e.target.textContent;
        display.textContent = `${display.textContent}${val}`;
        // update displayVal after each number button click
        displayVal = display.textContent;
    });
});
