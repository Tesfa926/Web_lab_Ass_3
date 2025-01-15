const display = document.getElementById('display');
        const buttons = document.querySelectorAll('.btn');
        const clearButton = document.getElementById('clear');
        const equalsButton = document.getElementById('equals');
        let currentNumber = '';
        let previousNumber = '';
        let operator = '';

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                if (!isNaN(value) || value === '.') {
                    appendNumber(value);
                } else if (['+', '-', '*', '/'].includes(value)) {
                    setOperation(value);
                }
            });
        });

        equalsButton.addEventListener('click', calculate);
        clearButton.addEventListener('click', clearDisplay);

        function appendNumber(number) {
            currentNumber += number;
            updateDisplay(`${previousNumber} ${operator} ${currentNumber}`.trim());
        }

        function setOperation(op) {
            if (currentNumber === '') return;
            if (previousNumber !== '') {
                calculate();
            }
            operator = op;
            previousNumber = currentNumber;
            currentNumber = '';
            updateDisplay(`${previousNumber} ${operator}`);
        }

        function calculate() {
            if (currentNumber === '' || previousNumber === '' || operator === '') return;
            let result;
            const prev = parseFloat(previousNumber);
            const current = parseFloat(currentNumber);

            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = current !== 0 ? prev / current : 'Error';
                    break;
                default:
                    return;
            }
            updateDisplay(result);
            previousNumber = '';
            currentNumber = result.toString();
            operator = '';
        }

        function clearDisplay() {
            currentNumber = '';
            previousNumber = '';
            operator = '';
            updateDisplay('');
        }

        function updateDisplay(value) {
            display.value = value;
        }