import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import styles from "./PokeListContainer.module.css";
import PokeCard from "../PokeCard/PokeCard";
import {fetchPokeList} from "../../actions";

class PokeListContainer extends React.Component {
  componentDidMount() {
    if(!this.props.pokeList.length) {
      this.props.fetchPokeList(807);
    }
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = (e) => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if((window.innerHeight + scrollTop) >= document.body.offsetHeight - 200) {
      ////CHECK WHERE IN OFFSET WE ARE AND RENDER CARDS
      this.props.handleUpdateOffset(this.props.offset + 24);
    }
  }
  renderCards = () => {
    let cards = this.props.pokeList.slice(0, this.props.offset);
    if(this.props.searchResults) { ////IF POKELIST COMES FROM SEARCHRESULTS
      cards = this.props.searchResults.slice(0, this.props.offset);
    }
    return cards.map((pokemon) => {
      return <PokeCard key={pokemon.name} pokemon={pokemon} />;
    });
  }
  render() {
    if(!this.props.pokeList) {
      return <div>Loading...</div>;
    }
    return(
      <div className={`${styles.container} ${this.props.searchResults ? styles.small__container : ""}`}>
        {this.renderCards()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {pokeList: state.pokemon.pokemonAll.pokeList};
};

export default withRouter(connect(mapStateToProps, {fetchPokeList})(PokeListContainer));