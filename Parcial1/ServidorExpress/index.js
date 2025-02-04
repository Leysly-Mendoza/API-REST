//Hello World Express
const express = import('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname+'public/index.html');
    res.send('Hola Mundo');
});


app.listen(3000, () => {
    console.log(`Servidor express escuchando en http://localhost:3000`);
});
