let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let gameActive = true;

const player1ScoreUpdate = document.getElementById('player-1-score-update');
const player2ScoreUpdate = document.getElementById('player-2-score-update');
const messageText = document.getElementById('message');
const diceImage = document.getElementById('dice-image');
const rollPlayer1Btn = document.getElementById('roll-player-1');
const rollPlayer2Btn = document.getElementById('roll-player-2');
const resetBtn = document.getElementById('reset-btn');
rollPlayer2Btn.disabled = true;

rollPlayer1Btn.addEventListener('click', () => rollDice(1));
rollPlayer2Btn.addEventListener('click', () => rollDice(2));
resetBtn.addEventListener('click', resetGame);

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
            displayBalloons(12);
        } else if (player2Score >= 30) {
            messageText.textContent = "😎PLAYER 2 WINS!🥳";
            displayBalloons(12); 
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

function getRandomColor() {
    const colors = ['#ff00cc', '#00ffcc', '#ffcc00', '#cc00ff', '#00ccff']; 
    return colors[Math.floor(Math.random() * colors.length)];
}

function displayBalloons(numBalloons) {
    for (let i = 0; i < numBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        const thread = document.createElement('div');
        thread.classList.add('thread');

        balloon.appendChild(thread);

        balloon.style.left = `${Math.random() * window.innerWidth}px`; 
        balloon.style.background = getRandomColor();

        document.body.appendChild(balloon);

        setTimeout(() => {
            document.body.removeChild(balloon);
        }, 8000); 
    }
}