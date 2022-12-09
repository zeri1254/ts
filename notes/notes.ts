import { NotesModel } from './notes/notes-model'
import {NotesView, NoteView} from './notes/notes-view'
import { Note } from './shared/note'
import { NoteEditController } from './note-edit/note-edit-controller'
import { NotesController } from './notes/notes-controller'
import { NoteEditModel } from './note-edit/note-edit-model'
import { NoteEditView } from './note-edit/note-edit-view'
import { ApiService } from './shared/api-service'
import { NoteEditWysiwygView } from './note-edit/note-edit-wysiwyg-view'
import { NoteEditWysiwygController } from './note-edit/note-edit-wysiwyg-controller'
import { LocalStorageService } from './localStorage/local-storage-service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 
const localStorageService = new LocalStorageService();
 
// const apiService = new ApiService("http://127.0.0.1:3000/api/notes")
 
const notesModel = new NotesModel([], localStorageService);
const noteEditModel = new NoteEditModel();
 
const notesField: HTMLElement | null = document.querySelector(".notes");
 
let editor;
 
ClassicEditor
  .create(document.querySelector('#editor'))
  .then((newEditor: typeof ClassicEditor) => {
    editor = newEditor;
    const noteEditView = new NoteEditWysiwygView(noteEditModel, editor);
    const noteEditController = new NoteEditWysiwygController(notesModel, noteEditModel, editor);
  })
  .catch((error: Error) => {
    console.error(error);
  });
 
const notesView = new NotesView(notesModel, notesField);
 
 
if (notesField){
  const notesController = new NotesController(noteEditModel, notesModel, notesField);
}
 
notesModel.loadNotes();
 
notesView.initialRender()
// function localStorageUpdate(){
//   localStorageService.saveNotes(notesModel.notes)
// }
 
// notesModel.onAdd(localStorageUpdate)
// notesModel.onEdit(localStorageUpdate)
// notesModel.onRemove(localStorageUpdate)
 
 
 
// notesModel.addNote('21q3', '2314qawesr')
// notesModel.addNote('21q3', '231asdasdasdasdesr')
// notesModel.addNote('21q3', '2316t24tdsfdsxzfsdwesr')
 
const modal: HTMLElement | null = document.querySelector(".modal");
const modalOverlay: HTMLElement | null = document.querySelector(".modal-overlay");
let notes: NodeListOf<HTMLElement> = document.querySelectorAll(".note");
const deleteBtn: HTMLElement | null = document.querySelector(".delete-button");
const btn: HTMLElement | null = document.querySelector(".submit-button");
let noteName: any = document.querySelector(".note-name-modal");
let textarea: any = document.querySelector(".textarea");
 
let notesId = 1;              //obj for modal info
 
let notesArr: Note[] = [];
 
// function renderNotes() {                                //рендер из локалки
//   const fragment = new DocumentFragment();
//   const notesField = document.querySelector(".notes");
//   let noteViews = [];
//   for (let note of notesArr) {
//     const view = new NoteView(note);
//     view.renderTo(fragment);
//     noteViews.push(view);
//   }
//   notesField?.appendChild(fragment);
//
//   addFunctional();
// }
 
function localStorageLoad() {                           //вытаскивание из localstorage
  let localStorageNotes = localStorage.getItem("notes");
  if (localStorageNotes === null) {
    return;
  }
  notesArr = JSON.parse(localStorageNotes);
  notesId = notesArr.length + 1;
}
 
function opener() {                                   //открытие модального окна
  modal?.classList.remove("closed");
  modalOverlay?.classList.remove("closed");
  modal?.classList.add("opened");
  modalOverlay?.classList.add("opened");
}
 
function insertTextInModal(noteElement: HTMLElement) {             //вставка текста из дома
  const note = findNoteByElement(noteElement);
  noteName.value = note?.heading;
  textarea.value = note?.content;
}
 
function clearInputs() {                              //очистка полей ввода
  noteName.value = "";
  textarea.value = "";
}
 
function close() {
  //закрытие
  modal?.classList.remove("opened");
  modalOverlay?.classList.remove("opened");
  modal?.classList.add("closed");
  modalOverlay?.classList.add("closed");
  clearInputs();
  addFunctional();
}
 
///////////////////////////////////////  controller
 
function findNoteByElement(element: HTMLElement) {                 //поиск элемента по идентификатору model
  const targetId = +findtargetId(element);
  return notesArr.find((note) => note.id === targetId);
}
 
function add() {                                              //добавление
  const adder: HTMLElement | null = document.querySelector(".add-note");
  if (!adder) return
  adder.onclick = function () {
    opener();
    if (!btn) return
    btn.onclick = function () {
      if (noteName.value === "" || textarea.value === "") {
        return;
      }
      adder.insertAdjacentHTML(
        "afterend",
        `<div class='note' id='${notesId}'>
        <div class='note-heading' id='${notesId}'>
            <div class='note-heading-text' id='${notesId}'>
            ${noteName.value}
            </div>
        </div>
        <div class='note-content' id='${notesId}'>
            <div class='note-content-text' id='${notesId}'>
            ${textarea.value}
            </div>
        </div>
    </div>`
      );
      const note = new Note(notesId, noteName.value, textarea.value);
      notesArr.push(note);
      localStorage.setItem("notes", JSON.stringify(notesArr));
      notesId++;
    };
  };
}
 
function change(noteElement: HTMLElement) {                            //изменение
  let noteHeading: HTMLElement | null = noteElement.querySelector(".note-heading-text");
  let noteContent: HTMLElement | null = noteElement.querySelector(".note-content-text");
  let note = findNoteByElement(noteElement);
  if (note && noteHeading && noteContent) {
    note.content = textarea.value;
    note.heading = noteName.value;
    noteHeading.textContent = noteName.value;
    noteContent.textContent = textarea.value;
    localStorage.setItem("notes", JSON.stringify(notesArr));
  }
}
 
function addFunctional() {                              //добавление элементам в доме функциональности    modal
  if (btn && deleteBtn && modalOverlay) {
    notes = document.querySelectorAll(".note");
    for (const note of notes) {
 
      note.onclick = function () {
        opener();
        insertTextInModal(note);
        btn.onclick = function () {
          change(note);
        };
        deleteBtn.onclick = function () {
          remove(note);
        };
      };
 
      modalOverlay.addEventListener("click", close);
    }
  }
 
}
function remove(noteElement: HTMLElement) {                    //удаление              model
  const targetId = +findtargetId(noteElement);
  const i = notesArr.findIndex((note) => note.id === targetId);
  notesArr.splice(i, 1);
  noteElement.remove();
  localStorage.setItem("notes", JSON.stringify(notesArr));
  close();
}
 
function findtargetId(noteElement: HTMLElement) {                    //зачем это
  return noteElement.id;
}
 
document.addEventListener("DOMContentLoaded", function () {       //типа общее
  localStorageLoad();
  // renderNotes();
  add();
  addFunctional();
});
 
/*
 
noteHeading = notesArr.find(x => x.id === id).heading;
    noteContent = notesArr.find(x => x.id === id).content;
let textarea = document.querySelector('.ck-editor__editable_inline');
btn.onclick = function(){
    console.log(textarea)
};
for (area of textarea){
    btn.onclick = function(){
        console.log(textarea)
    };
 
}*/