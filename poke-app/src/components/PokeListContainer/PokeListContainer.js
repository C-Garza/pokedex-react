import React from "react";
import PokeCard from "../PokeCard/PokeCard";
import pokeAPI from "../../apis/pokeAPI";

class PokeListContainer extends React.Component {
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
    if(!this.state.pokeList) {
      return <div>Loading...</div>;
    }
    return(
      <div>
        {this.renderCards()}
      </div>
    );
  }
}

export default PokeListContainer;