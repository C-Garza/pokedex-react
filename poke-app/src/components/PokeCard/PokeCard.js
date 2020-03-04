import React from "react";
import styles from "./PokeCard.module.css";
import pokeAPI from "../../apis/pokeAPI";
import PokeHeader from "../PokeHeader/PokeHeader";

class PokeCard extends React.Component {
  state = {pokemon: null};
  async componentDidMount() {
    const response = await pokeAPI.get(`pokemon/${this.props.pokemon.name}`);
    // console.log(response.data);
    this.setState({pokemon: response.data});
  }
  render() {
    if(!this.state.pokemon) {
      return <div>Loading...</div>;
    }
    return(
      <div>
        <PokeHeader id={this.state.pokemon.id} name={this.state.pokemon.name} />
        {/* {this.props.pokemon.name}
        <br />
        {this.state.pokemon.weight / 10}kg
        <br />
        {this.state.pokemon.height / 10}m */}
      </div>
    );
  }
}

export default PokeCard;