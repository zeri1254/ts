export class NotesController {
    constructor(noteEditModel, notesModel, container) {
        this.noteEditModel = noteEditModel;
        this.notesModel = notesModel;
        container.addEventListener('click', this.onClick.bind(this))
        this.adder = document.querySelector('.add-note');
    }
    delete(id){
        this.notesModel.removeNote(id);
    }
    open(note) {
        this.noteEditModel.open(note)
    }
    onClick(event){
        console.log(event.target)
        if(this.adder.contains(event.target)){
            this.open()
        }else{
            const notes = document.querySelectorAll('.note')
            for(const note of notes){
                if (note.contains(event.target)){
                    const id = this.htmlIdToNoteId(note.id);
                    const deleteBtn = note.querySelector(".delete-button")
                    if(deleteBtn.contains(event.target)){
                        this.delete(id)
                    }else{
                        this.open(this.notesModel.getNoteById(id))
                    }
                    return
                }
            }
        }
    }

    htmlIdToNoteId(id) {
        return +id.match(/note-(\d+)/)[1];
    }
}