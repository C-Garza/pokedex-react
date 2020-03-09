import React from "react";
import {Link} from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return(
    <nav className={styles.navbar}>
      <Link to={"/"} className={styles.main__logo}>Pokedex React</Link>
    </nav>
  );
};

export default NavBar;