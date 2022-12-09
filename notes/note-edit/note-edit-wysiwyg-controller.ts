import { NotesModel } from '../notes/notes-model';
import { NoteEditController } from './note-edit-controller'
import { NoteEditModel } from './note-edit-model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 
export class NoteEditWysiwygController extends NoteEditController{
    editor
    constructor(notesModel: NotesModel, noteEditModel: NoteEditModel, editor: typeof ClassicEditor){
        super(notesModel, noteEditModel);
        this.editor = editor;
        this.editor.model.document.on('change:data', this.setContent.bind(this))
    }
    setContent(){
        this.noteEditModel.setContent(this.editor.getData())
    }
}