const express = require("express");
const app = express();

const notes = require("./data/notes-data");
app.use(express.json());

app.get("/notes/:noteId", (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if(!foundNote || foundNote === undefined) {
    res.status(400).send(`Note id not found: ${req.params.noteId}`);
    
  } else {
    res.json({ data: foundNote });
  }
  
});

app.get("/notes", (req, res) => {
  res.json({ data: notes });
});

let lastNoteId = notes.reduce((maxId, note) => Math.max(maxId, note.id), 0);
// TODO: Add ability to create a new note
app.post("/notes", (req, res, next) => {
  const { data: { id, text } = {} } = req.body;
  if(!text || req.body === undefined){
    res.sendStatus(400);
   
  } else {
     const newNote = {
      id: ++lastNoteId, 
      text
    };
    notes.push(newNote);
    res.status(201).json({ data: newNote });
  }
});
// TODO: Add not-found handler
app.use((request, response, next) => {
  response.status(400).send(`Not found: ${request.originalUrl}`);
});
// TODO: Add error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.status(400).send(error);
});

module.exports = app;
