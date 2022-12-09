const routers = require("express").Router();
const { Note } = require("./note");
const { NotesInMemoryRepositorys } = require("./repository/inMemory");
const { NotesExpressController } = require("./notesController");
const { NotesInteractor } = require("./notesInteractor");

const notesInMemoryRepository = new NotesInMemoryRepositorys();
const notesInteractor = new NotesInteractor(notesInMemoryRepository);
const notesExpressController = new NotesExpressController(notesInteractor);

// const notes = [];
// let counter = 0;

router.get("/", (req, res) => {
  notesExpressController.getAll(req, res);
});

router.post("/", (req, res) => {
  notesExpressController.addNote(req, res);
});

router.put("/:id", (req, res) => {
  notesExpressController.editNote(req, res);
  // const id = +req.params.id;
  // const { heading, content } = req.body;
  // if (!heading || !isDefined(content) || !isDefined(id)) {
  //   res.status(400).send();
  //   return;
  // }
  // const i = notes.findIndex((n) => n.id === id);
  // if (i !== -1) {
  //   const note = new Note(id, req.body.heading, req.body.content);
  //   notes.splice(i, 1, note);
  //   res.send();
  // } else {
  //   const note = new Note(counter, req.body.heading, req.body.content);
  //   notes.push(note);
  //   res.status(201).send(counter.toString());
  //   counter++;
  // }
});

router.delete("/:id", (req, res) => {
  notesExpressController.deleteNote(req, res);
  // const id = +req.params.id;
  // if (!isDefined(id)) {
  //   res.sendStatus(404);
  //   return;
  // }
  // const i = notes.findIndex((n) => n.id === id);
  // if (i === -1) {
  //   res.sendStatus(404);
  //   return;
  // }
  // notes.splice(i, 1);
  // res.sendStatus(204);
});

module.exports = { notesRouter: router };
