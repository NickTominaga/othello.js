const state = {
  squares: [],
  xIsNext: true,
  stepNumber: 0
};

const boardElement = document.getElementById('board');
const scoreElement = document.getElementById('score');
const statusElement = document.getElementById('status');

document.getElementById('pass-button').addEventListener('click', passTurn);
document.getElementById('giveup-button').addEventListener('click', giveUp);
document.getElementById('reset-button').addEventListener('click', resetGame);

bootstrap();

async function bootstrap() {
  const response = await fetch('/api/initial-state');
  const initialState = await response.json();
  state.squares = initialState.squares;
  state.xIsNext = initialState.xIsNext;
  state.stepNumber = initialState.stepNumber;
  render();
}

function createInitialBoard() {
  const squares = Array(64).fill(null);
  squares[27] = squares[36] = 'X';
  squares[28] = squares[35] = 'O';
  return squares;
}

function resetGame() {
  state.squares = createInitialBoard();
  state.xIsNext = true;
  state.stepNumber = 0;
  render();
}

function passTurn() {
  if (state.stepNumber > 59) {
    return;
  }
  state.xIsNext = !state.xIsNext;
  render();
}

function giveUp() {
  if (state.stepNumber > 59) {
    return;
  }
  const fillWith = state.xIsNext ? 'O' : 'X';
  state.squares = state.squares.map((square) => square ?? fillWith);
  state.stepNumber = 60;
  render();
}

function handleClick(i) {
  const squares = state.squares.slice();
  if (state.stepNumber >= 60 || squares[i]) {
    return;
  }

  const toFlip = wololo(i);
  if (toFlip.length === 0) {
    return;
  }

  const current = state.xIsNext ? 'X' : 'O';
  toFlip.forEach((index) => {
    squares[index] = current;
  });
  squares[i] = current;

  state.squares = squares;
  state.stepNumber += 1;
  state.xIsNext = !state.xIsNext;

  render();
}

function wololo(i) {
  let toFlip = [];
  for (let x = -1; x < 2; x += 1) {
    for (let y = -1; y < 2; y += 1) {
      if (x !== 0 || y !== 0) {
        toFlip = toFlip.concat(wololoLine(i, x, y));
      }
    }
  }
  return toFlip;
}

function wololoLine(i, xStep, yStep) {
  const squares = state.squares.slice();
  const toFlip = [];
  const current = state.xIsNext ? 'X' : 'O';

  let x = getX(i) + xStep;
  let y = getY(i) + yStep;

  while (x >= 0 && x < 8 && y >= 0 && y < 8) {
    const currentSquare = squares[getId(x, y)];
    if (!currentSquare) {
      return [];
    }
    if (currentSquare === current) {
      return toFlip;
    }

    toFlip.push(getId(x, y));
    x += xStep;
    y += yStep;
  }

  return [];
}

function getX(i) {
  return i % 8;
}

function getY(i) {
  return Math.floor(i / 8);
}

function getId(x, y) {
  return y * 8 + x;
}

function calculateScore(squares) {
  let x = 0;
  let o = 0;
  squares.forEach((square) => {
    if (square === 'X') {
      x += 1;
    } else if (square === 'O') {
      o += 1;
    }
  });
  return { x, o };
}

function calculateWinner(score) {
  if (score.o + score.x === 64) {
    return score.x > score.o ? 'X' : 'O';
  }
  return null;
}

function render() {
  boardElement.innerHTML = '';

  state.squares.forEach((value, index) => {
    const button = document.createElement('button');
    button.className = 'square';
    button.type = 'button';
    button.textContent = value ?? '';
    button.addEventListener('click', () => handleClick(index));
    boardElement.appendChild(button);
  });

  const score = calculateScore(state.squares);
  const winner = calculateWinner(score);

  scoreElement.textContent = `X: ${score.x} | O: ${score.o}`;
  statusElement.textContent = winner
    ? `Winner: ${winner}`
    : `Next player: ${state.xIsNext ? 'X' : 'O'}`;
}
