const fs = require('fs');

// Loads existing notes from notes.json
const loadNotes = () => {
    try {
        const notesJson = fs.readFileSync("notes.json", { encoding: "utf-8" });
        return JSON.parse(notesJson);

    } catch (error) {
        return [];
    }
}

// Saves new note to notes.json
const saveNotes = (notes) => {
    fs.writeFileSync("notes.json", JSON.stringify(notes));
}

const findNoteByTitle = (noteTitle, notes) => {
    for (const i in notes) {
        if (notes[i].title == noteTitle)
            return true;
    }
    return false;
}

const getNoteByTitle = (noteTitle, notes) => {
    for (const i in notes) {
        if (notes[i].title == noteTitle)
            return notes[i];
    }
    return;
}

module.exports = {
    loadNotes,
    saveNotes,
    findNoteByTitle,
    getNoteByTitle
}