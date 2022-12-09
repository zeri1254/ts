import { LocalStorageService } from "../localStorage/local-storage-service";
import { Note } from "../shared/note";
import { NotesModel } from "./notes-model";
 
export class NotesView {
    model: NotesModel;
    loadingModal;
    modalOverlay;
    container;
    constructor(model: NotesModel, container: HTMLElement | null) {
        this.model = model;
        this.model.onSet.subscribe(this.initialRender.bind(this))
        this.model.onAdd.subscribe(this.onAddNote.bind(this));
        this.model.onEdit.subscribe(this.onEditNote.bind(this));
        this.model.onRemove.subscribe(this.onRemoveNote.bind(this));
        this.model.loadingStatus.subscribe(this.onLoadingStatus.bind(this));
        this.loadingModal = document.getElementById("modal2");
        this.modalOverlay = document.querySelector(".modal-overlay");
        this.container = container;
    }
    onLoadingStatus(status: boolean) {
        if  (this.loadingModal && this.modalOverlay){
            if(status){
                this.loadingModal.classList.add("opened")
                this.modalOverlay.classList.add("opened")
            }else{
                this.loadingModal.classList.remove("opened")
                this.modalOverlay.classList.remove("opened")
            }
        }
    }
    onAddNote(note: Note) {
        const view = new NoteView(note);
        if (this.container) view.renderTo(this.container);
    }
    onEditNote(note: Note) {
        let element = document.getElementById(NoteView.noteIdToHtmlId(note.id));
        let heading = element?.querySelector(".note-heading-text");
        let content = element?.querySelector(".note-content-text");
        if (heading && content) {
            heading.textContent = note.heading;
            content.innerHTML = note.content;
        }
    }
    onRemoveNote(note: Note) {
        let element = document.getElementById(NoteView.noteIdToHtmlId(note.id));
        if (element) element.remove();
    }
    initialRender() {
        this.onLoadingStatus(!!this.model.loadingStatus.value)
        // this.container
        // const fragment = new DocumentFragment();
        for (const note of this.model.notes) {
            const view = new NoteView(note);
            if (this.container) view.renderTo(this.container);
        }
        // this.container.appendChild(fragment);
    }
}
 
export class NoteView {
    note;
    constructor(note: Note) {
        this.note = note;
        console.log(note);
    }
    renderTo(parent: HTMLElement) {
        parent.insertAdjacentHTML(
            "afterbegin",
            `<div class='note' id='${NoteView.noteIdToHtmlId(this.note.id)}'>
            <div class='note-heading'>
                <div class="delete-button"></div>
                <div class='note-heading-text'>
                ${this.note.heading}
                </div>
            </div>
            <div class='note-content'>
                <div class='note-content-text'>
                ${this.note.content}
                </div>
            </div>
        </div>`
        );
    }
    static noteIdToHtmlId(id: number) {
        return `note-${id}`;
    }
}