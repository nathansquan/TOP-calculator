let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

updateDisplay();

// watch for clicks of digits 
const numBtns = document.querySelectorAll(".digits > button:not(#decimal)");
numBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const num = e.target.textContent;
        inputOperand(num);
        updateDisplay();
    });
});

// watch for clicks of operands
const operandBtns = document.querySelectorAll(".operators > button:not(#equals)");
operandBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const operator = e.target.name;
        inputOperator(operator);
        updateDisplay();
    });
});

// watch for clicks of equals button
const equalsBtn = document.querySelector("#equals");
equalsBtn.addEventListener('click', () => {
    inputEquals();
    updateDisplay();
});

// watch for clicks of decimal button.
// don't let user type more than one decimal point
const decimalBtn = document.querySelector('#decimal');
decimalBtn.addEventListener('click', (e) => {
    const decimal = e.target.textContent;
    inputDecimal(decimal);
    updateDisplay();
});

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
    } else if (operator === '/') {
        return divide(a, b);
    }
}

// updateDisplay function
// updates display on click
function updateDisplay() {
    const display = document.querySelector(".display");
    display.textContent = displayValue;
}

// inputOperand takes an operand as input and prints it on display
function inputOperand(operand) {
    // case when first operator hasn't been inputted yet
    if (firstOperator === null) {
        if (displayValue === '0') {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        // case when the first operator has been clicked
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if (firstOperator === null && secondOperator === null) {
        // case when an operator is clicked for the very first time
        firstOperator = operator;
        firstOperand = displayValue;
    } else if (firstOperator !== null && secondOperator === null) {
        // case when a second operator is clicked for the first time
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(firstOperator, Number(firstOperand), Number(secondOperand));
        displayValue = result.toString();
        // reset firstOperand to the result/display value to be ready for
        // another operator click
        firstOperand = displayValue;
        // reset result
        result = null;
    } else {
        // case when a new second operator is clicked i.e. the 6th click
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(secondOperator, Number(firstOperand), Number(secondOperand));
        displayValue = result.toString();
        // reset firstOperand to the result/display value to be ready for
        // another operator click
        firstOperand = displayValue;
        // reset result
        result = null;
    }
}

function inputEquals() {
    // clicking equals with no firstOperator will not cause an error
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (firstOperator !== null && secondOperator === null) {
        // case when equals button clicked for the very first time
        secondOperand = displayValue;
        result = operate(firstOperator, Number(firstOperand), Number(secondOperand));
        displayValue = result.toString();
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    } else if (secondOperator !== null) {
        // case when final result
        // case when equals button clicked after two operator clicks and an
        // operand click
        secondOperand = displayValue;
        result = operate(secondOperator, Number(firstOperand), Number(secondOperand));
        displayValue = result.toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    }
}

function inputDecimal(decimal) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += decimal;
    } else if (!displayValue.includes(decimal)) {
        displayValue += decimal;
    }
}
