import { Note } from "../shared/note.js";
import { Observable } from "../shared/observable.js";

export class NotesModel {
  constructor(notes = [], apiService) {
    this.notes = notes;
    this.apiService = apiService;
    this.currentId =
      notes.reduce((max, note) => (note.id > max ? note.id : max), 0) + 1;
    this.onAdd = new Observable();
    this.onEdit = new Observable();
    this.onRemove = new Observable();
    this.onSet = new Observable();
    this.loadingStatus = new Observable(false);
  }
  loadNotes() {
    this.setLoadingStatus(true);
    this.apiService.getNotes().then((notes) => {
      this.setNotes(notes);
      this.setLoadingStatus(false);
    });
  }

  //////////////////////////////изменение данных и вызов(оповещение) функций(подписок)
  setLoadingStatus(status) {
    this.loadingStatus.next(status);
  }
  setNotes(notes) {
    this.notes = notes;
    this.currentId =
      notes.reduce((max, note) => (note.id > max ? note.id : max), 0) + 1;
    this.onSet.next(notes);
  }

  addNote(heading, content) {
    this.setLoadingStatus(true);
    this.apiService.addNote(heading, content).then((id) => {
      const note = new Note(+id, heading, content);
      this.notes.push(note);
      this.onAdd.next(note);

      this.setLoadingStatus(false);
    });
  }
  editNote(note) {
    const i = this.notes.findIndex((n) => note.id === n.id);
    const heading = note.heading;
    const content = note.content;
    if (i !== -1) {
      this.apiService.editNote(heading, content, note.id).then(() => {
        this.notes.splice(i, 1, note);
        this.onEdit.next(note);
        this.setLoadingStatus(false);
      });
    }
  }
  removeNote(id) {
    this.setLoadingStatus(true);
    this.apiService.removeNote(id).then(() => {
      const i = this.notes.findIndex(({id: noteId}) => noteId === id);
      const note = this.notes[i];
      this.notes.splice(i, 1);
      this.onRemove.next(note);
      this.setLoadingStatus(false);
    });
  }
  redirectToLoginPage(){
    
  }
  //////////////////////////////////
  getNoteById(id) {
    return this.notes.find((n) => n.id === id);
  }
}
