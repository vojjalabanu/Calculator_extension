document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const basicButtons = document.querySelectorAll('#basic-calculator .btn');
    const advancedButtons = document.querySelectorAll('#advanced-calculator .btn, .btn-advanced');
    const toggleCalcBtn = document.getElementById('toggleCalcBtn');
    const basicCalculator = document.getElementById('basic-calculator');
    const advancedCalculator = document.getElementById('advanced-calculator');

    basicButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleButtonClick(value);
        });
    });

    advancedButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleButtonClick(value);
        });
    });

    toggleCalcBtn.addEventListener('click', () => {
        if (basicCalculator.style.display === 'none') {
            basicCalculator.style.display = 'grid';
            advancedCalculator.style.display = 'none';
            toggleCalcBtn.textContent = 'Switch to Advanced Calculations';
        } else {
            basicCalculator.style.display = 'none';
            advancedCalculator.style.display = 'grid';
            toggleCalcBtn.textContent = 'Switch to Basic Calculations';
        }
    });

    function handleButtonClick(value) {
        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else {
            appendToDisplay(value);
        }
    }

    function appendToDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function calculateResult() {
        try {
            const result = evaluateExpression(display.value);
            display.value = result;
        } catch (e) {
            display.value = 'Error';
        }
    }

    function evaluateExpression(expression) {
        // Replace sqrt, cbrt, sin, cos, tan, and % with their Math equivalents
        expression = expression
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/cbrt\(/g, 'Math.cbrt(')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/%/g, ' % ');

        // Evaluate the expression using Function constructor for security
        // The Function constructor is a safer alternative to eval
        const result = new Function('return ' + expression)();
        return result;
    }
});

