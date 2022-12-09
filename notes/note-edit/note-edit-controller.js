export class NoteEditController{
    constructor(notesModel, noteEditModel){
        this.notesModel = notesModel;
        this.noteEditModel = noteEditModel;
        const deleteBtn = document.querySelector(".delete-button-modal");
        const btn = document.querySelector(".submit-button");
        deleteBtn.addEventListener('click', this.removeNote.bind(this))
        btn.addEventListener('click', this.onSave.bind(this))
        this.noteName = document.querySelector(".note-name-modal");
        this.textarea = document.querySelector(".textarea");
        this.noteName.addEventListener('input', this.setHeading.bind(this))
        this.textarea.addEventListener('input', this.setContent.bind(this))
        const modalOverlay = document.querySelector(".modal-overlay");
        modalOverlay.addEventListener('click', this.close.bind(this))
    }
    addNote(){
        this.notesModel.addNote(this.noteEditModel.heading.value, this.noteEditModel.content.value)
    }
    editNote(){
        this.notesModel.editNote(this.noteEditModel.getNote())
    }
    setHeading(){
        this.noteEditModel.setHeading(this.noteName.value)
    }
    setContent(){
        this.noteEditModel.setContent(this.textarea.value)
    }
    close(){
        this.noteEditModel.close()
    }
    removeNote(){
        this.notesModel.removeNote(this.noteEditModel.getNote());
        this.close();
    }
    onSave(){
        if(this.noteEditModel.id !== undefined){
            this.editNote()
        }else{
            this.addNote()
        }
        this.close();
    }
}