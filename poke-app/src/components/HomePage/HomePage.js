import React from "react";
import styles from "./HomePage.module.css";
import PokeListContainer from "../PokeListContainer/PokeListContainer";

class HomePage extends React.Component {
  render() {
    return(
      <PokeListContainer />
    );
  }
}

export default HomePage;