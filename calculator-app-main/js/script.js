const themeLabel = document.getElementById('label');
const bodyClass = document.querySelector('.theme1');

const mainBtns = document.querySelectorAll('.main__section3__mainBtns');
const result = document.getElementById('result');

const equalBtn = document.getElementById('equal');
const resetBtn = document.getElementById('reset');
const deleteBtn = document.getElementById('delete');

let labelPosition = 0;
let themeCount = 1;
const step = 14.5;
const maxPosition = 29;

themeLabel.addEventListener('click', () => {
    if (labelPosition >= maxPosition) {
        labelPosition = 0;
        themeCount = 1;
    } else {
        labelPosition += step;
        themeCount++
    }
    themeSwitcher(themeCount);

    themeLabel.style.transform = `translateX(${labelPosition}px)`;
    }
)

mainBtns.forEach(btn => {
    btn.addEventListener('click', () => { 
        result.textContent = formatInput(result.textContent + btn.textContent);
});
})
deleteBtn.addEventListener('click', () => result.textContent = result.textContent.slice(0, -1))
resetBtn.addEventListener('click', () => result.textContent = '')
equalBtn.addEventListener('click', calculatorOutput);


function themeSwitcher(count) {
    bodyClass.classList.remove('theme1', 'theme2', 'theme3');
    bodyClass.classList.add(`theme${count}`);
}

function calculatorOutput() {
    console.log('yehey');
    const value = result.textContent.replace(/,/g, '');
    
    try {
        result.textContent = formatInput(eval(value).toString());
    } catch {
        result.textContent = 'Syntax Error';
    }

}

function formatInput(input) {
    const cleanInput = input.replace(/,/g, '');
    const splitInput = cleanInput.split(/([^\d.]+)/);
    console.log(splitInput);
    const formattedInput = splitInput
    .map(part => {
        if (/^\d+$/.test(part)) {
            const cleanedNumber = part.replace(/,/g, '');
            console.log(cleanedNumber);
            return parseInt(cleanedNumber, 10).toLocaleString();
        }
        return part;
    })
    .join('');

    return formattedInput;
}