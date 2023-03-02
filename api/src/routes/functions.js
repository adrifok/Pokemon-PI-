const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getApiInfo = async () => {
  //traigo datos de api
  try {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=40"; //limit 40
    let pokemones = [];
    do {
      let info = await axios.get(url);
      let pokemonesApi = info.data;
      let auxPokemones = pokemonesApi.results.map((e) => {
        return {
          name: e.name,
          url: e.url,
        };
      });
      pokemones.push(...auxPokemones);
      url = pokemonesApi.next;
    } while (url != null && pokemones.length < 40); //limit 40

    let pokesWithData = await Promise.all(
      pokemones.map(async (e) => {
        let pokemon = await axios.get(e.url);
        return {
          id: pokemon.data.id,
          name: pokemon.data.name,
          img: pokemon.data.sprites.other.home.front_default,
          types: pokemon.data.types.map((e) => {
            return {
              name: e.type.name,
              img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
              //img: `https://typedex.app/?${e.type.name}`,
            };
          }),
          hp: pokemon.data.stats[0].base_stat,
          attack: pokemon.data.stats[1].base_stat,
          defense: pokemon.data.stats[2].base_stat,
          speed: pokemon.data.stats[5].base_stat,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
        };
      })
    );
    //console.log(pokesWithData);
    return pokesWithData;
  } catch (e) {
    console.log(e);
  }
};

async function getPokemonDetail(arg) {
  try {
    const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}`); //traigo un pokemon especifico desde la api
    const data = await apiData.data;
    const pokemonData = {
      id: data.id,
      name: data.name,
      img: data.sprites.other.home.front_default,
      types: data.types.map((e) => {
        return {
          name: e.type.name,
          img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
          //img: `https://typedex.app/?${e.type.name}`,
          
        };
      }),
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
    };
    return pokemonData;
  } catch (e) {
    console.log(e);
  }
}

const getDbInfo = async () => {
  return await Pokemon.findAll({
    //traido todos los pokemons desde DB, incluye tabla Type con su 'name'
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllPokemon = async () => {
  //get a todos los pokemons(DB y Api)
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allPokemon = apiInfo.concat(dbInfo);
  return allPokemon;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllPokemon,
  getPokemonDetail,
};
