import React from "react";
import styles from "./PokeCard.module.css";
import pokeAPI from "../../apis/pokeAPI";

class PokeCard extends React.Component {
  state = {pokemon: {}};
  async componentDidMount() {
    const response = await pokeAPI.get(`pokemon/${this.props.pokemon.name}`);
    // console.log(response.data);
    this.setState({pokemon: response.data});
  }
  render() {
    console.log(this.state.pokemon);
    return(
      <div>
        {this.props.pokemon.name}
        <br />
        {this.state.pokemon.weight / 10}kg
        <br />
        {this.state.pokemon.height / 10}m
      </div>
    );
  }
}

export default PokeCard;