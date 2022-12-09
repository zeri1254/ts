class NotesExpressControllers {
  interactor: any;
  constructor(interactor) {
    this.interactor = interactor;
  }
  async getAll(req, res) {
    const notes = await this.interactor.getNotes();
    res.send(notes);
  }
  async addNote(req, res) {
    try {
      const note = await this.interactor.addNote(req.body);
      res.status(201).send(note.id.toString());
    } catch (e) {
      if (e.message === "incorrect data") {
        res.status(400).send();
      } else {
        throw e;
      }
    }
  }
  deleteNote(req, res) {
    try {
      this.interactor.deleteNote(+req.params.id);
      res.sendStatus(204);
    } catch (e) {
      if (e.message === "incorrect id") {
        res.status(400).send();
      } else {
        throw e;
      }
    }
  }
  editNote(req, res) {
    try {
      const id = +req.params.id;
      const { heading, content } = req.body;
      this.interactor.editNote({ heading, content, id });
      console.log(1)
      res.sendStatus(204);
    } catch (e) {
      if (e.message === "incorrect data" || e.message === "incorrect id") {
        res.status(400).send();
      } else {
        throw e;
      }
    }
  }
}
module.exports = { NotesExpressController };
