import React from "react";
import style from "./team.module.css";
import { Card } from "../../components/Cards/Card";
//import {useSelector} from "react-redux";

export const Team = () => {
  const team = () => {
    if (localStorage.getItem("team")) {
      let array = localStorage.getItem("team");
      array = JSON.parse(array); //convert to a json object
      return array;
    }
    return [];
  };

  const array = team();
  return (
    <div className={style.container}>
      <Card
        array={array}
        img={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGoDKwe_ySdQX-mB3y7WfsANsacZuUOggPA&usqp=CAU"
        }
      />
    </div>
  );
};
