
const baseUrl = window.location.pathname.replace(/\/$/, ''); // Adjust base URL dynamically

const quizItems = [
    { image: `${baseUrl}/images/알씨.jpeg`, answer: '알씨' },
    { image: `${baseUrl}/images/고양이.jpeg`, answer: '고양이' },
    { image: `${baseUrl}/images/벚꽃.jpeg`, answer: '벚꽃' },
    { image: `${baseUrl}/images/개.jpeg`, answer: '개' }
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

