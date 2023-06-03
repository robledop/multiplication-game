const gridElement = document.querySelector(".grid");
const questionElement = document.getElementById("question");
const inputElement = document.getElementById("input");
const hintElement = document.getElementById("hint");
const keyboardElement = document.getElementById("keyboard");

let firstNumber;
let secondNumber;
let correctAnswer;

for (let row = 0; row <= 12; row++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    gridElement.appendChild(rowElement);
    for (let col = 0; col < 13; col++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (row === 0 && col === 0) {
            cellElement.classList.add("grid-header");
        } else if (row === 0) {
            cellElement.innerText = `${col}`;
            cellElement.classList.add("grid-header");
        } else if (col === 0) {
            cellElement.innerText = `${row}`;
            cellElement.classList.add("grid-header");
        } else {
            cellElement.classList.add("grid-body");
            cellElement.dataset.col = col;
            cellElement.dataset.row = row;
        }
        rowElement.appendChild(cellElement);
    }
}

function generateNewQuestion() {
    firstNumber = Math.ceil(Math.random() * 12);
    secondNumber = Math.ceil(Math.random() * 12);
    correctAnswer = firstNumber * secondNumber;
    questionElement.innerText = `What is ${firstNumber} x ${secondNumber}?`;
}
generateNewQuestion();

inputElement.focus();
inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

keyboardElement.addEventListener("click", function (event) {
    let key = event.target.dataset.key;
    switch (key) {
        case "backspace":
            inputElement.value = inputElement.value.slice(0, -1);
            break;
        case "enter":
            checkAnswer();
            break;
        default:
            inputElement.value += key;
            break;
    }
});

function checkAnswer() {
    hintElement.style.opacity = 0;
    let answer = Number(inputElement.value);
    const cell = document.querySelector(
        `.cell[data-row="${firstNumber}"][data-col="${secondNumber}"]`
    );
    cell.classList.remove("wrong");
    cell.classList.remove("grid-body");
    if (answer === correctAnswer) {
        cell.classList.add("correct");
        cell.innerText = `✅`;
    } else {
        cell.classList.add("wrong");
        cell.innerText = `💥`;
        hintElement.innerText = `Wrong! ${firstNumber} x ${secondNumber} = ${correctAnswer}`;
        hintElement.style.opacity = 1;
    }
    inputElement.value = "";
    inputElement.focus();
    generateNewQuestion();
}
