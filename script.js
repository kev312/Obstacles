const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 400;

const carWidth = 50;
const carHeight = 40;
let carX = canvas.width / 2 - carWidth / 2;
const carY = canvas.height - carHeight - 10;
const carSpeed = 30;

const obstacles = [3];
const obstacleWidth = 35;
const obstacleHeight = 30;
const obstacleSpeed = 7;

let gameOver = false;

function drawCar() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    });
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacleSpeed;
    });

    if (obstacles.length > 0 && obstacles[0].y > canvas.height) {
        obstacles.shift();
    }
}

function createObstacle() {
    const x = Math.random() * (canvas.width - obstacleWidth);
    obstacles.push({ x, y: -obstacleHeight });
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (
            carX < obstacle.x + obstacleWidth &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + obstacleHeight &&
            carY + carHeight > obstacle.y
        ) {
            gameOver = true;
        }
    });
}



function gameLoop() {
    if (gameOver) {
        alert('Perdiste Juvenil');
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    drawObstacles();
    moveObstacles();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && carX > 0) {
        carX -= carSpeed;
    } else if (event.key === 'ArrowRight' && carX < canvas.width - carWidth) {
        carX += carSpeed;
    }
});

document.getElementById('left').addEventListener('click', () => {
    if (carX > 0) {
        carX -= carSpeed;
    }
});

document.getElementById('right').addEventListener('click', () => {
    if (carX < canvas.width - carWidth) {
        carX += carSpeed;
    }
});

setInterval(createObstacle, 2000);
gameLoop();
