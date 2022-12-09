var express = require('express');
var cors = require('cors');
var router = express.Router();
var cookieParser = require('cookie-parser');
var _a = require('./auth-service'), authHandlers = _a.authHandlers, authRouters = _a.authRouters;
var notesRouter = require('./notes-router').notesRouter;
var paths = require('path');
var app = express();
app.use(cors({ origin: 'http://127.0.0.1:8080', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouters);
var pathStatic = paths.join(__dirname + '../../../notes/');
console.log(pathStatic);
app.get('*', express.static(pathStatic));
// console.log(__dirname)
app.use(authHandlers);
app.use('/api/notes', notesRouter);
var port = process.env["PORT"] || 3000;
app.listen(port, function () {
    console.log("Running at port ".concat(port));
});
