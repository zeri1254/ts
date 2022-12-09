import { NoteEditController } from './note-edit-controller'
export class NoteEditWysiwygController extends NoteEditController{
    constructor(notesModel, noteEditModel, editor){
        super(notesModel, noteEditModel);
        this.editor = editor;
        this.editor.model.document.on('change:data', this.setContent.bind(this))
    }
    setContent(){
        this.noteEditModel.setContent(this.editor.getData())
    }
}