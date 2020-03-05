import React from "react";
import {connect} from "react-redux";
import styles from "./PokeCard.module.css";
import PokeHeader from "../PokeHeader/PokeHeader";
import {fetchPokemon} from "../../actions";
import PokeDescription from "../PokeDescription/PokeDescription";

class PokeCard extends React.Component {
  componentDidMount() {
    this.props.fetchPokemon(this.props.pokemon.name);
  }
  getPhysicalChars = () => {
    return {
      height: this.props.pokemonStats.height / 10,
      weight: this.props.pokemonStats.weight / 10,
      types: this.props.pokemonStats.types
    }
  }
  render() {
    console.log(this.props.pokemonStats);
    if(!this.props.pokemonStats) {
      return <div>Loading...</div>;
    }
    const physicalChars = this.getPhysicalChars();
    return(
      <div>
        <PokeHeader id={this.props.pokemonStats.id} name={this.props.pokemonStats.name} />
        <PokeDescription physicalChars={physicalChars} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {pokemonStats: state.pokemon.pokemonObjs[ownProps.pokemon.name]};
};

export default connect(mapStateToProps, {fetchPokemon})(PokeCard);