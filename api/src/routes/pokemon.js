const Router = require("express");
const { Pokemon } = require("../db");
const { infoFromApi, pokeByName, pokeById } = require("../apiInfo/apiInfo.js");
//const fetch = require('node-fetch');
const router = Router();

//primer .get para obtener un listado de los pokemon desde la pokeapi OK

// router.get("/", async (req, res) => {
//   try {
//     let { name, byType } = req.query;
  //  let pokemonList = [];
//     if (name) {
//       name = name.toLowerCase(); //asi evito que una busqueda hecha en mayusculas x error. 
//                            //llevo todo a minusculas.Case sensitivity
//       pokemonList = await pokeByName(name);
//       if (!pokemonList.length){ 
//         return res.json({ message: "Pokemon NOT found" })}
//       return res.status(200).json(pokemonList);//devuelve una lista con matching pokemons
//     }


//     pokemonList = await infoFromApi(byType);
//     if (!pokemonList.length)
//       return res.json({
//         message: "No info found about the Pokemon you searched",
//       });
//     return res.status(201).json(pokemonList);//devuelve una lista con matching pokemons
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });
router.get("/", async (req, res) => {
    try {
      const { name } = req.query;
      if (!name) return res.status(400).json({ message: "Name parameter is required" });
  
      const pokemonList = await pokeByName(name.toLowerCase());
      if (!pokemonList.length) return res.status(404).json({ message: "No Pokemon found" });
  
      return res.status(200).json(pokemonList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get("/type", async (req, res) => {
    try {
      const { type } = req.query;
      if (!type) return res.status(400).json({ message: "Type parameter is required" });
  
      const pokemonList = await infoFromApi(type.toLowerCase());
      if (!pokemonList.length) return res.status(404).json({ message: "No Pokemon found" });
  
      return res.status(200).json(pokemonList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//.get al id para obtener un pokemon especifico

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let pokemonList = await pokeById(id);
    if (!pokemonList.id) return res.json({ message: "Pokemon NOT found" });
    return res.status(201).json(pokemonList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//primer .post para crear un pokemon con sus tipos

router.post("/", async (req, res) => {
  try {
    const { name, life, force, defense, speed, height, weight, types } =
      req.body;
    if (
    //el typeof de NAN es number. Sin alguna propiedad NO es un numero devuelve error
      isNaN(life) ||
      isNaN(force) ||
      isNaN(defense) ||
      isNaN(speed) ||
      isNaN(height) ||
      isNaN(weight)
    )
      return res.json`{ message: "this argument should be a number" }`;

    //el item name es obligatorio (allowNull: false)
    if (!name) return res.json`{ message: "the property 'name' is mandatory" }`;

    //variable para declarar un pokemon que ya fue creado por otro usuario
    let duplicatedPokemon = await Pokemon.findOne({ where: { name: name } });
    if (duplicatedPokemon) return res.json`{ message: "a Pokemon with name ${name} already exists" }`;

    if (!types.length) return res.json`{ message: "this types of Pokemons doesn't match"}`;

    //declaracion de variable para creacion de un pokemon respetando tipos
    let pokemon = await Pokemon.create({//'create' method from sequelize
      name: name.toLowerCase(),
      life: Number(life),
      force: Number(force),
      defense: Number(defense),
      speed: Number(speed),
      height: Number(height),
      weight: Number(weight),
    });

    await pokemon.setTypes(types); //This method allows the user to assign one or more types to the Pokemon, 
                                                           //creating a collection of unique values.
    res.status(201).json`{ message: "Your Pokemon ${name} is ON!"}`;
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
