const {Router} = require('express');
//const fetch = require('node-fetch'); 
const {Type} = require('../db.js');

const router = Router();

router.get('/', async (req, res) =>{
    //consulto a la pokeApi la informacion
    const api = await fetch ('https://pokeapi.co/api/v2/type');

    const types= await api.json();//parseo la respuesta Json de la pokeApi

    //recorro el j.son con un 'for of'porque la api es un array de objetos que contiene los diferentes tipos de pokemon

    for (const iterator of types.result) { //el objeto del for es types.results
        let pokeExists = await Type.findOne ({where: {name: iterator.name}})
        if(pokeExists) return res.json(await Type.findAll())//el findAll  trae todos los tipos de la pokeApi y los devuelve
        await Type.create({name: iterator.name})//crea un nuevo record en la base de datos con el nombre del tipo
    }
    res.json(await Type.findAll());
});

module.exports = router;
