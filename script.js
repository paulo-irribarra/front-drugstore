// Calculator state
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

// DOM elements
const display = document.getElementById('display');

// Update display
function updateDisplay() {
  display.textContent = currentInput;
}

// Clear display
function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operation = null;
  shouldResetDisplay = false;
  updateDisplay();
}

// Append number to display
function appendNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// Append operator and handle operations
function appendOperator(op) {
  if (operation !== null) calculate();
  
  previousInput = currentInput;
  operation = op;
  shouldResetDisplay = true;
}

// Perform calculation
function calculate() {
  if (operation === null || shouldResetDisplay) return;
  
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  if (isNaN(prev) || isNaN(current)) return;
  
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      if (current === 0) {
        alert("Error: Division by zero");
        clearDisplay();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }
  
  currentInput = computation.toString();
  operation = null;
  previousInput = '';
  shouldResetDisplay = true;
  updateDisplay();
}

// Initialize calculator
clearDisplay();