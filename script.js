const question = document.getElementById('question');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');

let start = 1;
let end = 365;
let mid;
let guessCount = 0;
const maxGuesses = 10;

function updateQuestion() {
    mid = Math.floor((start + end) / 2);
    let midDate = dateFromDayOfYear(mid);
    question.textContent = `Is your birthday before or on ${midDate}?`;
    questionContainer.classList.add('active');
    guessCount++;
    currentQuestionSpan.textContent = guessCount;
    updateProgressBar();
}

function updateProgressBar() {
    const progress = (guessCount / maxGuesses) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function dateFromDayOfYear(dayOfYear) {
    const date = new Date(new Date().getFullYear(), 0);
    date.setDate(dayOfYear);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

function gameOver(message) {
    result.innerHTML = message;
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.classList.add('active');
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function guessBirthday() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    let possibleMonths = [...months];
    
    if (answers[0]) {
        possibleMonths = possibleMonths.slice(0, 6);
    } else {
        possibleMonths = possibleMonths.slice(6);
    }
    
    if (answers[1]) {
        possibleMonths = possibleMonths.filter((_, index) => index % 2 === 0);
    } else {
        possibleMonths = possibleMonths.filter((_, index) => index % 2 === 1);
    }
    
    if (answers[3]) {
        possibleMonths = [possibleMonths[0], possibleMonths[1]];
    } else {
        possibleMonths = [possibleMonths[2]];
    }
    
    const guessedMonth = possibleMonths[Math.floor(Math.random() * possibleMonths.length)];
    
    let startDay, endDay;
    if (answers[2]) { 
        startDay = 16;
        endDay = answers[4] ? 31 : 23; 
    } else {
        startDay = 1;
        endDay = 15;
    }
    
    const guessedDay = Math.floor(Math.random() * (endDay - startDay + 1)) + startDay;
    
    return [guessedMonth, guessedDay];
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

document.addEventListener('keydown', (event) => {
    if (event.key === 'y' || event.key === 'Y') {
        yesBtn.click();
    } else if (event.key === 'n' || event.key === 'N') {
        noBtn.click();
    }
});

showQuestion();