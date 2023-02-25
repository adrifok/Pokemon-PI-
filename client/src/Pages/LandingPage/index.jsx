import React from "react";
import { Link } from "react-router-dom"; //element that lets the user navigate to another page by clicking on it.
import style from "./landingpage.module.css";


export const LandingPage = () => {
  return (
    <div className={style.container}>
      <div>
        <h1>
          <span>The fastest way </span> to get your 
          <span> POKEMON</span>
        </h1>
        <p>
          Welcome to The Pokemon Database! 
          On this page below you'll find the recent Pokemon news and updates
          
        </p>
      <div>
        <img src="./gameboy.png" alt="" />
      </div>
        <Link to="/home">
          <input
            type="submit"
            value="Welcome PokeFan"
            className={style.myButton}
            />
        </Link>
        <h3 className={style.love}>
          Made with &hearts; from Adriana for Henry
        </h3>
      </div>

    </div>
  );
};
