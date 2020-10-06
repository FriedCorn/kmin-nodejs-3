const { demandOption, describe } = require('yargs');
// Node modules
const yargs = require('yargs');
const { loadNotes, saveNotes, findNoteByTitle, getNoteByTitle } = require('./notes')

yargs
  .command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      },
      description: {
        describe: 'Note description',
        demandOption: true,
        type: 'string'
      },
    },
    handler: (args) => {
      const note = {
        title: "",
        description: "",
      }
      note.title = args.title;
      note.description = args.description;

      const notes = loadNotes();

      // Check if note is existed ?
      if (findNoteByTitle(note.title, notes))
        console.log("%s is existed !!!", note.title);
      else { // Note isn't existed
        notes.push(note);
        saveNotes(notes);

        console.log('Adding a note');
        console.log("Title:", note.title);
        console.log("Description:", note.description);
      }
    }
  })
  .command({
    command: "remove",
    builder: {
      title: {
        type: "string",
        demandOption: true,
        describe: "Title of the note you would like to remove"
      },
    },
    handler: ({title}) => {
      const notes = loadNotes();

      if (!findNoteByTitle(title, notes)) {
        console.log("%s doesn't exist", title);
        return;
      }

      saveNotes(notes.filter(note => note != title));
      console.log("%s removed", title);
    }
  })
  .command ({
    command: 'list',
    aliases: 'ls', 
    describe: "List notes",
    handler: () => {
      const notes = loadNotes();
      for (const i in notes) {
        console.log(`Title: ${notes[i].title}`);
        console.log(`Description: ${notes[i].description}`);
        console.log("------------");
      }
    }
  })
  .command({
    command: 'read',
    describe: "Read a note",
    handler: ({title}) => {
      const notes = loadNotes();
      if (!findNoteByTitle(title, notes)) {
        console.log(`${title} doesn't exist`);
        return;
      }
      const note = getNoteByTitle(title, notes);
      console.log(`Description: ${note.description}`);
    }
  }).argv;