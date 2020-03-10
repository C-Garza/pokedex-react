import React from "react";
import {connect} from "react-redux";
import styles from "./PokePageContainer.module.css";
import PokeCardExtended from "../PokeCardExtended/PokeCardExtended";
import {fetchPokemon, fetchPokemonSpecies} from "../../actions";

class PokePageContainer extends React.Component {
  componentDidMount() {
    if(!this.props.pokemonStats || !(this.props.pokemonStats.hasOwnProperty("species_ext"))) {
      this.props.fetchPokemon(this.props.match.params.id);
    }
  }
  render() {
    if(!this.props.pokemonStats || !this.props.pokemonStats.species_ext) {
      return <div>Loading...</div>;
    }
    return(
      <div className={styles.container}>
        <PokeCardExtended pokemonStats={this.props.pokemonStats} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {pokemonStats: state.pokemon.pokemonObjs[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchPokemon, fetchPokemonSpecies})(PokePageContainer);