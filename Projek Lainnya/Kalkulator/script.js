const display = document.getElementById('display');

function append(value) {
  if (display.textContent === '0' || display.textContent === 'Bawekdehewel') {
    display.textContent = '';
    display.classList.remove('error');
  }
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = '0';
  display.classList.remove('error');
}

function deleteLast() {
  if (display.textContent.length > 1 && display.textContent !== 'Bawekdehewel') {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    clearDisplay();
  }
}

function calculate() {
  try {
    const result = eval(display.textContent);
    display.textContent = result;
    display.classList.remove('error');
  } catch (error) {
    display.textContent = 'Bawekdehewel';
    display.classList.add('error');
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (/[\d+\-*/%.]/.test(key)) {
    append(key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});