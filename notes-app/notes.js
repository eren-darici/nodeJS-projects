const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title); 
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        
        notes.push({
            title: title,
            body: body,
            id: notes.length === 0 ? 1 : notes[notes.length - 1].id + 1
        });

        saveNotes(notes);
        console.log(chalk.green.inverse("New note added!"))
    } else {
        console.log(chalk.green.inverse("Note title taken!"));
    }

}

const saveNotes = (notes) => {
    const notesString = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesString);
}

const removeNote = (id) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.id !== id); 

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("Note removed!"));
    } else {
        console.log(chalk.red.inverse("Note not found!"));
    }
}

const loadNotes = () => {
    try {

        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse("Your notes:"));

    notes.forEach((note)=>{
        console.log(chalk.blue.inverse('>') + chalk.green.inverse(note.title) + chalk.green.inverse(', id:', note.id));
    })
}

const readNote = (id) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.id === id);
    
    if (note) {
        console.log(chalk.blue.inverse(note.title));
        console.log(chalk.green.inverse(note.body));
    } else {
        console.log(chalk.red.inverse("Note not found!"));
    }
}


module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}
