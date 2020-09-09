import React from "react";
import {connect} from "react-redux";
import styles from "./PokeListContainer.module.css";
import PokeCard from "../PokeCard/PokeCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {fetchPokeList} from "../../actions";

class PokeListContainer extends React.Component {
  state = {width: 0, showScrollTop: false};

  componentDidMount() {
    if(!this.props.pokeList.length || this.props.pokeList.error) {
      this.props.fetchPokeList(807).catch(err => {
        console.log(err);
      });
    }
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = (e) => {
    this.setState({
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    });
  }
  handleScroll = (e) => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(scrollTop >= 500 && !this.state.showScrollTop) {
      this.setState({showScrollTop: true});
    }
    if(scrollTop < 500 && this.state.showScrollTop) {
      this.setState({showScrollTop: false});
    }
    if((window.innerHeight + scrollTop) >= document.body.offsetHeight - 200) {
      ////CHECK WHERE IN OFFSET WE ARE AND RENDER CARDS
      this.props.handleUpdateOffset(this.props.offset + 24);
    }
  }
  handleScrollToTop = (e) => {
    window.scrollTo(0,0);
  }
  handleKeyDown = (e) => {
    if(e.keyCode !== 13 && e.keyCode !== 32) {
      return;
    }
    if(e.keyCode === 32) {
      e.preventDefault();
    }
    this.handleScrollToTop();
  }
  renderCards = () => {
    let cards = this.props.pokeList.slice(0, this.props.offset);
    if(this.props.searchResults) { ////IF POKELIST COMES FROM SEARCHRESULTS
      cards = this.props.searchResults.slice(0, this.props.offset);
    }
    return cards.map((pokemon) => {
      return <PokeCard key={pokemon.name} pokemon={pokemon} width={this.state.width} />;
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
      <div 
        className={`${styles.container} ${this.props.searchResults ? styles.small__container : ""}`}
        style={this.props.searchResults ? {marginTop: "35px"} : {}}
      >
        {this.renderCards()}
        <div 
          className={`${styles.scroll__top__container} ${this.state.showScrollTop ? "" : styles.hidden}`} 
          tabIndex="0"
          onClick={this.handleScrollToTop}
          onKeyDown={this.handleKeyDown}
        >
        <i className={`fas fa-arrow-circle-up ${styles.scroll__top} ${this.state.showScrollTop ? "" : styles.hidden}`}></i>
        </div>
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

export default connect(mapStateToProps, {fetchPokeList})(PokeListContainer);