import React from "react";
import {Link} from "react-router-dom";
import style from "./navbar.module.css";

export const Navbar = () =>{
    return (
        <div>
            <header className={style.header}>
                <Link to="/" className={style.logo}>
                    <img src="./logoconbg-01.png" alt=""/>
                </Link>
                <ul>
                    <li><Link to="/home">POKEMON</Link> </li>
                    <li><Link to="/create">Create</Link> </li>
                    <li><Link to="/team">My Team</Link> </li>                
                </ul>
            </header>
        </div>
    );
};