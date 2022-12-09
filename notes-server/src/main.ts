const express = require('express');
const cors = require('cors');
const router = express.Router();
const cookieParser = require('cookie-parser')
const {authHandlers, authRouters} = require('./auth-service')
const {notesRouter} = require('./notes-router')
const paths = require('path')


const app = express();
app.use(cors({origin: 'http://127.0.0.1:8080', credentials: true}));

app.use(cookieParser())

app.use(express.json());
app.use('/api/auth', authRouters)

const pathStatic = paths.join(__dirname + '../../../notes/')
console.log(pathStatic)

app.get('*', express.static(pathStatic));
// console.log(__dirname)

app.use(authHandlers)

app.use('/api/notes', notesRouter)

const port = process.env["PORT"] || 3000;

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});