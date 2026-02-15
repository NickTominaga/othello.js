function createInitialBoard() {
  const squares = Array(64).fill(null);
  squares[27] = squares[36] = 'X';
  squares[28] = squares[35] = 'O';
  return squares;
}

function calculateScore(squares) {
  let x = 0;
  let o = 0;

  squares.forEach((square) => {
    if (square === 'X') x += 1;
    if (square === 'O') o += 1;
  });

  return { x, o };
}

function calculateWinner(score) {
  if (score.x + score.o === 64) {
    return score.x > score.o ? 'X' : 'O';
  }
  return null;
}

module.exports = {
  createInitialBoard,
  calculateScore,
  calculateWinner
};
