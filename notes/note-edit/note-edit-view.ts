import { NoteEditModel } from "./note-edit-model"
 
export class NoteEditView{
    model
    modal
    modalOverlay
    noteName: HTMLInputElement | null;
    textarea: HTMLInputElement | null;
    deleteBtn: HTMLElement | null;
    constructor(model: NoteEditModel){
        this.model = model;
        this.modal = document.querySelector(".modal");
        this.modalOverlay = document.querySelector(".modal-overlay");
        this.noteName = document.querySelector(".note-name-modal");
        this.textarea = document.querySelector(".textarea");
        this.deleteBtn = document.querySelector(".delete-button-modal");
        this.model.openStatus.subscribe(this.onOpenChange.bind(this));
        this.model.heading.subscribe(this.onHeadingChange.bind(this));
        this.model.content.subscribe(this.onContentChange.bind(this));
        this.model.removeBtnStatus.subscribe(this.onDeleteBtnChange.bind(this));
    }
    onOpenChange(open: boolean){
        if(open){
            this.modal?.classList.add("opened");
            this.modalOverlay?.classList.add("opened");
        }else{
            this.modal?.classList.remove("opened");
            this.modalOverlay?.classList.remove("opened");
            this.onHeadingChange("");
            this.onContentChange("");
        }
    }
    onHeadingChange(heading: string){
        if (this.noteName) this.noteName.value = heading;
    }
    onContentChange(content: string){
        if (this.textarea) this.textarea.value = content;
    }
    onDeleteBtnChange(btnExists: boolean){
        if (this.deleteBtn) {
            if (btnExists){
                this.deleteBtn.style.display = "block";
            } else{
                this.deleteBtn.style.display = "none";
            }
        }
    }
    onErrorChange(){
        
    }
}