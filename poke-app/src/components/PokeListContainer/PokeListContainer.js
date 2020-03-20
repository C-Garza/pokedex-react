import React from "react";
import {connect} from "react-redux";
import styles from "./PokeListContainer.module.css";
import PokeCard from "../PokeCard/PokeCard";
import {fetchPokeList} from "../../actions";

class PokeListContainer extends React.Component {
  componentDidMount() {
    if(!this.props.pokeList.length) {
      this.props.fetchPokeList(9, 0); ////CHANGE
    }
  }
  handleCardNavigation = (pokemon) => {
    this.props.history.push(`/pokemon/${pokemon.name}`);
  }
  renderCards = () => {
    let temp = this.props.pokeList.slice(0, 9); ////CHANGE
    return temp.map((pokemon) => {
      return <PokeCard key={pokemon.name} pokemon={pokemon} handleNav={() => this.handleCardNavigation(pokemon)} />;
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