import React from "react";
import styles from "./Header.module.css";
import NavBar from "../NavBar/NavBar";

class Header extends React.Component {
  render() {
    return(
      <header className={styles.header}>
        <NavBar />
      </header>
    );
  }
}

export default Header;