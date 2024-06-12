const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const keep_alive = require('./keep_alive.js');

const targetTime = new Date('2024-06-14T00:00:00+03:00');
const intervalMilliseconds = 7 * 24 * 60 * 60 * 1000;
let resetCount = 0;

app.get('/', (req, res) => {
  res.send('Sayaç uygulamasına hoş geldiniz!');
});

app.get('/counter', (req, res) => {
  const now = new Date();
  const elapsedMilliseconds = now - targetTime;
  const totalSeconds = elapsedMilliseconds % intervalMilliseconds / 1000;

  if (totalSeconds < 1 && elapsedMilliseconds >= 1) {
    resetCount++;
  }

  res.json({ seconds: Math.floor(totalSeconds), resets: resetCount });
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});