//require("dotenv").config();
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController.js')
const { param, check, validationResult } = require('express-validator');

/*const validarUsuario = [
    check('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
    check('')
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero positivo.'),
    check('email')
        .isEmail().withMessage('Debe ser un correo electrónico válido.')
];*/ 

const validarId = [
    param('id').isInt().withMessage('El ID debe ser un número entero.')
];


// Rutas con validación cuando es necesario
router.get('/', usuarioController.consultaUsuario);
router.get('/:id', validarId, usuarioController.consultaUsuario);

//router.post('/', validarUsuario, usuarioController.insertarUsuario);
router.patch('/:id', validarId, usuarioController.actualizarUsuario);
router.delete('/:id', validarId, usuarioController.eliminarUsuario);


module.exports = router;