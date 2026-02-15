const express = require('express');
const { createInitialBoard, calculateScore, calculateWinner } = require('../lib/game');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/api/initial-state', (req, res) => {
  const squares = createInitialBoard();
  const score = calculateScore(squares);
  const winner = calculateWinner(score);
  res.json({ squares, score, winner, xIsNext: true, stepNumber: 0 });
});

module.exports = router;
