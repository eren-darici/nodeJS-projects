const validator = require('validator');
const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');


yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: (argv) => {
        notes.removeNote(argv.id);
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing the notes',
    handler: () => {
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',   
    describe: 'Reading the note',
    builder: {
        id: {
            describe: 'Note id',
            demandOption: true
        }
    },
    handler: (argv) => {
        notes.readNote(argv.id);
    }
});

yargs.parse();