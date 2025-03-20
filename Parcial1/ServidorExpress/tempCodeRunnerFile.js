require("dotenv").config({path: __dirname + "/.env"});
const express = require('express');
const xmlparser = require('express-xml-bodyparser');
const routerUsuario = require('./routes/usuarioRouter.js')
const multer = require('multer');
const path = require('path');
//const cors = require('cors');
//const port=3000;

const app = express();

let port = process.env.PORT || 3000;

//Middleware incorporado en express
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

app.use('/personajes', routerUsuario);

app.use((req, res) => {
    res.status(404).send("Error 404");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});