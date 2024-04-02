// Canvas variables
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 550;
canvas.height = 450;

const MARGIN_BOTTOM = 25;
const CENETER_IN_CANVAS = 2;

// Blocks variables
const BLOCK_WIDTH = 25;
const BLOCK_HEIGHT = 10;
const BLOCK_PADDING = 2;
const BLOCK_COLUMNS = Math.floor(canvas.width / (BLOCK_WIDTH + BLOCK_PADDING));
const BLOCK_ROWS = Math.floor(
  canvas.height / (BLOCK_HEIGHT + BLOCK_PADDING) / 3
);
const BLOCK_OFFSET =
  (canvas.width - BLOCK_COLUMNS * (BLOCK_WIDTH + BLOCK_PADDING)) / 2;
const BLOCK_STATUS = {
  ACTIVE: 1,
  DESTROYED: 0,
};
const blocks = [];
for (let column = 0; column < BLOCK_COLUMNS; column++) {
  blocks[column] = [];
  for (let row = 0; row < BLOCK_ROWS; row++) {
    blocks[column][row] = {
      color: "#09f",
      status: BLOCK_STATUS.ACTIVE,
      x: column * (BLOCK_WIDTH + BLOCK_PADDING) + BLOCK_OFFSET,
      y: row * (BLOCK_HEIGHT + BLOCK_PADDING) + BLOCK_OFFSET,
    };
  }
}

//Ball variables
const BALL_RADIUS = 3;
let ball = {
  x: (canvas.width - BALL_RADIUS) / CENETER_IN_CANVAS,
  xDirection: 3,
  y: canvas.height - MARGIN_BOTTOM,
  yDirection: -3,
  radius: BALL_RADIUS,
};

//Paddle variables
const PADDLE_WIDTH = 50;
const PADDEL_HEIGHT = 5;
const PADDLE_SENSIVITY = 5;
let paddle = {
  x: (canvas.width - PADDLE_WIDTH) / CENETER_IN_CANVAS,
  y: canvas.height - MARGIN_BOTTOM - PADDEL_HEIGHT,
};
let rightPulsed = false;
let leftPulsed = false;

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();
  context.closePath();
}

function drawPaddle() {
  context.fillStyle = "#fff";
  context.fillRect(paddle.x, paddle.y, PADDLE_WIDTH, PADDEL_HEIGHT);
}

function drawBlocks() {
  for (let column = 0; column < BLOCK_COLUMNS; column++) {
    for (let row = 0; row < BLOCK_ROWS; row++) {
      const currentBlock = blocks[column][row];
      if (currentBlock.status === BLOCK_STATUS.DESTROYED) continue;

      context.fillStyle = currentBlock.color;
      context.fillRect(
        currentBlock.x,
        currentBlock.y,
        BLOCK_WIDTH,
        BLOCK_HEIGHT
      );
    }
  }
}

function checkCollisions() {
  for (let column = 0; column < BLOCK_COLUMNS; column++) {
    for (let row = 0; row < BLOCK_ROWS; row++) {
      const currentBlock = blocks[column][row];
      if (currentBlock.status === BLOCK_STATUS.DESTROYED) continue;
      if (
        ball.x > currentBlock.x &&
        ball.x < currentBlock.x + BLOCK_WIDTH &&
        ball.y > currentBlock.y &&
        ball.y < currentBlock.y + BLOCK_HEIGHT
      ) {
        ball.yDirection = -ball.yDirection;
        currentBlock.status = BLOCK_STATUS.DESTROYED;
      }
    }
  }
}

function ballMovement() {
  if (
    ball.x + ball.xDirection > canvas.width - ball.radius ||
    ball.x + ball.xDirection < ball.radius
  ) {
    ball.xDirection = -ball.xDirection;
  }

  if (ball.y + ball.yDirection < ball.radius) {
    ball.yDirection = -ball.yDirection;
  }

  if (
    ball.x + ball.xDirection > paddle.x &&
    ball.x + ball.xDirection < paddle.x + PADDLE_WIDTH &&
    ball.y + ball.yDirection > paddle.y
  ) {
    ball.yDirection = -ball.yDirection;
  } else if (ball.y + ball.yDirection > canvas.height - ball.radius) {
    alert("GAME OVER");
    document.location.reload();
  }

  ball.x += ball.xDirection;
  ball.y += ball.yDirection;
}

function paddleMovement() {
  const paddleRealPosition = paddle.x + PADDLE_WIDTH;
  if (rightPulsed && paddleRealPosition <= canvas.width) {
    paddle.x += PADDLE_SENSIVITY;
  } else if (leftPulsed && paddle.x > 0) {
    paddle.x -= PADDLE_SENSIVITY;
  }
}

function checkWin() {
  let allDestroyed = true;
  for (let column = 0; column < BLOCK_COLUMNS; column++) {
    for (let row = 0; row < BLOCK_ROWS; row++) {
      const currentBlock = blocks[column][row];
      if (currentBlock.status !== BLOCK_STATUS.ACTIVE) continue;
      allDestroyed = false;
    }
  }

  if (!allDestroyed) return;

  alert("YOU ARE THE WINNER!!!");
  document.location.reload();
}

function initKeyboardEvents() {
  window.addEventListener("keydown", keyDownHandler);
  window.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(event) {
    const { key } = event;
    if (key == "ArrowLeft" || key == "left" || key == "a") {
      leftPulsed = true;
    } else if (key == "ArrowRight" || key == "right" || key == "d") {
      rightPulsed = true;
    }
  }

  function keyUpHandler(event) {
    const { key } = event;
    if (key == "ArrowLeft" || key == "left" || key == "a") {
      leftPulsed = false;
    } else if (key == "ArrowRight" || key == "right" || key == "d") {
      rightPulsed = false;
    }
  }
}

function draw() {
  //Restart frame
  window.requestAnimationFrame(draw);

  // Clean canvas
  clearCanvas();

  // Draw elements
  drawBall();
  drawPaddle();
  drawBlocks();

  // Collisions and movements
  checkCollisions();
  ballMovement();
  paddleMovement();
  checkWin();
}

draw();
initKeyboardEvents();
