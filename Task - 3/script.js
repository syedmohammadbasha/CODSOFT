document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".button");
    const clearButton = document.getElementById("clear");
    const equalButton = document.getElementById("equal");

    let currentInput = "0";
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function handleNumber(value) {
        if (waitingForSecondOperand) {
            currentInput = value;
            waitingForSecondOperand = false;
        } else {
            currentInput = currentInput === "0" ? value : currentInput + value;
        }
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            currentInput = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
        updateDisplay();
    }

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case "+":
                return firstOperand + secondOperand;
            case "-":
                return firstOperand - secondOperand;
            case "*":
                return firstOperand * secondOperand;
            case "/":
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    function handleClear() {
        currentInput = "0";
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const { value } = button.dataset;

            if (button.classList.contains("operator")) {
                handleOperator(value);
            } else if (button.id === "clear") {
                handleClear();
            } else {
                handleNumber(value);
            }
        });
    });

    equalButton.addEventListener("click", () => {
        if (operator && !waitingForSecondOperand) {
            const result = calculate(firstOperand, parseFloat(currentInput), operator);
            currentInput = `${parseFloat(result.toFixed(7))}`;
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    });
});
