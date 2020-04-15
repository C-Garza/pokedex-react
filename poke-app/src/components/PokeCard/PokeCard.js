import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styles from "./PokeCard.module.css";
import PokeHeader from "../PokeHeader/PokeHeader";
import {fetchPokemon} from "../../actions";
import {getTypesClass} from "../utils/helper-functions"
import PokeDescription from "../PokeDescription/PokeDescription";

class PokeCard extends React.Component {
  state = {isFocus: false};

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
  handleFocus = () => {
    this.setState({isFocus: !this.state.isFocus});
  }
  render() {
    if(!this.props.pokemonStats) {
      return(
        <div className={styles.card}>
          <PokeHeader />
          <PokeDescription />
        </div>
      );
    }
    const nameCapitalized = this.props.pokemonStats.species.name.charAt(0).toUpperCase() + this.props.pokemonStats.species.name.slice(1);
    const physicalChars = this.getPhysicalChars();
    const types = this.getTypes();
    let typesClassArr = getTypesClass(types);
    const cardClasses = `${styles.card} ${typesClassArr[0].card} ${styles.nav} ${this.state.isFocus ? styles.cardFocus : ""}`
    return(
      <div className={cardClasses}>
        <Link to={`/pokemon/${this.props.pokemon.name}`} className={styles.nav} onFocus={this.handleFocus} onBlur={this.handleFocus}>
          <PokeHeader id={this.props.pokemonStats.id} name={nameCapitalized} typeClass={typesClassArr[0]} />
          <PokeDescription physicalChars={physicalChars} types={types} name={nameCapitalized} />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {pokemonStats: state.pokemon.pokemonObjs[ownProps.pokemon.name]};
};

export default connect(mapStateToProps, {fetchPokemon})(PokeCard);