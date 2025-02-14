const express = require('express');
xmlparser = require('express-xml-bodyparser');
const multer = require('multer');
const path = require('path');
const app = express();
const port=3000;

//Middleware incorporado en express
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

const folder = path.join(__dirname +'/archivosrec'); //Definir una ruta para almacenar archivos que se envian del cliente
const upload = multer({dest:folder}); //Pasarle esa ruta a multer()
app.use(upload.single('archivo')); 

app.use('/',(req,res,next)=>{
    console.log("Petición al server");
    next();
});
app.use('/',(req,res,next)=>{
    console.log("2da función Middleware");
    next();
});

app.get('/alumno', (req, res) => {
    console.log(req.query);
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/alumno/carrera', (req, res) => {
    console.log(req.body);
    res.send('Servidor respondiendo POST')
});

app.post('/prefectos', (req, res) => {
    console.log(req.body);
    res.send('Servidor respondiendo con XML')
});

/*app.post('/prefectos',(req,res) => {
    console.log(`Se recibio el archivo: ${req.file.originalname}`);
    console.log(req.body);
    console.log('Se recibio el formulario:'+JSON.stringify(req.body));
    res.json(req.body);
   });*/



app.patch('/estudiantes/:carrera', (req, res) => {
    console.log(req.params.carrera);
    console.log(req.query.control);
    console.log(req.body);
    res.send('Servidor respondiendo PATCH')
});

app.use((req, res) => {
    res.status(404).send("Error 404");
});

app.listen(port, () => {
    console.log(`Servidor express escuchando en http://localhost:${port}`);
});
