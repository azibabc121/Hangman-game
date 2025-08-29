

const lettercontainer = document.getElementById("letter-container");
const optioncontainer = document.getElementById("option-container");
const userinput = document.getElementById("user-input-section");
const newgamecontainer = document.querySelector(".new-game-container");
const newgamebutton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const container = document.querySelector(".container");

canvas.width = 200;
canvas.height = 200;

const resulttext = document.getElementById("result-text");
const optionButtons = document.querySelectorAll(".option");

let selectedword = '';
let remainingguesses = 6;
let underscores = '';

optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        lettercontainer.classList.remove("hide");
        optioncontainer.style.display = "none";
        startgame(button.id);
    });
});

function startgame(category) {
    selectedword = options[category][Math.floor(Math.random() * options[category].length)].toUpperCase();
    underscores = '-'.repeat(selectedword.length);
    userinput.innerHTML = underscores.split('').join(' ');
    GenerateLetterbuttons();
}

function GenerateLetterbuttons() {
    lettercontainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        let button = document.createElement('button');
        button.innerHTML = String.fromCharCode(i);
        button.classList.add('letter');
        button.addEventListener('click', handleLetterClick);
        lettercontainer.appendChild(button);
    }
}

function handleLetterClick(event) {
    const letter = event.target.innerHTML;
    event.target.disabled = true;

    if (selectedword.includes(letter)) {
        UpdateGuessWord(letter);
    } else {
        remainingguesses--;
        drawhangman();
    }

    CheckWinprLoss();
}

function UpdateGuessWord(letter) {
    let GuessWord = '';
    for (let i = 0; i < selectedword.length; i++) {
        if (selectedword[i] === letter) {
            GuessWord += letter;
        } else {
            GuessWord += underscores[i];
        }
    }

    underscores = GuessWord;
    userinput.innerHTML = underscores.split('').join(' ');
}

function CheckWinprLoss() {
    if (selectedword === underscores) {
        resulttext.innerHTML = "🎉 YOU WIN!!";
        end();
    } else if (remainingguesses <= 0) {
        resulttext.innerHTML = `❌ YOU LOSE. The word was: ${selectedword}`;
        end();
    }
}

function end() {
    container.style.display = 'none';
    newgamecontainer.style.display = 'block';
}

let options = {
    fruits: ["Apple", "Blueberry", "Mandarin", "Pineapple", "Pomegranate", "Watermelon"],
    Animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
    countries: ["Pakistan", "India", "America", "Zimbabwe", "Dominica", "Hungary", "Switzerland"]
};

function drawhangman() {
    switch (remainingguesses) {
        case 5: drawbase(); break;
        case 4: drawpole(); break;
        case 3: drawhead(); break;
        case 2: drawbody(); break;
        case 1: drawleftarm(); break;
        case 0:
            drawrightarm();
            drawleftleg();
            drawrightleg();
            break;
    }
}

// Hangman drawing functions
function drawbase() {
    context.beginPath();
    context.moveTo(10, 180);
    context.lineTo(180, 180);
    context.stroke();
}

function drawpole() {
    context.beginPath();
    context.moveTo(80, 180);
    context.lineTo(80, 30);
    context.lineTo(150, 30);
    context.lineTo(150, 50);
    context.stroke();
}

function drawhead() {
    context.beginPath();
    context.arc(150, 70, 15, 0, Math.PI * 2);
    context.stroke();
}

function drawbody() {
    context.beginPath();
    context.moveTo(150, 85);
    context.lineTo(150, 120);
    context.stroke();
}

function drawleftarm() {
    context.beginPath();
    context.moveTo(150, 95);
    context.lineTo(130, 115);
    context.stroke();
}

function drawrightarm() {
    context.beginPath();
    context.moveTo(150, 95);
    context.lineTo(170, 115);
    context.stroke();
}

function drawleftleg() {
    context.beginPath();
    context.moveTo(150, 120);
    context.lineTo(130, 160);
    context.stroke();
}

function drawrightleg() {
    context.beginPath();
    context.moveTo(150, 120);
    context.lineTo(170, 160);
    context.stroke();
}

newgamebutton.addEventListener("click", function () {
    window.location.reload();
});
