const questions = [
    "Is your birthday in the first half of the year (January-June)?",
    "Is your birthday in an odd-numbered month?",
    "Is your birthday on an even-numbered day?",
    "Is your birthday in the first half of the month (1st-15th)?",
    "Is your birth month in the first half of its respective half-year?"
];

let currentQuestion = 0;
let answers = [];

const questionElement = document.getElementById('question');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

function showQuestion() {
    questionElement.textContent = questions[currentQuestion];
    updateProgress();
    fadeIn(questionContainer);
}

function processAnswer(answer) {
    answers.push(answer);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        fadeOut(questionContainer, showQuestion);
    } else {
        fadeOut(questionContainer, showResult);
    }
}

function showResult() {
    const guessedMonth = guessMonth();
    const guessedDay = guessDay();
    
    resultElement.textContent = `We guess your birthday is around ${guessedMonth} ${guessedDay}!`;
    resultContainer.style.display = 'block';
    fadeIn(resultContainer);
    triggerConfetti();
}

function guessMonth() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    let possibleMonths = [...months];
    
    if (answers[0]) possibleMonths = possibleMonths.slice(0, 6);
    else possibleMonths = possibleMonths.slice(6);
    
    if (answers[1]) possibleMonths = possibleMonths.filter((_, index) => index % 2 === 0);
    else possibleMonths = possibleMonths.filter((_, index) => index % 2 === 1);
    
    if (answers[4]) possibleMonths = [possibleMonths[0], possibleMonths[1]];
    else possibleMonths = [possibleMonths[2], possibleMonths[3]];
    
    return possibleMonths[Math.floor(Math.random() * possibleMonths.length)];
}

function guessDay() {
    let start, end;
    
    if (answers[3]) {
        start = 1;
        end = 15;
    } else {
        start = 16;
        end = 30;
    }
    
    if (answers[2]) {
        return 2 * Math.floor(Math.random() * ((end - start + 1) / 2)) + start;
    } else {
        return 2 * Math.floor(Math.random() * ((end - start + 1) / 2)) + start + 1;
    }
}

function restart() {
    currentQuestion = 0;
    answers = [];
    fadeOut(resultContainer, () => {
        resultContainer.style.display = 'none';
        questionContainer.style.display = 'block';
        showQuestion();
    });
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function fadeIn(element) {
    element.classList.add('active');
}

function fadeOut(element, callback) {
    element.classList.remove('active');
    setTimeout(callback, 500);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

yesBtn.addEventListener('click', () => processAnswer(true));
noBtn.addEventListener('click', () => processAnswer(false));
restartBtn.addEventListener('click', restart);

showQuestion();
