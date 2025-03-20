require("dotenv").config({path: __dirname + "/.env"});
const express = require('express');
const xmlparser = require('express-xml-bodyparser');
const routerUsuario = require('./routes/usuarioRouter.js');
const multer = require('multer');
const path = require('path');
const { error } = require("console");
const app = express();
const winston = require('winston');
const pug = require('pug');
const { consultaUsuario } = require("./controller/usuarioController.js");

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.get('/personajes/vista/:id?', consultaUsuario);

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
    new winston.transports.File({filename: __dirname+'/logs/app.log'})
    ]
   });
   
let port = process.env.PORT || 3000;

//Middleware incorporado en express
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

app.get('/personajes/vista', (req, res, next) => {
    consultaUsuario(req, res, next);
});

app.use('/personajes', routerUsuario);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    const error = new Error("Personaje no encontrado o ruta incorrecta");
    error.status = 404;
    next(error);
});

// Middleware global para manejar errores
app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
