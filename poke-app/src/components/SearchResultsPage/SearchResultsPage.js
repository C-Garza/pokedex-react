import React from "react";
import {connect} from "react-redux";
import queryString from "query-string";
import styles from "./SearchResultsPage.module.css";
import PokeListContainer from "../PokeListContainer/PokeListContainer";
import {fetchTypes} from "../../actions";

class SearchResultsPage extends React.Component {
  ////HANDLE CONDITION THAT SEARCH RETURNS NOTHING(i.e. FAIRY/DARK)
  ////CHECK IN RENDER IF TYPE IS SAME AS PREVIOUS ONE (NEW STATES TO HOLD)
  state = {filteredPoke: [], offset: 0};

  componentDidMount() {
    const NUM_OF_TYPES = 19;
    let promises = [];
    for(let i = 1; i < NUM_OF_TYPES; i++) {
      promises.push(i);
    }
    promises = promises.map(i => {
      return Promise.resolve(this.props.fetchTypes(i).catch(e => {console.log(e); return e;}));
    });
    Promise.all(promises).then((values) => {
      this.handleSearchType(queryString.parse(this.props.location.search));
    });
  }
  componentDidUpdate(prevProps) {
    if(this.props.location.search !== prevProps.location.search) {
      this.handleSearchType(queryString.parse(this.props.location.search));
    }
  }
  handleSearchType = (query) => {
    if(!Object.keys(query).length) {
      return;
    }
    else if(query.type) {
      this.filterByType(query.type);
    }
    else if(query.name) {
      this.filterByName(query.name);
    }
  }
  handleUpdateOffset = (offset) => {
    this.setState({offset: offset});
  }
  filterByName = (name) => {
    const {pokeList} = this.props;
    this.handleUpdateOffset(24);
    console.log(name);
    let filteredSuggestions = pokeList.filter(suggestion => {
      return suggestion.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    }).sort((a,b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      return a.indexOf(name) - b.indexOf(name);
    });
    console.log(filteredSuggestions);
    this.setState({filteredPoke: filteredSuggestions});
  }
  filterByType = (types) => {
    const {pokemonTypes} = this.props;
    ////CHECK IF QUERY EXISTS IN STATE
    if(Array.isArray(types)) {
      if(!types.every(type => {
        return pokemonTypes[type];
      })) {
        return;
      }
    }
    else {
      if(!pokemonTypes[types]) {
        return;
      }
    }
    this.handleUpdateOffset(24);
    if(Array.isArray(types)) { ////EACH POKE MUST CONTAIN THESE TYPES(NO-ORDER, CAN'T HAVE 3 TYPED POKEMON)
      let typesArrOne = new Set(pokemonTypes[types[0]].map(poke => poke.name));
      let mergedTypesArr = [...pokemonTypes[types[1]].filter(poke => typesArrOne.has(poke.name)).map(poke => {
        let slotOne = "";
        let slotTwo = "";
        if(poke.slot === 1) {
          slotOne = types[1];
          slotTwo = types[0];
        }
        else {
          slotOne = types[0];
          slotTwo = types[1];
        }
        return {
          ...poke,
          slotOrder: [slotOne, slotTwo]
        }
      })];
      console.log("FILTERED POKE: ", mergedTypesArr);
      this.setState({filteredPoke: mergedTypesArr});
    }
    else { ////SEARCH OF ONE TYPE
      console.log("FILTERED POKE: ", pokemonTypes[types]);
      this.setState({filteredPoke: pokemonTypes[types]});
    }
  }
  renderHeading = (query) => {
    const {filteredPoke} = this.state;
    if(!Object.keys(query).length) {
      return;
    }
    else if(query.type) {
      let typeList = Array.isArray(query.type) ? query.type.join(" & ") : query.type;
      return(
        <h1 className={styles.search__results__header}>Showing {filteredPoke.length} result(s) for: {typeList}</h1>
      );
    }
    else if(query.name) {
      return(
        <h1 className={styles.search__results__header}>Showing {filteredPoke.length} result(s) for: {query.name}</h1>
      );
    }
  }
  render() {
    let query = queryString.parse(this.props.location.search);
    return(
      <div className={styles.search__results__container}>
        <div className={styles.search__results__header__container}>
          {this.renderHeading(query)}
        </div>
        <PokeListContainer 
          searchResults={this.state.filteredPoke} 
          handleUpdateOffset={this.handleUpdateOffset} 
          offset={this.state.offset}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokeList: state.pokemon.pokemonAll.pokeList,
    pokemonTypes: state.pokemon.types
  };
};

export default connect(mapStateToProps, {fetchTypes})(SearchResultsPage);