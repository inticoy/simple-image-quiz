
const baseUrl = window.location.pathname.replace(/\/$/, ''); // Adjust base URL dynamically

const quizItems = [
    { image: '/simple-image-quiz/images/%EC%95%8C%EC%94%A8.jpeg', answer: '알씨' },
    { image: '/simple-image-quiz/images/%EA%B3%A0%EC%96%91%EC%9D%B4.jpeg', answer: '고양이' },
    { image: '/simple-image-quiz/images/%EB%B2%9A%EA%BD%83.jpeg', answer: '벚꽃' },
    { image: '/simple-image-quiz/images/%EA%B0%9C.jpeg', answer: '개' },
];


// Initialize variables
let currentIndex = 0;
let userAnswers = [];
let timer;
const quizImage = document.getElementById('quiz-image');
const question = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-answer');
const startButton = document.getElementById('start-game');
const quizContainer = document.getElementById('quiz-container');
const resultsDiv = document.getElementById('results');

// Show the current question
function showQuestion() {
    if (currentIndex < quizItems.length) {
        const currentItem = quizItems[currentIndex];
        quizImage.src = currentItem.image;
        question.textContent = `What is this?`;
        answerInput.value = '';
        answerInput.focus();
    } else {
        clearInterval(timer); // Stop the timer when the quiz is over
        showResults();
    }
}

// Automatically move to the next question after 3 seconds
function startAutoQuiz() {
    timer = setInterval(() => {
        submitAnswer(); // Automatically submit the current answer
    }, 3000);
}

// Check the user's answer and move to the next question
function submitAnswer() {
    const userAnswer = answerInput.value.trim();
    userAnswers.push(userAnswer);
    currentIndex++;
    showQuestion();
}

// Show the results
function showResults() {
    quizContainer.style.display = 'none';
    resultsDiv.innerHTML = '<h2>Results:</h2><ul>';
    let score = 0;

    quizItems.forEach((item, index) => {
        const correct = item.answer.toLowerCase();
        const user = (userAnswers[index] || '').toLowerCase();
        const isCorrect = correct === user;
        if (isCorrect) score++;
        resultsDiv.innerHTML += `<li>${item.answer}: ${
            isCorrect ? 'Correct' : `Wrong (You answered: ${userAnswers[index]})`
        }</li>`;
    });

    resultsDiv.innerHTML += `</ul><p>Your score: ${score} / ${quizItems.length}</p>`;
}

// Event listeners
startButton.addEventListener('click', () => {
    startButton.style.display = 'none'; // Hide the start button
    quizContainer.style.display = 'block'; // Show the quiz container
    showQuestion(); // Show the first question
    startAutoQuiz(); // Start the automatic quiz
});

submitButton.addEventListener('click', () => {
    submitAnswer();
});

// Allow submission via Enter key
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitAnswer();
    }
});

