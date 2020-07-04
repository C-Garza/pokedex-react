import React from "react";
import styles from "./EvolutionChain.module.css";
import {getTypesClass} from "../utils/helper-functions";
import {fetchPokemon} from "../../actions";
import {connect} from "react-redux";

class EvolutionChain extends React.Component {
  ////CLEAN UP CODE
  ////ADD TRIGGERS FOR EVO?
  state = {isLoading: true, isEevee: false};

  componentDidMount() {
    console.log(this.props.evolution);
    const {evolution, pokemon} = this.props;
    let promises = [];
    if(!pokemon[evolution.chain.species.name]) {
      promises.push(this.props.fetchPokemon(evolution.chain.species.name));
    }
    evolution.chain.evolves_to.map(poke => {
      if(!pokemon[poke.species.name]) {
        promises.push(this.props.fetchPokemon(poke.species.name))
      }
      if(poke.evolves_to.length && !pokemon[poke.evolves_to[0].species.name]) {
        promises.push(this.props.fetchPokemon(poke.evolves_to[0].species.name));
        if(poke.evolves_to[1] && !pokemon[poke.evolves_to[1].species.name]) {
          promises.push(this.props.fetchPokemon(poke.evolves_to[1].species.name));
        }
      }
      return true;
    });
    Promise.all(promises).then(() => {
      this.setState({isLoading: false, isEevee: evolution.id === 67 ? true : false});
    });
  }
  componentDidUpdate(prevProps) {
    if(prevProps.evolution.id !== this.props.evolution.id && this.props.evolution.id === 67) {
      this.setState({isEevee: true});
    }
    if(this.state.isEevee && this.props.evolution.id !== 67) {
      this.setState({isEevee: false});
    }
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
      let name = evolution.chain.species.name.charAt(0).toUpperCase() + evolution.chain.species.name.slice(1);
      let ext_id = this.getPokeNumber(id);
      return(
        <div className={styles.evolution__chain__column}>
          <div className={styles.evolution__chain__box}>
            <img 
              className={styles.evolution__chain__image}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
              alt={name}
            />
            <p className={styles.evolution__chain__name}>{name} #{ext_id}</p>
            <div className={styles.evolution__types}>
              {this.renderTypes(this.getTypes(this.props.pokemon[evolution.chain.species.name].types))}
            </div>
          </div>
        </div>
      );
    }
    else {
      let name = evolution.chain.species.name.charAt(0).toUpperCase() + evolution.chain.species.name.slice(1);
      let ext_id = this.getPokeNumber(id);
      return (
        <React.Fragment>
          <div className={`${styles.evolution__chain__column} ${isEevee ? styles.evolution__chain__column__eevee : ""}`}>
            <div className={styles.evolution__chain__box}>
              <div className={styles.evolution__chain__image__container}>
                <img 
                  className={styles.evolution__chain__image}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                  alt={name}
                />
              </div>
              <p className={styles.evolution__chain__name}>{name} #{ext_id}</p>
              <div className={styles.evolution__types}>
                {this.renderTypes(this.getTypes(this.props.pokemon[evolution.chain.species.name].types))}
              </div>
            </div>
          </div>
          <div className={`${styles.evolution__chain__column} ${isEevee ? styles.evolution__chain__continue : ""}`}>
            {evolution.chain.evolves_to.map(pokemon => {
              name = pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1);
              id = pokemon.species.url.slice(42,-1);
              ext_id = this.getPokeNumber(id);
              return(
                <div 
                  key={pokemon.species.name} 
                  className={`${styles.evolution__chain__box} ${isEevee ? styles.evolution__chain__eevee : styles.evolution__chain__continue}`}
                >
                  <div className={styles.evolution__chain__image__container}>
                    <img 
                      className={styles.evolution__chain__image}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                      alt={name}
                    />
                  </div>
                  <p className={styles.evolution__chain__name}>{name} #{ext_id}</p>
                  <div className={styles.evolution__types}>
                    {this.renderTypes(this.getTypes(this.props.pokemon[pokemon.species.name].types))}
                  </div>
                </div>
              );
            })}
          </div>
          {evolution.chain.evolves_to[0].evolves_to.length > 0 &&
            <div className={styles.evolution__chain__column}>
              {evolution.chain.evolves_to.map(pokemon => {
                return pokemon.evolves_to.map(pokemon => {
                  name = pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1);
                  id = pokemon.species.url.slice(42,-1);
                  ext_id = this.getPokeNumber(id);
                  return(
                    <div key={pokemon.species.name} className={`${styles.evolution__chain__box} ${styles.evolution__chain__continue}`}>
                      <div className={styles.evolution__chain__image__container}>
                        <img 
                          className={styles.evolution__chain__image}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                          alt={name}
                        />
                      </div>
                      <p className={styles.evolution__chain__name}>{name} #{ext_id}</p>
                      <div className={styles.evolution__types}>
                        {this.renderTypes(this.getTypes(this.props.pokemon[pokemon.species.name].types))}
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