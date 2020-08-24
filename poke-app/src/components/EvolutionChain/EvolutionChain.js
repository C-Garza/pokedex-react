import React from "react";
import {connect} from "react-redux";
import styles from "./EvolutionChain.module.css";
import {getTypesClass} from "../utils/helper-functions";
import {fetchPokemon} from "../../actions";

class EvolutionChain extends React.Component {
  ////ADD TRIGGERS FOR EVO?
  state = {isLoading: true, isEevee: false, hasError: false};
  _isMounted = false;

  componentDidMount() {
    const {evolution, pokemon} = this.props;
    this._isMounted = true;
    if(evolution === true && this._isMounted) {
      this.setState({hasError: true});
      return;
    }
    let promises = [];
    let name = evolution.chain.species.name;
    let checkName = this.checkPokemonName(evolution.chain.species.name);
    if(checkName) {
      name = checkName;
    }
    if(!pokemon[name]) {
      promises.push(this.props.fetchPokemon(name));
    }
    evolution.chain.evolves_to.map(poke => {
      name = poke.species.name;
      checkName = this.checkPokemonName(name);
      if(checkName) {
        name = checkName;
      }
      if(!pokemon[name]) {
        promises.push(this.props.fetchPokemon(name))
      }
      if(poke.evolves_to.length) {
        name = poke.evolves_to[0].species.name;
        checkName = this.checkPokemonName(name);
        if(checkName) {
          name = checkName;
        }
        if(!pokemon[name]) {
          promises.push(this.props.fetchPokemon(name));
        }
        if(poke.evolves_to[1] && !pokemon[poke.evolves_to[1].species.name]) {
          promises.push(this.props.fetchPokemon(poke.evolves_to[1].species.name));
        }
      }
      return true;
    });
    Promise.all(promises).then(() => {
      if(this._isMounted) {
        this.setState({isLoading: false, isEevee: (evolution.id === 67 ||  evolution.id === 47) ? true : false, hasError: false});
      }
    })
    .catch(err => {
      console.log(err);
      if(this._isMounted) {
        this.setState({hasError: true});
      }
    });
  }
  componentDidUpdate(prevProps) {
    if(prevProps.evolution.id !== this.props.evolution.id && (this.props.evolution.id === 67 || this.props.evolution.id === 47)) {
      this.setState({isEevee: true});
    }
    if((this.props.evolution.id !== 67 && this.props.evolution.id !== 47) && this.state.isEevee) {
      this.setState({isEevee: false});
    }
    if(this.props.evolution === true && !this.state.hasError) {
      this.setState({hasError: true});
    }
    if(!this.props.evolution === true && this.state.hasError) {
      this.setState({hasError: false});
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  getPokeNumber = (id) => {
    if(id < 10) {
      id = `00${id}`;
    }
    else if(id < 100) {
      id = `0${id}`;
    }
    return id;
  };
  getTypes = (types) => {
    let arr = types.sort((a,b) => {
      return a.slot - b.slot;
    }).map(type => {
      return type.type.name;
    });
    return arr;
  }
  checkPokemonName = (name) => {
    switch(name) {
      case "deoxys": ////386
        return `${name}-normal`;
      case "keldeo": ////647
        return `${name}-ordinary`;
      case "minior": ////774
        return `${name}-red-meteor`;
      case "shaymin": ////492
        return `${name}-land`;
      case "mimikyu": ////778
        return `${name}-disguised`;
      case "wormadam": ////413
        return `${name}-plant`;
      case "giratina": ////487
        return `${name}-altered`;
      case "basculin": ////550
        return `${name}-red-striped`;
      case "landorus":
      case "thundurus":
      case "tornadus": ////641,642,645
        return `${name}-incarnate`;
      case "meloetta": ////648
        return `${name}-aria`;
      case "meowstic": ////678
        return `${name}-male`;
      case "oricorio": ////741
        return `${name}-baile`;
      case "lycanroc": ////745
        return `${name}-midday`;
      case "aegislash": ////681
        return `${name}-shield`;
      case "gourgeist":
      case "pumpkaboo": ////710,711
        return `${name}-average`;
      case "darmanitan": ////555
        return `${name}-standard`;
      case "wishiwashi": ////746
        return `${name}-solo`;
      default: 
        return false;
    }
  }
  renderTypes = (types) => {
    const typesClassArr = getTypesClass(types);
    return types.map((type,i) => {
      return <p key={i} className={`${styles.evolution__types__type} ${typesClassArr[i].logo}`}>{type.toUpperCase()}</p>
    });
  };
  renderEvolutionChain = () => {
    const {evolution} = this.props;
    const {isEevee} = this.state;
    let id = evolution.chain.species.url.slice(42, -1);
    if(!evolution.chain.evolves_to.length) {
      let displayName = evolution.chain.species.name.charAt(0).toUpperCase() + evolution.chain.species.name.slice(1);
      let ext_id = this.getPokeNumber(id);
      let name = evolution.chain.species.name;
      let checkName = this.checkPokemonName(name);
      if(checkName) {
        name = checkName;
      }
      return(
        <div className={styles.evolution__chain__column}>
          <div className={styles.evolution__chain__box}>
            <img 
              className={styles.evolution__chain__image}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
              alt={displayName}
            />
            <p className={styles.evolution__chain__name}>{displayName} #{ext_id}</p>
            <div className={styles.evolution__types}>
              {this.renderTypes(this.getTypes(this.props.pokemon[name].types))}
            </div>
          </div>
        </div>
      );
    }
    else {
      let displayName = evolution.chain.species.name.charAt(0).toUpperCase() + evolution.chain.species.name.slice(1);
      let ext_id = this.getPokeNumber(id);
      let name = evolution.chain.species.name;
      let checkName = this.checkPokemonName(name);
      if(checkName) {
        name = checkName;
      }
      return (
        <React.Fragment>
          <div className={`${styles.evolution__chain__column} ${isEevee ? styles.evolution__chain__column__eevee : ""}`}>
            <div className={styles.evolution__chain__box}>
              <div className={styles.evolution__chain__image__container}>
                <img 
                  className={styles.evolution__chain__image}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                  alt={displayName}
                />
              </div>
              <p className={styles.evolution__chain__name}>{displayName} #{ext_id}</p>
              <div className={styles.evolution__types}>
                {this.renderTypes(this.getTypes(this.props.pokemon[name].types))}
              </div>
            </div>
          </div>
          <div className={`${styles.evolution__chain__column} ${isEevee ? styles.evolution__chain__continue : ""}`}>
            {evolution.chain.evolves_to.map(pokemon => {
              displayName = pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1);
              id = pokemon.species.url.slice(42,-1);
              ext_id = this.getPokeNumber(id);
              name = pokemon.species.name;
              checkName = this.checkPokemonName(name);
              if(checkName) {
                name = checkName;
              }
              return(
                <div 
                  key={pokemon.species.name} 
                  className={`${styles.evolution__chain__box} ${isEevee ? styles.evolution__chain__eevee : styles.evolution__chain__continue}`}
                >
                  <div className={styles.evolution__chain__image__container}>
                    <img 
                      className={styles.evolution__chain__image}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                      alt={displayName}
                    />
                  </div>
                  <p className={styles.evolution__chain__name}>{displayName} #{ext_id}</p>
                  <div className={styles.evolution__types}>
                    {this.renderTypes(this.getTypes(this.props.pokemon[name].types))}
                  </div>
                </div>
              );
            })}
          </div>
          {evolution.chain.evolves_to[0].evolves_to.length > 0 &&
            <div className={styles.evolution__chain__column}>
              {evolution.chain.evolves_to.map(pokemon => {
                return pokemon.evolves_to.map(pokemon => {
                  displayName = pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1);
                  id = pokemon.species.url.slice(42,-1);
                  ext_id = this.getPokeNumber(id);
                  name = pokemon.species.name;
                  checkName = this.checkPokemonName(name);
                  if(checkName) {
                    name = checkName;
                  }
                  return(
                    <div key={pokemon.species.name} className={`${styles.evolution__chain__box} ${styles.evolution__chain__continue}`}>
                      <div className={styles.evolution__chain__image__container}>
                        <img 
                          className={styles.evolution__chain__image}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                          alt={displayName}
                        />
                      </div>
                      <p className={styles.evolution__chain__name}>{displayName} #{ext_id}</p>
                      <div className={styles.evolution__types}>
                        {this.renderTypes(this.getTypes(this.props.pokemon[name].types))}
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          }
        </React.Fragment>
      );
    }
  }
  render() {
    if(this.state.hasError) {
      return (
        <div className={styles.evolution__container}>
          <div>Error!</div>
        </div>
      );
    }
    if(!this.props.evolution || this.state.isLoading) {
      return <div>Loading...</div>
    }
    return(
      <div className={styles.evolution__container}>
        <h2 className={styles.evolution__header}>Evolutions</h2>
        <div className={styles.evolution__chain__container}>
          {this.renderEvolutionChain()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokemon: state.pokemon.pokemonObjs,
  };
};

export default connect(mapStateToProps, {fetchPokemon})(EvolutionChain);