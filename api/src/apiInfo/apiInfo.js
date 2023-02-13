const fetch = require("node-fetch");
const { Pokemon, Type } = require("../db");

const infoFromApi = async (el) => {
  const api = await fetch("https://pokeapi.co/api/v2/pokemon?limit=60");
  const apiData = await api.json(); //data que obtengo de la poke api en un j.son

  const dB = await Pokemon.findAll({ include: Type }); //traigo info desde la base de datos(que incluya a los tipos)

  var dataBase = [...dB, ...apiData.results]; //voy a guardar un array de info y resultados de mi Dbase y de la api

  if (el === "2") {
    dataBase = [...dB];
  } else if (el === "1") {
    dataBase = [...apiData.results];
  }

  var pokemonInfo = [];
  for (let i = 0; i < array.length; i++) {
    //recorro el array
    if (!dataBase[i])
      //si no existe la base de datos en la pos i
      return pokemonInfo; //devuelvo toda la info
    if (dataBase[i].url) {
      //si encuentro la url de un pokemon especifico

      const pokemon = await fetch(dataBase[i].url);
      const infoFromApi = await pokemon.json(); //lo traigo en un json
      //return infoFromApi;

      //pusheo los datos y tipos que hay em mi base de datos
      const poke = await Pokemon.findAll({ include: Type });
      pokemonInfo.push({ ...poke });
      //return pokemonInfo;
    }
    return dataBase;
  }
  //busqueda por nombre de Pokemon
  let pokeByName = async (name) => {
    try {
      const myDb = await Pokemon.findOne({
        where: {
          name: name,
        },
        include: Type,
      });
      if (myDb) {
        const pokeDb = [ //api es array de objetos
          {
            id: myDb.id,
            idPoke: myDb.idPoke,
            name: myDb.name,
            type: myDb.types.map((t) => t.name),
          },
        ];
        return pokeDb;
      } else {
        const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await api.json();
        const pokemonbyName = [ 
          {
            id: data.id,
            name: data.name,
            type: data.types.map((t) => t.type.name),
          },
        ];
        return pokeByName;
      }
    } catch (err) {
      return []; //si hay error devuelve el array de objetos vacio
    }
  };

  //busqueda por id de Pokemon
  const pokeById = async (id) => {
    try {
      const api = await fetch("https://pokeapi.co/api/v2/pokemon/${id}");
      const data = await api.json();

      const pokemonById = {
        id: data.id,
        name: data.name,
        type: data.types.map((t) => t.type.name),
        life: data.life,
        force: data.force,
        defense: data.defense,
        speed: data.speed,
        height: data.height,
        weight: data.weight,
      };

      return pokemonById;
    } catch (err) {}

    try {
      const myDb = await Pokemon.findByPk(id, { include: Type });
      const pokemondB = {
        id: myDb.data,
        name: myDb.name,
        type: myDb.types.map((t) => t.type.name),  //idTypes from Type model?????
        life: myDb.life,
        force: myDb.force,
        defense: myDb.defense,
        speed: myDb.speed,
        height: myDb.height,
        weight: myDb.weight,
      };
      return pokemondB;
    } catch (err) {
      return {};
    }
  };
};

module.exports = {
  infoFromApi,
  pokeByName,
  pokeById,
};
