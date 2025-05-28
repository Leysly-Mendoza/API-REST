const path = require('path'); 
require("dotenv").config({path: __dirname + "/.env"});
const express = require('express');
const xmlparser = require('express-xml-bodyparser');
const multer = require('multer');
const routerUsuario = require('./routes/usuarioRouter.js')

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const redoc = require('redoc-express');

// ✅ Primero defines swaggerOptions
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Personajes',
            version: '1.0.0',
        },
        servers: [
            { url: "http://localhost:3000/" }
        ],
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
    // o si solo quieres uno: [`${path.join(__dirname, "./routes/usuarioRouter.js")}`]
};

// ✅ Luego generas los docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express(); // ✅ También declara app antes de usarlo

let port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

// Swagger route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get("/personajes", (req, res) => {res.json(swaggerDocs);})

// Ruta Redoc (en /redoc)
app.get(
    '/redoc',
    redoc({
      title: 'Documentación de la API',
      specUrl: '/swagger.json', // Necesitamos exponer el spec manualmente (ver abajo)
    })
);
  // Ruta para exponer el JSON del Swagger
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
});

// Rutas
app.use('/personajes', routerUsuario);

// Ruta por defecto (404)
app.use((req, res) => {
    res.status(404).send("Error 404");
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
