import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import styles from "./PokeListContainer.module.css";
import PokeCard from "../PokeCard/PokeCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {fetchPokeList} from "../../actions";

class PokeListContainer extends React.Component {
  componentDidMount() {
    let pathName = this.props.location.pathname;
    let searchParams = "";
    if(this.props.title) {
      searchParams = this.props.title.map(param => {
        return param.charAt(0).toUpperCase() + param.slice(1);
      }).join(" & ");
    }
    document.title = this.props.location.pathname === "/" ? 
    "PokeDex React" :
    `${pathName.charAt(1).toUpperCase() + pathName.slice(2)} · ${searchParams}`
    if(!this.props.pokeList.length || this.props.pokeList.error) {
      this.props.fetchPokeList(807).catch(err => {
        console.log(err);
      });
    }
    window.addEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate(prevProps) {
    if(this.props.title && prevProps.title !== this.props.title) {
      let pathName = this.props.location.pathname;
      let searchParams = "";
      if(this.props.title) {
        searchParams = this.props.title.map(param => {
          return param.charAt(0).toUpperCase() + param.slice(1);
        }).join(" & ");
      }
      document.title = this.props.location.pathname === "/" ? 
      "PokeDex React" :
      `${pathName.charAt(1).toUpperCase() + pathName.slice(2)} · ${searchParams}`
    }
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
    if(this.props.pokeListError) {
      return(
        <div className={styles.container}>
          <div>ERROR!!!</div>
        </div>
      );
    }
    if(!this.props.pokeList.length) {
      return(
        <div className={styles.container}>
          <LoadingScreen></LoadingScreen>
        </div>
      );
    }
    return(
      <div className={`${styles.container} ${this.props.searchResults ? styles.small__container : ""}`}>
        {this.renderCards()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokeList: state.pokemon.pokemonAll.pokeList,
    pokeListError: state.pokemon.pokemonAll.error
  };
};

export default withRouter(connect(mapStateToProps, {fetchPokeList})(PokeListContainer));