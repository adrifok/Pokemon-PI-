import React from "react";
import {Link} from "react-router-dom";
import style from "./navbar.module.css";

export const NavBar = () =>{
    return (
        <nav>
            <header className={style.header}>
                <Link to="/" className={style.logo}>
                    <img src="./logoconbg-01.png" alt=""/>
                </Link>
                <ul>
                    <p><Link to="/home">POKEMON</Link> </p>
                    <p><Link to="/create">Create</Link> </p>
                    <p><Link to="/team">My Team</Link> </p>                
                </ul>
            </header>
        </nav>
    );
};
