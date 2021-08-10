//core modules
const fs = require("fs");

//npm packages
const chalk = require("chalk");

//note functions

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find(note => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNote(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => {
    return note.title !== title;
  });

  if (notes.length === notesToKeep.length) {
    console.log(chalk.red.inverse("Note not found. Enter a valid note name"));
  } else {
    saveNote(notesToKeep);
    console.log("Removing note: ", title);
    console.log(chalk.green.inverse("Note Removed"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your Notes: "));
  notes.forEach(note => {
    console.log(note.title);
  });
};

const saveNote = notes => {
  const parsedNote = JSON.stringify(notes);
  fs.writeFileSync("notes.json", parsedNote);
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
