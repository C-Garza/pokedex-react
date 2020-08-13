import React from "react";
import styles from "./NavAbout.module.css";

const NavAbout = () => {
  return(
    <div className={styles.about__container}>
      <div className={styles.about__header}>
        <h2 className={styles.header}>About Pokedex React</h2>
      </div>
      <div className={styles.about__description__container}>
        <div className={styles.about__description}>
          <p className={styles.about__content}>
            Pokedex React is a pokedex web app project made with React/Redux. 
            The pokemon data is served by <a href="https://github.com/PokeAPI/pokeapi" className={styles.external__link} target="_blank" rel="noopener noreferrer">
              PokeAPI
            </a> via Axios.
          </p>
        </div>
        <div className={styles.about__authors__container}>
          <div className={styles.about__author__block}>
            <p className={styles.about__author}>
              <a href="https://c-garza.github.io/" className={styles.external__link} target="_blank" rel="noopener noreferrer">
                Made By Christian Garza
                <span role="img" aria-label="heart"> ❤️</span>
              </a>
            </p>
          </div>
          <div className={styles.about__author__block}>
            <p className={styles.about__author}>
              <a href="https://github.com/C-Garza" className={styles.external__link} target="_blank" rel="noopener noreferrer">
                Check out my projects on GitHub! <i className={`fab fa-github ${styles.icon}`}></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavAbout;