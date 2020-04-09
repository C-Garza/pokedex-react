import React from "react";
import {connect} from "react-redux";
import styles from "./PokeListContainer.module.css";
import PokeCard from "../PokeCard/PokeCard";
import {fetchPokeList} from "../../actions";

class PokeListContainer extends React.Component {
  state = {offset: 0};
  
  componentDidMount() {
    if(!this.props.pokeList.length) {
      this.props.fetchPokeList(807, this.state.offset)
      .then(this.setState({offset: 24})); ////CHANGE
    }
    else {
      this.setState({offset: 24});
    }
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleCardNavigation = (pokemon) => {
    this.props.history.push(`/pokemon/${pokemon.name}`);
  }
  handleScroll = (e) => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if((window.innerHeight + scrollTop) >= document.body.offsetHeight - 200) {
      ////CHECK WHERE IN OFFSET WE ARE AND RENDER CARDS
      this.setState((prevState) => {
        return {offset: prevState.offset + 24};
      });
    }
  }
  renderCards = () => {
    let cards = this.props.pokeList.slice(0, this.state.offset);
    return cards.map((pokemon) => {
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