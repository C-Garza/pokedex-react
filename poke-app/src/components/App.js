import React from "react";
import PokeCard from "./PokeCard/PokeCard";
import pokeAPI from "../apis/pokeAPI";
import styles from "../App.module.css";

class App extends React.Component {
  state = {pokeList: []};

  async componentDidMount() {
    const response = await pokeAPI.get("pokemon");
    console.log(response.data);
    this.setState({pokeList: response.data.results});
  }
  renderCards = () => {
    return this.state.pokeList.map((pokemon,i) => {
      return <PokeCard key={pokemon.name} pokemon={pokemon} />;
    });
  }
  render() {
    console.log(this.state.pokeList);
    return(
      <div>
        {this.renderCards()}
      </div>
    );
  }
}

export default App;