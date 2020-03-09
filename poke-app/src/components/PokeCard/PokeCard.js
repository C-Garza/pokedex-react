import React from "react";
import {connect} from "react-redux";
import styles from "./PokeCard.module.css";
import PokeHeader from "../PokeHeader/PokeHeader";
import {fetchPokemon} from "../../actions";
import {getTypesClass} from "../utils/helper-functions"
import PokeDescription from "../PokeDescription/PokeDescription";

class PokeCard extends React.Component {
  componentDidMount() {
    if(!this.props.pokemonStats) {
      this.props.fetchPokemon(this.props.pokemon.name);
    }
  }
  getPhysicalChars = () => {
    return {
      height: this.props.pokemonStats.height / 10,
      weight: this.props.pokemonStats.weight / 10
    }
  }
  getTypes = () => {
    let doReverse = false;
    let arr = this.props.pokemonStats.types.map((type) => {
      if(type.slot > 1 && !doReverse) {
        doReverse = true;
      }
      return type.type.name;
    });
    ////LET MAIN TYPE BE FIRST SHOWN
    if(doReverse) {
      return arr.reverse();
    }
    return arr;
  }
  render() {
    console.log(this.props.pokemonStats);
    if(!this.props.pokemonStats) {
      return(
        <div className={styles.card}>
          <PokeHeader />
          <PokeDescription />
        </div>
      );
    }
    const nameCapitalized = this.props.pokemonStats.name.charAt(0).toUpperCase() + this.props.pokemonStats.name.slice(1);
    const physicalChars = this.getPhysicalChars();
    const types = this.getTypes();
    let typesClassArr = getTypesClass(types);
    const cardClasses = `${styles.card} ${typesClassArr[0].card}`
    return(
      <div className={cardClasses} onClick={this.props.handleNav}>
        <PokeHeader id={this.props.pokemonStats.id} name={nameCapitalized} typeClass={typesClassArr[0]} />
        <PokeDescription physicalChars={physicalChars} types={types} name={nameCapitalized} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {pokemonStats: state.pokemon.pokemonObjs[ownProps.pokemon.name]};
};

export default connect(mapStateToProps, {fetchPokemon})(PokeCard);