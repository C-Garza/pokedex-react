import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styles from "./PokePageContainer.module.css";
import PokeCardExtended from "../PokeCardExtended/PokeCardExtended";
import PokeSprites from "../PokeSprites/PokeSprites";
import EvolutionChain from "../EvolutionChain/EvolutionChain";
import RadarChart from "../RadarChart/RadarChart";
import {fetchPokeList, fetchPokemon, fetchPokemonSpecies, fetchEvolutionChain, setChartPreference} from "../../actions";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

class PokePageContainer extends React.Component {
  componentDidMount() { //CHANGE IF CHECK TO FETCHPOKELIST FIRST
    if(!this.props.pokemonStats || !(this.props.pokemonStats.hasOwnProperty("species_ext"))) {
      this.props.fetchPokemon(this.props.match.params.id, true) ////FIX EXTRA CALL WHEN HAS STATS BUT NO SPECIES
      .then(() => {
        this.getPageControlsLink();
        let index = this.props.pokemonStats.species_ext.evolution_chain.url.slice(42, -1);
        if(!this.props.pokemonEvolution[index]) {
          this.props.fetchEvolutionChain(index);
        }
      });
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      if(!this.props.pokemonStats || !(this.props.pokemonStats.hasOwnProperty("species_ext"))) {
        this.props.fetchPokemon(this.props.match.params.id, true)
        .then(() => {
          this.getPageControlsLink();
          let index = this.props.pokemonStats.species_ext.evolution_chain.url.slice(42, -1);
          if(!this.props.pokemonEvolution[index]) {
            this.props.fetchEvolutionChain(index);
          }
        });
      }
      else {
        this.getPageControlsLink();
      }
    }
  }
  handleChange = (e) => {
    this.props.setChartPreference(e.target.value);
  }
  getPageControlsLink = () => {
    let pokeID = this.props.pokemonStats.id;
    console.log("POKE ID: " + pokeID);
    if(!this.props.pokeList.length) {
      this.props.fetchPokeList(807)
      .then(() => {
        return {
          next: pokeID === 807 ? this.props.pokeList[0].name : this.props.pokeList[pokeID].name,
          prev: pokeID === 1 ? this.props.pokeList[this.props.pokeList.length - 1].name : this.props.pokeList[pokeID - 2].name
        }
      });
    }
    else {
      return {
        next: pokeID === 807 ? this.props.pokeList[0].name : this.props.pokeList[pokeID].name,
        prev: pokeID === 1 ? this.props.pokeList[this.props.pokeList.length - 1].name : this.props.pokeList[pokeID - 2].name
      }
    }
  }
  getEvolutionChain = () => {
    let index = this.props.pokemonStats.species_ext.evolution_chain.url.slice(42, -1);
    return this.props.pokemonEvolution[index];
  }
  render() {
    if(!this.props.pokemonStats || !this.props.pokemonStats.species_ext || !this.getEvolutionChain() || this.props.pokeList.length === 0) {
      return(
        <div className={styles.container}>
          <LoadingScreen></LoadingScreen>
        </div>
      );
    }
    ///HANDLE MAKING STATS CONTAINER NOW
    const pageControls = this.getPageControlsLink();
    const chain = this.getEvolutionChain();
    return(
      <div className={styles.container}>
        <div className={styles.pageControls}>
          <div className={styles.pageControls__left}>
            <Link to={pageControls.prev} className={`${styles.pageControls__left__button} ${styles.pageControls__hover}`}>
              <span className={`${styles.pageControls__left__chevron} ${styles.pageControls__hover}`}></span>
            </Link>
          </div>
        </div>
        <div className={styles.pageControls}>
          <div className={styles.pageControls__right}>
            <Link to={pageControls.next} className={`${styles.pageControls__right__button} ${styles.pageControls__hover}`}>
              <span className={`${styles.pageControls__right__chevron} ${styles.pageControls__hover}`}></span>
            </Link>
          </div>
        </div>
        <div className={styles.row}>
          <PokeCardExtended pokemonStats={this.props.pokemonStats} />
        </div>
        {/* <PokeCardExtended pokemonStats={this.props.pokemonStats} /> */}
        <div className={styles.row}>
          <div className={styles.statsContainer}>
            <div className={styles.stats__chart__menu}>
              <p className={styles.stats__chart__menu__header}>Chart Type</p>
              <select className={styles.stats__chart__menu__list} value={this.props.chartType} onChange={this.handleChange}>
                <option value="radar">Radar Chart</option>
                <option value="horizontalBar">Bar Chart</option>
              </select>
            </div>
            <RadarChart pokemonStats={this.props.pokemonStats} chartType={this.props.chartType} />
          </div>
          <div className={styles.spritesContainer}>
            <PokeSprites pokemon={this.props.pokemonStats} />
          </div>
        </div>
        <div className={styles.row}>
          <EvolutionChain evolution={chain} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pokemonEvolution: state.pokemon.evolution_chains,
    pokemonObjs: state.pokemon.pokemonObjs,
    pokemonStats: state.pokemon.pokemonObjs[ownProps.match.params.id],
    pokeList: state.pokemon.pokemonAll.pokeList,
    chartType: state.userPreferences.chartPreference,
  };
};

export default connect(mapStateToProps, {
  fetchPokeList, 
  fetchPokemon, 
  fetchPokemonSpecies, 
  fetchEvolutionChain, 
  setChartPreference
})(PokePageContainer);