
const { Pokemon, Type } = require("../db");

const infoFromApi = async (byType) => {
  const api = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40"); //busqueda limitada a 40
  const apiData = await api.json(); //data que obtengo de la poke api en un j.son

  const dB = await Pokemon.findAll({ include: Type }); //traigo info desde la base de datos(que incluya a los tipos)

  var dataBase = [...dB, ...apiData.results]; //voy a guardar un array de info y resultados de mi Dbase y de la api

  if (byType === "2") {//pasa solo data de la base de datos local
    dataBase = [...dB];
  } else if (byType === "1") {   //pasa solo data de la API
    dataBase = [...apiData.results];//si no mergea data the las dos fuentes
  }

  let pokemonInfo = [];
  for (let i = 0; i < array.length; i++) {
    //recorro el array   
    if (dataBase[i].url) {//chequeo si existe una url en la API
      //si encuentro la url de un pokemon especifico
      const pokemon = await fetch(dataBase[i].url);
      const infoFromApi = await pokemon.json(); //lo traigo en un json
      //return infoFromApi;
      

      pokemonInfo.push({    //al array de info le pusheo la data de la pokeApi
        id: infoFromApi.id,
        name: infoFromApi.name,
        type: infoFromApi.types.map((t) => t.type.name),
        img: infoFromApi.sprites.versions["generation-v"]["black-white"].animated.front_default,
        force: infoFromApi.stats[1].base_stat,
      });
    } else {
      pokemonInfo.push({
        id: dB[i].id,
        idPoke: dB[i].idPoke,
        name: dB[i].name,
        type: dB[i].types.map((t) => t.name),
        force: dB[i].force,
        img: "https://media.tenor.com/BjyNZZIOnbYAAAAC/pokemon.gif",
      });
    }
  }

      //pusheo los datos y tipos que hay em mi base de datos
      const poke = await Pokemon.findAll({ include: Type });
      pokemonInfo.push({ ...poke });
      return pokemonInfo;
    };
  
  //busqueda por nombre de Pokemon
  const pokeByName = async (name) => {
    try {
      const myDb = await Pokemon.findOne({//busco en la db local
        where: {
          name: name,
        },
        include: Type,
      });
      if (myDb) {
        const pokeDb = [ //si no busco en la pokeApi (api es array de objetos)
          {
            id: myDb.id,
            idPoke: myDb.idPoke,
            name: myDb.name,
            type: myDb.types.map((t) => t.name),
            img: "https://media.tenor.com/BjyNZZIOnbYAAAAC/pokemon.gif"
          },
        ];
        return pokeDb;
      } else {
        const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await api.json();
        const pokemonByName = [ 
          {
            id: data.id,
            name: data.name,
            type: data.types.map((t) => t.type.name),
          },
        ];
        return pokemonByName;
      }
    } catch (err) {
      return []; //si hay no encuentro datos devuelvo el array de objetos vacio
    }
  };

  //busqueda por id de Pokemon
  const pokeById = async (id) => {//busco en la pokeApi por id
    try {   
      const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await api.json();

      const pokemonById = {//creo un objeto Pokemon con sus caracteristicas
        id: data.id,
        name: data.name,
        types: data.types.map((t) => t.type.name),
        img: "https://media.tenor.com/BjyNZZIOnbYAAAAC/pokemon.gif",
        life: data.stats[0].base_stat, //base stats means Species strengths
        force: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[3].base_stat,
        height: data.height,
        weight: data.weight,
      };
      //return del objeto y sus propiedades
      return pokemonById; //devuelvo el objeto creado
    } catch (err) {
    }

    try {
      const myDb = await Pokemon.findByPk(id, { include: Type });
      const pokemondB = {
        id: myDb.idPoke,
        name: myDb.name,
        type: myDb.types.map((t) => t.type.name),  //idTypes from Type model?????
        img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
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


module.exports = {
  infoFromApi,
  pokeByName,
  pokeById,
};
