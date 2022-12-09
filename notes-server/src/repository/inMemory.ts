// const { Note } = require("../note");

class NotesInMemoryRepository {
  notes: any[];
  counter: number;
  constructor() {
    this.notes = [];
    this.counter = 0;
  }
  async readAll() {
    return this.notes;
  }
  async addNote({ heading, content }) {
    const note = new Note(this.counter, heading, content);
    this.notes.push(note);
    this.counter++;
    return note;
  }
  deleteNote({ id }) {
    const i = this.notes.findIndex((n) => n.id === id);
    if (i === -1) {
      throw Error("incorrect id (no such id)");
    }
    this.notes.splice(i, 1);
  }
  editNote({ heading, content, id }){
    const i = this.notes.findIndex((n) => n.id === id);
    if (i === -1) {
      throw Error("incorrect id (no such id)");
    }
    this.notes[i].heading = heading;
    this.notes[i].content = content;
  }
}
module.exports = { NotesInMemoryRepository };
