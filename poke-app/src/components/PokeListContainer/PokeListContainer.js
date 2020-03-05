import React from "react";
import {connect} from "react-redux";
import styles from "./PokeListContainer.module.css";
import PokeCard from "../PokeCard/PokeCard";
import {fetchPokeList} from "../../actions";

class PokeListContainer extends React.Component {
  componentDidMount() {
    this.props.fetchPokeList();
  }
  renderCards = () => {
    return this.props.pokeList.map((pokemon) => {
      return <PokeCard key={pokemon.name} pokemon={pokemon} />;
    });
  }
  render() {
    if(!this.props.pokeList) {
      return <div>Loading...</div>;
    }
    return(
      <div className={styles.container}>
        {this.renderCards()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {pokeList: state.pokemon.pokemonAll.pokeList};
};

export default connect(mapStateToProps, {fetchPokeList})(PokeListContainer);