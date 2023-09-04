let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let gameActive = true;

// Inside Score Text (Updated)
const player1ScoreUpdate = document.getElementById('player-1-score-update');
const player2ScoreUpdate = document.getElementById('player-2-score-update');

// Message Text
const messageText = document.getElementById('message');

// Dice Image
const diceImage = document.getElementById('dice-image');

// Separate "Roll Now" buttons for each player
const rollPlayer1Btn = document.getElementById('roll-player-1');
const rollPlayer2Btn = document.getElementById('roll-player-2');

// Reset Button
const resetBtn = document.getElementById('reset-btn');

rollPlayer1Btn.addEventListener('click', () => rollDice(1));
rollPlayer2Btn.addEventListener('click', () => rollDice(2));
resetBtn.addEventListener('click', resetGame);

// Disabling Player 2's roll button at the start
rollPlayer2Btn.disabled = true;

function rollDice(player) {
    if (gameActive) {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        diceImage.src = `images/dice-${randomNumber}.png`; 

        if (player === 1) {
            player1Score += randomNumber;
            player1ScoreUpdate.textContent = player1Score;
        } else {
            player2Score += randomNumber;
            player2ScoreUpdate.textContent = player2Score;
        }

        if (player1Score >= 30) {
            messageText.textContent = "😎PLAYER 1 WINS!🥳";
        } else if (player2Score >= 30) {
            messageText.textContent = "😎PLAYER 2 WINS!🥳";
        } else {
            player1Turn = !player1Turn;
            updateMessage();
        }

        if (player1Turn) {
            rollPlayer2Btn.disabled = true;
            rollPlayer1Btn.disabled = false;
        } else {
            rollPlayer1Btn.disabled = true;
            rollPlayer2Btn.disabled = false;
        }

        if (player1Score >= 30 || player2Score >= 30) {
            endGame();
        }
    }
}

function updateMessage() {
    if (player1Turn) {
        messageText.textContent = "PLAYER 1 TURN";
    } else {
        messageText.textContent = "PLAYER 2 TURN";
    }
}

function endGame() {
    gameActive = false;
    rollPlayer1Btn.disabled = true;
    rollPlayer2Btn.disabled = true;
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    player1Turn = true;
    player1ScoreUpdate.textContent = '0';
    player2ScoreUpdate.textContent = '0';
    messageText.textContent = 'PLAYER 1 TURN';
    diceImage.src = 'images/dice-1.png';
    gameActive = true;
    rollPlayer1Btn.disabled = false;
    rollPlayer2Btn.disabled = true; 
}

