import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../Stats/Stats";

export const Pokemon = () => {
  const { id } = useParams();
  const history = useHistory();

  const [setPokemon] = useState({});

  const addTeam = (obj) => {
    let array = [];
    if (localStorage.getItem("team")) {
      array = localStorage.getItem("team");
      array = JSON.parse(array);  
      if (array.length >= 8) array.shift();
      array.push(obj);
      localStorage.setItem("team", JSON.stringify(array));
    } else {
      array.push(obj);
      localStorage.setItem("team", JSON.stringify(array));
    }
    history.push("/team");
  };

  useEffect(() => {
    //console.log("entra")
    detailsById();
  });

  const detailsById = async () => {
    const data = await fetch(`http://localhost:3000/pokemons/${id}`);

    const pokemon = await data.json();
    setPokemon(pokemon);
  //};

  return (
    <>
      <div className={style.container}>
        <h1>{pokemon.name}</h1>
        <h2>#{pokemon.id}</h2>
        <div class={style.pokebola}>
          <p>Capture</p>
          <button
            onClick={() => {
              addTeam({
                id: pokemon.id,
                name: pokemon.name,
                type: pokemon.type,
                img: pokemon.img,
              });
            }}
          >
            <img
              src="https://imagenpng.com/wp-content/uploads/2016/09/Pokebola-pokeball-png-4.png"
              alt=""
            />
          </button>
        </div>

        <div className={style.imagen}>
          <img src={pokemon.imagen} alt="" />
          <div className={style.paragraph}>
            <p>weight: {pokemon.weight}kg</p>
            <p>height: {pokemon.height}ft</p>
          </div>
        </div>

        <div className={style.type}>
          {pokemon.type
            ? pokemon?.type.map((t) => <h3 className={style[`${t}`]}>{t}</h3>)
            : null}
        </div>
        <div className={style.meter}>
          <div className={style.type}>
            <Stats value={pokemon.life} name={"HP"} />
            <Stats value={pokemon.force} name={"Force"} />
          </div>
          <div className={style.type}>
            <Stats value={pokemon.defense} name={"Defense"} />
            <Stats value={pokemon.speed} name={"Speed"} />
          </div>
        </div>
      </div>
    </>
  );
}
};
