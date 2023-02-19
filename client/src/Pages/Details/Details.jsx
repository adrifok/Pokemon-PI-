import React, { useState } from "react";
import style from "./details.module.css";
import { Card } from "../../components/Cards/Card";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { ordered, types } from "../../helpers/filters";

export const Details = () => {
  let pokemons = useSelector((store) => store.pokemons);
  const type = useSelector((store) => store.type);
  const order = useSelector((store) => store.order);

  if (type) pokemons = types(type, pokemons);
  if (order) pokemons = ordered(order, pokemons);

  const [page, setPage] = useState(0);//useState is a React Hook that lets you add a state variable to your component. const [state, setState] = useState(initialState).

  const pagination = () => {
    if (pokemons.length) return pokemons.slice(page, page + 10);
    if (pokemons.info) return pokemons;
    return [];
  };

  const array = pagination();

  const nextPage = () => {
    if (pokemons.length > page + 10) {
      setPage(page + 10);
    }
  };

  const PreviousPage = () => {
    if (page > 0) {
      setPage(page - 10);
    }
  };

  return (
    <div className={style.container}>
      <SearchBar />
      <div className="buttons">
        <button onClick={PreviousPage} className="pages">
          &laquo; Previous 
        </button>
        <button onClick={nextPage} className="pages">
          Next &raquo;
        </button>
      </div>
      <Card array={array} img={"https://www.icegif.com/wp-content/uploads/2022/08/icegif-1160.gif"} />
    </div>
  );
};
