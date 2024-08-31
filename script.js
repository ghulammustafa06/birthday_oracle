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

function restart() {
    start = 1;
    end = 365;
    guessCount = 0;
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    questionContainer.classList.remove('active');
    resultContainer.classList.remove('active');
    progressBar.style.width = '0%';
    currentQuestionSpan.textContent = '1';
    updateQuestion();
}

function handleAnswer(isYes) {
    if (isYes) {
        end = mid;
    } else {
        start = mid + 1;
    }

    if (start === end) {
        gameOver(`<h2>Your birthday is on ${dateFromDayOfYear(start)}!</h2>I guessed it in ${guessCount} tries.`);
    } else if (start > end || guessCount >= maxGuesses) {
        gameOver(`<h2>I couldn't guess your exact birthday</h2>But I know it's between ${dateFromDayOfYear(start)} and ${dateFromDayOfYear(end)}. Let's try again!`);
    } else {
        updateQuestion();
    }
}

yesBtn.addEventListener('click', () => handleAnswer(true));
noBtn.addEventListener('click', () => handleAnswer(false));
restartBtn.addEventListener('click', restart);

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'y') {
        yesBtn.click();
    } else if (event.key.toLowerCase() === 'n') {
        noBtn.click();
    }
});

totalQuestionsSpan.textContent = maxGuesses;
updateQuestion();