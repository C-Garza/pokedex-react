import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const [active, isActive] = useState(false);
  const [loaded, hasLoaded] = useState(false);
  console.log(active);

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
  return(
    <nav className={styles.navbar}>
      <div className={styles.main__logo__container}>
        <Link to={"/"} className={styles.main__logo}>Pokedex React</Link>
      </div>
      <div className={styles.lights__container}>
        <div className={`${styles.lights__main} ${handleNavExpanded()}`}>
          <div className={`${styles.lights__main__on} ${styles.lights__on} ${handleNavExpanded()}`}></div>
        </div>
        <div className={`${styles.lights__sub__one} ${handleNavExpanded()}`}>
          <div className={`${styles.lights__sub__one__on} ${styles.lights__on} ${handleNavExpanded()}`}></div>
        </div>
        <div className={`${styles.lights__sub__two} ${handleNavExpanded()}`}>
          <div className={`${styles.lights__sub__two__on} ${styles.lights__on} ${handleNavExpanded()}`}></div>
        </div>
        <div className={`${styles.lights__sub__three} ${handleNavExpanded()}`}>
          <div className={`${styles.lights__sub__three__on} ${styles.lights__on} ${handleNavExpanded()}`}></div>
        </div>
      </div>
      <div className={`${styles.nav__menu} ${handleNavExpanded()}`} onClick={handleNavClick} onKeyDown={handleNavClick} tabIndex="0">
        <div className={`${styles.nav__menu__bar} ${styles.nav__menu__bar__one}`}></div>
        <div className={`${styles.nav__menu__bar} ${styles.nav__menu__bar__two}`}></div>
        <div className={`${styles.nav__menu__bar} ${styles.nav__menu__bar__three}`}></div>
      </div>
      <div className={`${styles.nav__menu__list} ${active ? styles.nav__menu__list__expanded : ""}`}>
        
      </div>
    </nav>
  );
};

export default NavBar;