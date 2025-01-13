const openBtn = document.querySelector('#open-modal');
const dialog = document.querySelector('#dialog');
const closeBtn = document.querySelector('#close');
const playAgainBtn = document.querySelectorAll('.play-again');

const section2 = document.querySelector('.section2');
const section3 = document.querySelector('.section3');
const result = document.querySelectorAll('.result');
const resultTitle = document.querySelectorAll('.result-title');
const scoreValue = document.querySelector('#score-value');
const optionButtons = document.querySelectorAll('#rock, #scissors, #paper');

let count = parseInt(localStorage.getItem('score')) || 0;
scoreValue.textContent = count;

optionButtons.forEach(btn => {
    btn.addEventListener('click', ()=> play(btn));
})

openBtn.addEventListener('click', () => dialog.showModal());
closeBtn.addEventListener('click', () => dialog.close())

playAgainBtn.forEach(again => {
    again.addEventListener('click', () => {
        section2.style.display = 'block';
        section3.style.display = 'none';
    
        const playerDiv = section3.querySelector('.player');
        const playerSpan = playerDiv.querySelector('span');
        const existingPlayerChoice = playerDiv.querySelector('button:not(.circle)');
        if (existingPlayerChoice) {
            playerDiv.removeChild(existingPlayerChoice);
        }
    
        const computerDiv = section3.querySelector('.computer');
        const computerSpan = computerDiv.querySelector('span');
        const existingComputerChoice = computerDiv.querySelector('button:not(.circle)');
        if (existingComputerChoice) {
            computerDiv.removeChild(existingComputerChoice);
        }
    
        const defaultCircle = document.createElement('button');
        defaultCircle.classList.add('circle');
        computerDiv.insertBefore(defaultCircle, computerSpan);
    
        result.forEach(res => {
            res.style.display = 'none';
            res.style.opacity = '0';
        })
        resultTitle.forEach(result => {
            result.textContent = 'NONE'; 
        })
    
    })
})

function play(btn) {
    console.log('clciked twice');
    section2.style.display = 'none';
    section3.style.display = 'flex';

    result.forEach(res => {
        res.style.display = 'grid';
    })

    const playerChoice = btn.cloneNode(true);
    const playerDiv = section3.querySelector('.player');
    const playerSpan = playerDiv.querySelector('span');
    
    playerDiv.insertBefore(playerChoice, playerSpan);

    const randomIndex = Math.floor(Math.random() * optionButtons.length);
    const originalValue = optionButtons[randomIndex]
    const computerChoice = originalValue.cloneNode(true);

    const computerDiv = section3.querySelector('.computer');
    const circleBtn = computerDiv.querySelector('.circle');

    setTimeout(() => {
        computerDiv.replaceChild(computerChoice, circleBtn);
        checkResult(playerChoice, computerChoice)
    }, 2000);
}

function checkResult(player, computer) {
    result.forEach(res => {
        res.style.opacity = '1';
    })
    const playerValue = player.getAttribute('data-value');
    const computerValue = computer.getAttribute('data-value');

    const rules = {
        rock: {beats: 'scissors', losesTo: 'paper'},
        paper: {beats: 'rock', losesTo: 'scissors'},
        scissors: {beats: 'paper', losesTo: 'rock'}
    };

    if (playerValue === computerValue) {
        console.log('boom');
        resultTitle.forEach(result => {
            result.textContent = "IT'S A TIE";
        })
    } else if (rules[playerValue].beats === computerValue) {
        console.log('panes')
        resultTitle.forEach(result => {
            result.textContent = "YOU WIN";
        })
        count++;
        scoreValue.textContent = count;
        localStorage.setItem('score', count);
        console.log(count);
    } else {
        console.log('pop');
        resultTitle.forEach(result => {
            result.textContent = "YOU LOSE";
        })
    }
    
}