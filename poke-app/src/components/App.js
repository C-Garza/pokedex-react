import React from "react";
import PokeCard from "./PokeCard/PokeCard";
import pokeAPI from "../apis/pokeAPI";
import styles from "../App.module.css";
import PokeListContainer from "./PokeListContainer/PokeListContainer";

class App extends React.Component {
  render() {
    return(
      <div>
        <PokeListContainer />
      </div>
    );
  }
}

export default App;