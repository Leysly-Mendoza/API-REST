require("dotenv").config({path: __dirname + "/.env"});
const express = require('express');
const bearer = require('express-bearer-token');
const jsonwebtoken = require('jsonwebtoken');
const xmlparser = require('express-xml-bodyparser');
const routerUsuario = require('./routes/usuarioRouter.js');
const multer = require('multer');
const path = require('path');
const { error } = require("console");
const app = express();
const { consultaUsuario } = require("./controller/usuarioController.js");
const { createVerify } = require("crypto");
const https = require('https');
const fs = require('fs');


//app.set('view engine', 'pug');
//app.set('views', path.join(__dirname, 'views'))

app.get('/personajes/vista/:id?', consultaUsuario);

/*const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
    new winston.transports.File({filename: __dirname+'/logs/app.log'})
    ]
});*/

let port = process.env.PORT || 3001;

//Middleware incorporado en express
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

app.use(bearer())
/*app.use(function (req,res, next)
{
    if (req.token == 'claveSecreta')
    {
        next();
    } else {
        res.status(401).json({Error: "Token is invalid"});
    }
});*/

app.post('/login', function(req, res, next){
    var token = jsonwebtoken.sign(req.body, 'claveSecreta');
    console.log(token);
    res.json({token});
}); 

app.get('/personajess', verificarToken, function(req, res, next){
    res.json({mensaje: "Acceso concedido a ruta sistema"})
});

function verificarToken(req, res, next){
    console.log(req.headers.authorization);
    if(typeof(req.headers.authorization) == 'undefined'){
        res.json({Error:"Token no enviado"});
    }
    else{
        let token = req.headers.authorization.substring(7, req.headers.authorization.Lenght);
        jsonwebtoken.verify(token, 'claveSecreta', function(err, decoded){
            if(err){
                res.json({Error: "Acceso no concedido a ruta sistema"});
            } else {
                next();
            }
        });
    }
};

/*app.get('/personajes/vista', (req, res, next) => {
    consultaUsuario(req, res, next);
});*/

const options = {
    key: fs.readFileSync(path.join(__dirname,'cert/key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert/cert.pem')),
    passphrase: 'leysly'
};

app.use('/personajes', routerUsuario);

app.get('/', (req,res)=>{
    res.json({mensaje:"Servidor Express contestando"})
});
   
// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    const error = new Error("Personaje no encontrado o ruta incorrecta");
    error.status = 404;
    next(error);
});

// Middleware global para manejar errores
/*app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(err.status || 500).json({ error: err.message });
});*/

app.listen(port,function(){
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

https.createServer(options,app).listen(8080,()=>{
    console.log("Servidor Express escuchando en 8080");
});