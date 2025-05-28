require("dotenv").config();
const mysql = require('mysql2');
const halson = require('halson');
const { validationResult } = require('express-validator');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.NAME
});

/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jarrito1409',
    database: 'harry_potter_db',
})*/


function consultaUsuario(req, res, next) {
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(err);
    }
        const { id } = req.params;
        const query = id 
            ? 'SELECT * FROM personajes WHERE id = ?' 
            : 'SELECT * FROM personajes';
        const params = id ? [id] : [];

        // Datos de hechizos predefinidos (en lugar de una tabla)
        /*const hechizosEjemplo = [
            { personaje_id: 1, hechizo: "Expelliarmus" },
            { personaje_id: 2, hechizo: "Lumos" },
            { personaje_id: 3, hechizo: "Avada Kedavra" },
            { personaje_id: 4, hechizo: "Wingardium Leviosa" },
            { personaje_id: 5, hechizo: "Expelliarmus" },
            { personaje_id: 6, hechizo: "Lumos" },
            { personaje_id: 8, hechizo: "Avada Kedavra" }
        ];*/

        db.query(query, params, (err, results) => {
            if (err) {
                return next(err); // 🔹 Enviar el error al middleware de manejo de errores
            }

            if (id && results.length === 0) {
                const error = new Error("Personaje no encontrado");
                error.status = 404;
                return next(error);
            }

            if (id) {
                const personaje = results[0];

                // Filtramos los hechizos que pertenecen a este personaje
                /*const hechizosFiltrados = hechizosEjemplo
                    .filter(h => h.personaje_id == id)
                    .map(h => ({ hechizo: h.hechizo })); */

                // Construimos el objeto HAL con enlaces y hechizos embebidos
                const personajeHAL = halson(personaje)
                    .addLink('self', `/personajes/${id}`)
                    .addLink('Actualizar', { href: `/personajes/${id}`, method: 'PATCH' })
                    .addLink('Eliminar', { href: `/personajes/${id}`, method: 'DELETE' });

                    return res.render('personaje', { personaje: personajeHAL }); // Renderiza un solo personaje
            }

            res.render('personajes', { personajes: results }); // Renderiza todos los personajes
        });

    } catch (err) {
        //next(err); // 🔹 Pasar error al middleware de Express
        next(err); // 🔹 Pasar error al middleware
    }
}

/*module.exports.consultaUsuario = consultaUsuario;*/

function insertarUsuario(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       next(errors);
    }
    const { nombre, casa, descripcion, rol } = req.body;
    const query = 'INSERT INTO personajes (nombre, casa, descripcion, rol) VALUES (?, ?, ?, ?)';
    
    db.query(query, [nombre, casa, descripcion, rol], (err) => {
        if (err) return res.status(500).send({ message: 'Error al insertar personaje' });
        res.send({ message: 'Personaje insertado exitosamente' });
    });
}

function actualizarUsuario(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { nombre, casa, descripcion, rol } = req.body;

    if (!id) {
        return res.status(400).send({ message: 'El ID es obligatorio para actualizar un personaje' });
    }

    const fields = [];
    const values = [];
    
    if (nombre) {
        fields.push('nombre = ?');
        values.push(nombre);
    }
    if (casa) {
        fields.push('casa = ?');
        values.push(casa);
    }
    if (descripcion) {
        fields.push('descripcion = ?');
        values.push(descripcion);
    }
    if (rol) {
        fields.push('rol = ?');
        values.push(rol);
    }

    if (fields.length === 0) {
        return res.status(400).send({ message: 'No se proporcionaron datos para actualizar' });
    }

    values.push(id);
    const query = `UPDATE personajes SET ${fields.join(', ')} WHERE id = ?`;

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Error al actualizar el personaje' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Personaje no encontrado' });
        }
        res.send({ message: 'Personaje actualizado correctamente' });
    });
}

function eliminarUsuario(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: 'El ID es obligatorio para eliminar un personaje' });
    }
    const query = 'DELETE FROM personajes WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Error al eliminar personaje' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Personaje no encontrado' });
        }
        res.send({ status: 1, message: 'Personaje eliminado correctamente' });
    });
}

module.exports = {
    consultaUsuario,
    insertarUsuario,
    actualizarUsuario,
    eliminarUsuario
};