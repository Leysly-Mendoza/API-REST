//require("dotenv").config();
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController.js')

/**
 * @swagger
 * /personajes:
 *   get:
 *     summary: Obtener personajes
 *     description: Devuelve un arreglo de personajes
 *     responses:
 *       200:
 *         description: Lista de personajes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 personajes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       casa:
 *                         type: string
 *                       descripcion:
 *                         type: string
 *                       rol:
 *                         type: string
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: Fetch usando JavaScript
 *         source: |
 *           fetch('http://localhost:3000/personajes')
 *             .then(response => response.json())
 *             .then(data => console.log(data))
 *             .catch(error => console.error('Error:', error));
 *       - lang: curl
 *         label: Request con cURL
 *         source: |
 *           curl -X GET "http://localhost:3000/personajes" -H "accept: application/json"
 */
router.get('/', usuarioController.consultaUsuario);
/**
 * @swagger
 * /personajes/{id}:
 *   get:
 *     summary: Obtener personaje por ID
 *     description: Devuelve un personaje específico según el ID proporcionado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del personaje
 *     responses:
 *       200:
 *         description: Detalle de personaje
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 personajes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       casa:
 *                         type: string
 *                       descripcion:
 *                         type: string
 *                       rol:
 *                         type: string
 *       404:
 *         description: Personaje no encontrado
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: Fetch con ID
 *         source: |
 *           fetch('http://localhost:3000/personajes/1')
 *             .then(response => response.json())
 *             .then(data => console.log(data))
 *             .catch(error => console.error('Error:', error));
 *       - lang: curl
 *         label: Request con cURL (por ID)
 *         source: |
 *           curl -X GET "http://localhost:3000/personajes/1" -H "accept: application/json"
 */
router.get('/:id', usuarioController.consultaUsuario);

router.post('/', usuarioController.insertarUsuario);
router.patch('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);


module.exports = router;