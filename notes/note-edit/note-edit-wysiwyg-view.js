import { NoteEditView } from './note-edit-view'

export class NoteEditWysiwygView extends NoteEditView{
constructor(model, editor){
    super(model);
    this.editor = editor
    }
    onContentChange(content){
        if(content === this.editor.getData()) return;
        this.editor.setData(content);
    }
}