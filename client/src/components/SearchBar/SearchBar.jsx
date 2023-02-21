import React, { useState } from "react";
import style from "./search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filters, getByName, order, type } from "../../actions";

export const Search = () => {
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState("");

  const options = useSelector((store) => store.types);
  const button = style.button;

  const handleInputChange = (e) => {
    setPokemons(e.target.value);
  };

  const byType = (e) => {
    dispatch(type(e.target.value));
  }
  
  const submit = (e) => {
    e.preventDefault();
    dispatch(getByName(pokemons));
    setPokemons("");
  };

  const createdBy = (e) => {
    dispatch(filters(e.target.value))
  }

  const orderBy = (e) => {
    dispatch(order(e.target.value));
  }

  return (
    <div className={style.container}>
      <form onSubmit={submit}>
        <div className={style.field}>
          <input
            type="text"
            id="searchterm"
            value={pokemons}
            onChange={handleInputChange}
            placeholder="Find your Pokemon"
          />
          <input className={button} type="submit" value="Find!" />
        </div>
      </form>
      <div className={style.field2}>
        <select className={button} name="Type" onChange={byType}>
          <option value="">Type:</option>
          {options?.map((p) => (
            <option value={p.name} key={p.slot}>
              {p.name}
            </option>
          ))}
        </select>
        <select name="created" className={button} onChange={createdBy}>
          <option value="0">Created by:</option>
          <option value="1">API</option>
          <option value="2">PokeFan</option>
        </select>
        <select name="Order" className={button} onChange={orderBy}>
          <option value="">Order by:</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="force+">Force+</option>
          <option value="force-">Force-</option>
        </select>
      </div>
    </div>
  );
};
