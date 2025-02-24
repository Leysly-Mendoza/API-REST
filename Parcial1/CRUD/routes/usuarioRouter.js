//require("dotenv").config();
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController.js')

router.get('/', usuarioController.consultaUsuario);
router.get('/:id', usuarioController.consultaUsuario);

router.post('/', usuarioController.insertarUsuario);
router.patch('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);


module.exports = router;