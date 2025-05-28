const halson = require('halson');
let embed = halson({
 title: "joyent / node",
 description: "evented I/O for v8 javascript"
 })
 .addLink('self', '/joyent/node')
 .addLink('author', {
 href: '/joyent',
 title: 'Joyent'
 });
let resource = halson({
 title: "Juraj Hájovský",
 username: "hajovsky",
 emails: [
    "juraj.hajovsky@example.com",
    "hajovsky@example.com"
    ]
    })
    .addLink('self', '/hajovsky')
    .addEmbed('starred', embed);
   console.log(JSON.stringify(resource));

   /*HATEOTAS
   Agregar links a los metodos y recursos: inventar algo */