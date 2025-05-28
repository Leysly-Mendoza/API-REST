import express from 'express'
import apicache from 'apicache'

let app = express()
let cache = apicache.middleware

app.get('/numero', cache('1 minutes'), (req, res) => {
  let numal = Math.floor(Math.random()*100);
  console.log('numal', numal)
  res.json({ num : numal })
})

app.listen(3000, () =>{
    console.log(`Servidor corriendo en http://localhost: 3000`);
});