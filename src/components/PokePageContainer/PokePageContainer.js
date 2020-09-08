import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import styles from "./PokePageContainer.module.css";
import PokeCardExtended from "../PokeCardExtended/PokeCardExtended";
import PokeSprites from "../PokeSprites/PokeSprites";
import EvolutionChain from "../EvolutionChain/EvolutionChain";
import RadarChart from "../RadarChart/RadarChart";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {fetchPokeList, fetchPokemon, fetchPokemonSpecies, fetchEvolutionChain, setChartPreference} from "../../actions";

class PokePageContainer extends React.Component {
  state = {hasError: false, hasEvoError: false};
  currentRequest = null;

  async componentDidMount() {
    let id = this.props.match.params.id;
    document.title = "Pokemon · " + id.charAt(0).toUpperCase() + id.slice(1);
    this.currentRequest = "MOUNT";
    if(!this.props.pokeList.length || this.props.pokeListError) {
      await this.props.fetchPokeList(807).catch(err => {
        console.log(err);
        return;
      });
    }
    if(!this.props.pokemonStats || !(this.props.pokemonStats.hasOwnProperty("species_ext"))) {
      await this.props.fetchPokemon(id, true).then(() => {
        if(this.currentRequest === "MOUNT") {
          let index = this.props.pokemonStats.species_ext.evolution_chain.url.slice(42, -1);
          if(!this.props.pokemonEvolution[index]) {
            this.props.fetchEvolutionChain(index).catch(err => {
              if(this.currentRequest === "MOUNT") {
                this.setState({hasEvoError: true});
              }
            });
          }
        }
      }).catch(err => {
        console.log(err);
        if(this.currentRequest === "MOUNT") {
          if(err.response && err.response.status === 404) {
            this.handle404Pokemon(err, id);
            return;
          }
          this.setState({hasError: true});
        }
      }); ////FIX EXTRA CALL WHEN HAS STATS BUT NO SPECIES
    }
    else {
      if(this.currentRequest === "MOUNT") {
        let index = this.props.pokemonStats.species_ext.evolution_chain.url.slice(42, -1);
        if(!this.props.pokemonEvolution[index]) {
          this.props.fetchEvolutionChain(index).catch(err => {
            if(this.currentRequest === "MOUNT") {
              this.setState({hasEvoError: true});
            }
          });
        }
      }
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      document.title = "Pokemon · " + this.props.match.params.id.charAt(0).toUpperCase() + this.props.match.params.id.slice(1);
      if(!this.props.pokemonStats || !(this.props.pokemonStats.hasOwnProperty("species_ext"))) {
        this.currentRequest = this.props.match.params.id;
        this.props.fetchPokemon(this.props.match.params.id, true)
        .then(() => {
          let index = this.props.pokemonStats.species_ext.evolution_chain.url.slice(42, -1);
          if(!this.props.pokemonEvolution[index]) {
            this.props.fetchEvolutionChain(index).then(() => {
              if(this.currentRequest === this.props.match.params.id) {
                this.setState({hasEvoError: false});
              }
            }).catch(err => {
              if(this.currentRequest === this.props.match.params.id) {
                this.setState({hasEvoError: true});
              }
            });
          }
          if(this.state.hasError) {
            if(this.currentRequest === this.props.match.params.id) {
              this.setState({hasError: false});
            }
          }
        })
        .catch(err => {
          console.log(err);
          if(this.currentRequest === this.props.match.params.id) {
            this.setState({hasError: true});
          }
        });
      }
      else {
        let index = this.props.pokemonStats.species_ext.evolution_chain.url.slice(42, -1);
        this.currentRequest = this.props.match.params.id;
        if(this.state.hasError) {
          this.setState({hasError: false});
        }
        if(this.state.hasEvoError) {
          this.setState({hasEvoError: false});
        }
        if(!this.props.pokemonEvolution[index]) {
          this.props.fetchEvolutionChain(index).then(() => {
            if(this.currentRequest === this.props.match.params.id) {
              this.setState({hasEvoError: false});
            }
          }).catch(err => {
            if(this.currentRequest === this.props.match.params.id) {
              this.setState({hasEvoError: true});
            }
          });
        }
      }
    }
  }
  componentWillUnmount() {
    this.currentRequest = false;
  }
  handle404Pokemon = (err, id) => {
    this.props.history.push(`/404/${id}`);
  }
  handleChange = (e) => {
    this.props.setChartPreference(e.target.value);
  }
  getPageControlsLink = () => {
    let pokeID = null;
    if(this.props.pokemonStats) {
      pokeID = this.props.pokemonStats.id;
    }
    else if(this.props.pokeList.length) {
      pokeID = this.props.pokeList.findIndex(poke => poke.name === this.props.match.params.id) + 1;
    }
    return {
      next: pokeID === 807 ? this.props.pokeList[0].name : this.props.pokeList[pokeID].name,
      prev: pokeID === 1 ? this.props.pokeList[this.props.pokeList.length - 1].name : this.props.pokeList[pokeID - 2].name
    }
  }
  getEvolutionChain = () => {
    if(this.state.hasEvoError) {
      return true;
    }
    let index = this.props.pokemonStats.species_ext.evolution_chain.url.slice(42, -1);
    return this.props.pokemonEvolution[index];
  }
  render() {
    if(this.props.pokeListError) {
      return(
        <div className={styles.container}>
          <div>ERROR!</div>
        </div>
      );
    }
    if(this.state.hasError) {
      let pageControls = this.getPageControlsLink();
      return(
        <div className={styles.container}>
          <div className={styles.page__controls__container}>
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
          </div>
          <div>ERROR!</div>
        </div>
      );
    }
    if(!this.props.pokemonStats || !this.props.pokemonStats.species_ext || !this.getEvolutionChain() || this.props.pokeList.length === 0) {
      return(
        <div className={styles.container}>
          <LoadingScreen></LoadingScreen>
        </div>
      );
    }
    const pageControls = this.getPageControlsLink();
    const chain = this.getEvolutionChain();
    const pageControlLeft = (
      <div className={styles.pageControls}>
        <div className={styles.pageControls__left}>
          <Link to={pageControls.prev} className={`${styles.pageControls__left__button} ${styles.pageControls__hover}`}>
            <span className={`${styles.pageControls__left__chevron} ${styles.pageControls__hover}`}></span>
          </Link>
        </div>
      </div>
    );
    const pageControlRight = (
      <div className={styles.pageControls}>
        <div className={styles.pageControls__right}>
          <Link to={pageControls.next} className={`${styles.pageControls__right__button} ${styles.pageControls__hover}`}>
            <span className={`${styles.pageControls__right__chevron} ${styles.pageControls__hover}`}></span>
          </Link>
        </div>
      </div>
    );
    return(
      <div className={styles.container}>
        <div className={styles.row}>
          <PokeCardExtended pokemonStats={this.props.pokemonStats} />
        </div>
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
          <EvolutionChain evolution={chain} key={chain.id} />
        </div>
        <div className={styles.page__controls__container}>
          {pageControlLeft}
          {pageControlRight}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pokemonEvolution: state.pokemon.evolution_chains,
    pokemonStats: state.pokemon.pokemonObjs[ownProps.match.params.id],
    pokeList: state.pokemon.pokemonAll.pokeList,
    pokeListError: state.pokemon.pokemonAll.error,
    chartType: state.userPreferences.chartPreference,
  };
};

export default withRouter(connect(mapStateToProps, {
  fetchPokeList, 
  fetchPokemon, 
  fetchPokemonSpecies, 
  fetchEvolutionChain, 
  setChartPreference
})(PokePageContainer));