import { NotesModel } from '../notes/notes-model';
import { NoteEditView } from './note-edit-view'
import { NoteEditModel } from './note-edit-model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 
export class NoteEditWysiwygView extends NoteEditView{
    editor: typeof ClassicEditor;
    constructor(model: NoteEditModel, editor: typeof ClassicEditor){
        super(model);
        this.editor = editor
    }
    onContentChange(content:  string){
        if(content === this.editor.getData()) return;
        this.editor.setData(content);
    }
}