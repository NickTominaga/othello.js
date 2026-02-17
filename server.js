const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();
const PORT = Number(process.env.PORT || 3450);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

const server = app.listen(PORT, () => {
  console.log(`Othello app listening on http://localhost:${PORT}`);
});

module.exports = server;
