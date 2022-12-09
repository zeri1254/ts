export class LocalStorageService {
    async getNotes() {
        const localStorageNotes = localStorage.getItem('notes');
        if (localStorageNotes === null) {
            return [];
        }
        return JSON.parse(localStorageNotes);
    }

    async addNote(heading, content) {
        const notes = await this.getNotes();

        const maxId = notes.reduce((max, {id}) => id > max ? id : max, -1);

        const note = {
            id: maxId + 1,
            heading, content,
        };
        notes.unshift(note);
        this.saveNotes(notes);
        return note.id;
    }

    async editNote(heading, content, id) {
        const notes = await this.getNotes();
        const i = notes.findIndex(({id: noteId}) => id === noteId);
        if (i !== -1) {
            notes.splice(i, 1, {id, heading, content});
            this.saveNotes(notes);
        } else {
            throw Error('404 not found');
        }
      }

    async removeNote(id) {
        const notes = await this.getNotes();
        const i = notes.findIndex(({id: noteId}) => id === noteId);
        if (i !== -1) {
            notes.splice(i, 1);
            this.saveNotes(notes);
        } else {
            throw Error('404 not found');
        }
    }

    saveNotes(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}