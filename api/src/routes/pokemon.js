const Router = require('express');
const {Pokemon, Type} = require('../db');

const router = Router();
//primer .get para obtener un listado de los pokemons desde la pokeapi


router.get('/', async (req,res) => {
    let {name, by} = req.query;
    let pokemonList = [];
    if(name){
        name = name.toLowerCase();//asi evito que una busqueda hecha en mayusculas de error. llevo todo a minusculas.
        pokemonList = await forName(name);
        if(!pokemonList.length) return 
        res.json({message: 'Pokemon NOT found'});
        return res.json(pokemonList);
    }

    pokemonList = await info(by);
    if(!pokemonList.length) return res.json({message: 'No info found about the Pokemon you searched'});
    return res.json(pokemonList);
});

//.get al id para obtener un pokemon especifico

router.get('/:id', async (req, res) =>{
    const {id} = req.params;cd      
    let pokemonList = await forId(id);
    if(!pokemonList.id) return res.json({message: 'Pokemon NOT found'});
return res.json(pokemonList);
});

//primer .post para crear un pokemon con sus tipos

router.post('/', async (req, res) =>{
    let{
        name,
        life,
        force,
        defense,
        speed,
        height,
        weight,
        types
    } = req.body;
    if(
        isNaN(life) || isNaN(force) || isNaN(defense) || isNaN(speed) || isNaN(height) ||isNaN(weight))
    return res.json({message: 'this argument is not a number'});
    
    //el item name es obligatorio (allowNull: false)
    if(!name) return res.json({message: 'the item name is mandatory'});

   //variable para declarar un pokemon que ya fue creado por otro usuario
    let duplicatedPokemon = await Pokemon.findOne({where: {name : name}});
    if(duplicatedPokemon) return res.json({message: 'this Pokemon already exists'});

    //declaracion de variable para creacion de un pokemon respetando tipos
    let pokemon = await Pokemon.create({
    name: name.toLowerCase(),  
    life: Number(life),
    force: Number(force),
    defense: Number(defense),
    speed: Number(speed),
    height: Number(height),
    weight: Number(weight)
    });
  
if(!types.length) types = [1];

await pokemon.setTypes(types);
res.json({message: 'Your Pokemon is ON!'});

});

module.exports = router;
