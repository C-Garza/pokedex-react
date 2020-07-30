import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from "./NavBar.module.css";
import NavDisplay from "../NavDisplay/NavDisplay";

const NavBar = () => {
  const [active, isActive] = useState(false);
  const [loaded, hasLoaded] = useState(false);

  const handleNavExpanded = () => {
    if(active && !loaded) {
      hasLoaded(!loaded); ////SECOND RENDER, FIX LATER
      return styles.nav__menu__expanded;
    }
    else if(active && loaded) {
      return styles.nav__menu__expanded;
    }
    else if(!active && loaded) {
      return styles.nav__menu__closed;
    }
    else {
      return "";
    }
  };
  const handleNavClick = () => {
    isActive(!active);
  };
  const handleNavKey = (e) => {
    if(e.keyCode !== 13) {
      return;
    }
    isActive(!active);
  };
  return(
    <nav className={styles.navbar}>
      <div className={styles.main__logo__container}>
        <Link to={"/"} className={styles.main__logo}>Pokedex React</Link>
      </div>
      <div className={styles.lights__container}>
        <div className={`${styles.lights__sub__one} ${handleNavExpanded()}`}>
          <div className={`${styles.lights__sub__one__on} ${styles.lights__on} ${handleNavExpanded()}`}></div>
        </div>
        <div className={`${styles.lights__sub__two} ${handleNavExpanded()}`}>
          <div className={`${styles.lights__sub__two__on} ${styles.lights__on} ${handleNavExpanded()}`}></div>
        </div>
        <div className={`${styles.lights__sub__three} ${handleNavExpanded()}`}>
          <div className={`${styles.lights__sub__three__on} ${styles.lights__on} ${handleNavExpanded()}`}></div>
        </div>
        <div className={`${styles.lights__main} ${handleNavExpanded()}`} onClick={handleNavClick} onKeyDown={handleNavKey} tabIndex="0">
          <div className={`${styles.lights__main__light}`}></div>
          <div className={`${styles.lights__main__on} ${styles.lights__on} ${handleNavExpanded()}`}></div>
          <i className={`fas fa-search ${styles.lights__main__menu}`}></i>
        </div>
      </div>
      <div className={`${styles.nav__menu__list} ${active ? styles.nav__menu__list__expanded : ""}`}>
        <NavDisplay />
      </div>
    </nav>
  );
};

export default NavBar;