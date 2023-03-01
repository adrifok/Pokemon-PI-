import React from 'react';
import {Link} from 'react-router-dom';
import pokemonImg from '../../img/landingbg.jpg'
import styles from './LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={styles.bg}>
             <img src={pokemonImg} alt="img not found" className={styles.image} /> 
            {/* <h2 className={styles.author}>AdrianA</h2> */}
            <h1>
          <span>Find</span> your 
          favorite 
       <span> Pokemon</span>
        </h1>
        <p>
          You can know the type of any Pokemon, 
          its strengths, disadvantages and 
          abilities.
        </p> 
            <Link to='/home'>
                <button className={styles.buttonIng}>Let's go!</button>
            </Link>

            <h3 className={styles.love}>Made with &hearts; from Adriana to Henry</h3>
        </div>
    )
}