import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import styles from "./NavBar.module.css";
import NavDisplay from "../NavDisplay/NavDisplay";

const NavBar = () => {
  const [active, isActive] = useState(false);
  const [loaded, hasLoaded] = useState(false);
  const [width, handleWidth] = useState(0);

  useEffect(() => {
    const handleEscKey = (e) => {
      if(e.keyCode === 27 && active) {
        isActive(!active);
      }
    };
    window.addEventListener("keyup", handleEscKey);
    return () => {
      window.removeEventListener("keyup", handleEscKey);
    };
  }, [active]);

  useEffect(() => {
    const handleResize = () => {
      handleWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    };
    if(width === 0) {
      handleWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const handleNavExpanded = () => {
    if(active && !loaded) {
      hasLoaded(!loaded); ////SECOND RENDER, FIX LATER
      handleBodyScroll(true);
      return styles.nav__menu__expanded;
    }
    else if(active && loaded) {
      handleBodyScroll(true);
      return styles.nav__menu__expanded;
    }
    else if(!active && loaded) {
      handleBodyScroll(false);
      return styles.nav__menu__closed;
    }
    else {
      return "";
    }
  };
  const handleBodyScroll = (isMenuOpen) => {
    if(width > 600) {
      if(document.body.style.overflow === "hidden") {
        document.body.style.overflow = "auto";
      }
      return;
    }
    if(isMenuOpen) {
      return document.body.style.overflow = "hidden";
    }
    else {
      return document.body.style.overflow = "auto";
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
        <div 
          className={`${styles.lights__main} ${handleNavExpanded()}`} 
          onClick={handleNavClick} 
          onKeyDown={handleNavKey} 
          tabIndex="0"
          role="button"
          aria-label="Navigation Menu"
        >
          <div className={`${styles.lights__main__light}`}></div>
          <div className={`${styles.lights__main__on} ${styles.lights__on} ${handleNavExpanded()}`}></div>
          <i className={`fas fa-search ${styles.lights__main__menu}`}></i>
        </div>
      </div>
      <div className={`${styles.nav__menu__list} ${active ? styles.nav__menu__list__expanded : ""}`}>
        <NavDisplay isOpen={active} width={width} />
      </div>
    </nav>
  );
};

export default NavBar;