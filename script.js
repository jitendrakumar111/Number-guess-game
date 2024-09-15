const minNumber = 1;
let maxNumber = 100;
let maxAttempts = 10;

let secretNumber;
let attemptsLeft;
let guessHistory = [];

const minNumberElement = document.getElementById('min-number');
const maxNumberElement = document.getElementById('max-number');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const resetButton = document.getElementById('reset-button');
const messageElement = document.getElementById('message');
const attemptsLeftElement = document.getElementById('attempts-left');
const guessHistoryElement = document.getElementById('guess-history');
const congratsModal = document.getElementById('congrats-modal');
const gameOverModal = document.getElementById('game-over-modal');
const secretNumberElement = document.getElementById('secret-number');
const closeButtons = document.querySelectorAll('.close');
const difficultySelect = document.getElementById('difficulty');

const startGame = () => {
    const difficulty = difficultySelect.value;
    switch (difficulty) {
        case 'easy':
            maxNumber = 50;
            maxAttempts = 10;
            break;
        case 'medium':
            maxNumber = 100;
            maxAttempts = 10;
            break;
        case 'hard':
            maxNumber = 200;
            maxAttempts = 5;
            break;
    }

    secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    attemptsLeft = maxAttempts;
    guessHistory = [];
    guessInput.value = '';
    messageElement.textContent = '';
    attemptsLeftElement.textContent = attemptsLeft;
    guessHistoryElement.textContent = `Guess History: ${guessHistory.join(', ')}`;
    minNumberElement.textContent = minNumber;
    maxNumberElement.textContent = maxNumber;
    guessButton.disabled = false;
    resetButton.style.display = 'inline-block';
    closeModals();
};

const makeGuess = () => {
    const guess = Number(guessInput.value);

    // Ensure guess is a valid number within range
    if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
        messageElement.textContent = `Please enter a number between ${minNumber} and ${maxNumber}.`;
        return;
    }

    // Update attempts and guess history
    attemptsLeft--;
    attemptsLeftElement.textContent = attemptsLeft;
    guessHistory.push(guess);
    guessHistoryElement.textContent = `Guess History: ${guessHistory.join(', ')}`;

    if (guess === secretNumber) {
        messageElement.textContent = 'Congratulations! You guessed the number!';
        congratsModal.style.display = 'flex';
        guessButton.disabled = true;
    } else if (attemptsLeft === 0) {
        messageElement.textContent = 'Game Over!';
        secretNumberElement.textContent = secretNumber;
        gameOverModal.style.display = 'flex';
        guessButton.disabled = true;
    } else if (guess < secretNumber) {
        messageElement.textContent = 'Too low! Try again.';
    } else {
        messageElement.textContent = 'Too high! Try again.';
    }
};

const closeModals = () => {
    congratsModal.style.display = 'none';
    gameOverModal.style.display = 'none';
};

guessButton.addEventListener('click', makeGuess);
resetButton.addEventListener('click', startGame);
difficultySelect.addEventListener('change', startGame);
closeButtons.forEach(button => button.addEventListener('click', closeModals));

// Initialize the game
startGame();
