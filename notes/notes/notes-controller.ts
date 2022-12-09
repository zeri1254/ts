import { NoteEditModel } from "../note-edit/note-edit-model";
import { Note } from "../shared/note";
import { NotesModel } from "./notes-model";
 
export class NotesController {
    noteEditModel: NoteEditModel;
    notesModel: NotesModel;
    adder: Element | null;
    constructor(noteEditModel: NoteEditModel, notesModel: NotesModel, container: Element) {
        this.noteEditModel = noteEditModel;
        this.notesModel = notesModel;
        container.addEventListener('click', this.onClick.bind(this))
        this.adder = document.querySelector('.add-note');
    }
    delete(id: number){
        this.notesModel.removeNote(id);
    }
    open(note?: Note) {
        if (note) {
            this.noteEditModel.open(note)
        }
    }
    onClick(event: Event){
        const eventTarget = event.target as HTMLElement
        if(this.adder?.contains(eventTarget)){
            this.open()
        }else{
            const notes: NodeListOf<Element> = document.querySelectorAll('.note')
            for(const note of notes){
                if (note.contains(eventTarget)){
                    const id = this.htmlIdToNoteId(note.id);
                    const deleteBtn = note.querySelector(".delete-button")
                    if(deleteBtn?.contains(eventTarget)){
                        this.delete(id)
                    }else{
                        this.open(this.notesModel.getNoteById(id))
                    }
                    return
                }
            }
        }
    }
 
    htmlIdToNoteId(id: string) {
        const match = id.match(/note-(\d+)/);
        return match ? +match[1] : -1;
    }
}