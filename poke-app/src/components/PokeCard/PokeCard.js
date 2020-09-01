import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styles from "./PokeCard.module.css";
import PokeHeader from "../PokeHeader/PokeHeader";
import PokeDescription from "../PokeDescription/PokeDescription";
import {fetchPokemon} from "../../actions";
import {getTypesClass} from "../utils/helper-functions"

class PokeCard extends React.Component {
  state = {isFocus: false, hasEntered: false};

  componentDidMount() {
    if(!this.props.pokemonStats) {
      this.props.fetchPokemon(this.props.pokemon.name).catch(err => {
        console.log(err);
      });
    }
  }
  getPhysicalChars = () => {
    return {
      height: this.props.pokemonStats.height / 10,
      weight: this.props.pokemonStats.weight / 10
    }
  }
  getTypes = () => {
    let arr = this.props.pokemonStats.types.sort((a,b) => {
      return a.slot - b.slot;
    }).map(type => {
      return type.type.name;
    });
    return arr;
  }
  handleFocus = () => {
    this.setState({isFocus: !this.state.isFocus});
  }
  handleOnHover = (e) => {
    this.setState({hasEntered: e});
  }
  render() {
    if(!this.props.pokemonStats) {
      return(
        <div className={`${styles.card}`}>
          <Link to={`/pokemon/${this.props.pokemon.name}`} className={styles.nav} onFocus={this.handleFocus} onBlur={this.handleFocus}>
            <PokeHeader />
            <PokeDescription />
          </Link>
        </div>
      );
    }
    const nameCapitalized = this.props.pokemonStats.species.name.charAt(0).toUpperCase() + this.props.pokemonStats.species.name.slice(1);
    const physicalChars = this.getPhysicalChars();
    const types = this.getTypes();
    let typesClassArr = getTypesClass(types);
    const cardClasses = `${styles.card} ${typesClassArr[0].gradCard} ${this.state.isFocus ? styles.cardFocus : ""}`
    return(
      <div className={cardClasses} onMouseEnter={() => this.handleOnHover(true)} onMouseLeave={() => this.handleOnHover()}>
        <Link to={`/pokemon/${this.props.pokemon.name}`} className={styles.nav} onFocus={this.handleFocus} onBlur={this.handleFocus}>
          <PokeHeader 
            id={this.props.pokemonStats.id} 
            name={nameCapitalized} 
            typeClass={typesClassArr[0]} 
            hasEntered={this.state.hasEntered}
            isFocus={this.state.isFocus}
            width={this.props.width}
          />
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