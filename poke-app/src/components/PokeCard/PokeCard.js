import React from "react";
import {connect} from "react-redux";
import styles from "./PokeCard.module.css";
import pokeAPI from "../../apis/pokeAPI";
import PokeHeader from "../PokeHeader/PokeHeader";
import {fetchPokemon} from "../../actions";

class PokeCard extends React.Component {
  // state = {pokemon: null};
  componentDidMount() {
    this.props.fetchPokemon(this.props.pokemon.name);
    // console.log(response.data);
    // this.setState({pokemon: response.data});
  }
  render() {
    console.log(this.props.pokemonStats);
    if(!this.props.pokemonStats) {
      return <div>Loading...</div>;
    }
    return(
      <div>
        <PokeHeader id={this.props.pokemonStats.id} name={this.props.pokemonStats.name} />
        {this.props.pokemonStats.height / 10}m {this.props.pokemonStats.weight / 10}kg
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state.pokemon.pokemonObjs[ow]);
  return {pokemonStats: state.pokemon.pokemonObjs[ownProps.pokemon.name]};
};

export default connect(mapStateToProps, {fetchPokemon})(PokeCard);