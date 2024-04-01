import {
  BLOCK_SIZE,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  EMPTY_SQUARE,
  FILLED_SQUARE,
  PIECES,
} from "./consts.js";

let totalScore = 0;
const score = document.getElementById("score");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT);
let piece = getRandomPiece();

canvas.width = BOARD_WIDTH * BLOCK_SIZE;
canvas.height = BOARD_HEIGHT * BLOCK_SIZE;
context.scale(BLOCK_SIZE, BLOCK_SIZE);

function update(time = 0) {
  autoDrop(time);
  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === FILLED_SQUARE) {
        context.fillStyle = "#08c9bf";
        context.fillRect(x, y, FILLED_SQUARE, FILLED_SQUARE);
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === FILLED_SQUARE) {
        context.fillStyle = "#08c9bf";
        context.fillRect(
          x + piece.position.x,
          y + piece.position.y,
          FILLED_SQUARE,
          FILLED_SQUARE
        );
      }
    });
  });
}

function createBoard(width, height) {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(EMPTY_SQUARE));
}

function getRandomShape() {
  return PIECES[Math.floor(Math.random() * PIECES.length)];
}

function getRandomPosition() {
  const centeredXPosition = BOARD_WIDTH / 2 - 2;

  return {
    x: Math.floor(centeredXPosition),
    y: 0,
  };
}

function getRandomPiece() {
  return {
    shape: getRandomShape(),
    position: getRandomPosition(),
  };
}

function checkCollision(pieceX, pieceY) {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== EMPTY_SQUARE &&
        board[y + pieceY]?.[x + pieceX] !== EMPTY_SQUARE
      );
    });
  });
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === FILLED_SQUARE) {
        board[y + piece.position.y][x + piece.position.x] = FILLED_SQUARE;
      }
    });
  });
  piece = getRandomPiece();

  if (!checkCollision(piece.position.x, piece.position.y)) return;
  window.alert("GAME OVER");
  board.forEach((row) => row.fill(EMPTY_SQUARE));
}

function removeCompletedRows() {
  const rowsToRemove = [];
  board.forEach((row, y) => {
    if (row.every((value) => value === FILLED_SQUARE)) {
      rowsToRemove.push(y);
    }
  });
  rowsToRemove.forEach((row) => {
    board.splice(row, 1);
    board.unshift(Array(BOARD_WIDTH).fill(EMPTY_SQUARE));
    totalScore = totalScore + 100;
    score.innerText = totalScore;
  });
}

window.addEventListener("keydown", (event) => {
  const positionX = piece.position.x;
  const positionY = piece.position.y;
  if (
    event.key === "ArrowLeft" &&
    !checkCollision(positionX - FILLED_SQUARE, positionY)
  ) {
    piece.position.x--;
  }

  if (
    event.key === "ArrowRight" &&
    !checkCollision(positionX + FILLED_SQUARE, positionY)
  ) {
    piece.position.x++;
  }

  if (event.key === "ArrowDown") pieceGoDown();
  if (event.key === "ArrowUp") rotatePiece();
});

function pieceGoDown() {
  piece.position.y++;
  if (!checkCollision(piece.position.x, piece.position.y)) return;
  piece.position.y--;
  solidifyPiece();
  removeCompletedRows();
}

function rotatePiece() {
  const rotatedPiece = [];
  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = [];
    for (let j = piece.shape.length - 1; j >= 0; j--) {
      row.push(piece.shape[j][i]);
    }
    rotatedPiece.push(row);
  }

  const previousShape = piece.shape;
  piece.shape = rotatedPiece;

  if (!checkCollision(piece.position.x, piece.position.y)) return;
  piece.shape = previousShape;
}

let dropCounter = 0;
let lastTime = 0;
function autoDrop(time) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;

  if (dropCounter <= 200) return;
  pieceGoDown();
  dropCounter = 0;
}

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("start-wrapper").remove();
  update();
});
