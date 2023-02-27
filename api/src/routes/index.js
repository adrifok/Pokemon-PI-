// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const express = require("express");
const morgan = require("morgan");
const pokemons = require('./pokemon');
const types = require('./types');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json()); //metodo convertidor de json
router.use(morgan("dev")); //morgan for consola

router.use('/pokemons', pokemons);
router.use('/types', types);

module.exports = router;
