import { NotesModel } from "../notes/notes-model";
import { NoteEditModel } from "./note-edit-model";
 
export class NoteEditController{
    notesModel;
    noteEditModel;
    noteName: HTMLInputElement | null;
    textarea: HTMLInputElement | null;
    constructor(notesModel: NotesModel, noteEditModel: NoteEditModel){
        this.notesModel = notesModel;
        this.noteEditModel = noteEditModel;
        const deleteBtn = document.querySelector(".delete-button-modal");
        const btn = document.querySelector(".submit-button");
        deleteBtn?.addEventListener('click', this.removeNote.bind(this))
        btn?.addEventListener('click', this.onSave.bind(this))
        this.noteName = document.querySelector(".note-name-modal");
        this.textarea = document.querySelector(".textarea");
        this.noteName?.addEventListener('input', this.setHeading.bind(this))
        this.textarea?.addEventListener('input', this.setContent.bind(this))
        const modalOverlay = document.querySelector(".modal-overlay");
        modalOverlay?.addEventListener('click', this.close.bind(this))
    }
    addNote(){
        this.notesModel.addNote(this.noteEditModel.heading.value, this.noteEditModel.content.value)
    }
    editNote(){
        const note = this.noteEditModel.getNote();
        if (note) this.notesModel.editNote(note)
    }
    setHeading(){
        this.noteEditModel.setHeading(this.noteName?.value)
    }
    setContent(){
        this.noteEditModel.setContent(this.textarea?.value)
    }
    close(){
        this.noteEditModel.close()
    }
    removeNote(){
        const note = this.noteEditModel.getNote();
        if (note) this.notesModel.removeNote(note.id);
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