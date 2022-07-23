const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  console.log("Going to home page");
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  console.log("Going to notes page");
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('/api/notes/:id', (req, res) => {
    let storedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(storedNotes[Number(req.params.id)]);
});

app.listen(PORT, () =>
  console.log(`listening at http://localhost:${PORT}`)
);