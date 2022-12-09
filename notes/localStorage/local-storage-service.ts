import { Note } from "../shared/note";
 
export class LocalStorageService {
    async getNotes() {
        const localStorageNotes = localStorage.getItem('notes');
        if (localStorageNotes === null) {
            return [];
        }
        return JSON.parse(localStorageNotes);
    }
 
    async addNote(heading: string, content: string) {
        const notes = await this.getNotes();
        const maxId = notes.reduce((max: number, {id}: {id: number}) => id > max ? id : max, -1);
        const note = {
            id: maxId + 1,
            heading, content,
        };
        notes.unshift(note);
        this.saveNotes(notes);
        return note.id;
    }
 
    async editNote(heading: string, content: string, id: number) {
        const notes = await this.getNotes();
        const i = notes.findIndex(({id: noteId}: {id:number}) => id === noteId);
        if (i !== -1) {
            notes.splice(i, 1, {id, heading, content});
            this.saveNotes(notes);
        } else {
            throw Error('404 not found');
        }
      }
 
    async removeNote(id: number) {
        const notes = await this.getNotes();
        const i = notes.findIndex(({id: noteId}: {id:number}) => id === noteId);
        if (i !== -1) {
            notes.splice(i, 1);
            this.saveNotes(notes);
        } else {
            throw Error('404 not found');
        }
    }
 
    saveNotes(notes: Note[]) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}