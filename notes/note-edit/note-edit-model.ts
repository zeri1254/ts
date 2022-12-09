import { Note } from "../shared/note";
import { Observable } from '../shared/observable'
 
 
export class NoteEditModel {
    openStatus
    heading
    content
    removeBtnStatus
    errorStatus
    id?: number;
    constructor() {
        this.openStatus = new Observable<boolean>(false);
        this.heading = new Observable<string>()
        this.content = new Observable<string>()
        this.removeBtnStatus = new Observable<boolean>(false);
        this.errorStatus = new Observable<boolean>(true);
    }
    
 
    open(note: Note) {
        this.openStatus.next(true)
        if (note !== undefined) {
            this.id = note.id;
            this.addRemoveBtn();
            this.setHeading(note.heading)
            this.setContent(note.content)
        }else{
            this.deleteRemoveBtn();
        }
    }
    close() {
        this.openStatus.next(false)
 
        this.id = undefined
        this.setHeading('')
        this.setContent('')
    }
    setHeading(heading = '') {
        this.heading.next(heading)
    }
    setContent(content = '') {
        this.content.next(content)
    }
    addRemoveBtn(){
        this.removeBtnStatus.next(true)
 
    }
    deleteRemoveBtn(){
        this.removeBtnStatus.next(false)
    }
    adderrorStatus(){
        this.errorStatus.next(true)
    }
    removeerrorStatus(){
        this.errorStatus.next(false)
    }
    getNote(){
        if (this.id && this.heading.value && this.content.value) {
            return new Note(this.id, this.heading.value, this.content.value);
        }
    }
}